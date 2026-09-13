---
layout: page
title: TFLite Micro Latency Optimization
description: Arduino Nano 33 BLE · TensorFlow Lite Micro runtime profiling and fixed-shape kernel optimization — 239.60 ms → 95.17 ms with 100% accuracy, model unchanged.
img: assets/img/projects/tflite_latency.png
importance: 1
category: embedded
github: https://github.com/kjy1813/tflite-micro-latency-optimization
---

**Course:** Embedded System Design (2026-1) · **Target:** Arduino Nano 33 BLE (nRF52840, Cortex-M4) · **Runtime:** TensorFlow Lite Micro · **Language:** C/C++

| Metric                           |  Baseline |        Final |
| -------------------------------- | --------: | -----------: |
| Average latency (30-image batch) | 239.60 ms | **95.17 ms** |
| Accuracy                         |   30 / 30 |  **30 / 30** |
| Speedup                          |     1.00x |    **2.52x** |
| Latency reduction                |         – |   **60.28%** |

The task was to minimize inference latency of a fixed MNIST `.tflite` model on the board **without touching the model**: no retraining, no pruning, no change to graph, shapes, weights, or quantization parameters. The optimization target was the TFLM runtime execution path itself.

## What was done

1. **Baseline and generic cleanup** — CMSIS-NN path, only the four used ops registered (`QUANTIZE`, `CONV_2D`, `MEAN`, `FULLY_CONNECTED`), debug/measurement overhead removed, `-O3`. Roughly 136 ms.
2. **Problem redefinition** — instead of "how to compute the same thing faster", asked "does all of it need to be computed?". Layer/kernel-level profiling inside `Invoke()` showed that MAC count alone did not explain latency; memory access pattern, generic-kernel branches and requantization dominated.
3. **Zero-activation skip** — about 54% of the inputs to Conv4/Conv5 sat at the activation zero-point, contributing nothing to the MAC. Those MACs are skipped.
4. **Fixed-shape specialization** — direct Conv1 path, pair-major prepacked filter layout for Conv2–Conv5, fast paths for quantize / mean / fully-connected, all specialized to the fixed tensor shapes.
5. **Rejected the fastest version** — a more aggressive branch-free / requantization-hardcoded variant reached 92.51 ms but dropped accuracy to 22/30. It was excluded; changes were isolated and re-validated one by one until latency and correctness were both satisfied.

## Takeaways

- MAC count is not latency on an MCU. Memory access, branch structure and runtime overhead can dominate even when arithmetic is fixed.
- Every change was measured end-to-end (input copy → `Invoke()` → argmax) on the real board: 10 warm-up runs, 30-image batch average.
- The fastest implementation is not the valid implementation. Functional correctness gated the final choice.

Source, patched TFLM kernels, platform flags and the benchmark methodology are in the repository linked above.

---

## 한국어

**과목:** 임베디드시스템설계 (2026-1) · **타깃:** Arduino Nano 33 BLE (nRF52840, Cortex-M4) · **런타임:** TensorFlow Lite Micro · **언어:** C/C++

| 항목                      |  Baseline |        Final |
| ------------------------- | --------: | -----------: |
| 평균 latency (30장 batch) | 239.60 ms | **95.17 ms** |
| 정확도                    |   30 / 30 |  **30 / 30** |
| Speedup                   |     1.00x |    **2.52x** |
| Latency 감소율            |         – |   **60.28%** |

과제는 고정된 MNIST `.tflite` 모델의 추론 latency를 **모델을 건드리지 않고** 보드에서 최소화하는 것이었다. 재학습, pruning, graph·shape·weight·quantization parameter 변경은 모두 금지였고, 최적화 대상은 TFLM 런타임의 실행 경로 자체였다.

### 수행 내용

1. **Baseline과 일반적인 정리** — CMSIS-NN 경로 사용, 실제 쓰이는 op 4개(`QUANTIZE`, `CONV_2D`, `MEAN`, `FULLY_CONNECTED`)만 등록, debug/측정 overhead 제거, `-O3`. 약 136 ms.
2. **문제 재정의** — "같은 계산을 어떻게 더 빨리 할까"가 아니라 "이 계산을 전부 해야 하는가"로 질문을 바꿨다. `Invoke()` 내부를 layer/kernel 단위로 profiling한 결과 MAC 개수만으로는 latency가 설명되지 않았고, memory access pattern, generic kernel의 branch, requantization이 지배적이었다.
3. **Zero activation skip** — Conv4/Conv5 입력의 약 54%가 activation zero-point에 해당해 MAC에 기여하지 않았다. 이 MAC을 건너뛴다.
4. **Fixed-shape 특화** — Conv1 direct path, Conv2~Conv5의 pair-major prepacked filter layout, quantize / mean / fully-connected의 fast path를 모두 고정된 tensor shape에 맞춰 작성했다.
5. **가장 빠른 버전을 채택하지 않음** — branch-free / requantization hardcode 계열의 더 공격적인 변형은 92.51 ms까지 내려갔지만 정확도가 22/30으로 떨어졌다. 이 버전은 제외하고, 변경 사항을 하나씩 분리해 재검증하여 latency와 correctness를 모두 만족하는 조합만 남겼다.

### 배운 점

- MCU에서 MAC 개수는 latency가 아니다. 연산량이 고정되어 있어도 memory access, branch 구조, 런타임 overhead가 지배할 수 있다.
- 모든 변경은 실제 보드에서 end-to-end(input copy → `Invoke()` → argmax)로 측정했다. warm-up 10회, 30장 batch 평균.
- 가장 빠른 구현이 곧 유효한 구현은 아니다. 기능 정확성이 최종 선택의 기준이었다.

소스, 패치한 TFLM kernel, platform flag, benchmark 방법은 위에 링크된 저장소에 있다.

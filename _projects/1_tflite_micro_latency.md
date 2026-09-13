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

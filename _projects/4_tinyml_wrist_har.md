---
layout: page
title: TinyML Wrist-Sensor Activity Recognition
description: Resource-aware HAR on the HTAD wrist dataset — leave-one-subject-out evaluation, handcrafted vs. tiny deep models, full-int8 TFLite (8,920 B) and a sampling-rate ablation.
img: assets/img/projects/har_macro_f1.png
importance: 4
category: data
github: https://github.com/kjy1813/tinyml-wrist-har
---

**Course:** Sensor Big Data Processing (2026-1) · **Data:** HTAD (wrist accelerometer + audio features, 7 home activities, 3 users) · **Stack:** Python, scikit-learn, TensorFlow 2.16 / TFLite

The question was not "which model is most accurate" but **which model generalizes to a new user and could actually run on a wearable MCU**. Everything is evaluated leave-one-subject-out (LOSO), with macro-F1 as the primary metric.

| Track    | Input                                                                 | Best model                                | LOSO macro-F1 |
| -------- | --------------------------------------------------------------------- | ----------------------------------------- | ------------: |
| A        | provided features (audio / accelerometer / fusion)                    | Fusion + RandomForest                     |        0.6491 |
| B0       | raw accelerometer → 25 Hz, 3 s windows → handcrafted statistics       | **SVM-RBF**                               |    **0.6634** |
| B        | raw windows (x, y, z, magnitude) → Tiny1D-CNN / DS-1D-CNN / Small-TCN | Tiny1D-CNN                                |        0.3829 |
| B-TFLite | Tiny1D-CNN, full-integer int8                                         | 8,920-byte flatbuffer, ~95k MACs / window |        0.3958 |

## Findings

- Accelerometer-only features came within 0.008 macro-F1 of audio + accelerometer fusion, and were more stable across users. A microphone is not worth its power and privacy cost here.
- Directly processing the raw signal (parsing, resampling, windowing, feature extraction) beat the provided feature table.
- With three users, handcrafted features still beat small deep models. The deep branch's value is deployability: all 16 int8 conversions succeeded and were re-evaluated through the TFLite interpreter.
- Sampling rate is a design variable: in the ablation, 10 Hz gave the best macro-F1 at about 41% of the MACs of 25 Hz.

The accuracy-first model (SVM) and the deployment candidate (int8 Tiny1D-CNN) are different models, and the analysis keeps them separate. Model size and MACs are proxies. No MCU latency or power was measured.

---

## 한국어

**과목:** 센서빅데이터처리 (2026-1) · **데이터:** HTAD (손목 accelerometer + audio feature, 가정 내 활동 7종, 사용자 3명) · **스택:** Python, scikit-learn, TensorFlow 2.16 / TFLite

질문은 "어떤 모델이 가장 정확한가"가 아니라 **"어떤 모델이 새로운 사용자에게 일반화되고 실제로 웨어러블 MCU에서 돌아갈 수 있는가"** 였다. 모든 평가는 leave-one-subject-out(LOSO)으로, 핵심 지표는 macro-F1이다.

| Track    | 입력                                                                 | 최고 모델                                   | LOSO macro-F1 |
| -------- | -------------------------------------------------------------------- | ------------------------------------------- | ------------: |
| A        | 제공된 feature (audio / accelerometer / fusion)                      | Fusion + RandomForest                       |        0.6491 |
| B0       | raw accelerometer → 25 Hz, 3초 window → handcrafted 통계 feature     | **SVM-RBF**                                 |    **0.6634** |
| B        | raw window (x, y, z, magnitude) → Tiny1D-CNN / DS-1D-CNN / Small-TCN | Tiny1D-CNN                                  |        0.3829 |
| B-TFLite | Tiny1D-CNN, full-integer int8                                        | 8,920 byte flatbuffer, window당 약 95k MACs |        0.3958 |

### 결과

- accelerometer만 쓴 feature가 audio + accelerometer fusion과 macro-F1 0.008 차이였고, 사용자 간 성능은 더 안정적이었다. 여기서는 마이크가 전력과 프라이버시 비용만큼의 가치가 없었다.
- raw signal을 직접 처리(parsing, resampling, windowing, feature extraction)한 결과가 제공된 feature table보다 좋았다.
- 사용자 3명 규모에서는 handcrafted feature가 작은 deep model보다 여전히 강했다. deep branch의 가치는 배치 가능성에 있다. int8 변환 16건이 모두 성공했고 TFLite interpreter로 재평가했다.
- sampling rate는 설계 변수다. ablation에서 10 Hz가 25 Hz 대비 약 41%의 MACs로 가장 높은 macro-F1을 냈다.

정확도 우선 모델(SVM)과 배치 후보(int8 Tiny1D-CNN)는 서로 다른 모델이며, 분석은 둘을 분리해서 다룬다. 모델 크기와 MACs는 proxy다. MCU latency나 전력은 측정하지 않았다.

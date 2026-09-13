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

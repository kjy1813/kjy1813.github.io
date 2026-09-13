---
layout: page
title: On-device Plant Disease Detection
description: AMB82-mini · camera → 0.4 TOPS NPU inference → LED/Serial. Hand-built TensorFlow CNN deployed as an .nb model; 17 of 20 unseen images classified correctly (85%).
img: assets/img/projects/amb82_demo.jpg
importance: 2
category: embedded
github: https://github.com/kjy1813/amb82-plant-disease-ondevice-ai
---

**Course:** Embedded System Lab (2025-2), team project (2 members) · **Board:** AMB82-mini IoT camera board (0.4 TOPS NPU) · **Training:** Python 3.10 / TensorFlow 2.14.1 · **Firmware:** Arduino IDE, C++

```
leaf → camera CH3 (224×224 RGB) → on-device NPU inference → class / score on Serial
                                                          └→ LED ON when the leaf is classified as diseased
```

No image ever leaves the board: inference runs on the NPU, so the system responds locally and does not depend on a server.

## The pivot that shaped the project

The first plan was Teachable Machine → `.h5` → Realtek AmebaPro2 converter → board. The exported `.h5` was not accepted by the converter. Rather than work around the converter, the team dropped the no-code model and wrote the CNN directly in TensorFlow (six Conv2D–MaxPool–BatchNorm blocks, 16→512 filters, Dense 1024 / 64 / softmax), trained it locally, converted the resulting `model.h5` with the AmebaPro2 tool (CNN-RGB, scale 1/255, one representative image) and loaded the `.nb` from the SD card.

## Validation

The final system was tested with 20 cabbage-leaf images that were not used for training, 10 per class. 17 were classified correctly (85%), meeting the project target. The test exercised the whole deployment path — camera input, NPU inference, class mapping, LED/Serial output — not the TensorFlow model in isolation.

## My part

Collected and labeled the normal/diseased leaf image set, co-wrote the Arduino C++ firmware (camera/NPU pipeline, result callback, LED control), and produced the presentation material. Model training and the field demo were led by my teammate.

## Limits

Two classes, a few hundred images per class, a 0.4 TOPS NPU and int8 quantization: adequate for classification, not for detection or segmentation. A mobile app, cloud storage and irrigation control were planned but not implemented.

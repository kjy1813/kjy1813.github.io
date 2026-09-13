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

---

## 한국어

**과목:** 임베디드시스템실험 (2025-2), 팀 프로젝트 (2인) · **보드:** AMB82-mini IoT 카메라 보드 (0.4 TOPS NPU) · **학습:** Python 3.10 / TensorFlow 2.14.1 · **펌웨어:** Arduino IDE, C++

```
잎 → 카메라 CH3 (224×224 RGB) → 온디바이스 NPU 추론 → Serial에 class / score 출력
                                                   └→ 질병으로 분류되면 LED ON
```

이미지는 보드 밖으로 나가지 않는다. 추론이 NPU에서 이루어지므로 서버 없이 로컬에서 바로 응답한다.

### 프로젝트의 방향을 바꾼 전환점

처음 계획은 Teachable Machine → `.h5` → Realtek AmebaPro2 converter → 보드였다. 내보낸 `.h5`를 converter가 받아주지 않았다. converter를 우회하는 대신 no-code 모델을 버리고 TensorFlow로 CNN을 직접 작성했다(Conv2D–MaxPool–BatchNorm 블록 6개, 필터 16→512, Dense 1024 / 64 / softmax). 로컬에서 학습한 `model.h5`를 AmebaPro2 도구로 변환하고(CNN-RGB, scale 1/255, 대표 이미지 1장) `.nb`를 SD 카드에서 로드했다.

### 검증

학습에 쓰지 않은 배추 잎 이미지 20장(클래스당 10장)으로 최종 시스템을 테스트했다. 17장을 맞춰 85%로 프로젝트 목표를 달성했다. 이 테스트는 TensorFlow 모델 단독이 아니라 카메라 입력, NPU 추론, class 매핑, LED/Serial 출력까지 배포 경로 전체를 거쳤다.

### 내 역할

정상/질병 잎 이미지 데이터를 수집·라벨링했고, Arduino C++ 펌웨어(카메라/NPU 파이프라인, 결과 callback, LED 제어)를 공동 작성했으며, 발표자료를 제작했다. 모델 학습과 현장 시연은 팀원이 주도했다.

### 한계

클래스 2개, 클래스당 수백 장의 이미지, 0.4 TOPS NPU와 int8 quantization은 분류에는 충분하지만 detection이나 segmentation에는 부족하다. 모바일 앱, 클라우드 저장, 관개 제어는 계획만 하고 구현하지 못했다.

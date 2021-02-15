---
layout: post
title: "CycleGAN : Unpaired Image-to-Image Translation using Cycle-Consistent Adversarial Networks"
categories: [machine_learning]
tags: [machine learning, vision, generative model]
comments: true
---

**1. Basic Information**

- Authors : Jun-Yan Zhu, Taesung Park, Phillip Isola, Alexei A. Efros (BAIR Lab. in UC Berkeley)
- Accpted at CVPR 2017
- Paper link : [https://arxiv.org/abs/1911.09886](https://arxiv.org/pdf/1703.10593v6.pdf)

**2. Abstract**

- Image-to-image translation

![Image-to-image translation](/img/posts/cycleGAN/2021-02-04__3.01.43.png)

- 기존의 방법은 training set으로 paired data인 (input_image, output_image)을 이용함.
- 이 논문은 paired data의 존재 없이 $$G:X(source~domain)\rightarrow Y(target~domain)$$인 함수 $$G$$를 찾는 방법을 제안함.
- Collection style transfer, object transfiguration, season transfer, photo enhencement 등의 여러 Task에 적용한 결과를 제공함.

**3. Introduction**

- 사람은 (input_image, ouput_image)의 집합이 없어도 source domain과 target domain에 대한 지식으로 translation의 결과를 예측할 수 있음.
- (input_image, output_image)의 집합은 수집하기 어려운 경우가 많음.
    - sementic segmentation, artistic stylization 등
- 이 논문에서는 (input_image, output_image)가 존재하지 않는 unsupervised 환경에서 특정 source 이미지 집합의 특징을 파악하고, 이것이 target 이미지 집합에서 어떻게 변하는지를 알아내는 방법을 제안함.

![Paired data and unpaired data](/img/posts/cycleGAN/2021-02-10__2.07.12.png)  

- $$G:X \rightarrow \hat{Y}, ~ \hat{Y} \simeq Y$$를 만족시키는 $$G$$는 무수히 많이 존재함. 일례로, $$X$$에 속한 모든 이미지에 대해 $$Y$$ 내의 특정 이미지 하나를 대응시키는 constant mapping도 $$G$$가 될 수 있음. 실제로 optimization 과정에서 constant mapping이 되어 $$Y$$의 분포를 따르지 않는 **mode collapse**가 발생.
- cycle consistent : $$G:X \rightarrow Y$$와 $$F:Y \rightarrow X$$가 있을 때 $$G$$, $$F$$는 서로 inverse mapping이어야 함. 즉, $$G$$는 bijection이어야 함. constant mapping의 경우 bijection이 아님.
- cycle consistency loss : $$F(G(x)) \approx x,~G(F(y)) \approx y$$를 만족시키게 만드는 loss term. 이를 adversarial loss와 합쳐 image-to-image translation을 가능하게 함.

**4. Related Work**

- GAN
    - 생성자 Generator와 판별자 Discriminator가 서로의 성능을 개선해 적대적으로 경쟁해 나가는 모델.
    - 생성자는 판별자는 열심히 속이려고 하고, 판별자는 생성자를 통해서 생성된 이미지인지, 실제 이미지인지를 판별하기 위해 노력함.
    - 경쟁이 지속되면 생성자는 실제 이미지에 가까운 분포를 가진 이미지를 생성하게 되고, 판별자는 0.5의 확률로 판별을 할 수 있게 됨.

![GAN descrption](/img/posts/cycleGAN/2021-02-15__1.58.16.png)

- Image-to-Image Translaton
    - non-parametric texture model → CNN → pix2pix (paired)
- Unpaired Image-to-Image Translation
    - Markov random field → CoGAN (task-specific)
- Cycle Consistency
    - vision, nlp (back translation and reconciliation), 3D shape matching, co-segmentation, dense semantic alignment, depth estimation.
- Neural Style Transfer
    - Matching the Gram matrix statistics. (task-specific)

**5. Formulation**

- $$\{x_i\}_{i=1}^{N}$$과 $$\{y_j\}_{j=1}^{M}$$이 학습 데이터로 존재하는 상태에서 생성자 $$G:X \rightarrow Y$$와 $$F:Y \rightarrow X$$, 판별자 $$D_X$$와 $$D_Y$$를 구하는 것이 목표임. $$D_X$$는 $$X$$에 속한 이미지들의 집합인 $$\{x\}$$와 $$Y$$로부터 생성된 이미지들의 집합인 $$\{F(y)\}$$를 구별하는 것이 목표이고, $$D_Y$$는 $$Y$$에 속한 이미지들의 집합인 $$\{y\}$$와 $$X$$로부터 생성된 이미지들의 집합인 $$\{G(x)\}$$를 구별하는 것이 목표임. 이를 위해 adversarial loss와 cycle consistency loss를 도입.
- Adversarial Loss
    - 생성된 이미지들의 분포가 target domain에 속한 이미지들의 분포와 유사하게 만듦.
    - Discriminator는 주어진 이미지가 진짜 이미지일 확률을 반환.

![adversarial loss](/img/posts/cycleGAN/2021-02-10__4.36.38.png)

- Cycle Consistency Loss
    - $$G$$와 $$F$$가 서로의 inverse mapping이 되어 $$F(G(x))=x$$, $$G(F(y))=y$$를 만족시킬 경우 mode collapse 등의 문제점을 없앨 수 있을 것임.

![cycle consistency loss](/img/posts/cycleGAN/2021-02-11__3.06.01.png)

- Full Objective loss
    - 판별자를 먼저 학습시킴.

![fully objective loss](/img/posts/cycleGAN/2021-02-11__3.16.41.png)

![optimization problem](/img/posts/cycleGAN/2021-02-11__3.17.29.png)

**6. Implementation**

**Network Architecture**

- Generative network
    - Two stride-2 convolutions, several residual blocks(6 : 128 x 128 images, 9 : 256 x 256), two fractionally strided convolutions with stride 1/2.
- Discriminator network
    - 70 x 70 PatchGAN
    - 70 x 70 단위의 이미지 조각이 진짜인지 가짜인지를 판별함.
    - 전체 이미지에 대한 discriminator에 비해 파라미터 수가 작고, 임의의 크기의 이미지에 대해서도 이용 가능.

![network architecture](/img/posts/cycleGAN/2021-02-15__2.19.08.png)

**Training details**

- Train $$G$$ to minimize $$\mathbb{E}_{x \sim p_{data}(x)}[(D(G(x)) - 1)^2]$$ and train $$D$$ to minimize $$\mathbb{E}_{y \sim p_{data}(y)}[(D(y) - 1)^2] + \mathbb{E}_{x \sim p_{data}(x)}[(D(G(x))^2]$$.
- Model oscillation을 줄이기 위해 Discriminator를 학습시킬 때 버퍼를 두어 이전의 생성자가 생성한 50개의 이미지들에 대해서도 진짜인지 가짜인지를 판별하게 만듦.
- $$\lambda=10$$, Adam optimizer with learning rate = 0.0002, batch size = 1.

**7. Evaluation**

- Baselines : CoGAN, S/imgAN, Feature loss + GAN, BiGAN/ALI, pix2pix 등
- AMT perceptual studies : 25명의 참가자에게 실제 이미지와 생성된 이미지 40쌍을 비교하여 어느것이 진짜 같은지 선택하게 했음. 한 번에 한 알고리즘만 테스트, 참가자들은 한 번만 참가할 수 있음.
    - 대략 25%의 참가자들을 속일 수 있었고, 이는 다른 baseline 모델들을 압도하는 결과임.

![AMT perceptual studies](/img/posts/cycleGAN/2021-02-15__1.22.30.png)

- FCN score : cityscapes labels → photo task에 이용했고, 생성된 사진에 sementic segmentation을 수행하여 실제 결과와 얼마나 일치하는지 판단.
    - per-pixel accuracy, per-class accuracy, mean class Intersection-Over-Union 등의 지표를 이용.

![FCN score description](/img/posts/cycleGAN/2021-02-15__1.26.09.png)

![FCN score 1](/img/posts/cycleGAN/2021-02-15__1.22.57.png)

![FCN score 2](/img/posts/cycleGAN/2021-02-15__1.23.58.png)

![FCN score 3](/img/posts/cycleGAN/2021-02-15__1.27.19.png)

![FCN score 4](/img/posts/cycleGAN/2021-02-15__1.27.43.png)

- GAN loss를 없애는 것과 cycle-consistency loss를 없애는 것 모두 성능을 낮춤. 특히 cycle-consistency loss를 낮추는 것은 학습 안정성을 낮추고 mode collapse를 발생시킴.
- ordered pair가 없었음에도 불구하고 fully supervised pix2pix의 결과와 유사함.
- Collection style transfer, Object transfiguration, Season transfer, Photo generation from paintings 등의 paired training data가 존재하지 않는 분야에 적용 가능한 것을 확인함.
    - Collection style transfer

    ![Collection style transfer](/img/posts/cycleGAN/2021-02-15__10.34.18.png)

    - Object transfiguration

    ![Object transfiguration](/img/posts/cycleGAN/2021-02-15__10.40.28.png)

    - Season transfer

    ![Season transfer](/img/posts/cycleGAN/2021-02-15__10.36.26.png)

    - Photo generation from paintings

    ![Photo generation from paintings](/img/posts/cycleGAN/2021-02-15__10.34.50.png)

**8. Limitations and Discussion**

- Uniformly positive하지 않음. 잘 되지 않는 극단적인 경우도 존재.
- 색, 질감 변화의 경우 대부분 성공적이었지만, 모양을 직접적으로 변화시켜야 하는 경우 거의 성공하지 못함.
- Training datasets에 포함되지 않은 사진의 경우 제대로 변화시키지 못하는 경우가 종종 있었음.
- Paired training data가 존재하는 경우와 비교했을 때 결과물이 현저히 차이나는 경우가 있었음. 이런 경우 weak semantic supervision을 적용해야 할 것으로 예상함.
- Unpaired data는 paried data에 비해 매우 많고, 본 연구는 이러한 unsupervised setting에서 어떤 translation이 가능한지 알려주는 역할을 할 수 있을 것임.

![limitations and discussion](/img/posts/cycleGAN/2021-02-15__1.40.20.png)

**9. Comment**

- `개 → 고양이 → 개`, `고양이 → 개 → 고양이`인 경우는 없을까?
- GAN도 그렇지만 아이디어가 정말 돋보이는 논문인 것 같음.
- 논문에 사진이 정말 많은데, 자신들의 결과에 대한 자신감이 있는 것 같음. 실제로 다양한 예시가 있어 내용 이해를 돕기도 했음. 하지만 페이지가 길어지고, 문단의 가독성이 떨어지는 것을 확인함.
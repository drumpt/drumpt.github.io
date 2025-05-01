---
title: 'AdapTable: Test-Time Adaptation for Tabular Data via Shift-Aware Uncertainty Calibrator and Label Distribution Handler'
authors:
  - admin
  - Taewon Kim
  - Seungyeon Woo
  - June Yong Yang
  - Eunho Yang
author_notes:
  - 'Equal contribution'
  - 'Equal contribution'
date: '2024-10-03T00:00:00Z'
publishDate: '1998-03-20T00:00:00Z'
publication_types: ['3']
publication: NeurIPS Workshop on Table Representation Learning, 2024
publication_short: NeurIPSW-TRL 2024

url_pdf: 'https://openreview.net/forum?id=yhD2icebZ0#discussion'
url_preprint: 'https://arxiv.org/abs/2407.10784'
url_code: 'https://github.com/drumpt/AdapTable'
image:
  caption: 'Image credit: [**Unsplash**](https://unsplash.com/photos/pLCdAaMFLTE)'
  focal_point: ''
  preview_only: false

note: ""
abstract: "In real-world scenarios, tabular data often suffer from distribution shifts that threaten the performance of machine learning models. Despite its prevalence and importance, handling distribution shifts in the tabular domain remains underexplored due to the inherent challenges within the tabular data itself. In this sense, test-time adaptation (TTA) offers a promising solution by adapting models to target data without accessing source data, crucial for privacy-sensitive tabular domains. However, existing TTA methods either 1) overlook the nature of tabular distribution shifts, often involving label distribution shifts, or 2) impose architectural constraints on the model, leading to a lack of applicability. To this end, we propose AdapTable, a novel TTA framework for tabular data. AdapTable operates in two stages: 1) calibrating model predictions using a shift-aware uncertainty calibrator, and 2) adjusting these predictions to match the target label distribution with a label distribution handler. We validate the effectiveness of AdapTable through theoretical analysis and extensive experiments on various distribution shift scenarios. Our results demonstrate AdapTable's ability to handle various real-world distribution shifts, achieving up to a 16% improvement on the HELOC dataset."
summary: ""
tags: []
featured: true
---

---
# Leave the homepage title empty to use the site title
title:
date: 2022-10-24
type: landing

sections:
    - block: github.drumpt.about
      id: about
      content:
          title:
          username: admin

    - block: github.drumpt.news
      id: news
      content:
          title: News
          filters:
              folders:
                  - news
      design:
          columns: "1"
          view: news

    - block: github.drumpt.experience
      id: experience
      content:
          title: Professional Experience
          date_format: Jan 2006
          items:
              - company: AITRICS
                company_logo: aitrics
                company_url: "https://www.aitrics.com/en/"
                location: Seoul, South Korea
                items:
                    - title: Machine Learning Researcher
                      date_start: "2023-11-20"
              - company: KAIST Machine Learning and Intelligence Lab
                company_logo: mlilab
                company_url: "https://mli.kaist.ac.kr/"
                location: Daejeon, South Korea
                items:
                    - title: Master's Student Researcher
                      date_start: "2022-03-02"
                      date_end: "2024-02-27"
                    - title: Undergraduate Researcher
                      date_start: "2021-06-28"
                      date_end: "2022-02-25"
              - company: KAIST Applied Artificial Intelligence Lab
                company_logo: aailab
                company_url: "https://aai.kaist.ac.kr/"
                location: Daejeon, South Korea
                items:
                    - title: Developer
                      date_start: "2021-09-07"
                      date_end: "2022-01-11"
              - company: DeepNatural
                company_logo: deepnatural
                company_url: "https://deepnatural.ai/"
                location: Seoul, South Korea
                items:
                    - title: Machine Learning Engineer
                      date_start: "2020-09-14"
                      date_end: "2021-02-26"
              - company: KAIST Vehicular Intelligence Lab
                company_logo: vil
                company_url: "https://vil.kaist.ac.kr/"
                location: Daejeon, South Korea
                items:
                    - title: Undergraduate Researcher
                      date_start: "2019-10-15"
                      date_end: "2020-08-15"
              - company: Netmarble
                company_logo: netmarble
                company_url: "https://www.netmarble.net/"
                location: Seoul, South Korea
                items:
                    - title: Data Engineer
                      date_start: "2019-06-24"
                      date_end: "2019-08-16"

    - block: github.drumpt.news
      id: publications
      content:
          title: Publications
          filters:
              folders:
                  - publications
      design:
          columns: "1"
          view: publication

    - block: github.drumpt.news
      id: patents
      content:
          title: Patents
          filters:
              folders:
                  - patents
      design:
          columns: "1"
          view: patent

    - block: github.drumpt.others
      id: honors
      content:
          title: Honors and Awards
          items:
              # - title: Best Member
              #   organization: KAIST Machine Learning and Intelligence Lab
              #   date: Jul 2023
              - title: Dongwon Full Masters Scholarship
                organization: Dongwon Group
                date: Spring 2022–Fall 2023
              - title: Magna Cum Laude
                organization: KAIST College of Engineering
                date: Feb 2022
              - title: Silver Prize
                organization: Korean Undergraduate Mathematics Competition, Korean Mathematics Society
                date: Jan 2022
              - title: Overseas Exchange Scholarship
                organization: Mirae Asset
                date: Dec 2019
              - title: Representative of Student Exchange Ambassador
                organization: KAIST
                date: Nov 2019
              - title: Honor Student
                organization: KAIST College of Engineering
                date: Sep 2019
              - title: KAIST Convergence AMP Scholarship
                organization: KAIST School of Computing
                date: Mar 2019
              - title: Winner
                organization: Science Quiz, KAIST-POSTECH Science War
                date: Sep 2018
              - title: National Full Undergraduate Scholarship
                organization: Korea Student Aid Foundation
                date: Spring 2017–Fall 2021

    - block: github.drumpt.others
      id: teaching
      content:
          title: Teaching Experience
          items:
              - title: Teaching Assistant
                organization: Tabular Learning, Hanwha Ocean Capstone Project
                date: Spring 2023
              - title: Teaching Assistant
                organization: AI Soccer Challenge, Bokja Girls' High School AI Education Program
                date: Fall 2020

    - block: github.drumpt.others
      id: service
      content:
          title: Academic Service
          items:
              - title: Journal Reviewer
                items:
                    - organization: Transactions on Machine Learning Research (**TMLR**)
                      date: 2024
              - title: Conference Reviewer
                items:
                    - organization: Conference on Neural Information Processing Systems (**NeurIPS**)
                      date: 2024
                    - organization: International Conference on Machine Learning (**ICML**)
                      date: 2025
                    - organization: International Conference on Learning Representations (**ICLR**)
                      date: 2025
                    # - organization: International Conference on Artificial Intelligence and Statistics (**AISTATS**)
                    #   date:
                    - organization: IEEE International Conference on Acoustics, Speech, and Signal Processing (**ICASSP**)
                      date: 2025
                    - organization: Learning on Graphs Conference (**LoG**)
                      date: 2024
              - title: Workshop Reviewer
                items:
                    - organization: NeurIPS Workshop on Mathematical Reasoning and AI (**NeurIPSW-MATH-AI**)
                      date: 2024
                    - organization: NeurIPS Workshop on Time Series in the Age of Large Models (**NeurIPSW-TSALM**)
                      date: 2024
                    - organization: ECCV Workshop on Women in Computer Vision (**ECCVW-WiCV**)
                      date: 2024

    - block: github.drumpt.others
      id: projects
      content:
          title: Projects
          items:
              - title: Meta-Learning Applicable to Real-World Problems
                organization: Institute of Information & Communications Technology Planning & Evaluation (IITP)
                date: May 2023–Feb 2024
              - title: Development of Plug and Play Explainable Artificial Intelligence Platform
                organization: Institute of Information \& Communications Technology Planning \& Evaluation (IITP)
                date: Mar 2022–Apr 2023
              - title: Confidence Interval Estimation and Performance Relationship Analysis for Tire Performance Prediction Models
                organization: Hankook Tire \& Technology
                date: Nov 2023–Jan 2024
              - title: Integrated Tire Performance Prediction Model Using Tire Pattern Features
                organization: Hankook Tire \& Technology
                date: Mar 2022–Apr 2023
              - title: Convergence Analysis of Deep Learning Optimizers Under Generalized Smoothness
                organization: "KAIST AI616: Deep Learning Theory"
                date: Sep 2023–Dec 2023
              - title: How Many Times are We Going to Collaborate?
                organization: "KAIST AI607: Graph Mining and Social Network Analysis"
                date: Sep 2022–Dec 2022
              - title: Few-Shot Font Generation for Korean
                organization: "KAIST AI604: Deep Learning for Computer Vision"
                date: Mar 2022–Jun 2022
              - title: Issue Trend Analysis and Issue Tracking Analysis
                organization: "KAIST CS474: Text Mining"
                date: Mar 2021–Jun 2021
              - title: KAIST Educational Network System (KENSv3)
                organization: "KAIST CS341: Introduction to Computer Networks"
                date: Mar 2021–Jun 2021
              - title: "TinyMutator: Mutation Testing Tool for Rust"
                organization: "KAIST CS453: Automated Software Testing"
                date: Mar 2020–Jun 2020
              - title: Immersion Camp
                organization: "KAIST CS496: Intensive Programming and Startup"
                date: Dec 2019–Jan 2020
              - title: PintOS
                organization: "KAIST CS330: Operating Systems and Lab"
                date: Mar 2019–Jun 2019

    # - block: github.drumpt.collection
    #   id: blog
    #   content:
    #       title: Blog
    #       subtitle: ""
    #       text: ""
    #       count: 5
    #       filters:
    #           folders:
    #               - blog
    #           author: ""
    #           category: ""
    #           tag: ""
    #           exclude_featured: false
    #           exclude_future: false
    #           exclude_past: false
    #           publication_type: ""
    #       offset: 0
    #       order: desc
    #   design:
    #       columns: "1"
    #       view: compact
---

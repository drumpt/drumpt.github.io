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
  - block: github.drumpt.collection
    id: news
    content:
      title: News
      filters:
        folders:
          - news
        # exclude_featured: true
    design:
      columns: '1'
      view: news
  - block: github.drumpt.collection
    id: publication
    content: 
      title: Publications
      # text: |-
      #   {{% callout note %}}
      #   Quickly discover relevant content by [filtering publications](./publication/).
      #   {{% /callout %}}
      filters:
        folders:
          - publication
        # exclude_featured: true
    design:
      columns: '1'
      view: publication # citation, compact, showcase, news, publication
  - block: github.drumpt.experience
    id: experience
    content:
      title: Experience
      date_format: Jan 2006
      # Experiences.
      #   Add/remove as many `experience` items below as you like.
      #   Required fields are `title`, `company`, and `date_start`.
      #   Leave `date_end` empty if it's your current employer.
      #   Begin multi-line descriptions with YAML's `|2-` multi-line prefix.
      items:
        - title: Machine Learning Researcher
          company: AITRICS
          company_url: 'https://en.aitrics.com/'
          company_logo: 
          location: Seoul, South Korea
          date_start: '2023-11-20'
          # description: |2-
          #     Responsibilities include:

          #     * Analysing
          #     * Modelling
          #     * Deploying
        - title: Master's Student Researcher
          company: KAIST Machine Learning and Intelligence Lab
          company_url: 'https://mli.kaist.ac.kr/'
          company_logo: 
          location: Daejeon, South Korea
          date_start: '2022-03-02'
          date_end: '2024-02-27'
        - title: Undergraduate Researcher
          company: KAIST Machine Learning and Intelligence Lab
          company_url: 'https://mli.kaist.ac.kr/'
          company_logo: 
          location: Daejeon, South Korea
          date_start: '2021-06-28'
          date_end: '2022-02-25'
        - title: Developer Intern
          company: KAIST Applied Artificial Intelligence Lab
          company_url: 'https://aai.kaist.ac.kr/'
          company_logo: 
          location: Daejeon, South Korea
          date_start: '2021-09-07'
          date_end: '2022-01-11'
          # description: Taught electronic engineering and researched semiconductor physics.
        - title: Machine Learning Engineer Intern
          company: DeepNatural
          company_url: 'https://deepnatural.ai/'
          company_logo: 
          location: Seoul, South Korea
          date_start: '2020-09-14'
          date_end: '2021-02-26'
        - title: Undergraduate Researcher
          company: KAIST Vehicular Intelligence Lab
          company_url: 'https://vil.kaist.ac.kr/'
          company_logo: 
          location: Daejeon, South Korea
          date_start: '2019-10-15'
          date_end: '2020-08-15'
        - title: Data Engineer Intern
          company: Netmarble
          company_url: 'https://www.netmarble.net/'
          company_logo: 
          location: Seoul, South Korea
          date_start: '2019-06-24'
          date_end: '2019-08-16'
  # - block: portfolio
  #   id: projects
  #   content:
  #     title: Projects
  #     filters:
  #       folders:
  #         - project
  #     # Default filter index (e.g. 0 corresponds to the first `filter_button` instance below).
  #     default_button_index: 0
  #     # Filter toolbar (optional).
  #     # Add or remove as many filters (`filter_button` instances) as you like.
  #     # To show all items, set `tag` to "*".
  #     # To filter by a specific tag, set `tag` to an existing tag name.
  #     # To remove the toolbar, delete the entire `filter_button` block.
  #     buttons:
  #       - name: All
  #         tag: '*'  
  #       - name: Deep Learning
  #         tag: Deep Learning
  #       - name: Other
  #         tag: Demo
  #   design:
  #     # Choose how many columns the section has. Valid values: '1' or '2'.
  #     columns: '1'
  #     view: showcase
  #     # For Showcase view, flip alternate rows?
  #     flip_alt_rows: false
  # - block: 'github.drumpt.collection'
  #   id: posts
  #   content:
  #     title: Posts
  #     subtitle: ''
  #     text: ''
  #     # Choose how many pages you would like to display (0 = all pages)
  #     count: 5
  #     # Filter on criteria
  #     filters:
  #       folders:
  #         - post
  #       author: ""
  #       category: ""
  #       tag: ""
  #       exclude_featured: false
  #       exclude_future: false
  #       exclude_past: false
  #       publication_type: ""
  #     # Choose how many pages you would like to offset by
  #     offset: 0
  #     # Page order: descending (desc) or ascending (asc) date.
  #     order: desc
  #   design:
  #     # Choose a layout view
  #     columns: '1'
  #     view: compact
---

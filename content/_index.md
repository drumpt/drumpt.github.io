---
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
          filters:
              folders:
                  - experience

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
      id: awards
      content:
          title: Awards and Honors
          filters:
              folders:
                  - awards

    - block: github.drumpt.others
      id: teaching
      content:
          title: Teaching Experience
          filters:
              folders:
                  - teaching

    - block: github.drumpt.others
      id: service
      content:
        title: Academic Service
        filters:
          folders:
            - service
---

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
      id: education
      content:
          title: Education
          date_format: Jan 2006
          filters:
              folders:
                  - education

    - block: github.drumpt.experience
      id: experience
      content:
          title: Employment
          date_format: Jan 2006
          filters:
              folders:
                  - employment

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

    - block: github.drumpt.others
      id: awards
      content:
          title: Awards and Honors
          filters:
              folders:
                  - awards
      design:
          compact: true

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

    - block: github.drumpt.others
      id: talks
      content:
        title: Invited Talks
        filters:
          folders:
            - talks
---

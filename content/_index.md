---
type: landing
# Home page blocks, in order. Each `site.*` block lives in
# layouts/partials/blocks/ and reads its entries from content/<folder>/.
sections:
  - block: site.about
    id: about
    content: {username: admin}

  - block: site.news
    id: news
    content: {title: News, folder: news}

  - block: site.timeline
    id: education
    content: {title: Education, folder: education}

  - block: site.timeline
    id: experience
    content: {title: Employment, folder: employment}

  - block: site.publications
    id: publications
    content: {title: Publications, folder: publications}

  - block: site.list
    id: awards
    content: {title: Awards and Honors, folder: awards}

  - block: site.list
    id: teaching
    content: {title: Teaching Experience, folder: teaching}

  - block: site.list
    id: service
    content: {title: Academic Service, folder: service}

  - block: site.list
    id: talks
    content: {title: Invited Talks, folder: talks}
    design: {split: true}
---

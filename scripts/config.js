const FETCH_CONFIG = [
  {
    url: './assets/data/config.json',
    parseFn: parseConfig
  },
  {
    url: './assets/data/skills.json',
    parseFn: parseSkills
  },
  {
    url: './assets/data/projects.json',
    parseFn: parseProjects
  },
  {
    url: './assets/data/readable_links.json',
    parseFn: parseGeneralFn
  },
  {
    url: './assets/data/questions.json',
    parseFn: parseQuestionFn
  },
  {
    url: '/assets/data/requirements.json',
    parseFn: parseReqnFn
  },
  {
    url: '/assets/data/ideas.json',
    parseFn: parseIdeasFn
  },
  {
    url: '/assets/data/me.json',
    parseFn: parseMyDetailsFn
  }
]

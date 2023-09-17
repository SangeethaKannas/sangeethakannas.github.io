const FETCH_CONFIG = [
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
  },
  {
    url: ,
    parseFn: 
  }
]

FETCH_CONFIG.forEach(config => {
  api(config.url).then(config.parseFn).catch(handleError)
})

api()
  .then(data => myDetails = data)
  .then()
  .catch(handleError);

var acc = document.querySelectorAll(".accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}
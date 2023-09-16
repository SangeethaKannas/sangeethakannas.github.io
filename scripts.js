//Append tabs - In Reverse Order
const tabsElement = document.querySelector('.tabs');

const currentLocation = window.location.href;
let tabs = [];
if (currentLocation.indexOf('pesto') > -1) {
  tabs = ['SWOT', 'Questions']
} else if (currentLocation.indexOf('me') > -1) {
  tabs = ['Requirements', 'Ideas', 'OSS', 'Blogs', 'Resources']
} else {
  tabs = ['Experience', 'Projects', 'Skills', 'About Me'];
}

tabs.forEach(currentText => {
  const currentTextLowerCase = currentText.replace(' ', '-').toLowerCase();
  let input = document.createElement("input");
  input.setAttribute('type', 'radio');
  input.setAttribute('name', 'tabs');
  input.setAttribute('id', currentTextLowerCase);
  input.setAttribute('checked', '');

  let label = document.createElement("label");
  label.classList.add('tab-label');
  label.setAttribute('for', currentTextLowerCase);
  label.innerText = currentText;

  tabsElement.prepend(label);
  tabsElement.prepend(input);
});

const handleError = error => console.error(error);
const parseResponse = response => response.json();
const requirementsReduceFn = (acc, value) => `${acc}<li>${value}</li>`;

//Parse the resources and links
const parseGeneralFn = data => {
  const reducerFn = (acc, value) => `${acc}<h2>${value}</h2>` + data[value].reduce(requirementsReduceFn, '');

  document.getElementById('links')
    .innerHTML = Object.keys(data).reduce(reducerFn, '')
}

// const parseSkills = data => {
//   console.log(data)
// }

const createProject = project => {
  return `
    <section class='project-section'>
      <div class='flex'>
          <span class='grid-label'>Project Name</span>
          <span class='project-name'><a href=${project.link} target="_blank">${project.name}</a></span>
      </div>
      <div class='flex'>
          <span class='grid-label'>Duration</span>
          <span class='project-duration'>${project.duration}</span>
      </div>
      <div class='flex'>
          <span class='grid-label'>Description</span>
          <span class='project-desc'>${project.description}</span>
      </div>
      <div class='flex'>
          <span class='grid-label'>Environment</span>
          <span class='project-env'>${project.environment}</span>
      </div>
  </section>`
}

const parseProjects = projects => {
  const reducerFn = (acc, project) => acc + createProject(project);
  document.getElementById('projects-tab')
    .innerHTML = projects.reduce(reducerFn, '')
}

const parseSkills = skills => {
  
}

fetch('./assets/data/projects.json')
  .then(parseResponse)
  .then(parseProjects)
  .catch(handleError)

fetch('./assets/data/skills.json')
  .then(parseSkills)
  .catch(handleError)

fetch('./assets/data/readable_links.json')
  .then(parseResponse)
  .then(parseGeneralFn)
  .catch(handleError);

const expandListItem = (event) => {
  // console.log(event);
  // const _target = event.currentTarget;

  // Array.from(_target.parentElement.children).forEach(element => {
  //   element.classList.add('is-closed');
  // });
  _target.classList.toggle('is-closed');
}
const parseQuestionFn = data => {
  const questionsReduceFn = (acc, value) =>
    acc +
    `<li class="question-list-item is-closed" onclick="expandListItem(event)">
            <div class="question-answer">
              <div class="question-span">
                <h4>${value.question}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="question-open-icon">
                    <path opacity="0" d="M0 0h24v24H0z"></path>
                    <path d="M20.207 7.043c-.39-.39-1.023-.39-1.414 0L12 13.836 5.207 7.043c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414l7.5 7.5c.195.195.45.293.707.293s.512-.098.707-.293l7.5-7.5c.39-.39.39-1.023 0-1.414z"></path>
                  </svg>
                </h4>
              </div>
              <span class="answer-span">${value.answer}</span>
            </div>
          </li>`;
  const reducerFn = (acc, value) => `${acc}<h2>${value}</h2>` + data[value].reduce(questionsReduceFn, '');
  document.getElementById('all-questions')
    .innerHTML = Object.keys(data).reduce(reducerFn, '')
}

fetch('./assets/data/questions.json')
  .then(parseResponse)
  .then(parseQuestionFn)
  .catch(handleError);

const parseReqnFn = data => {
  const reducerFn = (acc, value) => `${acc}<h2>${value}</h2>` + data[value].reduce(requirementsReduceFn, '');

  document.getElementById('requirements-article')
    .innerHTML = Object.keys(data).reduce(reducerFn, '')
}

fetch('/assets/data/requirements.json')
  .then(parseResponse)
  .then(parseReqnFn)
  .catch(handleError);

const parseIdeasFn = data => {
  const reducerFn = (acc, value) => `${acc}<h2>${value}</h2>${data[value].reduce(requirementsReduceFn, '')}`;

  document.getElementById('ideas-article')
    .innerHTML = Object.keys(data).reduce(reducerFn, '')
}

fetch('/assets/data/ideas.json')
  .then(parseResponse)
  .then(parseIdeasFn)
  .catch(handleError);

let myDetails = {};
fetch('/assets/data/me.json')
  .then(parseResponse)
  .then(data => myDetails = data)
  .then(() => {

    const swotSection = document.querySelector(".swot");
    const swot = myDetails['SWOT'];
    const swotKeys = Object.keys(swot);
    const swotParseFn = (acc, val) =>
      `${acc}<article class="${val}">
              <div>
                <h3>${Object.keys(swot[val])[0]}</h3>
                <ul>
                  ${Object.values(swot[val])[0].reduce(requirementsReduceFn)}
                </ul>
              </div>
              <div>
                <h3>${Object.keys(swot[val])[1]}</h3>
                <ul>
                  ${Object.values(swot[val])[1].reduce(requirementsReduceFn)}
                </ul>
              </div>
            </article>`;
    swotSection.innerHTML = `<h2>SWOT</h2>${swotKeys.reduce(swotParseFn, '')}`;

    const projectsSection = document.querySelector(".projects");
    const projects = myDetails['Projects'];
    projectsSection.innerHTML =
      `<h2>Projects</h2>
            ${projects.reduce((acc, value) => acc +
        ` <h5>
                  <a href="${value.link}" target="_blank" rel="noreferrer noopener">${value.name}</a>
                  <span class="duration">${value.duration}
                </h5>
                <code>
                  Environment: ${value.environment}
                </code>
              `, '')}`;

    // const careerHighlightSection = document.querySelector(".career-highlight");
    // careerHighlightSection.innerHTML =
    //   `<h2>Career Highlight</h2>
    //     <ul>
    //       ${myDetails['Career Highlight'].reduce(requirementsReduceFn, '')}
    //     </ul>
    //   `
    const skillsReduceFn = (acc, value) => acc +
      `<code>
                <a href="${value.link}" title="${value.name}">${value.image}</a>
             </code>`

    const skillsSection = document.querySelector(".technical-skills");
    const skills = myDetails['Skills'];
    skillsSection.innerHTML =
      `${Object.keys(skills)
        .reduce((acc, value) => acc + `<p>${skills[value].reduce(skillsReduceFn, '')}</p>`, '')
      }
          `
    const experience = myDetails['Experience'];
    const simpleViewSection = document.querySelector('.simple-view');
    simpleViewSection.innerHTML =
      `
            ${Object.keys(experience)
        .reduce((acc, value) =>
          `${acc}
                  <div class="organization">
                    <div class="job-details">
                      <div>
                        <span>${experience[value].organization}, </span>
                        <span>${experience[value].location} - </span> 
                        <span class="job-title">${experience[value].title}</span>
                      </div>                      
                    </div>
                    <div class="job-duration">
                      <span>${experience[value].duration}</span>
                    </div>
                    <div class="job-description">
                    <span>${experience[value].roles}</span>
                    <!--  <ul>
                        ${experience[value].responsibilities.reduce(requirementsReduceFn, '')}
                      </ul>
                    -->
                    </div>
                  </div>
              `, '')
      }
          `

    const contacts = myDetails['Contact'];
    const contactsSection = document.querySelector('.social-media-list');
    contactsSection.innerHTML = contacts
      .reduce((acc, value, index, array) =>
        `${acc}<li>
                <a href="${array[index].link}" target="_blank" rel="noopener noreferrer">
                  <i class="fa ${array[index].icon}"></i>
                  ${array[index].name}
                </a>
              </li>
            `, '')

  })
  .catch(handleError);

var acc = document.getElementsByclass("accordion");
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
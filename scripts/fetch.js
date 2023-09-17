api('./assets/data/skills.json')
  .then(parseSkills)
  .catch(handleError)

api('./assets/data/projects.json')
  .then(parseProjects)
  .catch(handleError)

api('./assets/data/projects.json')
  .then(parseProjects)
  .catch(handleError)

api('./assets/data/readable_links.json')
  .then(parseGeneralFn)
  .catch(handleError);

api('./assets/data/questions.json')
  .then(parseQuestionFn)
  .catch(handleError);

api('/assets/data/requirements.json')
  .then(parseReqnFn)
  .catch(handleError);

api('/assets/data/ideas.json')
  .then(parseIdeasFn)
  .catch(handleError);

let myDetails = {};

api('/assets/data/me.json')
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
                  ${Object.values(swot[val])[0].reduce(stringToListItemFn)}
                </ul>
              </div>
              <div>
                <h3>${Object.keys(swot[val])[1]}</h3>
                <ul>
                  ${Object.values(swot[val])[1].reduce(stringToListItemFn)}
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
    //       ${myDetails['Career Highlight'].reduce(stringToListItemFn, '')}
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
                        ${experience[value].responsibilities.reduce(stringToListItemFn, '')}
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
                <a href="${value.link}" target="_blank" rel="noopener noreferrer">
                  <i class="fa ${value.icon}"></i>
                  ${value.name}
                </a>
              </li>
            `, '')

  })
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
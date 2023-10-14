const arrayToListReducerFn = (acc, value) => `${acc}<li>${value}</li>`;

const arrayToListImgReducerFn = (acc, value) =>
    `${acc}
    <li className='flex'>
        ${value.img ? `<img src="${value.img}" class='skills-icon' />` : ""}${value.name || ''}
    </li>`;

const commonReducerFn = (data, options = {}) => {
    return Object.keys(data)
        .reduce((acc, value) => {
            return `${acc}<h2>${value}</h2>
            <ul class='flex'>
                ${data[value].reduce(options.withImg ? arrayToListImgReducerFn : arrayToListReducerFn, '')}
            </ul>`
        }, '')
}

//Parse the resources and links
const parseGeneralFn = data => {
    document.getElementById('links').innerHTML = commonReducerFn(data)
}

const parseReqnFn = data => {
    document.getElementById('requirements-article').innerHTML = commonReducerFn(data)
}

const parseIdeasFn = data => {
    document.getElementById('ideas-article').innerHTML = commonReducerFn(data)
}

const parseSkills = skills => {
    const reducerFn = (acc, skill) => {
        const currentSkill = skills[skill]
        console.log(skill)
        if (Array.isArray(currentSkill)) {
            return acc + `<h2>${skill}</h2>` + '<ul>' + currentSkill.reduce(arrayToListReducerFn, '') + '</ul>';
        } else {
            return acc + "<article><h2>" + skill + "</h2>" + commonReducerFn(currentSkill, { withImg: true }) + '</article>'
        }

    }
    document.getElementById('skills-content').innerHTML = Object.keys(skills).reduce(reducerFn, '')
}

const parseProjects = projects => {
    const reducerFn = (acc, project) => acc + createProject(project);
    document.getElementById('projects-tab')
        .innerHTML = projects.reduce(reducerFn, '')
}

const parseQuestionFn = data => {
    const questionsReduceFn = (acc, question) => acc + createQuestion(question);
    document.getElementById('all-questions')
        .innerHTML = Object.keys(data).reduce((acc, value) => `${acc}<h2>${value}</h2>` + data[value].reduce(questionsReduceFn, ''), '')
}

const parseMyDetailsFn = data => () => {

    const swotSection = document.querySelector(".swot");
    const swot = data['SWOT'];
    const swotKeys = Object.keys(swot);
    const swotParseFn = (acc, val) => `${acc}${createSwot(swot, val)}`;
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

}
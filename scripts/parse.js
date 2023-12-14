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
    links.innerHTML = commonReducerFn(data)
}

const parseReqnFn = data => {
    requirementsArticle.innerHTML = commonReducerFn(data)
}

const parseIdeasFn = data => {
    ideasArticle.innerHTML = commonReducerFn(data)
}

const parseSkills = skills => {
    const reducerFn = (acc, skill) => {
        const currentSkill = skills[skill]
        if (Array.isArray(currentSkill)) {
            return `${acc}<h2>${skill}</h2><ul>${currentSkill.reduce(arrayToListReducerFn, '')}</ul>`;
        } else {
            return `${acc}<article><h2>${skill}</h2>${commonReducerFn(currentSkill, { withImg: true })}</article>`
        }

    }
    skillsContent.innerHTML = Object.keys(skills).reduce(reducerFn, '')
}

const parseConfig = config => {
    let tabs = config.tabs;
    tabs
        .forEach(currentText => {
            const currentTextLowerCase = currentText.replace(' ', '-').toLowerCase();
            tabsElement.prepend(createLabelForTab(currentText, currentTextLowerCase));
            tabsElement.prepend(createInputForTab(currentTextLowerCase));
        });
}

const parseProjects = projects => {
    const reducerFn = (acc, project) => acc + createProject(project);
    projectsTab.innerHTML = projects.reduce(reducerFn, '')
}

const parseQuestionFn = data => {
    const questionsReduceFn = (acc, question) => acc + createQuestion(question);
    allQuestionsElement
        .innerHTML = Object.keys(data).reduce((acc, value) => `${acc}<h2>${value}</h2>` + data[value].reduce(questionsReduceFn, ''), '')
}

const parseMyDetailsFn = myDetails => {
    const aboutMeDetails = myDetails['AboutMe']
    meDetailsSection.innerHTML = Object.keys(aboutMeDetails)
        .reduce((acc, key) => `${acc}${createHeader(key, aboutMeDetails[key])}`, '')

    const contactsList = myDetails['Contacts']
    contactsSection.innerHTML = contactsList.reduce((acc, value) => `${acc}<div>${value}</div>`, '')

    const socialMediaList = myDetails['SocialMedia'];
    socialMediaSection.innerHTML = socialMediaList
        .reduce((acc, value) => `${acc}${createSocialMediaLink(value)}`, '')
}

const parseCoverLetter = coverLetter => {

    coverLetterSection.innerHTML = Object.keys(coverLetter)
        .reduce((acc, key) => {
            let value = coverLetter[key]
            if (
                typeof value === 'object' &&
                !Array.isArray(value) &&
                value !== null
            ) {
                value = Object.keys(value).reduce((acc, key) =>
                    `${acc}
                    <li class='skill-item'>
                        <span class='skill-name'>${key}</span>
                        :
                        <span class='exp-years'>${value[key]}</span>
                    </li>
                    `, '')
                value = `<ul class='skill-set-list'>${value}</ul>`
                key = `<h2>${key}</h2>`
            } else {
                value = `:${value}`
            }
            return `${acc}<li>${key}${value}</li>`
        }, '')
}

const parseSwot = data => {
    const swot = data['SWOT'];
    const swotKeys = Object.keys(swot);
    const swotParseFn = (acc, val) => `${acc}${createSwot(swot, val)}`;
    swotSection.innerHTML = `<h2>SWOT</h2>${swotKeys.reduce(swotParseFn, '')}`;
}

const projectsSection = document.querySelector(".projects");
const projects = myDetails['Projects'];
projectsSection.innerHTML =
    `<h2>Projects</h2>
        ${projects.reduce((acc, value) => acc +
        `<h5>
            <a href="${value.link}" target="_blank" rel="noreferrer noopener">${value.name}</a>
            <span class="duration">${value.duration}</span>
        </h5>
        <code>
            Environment: ${value.environment}
        </code>
        `, '')}`;

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


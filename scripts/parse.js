const arrayToListReducerFn = (acc, value) => `${acc}<li>${value}</li>`;

const arrayToListImgReducerFn = (acc, value) =>
    `${acc}
    <li class='flex skill-list-item'>
        ${value.img ? `<img src="${value.img}" class='skills-icon' />` : ""}${value.name || ''}
    </li>`;

const commonReducerFn = (data, options = {}) => {
    return Object.keys(data)
        .reduce((acc, value) => {
            return `${acc}<h2>${value}</h2>
            <ul class='flex skill-item'>
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

const skillReducerFn = (acc, skill) => {
    const currentSkill = skills[skill]
    if (Array.isArray(currentSkill)) {
        return `${acc}
                <div>
                    <h2 class='skill-header'>${skill}</h2>
                    <ul>${currentSkill.reduce((arr, value) => {
            return arrayToListReducerFn(arr, value, 'skill')
        }, '')}</ul>
                </div>
                `;
    } else {
        return `<div class='skills-wrapper'>
                    ${acc}
                    <article class='tech-skill'>
                        <h2>${skill}</h2>
                        ${commonReducerFn(currentSkill, { withImg: true })}
                    </article>
                <div>`
    }
}

const parseWitHeader = (skillName, skills) => {

    return `
        <div class="flex">
            <div class='skill'>
                <h2>${skillName}</h2>
                <div class='flex flex-wrap'>
                    ${skills.reduce(arrayToListImgReducerFn, '')}
                </div>
            </div>
        </div>
    `
}

const parseSkills = skills => {
    const techSkills = skills['Technical']
    const techkSkillsKeys = Object.keys(techSkills)

    const reduceSkills = techkSkillsKeys.reduce((concatString, techSkillKey) => {
        return concatString + parseWitHeader(techSkillKey, techSkills[techSkillKey])
    }, '')

    skillsContent.innerHTML = `
            <div class='skills-wrapper'>
                ${reduceSkills}
            </div>`
}

const parseConfig = config => {
    let tabs = config.tabs;
    tabs
        .forEach(currentText => {
            const currentTextLowerCase = currentText.replace(' ', '-').toLowerCase();
            tabsHeaderElement.prepend(createLabelForTab(currentText, currentTextLowerCase));
        });
}

const parseProjects = projects => {
    const reducerFn = (acc, project) => acc + createProject(project)
    projectsTab.innerHTML = `
        <div class='container-fluid'>
            <div class='card-container'>
                ${projects.reduce(reducerFn, '')}
            </div>
        </div>
        `
}

const parseQuestionFn = data => {
    const questionsReduceFn = (acc, question) => acc + createQuestion(question);
    allQuestionsElement
        .innerHTML = Object.keys(data).reduce((acc, value) => `${acc}<h2>${value}</h2>` + data[value].reduce(questionsReduceFn, ''), '')
}

const parseMyDetailsFn = myDetails => {
    const aboutMeDetails = myDetails['AboutMe']
    meDetailsSection.innerHTML = Object.keys(aboutMeDetails)
        .reduce((acc, key, index) => `${acc}${createHeader(key, aboutMeDetails[key], index + 1)}`, '')

    const contactsList = myDetails['Contacts']
    contactsSection.innerHTML = contactsList
        .reduce((acc, value) => `${acc}<span class='lh-09'>${value}</span>`, '')

    const socialMediaList = myDetails['SocialMedia'];
    socialMediaSection.innerHTML = socialMediaList
        .reduce((acc, value) => `${acc}${createSocialMediaLink(value)}`, '')
}

const parseCoverLetter = coverLetter => {

    const filteredKeys = Object.keys(coverLetter)
        .filter(key => key.toLowerCase() !== 'hidden')

    const reducedValue = filteredKeys
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
                    <span class='exp-years'>${value[key]}</span>
                </li>
                `, '')
                value = `<ul class='skill-set-list'>${value}</ul>`
                key = `<h2>${key}</h2>`
            } else {
                value = `${value}`
            }
            return `${acc}<li class='item'>${key}${value}</li>`
        }, '')

    coverLetterSection.innerHTML = `<div class='me-container'>${reducedValue}</div>`

}

const parseSwot = data => {
    const swot = data['SWOT'];
    const swotKeys = Object.keys(swot);
    const swotParseFn = (acc, val) => `${acc}${createSwot(swot, val)}`;
    swotSection.innerHTML = `<h2>SWOT</h2>${swotKeys.reduce(swotParseFn, '')}`;
}


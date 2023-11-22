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

}

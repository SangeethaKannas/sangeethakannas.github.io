const stringToListItemFn = (acc, value) => `${acc}<li>${value}</li>`;

const commonReducerFn = (acc, value, index, array) => `${acc}<h2>${value}</h2>` + data[value].reduce(stringToListItemFn, '');


//Parse the resources and links
const parseGeneralFn = data => {
    document.getElementById('links')
        .innerHTML = Object.keys(data).reduce(commonReducerFn, '')
}

const parseReqnFn = data => {
    document.getElementById('requirements-article')
        .innerHTML = Object.keys(data).reduce(commonReducerFn, '')
}

const parseIdeasFn = data => {
    document.getElementById('ideas-article')
        .innerHTML = Object.keys(data).reduce(commonReducerFn, '')
}

const parseSkills = skills => {
    const reducerFn = (acc, skill) => {
        const currentSkill = skills[skill]
        console.log(currentSkill)
        if (Array.isArray(currentSkill)) {

        } else {
            return acc + "<span>" + currentSkill + "</span>"
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

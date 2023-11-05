function setAttributes(el, attrs = {}) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
  return el;
}

const createLabelForTab = (tab, lowerCaseTab) => {
  let label = document.createElement("label");
  label.classList.add('tab-label');
  label.setAttribute('for', lowerCaseTab);
  label.innerText = tab;
  return label
}

const createInputForTab = (lowerCaseTab) => {
  let input = document.createElement("input");
  return setAttributes(input, { 'type': 'radio', 'name': 'tabs', 'id': lowerCaseTab, 'checked': '' });
}

const STRINGS = ['Name', 'Duration', 'Description', 'Environment'];

const createProject = project => {
  return `
      <section class='project-section'>
        <div class='flex'>
            <span class='grid-label'>${STRINGS[0]}</span>
            <span class='project-name'><a href=${project.link} target="_blank">${project.name}</a></span>
        </div>
        <div class='flex'>
            <span class='grid-label'>${STRINGS[1]}</span>
            <span class='project-duration'>${project.duration}</span>
        </div>
        <div class='flex'>
            <span class='grid-label'>${STRINGS[2]}</span>
            <span class='project-desc'>${project.description}</span>
        </div>
        <div class='flex'>
            <span class='grid-label'>${STRINGS[3]}</span>
            <span class='project-env'>${project.environment}</span>
        </div>
    </section>`
}

const createQuestion = value => {
  return `<li class="question-list-item is-closed" onclick="expandListItem(event)">
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
  </li>`
}

const createSwot = (swot, value) => {
  return `<article class="${value}">
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
            </article>`
}

const createSocialMediaLink = (value) => `<li>
    <a href="${value.link}" target="_blank" rel="noopener noreferrer">
        <i class="fa ${value.icon}"></i>
        ${value.name}
    </a>
</li>`

const createHeader = (key, value) => `<h1 class="${key.toLowerCase()}">${value}</h1>`
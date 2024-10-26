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
  label.onclick = function (event) {
    openTab(event, lowerCaseTab)
  }
  return label
}

const createProject = project => {
  return `
      <section class='card-row single-card m-lg-3'>
        <div class='border-0 text-left mb-2'>
          <div class='card-body choose-card'>
            <div class='flex justify-between'>
              <h5 class='font-22 font-weight-bold'>
                <a href=${project.link} target="_blank" rel="noopener">
                ${project.name}</a>
              </h5>
              <article class='project-duration'>${project.duration}</article>
            </div>
            <p class='card-desc'>
                ${project.description}
            </p>
            <div class=''>${project.environment}</div>
          </div>
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

const createHeader = (key, value, index) => {
  if(index === 1) {
    return `<h1 class="${key.toLowerCase()}">${value}</h1>`
  } else {
    return `<h2 class="${key.toLowerCase()}">${value}</h2>`
  }

}

// const createExperience = (experience) {

//   simpleViewSection.innerHTML =
//       `
//       ${Object.keys(experience)
//           .reduce((acc, value) =>
//               `${acc}
//             <div class="organization">
//               <div class="job-details">
//                 <div>
//                   <span>${experience[value].organization}, </span>
//                   <span>${experience[value].location} - </span> 
//                   <span class="job-title">${experience[value].title}</span>
//                 </div>
//               </div>
//               <div class="job-duration">
//                 <span>${experience[value].duration}</span>
//               </div>
//               <div class="job-description">
//               <span>${experience[value].roles}</span>
//               <!--  <ul>
//                   ${experience[value].responsibilities.reduce(stringToListItemFn, '')}
//                 </ul>
//               -->
//               </div>
//             </div>
//         `, '')
//       }
//     `
// }


    //Append tabs - In Reverse Order
    const tabsElement = document.querySelector('.tabs');

    const currentLocation = window.location.href;
    let tabs = [];
    if(currentLocation.indexOf('pesto') > -1) {
      tabs = ['SWOT', 'Questions']
    } else if(currentLocation.indexOf('me') > -1) {
      tabs = ['Requirements', 'Ideas', 'OSS', 'Blogs', 'Resources']
    } else {
      tabs = [ 'Experience', 'Projects', 'Summary'];
    }

    tabs.forEach(currentText => {
        const currentTextLowerCase = currentText.replace(' ','-').toLowerCase();
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

    const handleError = (error) => console.error(error);
    const parseData = data => data.json();
    const requirementsReduceFn = (acc, value) => acc + '<li>' + value + '</li>';

    //Parse the resources and links
    const parseGeneralFn = data => {
      const reducerFn = (acc, value) => acc + '<h2>' + value + '</h2>' + data[value].reduce(requirementsReduceFn, '');

      document.getElementById('links')
        .innerHTML = Object.keys(data).reduce(reducerFn, '')
    }

    fetch('/readable_links.json')
      .then(parseData)
      .then(parseGeneralFn)
      .catch(handleError);

    const parseQuestionFn = data => {
      const questionsReduceFn = (acc, value) =>
        acc +
          `<li>
            <div class="question-answer">
              <div class="question-span">
                <h4>${value.question}
                  <!--<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="question-open-icon">
                    <path opacity="0" d="M0 0h24v24H0z"></path>
                    <path d="M20.207 7.043c-.39-.39-1.023-.39-1.414 0L12 13.836 5.207 7.043c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414l7.5 7.5c.195.195.45.293.707.293s.512-.098.707-.293l7.5-7.5c.39-.39.39-1.023 0-1.414z"></path>
                  </svg>-->
                </h4>
              </div>
              <span class="answer-span">${value.answer}</span>
            </div>
          </li>`;
      const reducerFn = (acc, value) => acc + '<h2>' + value + '</h2>' + data[value].reduce(questionsReduceFn, '');
      document.getElementById('all-questions')
        .innerHTML = Object.keys(data).reduce(reducerFn, '')
    }
    fetch('/questions.json')
      .then(parseData)
      .then(parseQuestionFn)
      .catch(handleError);

    const parseReqnFn = data => {
      const reducerFn = (acc, value) => acc + '<h2>' + value + '</h2>' + data[value].reduce(requirementsReduceFn, '');

      document.getElementById('requirements-article')
        .innerHTML = Object.keys(data).reduce(reducerFn, '')
    }

    fetch('/requirements.json')
      .then(parseData)
      .then(parseReqnFn)
      .catch(handleError);

    const parseIdeasFn = data => {
      const reducerFn = (acc, value) => acc + '<h2>' + value + '</h2>' + data[value].reduce(requirementsReduceFn, '');

      document.getElementById('ideas-article')
        .innerHTML = Object.keys(data).reduce(reducerFn, '')
    }

    fetch('/ideas.json')
      .then(parseData)
      .then(parseIdeasFn)
      .catch(handleError);

    let myDetails = {};
    fetch('/me.json')
      .then(parseData)
      .then(data => myDetails = data)
      .then(() => {

        const swotSection = document.querySelector(".swot");
        const swot = myDetails['SWOT'];
        const swotKeys = Object.keys(swot);
        const swotParseFn = (acc, val) => acc +
            `<article class="${val}">
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
              `, '')}

          `
      })
      .catch(handleError);

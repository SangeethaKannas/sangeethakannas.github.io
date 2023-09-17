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

tabs
  .forEach(currentText => {
    const currentTextLowerCase = currentText.replace(' ', '-').toLowerCase();
    tabsElement.prepend(createLabelForTab(currentText, currentTextLowerCase));
    tabsElement.prepend(createInputForTab(currentTextLowerCase));
  });

const expandListItem = (event) => {
  const _target = event.currentTarget;

  Array.from(_target.parentElement.children).forEach(element => {
    element.classList.add('is-closed');
  });
  _target.classList.toggle('is-closed');
}

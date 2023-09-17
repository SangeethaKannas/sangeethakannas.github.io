const parseResponse = response => response.json();
const handleError = error => console.error(error);

const api = (url) => fetch(url).then(parseResponse)
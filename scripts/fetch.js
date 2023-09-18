FETCH_CONFIG.forEach(config => {
  api(config.url).then(config.parseFn).catch(handleError)
})
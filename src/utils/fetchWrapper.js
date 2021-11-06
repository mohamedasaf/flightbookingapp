import envConfig from 'envConfig'; //eslint-disable-line

const { baseUrl } = envConfig;

export const fetchURL = (url, urlPrefix = baseUrl) => (fetch(
  urlPrefix.concat(url),
  Object.assign({}, {
    headers: {
      Accept: 'application/json; charset=UTF-8',
    },
  }),
));

export const doGet = (url, urlPrefix = baseUrl) => {
  const fetchData = fetchURL(url, urlPrefix).then((res) => {
    let response = null;
    if (res.ok) {
      response = res.json();
    }
    return response;
  });
  return fetchData;
};
/**
 * Endpoints
 */
const API_ROOT = process.env.REACT_APP_API_ROOT
export const API_FETCH_ARTICLES = `${API_ROOT}/api/articles/`

export const GetArticles = ({category, start, length}) => ({
  endpoint: `${API_ROOT}/api/articles/${category}`,
  method: 'get',
  query: {
    start: start,
    length: length,
  }
})
export const GetCategories = () => ({
  endpoint: `${API_ROOT}/api/categories/`,
  method: 'get',
})

/**
 * callApi:
 * Do the actual fetch operation
 */
async function callApi(endpoint, method, json, {...customConfigs}) {

  const headers = { 'Content-Type': 'application/json' }
  const config = {
    method: method ? method : 'GET',
    ...customConfigs,
    headers: {
      ...headers,
      ...customConfigs.headers,
    },
  };

  if (json) {
    config.body = JSON.stringify(json);
  }

  let data;
  try {
    // mimic delay
    const response = await window.fetch(endpoint, config);
    data = await response.json();
    if (response.ok) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data);
  }
}

function makeQuery(endpoint, query) {
  const params = new URLSearchParams(query)
  return endpoint + '?' + params.toString()
}

export default function api({endpoint, method, query, json}) {
  endpoint = query ? makeQuery(endpoint, query) : endpoint;

  return callApi(endpoint, method, json, {});
}
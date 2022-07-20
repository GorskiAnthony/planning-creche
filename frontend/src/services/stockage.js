const getItem = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const removeItem = (key) => {
  localStorage.removeItem(key);
};

const clear = () => {
  localStorage.clear();
};

const setSessionItem = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

const getSessionItem = (key) => {
  return JSON.parse(sessionStorage.getItem(key));
};

const removeSessionItem = (key) => {
  sessionStorage.removeItem(key);
};

const clearSession = () => {
  sessionStorage.clear();
};

export {
  getItem,
  setItem,
  removeItem,
  clear,
  getSessionItem,
  setSessionItem,
  removeSessionItem,
  clearSession,
};

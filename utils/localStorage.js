const { LocalStorage } = require("node-localstorage");

var localStorage = new LocalStorage("./scratch");

// set local storage by key
async function setLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

// access local storage values by key
async function getLocalStorage(key, value) {
  return localStorage.getItem(key);
}

module.exports = { setLocalStorage, getLocalStorage };

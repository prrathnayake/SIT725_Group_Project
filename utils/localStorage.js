const { LocalStorage } = require("node-localstorage");

var localStorage = new LocalStorage("./scratch");

async function setLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

async function getLocalStorage(key, value) {
  return localStorage.getItem(key);
}

module.exports = { setLocalStorage, getLocalStorage };

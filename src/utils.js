export const LS_POKEMONS = "pokemons";
export const LS_ARCHIVE = "archive";

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function catchSuccessfully() {
  return Math.random() > 0.5;
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

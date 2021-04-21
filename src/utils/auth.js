import store from "store";

const CURRENT_USER = "CURRENT_USER";
const TOKEN = "TOKEN";
const AREA = "AREA";

export function removeCurrentUser() {
  return store.remove(CURRENT_USER);
}

export function getCurrentUser() {
  let user = store.get(CURRENT_USER);
  return user;
}
export function setCurrentUser(user) {
  return store.set(CURRENT_USER, user);
}

export function getToken() {
  return store.get(TOKEN);
}

export function setToken(token) {
  return store.set(TOKEN, token);
}

export function removeToken() {
  return store.remove(TOKEN);
}


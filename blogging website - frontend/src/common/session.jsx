const storeInSession = (key, value) => {
    sessionStorage.setItem(key, value);
}

const looksInSession = (key) => {
    return sessionStorage.getItem(key);
}

const removeFromSession = (key) => {
    sessionStorage.removeItem(key);
}

const logout = () => {
    sessionStorage.clear();
}

export { storeInSession, looksInSession, removeFromSession, logout };
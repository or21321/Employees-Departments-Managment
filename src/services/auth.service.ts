import { ref } from "vue"
import { storageService } from "./storage.service"
import { utilService } from "./util.service"

const KEY = 'loggedUser'
const loggedUserRef = ref()

export const authService = {
    getLoggedUser,
    login,
    logout,
    getLoggedUserRef
}

function getLoggedUserRef() {
    return loggedUserRef
}

function logout() {
    sessionStorage.setItem(KEY, '')
    loggedUserRef.value = ''
    return Promise.resolve()
}

function getLoggedUser() {
    console.log(sessionStorage.getItem(KEY));
    return sessionStorage.getItem(KEY) || null
}
// login & signup for single loggedUser support (no usersDb)
function login({ username, password }: { username: string, password: string }) {
    const user = { ...getEmptyUser(), username, password }
    sessionStorage.setItem(KEY, JSON.stringify(user))
    console.log('sessionStorage', sessionStorage);
    loggedUserRef.value = user
    return Promise.resolve()
}

function getEmptyUser() {
    return {
        _id: utilService.makeId(),
        username: '',
        password: '',
    }
}
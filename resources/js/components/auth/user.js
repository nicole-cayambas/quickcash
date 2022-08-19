import { CookiesProvider } from 'react-cookie'


class User {

    constructor() {
        this.init()
    }

    init() {
        this.email = localStorage.getItem('userEmail')
        this.loggedIn = localStorage.getItem('userLoggedIn')
        this.loggedIn = document.cookie
    }

    /**
     *
     * @param data object
     * @param data.email string
     * @param callback function
     */
    authenticated(data, callback) {
        localStorage.setItem('userEmail', data.user.email)
        localStorage.setItem('userLoggedIn', true)

        this.init()

        callback()
    }

    /**
     *
     * @return {boolean}
     */
    isLoggedIn() {
        return Boolean(this.loggedIn) === true
    }
}

export default new User()

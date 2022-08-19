import Cookies from 'js-cookie'
import cookie from 'cookie'

export const isLoggedIn = (reqCookies = null) => {
    // if we don't have request cookies, get the cookie from client
    if (! reqCookies) {
        return !! Cookies.get(['is_user_logged_in'])
    }

    // otherwise get cookie from server
    return !! cookie.parse(reqCookies).is_user_logged_in
}

// export const getUser = () => {
//     return Cookies.get(['email', 'role'])
// }

export const logIn = (token) => {
    Cookies.set('is_user_logged_in', true, {expires: 86400, sameSite: 'lax'})
    Cookies.set('token', token, {expires: 86400, sameSite: 'lax'})

    window.location.href = '/'
}

export const logOut = () => {
    if (typeof window !== 'undefined') {
        // remove logged in user's cookie and redirect to login page
        console.log('logging out')
        Cookies.remove('is_user_logged_in', {expires: 86400, sameSite: 'lax'})
    }

}
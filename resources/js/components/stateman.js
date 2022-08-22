import create from "zustand";

const defaultState = {
  page: "home",
  role: '',
  user: {},
  isLoggedIn: false,
};

const usePageStore = create((set) => ({
    page: defaultState.page,
    role: defaultState.role,
    user: defaultState.user,
    isLoggedIn: defaultState.isLoggedIn,
}))


export { usePageStore };











// OLD CODE
// import create from "zustand";
// import http from './http'

// const defaultState = {}

// const getUser = () => {
//     http.get('sanctum/csrf-cookie')
//     http.get('/api/user').then(res => res.data ).catch(err => err)
// }

// const getRole = () => {
//   http.get('/api/user/role').then(res => res.data).catch(err => err)
// }

// const init = async () => {
//   defaultState.page = 'home'
//   defaultState.user = await getUser() || {}
//   defaultState.role = await getRole() || ''
// }

// init()



// const usePageStore = create((set) => ({
//   page: defaultState.page,
//   user: defaultState.user,
//   role: defaultState.role,
// }))


// export { usePageStore };
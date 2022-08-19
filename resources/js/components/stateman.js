import create from "zustand";

const defaultState = {
  page: "home",
  role: null
};

const usePageStore = create((set) => ({
    page: defaultState.page,
    role: defaultState.role,
}))

// const useTokenStore = create((set) => ({
//     token: defaultState.token,
// }))

// const useLoggedInStore = create((set) => ({
// }))

export { usePageStore };
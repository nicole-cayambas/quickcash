import create from "zustand";

const defaultState = {
  page: "home",
  role: null,
  isLoggedIn: false,
  user: null
};

const usePageStore = create((set) => ({
    page: defaultState.page,
    role: defaultState.role,
    isLoggedIn: defaultState.isLoggedIn,
    user: defaultState.user
}))


export { usePageStore };
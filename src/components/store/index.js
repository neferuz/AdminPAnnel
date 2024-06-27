import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      user: null,
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    updateUserPhoto(state, photoUrl) {
      if (state.user) {
        state.user.photo = photoUrl;
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
  },
  actions: {
    login({ commit }, user) {
      const validUsers = [
        { login: 'Support', password: '123', role: 'user', photo: 'https://randomuser.me/api/portraits/men/3.jpg' },
        { login: 'Supervizor', password: '123', role: 'user', photo: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { login: 'Admin', password: '123', role: 'admin', photo: 'https://randomuser.me/api/portraits/men/15.jpg' },
        { login: 'CEO', password: '123', role: 'ceo', photo: 'https://randomuser.me/api/portraits/men/4.jpg' }, // Изменили роль на 'ceo'
      ];

      const authenticatedUser = validUsers.find(u => u.login === user.login && u.password === user.password);

      if (authenticatedUser) {
        commit('setUser', authenticatedUser);
        localStorage.setItem('user', JSON.stringify(authenticatedUser));
        localStorage.setItem('__asc_accessIDToken', 'your-token'); // Фиктивный токен
        return true;
      } else {
        return false;
      }
    },
    logout({ commit }) {
      commit('setUser', null);
      localStorage.removeItem('user');
      localStorage.removeItem('__asc_accessIDToken');
    },
    initializeUser({ commit }) {
      const savedUser = JSON.parse(localStorage.getItem('user'));
      if (savedUser) {
        commit('setUser', savedUser);
      }
    },
    updateUserPhoto({ commit }, photoUrl) {
      commit('updateUserPhoto', photoUrl);
    },
  },
  getters: {
    currentUser(state) {
      return state.user;
    },
    isAuthenticated(state) {
      return state.user !== null;
    },
    isAdmin(state) {
      return state.user && state.user.role === 'admin';
    },
    isCeo(state) {
      return state.user && state.user.role === 'ceo';
    },
  },
});
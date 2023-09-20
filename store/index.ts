import { getAccessorType, mutationTree, actionTree } from 'typed-vuex'
import {API_PATH} from '~/api'
import {
  fetchGetUser,
  fetchLogin,
  fetchSignUp,
} from '~/api/member'
import token from '~/utils/token'

export interface IUser {
  id: number
  username: string
  createdAt: number
}

export const state = (): {
  user: IUser | null
  token: string
} => ({
  user: null,
  token: '',
})

export type RootState = ReturnType<typeof state>

export const getters = {
  user: (state: RootState) => state.user,
  token: (state: RootState) => state.token,
  isAuth: (state: RootState) => !!state.token,
}

export const MUTATION = {
  SET_TOKEN: 'SET_TOKEN',
  SET_USER: 'SET_USER',
  CLEAR_TOKEN: 'CLEAR_TOKEN',
} as const

export const mutations = mutationTree(state, {
  [MUTATION.SET_USER](state, user: IUser) {
    state.user = user
  },
  [MUTATION.SET_TOKEN](state, accessToken) {
    state.token = accessToken
  },
  [MUTATION.CLEAR_TOKEN](state) {
    state.token = ''
  }
})

export const ACTION = {
  FETCH_SIGN_UP: 'FETCH_SIGN_UP',
  FETCH_LOGIN: 'FETCH_LOGIN',
  FETCH_GET_USER: 'FETCH_GET_USER',
  FETCH_REFRESH_TOKEN: 'FETCH_REFRESH_TOKEN',
  LOGOUT: 'LOGOUT',
} as const

export const actions = actionTree(
  { state, getters, mutations },
  {
    async [ACTION.FETCH_SIGN_UP](_, { payload }) {
      const res = await fetchSignUp(payload)
      return res
    },
    async [ACTION.FETCH_LOGIN]({ commit }, { payload }) {
      const res = await fetchLogin(payload)
      const { accessToken, refreshToken } = res.data
      commit(MUTATION.SET_TOKEN, { accessToken, refreshToken })
      token.setToken(accessToken, refreshToken)
      return res
    },
    async [ACTION.FETCH_GET_USER]({ commit }) {
      // const { data: { data } } = await this.$axios.$get(API_PATH.user);

      const { data: { data } } = await fetchGetUser();
      commit(MUTATION.SET_USER, data);

      return data;
    },
    async [ACTION.FETCH_REFRESH_TOKEN]({ commit }) {
      const res = await this.$axios.$get(API_PATH.refresh)
      const { accessToken } = res.data
      commit(MUTATION.SET_TOKEN, accessToken);
      token.setAccessToken(accessToken);
    },
    [ACTION.LOGOUT]({ commit }) {
      commit(MUTATION.CLEAR_TOKEN);
      token.clearToken();
      this.$router.replace(API_PATH.login);
    }
  },

)

export const accessorType = getAccessorType({
  actions,
  getters,
  mutations,
  state,
  modules: {},
})

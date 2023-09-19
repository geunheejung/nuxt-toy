import { getAccessorType, mutationTree, actionTree } from 'typed-vuex'
import {
  fetchGetUser,
  fetchLogin,
  fetchRefreshToken,
  fetchSignUp,
} from '~/api/member'

export interface IUser {
  id: number
  username: string
  createdAt: number
}

export const state = (): { user: IUser | null; token: string } => ({
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
}
export const mutations = mutationTree(state, {
  [MUTATION.SET_USER](state, user: IUser) {
    state.user = user
  },
  [MUTATION.SET_TOKEN](state, token: string) {
    state.token = token
  },
})

export const ACTION = {
  FETCH_SIGN_UP: 'FETCH_SIGN_UP',
  FETCH_LOGIN: 'FETCH_LOGIN',
  FETCH_GET_USER: 'FETCH_GET_USER',
  FETCH_REFRESH_TOKEN: 'FETCH_REFRESH_TOKEN',
}

export const actions = actionTree(
  { state, getters, mutations },
  {
    async [ACTION.FETCH_SIGN_UP](context, { payload }) {
      const res = await fetchSignUp(payload)
      return res
    },
    async [ACTION.FETCH_LOGIN](context, { payload }) {
      const res = await fetchLogin(payload)
      context.commit('SET_TOKEN', res.data.data.accessToken)

      return res
    },
    async [ACTION.FETCH_GET_USER](context) {
      // 토큰에 담긴 유저 정보를 토대로
      const res = await fetchGetUser()

      context.commit(MUTATION.SET_USER, res.data.data)
    },
    async [ACTION.FETCH_REFRESH_TOKEN](context) {
      const res = await fetchRefreshToken()

      debugger
      context.commit('SET_TOKEN', res.accessToken)
    },
  }
)

export const accessorType = getAccessorType({
  actions,
  getters,
  mutations,
  state,
  modules: {},
})

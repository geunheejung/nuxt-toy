import { getAccessorType, mutationTree, actionTree } from 'typed-vuex'
import { fetchGetUser, fetchLogin, fetchSignUp } from '~/api/member'
import token from '~/utils/token'

export interface IUser {
  id: number
  username: string
  createdAt: number
}

export const state = (): { user: IUser | null } => ({
  user: null,
})

export type RootState = ReturnType<typeof state>

export const getters = {
  user: (state: RootState) => state.user,
}

export const MUTATION = {
  SET_USER: 'SET_USER',
}
export const mutations = mutationTree(state, {
  [MUTATION.SET_USER](state, user: IUser) {
    state.user = user
  },
})

export const ACTION = {
  FETCH_SIGN_UP: 'FETCH_SIGN_UP',
  FETCH_LOGIN: 'FETCH_LOGIN',
  FETCH_GET_USER: 'FETCH_GET_USER',
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

      return res
    },
    async [ACTION.FETCH_GET_USER](context) {
      // 토큰에 담긴 유저 정보를 토대로
      const res = await fetchGetUser()

      context.commit(MUTATION.SET_USER, res.data.data)
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

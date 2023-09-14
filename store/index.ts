import { getAccessorType, mutationTree, actionTree } from 'typed-vuex'
import { fetchSignUp } from '~/api/member'
import openToast from '~/utils/openToast'

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

export const mutations = mutationTree(state, {})

export const ACTION = {
  FETCH_SIGN_UP: 'FETCH_SIGN_UP',
}

export const actions = actionTree(
  { state, getters, mutations },
  {
    async [ACTION.FETCH_SIGN_UP](context, { payload }) {
      const res = await fetchSignUp(payload)
      return res
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

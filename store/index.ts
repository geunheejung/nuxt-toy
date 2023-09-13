import { getAccessorType, mutationTree, actionTree } from 'typed-vuex'

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

export const mutations = mutationTree(state, {
  setUser(state, newUser: IUser) {
    state.user = newUser
  },
})

export const actions = actionTree({ state, getters, mutations }, {})

export const accessorType = getAccessorType({
  actions,
  getters,
  mutations,
  state,
  modules: {},
})

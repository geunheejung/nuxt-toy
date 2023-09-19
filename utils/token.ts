const token = {
  setToken: (token: string) => {
    const accessTokenKey = encodeURIComponent('accessToken')
    const accessToken = encodeURIComponent(token)
    // document.cookie = `${accessTokenKey}=${accessToken}; max-age=300; SameSite; HttpOnly;`
    document.cookie = `${accessTokenKey}=${accessToken}; max-age=3600; SameSite=lax;`
  },
}

export default token

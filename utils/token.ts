import Cookies from 'js-cookie';

const setCookie = (key: string, value: string) => Cookies.set(key, value, { path: '/', expires: 7, sameSite: 'lax' });

const setAccessToken = (token: string) => {
  setCookie('accessToken', token);
}

const setToken = (token: string, refreshToken: string) => {
  setCookie('accessToken', token);
  setCookie('refreshToken', refreshToken);
}

const clearToken = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
}

export default {
  setToken,
  setAccessToken,
  clearToken
}

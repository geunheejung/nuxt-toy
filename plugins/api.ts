export default function ({ $axios, $cookies }) {
  $axios.onRequest(config => {
    if (!$cookies) return config;

    const accessToken = $cookies.get('accessToken');
    $axios.setToken(accessToken, 'Bearer')
    config.headers['Authorization'] = `Bearer ${accessToken}`;

    return config;
  });

  $axios.onResponse(response => {
    const {  data: { data: { accessToken } } } = response;
    if (accessToken) {
      $axios.setToken(accessToken, 'Bearer')
    }
    return response;
  })
}

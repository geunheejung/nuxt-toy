import instance from '@/api';
import {AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders} from "axios";

export default function ({ $cookies }: any) {
  instance.interceptors.request.use((config: AxiosRequestConfig) => {
      const accessToken = $cookies.get('accessToken');

    if (accessToken) {
      (config.headers as AxiosRequestHeaders).Authorization = `Bearer ${accessToken}`;
    }


      return config;


  });

  instance.interceptors.response.use((response: AxiosResponse) => {
    const {  data: { data: { accessToken } } } = response;
    if (accessToken) {
      instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }
    return response;
  })

}

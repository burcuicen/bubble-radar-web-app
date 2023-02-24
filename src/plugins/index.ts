import { App } from 'vue';

// Reactive state

// Rest api sdk
import { BubbleAPI } from '../api';

// axios
//import axiosInstance from './axios.plugin'
//export const axios = axiosInstance
export const api = BubbleAPI.getInstance();

export function createPlugins(app: App): void {
  // Reactive state
  console.log('bhfjgnkmlöh')
  // Axios
  //app.config.globalProperties.$axios = axios

  // Rest api client
  console.log('api', api)
  app.config.globalProperties.$api = api;
}

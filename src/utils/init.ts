import type { AxiosInstance } from 'axios';
import type { ThemeConfig } from '../../typings';

export type Client = AxiosInstance;

export type ClientRequest = Client['request'];

let currentTheme: ThemeConfig | null = null;

/**
 * @description
 * Initializes axios instance to be used in the apis.
 * It should be executed as the app/web starts.
 * Preferably, app.tsx or index.js
 *
 * @param axiosInstance Axios instance with the attached
 * base url to be used in the services
 */
function initAxiosInstance(axiosInstance: AxiosInstance) {
  global.axiosInstance = axiosInstance;
}

function initTheme(config: ThemeConfig) {
  currentTheme = config || {
    colors: {
      primary: 'red',
      secondary: 'black',
      background: 'gray',
      text: 'white',
      white: 'white',
      black: 'black',
      gray: 'gray',
      error: 'red',
      nonEditable: 'gray',
      placeholder: 'gray',
    },
    fonts: {
      regular: '',
      bold: '',
    },
  };
}

const getTheme = (): ThemeConfig => {
  return currentTheme as ThemeConfig;
};

export { initAxiosInstance, initTheme, getTheme };

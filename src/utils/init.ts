import type { AxiosInstance } from 'axios';
import type { ThemeConfig } from '../../typings';

export type Client = AxiosInstance;

export type ClientRequest = Client['request'];

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
  console.log('Init Axios Instance works...');
  global.axiosInstance = axiosInstance;
}

function initTheme() {
  console.log('Init Theme works...');
}

function getTheme(): ThemeConfig {
  return {
    colors: {
      primary: '#5956FF',
      secondary: '#ECEBFF',
      error: '#FF0000',
      black: '#000000',
      white: '#FFFFFF',
      nonEditable: '#F4F4F4',
      placeholder: '#A0A09F',
      background: '#F8F8FF',
      text: '#191015',
      gray: '#3F3C36',
    },
    fonts: {
      regular: '',
      bold: '',
    },
  };
}

export { initAxiosInstance, initTheme, getTheme };

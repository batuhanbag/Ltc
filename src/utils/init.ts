import type { AxiosInstance } from 'axios';
import type { ThemeConfig } from '../../typings';

export type Client = AxiosInstance;
export type ClientRequest = Client['request'];

const defaultTheme: ThemeConfig = {
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

let currentTheme: ThemeConfig = defaultTheme;

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

function initTheme(config: Partial<ThemeConfig>) {
  currentTheme = { ...defaultTheme, ...config };
}

const getTheme = (): ThemeConfig => {
  return currentTheme;
};

export { initAxiosInstance, initTheme, getTheme };

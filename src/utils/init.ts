import type { AxiosInstance } from 'axios';
import type { OpenaiValues, ThemeConfig } from '../../typings';

export type Client = AxiosInstance;
export type ClientRequest = Client['request'];

const defaultTheme: ThemeConfig = {
  colors: {
    primary: '#5956FF',
    secondary: '#ECEBFF',
    background: '#FEF0EA',
    text: '#161513',
    white: '#FFFFFF',
    black: '#000000',
    gray: '#a3a1a0',
    error: '#FF0000',
    warning: '#FFC700',
    success: '#29C141',
    nonEditable: '#F4F4F4',
    placeholder: '#A0A09F',
  },
  fonts: {
    primary: '#161513',
    secondary: '#3F3C36',
    tertiary: '#736B66',
    disabled: '#ACA9A5',
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

function initOpenaiValues(openaiValues: OpenaiValues) {
  global.openaiValues = openaiValues;
}

function initTheme(config: Partial<ThemeConfig>) {
  currentTheme = { ...defaultTheme, ...config };
}

const getTheme = (): ThemeConfig => {
  return currentTheme;
};

export { initAxiosInstance, initTheme, getTheme, initOpenaiValues };

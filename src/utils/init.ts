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
  currentTheme = config;
}

function getTheme(): ThemeConfig {
  if (!currentTheme) {
    throw new Error(
      'Theme not initialized. Call initTheme() first in your project.'
    );
  }
  return currentTheme;
}

export { initAxiosInstance, initTheme, getTheme };

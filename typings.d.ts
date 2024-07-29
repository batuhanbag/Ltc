import { AxiosInstance } from 'axios';

declare global {
  var axiosInstance: AxiosInstance;
}

export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    white: string;
    black: string;
    gray: string;
    error: string;
    nonEditable: string;
    placeholder: string;
  };
  fonts: {
    regular: string;
    bold: string;
  };
}

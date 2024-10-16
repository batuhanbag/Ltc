import { AxiosInstance } from 'axios';

export declare global {
  var axiosInstance: AxiosInstance;
  var openaiValues: OpenaiValues;
  var OvokGPTValues: OVOKGPTValues;
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
    warning: string;
    success: string;
  };
  fonts: {
    primary: string;
    secondary: string;
    tertiary: string;
    disabled: string;
  };
}

export interface OpenaiValues {
  max_tokens: number;
  min_tokens: number;
  model: string;
  api_key: string;
}

export interface OVOKGPTValues {
  botId: string;
}

module.exports = { openaiValues, OvokGPTValues };

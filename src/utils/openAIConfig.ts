interface OpenaiValues {
  max_tokens: number;
  min_tokens: number;
  model: string;
  api_key: string;
}

class OpenAIConfig {
  private static instance: OpenAIConfig;
  private openaiValues: OpenaiValues | null = null;

  private constructor() {}

  public static getInstance(): OpenAIConfig {
    if (!OpenAIConfig.instance) {
      OpenAIConfig.instance = new OpenAIConfig();
    }
    return OpenAIConfig.instance;
  }

  public init(values: OpenaiValues): void {
    this.openaiValues = values;
  }

  public getValues(): OpenaiValues | null {
    return this.openaiValues;
  }
}

export { OpenAIConfig };

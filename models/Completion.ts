interface Completion {
  id: string;
  text: Prompt;
  created: number;
  usage: Usage;
}

interface Prompt {
  prompt: string;
  problems: {
    type: string;
    label: string;
    text: string;
    sentiment: string;
    suggestion: string;
  }[];
}

interface Choices {
  text: string;
  index: number;
  logprobs: string | null;
  finish_reason: string;
}

interface Usage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export type { Completion, Prompt, Choices, Usage };

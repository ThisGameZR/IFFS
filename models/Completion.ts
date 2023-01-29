interface Completion {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Choices[];
  usage: Usage;
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

export type { Completion, Choices, Usage };

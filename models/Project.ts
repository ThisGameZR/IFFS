import { Choices, Usage } from "./Completion";

interface Project {
  id?: string;
  name?: string;
  description?: string;
  documents?: Document[];
}

interface Document {
  id?: string;
  name?: string;
  description?: string;
  pages?: Page[];
}

interface Page {
  id?: string;
  name?: string;
  description?: string;
  content?: string;
}

interface Analyze {
  issues: Issue[];
  usage: Usage;
}

interface Issue {
  issue: string;
  sentiment: "Positive" | "Negative";
  type: "UX" | "UI";
  label: string;
  suggestion: string;
}

export type { Project, Document, Page, Analyze, Issue };

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
  text: string;
  created: Date;
  usage: Usage;
}

export type { Project, Document, Page, Analyze };

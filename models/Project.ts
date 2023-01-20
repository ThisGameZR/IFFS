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

export type { Project, Document, Page };

// File: /client/src/models/Book.ts

export interface Book {
  bookId: string;
  title: string;
  authors: string[];
  description: string;
  image: string;
  link: string;
}

// This type matches the GraphQL `BookInput` schema exactly
export interface BookInput {
  bookId: string;
  title: string;
  authors: string[];
  description: string;
  image?: string;
  link?: string;
}

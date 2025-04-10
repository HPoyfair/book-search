// File: /client/src/utils/API.ts

import { GET_ME } from './queries';
import { LOGIN_USER, ADD_USER, SAVE_BOOK, REMOVE_BOOK } from './mutations';
import type { Book } from '../models/Book';
import type { User } from '../models/User';

// Get current user data using GraphQL
export const getMe = (token: string) => {
  return fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: GET_ME.loc?.source.body,
    }),
  });
};

// Register a user using GraphQL
export const createUser = (userData: Partial<User>) => {
  return fetch('/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: ADD_USER.loc?.source.body,
      variables: {
        username: userData.username,
        email: userData.email,
        password: userData.password,
      },
    }),
  });
};

// Login user using GraphQL
export const loginUser = (userData: Pick<User, 'email' | 'password'>) => {
  return fetch('/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: LOGIN_USER.loc?.source.body,
      variables: {
        email: userData.email,
        password: userData.password,
      },
    }),
  });
};

// Save a book using GraphQL
export const saveBook = (book: Book, token: string) => {
  return fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: SAVE_BOOK.loc?.source.body,
      variables: { book },
    }),
  });
};

// Remove a saved book using GraphQL
export const deleteBook = (bookId: string, token: string) => {
  return fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: REMOVE_BOOK.loc?.source.body,
      variables: { bookId },
    }),
  });
};

// Google Books API search remains unchanged
export const searchGoogleBooks = (query: string) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};

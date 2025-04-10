// File: /server/src/server.ts

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';

import typeDefs from './schemas/typeDefs';         // GraphQL type definitions
import resolvers from './schemas/resolvers';       // GraphQL resolvers
import { authMiddleware } from './services/auth';  // Auth middleware for context

const app = express(); // ✅ No explicit type needed, inferred automatically
const PORT = process.env.PORT || 3001;

// Create an Apollo Server instance using our schema and resolvers.
// The context property uses the authMiddleware to inject user info if available.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// Wrap the startup in an async function to await server.start()
async function startApolloServer() {
  await server.start(); // Ensure Apollo Server is ready before applying middleware.
  server.applyMiddleware({ app: app as any, path: '/graphql' });


  // Serve static assets from the React app in production.
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Catch-all route to serve React’s index.html for client-side routing.
  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
  );

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startApolloServer();

// File: /client/src/App.tsx

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Route, Routes } from 'react-router-dom'; // ⬅️ Remove Router from here
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Header from './components/Header';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
      <Routes>
        <Route path="/" element={<SearchBooks />} />
        <Route path="/saved" element={<SavedBooks />} />
      </Routes>
    </ApolloProvider>
  );
}
//test
export default App;

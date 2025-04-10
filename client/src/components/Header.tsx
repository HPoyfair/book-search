// File: /client/src/components/Header.tsx

import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header>
      <h1>Book Search</h1>
      <nav>
        <Link to="/">Search Books</Link> | <Link to="/saved">Saved Books</Link>
      </nav>
    </header>
  );
};

export default Header;

import React, {PropType} from 'react';
import { Link, IndexLink } from 'react-router';

const HEader = () => {
  return (
    <nav>
      <IndexLink to="/"
        activeClassName="active">Home</IndexLink>
      {" | "}
      <Link to="/cats" activeClassName="active">Cats</Link>
    </nav>
  );
};

export default Header;
import React from 'react';
import { Link } from '../../lib/router';

export default {
  render() {
    return <div>
      <ul>
        <li>
          <Link to="/test/hello" >/test/hello</Link>
        </li>
        <li>
          <Link to="/test" >/test</Link>
        </li>
        <li>
          <Link to="/redirect" >redirect to test</Link>
        </li>
        <li>
          <Link to="/page_not_found" >404</Link>
        </li>
      </ul>
    </div>
  }
}


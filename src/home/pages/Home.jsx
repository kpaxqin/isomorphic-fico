import React from 'react';
import { Link } from '../../lib/router';

export default {
  render({router: { history }}) {
    return <div>
      <ul>
        <li>
          <Link to="/test/hello" history={history}>/test/hello</Link>
        </li>
        <li>
          <Link to="/test" history={history}>/test</Link>
        </li>
        <li>
          <Link to="/redirect" history={history}>redirect to test</Link>
        </li>
        <li>
          <Link to="/page_not_found" history={history}>404</Link>
        </li>
      </ul>
    </div>
  }
}

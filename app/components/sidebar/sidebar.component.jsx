import React, { PropTypes } from 'react';
import uuid from 'uuid/v1';
import { Link } from 'react-router';
import style from './sidebar.component.scss';

export default function Sidebar({ location, links }) {
  let currentLink;

  const linksToRender = links.map((link) => {
    if (location.pathname === `/${link.path}`) {
      currentLink = style.active;
    } else {
      currentLink = null;
    }
    return (
      <li className={style.listItem} key={uuid()}>
        <Link to={`/${link.path}`} className={`${style.link} ${currentLink}`}>{link.name}</Link>
      </li>
    );
  });

  return (
    <aside className={style.sidebar}>
      <nav>
        <ul className={style.list}>
          {linksToRender}
        </ul>
      </nav>
    </aside>
  );
}

Sidebar.propTypes = {
  location: PropTypes.shape({
    location: PropTypes.string.isRequired,
  }).isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

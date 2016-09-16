import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import style from './sidebar.component.scss';

export default function Sidebar({ location, links }) {
  let currentLink;
  let key = 0;

  const linksToRender = links.map((link) => {
    if (location.pathname === `/${link.path}`) {
      currentLink = style.active;
    } else {
      currentLink = null;
    }
    return (
      <li className={style.listItem} key={key++}>
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
  location: PropTypes.object.isRequired,
  links: PropTypes.array.isRequired,
};

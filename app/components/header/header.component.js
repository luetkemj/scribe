import React, { PropTypes } from 'react';
import { map } from 'lodash';
import style from './header.component.scss';

export default function Header({ navItems, navOrder }) {
  let nav;
  let navItemsToRender;

  if (navItems && navOrder) {
    navItemsToRender = map(navOrder, (navItem) => {
      if (navItems[navItem].visible) {
        if (navItems[navItem].active) {
          return (
            <li
              className={`${style.navItem} ${style[navItem]} ${style.active}`}
              onClick={navItems[navItem].onClick}
              key={navItem}
            />
          );
        } else {
          return (
            <li
              className={`${style.navItem} ${style[navItem]}`}
              onClick={navItems[navItem].onClick}
              key={navItem}
            />
          );
        }
      }

      return null;
    });
  }

  if (navItemsToRender) {
    nav = (
      <ul className={style.nav}>
        {navItemsToRender}
      </ul>
    );
  }

  return (
    <div className={style.header}>
      <h1 className={style.logo}>D&D Scribe</h1>
      {nav}
    </div>
  );
}

Header.propTypes = {
  navItems: PropTypes.object,
  navOrder: PropTypes.array,
};

import React, { PropTypes } from 'react';
import style from './header.component.scss';

export default function Header({ navItems }) {
  let nav;
  let trash;
  let edit;
  let copy;
  let createNew;

  if (navItems.trash.visible) {
    if (navItems.trash.active) {
      trash = (
        <li
          className={`${style.navItem} ${style.trash} ${style.active}`}
          onClick={navItems.trash.onClick}
        />
      );
    } else {
      trash = (
        <li
          className={`${style.navItem} ${style.trash}`}
          onClick={navItems.trash.onClick}
        />
      );
    }
  }

  if (navItems.edit.visible) {
    if (navItems.edit.active) {
      edit = (
        <li
          className={`${style.navItem} ${style.edit} ${style.active}`}
          onClick={navItems.edit.onClick}
        />
      );
    } else {
      edit = (
        <li
          className={`${style.navItem} ${style.edit}`}
          onClick={navItems.edit.onClick}
        />
      );
    }
  }

  if (navItems.copy.visible) {
    if (navItems.copy.active) {
      copy = (
        <li
          className={`${style.navItem} ${style.copy} ${style.active}`}
          onClick={navItems.copy.onClick}
        />
      );
    } else {
      copy = (
        <li
          className={`${style.navItem} ${style.copy}`}
          onClick={navItems.copy.onClick}
        />
      );
    }
  }

  if (navItems.createNew.visible) {
    if (navItems.createNew.active) {
      createNew = (
        <li
          className={`${style.navItem} ${style.createNew} ${style.active}`}
          onClick={navItems.createNew.onClick}
        />
      );
    } else {
      createNew = (
        <li
          className={`${style.navItem} ${style.createNew}`}
          onClick={navItems.createNew.onClick}
        />
      );
    }
  }

  nav = (
    <ul className={style.nav}>
      {trash}
      {edit}
      {copy}
      {createNew}
    </ul>
  );
  return (
    <div className={style.header}>
      <h1 className={style.logo}>D&D Scribe</h1>
      {nav}
    </div>
  );
}

Header.propTypes = {
  navItems: PropTypes.object.isRequired,
};

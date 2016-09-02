import React from 'react';

import Header from
  '../../components/header/header.component';

function noop() {}

const navOrder = [
  'trash',
  'edit',
  'copy',
  'createNew',
];

const navItems0 = {
  trash: {
    visible: false,
    active: false,
    onClick: noop,
  },
  edit: {
    visible: false,
    active: false,
    onClick: noop,
  },
  copy: {
    visible: false,
    active: false,
    onClick: noop,
  },
  createNew: {
    visible: false,
    active: false,
    onClick: noop,
  },
};

const navItems1 = {
  trash: {
    visible: true,
    active: false,
    onClick: noop,
  },
  edit: {
    visible: false,
    active: false,
    onClick: noop,
  },
  copy: {
    visible: false,
    active: false,
    onClick: noop,
  },
  createNew: {
    visible: true,
    active: false,
    onClick: noop,
  },
};

const navItems2 = {
  trash: {
    visible: true,
    active: false,
    onClick: noop,
  },
  edit: {
    visible: true,
    active: false,
    onClick: noop,
  },
  copy: {
    visible: true,
    active: false,
    onClick: noop,
  },
  createNew: {
    visible: true,
    active: false,
    onClick: noop,
  },
};

const navItems3 = {
  trash: {
    visible: true,
    active: false,
    onClick: noop,
  },
  edit: {
    visible: true,
    active: true,
    onClick: noop,
  },
  copy: {
    visible: true,
    active: false,
    onClick: noop,
  },
  createNew: {
    visible: true,
    active: false,
    onClick: noop,
  },
};


export default function AbilityScoresTestContainer() {
  return (
    <div>
      <h1>Header no nav items</h1>
      <Header
        navItems={navItems0}
        navOrder={navOrder}
      />

      <h1>Header some nav items</h1>
      <Header
        navItems={navItems1}
        navOrder={navOrder}
      />

      <h1>Header all nav items</h1>
      <Header
        navItems={navItems2}
        navOrder={navOrder}
      />

      <h1>Header all nav items with active edit</h1>
      <Header
        navItems={navItems3}
        navOrder={navOrder}
      />
    </div>
  );
}

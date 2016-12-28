import React from 'react';
import Sidebar from '../../components/sidebar/sidebar.component';

export default function SidebarTestContainer() {
  const sidebarLinks = [
    {
      name: 'monsters',
      path: 'monsters',
    },
    {
      name: 'items',
      path: 'items',
    },
  ];

  const wrapperStyle = {
    display: 'flex',
  };

  const columnStyle = {
    marginRight: 50,
  };

  return (
    <div style={wrapperStyle}>
      <div style={columnStyle}>
        <h1>Sidebar no active link</h1>
        <Sidebar
          location={{ pathname: '/' }}
          links={sidebarLinks}
        />
      </div>

      <div>
        <h1>Sidebar active link</h1>
        <Sidebar
          location={{ pathname: '/monsters' }}
          links={sidebarLinks}
        />
      </div>
    </div>
  );
}

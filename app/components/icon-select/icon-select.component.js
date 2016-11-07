import React, { PropTypes } from 'react';

import style from './icon-select.component.scss';

export default function IconSelect({ icons }) {
  let key = 0;
  const iconsToRender = icons.map(icon =>
    <div className={`${style.icon} ${style[icon.name]}`} onClick={icon.onClick} key={key += 1} />
  );

  return (
    <div className={style.iconSelect}>
      {iconsToRender}
    </div>
  );
}

IconSelect.propTypes = {
  icons: PropTypes.array.isRequired,
};

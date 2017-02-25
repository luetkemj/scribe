import React from 'react';
import style from './campaigns.container.scss';

export default function CampaignsContainer() {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.heading}>Campaigns</div>
        <div className={style.campaigns}>
          <div className={style.campaign}>
            <div>
              <button className={style.name}>Party of Five</button>
            </div>
            <div>
              <div className={style.day}>DAY 12</div>
              <div className={style.time}>16:42:08</div>
              <div className={style.location}>Helmans House</div>
            </div>
          </div>

          <div className={style.campaign}>
            <div>
              <button className={style.name}>Party of Five</button>
            </div>
            <div>
              <div className={style.day}>DAY 12</div>
              <div className={style.time}>16:42:08</div>
              <div className={style.location}>Helmans House</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import should from 'should';
import { shallow } from 'enzyme';
import TimeKeeper from '../../../app/components/time-keeper/time-keeper.component';

it('should render without exploding', () => {
  const wrapper = shallow(
    <TimeKeeper
      day={2}
      time={{
        hours: 13,
        minutes: 14,
        seconds: 15,
      }}
      sky={'night'}
      rotation={-180}
      increment={() => {}}
      initialMs={100}
      phaseOfMoon={12}
    />,
  );

  should(wrapper.length).equal(1);
});

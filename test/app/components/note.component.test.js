import React from 'react';
import should from 'should';
import { shallow } from 'enzyme';
import Note from '../../../app/components/note/note.component';

it('should render without exploding', () => {
  const wrapper = shallow(
    <Note
      heading={'Note'}
      content={''}
      creating
    />,
  );
  should(wrapper.length).equal(1);
});

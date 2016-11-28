import React from 'react';
import Note from '../../components/note/note.component';

export default function NoteTestContainer() {
  return (
    <div
      style={{
        width: '300px',
        margin: '0 auto',
      }}
    >
      <h1>default</h1>
      <Note
        heading={'Note'}
        content={'This is a note'}
        creating={false}
        editing={false}
        deleting={false}
        submit={() => {}}
      />

      <h1>Creating</h1>
      <Note
        heading={'Note'}
        content={''}
        creating
        editing={false}
        deleting={false}
        submit={() => {}}
      />

      <h1>Editing</h1>
      <Note
        heading={'Note'}
        content={'This is a note'}
        creating={false}
        editing
        deleting={false}
        submit={() => {}}
      />

      <h1>Deleting</h1>
      <Note
        heading={'Note'}
        content={'This is a note'}
        creating={false}
        editing
        deleting
        submit={() => {}}
      />
    </div>
  );
}

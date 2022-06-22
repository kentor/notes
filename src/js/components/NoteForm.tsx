import React, {useState} from 'react';
import {createNote} from 'App/api';
import {Input} from 'App/components/Elements';
import {Textarea, Button} from 'App/components/Elements';

type Props = {
  onQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  query: string;
};

function NoteForm(props: Props) {
  const [content, setContent] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.ctrlKey && e.key === 'Enter') {
      handleSubmit();
    }
  }

  function handleSubmit(e?: React.FormEvent<HTMLFormElement>) {
    if (e) {
      e.preventDefault();
    }
    const cleanedContent = content.trim();
    if (cleanedContent) {
      createNote(content);
      setContent('');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Textarea
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Post..."
        rows={5}
        style={{
          display: 'block',
          flex: 'none',
          gridColumn: '1 / span 2',
          gridRow: '1',
          resize: 'none',
          width: '100%',
        }}
        value={content}
      />
      <Button
        style={{
          color: '#aaa',
          gridColumn: '2',
          gridRow: '2',
          justifySelf: 'end',
          width: 'min-content',
        }}
        type="submit"
      >
        +
      </Button>
      <Input
        onChange={props.onQueryChange}
        placeholder="Search..."
        style={{width: '100%', gridColumn: '1', gridRow: '2'}}
        value={props.query}
      />
    </form>
  );
}

export default NoteForm;

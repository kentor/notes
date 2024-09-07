import React, {useState} from 'react';
import {createNote} from 'App/api';
import {Input} from 'App/components/Elements';
import {Textarea, Button} from 'App/components/Elements';
import Icon from './Icon';

type Props = {
  onQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleShowHiddenOnly: () => void;
  query: string;
  showHiddenOnly: boolean;
};

function NoteForm(props: Props) {
  const [content, setContent] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
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
    <form
      onSubmit={handleSubmit}
      style={{display: 'flex', flexDirection: 'column', gap: 16}}
    >
      <Textarea
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Post..."
        rows={5}
        style={{resize: 'none'}}
        value={content}
      />
      <div style={{display: 'flex', gap: 16}}>
        <Input
          onChange={props.onQueryChange}
          placeholder="Search..."
          style={{flex: 1, width: 0}}
          value={props.query}
        />
        <Button onClick={props.onToggleShowHiddenOnly} style={{color: '#aaa'}}>
          <Icon icon={props.showHiddenOnly ? 'star-outline' : 'star'} />
        </Button>
        <Button style={{color: '#aaa'}} type="submit">
          <Icon icon="pencil" />
        </Button>
      </div>
    </form>
  );
}

export default NoteForm;

import Icon from 'App/components/Icon';
import marked from 'marked';
import React, {useState} from 'react';
import TimeAgo from 'react-timeago';
import {deleteNote, updateNote} from 'App/api';
import {getBackgroundStyles} from 'App/lib/stationery';
import {Note as NoteT} from 'App/types';

type Props = {
  note: NoteT;
  visible: boolean;
};

marked.setOptions({
  breaks: true,
  sanitize: true,
});

function timeAgoFormatter(value: number, unit: string) {
  return `${value} ${unit}${value === 1 ? '' : 's'}`;
}

function Note(props: Props) {
  const {note} = props;

  const contentDiv = React.createRef<HTMLDivElement>();

  const [localHidden, setLocalHidden] = useState(note.hidden);

  function handleCopy(e: React.MouseEvent) {
    e.stopPropagation();
    if (contentDiv.current) {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(contentDiv.current);
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand('copy');
      selection.removeAllRanges();
    }
  }

  function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();
    deleteNote(note.id);
  }

  function handleToggleHidden(e: React.MouseEvent) {
    e.stopPropagation();
    updateNote(note.id, {hidden: !note.hidden});
    setLocalHidden(!note.hidden);
  }

  function handleToggleLocalHidden(e: React.MouseEvent) {
    if (window.getSelection().toString()) return;
    if (e.target instanceof HTMLElement && e.target.tagName === 'A') {
      return;
    }
    setLocalHidden(!localHidden);
  }

  return (
    <div
      onClick={handleToggleLocalHidden}
      style={{
        cursor: 'pointer',
        display: props.visible ? undefined : 'none',
        padding: 10,
        wordBreak: 'break-word',
        ...getBackgroundStyles(note.id),
      }}
    >
      <div
        style={{display: 'flex', fontSize: 11, justifyContent: 'space-between'}}
      >
        <TimeAgo date={note.createdAt} formatter={timeAgoFormatter} />
        <div>
          <a onClick={handleToggleHidden}>
            <Icon icon={note.hidden ? 'star-outline' : 'star'} />
          </a>{' '}
          <a onClick={handleDelete}>
            <Icon icon="trashcan" />
          </a>{' '}
          <a onClick={handleCopy}>
            <Icon icon="clipboard" />
          </a>
        </div>
      </div>
      <div style={{display: localHidden ? 'none' : undefined}}>
        <div
          dangerouslySetInnerHTML={{
            __html: marked.inlineLexer(note.content, []),
          }}
          ref={contentDiv}
        />
      </div>
    </div>
  );
}

export default Note;
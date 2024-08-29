import Icon from 'App/components/Icon';
import React, {useState} from 'react';
import TimeAgo from 'react-timeago';
import {deleteNote, updateNote} from 'App/api';
import {getBackgroundStyles} from 'App/lib/stationery';
import {marked} from 'marked';
import {Note as NoteT} from 'App/types';

type Props = {
  note: NoteT;
  style?: {[key: string]: unknown};
  visible: boolean;
};

marked.setOptions({
  breaks: true,
});

function timeAgoFormatter(value: number, unit: string) {
  return `${value} ${unit}${value === 1 ? '' : 's'}`;
}

const Note = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {note} = props;

  const [localHidden, setLocalHidden] = useState(note.hidden);

  async function handleCopy(e: React.MouseEvent) {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(note.content);
    } catch (e) {
      console.error('Failed copying note', e);
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
    if (window.getSelection()?.toString()) return;
    if (e.target instanceof HTMLElement && e.target.tagName === 'A') {
      return;
    }
    setLocalHidden(!localHidden);
  }

  return (
    <div
      className="note"
      onClick={handleToggleLocalHidden}
      style={{
        display: props.visible ? undefined : 'none',
        ...getBackgroundStyles(note.id),
        ...props.style,
      }}
      ref={ref}
    >
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          fontSize: 11,
          justifyContent: 'space-between',
        }}
      >
        <TimeAgo
          date={new Date(note.created_at)}
          formatter={timeAgoFormatter}
        />
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
      <div
        dangerouslySetInnerHTML={{__html: marked.parseInline(note.content)}}
        style={{display: localHidden ? 'none' : undefined}}
      ></div>
    </div>
  );
});

export default Note;

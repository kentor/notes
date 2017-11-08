import background from '../lib/background';
import Clipboard from 'clipboard';
import cx from 'classnames';
import Hammer from 'hammerjs';
import Icon from './Icon';
import marked from 'marked';
import React from 'react';
import TimeAgo from 'react-timeago';

marked.setOptions({
  breaks: true,
  sanitize: true,
});

function formatTimeAgo(value, unit) {
  return `${value} ${unit}${value === 1 ? '' : 's'}`;
}

class Note extends React.PureComponent {
  state = {
    swiped: false,
  };

  componentDidMount() {
    this.clipboard = new Clipboard(this.clipboardTrigger, {
      target: () => this.clipboardTextElement,
    });

    new Hammer(this.note, {
      cssProps: { userSelect: true },
    })
      .on('swipeleft', () => {
        this.setState({ swiped: true });
      })
      .on('swiperight', () => {
        this.setState({ swiped: false });
      });
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  destroy = e => {
    e.stopPropagation();
    this.props.onDestroy(this.props.note);
  };

  shouldShowContent = () => {
    const { localHidden, note } = this.props;
    return localHidden === undefined ? !note.get('hidden') : !localHidden;
  };

  toggleLocalHidden = e => {
    if (window.getSelection && window.getSelection().toString()) return;
    if (e && e.target.tagName === 'A') return;
    this.props.onToggleLocalHidden(this.props.note);
  };

  toggleHidden = e => {
    e.stopPropagation();
    this.props.onToggleHidden(this.props.note);
  };

  render() {
    const { note } = this.props;
    const bg = background(note.get('id'));

    return (
      <li
        className={cx('Note', bg.pattern, {
          hidden: this.props.hidden,
          swiped: this.state.swiped,
        })}
        onClick={this.toggleLocalHidden}
        ref={c => {
          this.note = c;
        }}
        style={{ backgroundColor: `hsl(${bg.hue}, 100%, 87.5%)` }}
      >
        <div className="Note-meta">
          <TimeAgo
            date={note.get('createdAt')}
            formatter={formatTimeAgo}
            live={process.env.NODE_ENV !== 'test'}
          />
          <div className="Note-controls">
            <a onClick={this.toggleHidden}>
              <Icon icon={note.get('hidden') ? 'star-outline' : 'star'} />
            </a>{' '}
            <a onClick={this.destroy}>
              <Icon icon="delete" />
            </a>{' '}
            <a
              ref={c => {
                this.clipboardTrigger = c;
              }}
              style={{ marginLeft: 2 }}
            >
              <Icon icon="clipboard" />
            </a>
          </div>
        </div>

        <div
          className={cx('Note-content', { hidden: !this.shouldShowContent() })}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: marked(note.get('content')),
            }}
            ref={c => {
              this.clipboardTextElement = c;
            }}
          />
        </div>

        <div className="Note-mobileDelete" onClick={this.destroy}>
          <Icon icon="delete" size="2rem" />
        </div>
      </li>
    );
  }
}

export default Note;

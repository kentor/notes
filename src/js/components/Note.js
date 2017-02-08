import background from '../lib/background';
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
    new Hammer(this.refs.note, {
      cssProps: { userSelect: true },
    }).on('swipeleft', () => {
      this.setState({ swiped: true });
    }).on('swiperight', () => {
      this.setState({ swiped: false });
    });
  }

  destroy = (e) => {
    e.stopPropagation();
    this.props.onDestroy(this.props.note);
  };

  shouldShowContent = () => {
    const { localHidden, note } = this.props;
    return localHidden === undefined ? !note.get('hidden') : !localHidden;
  };

  toggleLocalHidden = (e) => {
    if (window.getSelection && window.getSelection().toString()) return;
    if (e && e.target.tagName === 'A') return;
    this.props.onToggleLocalHidden(this.props.note);
  };

  toggleHidden = (e) => {
    e.stopPropagation();
    this.props.onToggleHidden(this.props.note);
  };

  render() {
    const { note } = this.props;
    const bg = background(note.get('id'));

    return (
      <li
        className={cx({
          'hidden': this.props.hidden,
          'Note': true,
          'swiped': this.state.swiped,
          [bg.pattern]: true,
        })}
        ref="note"
        onClick={this.toggleLocalHidden}
        style={{
          backgroundColor: `hsl(${bg.hue}, 100%, 87.5%)`,
        }}
      >
        <div className="Note-meta">
          <TimeAgo
            date={note.get('createdAt')}
            formatter={formatTimeAgo}
            live={process.env.NODE_ENV !== 'test'}
          />
          <div className="Note-controls">
            <a onClick={this.toggleHidden}>
              <Icon
                icon={note.get('hidden') ? 'star-outline' : 'star'}
                ref="toggleHidden"
              />
            </a>
            {' '}
            <a className="Note-deleteIcon" onClick={this.destroy}>
              <Icon icon="delete" ref="destroy" />
            </a>
          </div>
        </div>

        <div
          className={cx({
            'hidden': !this.shouldShowContent(),
            'Note-content': true,
          })}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: marked(note.get('content')),
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

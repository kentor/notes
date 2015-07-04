var classNames = require('classnames');
var FilterStore = require('../stores/FilterStore');
var Hammer = require('hammerjs');
var marked = require('marked');
var NoteActions = require('../actions/NoteActions');
var React = require('react');
var Reflux = require('reflux');
var ta = require('time-ago')();
var Youtube = require('./Youtube.jsx');

marked.setOptions({
  breaks: true,
  sanitize: true,
});

function timeago(isoString) {
  return ta.ago(Date.parse(isoString)).replace(' ago', '');
}

var Note = React.createClass({
  mixins: [Reflux.ListenerMixin],

  getInitialState() {
    return {
      filtered: this.noteFiltered(),
      showAddon: false,
      swiped: false,
    };
  },

  componentDidMount() {
    new Hammer(this.getDOMNode(), {
      cssProps: {
        userSelect: true,
      },
    })
    .on('swipeleft', () => {
      this.setState({ swiped: true });
    })
    .on('swiperight', () => {
      this.setState({ swiped: false });
    });

    this.listenTo(FilterStore, () => {
      this.setState({ filtered: this.noteFiltered() });
    });
  },

  hasAddon() {
    var content = this.props.note.get('content');
    var [, id] = content.match(/youtube\.com\/watch\?v=([\w-]+)\b/) || [];
    if (id) {
      return id;
    }
  },

  delete() {
    NoteActions.deleteNote(this.props.note.get('name'));
  },

  noteFiltered() {
    return FilterStore.filter() &&
           !this.props.note.get('content').match(FilterStore.filterRegexp());
  },

  toggleHidden() {
    var note = this.props.note;
    NoteActions.updateNote(note.get('name'), { hidden: !note.get('hidden') });
  },

  toggleLocalHidden(e) {
    if (window.getSelection().toString() ||
        e.target.tagName.match(/^[ai]$/i)) return;
    var note = this.props.note;
    NoteActions.toggleLocalHidden(note.get('name'));
  },

  toggleShowAddon() {
    this.setState({ showAddon: !this.state.showAddon });
  },

  render() {
    var note = this.props.note;
    var noteClasses = classNames({
      [note.get('className')]: true,
      'hidden': this.state.filtered,
      'note': true,
      'swiped': this.state.swiped,
    });
    var noteStyles = {
      backgroundColor: `hsl(${note.get('className').match(/\d+/)[0]}, 100%,
        87.5%)`,
    };
    var noteContentClasses = classNames({
      'note-content': true,
      'hidden': note.has('localHidden') ? note.get('localHidden')
                                        : note.get('hidden'),
    });
    var content = marked(note.get('content'));

    return (
      <li className={noteClasses} style={noteStyles}
        onClick={this.toggleLocalHidden}>
        <div className="controls">
          <time>
            {timeago(note.get('createdAt'))}
          </time>
          <div className="icons">
            {!!this.hasAddon() &&
              <a onClick={this.toggleShowAddon}>♪</a>
            }
            {' '}
            <a onClick={this.toggleHidden}>
              {note.get('hidden') ? '☆' : '★'}
            </a>
            {' '}
            <a className="delete-note" onClick={this.delete}>⌫</a>
          </div>
        </div>
        <div className={noteContentClasses}>
          <div dangerouslySetInnerHTML={{ __html: content }} />
          {this.state.showAddon &&
            <Youtube id={this.hasAddon()} />
          }
        </div>
        <a onClick={this.delete} className="swipe-delete">
          Delete
        </a>
      </li>
    );
  },
});

module.exports = Note;

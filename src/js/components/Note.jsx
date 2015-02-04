import FilterStore from '../stores/FilterStore';
import Hammer from 'hammerjs';
import marked from 'marked';
import moment from 'moment';
import NoteActions from '../actions/NoteActions';
import React from 'react/addons';
import Reflux from 'reflux';
import Youtube from './Youtube.jsx';

marked.setOptions({
  breaks: true,
  sanitize: true,
});

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
      this.setState({swiped: true});
    })
    .on('swiperight', () => {
      this.setState({swiped: false});
    });

    this.listenTo(FilterStore, () => {
      this.setState({ filtered: this.noteFiltered() });
    });
  },

  hasAddon() {
    var content = this.props.note.get('content');
    var [,id] = content.match(/youtube\.com\/watch\?v=([\w-]+)\b/) || [];
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
    var noteClasses = React.addons.classSet({
      [note.get('className')]: true,
      'hidden': this.state.filtered,
      'note': true,
      'swiped': this.state.swiped,
    });
    var noteStyles = {
      backgroundColor: `hsl(${note.get('className').match(/\d+/)[0]}, 100%,
        87.5%)`,
    };
    var noteContentClasses = React.addons.classSet({
      'note-content': true,
      'hidden': note.has('localHidden') ? note.get('localHidden')
                                        : note.get('hidden'),
    });
    var content = marked(note.get('content'));
    var time = moment(note.get('createdAt')).fromNow().replace(' ago', '');

    return (
      <li className={noteClasses} style={noteStyles}
        onClick={this.toggleLocalHidden}>
        <div className="controls">
          <time>{time}</time>
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
          <div dangerouslySetInnerHTML={{__html: content}} />
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

export default Note;

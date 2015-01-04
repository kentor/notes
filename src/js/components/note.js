var Hammer = require('hammerjs');
var Markdown = require('pagedown').getSanitizingConverter();
var moment = require('moment');
var React = require('react/addons');

var Note = React.createClass({
  getInitialState: function() {
    return { swiped: false };
  },

  toggleLocalHidden: function(e) {
    if (window.getSelection().toString() ||
        e.target.tagName.match(/^[ai]$/i)) return;
    this.props.onToggleLocalHidden();
  },

  componentDidMount: function() {
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
  },

  render: function() {
    var note = this.props.note;
    var noteClasses = React.addons.classSet({
      [note.get('className')]: true,
      'note': true,
      'swiped': this.state.swiped,
    });
    var noteContentClasses = React.addons.classSet({
      'note-content': true,
      'hidden': note.has('localHidden') ? note.get('localHidden')
                                        : note.get('hidden'),
    });
    var content = Markdown.makeHtml(note.get('content'));
    var time = moment(note.get('createdAt')).fromNow().replace(' ago', '');

    return (
      <li className={noteClasses} onClick={this.toggleLocalHidden}>
        <div className="controls">
          <time>{time}</time>
          <div className="icons">
            <a onClick={this.props.onToggleHidden}>
              {note.get('hidden') ? '☼' : '☀'}
            </a>
            &nbsp;
            <a className="delete-note" onClick={this.props.onDelete}>✖</a>
          </div>
        </div>
        <div className={noteContentClasses}
             dangerouslySetInnerHTML={{__html: content}} />
        <a onClick={this.props.onDelete} className="swipe-delete">
          Delete
        </a>
      </li>
    );
  }
});

module.exports = Note;

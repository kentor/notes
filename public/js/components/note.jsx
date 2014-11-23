var React = require('react');
require('react/addons');
var Markdown = require('pagedown').getSanitizingConverter();
var moment = require('moment');

var Note = React.createClass({
  toggleLocalHidden: function(e) {
    if (window.getSelection().toString() || e.target.tagName.match(/^[ai]$/i)) return;
    this.props.onToggleLocalHidden();
  },

  render: function() {
    var note = this.props.note;
    var cx = React.addons.classSet;
    var noteContentClasses = cx({
      'note-content': true,
      'hidden': note.get('localHidden'),
    });
    var content = Markdown.makeHtml(note.get('content'));

    return (
      <li className="note" onClick={this.toggleLocalHidden} style={note.get('style').toObject()}>
        <div className="controls">
          <time>{moment(note.get('createdAt')).fromNow().replace(' ago', '')}</time>
          <div className="icons">
            <a onClick={this.props.onToggleHidden}>{note.get('hidden') ? '☼' : '☀'}</a>
            &nbsp;
            <a className="delete-note" onClick={this.props.onDelete}>✖</a>
          </div>
        </div>
        <div className={noteContentClasses} dangerouslySetInnerHTML={{__html: content}} />
      </li>
    );
  }
});

module.exports = Note;

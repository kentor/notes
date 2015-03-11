var React = require('react');

var Youtube = React.createClass({
  render() {
    return (
      <div style={{
        marginTop: '10px',
        paddingTop: (9 / 16 * 100) + '%',
        position: 'relative',
      }}>
        <iframe
          allowFullScreen
          frameBorder="0"
          src={`https://www.youtube.com/embed/${this.props.id}`}
          style={{
            bottom: 0,
            height: '100%',
            position: 'absolute',
            width: '100%',
          }}
        ></iframe>
      </div>
    );
  }
});

module.exports = Youtube;

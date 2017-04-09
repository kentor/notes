import PropTypes from 'prop-types';
import React from 'react';

class Icon extends React.PureComponent {
  static propTypes = {
    icon: PropTypes.string.isRequired,
  };

  /* eslint-disable max-len */
  renderGraphic = () => {
    switch (this.props.icon) {
      case 'delete':
        return <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-12h-12v12zm13-15h-3.5l-1-1h-5l-1 1h-3.5v2h14v-2z" />;
      case 'logout':
        return <path d="M19 19h-14v-14h7v-2h-7c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zm-5-16v2h3.59l-9.83 9.83 1.41 1.41 9.83-9.83v3.59h2v-7h-7z" />;
      case 'star':
        return <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />;
      case 'star-outline':
        return <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />;
      default:
        return null;
    }
  };
  /* eslint-enable max-len */

  render() {
    const size = this.props.size || '0.9rem';
    const styles = {
      fill: 'currentcolor',
      height: size,
      width: size,
    };

    return (
      <svg
        preserveAspectRatio="xMidYMid meet"
        style={styles}
        viewBox="0 0 24 24"
      >
        {this.renderGraphic()}
      </svg>
    );
  }
}

export default Icon;

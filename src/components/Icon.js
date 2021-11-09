import PropTypes from 'prop-types';

import styles from  './Icon.module.scss';

const Icon = ({ name, size = "md", ...props}) => (
  <span className={`material-icons ${styles['icon']} ${styles[size]} ${props.className}`}>
    {name}
  </span>
);

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['md', 'lg']),
}

export default Icon;
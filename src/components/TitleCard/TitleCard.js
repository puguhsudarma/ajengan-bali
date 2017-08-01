import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './TitleCard.Style';

const TitleCard = ({ children, uppercase, style }) => (
  <Text style={{ ...styles.titleCard, ...style }}>
    {
      (uppercase && children.toUpperCase()) ||
      (!uppercase && children)
    }
  </Text>
);

TitleCard.propTypes = {
  children: PropTypes.string.isRequired,
  uppercase: PropTypes.bool,
  style: PropTypes.shape(),
};

TitleCard.defaultProps = {
  uppercase: true,
  style: {},
};

export default TitleCard;

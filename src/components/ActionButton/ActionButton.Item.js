import React from 'react';
import { Item as ItemRN } from 'react-native-action-button';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import styles from './ActionButton.Style';

const Item = ({ buttonColor, title, onPress, icon }) => (
  <ItemRN
    buttonColor={buttonColor}
    title={title}
    onPress={onPress}
  >
    <Icon name={icon} style={styles.actionButtonIcon} />
  </ItemRN>
);

Item.propTypes = {
  buttonColor: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Item;

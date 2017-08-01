import React from 'react';
import ActionButton, { Item } from 'react-native-action-button';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import styles from './DetailMakanan.Style';

const ItemDM = ({ buttonColor, title, onPress, icon }) => (
  <Item
    buttonColor={buttonColor}
    title={title}
    onPress={onPress}
  >
    <Icon name={icon} style={styles.actionButtonIcon} />
  </Item>
);

ItemDM.propTypes = {
  buttonColor: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
};

const ActionButtonDM = ({ onPressNav, onPressModal }) => (
  <ActionButton buttonColor="rgba(231,76,60,1)">
    <ItemDM
      buttonColor="#9b59b6"
      title="Navigasi Peta"
      onPress={onPressNav}
      icon="map"
    />

    <ItemDM
      buttonColor="#3498db"
      title="Beri Review"
      onPress={onPressModal}
      icon="star"
    />
  </ActionButton >
);

ActionButtonDM.propTypes = {
  onPressNav: PropTypes.func.isRequired,
  onPressModal: PropTypes.func.isRequired,
};

export default ActionButtonDM;

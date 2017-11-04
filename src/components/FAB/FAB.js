import React from 'react';
import { Icon } from 'native-base';
import ActionButton from 'react-native-action-button';
import PropTypes from 'prop-types';
import styles from './FAB.Style';

const FAB = ({ actions, buttonColor }) => (
  <ActionButton buttonColor={buttonColor}>
    {
      actions.map(item => (
        <ActionButton.Item
          key={item.key}
          buttonColor={item.color}
          title={item.title}
          onPress={item.onPress}
        >
          <Icon name={item.icon} style={styles.actionButtonIcon} />
        </ActionButton.Item>
      ))
    }
  </ActionButton >
);

FAB.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number,
    color: PropTypes.string,
    title: PropTypes.string,
    onPress: PropTypes.func,
    icon: PropTypes.string,
  })).isRequired,
  buttonColor: PropTypes.string,
};

FAB.defaultProps = {
  buttonColor: 'rgba(231,76,60,1)',
};

export default FAB;

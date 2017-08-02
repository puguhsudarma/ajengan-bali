import React from 'react';
import { ActionButton as FAB } from 'react-native-action-button';
import PropTypes from 'prop-types';
import Item from './ActionButton.Item';

const ActionButton = ({ actions, buttonColor }) => (
  <FAB buttonColor={buttonColor}>
    {
      actions.map(item => (
        <Item
          key={item.key}
          buttonColor={item.color}
          title={item.title}
          onPress={item.onPress}
          icon={item.icon}
        />
      ))
    }
  </FAB >
);

ActionButton.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number,
    color: PropTypes.string,
    title: PropTypes.string,
    onPress: PropTypes.func,
    icon: PropTypes.string,
  })).isRequired,
  buttonColor: PropTypes.string,
};

ActionButton.defaultProps = {
  buttonColor: 'rgba(231,76,60,1)',
};

export default ActionButton;

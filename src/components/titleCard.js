import React, { Component } from 'react';
import {
  Text,
} from 'react-native';

const TitleCard = ({ children, uppercase, style }) => {
  return (
    <Text style={{ fontSize: 20, fontWeight: 'bold', ...style, }}>
      {uppercase ?
        children.toUpperCase() :
        children}
    </Text>
  );
};

TitleCard.defaultProps = {
  uppercase: true,
};

export default TitleCard;
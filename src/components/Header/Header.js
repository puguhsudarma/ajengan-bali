import React from 'react';
import PropTypes from 'prop-types';
import {
  Header as HeaderNB,
  Body,
  Title,
  Subtitle,
} from 'native-base';
import styles from './Header.Style';
import Left from './Header.Left';
import Right from './Header.Right';

const Header = ({ hasTabs, title, subtitle, rightItem, leftItem }) => (
  <HeaderNB hasTabs={hasTabs}>
    <Left leftItem={leftItem} />
    <Body>
      <Title>{title}</Title>
      {
        subtitle !== null &&
        <Subtitle style={styles.subtitle}>{subtitle}</Subtitle>
      }
    </Body>
    <Right rightItem={rightItem} />
  </HeaderNB>
);

const { bool, string, shape, arrayOf, func, number } = PropTypes;
Header.propTypes = {
  hasTabs: bool,
  title: string.isRequired,
  subtitle: string,
  rightItem: arrayOf(shape({
    id: number,
    icon: string,
    funcPress: func,
  })),
  leftItem: shape({
    icon: string,
    funcPress: func,
  }),
};

Header.defaultProps = {
  hasTabs: false,
  subtitle: null,
  rightItem: [],
  leftItem: {},
};

export default Header;

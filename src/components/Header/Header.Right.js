import React from 'react';
import PropTypes from 'prop-types';
import {
  Right,
  Icon,
  Button,
} from 'native-base';
import { isEmpty } from 'lodash';

const RightItem = ({ rightItem }) => {
  if (!isEmpty(rightItem)) {
    const right = rightItem.map(item => (
      <Button key={item.id} transparent onPress={item.funcPress}>
        <Icon name={item.icon} />
      </Button>
    ));

    return <Right>{right}</Right>;
  }
  return <Right />;
};

RightItem.propTypes = {
  rightItem: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    icon: PropTypes.string,
    funcPress: PropTypes.func,
  })),
};

RightItem.defaultProps = {
  rightItem: [],
};

export default RightItem;

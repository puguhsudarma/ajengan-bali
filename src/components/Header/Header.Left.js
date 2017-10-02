import React from 'react';
import PropTypes from 'prop-types';
import {
  Left,
  Icon,
  Button,
} from 'native-base';
import { isEmpty } from 'lodash';

const LeftItem = ({ leftItem }) => {
  if (!isEmpty(leftItem)) {
    const { funcPress, icon } = leftItem;
    return (<Left>
      <Button transparent onPress={funcPress}>
        <Icon name={icon} />
      </Button>
    </Left>);
  }

  return <Left />;
};

LeftItem.propTypes = {
  leftItem: PropTypes.shape({
    icon: PropTypes.string,
    funcPress: PropTypes.func,
  }),
};

LeftItem.defaultProps = {
  leftItem: {},
};

export default LeftItem;

import React, { Component } from 'react';
import {
  Body,
  Icon,
  Text,
  View,
  Button,
  Card,
  CardItem,
  Input,
  Item,
  Picker,
} from 'native-base';
import PropTypes from 'prop-types';
import TitleCard from '../../components/TitleCard/TitleCard';
import styles from './Search.Style';

const InputQuery = ({ onChangeText }) => (
  <Item>
    <Icon active name="search" />
    <Input onChangeText={onChangeText} placeholder="Mencari sesuatu ?" />
  </Item>
);

InputQuery.propTypes = {
  onChangeText: PropTypes.func.isRequired,
};

class PickerWithState extends Component {
  constructor(props) {
    super(props);
    const { value } = this.props;
    this.state = {
      selectedValue: value,
    };
    this._onValueChange = this._onValueChange.bind(this);
  }

  _onValueChange(value) {
    const { onValueChange } = this.props;
    this.setState(
      { selectedValue: value },
      () => onValueChange(value),
    );
  }

  render() {
    const { selectedValue } = this.state;
    const { data } = this.props;
    return (
      <Picker
        supportedOrientations={['portrait', 'landscape']}
        mode="dropdown"
        selectedValue={selectedValue}
        onValueChange={this._onValueChange}
      >
        {data.map(item => <Item {...item} />)}
      </Picker>
    );
  }
}

PickerWithState.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  data: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  })).isRequired,
  onValueChange: PropTypes.func.isRequired,
};

PickerWithState.defaultProps = {
  value: null,
};

const FormInput = ({ onChangeText, InputJenisData, InputKategoriData, onSearch }) => (
  <Card style={styles.cardContainer}>
    <CardItem header>
      <Body>
        <TitleCard>Pencarian</TitleCard>
      </Body>
    </CardItem>
    <View style={styles.formContainer}>
      <InputQuery onChangeText={onChangeText} />
      <PickerWithState
        value={InputJenisData.value}
        data={InputJenisData.data}
        onValueChange={InputJenisData.onValueChange}
      />
      {
        InputJenisData.value === 2 &&
        <PickerWithState
          value={InputKategoriData.value}
          data={InputKategoriData.data}
          onValueChange={InputKategoriData.onValueChange}
        />
      }
    </View>
    <CardItem footer style={styles.formFooterContainer}>
      <Button success small iconLeft onPress={onSearch}>
        <Icon name="search" />
        <Text>Cari</Text>
      </Button>
    </CardItem>
  </Card >
);

FormInput.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  InputJenisData: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    data: PropTypes.arrayOf(),
    onValueChange: PropTypes.func,
  }).isRequired,
  InputKategoriData: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    data: PropTypes.arrayOf(),
    onValueChange: PropTypes.func,
  }).isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default FormInput;

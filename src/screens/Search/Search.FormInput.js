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
  Spinner,
} from 'native-base';
import PropTypes from 'prop-types';
import TitleCard from '../../components/TitleCard/TitleCard';
import styles from './Search.Style';

// Text Input
const InputQuery = ({ onChangeText }) => (
  <Item>
    <Icon active name="search" />
    <Input onChangeText={onChangeText} placeholder="Mencari sesuatu ?" />
  </Item>
);

InputQuery.propTypes = {
  onChangeText: PropTypes.func.isRequired,
};

// Picker With State
class PickerWithState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: '',
    };
    this._onValueChange = this._onValueChange.bind(this);
  }

  _onValueChange(value) {
    const { onValueChange } = this.props;
    this.setState(
      {
        selectedValue: value,
      },
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
        {
          data.map(item => (<Item
            key={item.value}
            label={item.label}
            value={item.value}
          />))
        }
      </Picker>
    );
  }
}

PickerWithState.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })).isRequired,
  onValueChange: PropTypes.func.isRequired,
};

// Form Input
const FormInput = ({
  onChangeText,
  InputJenisData,
  InputKategoriMakanan,
  jenisData,
  message,
  loading,
  onSearch,
}) =>
  (
    <Card style={styles.cardContainer}>
      <CardItem header>
        <Body>
          <TitleCard>Pencarian</TitleCard>
        </Body>
      </CardItem>
      <View style={styles.formContainer}>
        <InputQuery onChangeText={onChangeText} />
        <Text style={styles.textMsg}>{message}</Text>
        <PickerWithState
          data={InputJenisData.data}
          onValueChange={InputJenisData.onValueChange}
        />
        {
          jenisData === 'makanan' &&
          <PickerWithState
            data={InputKategoriMakanan.data}
            onValueChange={InputKategoriMakanan.onValueChange}
          />
        }

      </View>
      <CardItem footer style={styles.formFooterContainer}>
        <Button
          success
          iconLeft
          disabled={loading}
          onPress={onSearch}
        >
          {
            loading ?
              <Spinner color="#fff" /> :
              <Icon name="search" />
          }
          <Text>Cari</Text>
        </Button>
      </CardItem>
    </Card >
  );

FormInput.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  InputJenisData: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape()),
    onValueChange: PropTypes.func,
  }).isRequired,
  InputKategoriMakanan: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape()),
    onValueChange: PropTypes.func,
  }).isRequired,
  jenisData: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  message: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

FormInput.defaultProps = {
  message: '',
};

export default FormInput;

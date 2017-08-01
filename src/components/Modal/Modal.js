import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Item, Input } from 'native-base';
import PropTypes from 'prop-types';
import ModalRN from 'react-native-modal';
import StarRating from 'react-native-star-rating';
import styles from './Modal.Style';
import TitleCard from '../TitleCard/TitleCard';

class Modal extends Component {
  constructor(props) {
    super(props);
    const { input } = this.props;
    this.state = {
      star: input.star,
      review: input.review,
    };

    this._onPressStar = this._onPressStar.bind(this);
    this._onChangeText = this._onChangeText.bind(this);
  }

  _onPressStar(star) {
    this.setState({ star });
  }

  _onChangeText(text) {
    this.setState({ review: text });
  }

  render() {
    const {
      visible,
      maxRating,
      onModalOk,
      onModalCancel,
    } = this.props;
    const { review, star } = this.state;
    return (
      <ModalRN isVisible={visible}>
        <View style={styles.modalContentContainer}>
          <View style={styles.modal}>
            <TitleCard style={styles.modalTitleCard}>Input Review</TitleCard>

            <StarRating
              disabled={false}
              maxStars={maxRating}
              rating={star}
              selectedStar={this._onPressStar}
              starColor={styles.colorStar}
            />

            <View style={styles.modalInputContainer}>
              <Item>
                <Input
                  placeholder="Review"
                  value={review}
                  onChangeText={this._onChangeText}
                />
              </Item>
            </View>

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={onModalCancel}>
                <Text style={styles.modalTextButton}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalButton} onPress={onModalOk(this.state)}>
                <Text style={styles.modalTextButton}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ModalRN>
    );
  }
}

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  maxRating: PropTypes.number.isRequired,
  input: PropTypes.shape().isRequired,
  onModalOk: PropTypes.func.isRequired,
  onModalCancel: PropTypes.func.isRequired,
};

export default Modal;

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Item, Input } from 'native-base';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import StarRating from 'react-native-star-rating';
import styles from './Modal.Style';
import TitleCard from '../TitleCard/TitleCard';

const ModalMD = ({
  modalVisible,
  maxRating,
  input,
  onPressStar,
  onChangeText,
  onModalOk,
  onModalCancel }) => (
    <Modal isVisible={modalVisible}>
      <View style={styles.modalContentContainer}>
        <View style={styles.modal}>
          <TitleCard style={styles.modalTitleCard}>Input Review</TitleCard>

          <StarRating
            disabled={false}
            maxStars={maxRating}
            rating={input.star}
            selectedStar={onPressStar}
            starColor={styles.colorStar}
          />

          <View style={styles.modalInputContainer}>
            <Item>
              <Input
                placeholder="Review"
                value={input.review}
                onChangeText={onChangeText}
              />
            </Item>
          </View>

          <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={styles.modalButton} onPress={onModalCancel}>
              <Text style={styles.modalTextButton}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalButton} onPress={onModalOk}>
              <Text style={styles.modalTextButton}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

ModalMD.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  maxRating: PropTypes.number.isRequired,
  input: PropTypes.shape().isRequired,
  onPressStar: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onModalOk: PropTypes.func.isRequired,
  onModalCancel: PropTypes.func.isRequired,
};

export default ModalMD;

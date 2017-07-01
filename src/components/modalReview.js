import React, { Component } from 'react';
import {
  View,
  Input,
  Item,
} from 'native-base';
import StarRating from 'react-native-star-rating';
import {
  TouchableOpacity,
} from 'react-native';
import TitleCard from './titleCard';
import Modal from 'react-native-modal';

export class FadeInView extends Component {
  constructor(props) {
    super(props);
    const { input, isVisible } = this.props;
    this.state = {
      maxRating: 5,
      modalVisible: isVisible,
      modalInputTemp: {
        star: input.star,
        desc: input.desc,
      },
    };
  }

   onStarRatingPress = (rating) => {
    this.setState(prevState => ({
      modalInputTemp: {
        ...prevState.modalInputTemp,
        star: rating,
      }
    }));
  }

  onReviewInput = (text) => {
    this.setState(prevState => ({
      modalInputTemp:{
        ...prevState.modalInputTemp,
        desc: text,
      }
    }));
  }

  onModalOk = () => {
    this.setState(prevState => ({
      reviewInput:{
        ...prevState.modalInputTemp,
      },
      modalVisible: !prevState.modalVisible,
    }));
  }

  onModalCancel = () => {
    this.setState((prevState, props) => ({
      modalVisible: !prevState.modalVisible,
    }));
  }

  render(){
    const { modalVisible, maxRating, modalInputTemp } = this.state;
    const { title } = this.props;

  
    return(
      <Modal isVisible={modalVisible}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.modal}>
              <TitleCard style={{ marginBottom: 20, }}>{title}</TitleCard>

              <StarRating
                disabled={false}
                maxStars={maxRating}
                rating={modalInputTemp.star}
                selectedStar={(rating) => this.onStarRatingPress(rating)}
                starColor={'#FFDF00'}
              />

              <View style={{ marginTop: 20, }}>
                <Item>
                  <Input placeholder="Review" value={modalInputTemp.desc} onChange={event => this.onReviewInput(event.nativeEvent.text)} />
                </Item>
              </View>
              <View style={{ alignSelf: 'flex-end', flexDirection: 'row', }}>
                <TouchableOpacity style={{ marginTop: 20, marginLeft: 20, }} onPress={() => this.onModalCancel()}>
                  <Text style={{ color: 'brown' }}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ marginTop: 20, marginLeft: 20, }} onPress={() => this.onModalOk()}>
                  <Text style={{ color: 'brown' }}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
    );
  }
}

const styles = {
  subtitle: {
    color: '#fff',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  card: {
    marginLeft: 10,
    marginRight: 10,
  },
  modal: {
    padding: 20,
    margin: 5,
    backgroundColor: '#fff',
    flexGrow: 1,
  }
};
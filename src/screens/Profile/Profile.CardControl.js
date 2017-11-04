import React from 'react';
import {
  Card,
  CardItem,
  Body,
  Button,
  Spinner,
  Icon,
  Text,
} from 'native-base';
import PropTypes from 'prop-types';
import TitleCard from '../../components/TitleCard/TitleCard';
import styles from './Profile.Style';

const CardControl = ({ loading, onPress }) => (
  <Card style={styles.card}>
    <CardItem header>
      <Body>
        <TitleCard>Pengaturan Profil</TitleCard>
      </Body>
    </CardItem>
    <CardItem>
      <Button
        danger
        iconLeft
        disabled={loading}
        onPress={onPress}
        style={styles.buttonLogout}
      >
        {
          (loading && <Spinner color="#fff" />) ||
          (!loading && <Icon name="home" />)
        }
        <Text>Logout</Text>
      </Button>
    </CardItem>
  </Card>
);

CardControl.propTypes = {
  loading: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default CardControl;

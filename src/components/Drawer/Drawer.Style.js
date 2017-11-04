import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  backgroundDrawer: {
    flex: 1,
    height: 200,
    resizeMode: 'stretch',
  },
  containerDrawerContent: {
    justifyContent: 'flex-end',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .2),',
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 500,
    marginBottom: 10,
    borderColor: '#fff',
    borderWidth: 1,
  },
  textName: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  textEmail: {
    color: '#fff',
  },
});

export default styles;

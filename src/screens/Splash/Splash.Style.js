import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#004D40',
    flex: 1,
    paddingTop: 80,
    paddingLeft: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    color: '#fff',
    fontSize: 27,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#fff',
    fontWeight: '300',
    fontSize: 17,
  },
  ver: {
    color: '#fff',
  },
  loadingContainer: {
    flexDirection: 'row',
  },
  spinner: {
    alignItems: 'flex-start',
  },
  loadingMsg: {
    color: '#fff',
  },
});

export default styles;

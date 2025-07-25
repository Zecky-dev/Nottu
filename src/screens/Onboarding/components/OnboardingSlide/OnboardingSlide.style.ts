import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
import COLORS from '@colors';

export default StyleSheet.create({
  container: {
    width,
    alignItems: 'center',
  },
  title: {
    color: COLORS.white,
    fontSize: 28,
    fontFamily: 'Quicksand-Medium',
  },
  description: {
    color: COLORS.white,
    fontSize: 20,
    fontFamily: 'Quicksand-Regular',
    textAlign: 'center',
    marginHorizontal: 32
  },
});

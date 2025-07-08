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
    fontSize: 32,
    fontFamily: 'Quicksand-Medium',
  },
  description: {
    color: COLORS.white,
    fontSize: 24,
    fontFamily: 'Quicksand-Regular',
    textAlign: 'center',
  },
});

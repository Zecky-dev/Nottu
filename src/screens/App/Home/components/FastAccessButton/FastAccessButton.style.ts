import { StyleSheet } from 'react-native';
import COLORS from '@colors';
export default StyleSheet.create({
  fastAccessButton: {
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 36,
  },
  buttonContentContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    width: 36,
    height: 36,
  },
});

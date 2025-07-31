import { StyleSheet } from 'react-native';
import COLORS from '@colors';

export default StyleSheet.create({
  sectionTitleContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  sectionIcon: {
    width: 28,
    height: 28,
  },
  sectionTitle: {
    color: COLORS.black,
    fontFamily: 'Quicksand-Bold',
    fontSize: 18,
  },
});

import { StyleSheet } from 'react-native';
import COLORS from '@colors';
export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 12,
    borderColor: COLORS.black,
    borderWidth: 2,
    gap: 6,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 16, // Android
  },
  topContainer: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Quicksand-SemiBold',
    fontSize: 16,
  },
  description: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 15,
  },
  disabledContainer: {
    backgroundColor: COLORS.success_green,
  },
  grantedContainer: {
    backgroundColor: COLORS.success_green,
    borderWidth: 0,
  },
  grantedText: {
    color: COLORS.white,
  }

});

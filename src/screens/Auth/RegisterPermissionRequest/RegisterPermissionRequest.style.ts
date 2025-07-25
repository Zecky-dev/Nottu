import { StyleSheet } from 'react-native';
import COLORS from '@colors';
export default StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  gradientContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  permissionsContainer: {
    gap: 12,
  },
  title: {
    color: COLORS.white,
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium',
    fontSize: 36,
    letterSpacing: 12,
    marginBottom: 24,
  },
  continueButtonContainer: {
    borderRadius: 12,
  },
});

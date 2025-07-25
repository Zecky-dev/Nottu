import { StyleSheet } from 'react-native';
import COLORS from '@colors';
export default StyleSheet.create({
  title: {
    color: COLORS.white,
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium',
    fontSize: 36,
    letterSpacing: 12,
  },
  outerContainer: {
    flex: 1,
  },
  gradientContainer: {
    flex: 1,
    padding: 16,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  innerContentContainer: { flex: 1, justifyContent: 'center', gap: 12 },
  continueButtonContainer: {
    borderRadius: 12,
  }
});

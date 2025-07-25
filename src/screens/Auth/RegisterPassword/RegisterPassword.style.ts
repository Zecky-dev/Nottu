import { StyleSheet } from 'react-native';
import COLORS from '@colors';
export default StyleSheet.create({
  title: {
    color: COLORS.white,
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium',
    fontSize: 36,
    letterSpacing: 12,
    marginBottom: 8,
  },
  subTitle: {
    color: COLORS.white,
    textAlign: 'center',
    fontFamily: 'Quicksand-Bold',
    fontSize: 24,
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
  },
  backButtonContainer: {
    position: 'absolute',
    top: 0,
  },
  errorText: {
    color: COLORS.error_red,
    fontFamily: 'Quicksand-Medium',
    fontSize: 16,
  }
});

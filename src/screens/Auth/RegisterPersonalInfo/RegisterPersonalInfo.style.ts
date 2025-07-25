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
  },
  selectPhotoButton: {
    gap: 12,
    alignItems: 'center',
  },
  selectPhotoIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: COLORS.white,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
  },
  noPhotoSelectedContainer: {
    alignItems: 'center',
    gap: 12,
  },
  selectedPhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
     borderColor: COLORS.white,
    borderWidth: 1,
  }
});

import { StyleSheet } from 'react-native';
import COLORS from '@colors';
export default StyleSheet.create({
  outerContainer: {
    flex: 1,
  },

  gradientContainer: {
    flex: 1,
    padding: 16,
  },
  innerContainer: {
    flex: 1,
    gap: 10,
    justifyContent: 'center',
    paddingHorizontal: 8
  },
  continueButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  title: {
    color: COLORS.white,
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium',
    fontSize: 36,
    letterSpacing: 12,
    marginBottom: 8,
  },
  allSetText: {
    textAlign: 'center',
    color: COLORS.white,
    fontSize: 20,
    fontFamily: 'Quicksand-SemiBold',
  },
  codeDescription: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: 'Quicksand-SemiBold',
    textAlign: 'center',
  },
  code: {
    letterSpacing: 18,
    color: COLORS.white,
    fontFamily: 'Quicksand-Bold',
    fontSize: 24,
    textAlign: 'center',
  },
  buttonsContainer: {
    gap: 12,
    marginTop: 12,
  },
  customButtonContainer: {
    borderRadius: 8,
  },
  infoText: {
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium',
    paddingHorizontal: 24,
    fontSize: 16,
    marginTop: 12,
  }
});

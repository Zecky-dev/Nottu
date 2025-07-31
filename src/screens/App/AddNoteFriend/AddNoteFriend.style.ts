import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  container: {
    gap: 18,
  },
  icon: {
    width: 48,
    height: 48,
    alignSelf: 'center',
  },
  howItWorksTitle: {
    textAlign: 'center',
    fontFamily: 'Quicksand-SemiBold',
    fontSize: 20,
  },
  howItWorksDescr: {
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium',
    fontSize: 16,
  },
  matchCodeTitle: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 20,
    textAlign: 'center',
  },
  matchCodeText: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 8,
  },
  matchCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  matchCodeInfoContainer: {
    gap: 8,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  orText: {
    fontFamily: 'Quicksand-Medium',
    color: 'rgba(0,0,0,0.5)',
    fontSize: 18,
  },
  orSeperatorContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  matchWithFriendContainer: {
    gap: 8,
  },
  matchWithFriendText: {},
});

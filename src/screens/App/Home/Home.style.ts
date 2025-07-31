import { StyleSheet } from 'react-native';
import COLORS from '@colors';
export default StyleSheet.create({
  gradientContainer: {
    flexDirection: 'row',
    padding: 12,
    paddingLeft: 18,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: COLORS.white,
    fontSize: 18,
    fontFamily: 'Quicksand-Bold',
    letterSpacing: 4,
  },
  rightContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 25,
    height: 25,
  },
  adBannerContainer: {
    backgroundColor: COLORS.black,
    padding: 12,
  },
  adBannerText: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Quicksand-Medium',
  },
  fastAccessContainer: {
    gap: 8,
  },
  fastAccessTitle: {
    color: COLORS.black,
    fontFamily: 'Quicksand-SemiBold',
    fontSize: 24,
  },
  contentContainer: {
    paddingHorizontal: 12,
    paddingTop: 16,
  },
  fastAccessList: {
    gap: 12,
  },
  addIcon: {
    width: 36,
    height: 36,
  },
  gradientButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fastAccessButton: {
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 36,
  },
  photo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

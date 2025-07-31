import { StyleSheet, Platform } from 'react-native';
import COLORS from '@colors';

export default StyleSheet.create({
  modalContent: {
    flex: 1,
    backgroundColor: '#FEFFFE',
    paddingVertical: 24,
  },
  photo: {
    width: 92,
    height: 92,
    borderRadius: 46,
    borderColor: 'rgba(0,0,0,0.5)',
    borderWidth: 2.5,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderColor: 'rgba(0,0,0,0.5)',
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    borderWidth: 1.5,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  editButton: {
    width: 92,
    height: 92,
    alignSelf: 'center',
  },
  nameSurnameContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  nameSurname: {
    color: COLORS.black,
    fontFamily: 'Quicksand-Bold',
    fontSize: 18,
  },
  notificationGrantInfoText: {
    color: 'rgba(0,0,0,0.5)',
    fontFamily: 'Quicksand-Medium',
    fontSize: 16,
    flexShrink: 1,
  },
  notificationGrantContainer: {
    flexDirection: 'row',
    marginTop: 8,
    flex: 1,
  },
  profileEditSectionsContainer: {
    gap: 24,
    marginTop: 16,
  },
  changeLanguageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderColor: COLORS.black,
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
  },
  activeLanguageContainer: {
    backgroundColor: COLORS.success_green,
  },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderColor: COLORS.black,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCircle: {
    borderColor: COLORS.white,
  },
  languageText: {
    color: COLORS.black,
    fontSize: 16,
    fontFamily: 'Quicksand-Medium',
  },
  activeLanguageText: {
    color: COLORS.white,
  },
  languageButtonsContainer: {
    gap: 8,
    marginTop: 12,
  },
  buttonIcon: {
    width: 24,
    height: 24,
  },
  buttonsContainer: {
    gap: 8,
    marginTop: 12,
  },
  rowWithGap: {
    flexDirection: 'row',
    gap: 12,
  },
  flex1: {
    flex: 1,
  },
  buttonLabelWhite: {
    color: COLORS.white,
    fontFamily: 'Quicksand-Semibold',
  },
  buttonLabelBlack: {
    color: COLORS.black,
    fontFamily: 'Quicksand-Semibold',
  },
  contentGap8: {
    gap: 8,
  },
  borderBlack: {
    borderColor: COLORS.black,
    borderWidth: 1,
  },
  updateModalContainer: {
    margin: 0,
    justifyContent: 'flex-end',
    
  },
  updateModalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 12,
    gap: 12,
  },
  bottomButtonsContainer: {
    gap: 12,
  }
});

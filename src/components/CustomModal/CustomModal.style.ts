import { StyleSheet } from 'react-native';
import COLORS from '@colors';

export default StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end', 
    margin: 0,
  },
  contentContainer: {
    // These styles apply to the content *inside* the modal when it's not full screen
    padding: 16,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    maxHeight: '85%',
  },

  // Styles for the full-screen modal (when isFullScreen is true)
  fullScreenModalContainer: {
    margin: 0, 
    justifyContent: 'flex-start', 
    alignItems: 'stretch',
  },
  fullScreenContentContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },

  closeButtonContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0,0.50)',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end', 
  }
});
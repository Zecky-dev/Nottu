import { StyleSheet } from 'react-native';
import COLORS from '@colors';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {
    color: COLORS.white,
    fontSize: 24,
  }
});

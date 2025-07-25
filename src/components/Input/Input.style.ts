import { StyleSheet } from "react-native";
import COLORS from '@colors'
export default StyleSheet.create({
    outerContainer: {
        gap: 8,
    },
    label: {
        color: COLORS.white,
        fontFamily: 'Quicksand-SemiBold',
        fontSize: 16,
    },
    inputContainer: {
        borderColor: COLORS.white,
        borderWidth: 1,
        borderRadius: 12,
        paddingVertical: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    hideUnhideButton: {
        paddingHorizontal: 12,
    },
    input: {
        paddingHorizontal: 12,
        color: COLORS.white,
        fontFamily: 'Quicksand-Medium',
        fontSize: 16,
        flex: 1,
    },
    errorText: {
        color: COLORS.error_red,
        fontFamily: 'Quicksand-Medium',
        fontSize: 15,
        marginTop: -6,
        
    },
    errorBorder: {
        borderWidth: 1,
        borderColor: COLORS.error_red,
    },
});
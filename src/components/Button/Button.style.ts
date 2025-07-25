import { StyleSheet } from "react-native";
import COLORS from '@colors'
export default StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    disabled: {
        opacity: 0.5,
    },
    contentContainer: {
        gap: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        color: COLORS.black,
        fontSize: 18,
        fontFamily: 'Quicksand-Medium',
        bottom: 2,
    },
});
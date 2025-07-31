import { StyleSheet } from "react-native";
import COLORS from '@colors'
export default StyleSheet.create({
    topContainer: {
        alignItems: 'center',
    },
    premiumIcon: {
        width: 72,
        height: 72,
    },
    premiumItemsContainer: {
        gap: 8,
    },
    premiumItemContainer: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
    },
    premiumItemContent: {
        color: COLORS.black,
        fontFamily: 'Quicksand-SemiBold',
        fontSize: 18,
    },
    checkIcon: {
        width: 32,
        height: 32,
    },
    title: {
        color: COLORS.black,
        fontSize: 24,
        fontFamily: 'Quicksand-Bold',
    },
    container: {
        gap: 16,
    },
    getPremiumIcon: {
        width: 32,
        height: 32,
    },
    getOnceOwnForever: {
        color: 'rgba(0,0,0,0.5)',
        fontFamily: 'Quicksand-SemiBold',
        fontSize: 14,
        textAlign: 'center',
    },
    getPremiumButtonContainer: {
        gap: 6,
        marginTop: 4,
    }
});
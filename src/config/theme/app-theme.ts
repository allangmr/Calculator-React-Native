import { StyleSheet } from "react-native";

export const colors = {
    darkGray: "#2D2D2D",
    lightGray: "#9B9B9B",
    orange: "#FF9427",

    textPrimary: "white",
    textSecondary: "#666666",
    background: "#000000",
};

export const styles = StyleSheet.create({
    background: {
        backgroundColor: colors.background,
        flex: 1,
    },
    calculatorContainer: {
        flex: 1,
        padding: 20,
        justifyContent: "flex-end",
    },
    numbersContainer: {
        paddingHorizontal: 30,
        paddingBottom: 20,
    },
    mainResult: {
        color: colors.textPrimary,
        fontSize: 70,
        textAlign: "right",
        marginBottom: 10,
        fontWeight: "400",
    },
    subResult: {
        color: colors.textSecondary,
        fontSize: 40,
        textAlign: "right",
        fontWeight: "300",
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 18,
        paddingHorizontal: 10,
    },
    button: {
        height: 70,
        width: 70,
        backgroundColor: colors.darkGray,
        borderRadius: 100,
        justifyContent: "center",
        marginHorizontal: 10,
    },
    buttonText: {
        textAlign: "center",
        padding: 10,
        fontSize: 30,
        color: colors.textPrimary,
        fontWeight: "300",
    },
});

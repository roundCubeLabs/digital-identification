import React, { Component } from "react";
import { View, TouchableWithoutFeedback, StyleSheet, Text, Keyboard } from "react-native";
import { Actions } from "react-native-router-flux";
import { Icon, Button } from "native-base";

import appStyles from "../../assets/style";
import ShowReport from "../reports/details/showReport";

export default class PreviewReceipt extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <TouchableWithoutFeedback
                    hideOnBackdropPress={true}
                    style={{ flex: 1 }}
                >
                    <View style={styles.container}>
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <Button
                                onPress={() => {
                                    Keyboard.dismiss();
                                    Actions.drawerOpen();
                                }}
                                transparent={true}
                            >
                                <Icon
                                    type="FontAwesome"
                                    style={styles.btnIconsHeader}
                                    name="navicon"
                                    size={23}
                                />
                            </Button>
                            <Button
                                    onPress={() => {
                                        Actions.reset("dashboard");
                                    }}
                                    transparent={true}
                                >
                                    <Icon
                                        type="Ionicons"
                                        style={styles.btnIconsHeader}
                                        name="ios-arrow-back"
                                        size={23}
                                    />
                                </Button>
                        </View>
                        <View
                            style={{
                                flex: 4,
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    color: appStyles.buttonColor
                                }}
                            >
                                Order Preview
                            </Text>
                        </View>
                        <View style={{ flex: 1 }} />
                    </View>
                </TouchableWithoutFeedback>
                <ShowReport
                    orderType="pendingatsaleorder"
                    order_details={this.props.order_details}
                    transactions={this.props.transactions}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: appStyles.headerColor,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    btnIconsHeader: {
        marginHorizontal: 17,
        color: appStyles.buttonColor
    }
});

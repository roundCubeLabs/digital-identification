import React, { Component } from "react";
import { View, TouchableWithoutFeedback, StyleSheet, BackAndroid } from "react-native";
import { Actions } from "react-native-router-flux";
import { Card, Icon } from "native-base";
import DashboardHeader from "../components/header";
import appStyles from "../assets/style";
import {getAdjustedFontSize} from "../components/common/scaling";

export default class Landing extends Component {
    constructor() {
        super();
        this.state = {
            active: true,
            now: new Date().toDateString()
        };
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: appStyles.appColor }}>
                <TouchableWithoutFeedback
                    hideOnBackdropPress={true}
                    style={{ flex: 1 }}
                >
                    <DashboardHeader
                        iconName="navicon"
                        goto={Actions.drawerOpen}
                    />
                </TouchableWithoutFeedback>
                <View
                    style={{
                        flex: 2,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <View style={styles.row}>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                Actions.order();
                            }}
                        >
                            <Card style={[styles.item, {marginRight : 10}]}>
                                <Icon
                                    type="MaterialCommunityIcons"
                                    style={styles.iconStyle}
                                    active
                                    name="account-settings-variant"
                                />
                            </Card>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                Actions.deposit();
                            }}
                        >
                            <Card style={styles.item}>
                                <Icon
                                    type="SimpleLineIcons"
                                    style={styles.iconStyle}
                                    active
                                    name="wallet"
                                />
                            </Card>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.row}>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                Actions.updatepass();
                            }}
                        >
                            <Card style={[styles.item, {marginRight : 10}]}>
                                <Icon
                                    type="FontAwesome"
                                    style={styles.iconStyle}
                                    active
                                    name="unlock-alt"
                                />
                            </Card>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback
                            onPress={() => {
                                Actions.reports();
                            }}
                        >
                            <Card style={styles.item}>
                                <Icon
                                    type="FontAwesome"
                                    style={styles.iconStyle}
                                    active
                                    name="list-alt"
                                />
                            </Card>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        alignItems: "center",
        borderRadius: 20,
        height: getAdjustedFontSize(80),
        justifyContent: "center",
        backgroundColor : 'rgba(255, 255, 255, 0.7)',
        borderColor : 'rgba(255, 255, 255, 0.7)'
    },
    row: {
        marginBottom: 5,
        flexDirection: "row",
        width: getAdjustedFontSize(300)
    },
    iconStyle : {
        fontSize : getAdjustedFontSize(30)
    }
});

import React, { Component } from "react";
import {
    View,
    TouchableWithoutFeedback,
    StyleSheet
} from "react-native";
import { Actions } from "react-native-router-flux";
import { Card, Icon } from "native-base";
import { connect } from "react-redux";

import DashboardHeader from "../../components/header";
import appStyles from "../../assets/style";
import { getAdjustedFontSize } from "../common/scaling";
import Loader from "../common/loader";

class Reports extends Component {
    render() {
        const dataArray = [
            [
                {
                    screen: "so",
                    style: { backgroundColor: "#c49f47", marginRight: 20 }
                },
                {
                    screen: "pdo",
                    style: { backgroundColor: "#32c5d2" }
                }
            ],
            [
                {
                    screen: "canceled",
                    style: { backgroundColor: "#e7505a", marginRight: 20 }
                },
                {
                    screen: "revoke",
                    style: { backgroundColor: "#3598dc" }
                }
            ]
        ];
        return (
            <View style={{ flex: 1, backgroundColor: appStyles.appColor }}>
                <Loader loading={this.props.isLoading} />
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
                    <View
                        style={{
                            flex: 2,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        {dataArray.map((rowData, rowIndex) => <View style={styles.row} key={" "+rowIndex}>
                                {rowData.map((columnData, colIndex) => <TouchableWithoutFeedback
                                        onPress={() => {
                                            Actions.orderlist({
                                                screen: columnData.screen
                                            });
                                        }}
                                        key={" "+colIndex}
                                    >
                                        <Card
                                            style={[
                                                styles.item,
                                                columnData.style
                                            ]}
                                        />
                                    </TouchableWithoutFeedback>)}
                            </View>)}
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
        height: getAdjustedFontSize(70),
        justifyContent: "center",
        borderColor : "rgba(0,0,0,0)"
    },
    row: {
        margin: 5,
        flexDirection: "row",
        width: getAdjustedFontSize(300)
    },
    text: {
        fontSize: getAdjustedFontSize(15),
        color: "#000"
    }
});

const mapStateToProps = state => ({
    isLoading: state.reportReducer.isLoading,
    report: state.reportReducer.report
});

export default connect(mapStateToProps)(Reports);

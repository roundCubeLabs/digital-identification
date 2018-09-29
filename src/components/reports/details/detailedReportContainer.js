import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import { View, TouchableWithoutFeedback } from "react-native";
import { Button, Icon } from "native-base";
import { connect } from "react-redux";

import DashboardHeader from "../../header";
import ShowReport from "./showReport";
import ReportAction from "../../../store/actions/report";

class DetailedReportContainer extends Component {
    render() {
        const { order_details, transactions, editReport, isEdit } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <TouchableWithoutFeedback
                    hideOnBackdropPress={true}
                    style={{ flex: 1 }}
                >
                    <DashboardHeader
                        iconName="navicon"
                        goto={Actions.drawerOpen}
                    />
                </TouchableWithoutFeedback>
                <ShowReport
                    orderType="pendingatsaleorder"
                    order_details={order_details}
                    transactions={transactions}
                />
                {isEdit && (
                    <Button
                        style={{
                            width: 45,
                            height: 45,
                            borderRadius: 30,
                            backgroundColor: appStyle.buttonColor,
                            position: "absolute",
                            bottom: 25,
                            right: 25
                        }}
                        title="Submit"
                        block
                        primary
                        onPress={()=>{
                            editReport(order_details.ORD_NO)
                        }}
                    >
                        <Icon
                            type="Entypo"
                            name="edit"
                            style={{ fontSize: 15, color: "#fff" }}
                        />
                    </Button>
                )}
            </View>
        );
    }
}

const mapStateToProps = state => ({
    isLoading: state.reportReducer.isLoading
});

const mapDispatchToProps = dispatch => {
    return {
        editReport: state => dispatch(ReportAction.editReport(state))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailedReportContainer);

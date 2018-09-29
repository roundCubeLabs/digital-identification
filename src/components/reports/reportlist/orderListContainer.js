import React, { Component } from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";

import DashboardHeader from "../../../components/header";
import OrderListHeaderSelector from "./orderListHeaderSelector";
import ReportAction from "../../../store/actions/report";

class OrdersListContainer extends Component {
    constructor(props) {
        super(props);
        props.getReportOrderList("/" + props.screen);
    }
    render() {
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
                <OrderListHeaderSelector
                    getReportDetails={this.props.getReportDetails}
                    screen={this.props.screen}
                    reportlist={this.props.reportlist}
                />
            </View>
        );
    }
}

OrdersListContainer.propTypes = {
    screen: PropTypes.string
};

const mapStateToProps = state => ({
    isLoading: state.reportReducer.isLoading,
    reportlist: state.reportReducer.reportlist
});

const mapDispatchToProps = dispatch => {
    return {
        getReportOrderList: state =>
            dispatch(ReportAction.getReportOrderList(state)),
        getReportDetails: state =>
            dispatch(ReportAction.getReportDetails(state))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrdersListContainer);

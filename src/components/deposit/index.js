import React, { Component } from "react";
import { Container } from "native-base";
import Customers from "../order/tabs/customer";
import appStyles from "../../assets/style";
import { View, TouchableWithoutFeedback, Keyboard } from "react-native";
import DashboardHeader from "../../components/header";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import OrderAction from "../../store/actions/order";

class Deposit extends Component {
    constructor(props) {
        super(props);
        
        this.props.getAllCustomer(this.props.username);
        this.props.getFlavourPacks();
    }

    updateSelectedCustomer = selectedCustomer => {
        Actions.depositadd({
            selectedCustomer
        });
    };
    render() {
        return (
            <View style={{ flex: 1 }}>
                <TouchableWithoutFeedback
                    style={{ flex: 1, backgroundColor: appStyles.appColor }}
                    onPress={() => Keyboard.dismiss()}
                >
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
                        <Container
                            style={{ flex: 2, backgroundColor: "white" }}
                        >
                            <Customers
                                updatePageNumber={this.updatePageNumber}
                                updateSelectedCustomer={
                                    this.updateSelectedCustomer
                                }
                                customers={this.props.customers}
                                isLoading={this.props.isLoading}
                            />
                        </Container>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    isLoading: state.orderReducer.isLoading,
    customers: state.orderReducer.customers,
    username: state.authReducer.username
});

const mapDispatchToProps = dispatch => {
    return {
        getAllCustomer: state => dispatch(OrderAction.getAllCustomer(state)),
        getFlavourPacks: () => dispatch(OrderAction.getFlavourPacks())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Deposit);

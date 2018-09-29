import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Alert,
    TouchableWithoutFeedback
} from "react-native";
import { Text, Button, Icon, Container, Card } from "native-base";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

import appStyles from "../../../../assets/style";
import LedgerAdd from "./ledgerAdd";
import { LedgerList } from "./ledgerList";
import OrderAction from "../../../../store/actions/order";
import { getAdjustedFontSize } from "../../../common/scaling";
import DashboardHeader from "../../../../components/header";
import Loader from "../../../common/loader";

class OrderLedger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddLedger: true,
            ledgerDetails: null
        };
    }

    updateShowLedger = () => {
        if (this.state.showAddLedger) {
            this.setState({
                showAddLedger: false
            });
        } else {
            this.setState({
                showAddLedger: true,
                ledgerDetails: null
            });
        }
    };

    submitOrder = () => {
        if (this.props.placedOrder.length)
            this.props.addOrder({
                entity_no: this.props.selectedCustomer.ENTITY_NO
            });
        else Alert.alert("Order List Empty", "Please add order first.");
    };

    editLedger = (item, index) => {
        item.index = index;
        this.setState({
            showAddLedger: false,
            ledgerDetails: item
        });
    };

    removeProductFromList = (item, index) => {
        Alert.alert(
            "DELETE",
            "Are you sure you want to romove Flavour " + item.flavour,
            [
                {
                    text: "OK",
                    onPress: () => {
                        this.props.removeProduct({ index });
                    }
                }
            ]
        );
    };

    render() {
        const { selectedCustomer, freight, placedOrder } = this.props;
        const { showAddLedger } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <TouchableWithoutFeedback
                    style={{ flex: 1, backgroundColor: appStyles.appColor }}
                >
                    {showAddLedger ? (
                        <View style={{ flex: 1 }}>
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
                            <Container
                                style={{ flex: 2, backgroundColor: "white" }}
                            >
                                <View style={{ flex: 2, margin: 23 }}>
                                    <Card style={styles.header}>
                                        <Text
                                            style={{
                                                fontSize: getAdjustedFontSize(
                                                    15
                                                ),
                                                color: appStyles.buttonColor
                                            }}
                                        >
                                            {selectedCustomer.ENTITY_NAME
                                                ? selectedCustomer.ENTITY_NAME +
                                                  " " +
                                                  selectedCustomer.AREA
                                                : ""}
                                        </Text>
                                    </Card>
                                    <View style={{ flex: 8 }}>
                                        {placedOrder.length ? (
                                            <LedgerList
                                                ledgers={placedOrder}
                                                freight={freight}
                                                editLedger={this.editLedger}
                                                removeProductFromList={
                                                    this.removeProductFromList
                                                }
                                            />
                                        ) : (
                                            <View style={styles.text}>
                                                <TouchableWithoutFeedback
                                                    onPress={
                                                        this.updateShowLedger
                                                    }
                                                >
                                                    <Text
                                                        style={{
                                                            textAlign: "center",
                                                            color:
                                                                appStyles.appColor,
                                                            fontSize: getAdjustedFontSize(
                                                                15
                                                            )
                                                        }}
                                                    >
                                                        Add Products
                                                    </Text>
                                                </TouchableWithoutFeedback>
                                            </View>
                                        )}

                                        <Text> {"\n"}</Text>
                                    </View>
                                    <Button
                                        title="Submit"
                                        block
                                        style={styles.confirmButton}
                                        onPress={this.submitOrder}
                                    >
                                        <Icon
                                            type="Entypo"
                                            name="check"
                                            style={{ fontSize: 15 }}
                                        />
                                    </Button>
                                    <Text>{"\n"}</Text>
                                    <Button
                                        title="Submit"
                                        block
                                        style={styles.AddButton}
                                        onPress={this.updateShowLedger}
                                    >
                                        <Icon
                                            type="Entypo"
                                            name="plus"
                                            style={{ fontSize: 15 }}
                                        />
                                    </Button>
                                </View>
                            </Container>
                        </View>
                    ) : (
                        <LedgerAdd
                            selectedCustomer={selectedCustomer}
                            updateShowLedger={this.updateShowLedger}
                            {...this.props}
                            ledgerDetails={this.state.ledgerDetails}
                        />
                    )}
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "transparent",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20
    },
    text: {
        justifyContent: "center",
        backgroundColor: "white"
    },
    AddButton: {
        width: 45,
        height: 45,
        borderRadius: 30,
        backgroundColor: appStyle.buttonColor,
        position: "absolute",
        bottom: 10,
        right: 10
    },
    confirmButton: {
        backgroundColor: "rgba(124, 24, 159, 1)",
        width: 45,
        height: 45,
        borderRadius: 30,
        backgroundColor: appStyle.buttonColor,
        position: "absolute",
        bottom: 10,
        left: 10
    }
});

const mapStateToProps = state => ({
    packs: state.orderReducer.packs,
    flavours: state.orderReducer.flavours,
    scheme: state.orderReducer.scheme,
    placedOrder: state.orderReducer.placedOrder,
    freight: state.orderReducer.freight,
    isLoading: state.orderReducer.isLoading
});

const mapDispatchToProps = dispatch => {
    return {
        getDiscountScheme: state =>
            dispatch(OrderAction.getDiscountScheme(state)),
        freightCalculation: state =>
            dispatch(OrderAction.freightCalculation(state)),
        addOrder: state => 
            dispatch(OrderAction.addOrder(state)),
        removeProduct: state => 
            dispatch(OrderAction.removeProduct(state))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderLedger);

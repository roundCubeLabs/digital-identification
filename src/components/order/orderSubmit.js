import React, { Component } from "react";
import {
    Content,
    Header,
    Text,
    Card,
    Picker,
    Button,
    Icon
} from "native-base";
import appStyles from "../../assets/style";
import { View } from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import OrderAction from "../../store/actions/order";
import { LedgerList } from "./orderCommon/list";
import { getAdjustedFontSize } from "../common/scaling";

class OrderSubmit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shipment_type: {
                ID : "default:"
            }
        };
    }

    submitOrder = () => {
        if(this.state.shipment_type.ID === "default:"){
            this.state.shipment_type =  this.props.ledgerDetails.ttypes[0];
        }
        this.props.placeConfirmOrder({
            order_no: this.props.ledgerDetails.orderinfo.ORD_SR,
            shipment_type: this.state.shipment_type.ID
        });
    };

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: "white",
                    paddingLeft: 20,
                    paddingRight: 20
                }}
            >
                <View>
                    <Button
                        onPress={() => {
                            Actions.pop();
                        }}
                        transparent={true}
                    >
                        <Icon
                            type="Ionicons"
                            style={{
                                marginHorizontal: 17,
                                color: appStyles.buttonColor
                            }}
                            name="ios-arrow-back"
                            size={23}
                        />
                    </Button>
                </View>
                <Header
                    style={{
                        flexDirection: "column",
                        backgroundColor: "transparent",
                        height: 60,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Text
                        style={{
                            fontSize: getAdjustedFontSize(12),
                            color: appStyles.buttonColor
                        }}
                    >
                        {this.props.ledgerDetails.orderinfo.ORD_DATE}
                    </Text>
                    <Text
                        style={{
                            fontSize: getAdjustedFontSize(12),
                            color: appStyles.buttonColor
                        }}
                    >
                        {this.props.ledgerDetails.orderinfo.ENTITY_NAME +
                            " " +
                            this.props.ledgerDetails.orderinfo.TOWN}
                    </Text>
                    <Text
                        style={{
                            fontSize: getAdjustedFontSize(12),
                            color: appStyles.buttonColor
                        }}
                    >
                        ORD NO # {this.props.ledgerDetails.orderinfo.ORD_SR}
                    </Text>
                </Header>
                <Content>
                    <Card>
                        <Picker
                            iosHeader="Select one"
                            mode="dropdown"
                            headerStyle={{
                                backgroundColor: "red"
                            }}
                            selectedValue={this.state.shipment_type}
                            onValueChange={shipment_type => {
                                this.setState({
                                    shipment_type
                                });
                            }}
                        >
                            {this.props.ledgerDetails.ttypes.map(item => {
                                return (
                                    <Picker.Item
                                        key={item.ID}
                                        label={item.NAME}
                                        value={item.ID}
                                    />
                                );
                            })}
                        </Picker>
                    </Card>
                    <Card>
                        <View style={{ flex: 8 }}>
                            <LedgerList
                                ledgers={this.props.ledgerDetails.transactions}
                            />
                        </View>
                    </Card>
                </Content>
                <Button
                    title="Submit"
                    noShadow={false}
                    block
                    style={{
                        width: 45,
                        height: 45,
                        borderRadius: 30,
                        backgroundColor: appStyle.buttonColor,
                        position: "absolute",
                        bottom: 15,
                        right: 10
                    }}
                    onPress={this.submitOrder}
                >
                    <Icon
                        type="Entypo"
                        name="check"
                        style={{ fontSize: 15, color : 'white' }}
                    />
                </Button>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    isLoading: state.orderReducer.isLoading,
    ledgerDetails: state.orderReducer.ledgerDetails
});

const mapDispatchToProps = dispatch => {
    return {
        placeConfirmOrder: state =>
            dispatch(OrderAction.placeConfirmOrder(state))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderSubmit);

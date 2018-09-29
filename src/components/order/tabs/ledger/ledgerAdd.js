import React, { Component } from "react";
import {
    View,
    TouchableWithoutFeedback,
    StyleSheet,
    Keyboard,
    Alert
} from "react-native";
import { Text, Button, Row, Col, Icon } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { CustomInput } from "../../../common";
import appStyles from "../../../../assets/style";
import { CustomPicker } from "./picker";
import { getAdjustedFontSize } from "../../../common/scaling";
import Loader from "../../../common/loader";

export default class LedgerAdd extends Component {
    constructor(props) {
        super(props);

        if (props.ledgerDetails && props.ledgerDetails.classCode) {
            const { ledgerDetails } = props;
            let flavours = Object.entries(
                props.flavours[ledgerDetails.classCode].ITEM
            );
            this.state = {
                flavours,
                pack: ledgerDetails.classCode + "," + ledgerDetails.pack,
                flavour:
                    ledgerDetails.itemCode +
                    "," +
                    ledgerDetails.flavour +
                    "," +
                    ledgerDetails.schemeQuantity,
                quantity: ledgerDetails.quantity,
                schemeItem: ledgerDetails.schemeItem,
                submitStatus: true
            };
            this.getSchemeDsicount();
        } else {
            let flavours = Object.entries(
                props.flavours[props.packs[0].CLS_ID].ITEM
            );
            this.state = {
                flavours,
                pack: props.packs[0].CLS_ID + "," + props.packs[0].CLS_DESC,
                flavour:
                    flavours[0][1].ITEM_CODE +
                    "," +
                    flavours[0][1].ITEM_ABBR +
                    "," +
                    flavours[0][1].QTY,
                quantity: "",
                schemeItem: "",
                submitStatus: true
            };
        }
    }
    updateSubmitStatus = () => {
        this.setState({
            submitStatus: false
        });
    };
    save = () => {
        const schemeItem = this.state.schemeItem !== ""
        ? this.state.schemeItem
        : this.props.scheme.items[0][1].ITEM_CODE +
          "," +
          this.props.scheme.items[0][1].ITEM_NAME;


        if (
            this.state.quantity &&
            this.state.quantity > 0 &&
            schemeItem !== "" && 
            schemeItem !== ","
        ) {
            const placedOrder = {
                pack: this.state.pack.split(",")[1],
                classCode: this.state.pack.split(",")[0],
                flavour: this.state.flavour.split(",")[1],
                itemCode: this.state.flavour.split(",")[0],
                schemeQuantity: this.state.flavour.split(",")[2],
                quantity: this.state.quantity,
                schemeItem,
                schemeTotal: this.props.scheme.schemeTotal,
                productAmount: this.props.scheme.productAmount,
                index:
                    this.props.ledgerDetails &&
                    this.props.ledgerDetails.index >= 0
                        ? this.props.ledgerDetails.index
                        : -1
            };

            this.props.freightCalculation({
                placedOrder,
                selectedCustomer: this.props.selectedCustomer
            });
            this.props.updateShowLedger();
        } else if (this.state.quantity &&
            this.state.quantity > 0){
                keyboard.dismiss();
        }
        else {
            Alert.alert("Error", "Enter Quantity for product");
        }
    };

    onValueChange = (name, value) => {
        if (name === "pack") {
            this.setState({
                [name]: value,
                flavours: Object.entries(
                    this.props.flavours[value.split(",")[0]].ITEM
                ),
                quantity: ""
            });
        } else if(name === "flavour") {
            this.setState({
                [name]: value,
                quantity : ""
            });
        } else {
            this.setState({
                [name]: value
            });
        }
    };

    getSchemeDsicount = () => {
        this.setState({
            submitStatus: true
        });
        if (this.state.quantity != "" && this.state.quantity != 0) {
            
            this.props.getDiscountScheme({
                DIST_ID: this.props.selectedCustomer.ENTITY_NO,
                CLS_ID: this.state.pack.split(",")[0],
                ITEM_CODE: this.state.flavour.split(",")[0],
                QTY: this.state.quantity
            });
            
        }
    };

    render() {
        return (
            <View style={{ flex: 2, backgroundColor: "white" }}>
                <TouchableWithoutFeedback
                    hideOnBackdropPress={true}
                    style={{ flex: 1 }}
                >
                    <View style={styles.container}>
                        <Loader loading={this.props.isLoading} />
                        <View style={{ flex: 1 }}>
                            <Button
                                onPress={() => {
                                    this.props.updateShowLedger();
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
                                    fontSize: getAdjustedFontSize(20),
                                    color: appStyles.buttonColor
                                }}
                            >
                                Add Product
                            </Text>
                        </View>
                        <View style={{ flex: 1 }} />
                    </View>
                </TouchableWithoutFeedback>
                <View
                    style={{
                        flex: 8,
                        justifyContent: "center"
                    }}
                >
                    <TouchableWithoutFeedback
                        onPress={() => Keyboard.dismiss()}
                        style={{ flex: 1 }}
                    >
                        <View style={{ flex: 1 }}>
                            <KeyboardAwareScrollView
                                style={{ margin: 23, flex: 1 }}
                            >
                                <View>
                                    <Text style={styles.text}>Flavour</Text>
                                    <CustomPicker
                                        packFlavour={this.props.packs}
                                        selected={this.state.pack}
                                        name="pack"
                                        onValueChange={this.onValueChange}
                                    />
                                </View>
                                <View>
                                    <Text style={styles.text}>Pack</Text>
                                    <CustomPicker
                                        packFlavour={this.state.flavours}
                                        selected={this.state.flavour}
                                        name="flavour"
                                        onValueChange={this.onValueChange}
                                    />
                                </View>

                                <CustomInput
                                    type="numeric"
                                    label="Quantity: "
                                    fontSize={getAdjustedFontSize(15)}
                                    textColor={appStyles.buttonColor}
                                    value={this.state.quantity}
                                    changeHandler={quantity => {
                                        this.setState({ quantity });
                                    }}
                                    onFocusAction={this.updateSubmitStatus}
                                    onSubmitAction={this.getSchemeDsicount}
                                    onBlurAction={this.getSchemeDsicount}
                                />
                                {this.props.scheme.showScheme &&
                                this.state.quantity ? (
                                    <View>
                                        <View>
                                            <Text style={styles.text}>
                                                Scheme
                                            </Text>
                                            <CustomPicker
                                                packFlavour={
                                                    this.props.scheme.items
                                                }
                                                selected={this.state.schemeItem}
                                                name="schemeItem"
                                                onValueChange={
                                                    this.onValueChange
                                                }
                                            />
                                        </View>
                                        <View>
                                            <Text style={styles.text}>
                                                Scheme Total:{" "}
                                            </Text>
                                            <Text style={styles.text}>
                                                {this.props.scheme.schemeTotal}
                                            </Text>
                                        </View>
                                    </View>
                                ) : (
                                    <View />
                                )}

                                <Row style={{ marginTop: 20 }}>
                                    <Col>
                                        <Text style={styles.text}>
                                            Total Qty:{" "}
                                        </Text>
                                        <Text style={styles.text}>
                                            {+this.state.quantity +
                                                +this.props.scheme.schemeTotal}
                                        </Text>
                                    </Col>
                                    <Col>
                                        <Text style={styles.text}>
                                            Price :{" "}
                                        </Text>
                                        <Text style={styles.text}>
                                            {this.props.scheme.productAmount}
                                        </Text>
                                    </Col>
                                    <Col>
                                        <Text style={styles.text}>
                                            Total Amount :{" "}
                                        </Text>
                                        <Text style={styles.text}>
                                            {this.props.scheme.productAmount *
                                                this.state.quantity}
                                        </Text>
                                    </Col>
                                </Row>
                                <Text> {"\n"}</Text>
                            </KeyboardAwareScrollView>
                            {this.state.submitStatus && <Button
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
                                onPress={this.save}
                            >
                                <Icon
                                    type="Entypo"
                                    name="check"
                                    style={{ fontSize: 15, color: "#fff" }}
                                />
                            </Button>}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
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
    },
    item: {
        alignItems: "center",
        borderRadius: 100,
        height: 160,
        width: 100,
        justifyContent: "center"
    },
    row: {
        margin: 20,
        flexDirection: "row"
    },
    text: {
        fontSize: getAdjustedFontSize(15),
        color: appStyles.buttonColor
    }
});

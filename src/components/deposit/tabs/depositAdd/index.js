import React, { Component } from "react";
import {
    View,
    TouchableWithoutFeedback,
    StyleSheet,
    Keyboard,
    Dimensions,
    Alert,
    Image
} from "react-native";
import { Text, Button, Icon } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

import { CustomInput } from "../../../common";
import appStyles from "../../../../assets/style";
import DashboardHeader from "../../../../components/header";
import { CustomPicker } from "./picker";
import { getAdjustedFontSize } from "../../../common/scaling";
import { DepositAction } from "../../../../store/actions";
import Loader from "../../../common/loader";

import cameraFunction from "./camera";

const { Width } = Dimensions;

class DepositAdd extends Component {

    constructor(props){
        super(props);
        const collectionCenterArray = {
            Bank : props.bcenter,
            Cash : props.ccenter
        }
        this.state = {
            formView: true,
            keybaordShow: true,
            buttonText: "ADD",
            amount: "",
            receipt: "",
            imageData: {
                uri: ""
            },
            collectionCenterArray,
            paymentType: props.ctypes[0],
            accountType: props.codes[0],
            bank: props.banks[0],
            collectionCenter : collectionCenterArray[props.ctypes[0].ENTITY_NAME][0]
        };
        
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            this._keyboardDidShow
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            "keyboardDidHide",
            this._keyboardDidHide
        );
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow = () => {
        this.setState({
            keybaordShow: false
        });
    };

    _keyboardDidHide = () => {
        this.setState({
            keybaordShow: true
        });
    };

    save = () => {
        const {
            amount,
            receipt,
            imageData,
            paymentType,
            collectionCenter,
            accountType,
            bank
        } = this.state;

        if (amount !== "" && receipt !== "" && imageData.uri !== "") {
            this.props.submitDepositForm({
                ENTITY_NO: this.props.selectedCustomer.ENTITY_NO,
                imageData,
                amount,
                receipt,
                paymentType : paymentType.ENTITY_NO,
                collectionCenter : collectionCenter.ENTITY_NO,
                accountType : accountType.ENTITY_NO,
                bank : bank.ENTITY_NO
            });
        } else {
            Alert.alert("Error", "Please fill complete form");
        }
    };

    onValueChange = (name, value) => {
        this.setState({
            [name]: value
        });
    };

    showCapturedImage = imageData => {
        this.setState({
            formView: true,
            buttonText: "EDIT",
            imageData
        });
    };

    render() {
        const { selectedCustomer, isLoading } = this.props;
        const {
            formView,
            keybaordShow,
            collectionCenter,
            paymentType
        } = this.state;

        return formView ? (
            <TouchableWithoutFeedback
                onPress={() => Keyboard.dismiss()}
                style={{
                    flex: 1,
                    justifyContent: "center"
                }}
            >
                <View style={{ flex: 1, backgroundColor: "white" }}>
                    <Loader loading={isLoading} />
                    <TouchableWithoutFeedback
                        hideOnBackdropPress={true}
                        style={{ flex: 1 }}
                    >
                        <DashboardHeader
                            iconName="navicon"
                            goto={Actions.drawerOpen}
                        />
                    </TouchableWithoutFeedback>
                    <KeyboardAwareScrollView style={{ margin: 23, flex: 1 }}>
                        <View
                            style={{
                                marginBottom: 20
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: getAdjustedFontSize(18),
                                    color: "black",
                                    width: Width - 20,
                                    backgroundColor: appStyles.headerColor,
                                    textAlign: "center"
                                }}
                            >
                                {selectedCustomer.ENTITY_NAME
                                    ? selectedCustomer.ENTITY_NAME +
                                      " " +
                                      selectedCustomer.AREA
                                    : ""}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.text}>Type</Text>
                            <CustomPicker
                                list={this.props.ctypes}
                                selected={paymentType}
                                name="paymentType"
                                onValueChange={this.onValueChange}
                            />
                        </View>
                        <View>
                            <Text style={styles.text}>Collection Center</Text>
                            <CustomPicker
                                list={this.state.collectionCenterArray[this.state.paymentType.ENTITY_NAME]}
                                selected={collectionCenter}
                                name="collectionCenter"
                                onValueChange={this.onValueChange}
                            />
                        </View>

                        {collectionCenter.ENTITY_NAME === "LHR" && (
                            <View>
                                <Text style={styles.text}>Bank</Text>
                                <CustomPicker
                                    list={this.props.banks}
                                    selected={this.state.bank}
                                    name="bank"
                                    onValueChange={this.onValueChange}
                                />
                            </View>
                        )}

                        <CustomInput
                            type="numeric"
                            label="Amount: "
                            textColor={appStyles.buttonColor}
                            name=""
                            placeholder="Enter Amount"
                            value={this.state.amount}
                            changeHandler={amount => {
                                this.setState({ amount });
                            }}
                        />
                        <CustomInput
                            type="numeric"
                            label="Receipt No: "
                            textColor={appStyles.buttonColor}
                            value={this.state.receipt}
                            placeholder="Enter Receipt No"
                            changeHandler={receipt => {
                                this.setState({ receipt });
                            }}
                        />
                        <View>
                            <Text style={styles.text}>Account</Text>
                            <CustomPicker
                                list={this.props.codes}
                                selected={this.state.accountType}
                                name="accountType"
                                onValueChange={this.onValueChange}
                            />
                        </View>
                        {this.state.buttonText === "EDIT" && (
                            <Image
                                style={{
                                    width: 100,
                                    height: 100,
                                    justifyContent: "center"
                                }}
                                source={{ uri: this.state.imageData.uri }}
                            />
                        )}
                        <Button
                            style={styles.buttonContainer}
                            onPress={() => {
                                cameraFunction(this.showCapturedImage);
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: "center",
                                    color: "white",
                                    fontSize: getAdjustedFontSize(15)
                                }}
                            >
                                {this.state.buttonText} RECEIPT IMAGE
                            </Text>
                        </Button>
                    </KeyboardAwareScrollView>
                    {keybaordShow && (
                        <Button
                            style={styles.buttonStyle}
                            title="Submit"
                            block
                            primary
                            onPress={this.save}
                        >
                            <Icon
                                type="Entypo"
                                name="check"
                                style={{
                                    fontSize: getAdjustedFontSize(15),
                                    color: "#fff"
                                }}
                            />
                        </Button>
                    )}
                </View>
            </TouchableWithoutFeedback>
        ) : (
            <Camera showCapturedImage={this.showCapturedImage} />
        );
    }
}

const styles = StyleSheet.create({
    headerText: {
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
        fontSize: getAdjustedFontSize(12),
        color: appStyles.buttonColor
    },
    buttonContainer: {
        backgroundColor: appStyles.appColor,
        height: getAdjustedFontSize(40),
        justifyContent: "center",
        alignContent: "center",
        marginTop: getAdjustedFontSize(15)
    },
    buttonStyle: {
        width: 45,
        height: 45,
        borderRadius: 30,
        backgroundColor: appStyle.buttonColor,
        position: "absolute",
        bottom: 25,
        right: 25
    }
});

const mapStateToProps = state => ({
    isLoading: state.depositReducer.isLoading,
    ccenter: state.orderReducer.deposit.ccenter,
    bcenter: state.orderReducer.deposit.bcenter,
    ctypes: state.orderReducer.deposit.ctypes,
    codes: state.orderReducer.deposit.codes,
    banks: state.orderReducer.deposit.banks
});

const mapDispatchToProps = dispatch => {
    return {
        submitDepositForm: state =>
            dispatch(DepositAction.submitDepositForm(state))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DepositAdd);

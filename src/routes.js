// app/index.js

import React, { Component } from "react";
import { Router, Scene, Actions, ActionConst } from "react-native-router-flux";
import "./config/fbConfig.js";

import { Provider } from "react-redux";
import { store } from "./store/store";

import { Login, Landing, SideBar } from "./containers";

import {
    UpdatePass,
    Order,
    OrderLedger,
    PreviewReceipt,
    OrderSubmit,
    Deposit,
    DepositAdd,
    Reports,
    OrdersListContainer,
    DetailedReportContainer
} from "./components";

export default class Routes extends Component {
    onBackPress = () => {
        Actions.currentParams.title === "OrderReceipt" ?
            Actions.reset("dashboard") :
            Actions.pop();
        return true;
    };

    render() {
        return (
            <Provider store={store}>
                <Router backAndroidHandler={this.onBackPress}>
                    <Scene key="root">
                        <Scene
                            key="login"
                            component={Login}
                            hideNavBar={true}
                            type={ActionConst.RESET}
                            initial
                        />

                        <Scene
                            key="dashboard"
                            drawer
                            contentComponent={SideBar}
                            type={ActionConst.RESET}
                            drawerPosition="left"
                            tapToClose={true}
                            hideNavBar={true}
                        >
                            <Scene key="main">
                                <Scene
                                    type={ActionConst.REPLACE}
                                    key="landing"
                                    title="Home"
                                    component={Landing}
                                    hideNavBar={true}
                                    initial
                                />
                                <Scene
                                    key="updatepass"
                                    title="Update Password"
                                    component={UpdatePass}
                                    hideNavBar={true}
                                />

                                <Scene
                                    key="order"
                                    title="Order"
                                    component={Order}
                                    hideNavBar={true}
                                />

                                <Scene
                                    key="productlist"
                                    title="Products"
                                    component={OrderLedger}
                                    hideNavBar={true}
                                />

                                <Scene
                                    key="orderSubmit"
                                    title="Confirm Order"
                                    component={OrderSubmit}
                                    hideNavBar={true}
                                />

                                <Scene
                                    key="previewreceipt"
                                    title="OrderReceipt"
                                    component={PreviewReceipt}
                                    hideNavBar={true}
                                />

                                <Scene
                                    key="deposit"
                                    title="Deposit"
                                    component={Deposit}
                                    hideNavBar={true}
                                />

                                <Scene
                                    key="depositadd"
                                    title="Deposit"
                                    component={DepositAdd}
                                    hideNavBar={true}
                                />

                                <Scene
                                    key="reports"
                                    title="Report"
                                    component={Reports}
                                    hideNavBar={true}
                                />
                                <Scene
                                    key="orderlist"
                                    title="Report"
                                    component={OrdersListContainer}
                                    hideNavBar={true}
                                />
                                <Scene
                                    key="detailedReport"
                                    title="Details"
                                    component={DetailedReportContainer}
                                    hideNavBar={true}
                                />
                            </Scene>
                        </Scene>
                    </Scene>
                </Router>
            </Provider>
        );
    }
}

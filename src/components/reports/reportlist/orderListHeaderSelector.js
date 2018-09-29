import React from "react";

import OrderListView from "./orderListView";

export default (OrderListHeaderSelector = props => {
    const { screen, reportlist } = props;
    const orders = reportlist.orders;
    showDetailedReport = ({ord_no, isEdit}) => {
        props.getReportDetails({ord_no, isEdit});
    };

    let tableHead;
    switch (screen) {
        case "so":
        case "pdo":
            tableHead = ["SR#", "ORDER NO", "ORDER STATUS", "QTY"];
            return <OrderListView tableHead={tableHead} orders={orders} />;

        case "canceled":
            tableHead = ["ORD#", "ORDER NO", "REMARKS", "QTY"];
            return <OrderListView tableHead={tableHead} orders={orders} isEdit={true} />;
        case "revoke":
            tableHead = ["ORD#", "ORDER NO", "ORDER STATUS", "QTY"];
            return <OrderListView tableHead={tableHead} orders={orders} />;
        default:
            null;
    }
});

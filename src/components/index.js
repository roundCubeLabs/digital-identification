// MAIN ROUTE
import UpdatePass from "./updatePassword";

// ORDER COMPONENT
import Order from "./order";
import OrderLedger from "./order/tabs/ledger";
import PreviewReceipt from "./order/previewLedger";
import OrderSubmit from "./order/orderSubmit";

// DEPOSIT COMPONENT
import Deposit from "./deposit";
import DepositAdd from "./deposit/tabs/depositAdd";

// REPORT COMPONENT
import Reports from "./reports";
import OrdersListContainer from "./reports/reportlist/orderListContainer";
import DetailedReportContainer from "./reports/details/detailedReportContainer";

export {
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
};

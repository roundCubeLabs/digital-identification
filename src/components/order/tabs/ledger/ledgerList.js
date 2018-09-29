import React from "react";
import {
    StyleSheet,
    FlatList,
    View,
    TouchableWithoutFeedback
} from "react-native";
import { Icon } from "native-base";

import appstyles from "../../../../assets/style";
import { Table, Row } from "react-native-table-component";
import { getAdjustedFontSize } from "../../../common/scaling";

export function LedgerList(props) {
    const tableHead = [
        "SR",
        "FLV",
        "PCK",
        "QTY",
        "SCH",
        "C QTY",
        "PRICE",
        "VAL",
        "DEL"
    ];
    const tableFooter = [
        "Freight " + props.freight.entity_freight,
        "Fare " + props.freight.freight_percentage,
        "Load " + props.freight.load
    ];

    const tableRow = ["Tot", "", "", 0, 0, 0, "", 0, ""];
    const flexArray = [1, 1.5, 2, 1.5, 1.5, 1.5, 1.5, 2, 1.5];
    editButton = (item, index) => {
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    props.removeProductFromList(item, index);
                }}
            >
                <Icon type="Ionicons" name="md-trash" size={4} style={{fontSize : getAdjustedFontSize(20), textAlign : "center"}} />
            </TouchableWithoutFeedback>
        );
    };
    return (
        <View style={{ flex: 1 }}>
            <Table>
                <Row
                    flexArr={flexArray}
                    data={tableHead}
                    style={styles.head}
                    textStyle={styles.headerText}
                />
                <FlatList
                    data={props.ledgers}
                    keyExtractor={(item, index) => (item.key = index + " ")}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={15}
                    renderItem={({ item, index }) => {

                        const quantity = parseFloat(item.quantity);
                        const schemeTotal = parseFloat(item.schemeTotal);
                        const productAmount = parseFloat(item.productAmount);
                        const schemeQuantity = parseFloat(item.schemeQuantity);
                        tableRow[3] += quantity; 
                        tableRow[4] += schemeTotal;
                        tableRow[5] += Math.round( schemeQuantity * (quantity + schemeTotal) * 10 ) / 10;
                        tableRow[7] += productAmount * (quantity);
                        return (
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    props.editLedger(item, index);
                                }}
                            >
                                <Row
                                    data={[
                                        index + 1,
                                        item.pack,
                                        item.flavour,
                                        item.quantity,
                                        item.schemeTotal,
                                        Math.round( schemeQuantity * (quantity + schemeTotal) * 10 ) / 10,
                                        item.productAmount,
                                        (productAmount * (quantity)),
                                        editButton(item, index)
                                    ]}
                                    flexArr={flexArray}
                                    style={styles.row}
                                    textStyle={styles.text}
                                />
                            </TouchableWithoutFeedback>
                        );
                    }}
                    shuouldItemUpdate={() => {
                        return false;
                    }}
                />
                <Row
                    flexArr={flexArray}
                    data={tableRow}
                    style={styles.row}
                    textStyle={styles.text}
                />
                <Row
                    data={tableFooter}
                    style={styles.row}
                    textStyle={styles.text}
                />
            </Table>
        </View>
    );
}

const styles = StyleSheet.create({
    head: { height: 30, backgroundColor: appstyles.buttonColor },
    headerText: {
        fontSize: getAdjustedFontSize(9),
        color: "white",
        textAlign : "center"
    },
    text: {
        textAlign : "center",
        fontSize: getAdjustedFontSize(10),
        color: "black"
    },
    row: { height: 30 }
});

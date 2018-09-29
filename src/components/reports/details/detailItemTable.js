import React from "react";
import { StyleSheet, FlatList } from "react-native";
import padEnd from "lodash/padEnd";
import { TableWrapper, Table, Row, Rows } from "react-native-table-component";

import { getAdjustedFontSize } from "../../common/scaling";
import appStyles from "../../../assets/style";
import { View } from "native-base";

export default function DetailItemTable(props) {
    let tableHead = ["ITEMS", "WEIGHT", "QTY", "PRICE", "AMT"];
    return (
        <View style={{ flex: 1 }}>
            <Table style={styles.table}>
                <Row
                    flexArr={[2, 1.6, 1.5, 1.5, 2]}
                    data={tableHead}
                    style={styles.head}
                    textStyle={[
                        styles.text,
                        { color: "white", textAlign: "center" }
                    ]}
                />
                <FlatList
                    data={props.transactions}
                    keyExtractor={(item, index) => (item.key = index + " ")}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={15}
                    renderItem={({ item }) => {
                        return (
                            <TableWrapper>
                                <Rows
                                    flexArr={[2, 1.6, 1.5, 1.5, 2]}
                                    data={[
                                        [
                                            padEnd(item.ITEM, 12, " "),
                                            item.WEIGHT,
                                            item.QTY,
                                            item.PRICE,
                                            item.AMOUNT
                                        ]
                                    ]}
                                    textStyle={[
                                        styles.text,
                                        { color: "black", textAlign: "right" }
                                    ]}
                                />
                            </TableWrapper>
                        );
                    }}
                    shuouldItemUpdate={() => {
                        return false;
                    }}
                />
            </Table>
        </View>
    );
}

const styles = StyleSheet.create({
    head: { backgroundColor: appStyles.buttonColor },
    text: {
        alignContent: "center",
        color: "black",
        fontSize: getAdjustedFontSize(12)
    },
    row: {},
    table: {
        marginVertical: 10,
        backgroundColor: "white"
    }
});

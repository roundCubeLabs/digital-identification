import React from "react";
import { TouchableOpacity, StyleSheet, FlatList, View } from "react-native";
import { Container } from "native-base";
import padStart from "lodash/padStart";
import { Table, Row, Rows } from "react-native-table-component";

import { getAdjustedFontSize } from "../../common/scaling";
import appStyles from "../../../assets/style";

export default function OrderListView(props) {
    return (
        <Container style={{ flex: 1, marginTop: getAdjustedFontSize(20) }}>
            <View style={styles.mainContent}>
                <Table style={styles.table}>
                    <Row
                        flexArr={[1, 1.5, 2, 1.5]}
                        data={props.tableHead}
                        style={styles.head}
                        textStyle={[
                            styles.text,
                            { color: "white", textAlign: "center" }
                        ]}
                    />
                    <FlatList
                        data={props.orders}
                        keyExtractor={(item, index) => (item.key = index + " ")}
                        removeClippedSubviews={true}
                        maxToRenderPerBatch={15}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() =>
                                        this.showDetailedReport({ord_no :item.ord_no, isEdit : props.isEdit })
                                    }
                                >
                                    <Rows
                                        flexArr={[1, 1.5, 2, 1.5]}
                                        data={[
                                            [
                                                index + 1,
                                                item.ord_no,
                                                item.ord_date,
                                                padStart(item.total, 10, " ")
                                            ]
                                        ]}
                                        style={styles.row}
                                        textStyle={[
                                            styles.text,
                                            {
                                                color: "black",
                                                marginLeft: getAdjustedFontSize(
                                                    5
                                                )
                                            }
                                        ]}
                                    />
                                </TouchableOpacity>
                            );
                        }}
                        shuouldItemUpdate={() => {
                            return false;
                        }}
                    />
                </Table>
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    head: {
        height: getAdjustedFontSize(30),
        backgroundColor: appStyles.buttonColor
    },
    text: {
        alignContent: "center",
        color: "black",
        fontSize: getAdjustedFontSize(12)
    },
    row: { height: getAdjustedFontSize(30) },
    mainContent: {
        flex: 1,
        marginHorizontal: 20,
        marginBottom: getAdjustedFontSize(50)
    },
    table: { backgroundColor: "white" },
    btnIconsHeader: {
        marginHorizontal: 17,
        color: appStyles.buttonColor
    }
});

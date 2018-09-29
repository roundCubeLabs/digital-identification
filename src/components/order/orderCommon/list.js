import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import appstyles from '../../../assets/style'
import { Table, Row, Rows } from "react-native-table-component";
import {getAdjustedFontSize} from '../../common/scaling'

export function LedgerList(props) {
    const tableHead = [
        "Date",
        "Particular",
        "Amount"
    ];
    
    return (
        <View style={{}}>
            <Table  >
                <Row
                    data={tableHead}
                    flexArr={[1,3,1]}
                    style={styles.head}
                    textStyle={[styles.text,{color: "white"}]}
                />
                <FlatList
                    data={props.ledgers}
                    keyExtractor={(item, index) => (item.key = index + " ")}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={15}
                    renderItem={({ item }) => {
                        return (
                            <Rows
                                data={[
                                    [
                                        item.TRAN_DATE,
                                        item.NARRATION,
                                        item.BALANCE
                                    ]
                                ]}
                                flexArr={[1,3,1]}
                                textStyle={[styles.text,{color: "black"}]}
                            />
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
    head: { height: getAdjustedFontSize(17), backgroundColor : appstyles.buttonColor },
    text: { marginLeft: 10, alignContent: "center", fontSize : getAdjustedFontSize(10) },
    row: { height: 70 }
});

import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Card, CardItem, Container } from "native-base";
import padEnd from "lodash/padEnd";

import { getAdjustedFontSize } from "../../common/scaling";
import DetailItemTable from "./detailItemTable";

export default (ShowReport = props => {
    const { order_details, transactions } = props;
    return (
        <Container
            style={{ marginHorizontal: 20, marginVertical: 10, flex: 1 }}
        >
            <Card style={{ flex: 0.7, justifyContent: "flex-start" }}>
                <CardItem style={styles.cardItemStyle}>
                    <Text style={styles.text}>
                        {padEnd("ORDER # ", 13, " ")}
                    </Text>
                    <Text style={styles.text}>{order_details.ORD_NO}</Text>
                </CardItem>
                <CardItem style={styles.cardItemStyle}>
                    <Text style={styles.text}>
                        {padEnd("Customer ", 12, " ")}
                    </Text>
                    <Text style={styles.text}>{order_details.name}</Text>
                </CardItem>
                <CardItem style={styles.cardItemStyle}>
                    <Text style={styles.text}>
                        {padEnd("Del Address ", 9, " ")}
                    </Text>
                    <Text style={styles.text}>{order_details.address}</Text>
                </CardItem>
                <CardItem style={styles.cardItemStyle}>
                    <Text style={styles.text}>
                        {padEnd("Ord Date ", 14, " ")}
                    </Text>
                    <Text style={styles.text}>{order_details.ORD_DATE}</Text>
                </CardItem>
                <CardItem style={styles.cardItemStyle}>
                    <Text style={styles.text}>{padEnd("Status", 16, " ")}</Text>
                    <Text style={styles.text}>{order_details.status}</Text>
                </CardItem>
            </Card>
            <View style={{ flex: 2 }}>
                <DetailItemTable transactions={transactions} />
            </View>
        </Container>
    );
});

const styles = StyleSheet.create({
    text: {
        color: "black",
        fontSize: getAdjustedFontSize(12)
    },
    cardItemStyle: {
        justifyContent: "flex-start",
        height: getAdjustedFontSize(15)
    }
});

import React from "react";
import { View } from "react-native";

import { Text, Container, Card } from "native-base";
import CustomerList from "./customerList";
import appStyles from "../../../../assets/style";
import { getAdjustedFontSize } from "../../../common/scaling";
import Loader from "../../../common/loader";
export default function Customer(props) {
    return (
        <View style={{ flex: 1 }}>
            <Container
                style={{
                    backgroundColor: "transparent",
                    padding: 20
                }}
            >
                <Loader loading={props.isLoading} />
                <Card
                    style={{
                        backgroundColor: "transparent",
                        justifyContent: "center",
                        alignItems: "center",
                        flex: 1
                    }}
                >
                    <Text
                        style={{
                            fontSize: getAdjustedFontSize(18),
                            color: appStyles.buttonColor
                        }}
                    >
                        CUSTOMERS
                    </Text>
                </Card>
                <Card style={{ flex: 5 }}>
                    <CustomerList
                        updateSelectedCustomer={props.updateSelectedCustomer}
                        customers={props.customers}
                    />
                </Card>
            </Container>
        </View>
    );
}

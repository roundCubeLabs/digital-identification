import React from "react";
import { View } from "react-native";

import { Text, Container, Header, Card } from "native-base";
import CustomerList from "./customerList";
import appStyles from '../../../../assets/style'


export default function Customer(props) {
    return (
        <View style={{ flex: 1 }}>
            <Container
                style={{ backgroundColor: "transparent", padding: 20 }}
            >
                <Header style={{backgroundColor : 'transparent', justifyContent : 'center', alignItems : 'center'}}>
                    <Text
                        style={{
                            fontSize: 30,
                            color: appStyles.buttonColor,
                            
                        }}
                    >
                        CUSTOMERS
                    </Text>
                </Header>
                <Card style={{flex : 1}} >
                    <CustomerList updateSelectedCustomer={props.updateSelectedCustomer} customers={props.customers} />
                </Card>
            </Container>
        </View>
    );
}


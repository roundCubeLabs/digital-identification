/**
 * Created by zainmustafa on 29/03/2018.
 */

import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { CardItem, Text } from "native-base";
import {getAdjustedFontSize} from '../../../common/scaling';

export default function CustomerList(props) {
    return (
        <FlatList
            data={props.customers}
            keyExtractor={(item, index) => (item.key = index + " ")}
            removeClippedSubviews={true}
            maxToRenderPerBatch={15}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity onPress={()=>{props.updateSelectedCustomer(item)}}>
                        <CardItem key={item.key} style={{}}>
                            <Text style={{ width: 300, fontSize : getAdjustedFontSize(13) }}>
                                {item.ENTITY_NAME + " " + item.AREA}
                            </Text>
                        </CardItem>
                    </TouchableOpacity>
                );
            }}
            shuouldItemUpdate={()=>{return false}}
        />
    );
}


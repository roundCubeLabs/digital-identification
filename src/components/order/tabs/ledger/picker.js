import React from "react";
import { Picker } from "native-base";

export function CustomPicker(props) {
    return (
        <Picker
            mode="dropdown"
            selectedValue={props.selected}
            onValueChange={value => {
                props.onValueChange(props.name, value);
            }}
        >
            {props.packFlavour.map((item) => {
                return (
                    <Picker.Item
                        color="rgba(124, 24, 159, 1)"
                        key={item.CLS_ID ? item.CLS_ID : item[1].ITEM_CODE}
                        label={item.CLS_DESC ? item.CLS_DESC : item[1].ITEM_ABBR ? item[1].ITEM_ABBR : item[1].ITEM_NAME}
                        value={item.CLS_ID ? item.CLS_ID +","+ item.CLS_DESC : item[1].ITEM_ABBR ?  item[1].ITEM_CODE +","+item[1].ITEM_ABBR + "," + item[1].QTY : item[1].ITEM_CODE +","+item[1].ITEM_NAME}
                    />
                );
            })}
        </Picker>
    );
}

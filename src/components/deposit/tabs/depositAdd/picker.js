import React from "react";
import { Picker } from "native-base";

export function CustomPicker(props) {
    return (
        <Picker
            iosHeader="Select one"
            mode="dropdown"
            headerStyle={{ backgroundColor: "red" }}
            selectedValue={props.selected}
            onValueChange={value => {
                props.onValueChange(props.name, value);
            }}
        >
            {props.list.map((item, index) => {
                return (
                    <Picker.Item
                        key={index.toString()}
                        label={item.ENTITY_NAME}
                        value={item}
                    />
                );
            })}
        </Picker>
    );
}

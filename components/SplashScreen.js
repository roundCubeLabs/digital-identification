import React, { Component } from 'react';
import { Platform, StyleSheet, ImageBackground, View, Button, Image, Text } from 'react-native';
const appName = "App Name Here";

export default class SplashScreen extends Component {

    render() {
        return (


            <View style={styles.container}>
                <View
                    style={{
                        position: "absolute",
                        top: "25%",
                        left: 0,
                        height: "75%",
                        width: "100%"
                    }}
                >

                    <Image
                        style={{
                            flex: 1,
                            width: "100%"
                        }}
                        source={require("./assets/17.jpg")}
                    />

                </View>

                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(38,19,72,0.97)',
                        justifyContent: 'center',
                    }}
                >
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 40,
                            color: "white"
                        }}
                    >

                        {appName}
                    </Text>
                </View>


            </View>
            /* <ImageBackground
             source={require("./images/17.jpg")}
             width="60%"
             height="60%"
             style={styles.container}
             imageStyle={styles.backgroundStyle}
       
         >
             <View
                 style={{
                     flex: 1,
                     justifyContent: "center",
                     alignItems: "center"
                 }}
             >
                 <Button
                    // onPress={() => this.props.showImagePickerComponent(this.props.navigation)}
                     title="START"
                     color="#841584"
                     accessibilityLabel="Increase Count"
                 />
             </View>
       
       
             </ImageBackground>*/
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(252,252,252)"

    },
    backgroundStyle: {
        height: "60%",
        resizeMode: 'contain',
        justifyContent: 'center'
    }
});

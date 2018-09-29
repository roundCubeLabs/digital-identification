/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, ImageBackground, View, Button, Image, Text } from 'react-native';
import SplashScreen from './components/SplashScreen';
import HomeScreen from './components/HomeScreen';
const appName = "App Name Here";

export default class App extends Component {



  render() {
    return (
      <HomeScreen />
    );
  }
}

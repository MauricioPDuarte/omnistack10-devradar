import React from 'react';
import { StatusBar, View, YellowBox } from 'react-native';

import Routes from './src/routes';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);

export default function App() {
  return (
    <>
      <View>
        <StatusBar barStyle="light-content" backgroundColor="#7D40E7"/>
      </View>
      <Routes />
    </>
  );
}
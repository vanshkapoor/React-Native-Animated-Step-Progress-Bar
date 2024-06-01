import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import { ProgressBar } from './src/ProgressBar';
import { barItems } from './assets/sampledata';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [activeIndex, setActiveIndex] = useState(0);

  const incrementIndex = () => {
    const id = activeIndex + 1;
    setActiveIndex(id % barItems.length);
  };

  const decrementIndex = () => {
    const id = activeIndex - 1;
    setActiveIndex(Math.max(id, 0) % barItems.length);
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={{height: 100}} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <ProgressBar barItems={barItems} activeIndex={activeIndex} />
      </ScrollView>

      <View style={{marginTop: 10}}></View>
      <Button onPress={incrementIndex} title={'Next'} />
      <View style={{marginTop: 10}}></View>
      <Button onPress={decrementIndex} title={'Back'} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

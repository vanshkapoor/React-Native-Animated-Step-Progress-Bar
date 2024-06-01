/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';

import {Animated, Easing, ScrollView, StyleSheet, Text, View} from 'react-native';
import { createProgressBarItems, getBarItemsWidth, getScrollAmount } from './progressBarUtils';
import { BarIcon } from './BarIcon';
import * as Progress from 'react-native-progress';

export const ProgressBar = ({barItems, activeIndex}) => {
  const [progressBarItems, setProgressBarItems] = useState([]);
  let totalItems = barItems.length;
  const barWidth = getBarItemsWidth(totalItems);
  const scrollViewRef = useRef(null);
  const scrollX = useRef(new Animated.Value(300)).current;

  const handleScroll = () => {
    // Define the width you want to scroll by
    const scrollWidth = getScrollAmount(barWidth, activeIndex);

    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: scrollWidth, animated: true });
      }
    }, 1000);
  };

  useEffect(() => {
    handleScroll();
    setProgressBarItems(
      createProgressBarItems(barItems, activeIndex)
    );
  }, [barItems, activeIndex]);

  return (
    <View>
      <Animated.ScrollView
        style={styles.scrollView} ref={scrollViewRef}
        horizontal={true}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}>
        <View style={styles.absolutePosition}>
        <Progress.Bar
          progress={(0.5 + activeIndex) / totalItems}
          animated={true}
          animationConfig={{
            duration: 1000
          }}
          unfilledColor='#025c7a'
          borderWidth={0}
          width={barWidth*totalItems}
          color='cornflowerblue'
          style={styles.progressBar}
          animationType='timing'
        />
        <View id="bar-parent" style={styles.barParent}>
          {
              progressBarItems.map((barItem, index:number) => <View id="box" key={index} style={[ styles.redColor, {width: barWidth}]}>
            <BarIcon status={barItem.status} index={barItem.index} />
            <View id="text-box" style={styles.textBox}>
              <Text style={styles.barTitle}>{barItem.title}</Text>
            </View>
          </View>)
          }
        </View>
        </View>
    </Animated.ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
    scrollView: {
      flexDirection: 'row',
    },
    barParent: {
        display: "flex",
        flexDirection: "row",
        marginTop: 10,
        borderWidth: 2,
        borderColor: "red"
    },
    redColor: {
        alignItems: "center",
    },
    textBox: {
        marginTop: 8,
    },
    barTitle: {
      textAlign: "center"
    },
    progressBar: {
      position: "absolute",
      top: 34
    }
})
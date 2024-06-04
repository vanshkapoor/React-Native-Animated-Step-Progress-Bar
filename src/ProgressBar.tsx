/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';

import { Animated, Easing, ScrollView, StyleSheet, Text, View } from 'react-native';
import { createProgressBarItems, getBarItemsWidth, getScrollAmount } from './progressBarUtils';
import { BarIcon } from './BarIcon';
import * as Progress from 'react-native-progress';
import { BAR_COLOR, COLOR, Layout, UNFILLED_BAR_COLOR, UNFILLED_ICON_COLOR } from './constants';

interface ProgressBarProps {
  barItems: { index: number, title: string }[],
  activeIndex: number,
  barColor?: string,
  unfilledIconColor?: string,
  unfilledBarColor?: string,
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  barItems,
  activeIndex,
  barColor = BAR_COLOR,
  unfilledIconColor = UNFILLED_ICON_COLOR,
  unfilledBarColor = UNFILLED_BAR_COLOR,
}) => {
  const [progressBarItems, setProgressBarItems] = useState([]);
  const [previousIndex, setPreviousIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(300)).current;
  const scrollViewRef = useRef(null);
  let totalItems = barItems.length;
  const barWidth = getBarItemsWidth(totalItems);

  const handleScroll = () => {
    let forwardScroll = true;
    const scrollWidth = getScrollAmount(barWidth, activeIndex);
    if (activeIndex > previousIndex) forwardScroll = true
    else forwardScroll = false;

    if (scrollViewRef.current && totalItems > 4 && (activeIndex % 4 === 0 || (activeIndex - previousIndex) >= 4) && forwardScroll) {
      scrollViewRef.current.scrollTo({ x: scrollWidth, animated: true });
    }
    if (scrollViewRef.current && !forwardScroll) {
      scrollViewRef.current.scrollTo({ x: scrollWidth, animated: true });
    }
  };

  useEffect(() => {
    handleScroll();
    setProgressBarItems(
      createProgressBarItems(barItems, activeIndex)
    );
    setPreviousIndex(activeIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <View>
          <Progress.Bar
            progress={(0.5 + activeIndex) / totalItems}
            animated={true}
            animationConfig={{
              duration: 1000,
            }}
            unfilledColor={unfilledBarColor}
            borderWidth={0}
            width={barWidth * totalItems}
            color={barColor}
            style={styles.progressBar}
            animationType={'timing'}
          />
          <View id="bar-parent" style={styles.barParent}>
            {
              progressBarItems.map((barItem: { index: number, title: string }, index: number) => <View id="box" key={index} style={[styles.centerAligned, { width: barWidth }]}>
                <BarIcon status={barItem.status} index={barItem.index} barColor={barColor} unfilledIconColor={unfilledIconColor} />
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
  },
  centerAligned: {
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
    top: 34,
  },
})
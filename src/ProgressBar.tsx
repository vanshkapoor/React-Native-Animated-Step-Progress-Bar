/* eslint-disable prettier/prettier */
import React from 'react';

import {ScrollView, StyleSheet, Text, View} from 'react-native';
import { getBarItemsWidth } from './progressBarUtils';
import { BarIcon } from './BarIcon';
import * as Progress from 'react-native-progress';

export const ProgressBar = ({barItems}) => {
  let totalItems = barItems.length;
  const barWidth = getBarItemsWidth(totalItems);

  return (
    <View>
      <ScrollView horizontal={true} style={styles.scrollView}>
        <View style={styles.absolutePosition}>
        <Progress.Bar 
          progress={0.5}
          animated={true}
          width={barWidth*totalItems}
          color='cornflowerblue'
          style={styles.progressBar}
        />
        <View id="bar-parent" style={styles.barParent}>
          {
              barItems.map((barItem, index:number) => <View id="box" key={index} style={[ styles.redColor, {width: barWidth}]}>
            <BarIcon status={barItem.status} index={barItem.index} />
            <View id="text-box" style={styles.textBox}>
              <Text style={styles.barTitle}>{barItem.title}</Text>
            </View>
          </View>)
          }
        </View>
        </View>
    </ScrollView>
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
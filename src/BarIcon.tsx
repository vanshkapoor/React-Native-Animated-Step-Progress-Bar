/* eslint-disable prettier/prettier */
import React, { useEffect, useRef } from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import TickMark from './TickMarkIcon';

export const BarIcon = ({status, index}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;


  const animateActiveBarItem = () => {
    Animated.loop(
        Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: 1.3,
                duration: 1500,
                useNativeDriver:true
            }),
            Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
            }),
        ])
    ).start();
  };


  useEffect(() => {
    if(status === "active") animateActiveBarItem();
  }, [status]);


  return (
    <View>
    { status === "active" ? <Animated.View style={[ styles.ripple, {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          }]} /> : null
    }
    <View id="bar-icon" style={[styles.barIconView, status === "active" ? styles.activeBarView : status === "completed"? styles.completedBarView : styles.pendingBarView]}>
        { status=="completed"? <TickMark /> : <Text style={styles.progressText}>{index}</Text>}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
    barIconView: {
        borderRadius: 100,
        width: 50,
        height: 50,
        borderWidth: 1,
        // borderColor: "red",
        alignItems: "center"
    },
    activeBarView: {
        backgroundColor: "cornflowerblue",
    },
    pendingBarView: {
        backgroundColor: "black",
    },
    completedBarView: {
        backgroundColor: "cornflowerblue",
    },
    progressText: {
        margin: "auto",
        fontSize: 14,
        fontWeight: '600',
    },
    ripple: {
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: "cornflowerblue",
        position: "absolute",
        // transform: [{ scale: 1.4}]
    }
})
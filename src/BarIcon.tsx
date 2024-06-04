/* eslint-disable prettier/prettier */
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import TickMark from './TickMarkIcon';

interface BarIconProps {
    status: string,
    index: number,
    unfilledIconColor: string,
    barColor: string,
}

export const BarIcon: React.FC<BarIconProps> = ({ status, index, barColor, unfilledIconColor }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const opacityAnim = useRef(new Animated.Value(1)).current;
    const fadeInAnim = useRef(new Animated.Value(0)).current;


    const animateActiveBarItem = () => {
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 0,
                useNativeDriver: true,
            }),
            Animated.delay(1000),
            Animated.timing(fadeInAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.loop(
                Animated.parallel([
                    Animated.timing(scaleAnim, {
                        toValue: 1.3,
                        duration: 1500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacityAnim, {
                        toValue: 0,
                        duration: 1500,
                        useNativeDriver: true,
                    }),
                ])),
        ]).start();
    };


    useEffect(() => {
        if (status === 'active') { animateActiveBarItem(); }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);


    const interpolateColor = fadeInAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [unfilledIconColor, barColor],
    });


    return (
        <View>
            {status === 'active' && <>
                <Animated.View style={[styles.ripple,
                {
                    transform: [{ scale: scaleAnim }],
                    opacity: opacityAnim,
                    backgroundColor: barColor,
                }]} />
                <Animated.View id="active-bar-icon" style={[styles.barIconView, { backgroundColor: interpolateColor }]}>
                    <Text style={styles.progressText}>{index}</Text>
                </Animated.View>
            </>
            }
            {status !== 'active' && <View id="bar-icon" style={[styles.barIconView, status === 'completed' ? { backgroundColor: barColor } : { backgroundColor: unfilledIconColor }]}>
                {status === 'completed' ? <TickMark /> : <Text style={styles.progressText}>{index}</Text>}
            </View>}
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
        alignItems: 'center',
    },
    progressText: {
        margin: 'auto',
        fontSize: 14,
        fontWeight: '600',
    },
    ripple: {
        width: 50,
        height: 50,
        borderRadius: 100,
        position: 'absolute',
    },
});

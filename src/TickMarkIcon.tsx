/* eslint-disable prettier/prettier */
import React, {useEffect, useRef} from 'react';
import {View, Animated} from 'react-native';
import {Svg, Path} from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface TickMarkProps {
}

const TickMark: React.FC<TickMarkProps> = () => {
  const lengthAnim = useRef(new Animated.Value(0));
  const size = 24;

  useEffect(() => {
      Animated.timing(lengthAnim.current, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lengthAnim]);

  const animatedStrokeDashoffset = lengthAnim.current.interpolate({
    inputRange: [0, 1],
    outputRange: [24, 0],
  });

  return (
    <View style={{margin: "auto"}}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <AnimatedPath
          d="M4 12L9 17L20 7"
          stroke={"white"}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="24"
          strokeDashoffset={animatedStrokeDashoffset}
        />
      </Svg>
    </View>
  );
};

export default TickMark;

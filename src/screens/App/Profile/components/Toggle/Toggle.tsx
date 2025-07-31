import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import COLORS from '@colors';
import styles from './Toggle.style';

type Props = {
  value: boolean;
  onValueChange: (val: boolean) => void;
};

const Toggle = ({ value, onValueChange }: Props) => {
  const animation = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 24],
  });

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onValueChange(!value)}
      style={[
        styles.container,
        { backgroundColor: value ? COLORS.success_green : '#CCC' },
      ]}
    >
      <Animated.View style={[styles.circle, value && {backgroundColor: COLORS.white}, { transform: [{ translateX }] }]} />
    </TouchableOpacity>
  );
};

export default Toggle;

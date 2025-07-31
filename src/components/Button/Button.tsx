import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import COLORS from '@colors'
import styles from './Button.style';

type CustomStyles = {
  container?: ViewStyle;
  contentContainer?: ViewStyle;
  label?: TextStyle;
  icon?: ViewStyle;
};

type ButtonProps = {
  label: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  customStyles?: CustomStyles;
  disabled?: boolean;
  useGradient?: boolean;
  gradientColors?: string[];
  backgroundColor?: string;
} & TouchableOpacityProps;

const Button = ({
  label,
  leftIcon,
  rightIcon,
  customStyles,
  loading = false,
  disabled = false,
  useGradient = false,
  gradientColors = [COLORS.gradient_purple, COLORS.gradient_blue],
  backgroundColor,
  ...rest
}: ButtonProps) => {
  const content = loading ? (
    <ActivityIndicator color="#FFF" />
  ) : (
    <View style={[styles.contentContainer, customStyles?.contentContainer]}>
      {leftIcon}
      <Text style={[styles.label, customStyles?.label]}>{label}</Text>
      {rightIcon}
    </View>
  );

  const containerStyle = [
    styles.container,
    customStyles?.container,
    backgroundColor && { backgroundColor },
    (disabled || loading) && styles.disabled,
  ];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || loading}
      style={!useGradient ? containerStyle : undefined}
      {...rest}
    >
      {useGradient ? (
        <LinearGradient
          colors={gradientColors}
          style={containerStyle}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          {content}
        </LinearGradient>
      ) : (
        content
      )}
    </TouchableOpacity>
  );
};

export default Button;

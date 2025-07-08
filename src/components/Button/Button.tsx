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
import styles from './Button.style';

type CustomStyles = {
  container?: ViewStyle;
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
} & TouchableOpacityProps;

const Button = ({
  label,
  leftIcon,
  rightIcon,
  customStyles,
  loading = false,
  disabled = false,
  ...rest
}: ButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled || loading}
      style={[
        styles.container,
        customStyles?.container,
        (disabled || loading) && styles.disabled,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color="#FFF" />
      ) : (
        <View style={styles.contentContainer}>
          {leftIcon}
          <Text style={[styles.label, customStyles?.label]}>{label}</Text>
          {rightIcon}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;

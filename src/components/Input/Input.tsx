import {
  View,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import Icon from '@components/Icon';
import COLORS from '@colors';
import styles from './Input.style';

type CustomStyle = {
  label?: TextStyle;
  outerContainer?: ViewStyle;
  inputContainer?: ViewStyle;
  input?: TextStyle;
  errorText?: TextStyle;
};

type InputProps = {
  label?: string;
  placeholder?: string;
  customStyles?: CustomStyle;
  secureContent?: boolean;
  error?: string;
} & TextInputProps;

const Input = ({
  label,
  placeholder,
  customStyles,
  error,
  secureContent = false,
  ...rest
}: InputProps) => {
  const [hidden, setHidden] = useState(secureContent);
  return (
    <>
      <View style={[styles.outerContainer, customStyles?.outerContainer]}>
        {label && (
          <Text style={[styles.label, customStyles?.label]}>{label}</Text>
        )}
        <View
          style={[
            styles.inputContainer,
            customStyles?.inputContainer,
            error && styles.errorBorder,
          ]}
        >
          <TextInput
            secureTextEntry={hidden}
            style={[styles.input, customStyles?.input]}
            placeholder={placeholder}
            placeholderTextColor={'#FFFFFF80'}
            {...rest}
          />
          {secureContent && (
            <TouchableOpacity
              onPress={() => setHidden(!hidden)}
              style={styles.hideUnhideButton}
            >
              <Icon
                name={hidden ? 'eye-off' : 'eye'}
                size={24}
                color={COLORS.white}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </>
  );
};

export default Input;

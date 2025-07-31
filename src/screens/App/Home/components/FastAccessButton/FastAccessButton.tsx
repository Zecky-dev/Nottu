import React from 'react';
import {
  TouchableOpacity,
  Image,
  TouchableOpacityProps,
  View,
  Text,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import COLORS from '@colors';

import styles from './FastAccessButton.style';
import { User } from '@types';

type FastAccessButtonProps = {
  user?: User;
} & TouchableOpacityProps;

const FastAccessButton = ({ user, ...rest }: FastAccessButtonProps) => {
  const renderButtonContent = () => {
    if (!user) {
      return (
        <LinearGradient
          colors={[COLORS.gradient_purple, COLORS.gradient_blue]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={styles.buttonContentContainer}
        >
          <Image
            source={require('@assets/images/add_people.png')}
            style={styles.addIcon}
          />
        </LinearGradient>
      );
    } else {
      return (
        <View style={styles.buttonContentContainer}>
          {!user.avatar ? (
            <Text style={styles.nameSurnameAbbr}>
              {user.nameSurname.substring(0, 2)}
            </Text>
          ) : (
            <Image source={{ uri: user.avatar.url }} style={styles.userImage} />
          )}
        </View>
      );
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.6} {...rest} style={styles.fastAccessButton}>
      {renderButtonContent()}
    </TouchableOpacity>
  );
};

export default FastAccessButton;

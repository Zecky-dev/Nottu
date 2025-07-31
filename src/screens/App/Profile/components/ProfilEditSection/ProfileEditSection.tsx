// src/components/ProfileEditSection.tsx

import React from 'react';
import {
  View,
  Image,
  Text,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';
import styles from './ProfileEditSection.style';

interface ProfileEditSectionProps {
  icon: ImageSourcePropType;
  title: string;
  children?: React.ReactNode;
}

const ProfileEditSection = ({
  icon,
  title,
  children,
}: ProfileEditSectionProps) => {
  return (
    <View>
      <View style={styles.sectionTitleContainer}>
        <Image source={icon} style={styles.sectionIcon} />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );
};

export default ProfileEditSection;

import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { useAuth } from '@context/AuthContext';

import styles from './Home.style';
import LinearGradient from 'react-native-linear-gradient';
import COLORS from '@colors';

import CustomModal from '@components/CustomModal';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '@navigation/types';

import { Profile } from '@screens';
import { t } from 'i18next';
import FastAccessButton from './components/FastAccessButton';
import { Button, Icon } from '@components';
import AddNoteFriend from '../AddNoteFriend';

const Home = () => {
  const { userInfo, logout } = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [addFriendModalVisible, setAddFriendModalVisible] = useState(false);

  return (
    <SafeAreaView>
      {/* Header */}
      <LinearGradient
        colors={[COLORS.gradient_purple, COLORS.gradient_blue]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientContainer}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>NOTTU</Text>
        </View>
        <View style={styles.rightContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => console.log('Notifications')}
            style={styles.circleButton}
          >
            <Image
              source={require('@assets/images/notification_icon.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setProfileModalVisible(true)}
            style={styles.circleButton}
          >
            {userInfo?.avatar ? (
              <Image
                source={{ uri: userInfo.avatar.url }}
                style={styles.photo}
              />
            ) : (
              <Text style={styles.text}>
                {userInfo?.nameSurname?.substring(0, 2).toUpperCase()}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* AD Banner */}
      <View style={styles.adBannerContainer}>
        <Text style={styles.adBannerText}>{t('text.ad_banner')}</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.fastAccessContainer}>
          <Text style={styles.fastAccessTitle}>{t('text.fast_access')}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.fastAccessList}
          >
            <FastAccessButton />
            <FastAccessButton />
            <FastAccessButton />
            <FastAccessButton />
            <FastAccessButton />
            <FastAccessButton />
            <FastAccessButton />
          </ScrollView>
        </View>
        <Button
          useGradient
          gradientColors={[COLORS.gradient_purple, COLORS.gradient_blue]}
          onPress={() => setAddFriendModalVisible(true)}
          label={t('button.add_new_note_friend')}
          leftIcon={
            <Icon name="plus" type="antdesign" color={COLORS.white} size={24} />
          }
          customStyles={{
            container: { borderRadius: 32, marginVertical: 16 },
            label: {
              color: COLORS.white,
              fontFamily: 'Quicksand-SemiBold',
              fontSize: 18,
            },
          }}
        />
      </View>

      <CustomModal
        isFullScreen={true}
        backdropOpacity={0.8}
        onClose={() => setProfileModalVisible(false)}
        isVisible={profileModalVisible}
      >
        <Profile />
      </CustomModal>

      <CustomModal
        isFullScreen={true}
        backdropOpacity={0.8}
        onClose={() => setAddFriendModalVisible(false)}
        isVisible={addFriendModalVisible}
      >
       <AddNoteFriend/>
      </CustomModal>
    </SafeAreaView>
  );
};

export default Home;

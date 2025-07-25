import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { View, ScrollView, useWindowDimensions, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  OnboardingSlide,
  OnboardingSlideType,
} from './components/OnboardingSlide';

import LinearGradient from 'react-native-linear-gradient';
import COLORS from '@colors';
import styles from './Onboarding.style';

import Button from '@components/Button';
import { Icon } from '@components';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RootStackParamList } from '@navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const Onboarding = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width: screenWidth } = useWindowDimensions();
  const { t } = useTranslation();

  const OnboardingSlides: OnboardingSlideType[] = [
    {
      id: 1,
      title: t('onboarding.welcome_to_nottu'),
      description: t('onboarding.welcome_to_nottu_descr'),
    },
    {
      id: 2,
      title: t('onboarding.why_nottu'),
      description: t('onboarding.why_nottu_descr'),
      icon: {
        name: 'question-circle',
        type: 'antdesign',
        color: 'white',
        size: 64,
      },
    },

    {
      id: 3,
      icon: {
        name: 'share-social-outline',
        type: 'ion',
        color: 'white',
        size: 64,
      },
      title: t('onboarding.share_your_moments'),
      description: t('onboarding.share_your_moments_descr'),
    },
    {
      id: 4,
      icon: {
        name: 'key',
        type: 'feather',
        color: 'white',
        size: 64,
      },
      title: t('onboarding.easy_to_use'),
      description: t('onboarding.easy_to_use_descr'),
    },
    {
      id: 5,
      icon: {
        name: 'check',
        type: 'feather',
        color: 'white',
        size: 64,
      },
      title: t('onboarding.lets_get_started'),
      description: t('onboarding.lets_get_started_descr'),
    },
  ];

  const handleNext = async () => {
    if (currentIndex < OnboardingSlides.length - 1) {
      const nextIndex = currentIndex + 1;
      scrollRef.current?.scrollTo({
        x: nextIndex * screenWidth,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    } else {
      await AsyncStorage.setItem('onboarding_completed', 'true');
      navigation.replace('LoginEmail');
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      scrollRef.current?.scrollTo({
        x: prevIndex * screenWidth,
        animated: true,
      });
      setCurrentIndex(prevIndex);
    }
  };

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <SafeAreaView edges={['top', 'bottom']} style={styles.outerContainer}>
        <LinearGradient
          colors={[COLORS.gradient_blue, COLORS.gradient_purple]}
          locations={[0.1, 0.9]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={styles.innerContainer}
        >
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ alignItems: 'center' }}
            scrollEnabled={false}
          >
            {OnboardingSlides.map(slide => (
              <OnboardingSlide key={slide.id} item={slide} />
            ))}
          </ScrollView>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              {currentIndex !== 0 ? (
                <Button
                  customStyles={{
                    label: {
                      bottom: 2,
                    },
                  }}
                  label={t('button.back')}
                  onPress={handleBack}
                  leftIcon={
                    <Icon
                      name="left"
                      type="antdesign"
                      size={20}
                      color={COLORS.black}
                    />
                  }
                />
              ) : (
                <View style={{ width: '100%' }} />
              )}
            </View>

            <View style={styles.buttonContainer}>
              <Button
                customStyles={{
                  label: {
                    bottom: 2,
                  },
                }}
                label={
                  currentIndex !== OnboardingSlides.length - 1
                    ? t('button.continue')
                    : t('button.lets_go')
                }
                onPress={handleNext}
                rightIcon={
                  currentIndex !== OnboardingSlides.length - 1 && (
                    <Icon
                      name="right"
                      type="antdesign"
                      color={COLORS.black}
                      size={20}
                    />
                  )
                }
                leftIcon={
                  currentIndex === OnboardingSlides.length - 1 && (
                    <Icon
                      name="rocket-sharp"
                      type="ion"
                      color={COLORS.black}
                      size={20}
                    />
                  )
                }
              />
            </View>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
};

export default Onboarding;

import React, { useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, useWindowDimensions} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  OnboardingSlide,
  OnboardingSlideType,
} from './components/OnboardingSlide';

import LinearGradient from 'react-native-linear-gradient';
import COLORS from '@colors';
import styles from './Onboarding.style';

// Onboarding slides.
const OnboardingSlides: OnboardingSlideType[] = [
  {
    id: 1,
    icon: {
      name: 'share-social-outline',
      type: 'ion',
      color: 'white',
      size: 64,
    },
    title: 'Share Your Moments',
    description: 'Keep your special moments close — right on your home screen.',
  },
  {
    id: 2,
    icon: { name: 'key', type: 'feather', color: 'white', size: 64 },
    title: 'Easy to use',
    description:
      "Share your code with someone you'd like to connect with — then start sending notes to each other.",
  },
  {
    id: 3,
    icon: { name: 'check', type: 'feather', color: 'white', size: 64 },
    title: 'Let’s get started!',
    description:
      'Create your account and start sharing moments with someone special.',
  },
];

const Onboarding = () => {

  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width: screenWidth } = useWindowDimensions();

  const handleNext = () => {
    if(currentIndex < OnboardingSlides.length - 1) { // 3 eleman için 0,1,2,3 length = 4 -1 = 3
      const nextIndex = currentIndex + 1;
      scrollRef.current?.scrollTo({x: nextIndex * screenWidth, animated: true})
      setCurrentIndex(nextIndex);
    }
    else {
      // Last slide
    }
  }

  return (
    <SafeAreaView
      edges={['bottom', 'top', 'left']}
      style={styles.outerContainer}
    >
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
          
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Onboarding;

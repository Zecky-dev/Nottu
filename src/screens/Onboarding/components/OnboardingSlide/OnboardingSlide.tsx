import React from 'react';
import {View, Text} from 'react-native'
import Icon, { IconProps } from '@components/Icon/Icon';
import styles from './OnboardingSlide.style';

export type OnboardingSlideType = {
    id: number;
    icon: IconProps;
    title: string;
    description: string;
}

type OnboardingSlideProps = {
    item: OnboardingSlideType
}

export const OnboardingSlide = ({item}: OnboardingSlideProps) => {
    return (
        <View style={styles.container} key={item.id.toString()}>
            <Icon {...item.icon}/>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    )
}
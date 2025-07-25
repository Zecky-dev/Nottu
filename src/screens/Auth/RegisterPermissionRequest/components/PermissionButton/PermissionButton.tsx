import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, View } from 'react-native';

import styles from './PermissionButton.style';
import { Icon } from '@components';
import COLORS from '@colors';
import { t } from 'i18next';


type PermissionButtonProps = {
    title: string;
    description: string;
    icon: React.ReactNode;
    granted: boolean;
} & TouchableOpacityProps


const PermissionButton = ({title, description, icon, granted, ...rest} : PermissionButtonProps) => {
    return (
        <TouchableOpacity activeOpacity={0.8} {...rest} style={[styles.container, granted && styles.grantedContainer]}>
            <View style={styles.topContainer}>
                {icon}
                <Text style={[styles.title, granted && styles.grantedText]}>{title} {granted && `- ${t('text.permission_granted')}`}</Text>
                {granted && <Icon name='checkmark' type='ion' color={COLORS.white} size={28}/>}
            </View>
            <Text style={[styles.description, granted && styles.grantedText]}>{description}</Text>
        </TouchableOpacity>
    )
}


export default PermissionButton;
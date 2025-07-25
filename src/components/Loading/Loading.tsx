import React from 'react';
import { Modal, View, ActivityIndicator, Text } from 'react-native';
import { useLoading } from '@context/LoadingContext';

import styles from './Loading.style';
import COLORS from '@colors'
import { t } from 'i18next';

const Loading = () => {
  const { isLoading } = useLoading();

  return (
    <Modal visible={isLoading} transparent animationType="fade">
      <View style={styles.container}>
        <ActivityIndicator size={50} color={COLORS.white} />
        <Text style={styles.loadingText}>{t('text.loading')}</Text>
      </View>
    </Modal>
  );
};

export default Loading;

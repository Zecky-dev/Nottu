import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import COLORS from '@colors';

import Clipboard from '@react-native-clipboard/clipboard';
import Share from 'react-native-share';

import styles from './RegisterComplete.style';
import { Text, View } from 'react-native';
import { Button, Icon } from '@components';
import { useAuth } from '@context/AuthContext';
import { useLoading } from '@context/LoadingContext';
import { t } from 'i18next';
import { showToast } from '@utils/toastConfig';

const RegisterPermissionRequest = () => {
  const { userInfo, setRegisterCompleted } = useAuth();

  // Copy code
  const copyCode = (code?: string) => {
    if (code) {
      Clipboard.setString(code);
      showToast({
        type: 'success',
        text1: t('text.success'),
        text2: t('text.copy_success'),
        visibilityTime: 1250,
      });
    }
  };

  const shareCode = async (code?: string) => {
    if (code) {
      await Share.open({
        title: t('text.share_match_code_title'),
        message: `${t('text.my_share_code')}: ${code}, ${t(
          'text.you_can_add_me',
        )}`,
        subject: t('text.match_code_subject'),
      });
    }
  };

  return (
    <SafeAreaView style={styles.outerContainer}>
      <LinearGradient
        colors={[COLORS.gradient_blue, COLORS.gradient_purple]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientContainer}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>NOTTU</Text>

          <View>
            <Text style={styles.allSetText}>
              {t('text.you_are_all_set')} {userInfo?.nameSurname}!
            </Text>
            <Text style={styles.codeDescription}>
              {t('text.register_complete_descr')}
            </Text>
          </View>

          <Text style={styles.code}>{userInfo?.matchCode}</Text>

          <View style={styles.buttonsContainer}>
            <Button
              customStyles={{
                container: styles.customButtonContainer,
              }}
              onPress={() => copyCode(userInfo?.matchCode)}
              label={t('button.copy')}
              leftIcon={
                <Icon
                  name="copy-sharp"
                  type="ion"
                  color={COLORS.black}
                  size={24}
                />
              }
            />
            <Button
              customStyles={{
                container: styles.customButtonContainer,
              }}
              onPress={() => shareCode(userInfo?.matchCode)}
              label={t('button.share')}
              leftIcon={
                <Icon
                  name="share-social-outline"
                  type="ion"
                  color={COLORS.black}
                  size={24}
                />
              }
            />
          </View>
          <Text style={styles.infoText}>
            {t('text.register_complete_info')}
          </Text>
        </View>
        <View style={styles.continueButtonContainer}>
          <Button
            onPress={() => setRegisterCompleted(true)}
            label={t('button.lets_go')}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default RegisterPermissionRequest;

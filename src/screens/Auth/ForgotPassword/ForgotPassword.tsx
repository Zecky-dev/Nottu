import React, { useState } from 'react';
import { KeyboardAvoidingView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackButton, Button } from '@components';
import LinearGradient from 'react-native-linear-gradient';
import Input from '@components/Input';
import COLORS from '@colors';
import styles from './ForgotPassword.style';

import { useTranslation } from 'react-i18next';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AuthStackParamList } from '@navigation/types';

import { validateEmail } from '@utils';
import { useLanguage } from '@context/LanguageContext';
import { useAuth } from '@context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const ForgotPassword = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { resetPassword } = useAuth();
  const navigation = useNavigation();
  

  const route = useRoute<RouteProp<AuthStackParamList>>();
  
  const [emailAddress, setEmailAddress] = useState(route.params?.email ?? '');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const validateEmailInput = (email: string): string => {
    const trimmed = email.trim();
    if (trimmed === '') {
      return t('errors.email_required');
    }
    if (!validateEmail(trimmed)) {
      return t('errors.email_not_valid');
    }
    return '';
  };

  const onContinue = async () => {
    setIsSubmitted(true);
    const errorMessage = validateEmailInput(emailAddress);
    if (errorMessage) {
      setError(errorMessage);
      return;
    }
    setError('');
    const res = await resetPassword(emailAddress, language);
    if(res && res.success) {
      // Bir önceki sayfaya (şifre girme sayfasına geri dönmeli)
      navigation.goBack();
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
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={'padding'}
          keyboardVerticalOffset={0}
        >
          <View style={styles.innerContentContainer}>
            <View style={styles.backButtonContainer}>
              <BackButton />
            </View>
            <Text style={styles.title}>NOTTU</Text>
            <Input
              error={isSubmitted ? error : ''}
              value={emailAddress}
              label={t('text.email')}
              placeholder={t('text.email_placeholder')}
              onChangeText={val => {
                setEmailAddress(val);
                if (isSubmitted) {
                  const errorMessage = validateEmailInput(val);
                  setError(errorMessage);
                }
              }}
            />
            <Button
              label={t('button.reset_password')}
              customStyles={{
                container: styles.continueButtonContainer,
              }}
              onPress={onContinue}
            />
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default ForgotPassword;

import React, { useState } from 'react';
import { KeyboardAvoidingView, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Icon, Input, BackButton } from '@components';
import LinearGradient from 'react-native-linear-gradient';
import COLORS from '@colors';
import styles from './LoginPassword.style';

import { useTranslation } from 'react-i18next';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { AuthStackParamList } from '@navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '@context/AuthContext';

const LoginPassword = () => {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const { login, setRegisterCompleted } = useAuth();

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const route = useRoute<RouteProp<AuthStackParamList>>();
  const email = route.params?.email;

  const onContinue = () => {
    setIsSubmitted(true);
    if (password.trim() === '') {
      setError(t('errors.password_required'));
    } else {
      setError('');
      if (email) login(email, password);
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
              error={error}
              value={password}
              secureContent={true}
              label={t('text.password')}
              placeholder={'***********'}
              onChangeText={val => {
                setPassword(val);
                if (isSubmitted && val.trim() === '') {
                  setError(t('errors.password_required'));
                } else {
                  setError('');
                }
              }}
            />
            <Button
              label={t('button.login')}
              customStyles={{
                container: styles.continueButtonContainer,
              }}
              rightIcon={
                <Icon
                  name="right"
                  type="antdesign"
                  size={20}
                  color={COLORS.black}
                />
              }
              onPress={onContinue}
            />
            <Pressable
              onPress={() =>
                navigation.navigate('ForgotPassword', { email: email! })
              }
            >
              <Text style={styles.forgotPasswordText}>
                {t('button.forgot_password')}
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default LoginPassword;

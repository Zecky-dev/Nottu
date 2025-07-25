import React, { useState } from 'react';
import { KeyboardAvoidingView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackButton, Button, Icon, Input } from '@components';
import LinearGradient from 'react-native-linear-gradient';

import COLORS from '@colors';

import { validateEmail } from '@utils';
import { useTranslation } from 'react-i18next';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { AuthStackParamList } from '@navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import styles from './RegisterPassword.style';

const RegisterPassword = () => {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const route = 
    useRoute<RouteProp<AuthStackParamList>>();

  const onContinue = async () => {
    setIsSubmitted(true);

    // Check if password and passwordAgain is not empty
    if(password.trim() !== "" && passwordAgain.trim() !== "") {
        if(password === passwordAgain) {
            navigation.navigate('RegisterPersonalInfo', { email: route.params?.email!, password: password  })
            setError("");
        }
        else {
            setError(t('errors.passwords_not_same'))
            return;
        }
    }
    else {
        setError(t('errors.password_required'))
        return;
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
            <Text style={styles.subTitle}>{t('text.create_account')}</Text>
            <Input
              error={isSubmitted ? error : ''}
              value={password}
              label={t('text.password')}
              placeholder={'***********'}
              onChangeText={val => setPassword(val)}
              secureContent={true}
            />
            <Input
              error={isSubmitted ? error : ''}
              value={passwordAgain}
              label={t('text.password_again')}
              placeholder={'***********'}
              onChangeText={val => setPasswordAgain(val)}
              secureContent={true}
            />
            <Button
              label={t('button.continue')}
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
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default RegisterPassword;

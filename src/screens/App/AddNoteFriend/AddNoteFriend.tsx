import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Button, Icon, Input } from '@components';
import styles from './AddNoteFriend.style';
import { useAuth } from '@context/AuthContext';
import { t } from 'i18next';
import COLORS from '@colors';

const AddNoteFriend = () => {
  const { userInfo } = useAuth();

  const copyCode = () => {};

  const shareCode = () => {};

  const [matchCode, setMatchCode] = useState<string>('');

  const handleMatchCodeChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setMatchCode(numericText);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* How it works header */}
      <View>
        <View>
          <Image
            source={require('@assets/images/how_it_works.png')}
            style={styles.icon}
          />
          <Text style={styles.howItWorksTitle}>{t('text.how_it_works')}</Text>
        </View>
        <Text style={styles.howItWorksDescr}>
          {t('text.how_it_works_descr')}
        </Text>
      </View>
      {/* Match Code*/}
      <View style={styles.matchCodeInfoContainer}>
        <Text style={styles.matchCodeTitle}>{t('text.your_match_code')}</Text>
        <View style={styles.matchCodeContainer}>
          <Text style={styles.matchCodeText}>{userInfo?.matchCode}</Text>
          <TouchableOpacity onPress={copyCode}>
            <Icon name="copy" type="feather" color={COLORS.black} size={18} />
          </TouchableOpacity>
        </View>
        <Button
          label={t('button.share_match_code')}
          useGradient
          gradientColors={[COLORS.gradient_purple, COLORS.gradient_blue]}
          leftIcon={
            <Icon
              name="share-social-outline"
              type="ion"
              color={COLORS.white}
              size={24}
            />
          }
          customStyles={{
            container: { borderRadius: 8 },
            label: {
              color: COLORS.white,
              fontFamily: 'Quicksand-Semibold',
              fontSize: 16,
            },
          }}
          onPress={shareCode}
        />
      </View>

      <View style={styles.orSeperatorContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>{t('text.or')}</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.matchWithFriendContainer}>
        <Text style={styles.matchWithFriendText}>
          {t('text.match_with_your_friend')}
        </Text>
        <Input
          value={matchCode}
          placeholder={t('text.enter_friends_match_code')}
          customStyles={{
            input: { textAlign: 'center', color: COLORS.black },
            inputContainer: { borderColor: COLORS.black, borderWidth: 1 },
            label: { color: 'red' },
          }}
          keyboardType="numeric"
          placeholderTextColor={'rgba(0,0,0,0.5)'}
          onChangeText={handleMatchCodeChange}
          maxLength={6}
          multiline={true}
        />
        <Button
          label={t('button.send_match_request')}
          useGradient
          gradientColors={[COLORS.gradient_purple, COLORS.gradient_blue]}
          leftIcon={
            <Icon name="link" type="antdesign" color={COLORS.white} size={20} />
          }
          customStyles={{
            container: { borderRadius: 8 },
            label: {
              color: COLORS.white,
              fontFamily: 'Quicksand-Semibold',
              fontSize: 16,
            },
          }}
          onPress={shareCode}
        />
      </View>
      
    </ScrollView>
  );
};

export default AddNoteFriend;

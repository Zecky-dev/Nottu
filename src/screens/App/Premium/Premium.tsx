import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './Premium.style';
import { t } from 'i18next';
import { Button } from '@components';
import COLORS from '@colors';

type PremiumItemProps = {
  content: string;
};

const PremiumItem = ({ content }: PremiumItemProps) => {
  return (
    <View style={styles.premiumItemContainer}>
      <Image
        source={require('@assets/images/check.png')}
        style={styles.checkIcon}
      />
      <Text style={styles.premiumItemContent}>{content}</Text>
    </View>
  );
};

const Premium = () => {
  const premiumItems: string[] = [
    t('text.premium.no_ads'),
    t('text.premium.note_background'),
    t('text.premium.stickers'),
    t('text.premium.fonts'),
    t('text.premium.badge'),
    t('text.premium.more_note_friends'),
    t('text.premium.scheduled_note_sharing'),
  ];

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image
          source={require('@assets/images/premium_big.png')}
          style={styles.premiumIcon}
        />
        <Text style={styles.title}>{t('text.premium.membership')}</Text>
      </View>

      <View style={styles.premiumItemsContainer}>
        {premiumItems.map((item, i) => (
          <PremiumItem content={item} key={i.toString()} />
        ))}
      </View>
      <View style={styles.getPremiumButtonContainer}>
        <Button
          useGradient={true}
          gradientColors={[COLORS.gradient_purple, COLORS.gradient_blue]}
          onPress={() => console.log('Get premium')}
          label={t('button.get_premium')}
          customStyles={{
            label: { color: COLORS.white },
            container: { borderRadius: 32 },
            contentContainer: { justifyContent: 'center' },
          }}
          leftIcon={
            <Image
              source={require('@assets/images/get_premium_diamond.png')}
              style={styles.getPremiumIcon}
            />
          }
        />
        <Text style={styles.getOnceOwnForever}>
          {t('text.premium.get_once_own_forever')}
        </Text>
      </View>
    </View>
  );
};

export default Premium;

import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '@context/AuthContext';

import styles from './Home.style';
import LinearGradient from 'react-native-linear-gradient';
import COLORS from '@colors';

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView>
      {/* Header */}
      <LinearGradient
        colors={[COLORS.gradient_purple, COLORS.gradient_blue]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientContainer}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>NOTTU</Text>
        </View>
        <View style={styles.rightContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => console.log('Notifications')}
            style={styles.circleButton}
          >
            <Image
              source={require('@assets/images/notification_icon.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => console.log('Show Profile')}
            style={styles.circleButton}
          >
            {user?.photoURL ? (
              <Image source={{ uri: user.photoURL }} style={styles.photo} />
            ) : (
              <Text style={styles.text}>
                {user?.displayName?.substring(0, 2).toUpperCase()}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* AD Banner */}
      <View style={styles.adBannerContainer}>
        <Text style={styles.adBannerText}>AD BANNER</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.fastAccessContainer}>
          <Text style={styles.fastAccessTitle}>Fast Access</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.fastAccessList}>
            <TouchableOpacity
              onPress={() => console.log('Add fast access')}
              style={styles.fastAccessButton}
            >
              <LinearGradient
                colors={[COLORS.gradient_purple, COLORS.gradient_blue]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <Image
                  source={require('@assets/images/add_people.png')}
                  style={styles.addIcon}
                />
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log('Add fast access')}
              style={styles.fastAccessButton}
            >
              <LinearGradient
                colors={[COLORS.gradient_purple, COLORS.gradient_blue]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <Image
                  source={require('@assets/images/add_people.png')}
                  style={styles.addIcon}
                />
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log('Add fast access')}
              style={styles.fastAccessButton}
            >
              <LinearGradient
                colors={[COLORS.gradient_purple, COLORS.gradient_blue]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <Image
                  source={require('@assets/images/add_people.png')}
                  style={styles.addIcon}
                />
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log('Add fast access')}
            >
              <LinearGradient
                colors={[COLORS.gradient_purple, COLORS.gradient_blue]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <Image
                  source={require('@assets/images/add_people.png')}
                  style={styles.addIcon}
                />
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log('Add fast access')}
              style={styles.fastAccessButton}
            >
              <LinearGradient
                colors={[COLORS.gradient_purple, COLORS.gradient_blue]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <Image
                  source={require('@assets/images/add_people.png')}
                  style={styles.addIcon}
                />
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log('Add fast access')}
              style={styles.fastAccessButton}
            >
              <LinearGradient
                colors={[COLORS.gradient_purple, COLORS.gradient_blue]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <Image
                  source={require('@assets/images/add_people.png')}
                  style={styles.addIcon}
                />
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
      {/* Fast Access */}

      <Text>Welcome to the app!</Text>
      <TouchableOpacity
        onPress={logout}
        style={{ backgroundColor: 'red', padding: 12 }}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;

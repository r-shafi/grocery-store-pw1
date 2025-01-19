import { ROUTES } from '@/constants/routes';
import { getToken } from '@/service/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, Slot, useRouter } from 'expo-router';
import { LogOut, Search, ShoppingCart } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  PanResponder,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const DRAWER_WIDTH = 280;
const SWIPE_THRESHOLD = 50;

export default function RootLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const router = useRouter();

  useEffect(() => {
    getToken().then((token) => {
      if (token) {
        setIsAuthenticated(true);
      }
    });
  }, []);

  const toggleDrawer = (shouldOpen: boolean) => {
    Animated.timing(translateX, {
      toValue: shouldOpen ? 0 : -DRAWER_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsDrawerOpen(shouldOpen);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx > 0 && !isDrawerOpen) {
          translateX.setValue(
            Math.max(-DRAWER_WIDTH, -DRAWER_WIDTH + gestureState.dx)
          );
        } else if (gestureState.dx < 0 && isDrawerOpen) {
          translateX.setValue(Math.max(-DRAWER_WIDTH, gestureState.dx));
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (!isDrawerOpen && gestureState.dx > SWIPE_THRESHOLD) {
          toggleDrawer(true);
        } else if (isDrawerOpen && gestureState.dx < -SWIPE_THRESHOLD) {
          toggleDrawer(false);
        } else {
          toggleDrawer(isDrawerOpen);
        }
      },
    })
  ).current;

  const handleLogout = async () => {
    await AsyncStorage.removeItem('jwtToken');
    setIsAuthenticated(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <TouchableOpacity
            onPress={() => toggleDrawer(true)}
            style={styles.menuButton}
          >
            <Text>☰</Text>
          </TouchableOpacity>
          <Link href={'/'}>
            <Text style={styles.headerTitle}>Grocery Store</Text>
          </Link>
        </View>

        {isAuthenticated && (
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.cartButton}
              onPress={() => router.push('/cart')}
            >
              <ShoppingCart />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => router.push('/search')}
            >
              <Search />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.content} {...panResponder.panHandlers}>
        <Animated.View
          style={[
            styles.drawer,
            {
              transform: [{ translateX }],
            },
          ]}
        >
          <View>
            {ROUTES.map((route) => {
              if (
                (!route.protected && !route.hideAuthenticated) ||
                (route.hideAuthenticated && !isAuthenticated)
              ) {
                return (
                  <Link href={route.path} key={route.label}>
                    <TouchableOpacity style={styles.navItem}>
                      {route.icon}
                      <Text style={styles.navLabel}>{route.label}</Text>
                    </TouchableOpacity>
                  </Link>
                );
              }

              if (route.protected && isAuthenticated) {
                return (
                  <Link href={route.path} key={route.label}>
                    <TouchableOpacity style={styles.navItem}>
                      {route.icon}
                      <Text style={styles.navLabel}>{route.label}</Text>
                    </TouchableOpacity>
                  </Link>
                );
              }

              return null;
            })}
            {isAuthenticated && (
              <TouchableOpacity style={styles.navItem} onPress={handleLogout}>
                <LogOut />
                <Text style={styles.navLabel}>Logout</Text>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>

        <View style={styles.pageContent}>
          <Slot />
        </View>

        {isDrawerOpen && (
          <TouchableOpacity
            style={styles.overlay}
            onPress={() => toggleDrawer(false)}
            activeOpacity={1}
          />
        )}
      </View>

      <View style={styles.footer}>
        <Text>Shafi - Mim - Fahi</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartButton: {
    marginRight: 16,
  },
  cartText: {
    fontSize: 16,
  },
  cartPrice: {
    fontSize: 12,
    color: '#555',
  },
  profileButton: {
    padding: 8,
  },
  profileIcon: {
    fontSize: 20,
  },
  menuButton: {
    padding: 8,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    position: 'relative',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: DRAWER_WIDTH,
    height: '100%',
    backgroundColor: '#fff',
    zIndex: 2,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  pageContent: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  footer: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    width: DRAWER_WIDTH,
  },
  navItemActive: {
    backgroundColor: '#f0f0f0',
  },
  navLabel: {
    fontSize: 16,
    marginLeft: 8,
  },
  navLabelActive: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
});

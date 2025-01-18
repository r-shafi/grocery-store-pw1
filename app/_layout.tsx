import { Href, Link, Slot, usePathname } from 'expo-router';
import React, { useRef, useState } from 'react';
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

import { Home, Menu, User } from 'lucide-react';

type NavItem = {
  label: string;
  path: Href<string>;
  icon?: React.ReactNode;
};

const NAVIGATION: NavItem[] = [
  { label: 'Home', path: '/', icon: <Home size={20} /> },
  { label: 'Product', path: '/(pages)/product', icon: <User size={20} /> },
];

export default function RootLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => toggleDrawer(true)}
          style={styles.menuButton}
        >
          <Menu color="black" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Grocery Store</Text>
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
          <Text style={styles.drawerTitle}>Navigation</Text>

          <View style={styles.navLinks}>
            {NAVIGATION.map((item) => {
              const isActive = usePathname() === item.path;
              return (
                <Link href={item.path} key={item.label}>
                  <TouchableOpacity
                    style={[styles.navItem, isActive && styles.navItemActive]}
                  >
                    {item.icon}
                    <Text
                      style={[
                        styles.navLabel,
                        isActive && styles.navLabelActive,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                </Link>
              );
            })}
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
        <Text>Footer Content</Text>
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
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  menuButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
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
  navLinks: {
    paddingTop: 16,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
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

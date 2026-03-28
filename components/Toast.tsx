import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  visible: boolean;
  type?: ToastType;
  text1: string;
  text2?: string;
  onHide: () => void;
  duration?: number;
}

const CONFIG: Record<ToastType, { bg: string; icon: keyof typeof Ionicons.glyphMap; color: string }> = {
  success: { bg: '#22C55E', icon: 'checkmark-circle', color: '#fff' },
  error:   { bg: '#EF4444', icon: 'trash',            color: '#fff' },
  info:    { bg: '#3B82F6', icon: 'information-circle', color: '#fff' },
};

export default function Toast({
  visible,
  type = 'info',
  text1,
  text2,
  onHide,
  duration = 2500,
}: ToastProps) {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity    = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) return;

    Animated.parallel([
      Animated.spring(translateY, { toValue: 0, useNativeDriver: true, damping: 14, stiffness: 160 }),
      Animated.timing(opacity,    { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(translateY, { toValue: -120, duration: 280, useNativeDriver: true }),
        Animated.timing(opacity,    { toValue: 0,    duration: 200, useNativeDriver: true }),
      ]).start(() => onHide());
    }, duration);

    return () => clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;

  const { bg, icon, color } = CONFIG[type];

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }], opacity }]}>
      <View style={[styles.toast, { backgroundColor: bg }]}>
        <Ionicons name={icon} size={22} color={color} style={styles.icon} />
        <View style={styles.texts}>
          <Text style={[styles.text1, { color }]}>{text1}</Text>
          {text2 ? <Text style={[styles.text2, { color }]}>{text2}</Text> : null}
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 56,
    left: 16,
    right: 16,
    zIndex: 9999,
    alignItems: 'center',
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  icon: {
    marginRight: 12,
  },
  texts: {
    flex: 1,
  },
  text1: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'BPG-Nino-Mtavruli',
  },
  text2: {
    fontSize: 12,
    marginTop: 2,
    opacity: 0.9,
    fontFamily: 'BPG-Nino-Mtavruli',
  },
});

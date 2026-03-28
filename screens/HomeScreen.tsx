import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import SettingsModal from '../components/SettingsModal';

const COLORS = {
  primary: '#2FA2FE',
  primaryLight: '#EFF6FF',
  bg: '#FFFFFF',
  text: '#111827',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  navBg: '#F9FAFB',
  recordRed: '#EF4444',
};

const SAMPLE_TRANSCRIPTION =
  'ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძლია ჩაწეროს საუბარი და რამდენიმე წამში მიიღოს წასაკითხი ტექსტი.' +
  'ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძლია ჩაწეროს საუბარი და რამდენიმე წამში მიიღოს წასაკითხი ტექსტი.' +
  'ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძლია ჩაწეროს საუბარი და რამდენიმე წამში მიიღოს წასაკითხი ტექსტი.' +
  'ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძლია ჩაწეროს საუბარი და რამდენიმე წამში მიიღოს წასაკითხი ტექსტი.' +
  'ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძლია ჩაწეროს საუბარი და რამდენიმე წამში მიიღოს წასაკითხი ტექსტი.' +
  'ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძლია ჩაწეროს საუბარი და რამდენიმე წამში მიიღოს წასაკითხი ტექსტი.' +
  'ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძლია ჩაწეროს საუბარი და რამდენიმე წამში მიიღოს წასაკითხი ტექსტი.' +
  'ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძლია ჩაწეროს საუბარი და რამდენიმე წამში მიიღოს წასაკითხი ტექსტი.' +
  'ტექნოლოგიები ყოველდღიურად იცვლება და ჩვენც მათთან ერთად ვვითარდებით. ზოგჯერ ერთი პატარა იდეაც კი შეიძლება გადაიქცეს' +
  'ქსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძლია ჩაწეროს საუბარი და რამდენიმე წამში მიიღოს წასაკითხი ტექსტი.' +
  'ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძლია ჩაწეროს საუბარი და რამდენიმე წამში მიიღოს წასაკითხი ტექსტი.' +
  'ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძლია ჩაწეროს საუბარი და რამდენიმე წამში მიიღოს წასაკითხი ტექსტი.' +
  'ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძლია ჩაწეროს საუბარი და რამდენიმე წამში მიიღოს წასაკითხი ტექსტი.' +
  'ტრანსკრიფციის სერვისი ' +
  'ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფ';

export default function HomeScreen({ navigation }: any) {
  const [isRecording, setIsRecording] = useState(false);
  const [hasTranscription, setHasTranscription] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;
  const recordingLoop = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (isRecording) {
      recordingLoop.current = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.15,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      recordingLoop.current.start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(waveAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: false,
          }),
          Animated.timing(waveAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: false,
          }),
        ])
      ).start();
    } else {
      if (recordingLoop.current) recordingLoop.current.stop();
      pulseAnim.setValue(1);
      waveAnim.setValue(0);
    }
  }, [isRecording]);

  const handleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      setHasTranscription(false);
      setTimeout(() => {
        setIsRecording(false);
        setHasTranscription(true);
      }, 3000);
    } else {
      setIsRecording(false);
      setHasTranscription(true);
    }
  };

  const waveHeights = [
    waveAnim.interpolate({ inputRange: [0, 1], outputRange: [12, 40] }),
    waveAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 60] }),
    waveAnim.interpolate({ inputRange: [0, 1], outputRange: [8, 30] }),
    waveAnim.interpolate({ inputRange: [0, 1], outputRange: [25, 55] }),
    waveAnim.interpolate({ inputRange: [0, 1], outputRange: [10, 45] }),
  ];

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>ხმა  ⇄  ტექსტი</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('History')} style={styles.menuBtn}>
          <Ionicons name="menu" size={26} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      {/* Action Buttons */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tabBtn, styles.tabBtnActive]}
          onPress={() => {}}
        >
          <View style={styles.tabBtnContent}>
            <Ionicons name="add" size={18} color="#FFFFFF" />
            <Text style={[styles.tabText, styles.tabTextActive]}>ახლის გახსნა</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabBtn}
          onPress={() => setShowSettings(true)}
        >
          <View style={styles.tabBtnContent}>
            <Ionicons name="settings-outline" size={18} color={COLORS.primary} />
            <Text style={styles.tabText}>პარამეტრები</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Content Area */}
      <View style={styles.contentArea}>
        {isRecording && (
          <View style={styles.waveContainer}>
            {waveHeights.map((h, i) => (
              <Animated.View
                key={i}
                style={[styles.waveBar, { height: h, backgroundColor: COLORS.primary }]}
              />
            ))}
          </View>
        )}

        {!hasTranscription && !isRecording ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyRow}>
              <Ionicons name="mic" size={22} color={COLORS.primary} />
              <Text style={styles.emptyText}>დაიწყე ჩაწერა...</Text>
            </View>
          </View>
        ) : (
          <ScrollView
            style={styles.transcriptionScroll}
            contentContainerStyle={styles.transcriptionContent}
            showsVerticalScrollIndicator={false}
          >
            {isRecording && (
              <View style={styles.recordingBadge}>
                <View style={styles.recordingDot} />
                <Text style={styles.recordingBadgeText}>ჩაწერა მიმდინარეობს...</Text>
              </View>
            )}
            <Text style={styles.transcriptionText}>{SAMPLE_TRANSCRIPTION}</Text>
          </ScrollView>
        )}
      </View>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="note-add" size={40} color="#767676" />
          <Text style={[styles.navLabel, { color: '#767676' }]}>აუდიო ფაილი</Text>
        </TouchableOpacity>

        <View style={styles.recordBtnWrapper}>
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <TouchableOpacity
              style={[styles.recordBtn, isRecording && styles.recordBtnActive]}
              onPress={handleRecord}
              activeOpacity={0.85}
            >
              <Ionicons
                name={isRecording ? 'stop' : 'mic'}
                size={32}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </Animated.View>
          <Text style={[styles.navLabel, { color: isRecording ? COLORS.recordRed : COLORS.textSecondary }]}>
            {isRecording ? 'გაჩერება' : 'ჩაწერა'}
          </Text>
        </View>

        <TouchableOpacity style={styles.navItem}>
          <FontAwesome5 name="youtube" size={28} color="#FF0000" />
          <Text style={styles.navLabel}>YouTube Link</Text>
        </TouchableOpacity>
      </View>

      <SettingsModal visible={showSettings} onClose={() => setShowSettings(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.text,
    fontFamily: 'BPG-Nino-Mtavruli',
  },
  menuBtn: {
    padding: 4,
  },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  tabBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tabBtnActive: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
    fontFamily: 'BPG-Nino-Mtavruli',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  contentArea: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  emptyState: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  emptyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  emptyText: {
    fontSize: 15,
    color: COLORS.textSecondary,
    fontWeight: '400',
    fontFamily: 'BPG-Nino-Mtavruli',
  },
  waveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  waveBar: {
    width: 4,
    borderRadius: 2,
  },
  transcriptionScroll: {
    flex: 1,
  },
  transcriptionContent: {
    padding: 16,
  },
  recordingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.recordRed,
  },
  recordingBadgeText: {
    fontSize: 12,
    color: COLORS.recordRed,
    fontWeight: '600',
    fontFamily: 'BPG-Nino-Mtavruli',
  },
  transcriptionText: {
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 24,
    fontFamily: 'BPG-Nino-Mtavruli',
  },
  bottomNav: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 20 : 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: '#FFFFFF',
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
    flex: 1,
    paddingBottom: 4,
  },
  navLabel: {
    fontSize: 10,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 2,
    fontFamily: 'BPG-Nino-Mtavruli',
  },
  recordBtnWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  recordBtn: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#4BA3F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordBtnActive: {
    backgroundColor: COLORS.recordRed,
  },

});

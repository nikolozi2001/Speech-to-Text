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
  primary: '#2563EB',
  primaryLight: '#EFF6FF',
  bg: '#FFFFFF',
  text: '#111827',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  navBg: '#F9FAFB',
  recordRed: '#EF4444',
};

const SAMPLE_TRANSCRIPTION =
  'საქართველოს მთავრობამ დღეს განაცხადა, რომ ახალი ეკონომიკური პაკეტი მომავალ კვირას განიხილება. ' +
  'ეს გადაწყვეტილება ქვეყნის ეკონომიკური განვითარების ხელშეწყობას ისახავს მიზნად. ' +
  'ფინანსთა სამინისტრომ აღნიშნა, რომ ბიუჯეტის გეგმა სრულად შეესაბამება საერთაშორისო სტანდარტებს. ' +
  'ექსპერტები მიიჩნევენ, რომ ეს ნაბიჯი მნიშვნელოვანი იქნება ბიზნეს გარემოს გასაუმჯობესებლად. ' +
  'ამასთანავე, ინვესტიციების მოზიდვის ახალი პრობლემა კვლავ განხილვის საგანია. ' +
  'მოქალაქეები ელოდებიან კონკრეტული ნაბიჯების განხორციელებას უახლოეს მომავალში.';

export default function HomeScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'history'
  const [isRecording, setIsRecording] = useState(false);
  const [hasTranscription, setHasTranscription] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);

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
          <Ionicons name="mic" size={20} color={COLORS.primary} />
          <Text style={styles.headerTitle}>  ბი ო ვარება</Text>
        </View>
        <TouchableOpacity onPress={() => setShowSideMenu(!showSideMenu)} style={styles.menuBtn}>
          <Ionicons name="menu" size={26} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      {/* Side menu overlay */}
      {showSideMenu && (
        <TouchableOpacity
          style={styles.sideMenuOverlay}
          activeOpacity={1}
          onPress={() => setShowSideMenu(false)}
        >
          <View style={styles.sideMenu}>
            <Text style={styles.sideMenuTitle}>მენიუ</Text>
            <TouchableOpacity
              style={styles.sideMenuItem}
              onPress={() => { setShowSideMenu(false); navigation.navigate('History'); }}
            >
              <Ionicons name="time-outline" size={20} color={COLORS.primary} />
              <Text style={styles.sideMenuText}>ისტორია</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sideMenuItem}
              onPress={() => { setShowSideMenu(false); setShowSettings(true); }}
            >
              <Ionicons name="settings-outline" size={20} color={COLORS.primary} />
              <Text style={styles.sideMenuText}>პარამეტრები</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}

      {/* Tab Buttons */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'active' && styles.tabBtnActive]}
          onPress={() => setActiveTab('active')}
        >
          <Text style={[styles.tabText, activeTab === 'active' && styles.tabTextActive]}>
            აქტიური ჩანაწერი
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'history' && styles.tabBtnActive]}
          onPress={() => { setActiveTab('history'); navigation.navigate('History'); }}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.tabTextActive]}>
            გასაადმინება
          </Text>
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
            <Ionicons name="mic-outline" size={64} color={COLORS.border} />
            <Text style={styles.emptyText}>მეტყველება...</Text>
            <Text style={styles.emptyHint}>
              ჩასაწერად დააჭირეთ ქვემოთ მოცემულ ღილაკს
            </Text>
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
          <Ionicons name="library-outline" size={22} color={COLORS.textSecondary} />
          <Text style={styles.navLabel}>ბიბლიოთეკა</Text>
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
          <FontAwesome5 name="youtube" size={22} color={COLORS.textSecondary} />
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
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  tabBtnActive: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  contentArea: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 20,
    color: COLORS.textSecondary,
    marginTop: 16,
    fontWeight: '500',
  },
  emptyHint: {
    fontSize: 13,
    color: COLORS.border,
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 20,
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
  },
  transcriptionText: {
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 24,
  },
  bottomNav: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 20 : 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.navBg,
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
  },
  recordBtnWrapper: {
    alignItems: 'center',
    flex: 1,
    marginTop: -20,
  },
  recordBtn: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  recordBtnActive: {
    backgroundColor: COLORS.recordRed,
    shadowColor: COLORS.recordRed,
  },
  sideMenuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
  sideMenu: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 220,
    height: '100%',
    backgroundColor: COLORS.bg,
    paddingTop: 60,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: -4, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.border,
  },
  sideMenuTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 24,
  },
  sideMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sideMenuText: {
    fontSize: 15,
    color: COLORS.text,
    fontWeight: '500',
  },
});

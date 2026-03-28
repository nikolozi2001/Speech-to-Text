import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Toast, { ToastType } from '../components/Toast';

const flagGeoImage = require('../assets/images/flag_geo.png');

const COLORS = {
  bg: '#F0F0F0',
  blue: '#2FA2FE',
  black: '#000000',
  white: '#FFFFFF',
  overlay: '#15151599',
  green: '#3AD2A7',
  gray: '#949494',
  yellowLight: '#EBEB80',
  gold: '#FED533',
};

const HISTORY_DATA = [
  {
    group: 'დღეს',
    items: [
      {
        id: '1',
        text: 'ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძ...',
      },
      {
        id: '2',
        text: 'ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძ...',
      },
    ],
  },
  {
    group: 'გუშინ',
    items: [
      {
        id: '3',
        text: 'ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძ...',
      },
      {
        id: '4',
        text: 'ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძ...',
      },
    ],
  },
  {
    group: '11 მარტი',
    items: [
      {
        id: '5',
        text: 'ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძ...',
      },
      {
        id: '6',
        text: 'ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძ...',
      },
    ],
  },
  {
    group: 'დღეს',
    items: [
      {
        id: '7',
        text: 'ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძ...',
      },
      {
        id: '8',
        text: 'ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძ...',
      },
    ],
  },
  {
    group: 'გუშინ',
    items: [
      {
        id: '9',
        text: 'ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძ...',
      },
    ],
  },
];

interface HistoryItemData {
  id: string;
  text: string;
}

function HistoryItem({ item, onDelete }: { item: HistoryItemData; onDelete: (id: string) => void }) {
  return (
    <View style={styles.card}>
      <MaterialCommunityIcons name="pencil-outline" size={22} color={COLORS.blue} style={styles.editIcon} />
      <Text style={styles.cardText} numberOfLines={2}>{item.text}</Text>
      <TouchableOpacity onPress={() => onDelete(item.id)} hitSlop={8}>
        <Ionicons name="trash-outline" size={22} color={COLORS.gray} />
      </TouchableOpacity>
    </View>
  );
}

export default function HistoryScreen({ navigation }: any) {
  const [toast, setToast] = useState<{ visible: boolean; type: ToastType; text1: string; text2?: string }>({
    visible: false, type: 'info', text1: '',
  });

  const showToast = (type: ToastType, text1: string, text2?: string) =>
    setToast({ visible: true, type, text1, text2 });

  const handleDelete = (id: string) => {
    showToast('error', 'წაშლა', 'ჩანაწერი წაიშალა');
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Toast */}
      <Toast
        visible={toast.visible}
        type={toast.type}
        text1={toast.text1}
        text2={toast.text2}
        onHide={() => setToast(t => ({ ...t, visible: false }))}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color={COLORS.black} />
        </TouchableOpacity>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>A</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.headerEmail}>achi.teruashvili777@gmail.com</Text>
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumText}>პრემიუმი</Text>
            <Text style={styles.premiumStar}>⭐</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.langBtn}
          onPress={() => showToast('info', 'ენა', 'ენის არჩევა მალე დაემატება')}
        >
          <Image source={flagGeoImage} style={{ width: 32, height: 32 }} />
          <Ionicons name="chevron-down" size={14} color={COLORS.black} style={styles.flagChevron} />
        </TouchableOpacity>
      </View>

      {/* List */}
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {HISTORY_DATA.map((section, sIdx) => (
          <View key={`${section.group}-${sIdx}`} style={styles.section}>
            <Text style={styles.groupLabel}>{section.group}</Text>
            {section.items.map((item) => (
              <HistoryItem key={item.id} item={item} onDelete={handleDelete} />
            ))}
          </View>
        ))}
        <View style={{ height: 32 }} />
      </ScrollView>
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
  },
  backBtn: {
    marginRight: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.yellowLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.black,
  },
  headerInfo: {
    flex: 1,
  },
  headerEmail: {
    fontSize: 14,
    color: COLORS.black,
    fontWeight: '500',
    fontFamily: 'BPG-Nino-Mtavruli',
  },
  langBtn: {
    marginLeft: 8,
    padding: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagChevron: {
    marginLeft: 2,
    marginTop: 2,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: COLORS.green,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 4,
    gap: 4,
  },
  premiumText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.white,
    fontFamily: 'BPG-Nino-Mtavruli',
  },
  premiumStar: {
    fontSize: 10,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  section: {
    marginBottom: 8,
  },
  groupLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.gray,
    marginBottom: 8,
    marginTop: 8,
    fontFamily: 'BPG-Nino-Mtavruli',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.blue,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 10,
  },
  editIcon: {
    marginRight: 12,
  },
  cardText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.black,
    lineHeight: 20,
    marginRight: 10,
    fontFamily: 'BPG-Nino-Mtavruli',
  },
});

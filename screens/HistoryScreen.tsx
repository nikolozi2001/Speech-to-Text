import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Toast, { ToastType } from '../components/Toast';
import { SvgXml } from 'react-native-svg';

const FLAG_GEO_SVG = `<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.5 23C17.8513 23 23 17.8513 23 11.5C23 5.14873 17.8513 0 11.5 0C5.14873 0 0 5.14873 0 11.5C0 17.8513 5.14873 23 11.5 23Z" fill="#F0F0F0"/>
<path d="M22.9027 10H13.0001H13V0.0973457C12.509 0.0334219 12.0084 0 11.5 0C10.9916 0 10.491 0.0334219 10 0.0973457V9.99992V9.99997H0.0973457C0.0334219 10.491 0 10.9916 0 11.5C0 12.0085 0.0334219 12.509 0.0973457 13H9.99992H9.99997V22.9027C10.491 22.9666 10.9916 23 11.5 23C12.0084 23 12.509 22.9666 13 22.9027V13.0001V13H22.9027C22.9666 12.509 23 12.0085 23 11.5C23 10.9916 22.9666 10.491 22.9027 10Z" fill="#D80027"/>
<path d="M6.9566 5.39507V3.83331H5.39489V5.39507H3.83313V6.95679H5.39489V8.5185H6.9566V6.95679H8.51831V5.39507H6.9566Z" fill="#D80027"/>
<path d="M17.6051 5.39507V3.83331H16.0434V5.39507H14.4817V6.95679H16.0434V8.5185H17.6051V6.95679H19.1669V5.39507H17.6051Z" fill="#D80027"/>
<path d="M6.9566 16.0432V14.4814H5.39489V16.0432H3.83313V17.6049H5.39489V19.1666H6.9566V17.6049H8.51831V16.0432H6.9566Z" fill="#D80027"/>
<path d="M17.6051 16.0432V14.4814H16.0434V16.0432H14.4817V17.6049H16.0434V19.1666H17.6051V17.6049H19.1669V16.0432H17.6051Z" fill="#D80027"/>
</svg>`;

function GeorgianFlag({ size = 32 }: { size?: number }) {
  return <SvgXml xml={FLAG_GEO_SVG} width={size} height={size} />;
}

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
          <GeorgianFlag size={32} />
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
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
  primary: '#2563EB',
  primaryLight: '#EFF6FF',
  bg: '#FFFFFF',
  text: '#111827',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  groupLabel: '#9CA3AF',
  itemBg: '#F9FAFB',
};

const HISTORY_DATA = [
  {
    group: 'დღეს',
    items: [
      {
        id: '1',
        text: 'საქართველოს მთავრობამ დღეს განაცხადა, რომ ახალი ეკონომიკური პაკეტი მომავალ კვირას განიხილება. ეს გადაწყვეტილება ქვეყნის ეკონომიკური განვითარების ხელშეწყობას ისახავს მიზნად.',
        time: '14:32',
        duration: '0:48',
      },
      {
        id: '2',
        text: 'ფინანსთა სამინისტრომ აღნიშნა, რომ ბიუჯეტის გეგმა სრულად შეესაბამება საერთაშორისო სტანდარტებს. ექსპერტები მიიჩნევენ, რომ ეს ნაბიჯი მნიშვნელოვანი იქნება.',
        time: '11:15',
        duration: '1:02',
      },
    ],
  },
  {
    group: 'გუშინ',
    items: [
      {
        id: '3',
        text: 'ინვესტიციების მოზიდვის ახალი პრობლემა კვლავ განხილვის საგანია. მოქალაქეები ელოდებიან კონკრეტული ნაბიჯების განხორციელებას უახლოეს მომავალში.',
        time: '18:44',
        duration: '2:15',
      },
      {
        id: '4',
        text: 'ტბილისში გაიმართა საერთაშორისო კონფერენცია, რომელსაც 30-ზე მეტი ქვეყნის წარმომადგენელი დაესწრო.',
        time: '15:20',
        duration: '0:35',
      },
      {
        id: '5',
        text: 'ახალი ტექნოლოგიური სტარტაპი პრეზენტაციას მართავს. პროდუქტი მომხმარებლებს კომუნიკაციის ახალ შესაძლებლობებს სთავაზობს.',
        time: '10:05',
        duration: '1:28',
      },
    ],
  },
  {
    group: '22 მარტი',
    items: [
      {
        id: '6',
        text: 'სპორტის სამინისტრომ განაცხადა ახალი ეროვნული პროგრამის შესახებ, რომელიც ახალგაზრდა სპორტსმენების განვითარებას ხელს შეუწყობს.',
        time: '20:10',
        duration: '3:00',
      },
    ],
  },
];

interface HistoryItemData {
  id: string;
  text: string;
  time: string;
  duration: string;
}

function HistoryItem({ item, onCopy }: { item: HistoryItemData; onCopy: (text: string) => void }) {
  const preview = item.text.length > 100 ? item.text.slice(0, 100) + '...' : item.text;
  return (
    <View style={styles.item}>
      <View style={styles.itemContent}>
        <Text style={styles.itemText}>{preview}</Text>
        <View style={styles.itemMeta}>
          <Ionicons name="time-outline" size={12} color={COLORS.groupLabel} />
          <Text style={styles.metaText}>{item.time}</Text>
          <Ionicons name="mic-outline" size={12} color={COLORS.groupLabel} />
          <Text style={styles.metaText}>{item.duration}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.copyBtn} onPress={() => onCopy(item.text)}>
        <Ionicons name="copy-outline" size={18} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
}

export default function HistoryScreen({ navigation }: any) {
  const handleCopy = (text: string) => {
    Alert.alert('კოპირებულია', 'ტექსტი ბუფერში დაკოპირდა.');
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerEmail}>achibiladze8777@gmail.com</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add" size={26} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Search bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={16} color={COLORS.groupLabel} />
        <Text style={styles.searchPlaceholder}>ძიება ისტორიაში...</Text>
      </View>

      {/* List */}
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {HISTORY_DATA.map((section) => (
          <View key={section.group} style={styles.section}>
            <Text style={styles.groupLabel}>{section.group.toUpperCase()}</Text>
            <View style={styles.itemsCard}>
              {section.items.map((item, idx) => (
                <View key={item.id}>
                  <HistoryItem item={item} onCopy={handleCopy} />
                  {idx < section.items.length - 1 && <View style={styles.divider} />}
                </View>
              ))}
            </View>
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
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: {
    padding: 4,
    marginRight: 8,
  },
  headerEmail: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
    textAlign: 'center',
  },
  addBtn: {
    padding: 4,
    marginLeft: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 16,
    marginVertical: 10,
    backgroundColor: COLORS.itemBg,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchPlaceholder: {
    fontSize: 14,
    color: COLORS.groupLabel,
  },
  scroll: {
    flex: 1,
  },
  section: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  groupLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.groupLabel,
    letterSpacing: 1,
    marginBottom: 8,
    marginLeft: 4,
  },
  itemsCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.bg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  itemContent: {
    flex: 1,
    marginRight: 10,
  },
  itemText: {
    fontSize: 13,
    color: COLORS.text,
    lineHeight: 20,
    marginBottom: 6,
  },
  itemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 11,
    color: COLORS.groupLabel,
    marginRight: 6,
  },
  copyBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginLeft: 14,
  },
});

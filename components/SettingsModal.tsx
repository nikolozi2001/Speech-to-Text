import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

const COLORS = {
  primary: "#2079C0",
  primaryLight: "#E0F1FF",
  activeBorder: "#3F85DF",
  border: "#434343",
  text: "#000000",
  textSecondary: "#434343",
  bg: "#FFFFFF",
  overlay: "#747373BA",
  checkInactive: "rgba(72, 72, 72, 0.35)",
};

function SelectField({
  options,
  value,
  onChange,
  searchable = false,
}: {
  options: string[];
  value: string;
  onChange: (val: string) => void;
  searchable?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered =
    searchable && search
      ? options.filter((opt) =>
          opt.toLowerCase().includes(search.toLowerCase())
        )
      : options;

  return (
    <View style={styles.fieldWrapper}>
      <TouchableOpacity
        style={[
          styles.selectBox,
          open && styles.selectBoxOpen,
        ]}
        onPress={() => {
          setOpen(!open);
          setSearch("");
        }}
      >
        <Text style={styles.selectText}>{value}</Text>
        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={14}
          color={open ? COLORS.activeBorder : COLORS.border}
        />
      </TouchableOpacity>
      {open && (
        <View style={styles.dropdown}>
          {searchable && (
            <View style={styles.searchWrapper}>
              <View style={styles.searchRow}>
                <Ionicons name="search" size={14} color="#949494" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="ძიება"
                  placeholderTextColor="rgba(67, 67, 67, 0.59)"
                  value={search}
                  onChangeText={setSearch}
                  autoFocus={false}
                />
              </View>
            </View>
          )}
          <ScrollView
            style={searchable ? styles.dropdownScroll : undefined}
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
          >
            {filtered.map((opt) => (
              <TouchableOpacity
                key={opt}
                style={styles.dropdownItem}
                onPress={() => {
                  onChange(opt);
                  setOpen(false);
                  setSearch("");
                }}
              >
                <Text style={styles.dropdownText}>{opt}</Text>
              </TouchableOpacity>
            ))}
            {filtered.length === 0 && (
              <View style={styles.dropdownItem}>
                <Text
                  style={[
                    styles.dropdownText,
                    { color: "rgba(67, 67, 67, 0.59)" },
                  ]}
                >
                  ვერ მოიძებნა
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

function CheckOption({
  label,
  checked,
  onPress,
}: {
  label: string;
  checked: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.checkOption} onPress={onPress}>
      <View
        style={[
          styles.checkCircle,
          { backgroundColor: checked ? COLORS.primary : COLORS.checkInactive },
        ]}
      >
        {checked && (
          <Ionicons name="checkmark" size={14} color="#FFFFFF" />
        )}
      </View>
      <Text style={styles.checkLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function SettingsModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const [language, setLanguage] = useState("ქართული");
  const [model, setModel] = useState("მოსაუბრის გამოყოფა");
  const [sttProvider, setSttProvider] = useState("STT1");
  const [outputFormat, setOutputFormat] = useState("მიკროფონი");
  const [punctuation, setPunctuation] = useState(true);
  const [autoCorrect, setAutoCorrect] = useState(false);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <StatusBar style="light" translucent />
      <View style={styles.modalContainer}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

        <View style={styles.sheet}>
        <View style={styles.handle} />

        <ScrollView showsVerticalScrollIndicator={false}>
          <SelectField
            searchable
            options={[
              "ქართული",
              "ინგლისური",
              "რუსული",
              "გერმანული",
              "ფრანგული",
              "იაპონური",
              "არაბული",
              "ნიდერლანდური",
              "ბერძნული",
              "შვედური",
              "ფინური",
              "ნორვეგიული",
              "ინდონეზიური",
              "ჩეხური",
              "დანიური",
              "უნგრული",
              "იტალიური",
              "ესპანური",
              "უკრაინული",
              "პოლონური",
              "კორეული",
              "ვიეტნამური",
              "პორტუგალიური",
              "თურქული",
              "სომხური",
              "ტაი",
              "რუმინული",
              "ჩინური",
              "ჰინდი",
            ]}
            value={language}
            onChange={setLanguage}
          />

          <SelectField
            options={["მოსაუბრის გამოყოფა", "მოსაუბრის არ გამოყოფა"]}
            value={model}
            onChange={setModel}
          />

          <SelectField
            options={["STT1", "STT2", "STT3"]}
            value={sttProvider}
            onChange={setSttProvider}
          />

          <SelectField
            options={["მიკროფონი", "სისტემის ხმა"]}
            value={outputFormat}
            onChange={setOutputFormat}
          />

          <View style={styles.checkRow}>
            <CheckOption
              label="პუნქტუაცია"
              checked={punctuation}
              onPress={() => setPunctuation(!punctuation)}
            />
            <CheckOption
              label="ავტოკორექტი"
              checked={autoCorrect}
              onPress={() => setAutoCorrect(!autoCorrect)}
            />
          </View>
        </ScrollView>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
            <Text style={styles.cancelText}>გაუქმება</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveBtn} onPress={onClose}>
            <Text style={styles.saveText}>დამახსოვრება</Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.overlay,
  },
  overlay: {
    flex: 1,
  },
  sheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.bg,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
    maxHeight: "55%",
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#D9D9D9",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
  },
  fieldWrapper: {
    marginBottom: 12,
    zIndex: 1,
  },
  selectBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: COLORS.border,
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 35,
    backgroundColor: COLORS.bg,
  },
  selectBoxOpen: {
    borderColor: COLORS.activeBorder,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  selectText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontFamily: "BPG-Nino-Mtavruli",
  },
  dropdown: {
    borderWidth: 0.5,
    borderTopWidth: 0,
    borderColor: COLORS.border,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: COLORS.bg,
    zIndex: 100,
  },
  searchWrapper: {
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 6,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "rgba(67, 67, 67, 0.32)",
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 30,
    gap: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: COLORS.text,
    fontFamily: "BPG-Nino-Mtavruli",
    paddingVertical: 0,
  },
  dropdownScroll: {
    maxHeight: 160,
  },
  dropdownItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  dropdownText: {
    fontSize: 11,
    color: COLORS.text,
    fontFamily: "BPG-Nino-Mtavruli",
    lineHeight: 13,
  },
  checkRow: {
    flexDirection: "row",
    marginBottom: 12,
    gap: 80,
  },
  checkOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  checkLabel: {
    fontSize: 12,
    color: COLORS.text,
    fontFamily: "BPG-Nino-Mtavruli",
  },
  actions: {
    flexDirection: "row",
    gap: 15,
    marginTop: 20,
  },
  cancelBtn: {
    flex: 1,
    height: 44,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelText: {
    color: COLORS.primary,
    fontSize: 17,
    fontFamily: "BPG-Nino-Mtavruli",
    textAlign: "center",
    lineHeight: 22,
  },
  saveBtn: {
    flex: 1,
    height: 44,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  saveText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontFamily: "BPG-Nino-Mtavruli",
    textAlign: "center",
    lineHeight: 22,
  },
});

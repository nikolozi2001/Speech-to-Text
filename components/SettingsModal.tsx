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

const COLORS = {
  primary: "#2563EB",
  border: "#D1D5DB",
  text: "#111827",
  textSecondary: "#6B7280",
  bg: "#FFFFFF",
  inputBg: "#F9FAFB",
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

  const filtered = searchable && search
    ? options.filter((opt) => opt.toLowerCase().includes(search.toLowerCase()))
    : options;

  return (
    <View style={styles.fieldWrapper}>
      <TouchableOpacity style={styles.selectBox} onPress={() => { setOpen(!open); setSearch(""); }}>
        <Text style={styles.selectText}>{value}</Text>
        <Text style={styles.arrow}>{open ? "▲" : "▼"}</Text>
      </TouchableOpacity>
      {open && (
        <View style={styles.dropdown}>
          {searchable && (
            <View style={styles.searchWrapper}>
              <TextInput
                style={styles.searchInput}
                placeholder="ძიება"
                placeholderTextColor={COLORS.textSecondary}
                value={search}
                onChangeText={setSearch}
                autoFocus={false}
              />
            </View>
          )}
          <ScrollView style={searchable ? styles.dropdownScroll : undefined} nestedScrollEnabled>
            {filtered.map((opt) => (
              <TouchableOpacity
                key={opt}
                style={[
                  styles.dropdownItem,
                  value === opt && styles.dropdownItemActive,
                ]}
                onPress={() => {
                  onChange(opt);
                  setOpen(false);
                  setSearch("");
                }}
              >
                <Text
                  style={[
                    styles.dropdownText,
                    value === opt && styles.dropdownTextActive,
                  ]}
                >
                  {opt}
                </Text>
              </TouchableOpacity>
            ))}
            {filtered.length === 0 && (
              <View style={styles.dropdownItem}>
                <Text style={[styles.dropdownText, { color: COLORS.textSecondary }]}>
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
  const [punctuation, setPunctuation] = useState("პუნქტუაცია");

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
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

          <View style={styles.fieldWrapper}>
            <View style={styles.radioRow}>
              {["პუნქტუაცია", "აუტოკორექტი"].map((opt) => (
                <TouchableOpacity
                  key={opt}
                  style={styles.radioOption}
                  onPress={() => setPunctuation(opt)}
                >
                  <View style={styles.radioCircle}>
                    {punctuation === opt && <View style={styles.radioDot} />}
                  </View>
                  <Text style={styles.radioLabel}>{opt}</Text>
                </TouchableOpacity>
              ))}
            </View>
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
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  sheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.bg,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
    maxHeight: "80%",
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 20,
    textAlign: "center",
  },
  fieldWrapper: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 6,
    fontWeight: "500",
  },
  selectBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: COLORS.inputBg,
  },
  selectText: {
    fontSize: 14,
    color: COLORS.text,
  },
  arrow: {
    fontSize: 10,
    color: COLORS.textSecondary,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    marginTop: 4,
    backgroundColor: COLORS.bg,
    zIndex: 100,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchWrapper: {
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 4,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    color: COLORS.text,
    backgroundColor: COLORS.inputBg,
  },
  dropdownScroll: {
    maxHeight: 200,
  },
  dropdownItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  dropdownItemActive: {
    backgroundColor: "#EFF6FF",
  },
  dropdownText: {
    fontSize: 14,
    color: COLORS.text,
  },
  dropdownTextActive: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  radioRow: {
    flexDirection: "row",
    gap: 24,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  radioLabel: {
    fontSize: 14,
    color: COLORS.text,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
  cancelBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: "center",
  },
  cancelText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: "600",
  },
  saveBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: "center",
  },
  saveText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
});

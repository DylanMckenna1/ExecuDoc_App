import React, { useMemo, useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

export default function Assistant({ navigation }) {
  const [command, setCommand] = useState("");

  const styles = useMemo(
    () => ({
      container: { flex: 1, backgroundColor: "#fff" },
      inner: { paddingHorizontal: 16, paddingTop: 14 },
      title: { fontSize: 28, fontWeight: "800", color: "#0F172A" },
      subtitle: { marginTop: 6, color: "#64748B", lineHeight: 20 },
      card: {
        marginTop: 14,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 14,
        padding: 14,
        backgroundColor: "#F8FAFC",
      },
      input: {
        borderWidth: 1,
        borderColor: "#CBD5E1",
        backgroundColor: "#fff",
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 12,
        marginTop: 10,
        fontSize: 16,
      },
      row: { flexDirection: "row", gap: 10, marginTop: 12, flexWrap: "wrap" },
      btn: {
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 12,
        backgroundColor: "#4F46E5",
      },
      btnAlt: {
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 12,
        backgroundColor: "#0F172A",
      },
      btnText: { color: "#fff", fontWeight: "800" },
      quickTitle: { fontWeight: "800", color: "#0F172A" },
      hint: { marginTop: 8, color: "#64748B", lineHeight: 20 },
      chip: {
        marginTop: 10,
        alignSelf: "flex-start",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        backgroundColor: "#fff",
      },
      chipText: { color: "#0F172A", fontWeight: "700" },
    }),
    []
  );

  const runCommand = () => {
    const c = (command || "").trim().toLowerCase();
    if (!c) {
      Alert.alert("Assistant", "Type a command first (e.g. “open library”).");
      return;
    }

    // navigation 
    if (c.includes("library") || c.includes("saved")) {
      navigation.navigate("Library");
      return;
    }
    if (c.includes("document") || c.includes("upload") || c.includes("files")) {
      navigation.navigate("Documents");
      return;
    }
    if (c.includes("profile") || c.includes("account") || c.includes("settings")) {
      navigation.navigate("Profile");
      return;
    }
    if (c.includes("home")) {
      navigation.navigate("Home");
      return;
    }

    if (c.includes("summaris") || c.includes("summariz") || c.includes("listen")) {
      navigation.navigate("Documents");
      Alert.alert(
        "Assistant (next step)",
        "For now I brought you to Documents. Next implementation: make Assistant trigger Summarise/Listen automatically using your existing cached functions."
      );
      return;
    }

    Alert.alert(
      "Assistant",
      "Try: “open library”, “go to documents”, “open profile”, or “home”."
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Assistant</Text>
        <Text style={styles.subtitle}>
          Type a command and I’ll take you to the right place. (Safe mode: no AI calls yet.)
        </Text>

        <View style={styles.card}>
          <Text style={styles.quickTitle}>Command</Text>
          <TextInput
            value={command}
            onChangeText={setCommand}
            placeholder='e.g. "open library"'
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="go"
            onSubmitEditing={runCommand}
          />

          <View style={styles.row}>
            <TouchableOpacity style={styles.btn} onPress={runCommand}>
              <Text style={styles.btnText}>Run</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnAlt} onPress={() => setCommand("")}>
              <Text style={styles.btnText}>Clear</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.hint}>
            Quick actions:
          </Text>

          <View style={styles.row}>
            <TouchableOpacity style={styles.chip} onPress={() => navigation.navigate("Documents")}>
              <Text style={styles.chipText}>Go to Documents</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.chip} onPress={() => navigation.navigate("Library")}>
              <Text style={styles.chipText}>Open Library</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.chip} onPress={() => navigation.navigate("Profile")}>
              <Text style={styles.chipText}>Open Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.chip} onPress={() => navigation.navigate("Home")}>
              <Text style={styles.chipText}>Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
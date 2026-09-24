import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/theme/ThemeContext";
import { AppHeader } from "@/components/common/Header";
import { createStyles } from "./styles";
import { SyncContentProps } from "./types";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { ArrowRight } from "lucide-react-native";

export function SyncContent({ state, action }: SyncContentProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top", "bottom", "left", "right"]}
    >
      <AppHeader onBack={action.onBack} title="SYNC Your Today's Activity" />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ── Main section ── */}
          <View style={styles.mainSection}>
            {/* Last synced info */}
            <View style={styles.syncInfoBlock}>
              <Text style={styles.syncInfoLabel}>LAST SYNCED AT</Text>
              <Text style={styles.syncInfoValue}>{state.lastSyncedAt}</Text>
            </View>

            {/* ── Credential form ── */}
            <View style={styles.formGroup}>
              {/* Username */}
              <View style={styles.inputContainer}>
                <Text style={styles.fieldLabel}>USERNAME</Text>
                <View
                  style={[
                    styles.inputWrapper,
                    state.usernameError
                      ? styles.inputWrapperError
                      : styles.inputWrapperNormal,
                  ]}
                >
                  <TextInput
                    style={styles.input}
                    value={state.username}
                    onChangeText={action.setUsername}
                    placeholder="admin"
                    placeholderTextColor={theme.colors.textSecondary + "80"}
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!state.isLoading}
                  />
                </View>
                {state.usernameError ? (
                  <Text style={styles.fieldErrorText}>
                    {state.usernameError}
                  </Text>
                ) : null}
              </View>

              {/* Password */}
              <View style={styles.inputContainer}>
                <Text style={styles.fieldLabel}>PASSWORD</Text>
                <View
                  style={[
                    styles.inputWrapper,
                    state.passwordError
                      ? styles.inputWrapperError
                      : styles.inputWrapperNormal,
                  ]}
                >
                  <TextInput
                    style={styles.input}
                    value={state.password}
                    onChangeText={action.setPassword}
                    placeholder="••••••••"
                    placeholderTextColor={theme.colors.textSecondary + "80"}
                    secureTextEntry={!state.showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!state.isLoading}
                  />
                  <Pressable
                    onPress={() => action.setShowPassword((prev) => !prev)}
                    style={styles.showToggle}
                    hitSlop={8}
                    disabled={state.isLoading}
                  >
                    <Text style={styles.showToggleText}>
                      {state.showPassword ? "HIDE" : "SHOW"}
                    </Text>
                  </Pressable>
                </View>
                {state.passwordError ? (
                  <Text style={styles.fieldErrorText}>
                    {state.passwordError}
                  </Text>
                ) : null}
              </View>
            </View>

            {/* ── Stay-on-screen notice ── */}
            <Text style={styles.warningText}>
              <Text style={styles.warningAsterisk}>* </Text>
              Please stay on this screen when the data is being synced to the
              server
              <Text style={styles.warningAsterisk}> *</Text>
            </Text>
          </View>

          {/* ── Bottom section ── */}
          <View style={styles.bottomSection}>
            <View style={styles.bottomDivider} />

            <Pressable
              style={[
                styles.proceedButton,
                state.isLoading && styles.proceedButtonDisabled,
              ]}
              onPress={action.onProceedToSync}
              disabled={state.isLoading}
            >
              {state.isLoading ? (
                <ActivityIndicator
                  color={theme.colors.onPrimary}
                  size="small"
                />
              ) : (
                <View style={styles.buttonInner}>
                  <Text style={styles.proceedButtonText}>PROCEED TO SYNC</Text>
                  <ArrowRight size={20} color={theme.colors.onPrimary} />
                </View>
              )}
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

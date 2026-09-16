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
import { SignInContentProps } from "./types";
import { createStyles } from "./styles";
import { ServerSetup } from "@/components/signin/ServerSetup";

export function SignInContent({ state, action }: SignInContentProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top", "bottom", "left", "right"]}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Top Main Section */}
          <View style={styles.mainSection}>
            {/* RMS · KOT Header */}
            <Text style={styles.brandTag}>RMS · KOT</Text>

            {/* Divider line */}
            <View style={[styles.topDivider]} />

            {/* Screen Title */}
            <Text style={styles.title}>{"Sign\nin"}</Text>

            {/* Subtitle / Terminal info */}
            <Text style={styles.subtitle}>
              Terminal 04 · Division 01 · connected to 103.94.159.121
            </Text>

            {/* General Error Banner */}
            {state.error ? (
              <View style={styles.errorBanner}>
                <Text style={styles.errorBannerText}>{state.error}</Text>
              </View>
            ) : null}

            {/* Form Fields */}
            <View style={styles.formGroup}>
              {/* Username Input */}
              <View style={styles.inputContainer}>
                <Text style={[styles.fieldLabel]}>USERNAME</Text>
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
                    placeholder="sushant.k"
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

              {/* Password Input */}
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
                    style={[styles.input, { color: theme.colors.text }]}
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

              {/* Remember Terminal Checkbox */}
              <Pressable
                style={styles.checkboxRow}
                onPress={() => action.setRememberTerminal((prev) => !prev)}
                disabled={state.isLoading}
                hitSlop={4}
              >
                <View
                  style={[
                    styles.checkbox,
                    state.rememberTerminal
                      ? styles.checkboxChecked
                      : styles.checkboxUnchecked,
                  ]}
                >
                  {state.rememberTerminal && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </View>
                <Text style={styles.checkboxLabel}>Remember this terminal</Text>
              </Pressable>
            </View>
          </View>

          {/* Bottom Footer Section */}
          <View style={styles.bottomSection}>
            {/* Top Border for Footer */}
            <View style={styles.bottomDivider} />

            {/* Log In Action Button */}
            <Pressable
              style={[
                styles.submitButton,
                state.isLoading && styles.submitButtonDisabled,
              ]}
              onPress={action.handleSignIn}
              disabled={state.isLoading}
            >
              {state.isLoading ? (
                <ActivityIndicator
                  color={theme.colors.onPrimary}
                  size="small"
                />
              ) : (
                <View style={styles.buttonInner}>
                  <Text style={styles.submitButtonText}>LOG IN</Text>
                  <Text style={styles.buttonArrow}>→</Text>
                </View>
              )}
            </Pressable>

            {/* Footer metadata row */}
            <View style={styles.footerRow}>
              <Pressable
                hitSlop={6}
                disabled={state.isLoading}
                onPress={() => action.setOpenModal((prev) => !prev)}
              >
                <Text style={styles.serverSetupText}>SERVER SETUP</Text>
              </Pressable>
              <Text style={styles.versionText}>v31.0.9753</Text>
            </View>
          </View>

          {state.openModal && <ServerSetup state={state} action={action} />}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

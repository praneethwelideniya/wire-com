import { Colors } from "@/constants/Colors";
import React from "react";
import {
  View,
  Text,
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps,
  useColorScheme,
} from "react-native";

interface CustomTextInputProps extends TextInputProps {
  label: string;
  error?: string;
}

export const TextInput: React.FC<CustomTextInputProps> = ({
  label,
  error,
  ...props
}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
      <RNTextInput
        style={[
          styles.input,
          error ? styles.inputError : undefined,
          { color: theme.text },
        ]}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
});

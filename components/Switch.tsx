import {
  View,
  Text,
  Switch as RNSwitch,
  useColorScheme,
  StyleSheet,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

interface SwitchProps {
  value: boolean;
  setValue: (value: boolean) => void;
  label: string;
}

const Switch: React.FC<SwitchProps> = ({ value, setValue, label }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  return (
    <View style={styles.checkboxContainer}>
      <RNSwitch
        value={value}
        onValueChange={setValue}
        trackColor={{ false: theme.switchFalse }}
      />
      <Text style={[styles.checkboxLabel, { color: theme.text }]}>{label}</Text>
    </View>
  );
};

export default Switch;

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
  },
});

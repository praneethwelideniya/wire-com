import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface QuantityAdjusterProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  minQuantity?: number;
}

export const QuantityAdjuster: React.FC<QuantityAdjusterProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  minQuantity = 1,
}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onDecrease}
        disabled={quantity <= minQuantity}
        style={[
          styles.button,
          quantity <= minQuantity && styles.buttonDisabled,
        ]}
      >
        <Ionicons
          name="remove"
          size={24}
          color={quantity <= minQuantity ? "#CCCCCC" : theme.text}
        />
      </TouchableOpacity>
      <Text style={[styles.quantityText, { color: theme.text }]}>
        {quantity}
      </Text>
      <TouchableOpacity onPress={onIncrease} style={styles.button}>
        <Ionicons name="add" size={24} color={theme.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.light.primary,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  button: {
    padding: 10,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 15,
  },
});

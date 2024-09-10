import { Colors } from "@/constants/Colors";
import React from "react";
import { View, Text, StyleSheet, useColorScheme } from "react-native";

interface OrderSummaryProps {
  totalCost: string;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ totalCost }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  return (
    <View style={styles.container}>
      <Text style={styles.totalText}>Total:</Text>
      <Text style={styles.totalAmount}>${totalCost}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    padding: 15,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.light.primary,
  },
});

import { View, Text, StyleSheet } from "react-native";
import React from "react";

interface ReTryProps {
  error: string;
  refetch: () => void;
}

const ReTry = ({ error, refetch }: ReTryProps) => {
  return (
    <View style={styles.centerContainer}>
      <Text>Error: {error}</Text>
      <Text style={styles.retryText} onPress={refetch}>
        Tap to retry
      </Text>
    </View>
  );
};

export default ReTry;

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  retryText: {
    color: "blue",
    marginTop: 10,
  },
});

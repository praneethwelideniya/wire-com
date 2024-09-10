import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCartStore } from "@/store/cartStore";

interface CartButtonProps {
  containerStyle?: ViewStyle;
  iconSize?: number;
  iconColor?: string;
  badgeStyle?: ViewStyle;
  badgeTextStyle?: ViewStyle;
}

export const CartButton: React.FC<CartButtonProps> = ({
  containerStyle,
  iconSize = 24,
  iconColor = "white",
  badgeStyle,
  badgeTextStyle,
}) => {
  const router = useRouter();
  const itemCount = useCartStore((state) => state.getTotalItems());

  const handlePress = () => {
    router.push("/cart");
  };

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={handlePress}
    >
      <Ionicons name="cart" size={iconSize} color={iconColor} />
      {itemCount > 0 && (
        <View style={[styles.badge, badgeStyle]}>
          <Text style={[styles.badgeText, badgeTextStyle]}>{itemCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    right: -6,
    top: -3,
    backgroundColor: "red",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

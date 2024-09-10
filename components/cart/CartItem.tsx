import { QuantityAdjuster } from "@/components/product/QuantityAdjuster";
import { Colors } from "@/constants/Colors";
import { CartItem } from "@/types/Cart";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, useColorScheme, View } from "react-native";

interface CartElementProps {
  item: CartItem;
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onRemove: (id: string) => void;
  onEdit: (id: string) => void;
}

const CartElement: React.FC<CartElementProps> = ({
  item,
  onUpdateQuantity,
  onEdit,
  onRemove,
}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: item.mainImage }}
        style={styles.image}
        contentFit="cover"
      />
      <View style={styles.itemInfo}>
        <Text style={[styles.itemName, { color: theme.text }]}>
          {item.name}
        </Text>
        <Text style={{ color: theme.text }}>
          Size: {item.selectedSize || "N/A"}
        </Text>
        <FontAwesome5
          name="edit"
          size={20}
          color={theme.baseColor}
          onPress={() => onEdit(item.id)}
        />
        <Text style={styles.itemPrice}>
          {item.price.currency} {item.price.amount}
        </Text>
      </View>
      <View style={styles.itemActions}>
        <Feather
          name="trash-2"
          size={24}
          color={theme.baseColor}
          onPress={() => onRemove(item.id)}
          style={styles.removeButton}
        />

        <QuantityAdjuster
          quantity={item.quantity}
          onIncrease={() => onUpdateQuantity(item.id, item.quantity + 1)}
          onDecrease={() => onUpdateQuantity(item.id, item.quantity - 1)}
        />
      </View>
    </View>
  );
};

export default CartElement;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.light.primary,
    marginTop: 25,
  },
  removeButton: {
    alignSelf: "flex-end",
  },
  removeButtonText: {
    color: "#fff",
  },
  emptyCart: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
  },
  itemActions: {
    justifyContent: "space-between",
  },
  editButtonText: {
    color: "#fff",
    textAlign: "center",
  },
});

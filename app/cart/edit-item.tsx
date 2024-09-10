import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCartStore } from "@/store/cartStore";
import { ProductDetails } from "@/components/product/ProductDetails";
import { Colors } from "@/constants/Colors";

export default function EditCartItemModal() {
  const { itemId } = useLocalSearchParams();
  const router = useRouter();
  const { items, updateItem } = useCartStore();
  const item = items.find((i) => i.id === itemId);

  const [selectedSize, setSelectedSize] = useState(
    item?.selectedSize || undefined
  );
  const [quantity, setQuantity] = useState(item?.quantity || 1);

  if (!item) {
    return <Text>Item not found</Text>;
  }

  const handleSave = () => {
    updateItem(item.id, { selectedSize, quantity });
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProductDetails
        product={item}
        quantity={quantity}
        selectedSize={selectedSize}
        onQuantityChange={setQuantity}
        onSizeChange={setSelectedSize}
        showDescription={false}
      />
      <View style={styles.actionButtonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  actionButtonContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  saveButton: {
    backgroundColor: Colors.light.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: Colors.light.background,
    fontSize: 18,
    fontWeight: "bold",
  },
});

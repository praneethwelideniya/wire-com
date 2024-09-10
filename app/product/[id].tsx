import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCartStore } from "@/store/cartStore";
import { ProductDetails } from "@/components/product/ProductDetails";
import { Product } from "@/types/Product";
import { CartButton } from "@/components/cart/CartButton";
import { Colors } from "@/constants/Colors";

export default function ProductPage() {
  const { product: productString } = useLocalSearchParams();
  const product: Product = JSON.parse(productString as string);
  const [selectedSize, setSelectedSize] = useState<string>();
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes && product.sizes.length > 0) {
      alert("Please select a size");
      return;
    }
    addItem(product, selectedSize || undefined, quantity);
    Alert.alert("Success", `Added ${quantity} x ${product.name} to cart`, [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  return (
    <View style={styles.container}>
      <ProductDetails
        product={product}
        quantity={quantity}
        selectedSize={selectedSize}
        onQuantityChange={setQuantity}
        onSizeChange={setSelectedSize}
        showDescription={true}
      />
      <View style={styles.actionButtonsContainer}>
        <CartButton
          containerStyle={styles.cartButton}
          iconSize={24}
          iconColor="white"
        />
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  cartButton: {
    backgroundColor: Colors.light.primary,
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: Colors.light.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  addToCartButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

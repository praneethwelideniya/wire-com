import { Product } from "@/types/Product";
import { Link } from "expo-router";
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Colors } from "@/constants/Colors";

const ProductItem: React.FC<{ item: Product }> = React.memo(({ item }) => (
  <Link
    href={{
      pathname: "/product/[id]",
      params: { id: item.id, product: JSON.stringify(item) },
    }}
    asChild
  >
    <TouchableOpacity style={styles.itemContainer}>
      <Image
        style={styles.image}
        source={{ uri: item.mainImage }}
        contentFit="cover"
        transition={1000}
      />
      <Text style={styles.name}>{item.name}</Text>
      <Text
        style={styles.price}
      >{`${item.price.currency} ${item.price.amount}`}</Text>
    </TouchableOpacity>
  </Link>
));

export default ProductItem;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    maxWidth: "47%",
    margin: 8,
    padding: 10,
    borderRadius: 5,
    backgroundColor: Colors.light.background,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  price: {
    fontSize: 14,
    color: "#888",
    marginTop: 3,
  },
});

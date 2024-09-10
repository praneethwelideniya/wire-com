import { CartButton } from "@/components/cart/CartButton";
import ProductItem from "@/components/product/ProductItem";
import ReTry from "@/components/ReTry";
import { Colors } from "@/constants/Colors";
import { useProducts } from "@/hooks/useProducts";
import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";

const Home: React.FC = () => {
  const { products, loading, error, refetch } = useProducts();

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <ReTry error={error} refetch={refetch} />;
  }

  return (
    <View>
      <FlatList
        data={products}
        renderItem={({ item, index }) => (
          <ProductItem item={item} key={index} />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
      />
      <CartButton
        containerStyle={styles.cartButton}
        iconSize={24}
        iconColor="white"
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
    alignContent: "center",
  },
  container: {
    flex: 1,
  },
  cartButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: Colors.light.primary,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

import CartItem from "@/components/cart/CartItem";
import { Colors } from "@/constants/Colors";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function CartScreen() {
  const {
    items,
    removeItem,
    updateItemQuantity,
    getTotalItems,
    getTotalPrice,
  } = useCartStore();
  const router = useRouter();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  const handleEditItem = (itemId: string) => {
    router.push({
      pathname: "/cart/edit-item",
      params: { itemId },
    });
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  // const renderItem = ({ item }) => (
  //   <View style={styles.itemContainer}>
  //     <Image
  //       source={{ uri: item.mainImage }}
  //       style={styles.image}
  //       contentFit="cover"
  //     />
  //     <View style={styles.itemInfo}>
  //       <Text style={[styles.itemName, { color: theme.text }]}>
  //         {item.name}
  //       </Text>
  //       <Text style={{ color: theme.text }}>
  //         Size: {item.selectedSize || "N/A"}
  //       </Text>
  //       <FontAwesome5
  //         name="edit"
  //         size={20}
  //         color={theme.baseColor}
  //         onPress={() => handleEditItem(item.id)}
  //       />
  //       <Text style={styles.itemPrice}>
  //         {item.price.currency} {item.price.amount}
  //       </Text>
  //     </View>
  //     <View style={styles.itemActions}>
  //       <Feather
  //         name="trash-2"
  //         size={24}
  //         color={theme.baseColor}
  //         onPress={() => removeItem(item.id)}
  //         style={styles.removeButton}
  //       />

  //       <QuantityAdjuster
  //         quantity={item.quantity}
  //         onIncrease={() => updateItemQuantity(item.id, item.quantity + 1)}
  //         onDecrease={() => updateItemQuantity(item.id, item.quantity - 1)}
  //       />
  //     </View>
  //   </View>
  // );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart ({totalItems} items)</Text>
      {items.length > 0 ? (
        <>
          <FlatList
            data={items}
            renderItem={({ item }) => (
              <CartItem
                item={item}
                onEdit={handleEditItem}
                onUpdateQuantity={updateItemQuantity}
                onRemove={removeItem}
              />
            )}
            keyExtractor={(item) => item.id}
          />
          <View style={styles.totalContainer}>
            <Text style={[styles.totalText, { color: theme.text }]}>
              Total: {`GBP ${totalPrice}`}
            </Text>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={[styles.emptyCart, { color: theme.text }]}>
          Your cart is empty
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
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
  totalContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#CCCCCC",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: Colors.light.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  itemActions: {
    justifyContent: "space-between",
  },
  editButtonText: {
    color: "#fff",
    textAlign: "center",
  },
});

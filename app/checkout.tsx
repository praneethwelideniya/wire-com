import { AddressForm } from "@/components/checkout/AddressForm";
import { CardDetailsForm } from "@/components/checkout/CardDetailsForm";
import Switch from "@/components/Switch";
import { Colors } from "@/constants/Colors";
import { CheckoutFormData, checkoutSchema } from "@/schemas/checkoutSchema";
import { useCartStore } from "@/store/cartStore";
import { useCheckoutStore } from "@/store/checkoutStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function CheckoutPage() {
  const { savedAddress, saveAddress: saveAddressToStore } = useCheckoutStore();
  const { getTotalPrice } = useCartStore();
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  const router = useRouter();
  const cart = useCartStore();

  const totalCost = getTotalPrice();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      shippingAddress: savedAddress || {},
      sameAsBilling: true,
      saveAddress: false,
      cardDetails: {},
    },
  });

  const sameAsBilling = watch("sameAsBilling");

  const onSubmit = (data: CheckoutFormData) => {
    if (data.saveAddress) {
      saveAddressToStore(data.shippingAddress);
    }

    Alert.alert("Success", `Added Order`, [
      {
        text: "OK",
        onPress: () => {
          cart.clearCart();
          router.replace("/");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: theme.text }]}>Checkout</Text>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Shipping Address
        </Text>
        <AddressForm
          control={control}
          errors={errors.shippingAddress}
          prefix="shippingAddress"
        />

        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Card Details
        </Text>
        <CardDetailsForm control={control} errors={errors.cardDetails} />

        <Switch
          value={watch("saveAddress")}
          setValue={(value) => setValue("saveAddress", value)}
          label="Save address for future use"
        />

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalAmount}>{`GBP ${totalCost}`}</Text>
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.submitButtonText}>Place Order</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
  },
  totalContainer: {
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
  submitButton: {
    backgroundColor: Colors.light.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: Colors.light.background,
    fontSize: 18,
    fontWeight: "bold",
  },
});

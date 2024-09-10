import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from "react-native";
import { Image } from "expo-image";
import { QuantityAdjuster } from "@/components/product/QuantityAdjuster";
import { Colors } from "@/constants/Colors";

interface ProductDetailsProps {
  product: {
    id: string;
    name: string;
    mainImage: string;
    price: {
      currency: string;
      amount: string;
    };
    sizes?: string[];
    description?: string;
  };
  quantity: number;
  selectedSize?: string;
  onQuantityChange: (newQuantity: number) => void;
  onSizeChange: (newSize: string) => void;
  showDescription?: boolean;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  quantity,
  selectedSize,
  onQuantityChange,
  onSizeChange,
  showDescription = false,
}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: product.mainImage }}
        style={styles.image}
        contentFit="cover"
      />
      <View style={styles.detailsContainer}>
        <Text style={[styles.name, { color: theme.text }]}>{product.name}</Text>
        <Text style={[styles.price, { color: theme.priceText }]}>
          {product.price.currency} {product.price.amount}
        </Text>

        {product.sizes && product.sizes.length > 0 && (
          <View style={styles.sizesContainer}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Size:
            </Text>
            <View style={styles.sizeButtonsContainer}>
              {product.sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeButton,
                    selectedSize === size && styles.selectedSizeButton,
                  ]}
                  onPress={() => onSizeChange(size)}
                >
                  <Text
                    style={[
                      styles.sizeButtonText,
                      selectedSize === size
                        ? styles.selectedSizeButtonText
                        : { color: theme.text },
                    ]}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <View style={styles.quantityContainer}>
          <Text style={styles.sectionTitle}>Quantity:</Text>
          <QuantityAdjuster
            quantity={quantity}
            onIncrease={() => onQuantityChange(quantity + 1)}
            onDecrease={() => onQuantityChange(Math.max(1, quantity - 1))}
          />
        </View>

        {showDescription && product.description && (
          <View style={styles.descriptionContainer}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Description:
            </Text>
            <Text style={[styles.descriptionText, { color: theme.text }]}>
              {product.description}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: 20,
  },
  detailsContainer: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: "#888",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sizesContainer: {
    marginBottom: 20,
  },
  sizeButtonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sizeButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 15,
    paddingVertical: 2,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  selectedSizeButton: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
  sizeButtonText: {
    fontSize: 16,
  },
  selectedSizeButtonText: {
    color: "#fff",
  },
  quantityContainer: {
    marginBottom: 20,
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
  },
});

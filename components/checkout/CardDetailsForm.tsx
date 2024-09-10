import React from "react";
import { View, StyleSheet } from "react-native";
import { Control, Controller } from "react-hook-form";
import { TextInput } from "@/components/TextInput";
interface CardDetailsFormProps {
  control: Control<any>;
  errors: any;
}

export const CardDetailsForm: React.FC<CardDetailsFormProps> = ({
  control,
  errors,
}) => {
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="cardDetails.cardNumber"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Card Number"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors?.cardNumber?.message}
            keyboardType="numeric"
          />
        )}
      />
      <Controller
        control={control}
        name="cardDetails.expiryDate"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Expiry Date (MM/YY)"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors?.expiryDate?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="cardDetails.cvv"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="CVV"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors?.cvv?.message}
            keyboardType="numeric"
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
});

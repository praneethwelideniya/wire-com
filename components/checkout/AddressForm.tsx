import React from "react";
import { View, StyleSheet } from "react-native";
import { Control, Controller } from "react-hook-form";
import { TextInput } from "@/components/TextInput";
interface AddressFormProps {
  control: Control<any>;
  errors: any;
  prefix: string;
}

export const AddressForm: React.FC<AddressFormProps> = ({
  control,
  errors,
  prefix,
}) => {
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={`${prefix}.name`}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors?.name?.message}
          />
        )}
      />
      <Controller
        control={control}
        name={`${prefix}.street1`}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Street 1"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors?.street1?.message}
          />
        )}
      />
      <Controller
        control={control}
        name={`${prefix}.street2`}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Street 2 (Optional)"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name={`${prefix}.suburb`}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Suburb"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors?.suburb?.message}
          />
        )}
      />
      <Controller
        control={control}
        name={`${prefix}.state`}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="State"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors?.state?.message}
          />
        )}
      />
      <Controller
        control={control}
        name={`${prefix}.postCode`}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Postcode"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors?.postCode?.message}
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

import React, { useCallback, useRef, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import PrimaryButton from "./PrimaryButton";
import { useFormContext } from "react-hook-form";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import BottomPicker from "./BottomPicker";
import { FlatList, Pressable, useColorScheme } from "react-native";
import CustomText from "./CustomText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { cn } from "@/lib/utils";
import Colors from "@/lib/Colors";

type Option = { label: string; value: string };
interface SelectProps {
  name: string;
  label?: string;
  options: Option[];
  icon?: React.ReactNode;
}
const CustomSelect = ({ name, label = "", options, icon }: SelectProps) => {
  const { setValue, watch } = useFormContext();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const currentValue = watch(name);
  const currentLabel = options.find((o) => o.value === currentValue)?.label;

  const handleOpenPicker = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSelect = (value: string) => {
    setValue(name, value);
    bottomSheetModalRef.current?.dismiss();
  };

  const theme = useColorScheme() || "light";
  const baseRowStyle = "w-full py-8 flex-row items-center justify-center gap-4";
  return (
    <>
      <PrimaryButton
        title={currentLabel || label}
        variant="dropdown"
        textClassName="text-gray-900 dark:text-white"
        onPress={handleOpenPicker}
        icon={icon}
      />

      <BottomPicker bottomSheetModalRef={bottomSheetModalRef}>
        <FlatList
          data={options}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => handleSelect(item.value)}
              className={cn(
                baseRowStyle,
                item.value === currentValue
                  ? "bg-gray-200 dark:bg-gray-800"
                  : "",
              )}
            >
              {currentValue === item.value && (
                <Ionicons
                  name="checkmark"
                  size={24}
                  color={Colors[theme].primary}
                />
              )}
              <CustomText>{item.label}</CustomText>
            </Pressable>
          )}
        />
      </BottomPicker>
    </>
  );
};

export default CustomSelect;

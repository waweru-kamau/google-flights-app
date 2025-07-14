import { useFormContext } from "react-hook-form";
import React, { useCallback, useRef } from "react";
import { useColorScheme, View } from "react-native";
import PrimaryButton from "./PrimaryButton";
import BottomPicker from "./BottomPicker";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Ionicons from "@expo/vector-icons/Ionicons";
import Counter from "./Counter";
import Colors from "@/lib/Colors";

const PassengerCounter = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handleOpenPicker = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const formcontext = useFormContext();
  const { watch } = formcontext;
  const adults = watch("adults");
  const children = watch("children");
  const infants = watch("infants");
  const sumPassengers = adults + children + infants;
  const theme = useColorScheme() || "light";

  return (
    <>
      <PrimaryButton
        title={`${sumPassengers}`}
        variant="dropdown"
        textClassName="text-gray-900 dark:text-white"
        icon={
          <Ionicons
            name="person-outline"
            size={12}
            color={Colors[theme].text}
          />
        }
        onPress={handleOpenPicker}
      />
      <BottomPicker bottomSheetModalRef={bottomSheetModalRef}>
        <View className="w-full gap-6">
          <Counter
            name="adults"
            label="Adults"
            min={1}
            formContext={formcontext}
          />
          <Counter name="children" label="Children" formContext={formcontext} />
          <Counter name="infants" label="Infants" formContext={formcontext} />
        </View>
      </BottomPicker>
    </>
  );
};

export default PassengerCounter;

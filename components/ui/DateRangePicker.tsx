import React, { useCallback, useEffect, useRef, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import PrimaryButton from "./PrimaryButton";
import { useFormContext } from "react-hook-form";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import BottomPicker from "./BottomPicker";
import { View } from "react-native";
import { format } from "date-fns";
import CustomText from "./CustomText";

const DateRangePicker = () => {
  const { setValue, watch } = useFormContext();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [activeField, setActiveField] = useState<
    "departureDate" | "returnDate"
  >("departureDate");

  const handleOpenPicker = useCallback(
    (field: "departureDate" | "returnDate") => {
      setActiveField(field);
      bottomSheetModalRef.current?.present();
    },
    [],
  );

  const handleChange = (_event: any, date?: Date) => {
    if (date) {
      setValue(activeField, date);
    }
    bottomSheetModalRef.current?.close();
  };

  const departureDate = watch("departureDate");
  const returnDate = watch("returnDate");

  const minDate =
    activeField === "departureDate" ? new Date() : departureDate || new Date();
  const maxDate =
    activeField === "departureDate" && returnDate ? returnDate : undefined;

  const currentValue = watch(activeField) || new Date();
  const isOneWay = watch("trip") === "one-way";

  useEffect(() => {
    if (isOneWay) {
      setValue("returnDate", undefined);
    }
  }, [isOneWay]);

  return (
    <>
      <View className="flex flex-row px-2 items-center">
        <View className="flex-1">
          <PrimaryButton
            title={
              departureDate ? format(departureDate, "MMM d, yyyy") : "Departure"
            }
            variant="bigOutlined"
            textClassName="text-gray-900 dark:text-white"
            onPress={() => handleOpenPicker("departureDate")}
          />
        </View>
        {!isOneWay && (
          <View className="flex-1">
            <PrimaryButton
              title={returnDate ? format(returnDate, "MMM d, yyyy") : "Return"}
              variant="bigOutlined"
              textClassName="text-gray-900 dark:text-white"
              onPress={() => handleOpenPicker("returnDate")}
            />
          </View>
        )}
      </View>

      <BottomPicker
        bottomSheetModalRef={bottomSheetModalRef}
        className="items-center"
      >
        <CustomText variant="label">
          {activeField === "departureDate" ? "Departure Date" : "Return Date"}
        </CustomText>
        <DateTimePicker
          value={currentValue}
          mode="date"
          display="inline"
          onChange={handleChange}
          minimumDate={minDate}
        />
      </BottomPicker>
    </>
  );
};

export default DateRangePicker;

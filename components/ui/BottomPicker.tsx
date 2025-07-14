import React, { useCallback } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { cn } from "@/lib/utils";
import { useColorScheme } from "react-native";
import Colors from "@/lib/Colors";

interface Props {
  children: React.ReactNode;
  bottomSheetModalRef: React.RefObject<BottomSheetModal | null>;
  className: string;
}

const BottomPicker = ({ children, bottomSheetModalRef, className }: Props) => {
  const theme = useColorScheme() || "light";
  const handleModalClose = useCallback(() => {
    bottomSheetModalRef?.current?.close();
  }, []);
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.5}
        onPress={handleModalClose}
      />
    ),
    [handleModalClose],
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      backdropComponent={renderBackdrop}
      backgroundStyle={{
        backgroundColor: Colors[theme].background,
      }}
    >
      <BottomSheetView
        className={cn(
          "flex-1 w-full pb-12 bg-white dark:bg-primarydark",
          className,
        )}
      >
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default BottomPicker;

import CustomText from "@/components/ui/CustomText";
import { Airport, useSearchAirport } from "@/hooks/useSearchAirport";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import {
  View,
  TextInput,
  Pressable,
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
} from "react-native";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useFormContext } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import LoadingError from "@/components/ui/LoadingError";
import Spinner from "@/components/Spinner";
import Colors from "@/lib/Colors";

const Direction = () => {
  const { direction } = useLocalSearchParams<{ direction: "from" | "to" }>();
  const { watch, setValue } = useFormContext();

  const originAirport = watch("originAirport");
  const destinationAirport = watch("destinationAirport");

  const currentAirport =
    direction === "from" ? originAirport : destinationAirport;
  const otherAirport =
    direction === "from" ? destinationAirport : originAirport;

  const [query, setQuery] = useState(currentAirport?.name || "");
  const debouncedQuery = useDebounce(query);
  const { data, isLoading, isError } = useSearchAirport({
    query: debouncedQuery,
  });

  const handleSelectAirport = (airport: Airport) => {
    setValue(direction === "from" ? "originAirport" : "destinationAirport", {
      name: airport?.presentation?.title,
      skyId: airport?.navigation.relevantFlightParams.skyId,
      entityId: airport?.navigation?.entityId,
    });
    if (otherAirport?.name === airport.presentation.title) {
      setValue(direction === "from" ? "destinationAirport" : "originAirport", {
        name: "",
        skyId: "",
        entityId: "",
      });
    }
    router.back();
  };
  const theme = useColorScheme() || "light";

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-primarydark">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="border-b border-gray-400">
          <View className="flex-row gap-2 items-center">
            <Pressable className="pl-4" onPress={() => router.back()}>
              <Ionicons
                name="arrow-back-outline"
                size={24}
                color={Colors[theme].text}
              />
            </Pressable>
            <TextInput
              className="py-4 text-2xl text-gray-900 dark:text-white"
              placeholder={`Where ${direction}?`}
              placeholderTextColor={Colors[theme].text}
              value={query}
              onChangeText={setQuery}
              autoFocus
            />
          </View>
        </View>

        {isLoading && <Spinner />}
        {isError && <LoadingError />}

        {!isLoading && !isError && data?.data.length === 0 && (
          <LoadingError title="No results" message="Try a different search" />
        )}

        <FlatList
          data={data?.data || []}
          keyExtractor={(item, index) => `${item.skyId}-${index}`}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => handleSelectAirport(item)}
              className="flex-row items-center justify-between py-4 px-4"
            >
              <View className="flex-row items-center gap-2">
                <Ionicons
                  name="location-outline"
                  size={24}
                  color={Colors[theme].text}
                />
                <View>
                  <CustomText variant="h3">
                    {item.presentation.suggestionTitle}
                  </CustomText>
                  <CustomText variant="body">
                    {item.presentation.subtitle}
                  </CustomText>
                </View>
              </View>
            </Pressable>
          )}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Direction;

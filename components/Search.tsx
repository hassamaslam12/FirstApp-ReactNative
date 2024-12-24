import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import icons from "@/constants/icons";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>();

  const [search, setSearch] = useState(params.query);

  const debounceSearch = useDebouncedCallback(
    (text) => router.setParams({ query: text }),
    500
  );

  const handleSearch = (text: string) => {
    // Navigate to the results page with the query parameter
    setSearch(text);
    debounceSearch(text);
  };
  return (
    <View className="flex flex-row items-center justify-between mx-5 rounded-lg bg-accent-100 border border-primary-100 mt-5 p-3 ">
      <View className="flex flex-1 flex-row items-center justify-start z-50">
        <Image source={icons.search} className="size-5" />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search for anything"
          className="text-sm font-rubik text-black-300 ml-2 flex-1"
        />
        <TouchableOpacity>
          <Image source={icons.filter} className="size-5 ml-2" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Search;

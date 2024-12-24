import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { categories } from "@/constants/data";

const Filters = () => {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [selectedCategory, setSelectedCategory] = useState(
    params.filter || "All"
  );

  const handleCategoryPress = (text: string) => {
    setSelectedCategory(text);
    router.setParams({ filter: text });
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {categories.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleCategoryPress(item.category)}
          className={`flex flex-col items-start mr-4 my-2 px-4 py-2 rounded-full ${
            selectedCategory === item.category
              ? "bg-primary-300"
              : "bg-primary-100"
          }`}
        >
          <Text
            className={` text-sm ${
              selectedCategory === item.category
                ? "text-white font-rubik-bold mt-0.5"
                : "text-black-300 font-rubik"
            }`}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Filters;

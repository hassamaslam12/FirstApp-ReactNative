import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import images from "@/constants/images";
import icons from "@/constants/icons";

interface Props {
  onPress?: () => void;
}
export const FeaturedCards = ({ onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-col items-start w-60 h-80 relative"
    >
      <Image source={images.japan} className="size-full rounded-2xl" />
      <Image
        source={images.cardGradient}
        className="size-full rounded-2xl absolute"
      />
      <View className="bg-white flex flex-row  absolute top-5 right-5 px-2 py-1 rounded-full">
        <Image source={icons.star} className="size-3.5" />
        <Text className="text-primary-300 font-rubik-bold text-sm">4.5</Text>
      </View>

      <View className="flex flex-col items-start inset-x-5 absolute bottom-5">
        <Text
          className="font-rubik-extrabold text-xl text-white"
          numberOfLines={1}
        >
          Modern Appartmert
        </Text>
        <Text className="font-rubik text-base text-white" numberOfLines={1}>
          New York
        </Text>
        <View className="flex w-full flex-row justify-between items-center ">
          <Text className="font-rubik-bold text-xl text-white">$300,000</Text>
          <Image source={icons.heart} className="size-6" />
        </View>
      </View>
    </TouchableOpacity>
  );
};
export const Cards = ({ onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 flex flex-col  shadow-sm bg-white shadow-black-100/70 relative px-3 py-2 w-52"
    >
      <View className=" p-1 rounded-full ">
        <Image source={images.newYork} className="w-full rounded-lg h-40" />
        <View className="bg-white flex flex-row  absolute top-4 right-5 px-2 py-1 rounded-full">
          <Image source={icons.star} className="size-3.5 " />
          <Text className="text-primary-300 font-rubik-bold text-sm">4.5</Text>
        </View>
      </View>
      <View className="flex flex-col items-start px-2 mt-3">
        <Text className="font-rubik-semibold text-2xl" numberOfLines={1}>
          La Grande
        </Text>
        <Text className="font-rubik text-base" numberOfLines={1}>
          New York
        </Text>
        <View className="flex w-full flex-row justify-between items-center  ">
          <Text className="font-rubik-bold text-lg text-primary-300">
            $300,000
          </Text>
          <Image source={icons.heart} className="size-6 !text-primary-300" />
        </View>
      </View>
    </TouchableOpacity>
  );
};
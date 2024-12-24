import { Link } from "expo-router";
import { FlatList, Image, ScrollView, Text, View } from "react-native";
import "../../globals.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/constants/lib/global-provider";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import { Cards, FeaturedCards } from "@/components/Cards";
import Filters from "@/components/Filters";

export default function Index() {
  const { user } = useGlobalContext();
  const Header = () => (
    <View className="flex flex-row justify-between px-3">
      <View className="flex flex-row">
        <Image source={images.avatar} className="size-12" />
        <View className="flex justify-center  ml-3">
          <Text className="text-xs font-semibold text-black-100">Welcome</Text>
          <Text className="font-semibold text-base">{user?.name}</Text>
        </View>
      </View>
      <View className="flex justify-center items-center">
        <Image source={icons.bell} className="size-6" />
      </View>
    </View>
  );
  return (
    <SafeAreaView className="h-full bg-white">
      <Header />
      <Search />

      <ScrollView>
        <View className="my-5">
          <View className="flex flex-row items-center justify-between mx-5 ">
            <Text className="font-rubik-bold text-lg">Featured</Text>
            <Text className="text-primary-300 font-rubik-bold text-lg">
              See All
            </Text>
          </View>
        </View>
        <View className="mx-5 flex flex-row gap-5"></View>
        <View className="my-5 mx-5">
          <View className="flex flex-row items-center justify-between ">
            <Text className="font-rubik-bold text-lg">Our Recommendations</Text>
            <Text className="text-primary-300 font-rubik-bold text-lg">
              See All
            </Text>
          </View>
          <Filters />
        </View>
        <View className="mx-5 flex flex-row gap-5 "></View>
      </ScrollView>
    </SafeAreaView>
  );
}

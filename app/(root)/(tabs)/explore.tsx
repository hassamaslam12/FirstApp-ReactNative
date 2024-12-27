import { Link, router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import "../../globals.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/constants/lib/global-provider";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import { Cards, FeaturedCards } from "@/components/Cards";
import Filters from "@/components/Filters";
import seed from "@/constants/lib/seed";
import { useAppwrite } from "@/constants/lib/useAppwrite";
import { getLatestProperties, getProperties } from "@/constants/lib/appwrite";
import { useEffect } from "react";
import NoResults from "@/components/NoResults";

export default function Explore() {
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const {
    data: Properties,
    loading: loading,
    refetch,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    },
  });
  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    });
  }, [params.filter, params.query]);

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  const Header = () => (
    <View className="mt-5 flex flex-row items-center justify-between px-5">
      <TouchableOpacity
        onPress={() => router.back()}
        className="felx flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
      >
        <Image source={icons.backArrow} className="size-5" />
      </TouchableOpacity>
      <Text className="text-base mr-2 text-center font-rubik-medium text-black-300">
        Search For Your Ideal Home
      </Text>
      <Image source={icons.bell} className="w-6 h-6" />
    </View>
  );

  return (
    <SafeAreaView className="h-full bg-white">
      <Header />
      <Search />
      <FlatList
        data={Properties}
        renderItem={({ item }) => (
          <Cards item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : (
            <NoResults />
          )
        }
        numColumns={2}
        keyExtractor={(item) => item.$id}
        columnWrapperClassName="flex gap-5 px-5 mb-5"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <View className="my-5 mx-5">
              <Filters />
              <Text className="font-rubik-bold text-xl text-black-300 mt-5">
                Found {Properties?.length} Properties
              </Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}

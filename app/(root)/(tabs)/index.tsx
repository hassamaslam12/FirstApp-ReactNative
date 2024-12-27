import { Link, router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  ScrollView,
  Text,
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

export default function Index() {
  const { user } = useGlobalContext();
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();
  const { data: latestProperties, loading: latestPropertyLoading } =
    useAppwrite({ fn: getLatestProperties });
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
    <View className="flex flex-row justify-between px-3">
      <View className="flex flex-row">
        <Image
          source={{ uri: user?.avatar }}
          className="size-12 rounded-full"
        />
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
            <View className="my-5">
              <View className="flex flex-row items-center justify-between mx-5 ">
                <Text className="font-rubik-bold text-lg">Featured</Text>
                <Text className="text-primary-300 font-rubik-bold text-lg">
                  See All
                </Text>
              </View>
              {latestPropertyLoading ? (
                <ActivityIndicator
                  size="large"
                  className="text-primary-300 mt-5"
                />
              ) : (
                (!latestProperties || latestProperties.length !== 0) && (
                  <FlatList
                    data={latestProperties}
                    renderItem={({ item }) => (
                      <FeaturedCards
                        item={item}
                        onPress={() => handleCardPress(item.$id)}
                      />
                    )}
                    horizontal
                    bounces={false}
                    contentContainerClassName="flex gap-3 p-2 mt-2"
                    keyExtractor={(item) => item.$id}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                  />
                )
              )}
            </View>
            <View className="mx-5 flex flex-row gap-5"></View>
            <View className="my-5 mx-5">
              <View className="flex flex-row items-center justify-between ">
                <Text className="font-rubik-bold text-lg">
                  Our Recommendations
                </Text>
                <Text className="text-primary-300 font-rubik-bold text-lg">
                  See All
                </Text>
              </View>
              <Filters />
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}

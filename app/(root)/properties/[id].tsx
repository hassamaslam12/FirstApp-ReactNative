import {
  View,
  Text,
  Button,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useAppwrite } from "@/constants/lib/useAppwrite";
import { SafeAreaView } from "react-native-safe-area-context";
import { getProperty } from "@/constants/lib/appwrite";
import icons from "@/constants/icons";
import { facilities } from "@/constants/data";
import images from "@/constants/images";
import { Models } from "react-native-appwrite";

interface Props {
  item: Models.Document;
}

const Comment = ({ item }: Props) => {
  return (
    <View className="flex flex-col items-start">
      <View className="flex flex-row items-center">
        <Image source={{ uri: item.avatar }} className="size-14 rounded-full" />
        <Text className="text-base text-black-300 text-start font-rubik-bold ml-3">
          {item.name}
        </Text>
      </View>

      <Text className="text-black-200 text-base font-rubik mt-2">
        {item.review}
      </Text>

      <View className="flex flex-row items-center w-full justify-between mt-4">
        <View className="flex flex-row items-center">
          <Image
            source={icons.heart}
            className="size-5"
            tintColor={"#0061FF"}
          />
          <Text className="text-black-300 text-sm font-rubik-medium ml-2">
            120
          </Text>
        </View>
        <Text className="text-black-100 text-sm font-rubik">
          {new Date(item.$createdAt).toDateString()}
        </Text>
      </View>
    </View>
  );
};

const Id = () => {
  const { id } = useLocalSearchParams();
  const idString: string = id as string;
  const { data, loading } = useAppwrite({
    fn: getProperty,
    params: { id: idString },
  });

  useEffect(() => {
    if (id) {
      // Fetch property data here.
    } else {
      // Handle missing or invalid ID.
    }
  }, []);
  console.log(data);

  if (loading) {
    return (
      <SafeAreaView className="h-full flex justify-center items-center">
        <ActivityIndicator className="text-primary-300" size="large" />
      </SafeAreaView>
    );
  }
  if (!data) {
    return (
      <SafeAreaView className="h-full flex justify-center items-center">
        <Text>Property not found.</Text>
      </SafeAreaView>
    );
  }

  const Agent = () => (
    <View className="mx-7 mt-7">
      <View className="mb-5">
        <Text className="font-rubik-bold text-2xl">Agent</Text>
      </View>
      <View className="flex flex-row justify-between w-full">
        <View className="flex flex-row gap-5">
          <Image
            source={{ uri: data.agent.avatar }}
            className="size-14 rounded-full"
          />
          <View className="flex flex-col">
            <Text className="font-rubik-bold text-lg"> {data.agent?.name}</Text>
            <Text className=""> owner</Text>
          </View>
        </View>
        <View className="flex flex-row gap-5">
          <Image source={icons.chat} className="size-10 rounded-full" />
          <Image source={icons.phone} className="size-10" />
        </View>
      </View>
    </View>
  );

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 bg-white"
      >
        <View className="relative">
          <Image
            source={{ uri: data.image }}
            style={{ height: 400, borderRadius: 10 }}
            resizeMode="cover"
          />
          <Image
            source={images.whiteGradient}
            className="absolute top-0 w-full "
          />

          <View className="absolute top-14 w-full flex flex-row justify-between px-5">
            <TouchableOpacity onPress={() => router.back()}>
              <Image
                source={icons.backArrow}
                className="text-black-100 size-10"
              />
            </TouchableOpacity>
            <View className="flex flex-row gap-4">
              <Image
                source={icons.heart}
                className="size-10 text-black-100"
                tintColor={"#191D31"}
              />
              <Image source={icons.send} className="size-10 text-black-100" />
            </View>
          </View>
        </View>

        <View className="p-8 mt-5 border-b-2 border-gray-300 ">
          <Text className="font-rubik-bold text-2xl">{data.name}</Text>
          <View className="flex flex-row my-3">
            <Text className="bg-primary-200 text-primary-300 font-rubik-medium px-5 py-1 rounded-full">
              {data.type}
            </Text>
            <View className="ml-3 flex flex-row items-center">
              <Image source={icons.star} />
              <View className="ml-1">
                <Text className="font-rubik-regular">
                  {data.rating || 0} ({data.reviews?.length || 0} reviews)
                </Text>
              </View>
            </View>
          </View>
          <View className="flex flex-row justify-between">
            <View className="flex flex-row items-center gap-2 mt-2">
              <View className="bg-primary-200 text-primary-300 p-3 rounded-full">
                <Image source={icons.bed} className="size-6 " />
              </View>
              <Text className="font-rubik-semibold">{data.bedrooms} Beds</Text>
            </View>
            <View className="flex flex-row items-center gap-2 mt-2">
              <View className="bg-primary-200 text-primary-300 p-3 rounded-full">
                <Image source={icons.bath} className="size-6" />
              </View>
              <Text className="font-rubik-semibold">{data.bathrooms} bath</Text>
            </View>
            <View className="flex flex-row items-center gap-2 mt-2">
              <View className="bg-primary-200 text-primary-300 p-3 rounded-full">
                <Image source={icons.area} className="size-6" />
              </View>
              <Text className="font-rubik-semibold">{data.area} sqft</Text>
            </View>
          </View>
        </View>

        <Agent />

        <View className="p-8 ">
          <Text className="font-rubik-bold text-2xl">Overview</Text>
          <Text className="mt-3">{data.description}</Text>
        </View>

        <View className="mx-7">
          <Text className="text-2xl font-rubik-bold"> Facilities</Text>
          <View className="flex-row flex-wrap m-3 mt-5 items-center">
            {data.facilities.map((item: string, index: number) => {
              const facility = facilities.find(
                (facility) => facility.title === item
              );
              return (
                <View key={index} className="w-1/4 items-center mb-3">
                  <Image
                    source={facility ? facility.icon : icons.swim}
                    className="bg-primary-200 p-3 rounded-full text-primary-300"
                  />
                  <Text className="mt-2 text-sm font-rubik-medium">
                    {facility ? facility.title : item}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <View className="mx-7">
          <Text className="text-2xl font-rubik-bold"> Gallery</Text>

          <View className="flex flex-row gap-5 pt-5">
            {data.gallery
              .slice(1, 4)
              .map((item: { image: string; $id: string }) => (
                <Image
                  key={item.$id}
                  source={{ uri: item.image }}
                  className="w-28 h-40 rounded-md"
                  resizeMode="cover"
                />
              ))}
          </View>
        </View>

        <View className="m-7">
          <Text className="text-2xl font-rubik-bold"> Location</Text>
          <View className="mt-4 flex flex-row gap-3 items-center">
            <Image source={icons.location} className="size-6" />
            <Text>{data.address}</Text>
          </View>
          <Image source={images.map} className="h-52 w-full mt-5 rounded-xl" />
        </View>

        {data?.reviews.length > 0 && (
          <View className="mt-7 mx-7">
            <View className="flex flex-row items-center justify-between">
              <View className="flex flex-row items-center">
                <Image source={icons.star} className="size-6" />
                <Text className="text-black-300 text-xl font-rubik-bold ml-2">
                  {data?.rating} ({data?.reviews.length} reviews)
                </Text>
              </View>

              <TouchableOpacity>
                <Text className="text-primary-300 text-base font-rubik-bold">
                  View All
                </Text>
              </TouchableOpacity>
            </View>

            <View className="mt-5">
              <Comment item={data?.reviews[0]} />
            </View>
          </View>
        )}

        <View className="absolute bg-white bottom-0 w-full rounded-t-2xl border-t border-r border-l border-primary-200 p-7">
          <View className="flex flex-row items-center justify-between gap-10">
            <View className="flex flex-col items-start">
              <Text className="text-black-200 text-xs font-rubik-medium">
                Price
              </Text>
              <Text
                numberOfLines={1}
                className="text-primary-300 text-start text-2xl font-rubik-bold"
              >
                ${data?.price}
              </Text>
            </View>

            <TouchableOpacity className="flex-1 flex flex-row items-center justify-center bg-primary-300 py-3 rounded-full shadow-md shadow-zinc-400">
              <Text className="text-white text-lg text-center font-rubik-bold">
                Book Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Id;

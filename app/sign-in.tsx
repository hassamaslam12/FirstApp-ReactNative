import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import images from "@/constants/images";
import icons from "@/constants/icons";
import { login } from "@/constants/lib/appwrite";
import { useGlobalContext } from "@/constants/lib/global-provider";
import { Redirect } from "expo-router";

const Signin = () => {
  const handleLogin = async () => {
    const result = await login();
    if (result) {
      refetch();
      console.log(result);
    } else {
      Alert.alert("Error", "Failed to login");
    }
  };
  const { loading, refetch, isLoggedIn } = useGlobalContext();
  if (!loading && isLoggedIn) return <Redirect href="/" />;
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="h-full">
        <Image
          source={images.onboarding}
          className="w-full h-4/6"
          resizeMode="contain"
        />
        <View className="px-10">
          <Text className=" text-base text-center uppercase font-rubik text-black-200">
            Welcome to Emerald Key
          </Text>
          <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-2">
            Let's Get You Closer To {"\n"}
            <Text className="text-primary-300">Your Ideal Home</Text>
          </Text>
          <Text className="text-lg font-rubik text-center mt-10 text-black-200">
            Login to Emeral key with google
          </Text>
          <TouchableOpacity
            onPress={handleLogin}
            className="bg-white shadow-md rounded-full shadow-zinc-300 w-full py-4 mt-5"
          >
            <View className="flex flex-row items-center justify-center">
              <Image
                source={icons.google}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className=" text-lg font-rubik-medium text-black-300 ml-2">
                Sign in with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signin;

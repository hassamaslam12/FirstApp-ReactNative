import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  Alert,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { settings } from "@/constants/data";
import { useGlobalContext } from "@/constants/lib/global-provider";
import { logout } from "@/constants/lib/appwrite";

interface SettingsItemProp {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const SettingItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: SettingsItemProp) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex flex-row items-center justify-between py-3 border-gray-200"
  >
    <View className="flex flex-row items-center gap-3">
      <Image source={icon} className="size-6 mr-3" />
      <Text className={`text-lg font-rubik-medium ${textStyle}`}>{title}</Text>
    </View>
    {showArrow && <Image source={icons.rightArrow} className="size-5" />}
  </TouchableOpacity>
);

const Profile = () => {
  const { user, refetch } = useGlobalContext();
  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      Alert.alert("success", "Logged Out Successfully");
      refetch();
    } else {
      Alert.alert("error", "Failed to log out");
    }
  };
  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7 "
      >
        <View className="flex flex-row items-center justify-between  mt-5">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <Image source={icons.bell} className="size-5" />
        </View>
        <View className="flex-row justify-center flex">
          <View className="relative flex flex-col items-center mt-5">
            <Image
              source={{ uri: user?.avatar }}
              className="rounded-full size-44 relative"
            />
            <TouchableOpacity className="absolute bottom-11 right-2">
              <Image source={icons.edit} className=" size-9" />
            </TouchableOpacity>
            <Text className="text-2xl font-rubik-bold mt-2">{user?.name}</Text>
          </View>
        </View>
        <View className="flex flex-col mt-10">
          <SettingItem
            icon={icons.calendar}
            title="My Bookings"
            onPress={() => {}}
          />
          <SettingItem
            icon={icons.wallet}
            title="Payments"
            onPress={() => {}}
          />
          <View className="flex flex-col border-t pt-5 border-primary-200">
            {settings.slice(2).map((setting, index) => (
              <SettingItem key={index} {...setting} />
            ))}
          </View>
          <View className="flex flex-col border-t pt-5 border-primary-200">
            <SettingItem
              icon={icons.logout}
              title="Logout"
              textStyle="text-danger"
              onPress={handleLogout}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

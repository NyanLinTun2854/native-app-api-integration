import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeAuthToken = async (tokenName, tokenValue) => {
  try {
    await AsyncStorage.setItem(tokenName, tokenValue);
  } catch (error) {
    console.error("Error storing auth token:", error);
  }
};

export const getAuthToken = async () => {
  try {
    const result = await AsyncStorage.getItem("AUTH_TOKEN");
    return result;
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
};

export const getUserName = async () => {
  try {
    const result = await AsyncStorage.getItem("USER_NAME");
    return result;
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
};

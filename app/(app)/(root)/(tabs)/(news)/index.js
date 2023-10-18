import { View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect } from "expo-router";
import { getAuthToken } from "../../../../../utils/asyncStorage";
import News from "../../../../../components/News";

const Home = () => {
  const count = useSelector((state) => state.counter.value);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const checkAuthentication = async () => {
  //     const authToken = await getAuthToken("AUTH_TOKEN");
  //     setIsAuthenticated(!!authToken);
  //     setIsLoading(false);
  //   };
  //   checkAuthentication();
  // }, []);

  // console.log(isAuthenticated);

  // if (isLoading) {
  //   return (
  //     <View>
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }

  return <News />;
};

export default Home;

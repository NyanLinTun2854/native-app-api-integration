import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { View } from "react-native";
import LeftMenu from "./LeftMenu";
import { COLORS } from "../constants/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import getPosts from "../services/get-post";
import HTML from "react-native-render-html";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { CREATE_POST_ROUTE } from "../configs/route";
import { getAuthToken, getUserName } from "../utils/asyncStorage";
import { useEffect } from "react";
import PopupComponent from "./PupupComponent";
import { useState } from "react";
import { updateAuthToken, updateUserName } from "../features/userSlice";

const News = () => {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [currentSlug, setCurrentSlug] = useState("");
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);

  useEffect(() => {
    const getAuth = async () => {
      one = await getAuthToken();
      two = await getUserName();
      dispatch(updateAuthToken(one));
      dispatch(updateUserName(two));
    };
    getAuth();
  }, []);
  const { username, usertoken } = useSelector((state) => state.user);

  const { res: todos, isLoading, mutate, error } = getPosts();

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const handleCreate = async () => {
    const usertoken = await getAuthToken();
    // const usertoken = state.usertoken;
    if (usertoken) {
      router.replace(CREATE_POST_ROUTE);
    } else {
      Toast.show({
        visibilityTime: 2000,
        type: "info",
        text1: "Info",
        text2: "Need to Login to do this action!",
      });
    }
  };

  console.log(currentSlug, "currentSlug");

  // console.log(usertoken, "usertoken");
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: "#F2F3F4" }}
      >
        <View style={styles.viewContainer}>
          {todos?.data?.map((data, index) => {
            return (
              <LeftMenu
                data={data}
                key={index}
                setPopupVisible={setPopupVisible}
                setCurrentSlug={setCurrentSlug}
              />
            );
          })}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        activeOpacity={true}
        onPress={handleCreate}
      >
        <MaterialCommunityIcons
          name="plus"
          size={50}
          style={{ color: COLORS.white }}
        />
        <PopupComponent
          isVisible={isPopupVisible}
          closeModal={closePopup}
          currentSlug={currentSlug}
          setCurrentSlug={setCurrentSlug}
        />
      </TouchableOpacity>
    </>
  );
};

export default News;

const styles = StyleSheet.create({
  viewContainer: {
    position: "relative",
    alignItems: "center",
    flex: 1,
    rowGap: 8,
    paddingTop: 15,
  },
  addButton: {
    position: "absolute",
    right: 40,
    bottom: 40,
    width: 70,
    height: 70,
    backgroundColor: COLORS.main,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

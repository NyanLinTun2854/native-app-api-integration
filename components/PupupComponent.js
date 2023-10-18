import React from "react";
import { View, Text, Modal } from "react-native";
import { FONT } from "../constants/theme";
import Button from "./ModalButton";
import { deleteFetcher } from "../api/configs/axiosConfig";
import { GET_POSTS, POST } from "../configs/api";
import { useSWRConfig } from "swr";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const PopupComponent = ({
  isVisible,
  closeModal,
  currentSlug,
  setCurrentSlug,
}) => {
  const { mutate } = useSWRConfig();
  const handleDelete = async () => {
    try {
      const res = await deleteFetcher(`${POST}/${currentSlug}`);
      if (res?.status == 200) {
        closeModal();
        console.log(res, "deleteRes");
        Toast.show({
          visibilityTime: 2000,
          type: "success",
          text1: "Success",
          text2: res.data,
        });
        mutate(GET_POSTS);
        setCurrentSlug("");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeModal}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            width: 300,
            backgroundColor: "white",
            paddingHorizontal: 30,
            paddingVertical: 20,
            borderRadius: 10,
            shadowColor: "#000", // Shadow color (iOS)
            shadowOffset: { width: 0, height: 2 }, // Shadow offset (iOS)
            shadowOpacity: 0.3, // Shadow opacity (iOS)
            shadowRadius: 4, // Shadow radius (iOS)
            elevation: 5,
          }}
        >
          <Text style={{ fontSize: 18, fontFamily: FONT.semiMedium }}>
            Are you sure to delete this post!
          </Text>
          <View
            style={{
              flexDirection: "row",
              width: 210,
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <Button title="Cancel" color="#C11515" onPress={closeModal} />
            <Button title="Confirm" color="#1B734A" onPress={handleDelete} />
          </View>
          {/* Add more content and buttons as needed */}
        </View>
      </View>
    </Modal>
  );
};

export default PopupComponent;

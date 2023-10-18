import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";
import FormInput from "./FormInput";
import { Formik } from "formik";
import Button from "./Button";
import { Link, useRouter } from "expo-router";
import { COLORS, FONT } from "../constants/theme";
import { fetcher, postFetcher } from "../api/configs/axiosConfig";
import { GET_POSTS, POST } from "../configs/api";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { HOME_PAGE } from "../configs/route";
import getPosts from "../services/get-post";
import { useSWRConfig } from "swr";

const INITIALVALUES = {
  title: "",
  content: "",
  user: "",
};
const Create = () => {
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const onSubmit = async (value) => {
    try {
      const res = await postFetcher(POST, value);
      console.log(res, "api");
      if (res?.status == 200) {
        Toast.show({
          visibilityTime: 1000,
          type: "success",
          text1: "Success",
          text2: "Create successfull",
        });
        setTimeout(() => {
          const something = async () => {
            mutate(GET_POSTS);
            router.push(HOME_PAGE);
          };
          something();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View style={{ width: "100%", alignItems: "center" }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 500,
            color: "#235789",
          }}
        >
          Create News
        </Text>
        <Formik
          initialValues={{
            title: "",
            content: "",
          }}
          onSubmit={async (values) => onSubmit(values)}
        >
          {({ handleChange, handleBlue, handleSubmit, values }) => (
            <View
              style={{
                width: "100%",
                alignItems: "center",
                rowGap: 20,
                marginTop: 40,
              }}
            >
              <FormInput
                placeholder="Enter Title"
                icon="format-title"
                title="Title"
                onChange={handleChange("title")}
                value={values.title}
              />
              <FormInput
                placeholder="Enter Content"
                icon="content-paste"
                title="Content"
                onChange={handleChange("content")}
                value={values.content}
              />
              <View style={{ marginTop: 25 }}>
                <Button title="CREATE" onPress={handleSubmit} />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default Create;

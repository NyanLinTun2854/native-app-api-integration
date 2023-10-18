import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";
import FormInput from "./FormInput";
import { Formik, useFormik } from "formik";
import Button from "./Button";
import { Link, useRouter } from "expo-router";
import { COLORS, FONT } from "../constants/theme";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { putFetcher } from "../api/configs/axiosConfig";
import { GET_POSTS, POST } from "../configs/api";
import { useSWRConfig } from "swr";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { HOME_PAGE } from "../configs/route";

const Update = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const state = useSelector((state) => state.updateForm);
  const user = useSelector((state) => state.user);
  const [rendered, setRendered] = useState(false);

  const onSubmit = async (value) => {
    console.log(state.slug, "updateSlug");
    try {
      const res = await putFetcher(`${POST}/${state.slug}`, value);
      console.log(res, "updatedSubmit");
      if (res.status == 200) {
        Toast.show({
          visibilityTime: 1000,
          type: "success",
          text1: "Success",
          text2: "Update successfull",
        });
        setTimeout(() => {
          const something = async () => {
            mutate(GET_POSTS);
            router.push(HOME_PAGE);
          };
          something();
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    onSubmit: async (values) => {
      onSubmit(values);
    },
  });

  useEffect(() => {
    console.log("updateChildRender");
  }, []);

  useEffect(() => {
    formik.setFieldValue("title", state.title);
    formik.setFieldValue("content", state.content);
  }, [state.title, state.content]);

  // console.log(formik.values.title, "title");

  const handleTitle = () => {
    formik.handleChange("title");
  };

  const handleContent = () => {
    formik.handleChange("content");
  };

  if (state.title && state.content) {
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
            Update News
          </Text>

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
              onChange={formik.handleChange("title")}
              onBlur={formik.handleBlur("title")}
              value={formik.values.title}
            />
            <FormInput
              placeholder="Enter Content"
              icon="content-paste"
              title="Content"
              onBlur={formik.handleBlur("content")}
              onChange={formik.handleChange("content")}
              value={formik.values.content}
            />
            <View style={{ marginTop: 25 }}>
              <Button title="UPDATE" onPress={formik.handleSubmit} />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
};

export default Update;

const styles = StyleSheet.create({
  registerContainer: {
    marginTop: 100,
    rowGap: 5,
  },
  registerText: {
    fontSize: 15,
    fontFamily: FONT.medium,
    color: COLORS.black,
  },
});

import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";
import FormInput from "./FormInput";
import { Formik } from "formik";
import Button from "./Button";
import { Link, useRouter } from "expo-router";
import { COLORS, FONT } from "../constants/theme";
import { postFetcher } from "../api/configs/axiosConfig";
import { SIGN_UP } from "../configs/api";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { LOGN_IN_ROUTE } from "../configs/route";

const INITIALVALUES = {
  username: "",
  password: "",
};
const Signup = () => {
  const router = useRouter();
  const onSubmit = async (value) => {
    try {
      const res = await postFetcher(SIGN_UP, value);
      console.log(res, "api");
      if (res.data == "You have successfully registered!") {
        Toast.show({
          visibilityTime: 2000,
          type: "success",
          text1: "Success",
          text2: "Signup Successful",
        });
        setTimeout(() => {
          router.push(LOGN_IN_ROUTE);
        }, 2000);
      }
    } catch (error) {
      const err = error.response.data.error;
      console.log(error);
      if (err == "Duplicate UserName. Try another Username!") {
        Toast.show({
          visibilityTime: 2000,
          type: "error",
          text1: "Error",
          text2: "Duplicate UserName. Try another Username!",
        });
      }
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
          Register
        </Text>
        <Formik
          initialValues={{
            username: "",
            password: "",
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
                placeholder="Enter Name"
                icon="account"
                title="Username"
                onChange={handleChange("username")}
                value={values.username}
              />
              <FormInput
                placeholder="Enter your account password"
                icon="lock-outline"
                title="Password"
                passwordType={true}
                onChange={handleChange("password")}
                value={values.password}
              />
              <View style={{ marginTop: 25 }}>
                <Button title="REGISTER" onPress={handleSubmit} />
              </View>
            </View>
          )}
        </Formik>
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Do you have an account?</Text>
          <Text style={styles.registerText}>
            Please you can{" "}
            <Link
              href={"/(app)/(root)/auth/login/login"}
              style={{ textDecorationLine: "underline", color: COLORS.main }}
            >
              login
            </Link>{" "}
            here
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;

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

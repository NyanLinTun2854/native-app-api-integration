import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";
import FormInput from "./FormInput";
import { Formik } from "formik";
import Button from "./Button";
import { Link } from "expo-router";
import { COLORS, FONT } from "../constants/theme";
import { useDispatch } from "react-redux";
import { loginFunc } from "../features/userSlice";

const INITIALVALUES = {
  username: "",
  password: "",
};
const Login = () => {
  const dispatch = useDispatch();

  const onSubmit = async (value) => {
    await dispatch(loginFunc(value)).unwrap();
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
          Login
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
                <Button title="LOGIN" onPress={handleSubmit} />
              </View>
            </View>
          )}
        </Formik>
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Do you haven't an account?</Text>
          <Text style={styles.registerText}>
            Please you can{" "}
            <Link
              href={"/(app)/(root)/auth/signup/signup"}
              style={{ textDecorationLine: "underline", color: COLORS.main }}
            >
              register
            </Link>{" "}
            here
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

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

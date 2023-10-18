import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { COLORS, FONT, SIZES } from "../constants/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { dateConverter } from "../utils/dateConverter";

const NewsCard = ({ data, onPress }) => {
  return (
    <Pressable style={styles.cardContainer} onPress={onPress}>
      <MaterialCommunityIcons
        name="account-circle-outline"
        size={40}
        style={{ color: "gray" }}
      />
      <View style={styles.cardDescription}>
        <View style={styles.upperWrapper}>
          <Text style={styles.cardTitle}>{data?.user}</Text>
          <Text style={styles.cardDate}>{dateConverter(data?.updatedAt)}</Text>
        </View>
        <Text>{data?.title}</Text>
      </View>
    </Pressable>
  );
};

export default NewsCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: "95%",
    flexDirection: "row",
    columnGap: 15,
    paddingVertical: 15,
    alignItems: "center",
    paddingHorizontal: SIZES.medium,
    borderRadius: 10,
    backgroundColor: "white",
  },
  cardDescription: {
    flex: 1,
  },
  upperWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: FONT.medium,
  },
  cardDate: {
    fontSize: 14,
    fontFamily: FONT.regular,
  },
});

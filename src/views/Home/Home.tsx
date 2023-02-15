import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";

import HomeModals from "./HomeModals";
import HomeButtons from "./HomeButtons";

export type ModalType = "start" | "join" | "help" | null;

const Home = ({ navigation }: any) => {
  const [modalOpened, setModalOpened] = useState<ModalType>(null);

  const route = useRoute<any>();

  useEffect(() => {
    if (route?.params?.startNewGame) {
      setModalOpened("start");
    }
  }, [route]);

  return (
    <LinearGradient
      start={{ x: 0.2, y: 0.8 }}
      end={{ x: 0.2, y: 0.81 }}
      colors={["#78C6FF", "#3CBB50"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <HomeModals
          navigation={navigation}
          onClose={() => setModalOpened(null)}
          modalOpened={modalOpened}
        />
        <View style={styles.menu}>
          {/* HAUT DE LA PAGE */}
          <ImageBackground
            style={{ flex: 1, justifyContent: "center" }}
            source={require("../../../assets/img/clouds.png")}
          >
            <Image
              style={{
                width: 318,
                height: 214,
                alignSelf: "center",
              }}
              source={require("../../../assets/img/logo.png")}
            />
          </ImageBackground>
          {/* BAS DE LA PAGE */}
          <ImageBackground
            style={{ flex: 1.5, justifyContent: "flex-end", padding: 20 }}
            source={require("../../../assets/img/grass_bg_high.png")}
            resizeMode="cover"
          >
            <HomeButtons onPress={(value) => setModalOpened(value)} />
            <View>
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontFamily: "AutourOne-Regular",
                  marginTop: 40,
                }}
              >
                2022-2024 by Chawki & Dorian
              </Text>
            </View>
          </ImageBackground>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  menu: {
    paddingVertical: 10,
    flex: 1,
    justifyContent: "space-around",
    alignItems: "stretch",
    alignContent: "center",
  },
});

export default Home;

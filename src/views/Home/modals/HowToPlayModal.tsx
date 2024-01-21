import React from "react";
import { Image, Text, View } from "react-native";

import { Modal, ModalProps, styles } from "../../../components";
import { textStyle } from "../../../styles/text";

const HowToPlay = ({ visible, onClose }: ModalProps) => (
  <Modal visible={visible} onClose={onClose}>
    <Text style={textStyle.modalTitle}>Comment qu'on joue ?</Text>
    <Text style={[textStyle.h5, styles.modalText]}>
      Ce jeu se joue à deux et au tour-par-tour.
    </Text>
    <Text style={[textStyle.h5, styles.modalText]}>
      Chaque joueur saisit le chiffre que l’autre joueur doit deviner.
    </Text>
    <Text style={[textStyle.h5, styles.modalText]}>
      Le but : deviner le chiffre de son adversaire avant qu’il ne devine le
      vôtre !
    </Text>
    <View
      style={{
        display: "flex",
        marginVertical: 10,
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <Image
        style={{
          width: 155,
          height: 119,
        }}
        source={require("../../../../assets/img/cows_tutorial.png")}
      />
      <Text
        style={[
          textStyle.h4,
          { flex: 1, textAlign: "left", marginLeft: 10 },
          styles.modalText,
        ]}
      >
        Le chiffre est présent et il est au bon endroit !
      </Text>
    </View>
    <View
      style={{
        display: "flex",
        marginVertical: 10,
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <Text
        style={[
          textStyle.h4,
          { flex: 1, textAlign: "right", marginRight: 10 },
          styles.modalText,
        ]}
      >
        Le chiffre est présent mais il n’est pas au bon endroit.
      </Text>
      <Image
        style={{
          width: 134,
          height: 90,
        }}
        source={require("../../../../assets/img/bulls_tutorial.png")}
      />
    </View>
    <Text
      style={[
        textStyle.h4,
        { fontSize: 15, textAlign: "center", marginTop: 24 },
        styles.modalText,
      ]}
    >
      Quels sont les chiffres concernés ? A vous de le deviner !{" "}
    </Text>
  </Modal>
);

export default HowToPlay;

import React from "react";
import { Text } from "react-native";
import { Modal, ModalProps, styles } from "../../components";

const HowToPlay = ({ visible, onClose }: ModalProps) => (
  <Modal visible={visible} onClose={onClose}>
    <Text style={styles.modalTitle}>Comment qu'on joue ?</Text>
    <Text style={styles.modalText}>
      Ce jeu se joue à deux et au tour-par-tour.
    </Text>
    <Text style={styles.modalText}>
      Chaque joueur saisit le chiffre que l’autre joueur doit deviner.
    </Text>
    <Text style={styles.modalText}>
      Le but : deviner le chiffre de son adversaire avant qu’il ne devine le
      vôtre !
    </Text>
    <Text style={styles.modalText}>
      Vache : Le chiffre est présent et il est au bon endroit !
    </Text>
    <Text style={styles.modalText}>
      Taureau : Le chiffre est présent mais il n’est pas au bon endroit.
    </Text>
    <Text style={styles.modalText}>
      Quels sont les chiffres concernés ? A vous de le deviner !{" "}
    </Text>
  </Modal>
);

export default HowToPlay;

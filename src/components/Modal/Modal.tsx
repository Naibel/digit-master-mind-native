import React, { ReactNode } from "react";
import {
  Modal as RNModal,
  StyleSheet,
  Text,
  Pressable,
  View,
} from "react-native";

export type ModalProps = {
  visible: boolean;
  onClose: () => void;
  children?: ReactNode;
  onDigitChange?: (value: string) => void;
  onBegin?: () => void;
  openGames?: any[];
};

const Modal = ({ visible, children, onClose }: ModalProps) => (
  <RNModal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        {children}
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={onClose}
        >
          <Text style={styles.textStyle}>Fermer la fenêtre</Text>
        </Pressable>
      </View>
    </View>
  </RNModal>
);

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalTitle: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "stretch",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 5,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Modal;

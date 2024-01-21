import React from "react";
import { HowToPlayModal, JoinGameModal, StartGameModal } from "./modals";
import { ModalType } from "./Home";

interface HomeModalsProps {
  navigation: any;
  onClose: () => void;
  modalOpened: ModalType;
}

const HomeModals = ({ navigation, onClose, modalOpened }: HomeModalsProps) => (
  <>
    <StartGameModal
      navigation={navigation}
      visible={modalOpened === "start"}
      onClose={onClose}
    />
    <JoinGameModal
      navigation={navigation}
      visible={modalOpened === "join"}
      onClose={onClose}
    />
    <HowToPlayModal visible={modalOpened === "htp"} onClose={onClose} />
  </>
);

export default HomeModals;

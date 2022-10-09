import React from "react";
import { Text } from "react-native";
import { Modal, ModalProps, styles } from "../../components";

const HowToPlay = ({ visible, onClose }: ModalProps) => (
  <Modal visible={visible} onClose={onClose}>
    <Text style={styles.modalTitle}>How to Play</Text>
    <Text style={styles.modalText}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet
      auctor odio. Donec vestibulum neque nec mauris faucibus, finibus blandit
      neque efficitur. Vestibulum ante tellus, volutpat quis feugiat eget,
      ullamcorper quis tellus. Sed ut ipsum id nisl posuere dapibus. Donec mi
      velit, luctus vel faucibus rhoncus, hendrerit in nunc. Sed eget massa
      nisl. Cras sollicitudin vulputate libero a dapibus. Morbi hendrerit
      lobortis ipsum, in iaculis nibh feugiat in. Nullam tempus porta iaculis.
    </Text>
    <Text style={styles.modalText}>
      Suspendisse eleifend dapibus mi sit amet facilisis. Suspendisse tempus
      ante sit amet libero tincidunt iaculis. Ut egestas justo justo, et
      consequat turpis accumsan id. Mauris dapibus lacus quis leo laoreet, ut
      venenatis ipsum suscipit. Vivamus viverra felis quis est egestas bibendum.
      Quisque consectetur tincidunt libero, et suscipit sapien auctor ac.
      Aliquam erat volutpat. Vivamus commodo mattis turpis. Sed venenatis tempus
      nibh, eu vulputate tellus placerat quis. Nunc id odio egestas justo
      molestie pulvinar et non lectus. Donec eget leo ipsum.
    </Text>
  </Modal>
);

export default HowToPlay;

import React, {useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {HowToPlayModal, JoinGameModal, StartGameModal} from '../../modals';

const HomeModals = ({
  onClose,
  startModalVisible,
  joinModalVisible,
  htpModalVisible,
}: {
  onClose: () => void;
  startModalVisible: boolean;
  joinModalVisible: boolean;
  htpModalVisible: boolean;
}) => (
  <>
    <StartGameModal visible={startModalVisible} onClose={onClose} />
    <JoinGameModal visible={joinModalVisible} onClose={onClose} />
    <HowToPlayModal visible={htpModalVisible} onClose={onClose} />
  </>
);

const Home = () => {
  const [modalOpened, setModalOpened] = useState<
    'start' | 'join' | 'htp' | null
  >(null);

  return (
    <SafeAreaView style={styles.centeredView}>
      <HomeModals
        onClose={() => setModalOpened(null)}
        startModalVisible={modalOpened === 'start'}
        joinModalVisible={modalOpened === 'join'}
        htpModalVisible={modalOpened === 'htp'}
      />
      <View style={styles.menu}>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalOpened('start')}>
          <Text style={styles.textStyle}>Start Game</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalOpened('join')}>
          <Text style={styles.textStyle}>Join Game</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalOpened('htp')}>
          <Text style={styles.textStyle}>How To Play</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: '#b8e994',
  },
  menu: {
    padding: 20,
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
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
  },
  buttonOpen: {
    backgroundColor: '#38ada9',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Home;

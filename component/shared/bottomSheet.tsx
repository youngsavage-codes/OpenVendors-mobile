import { Alert, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '@/theme/colors';
import IconButton from './IconButton';
import { ArrowLeft } from 'iconsax-react-nativejs';

const BottomSheet = ({modalVisible, setModalVisible, children, style}: any) => {
  return (
     <Modal 
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
        }}
    >
        <View style={styles.centeredView}>
            <View style={[styles.modalView, style]}>
                <IconButton onPress={() => setModalVisible(false)} >
                    <ArrowLeft size={20}  />
                </IconButton>
                {
                    children
                }
            </View>
        </View>
    </Modal>
  )
}

export default BottomSheet

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: colors.overlay
    },
    modalView: {
        backgroundColor: 'white',
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
})
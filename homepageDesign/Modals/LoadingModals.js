import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';

const LoadingModal = ({ isLoading }) => {
    return (
        <Modal
            transparent
            visible={isLoading}
            animationType="fade"
            statusBarTranslucent
        >
            <View style={styles.container}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default LoadingModal;

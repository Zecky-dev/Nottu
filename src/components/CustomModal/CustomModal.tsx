import React from 'react';
import Modal from 'react-native-modal';
import { View, TouchableOpacity } from 'react-native';
import styles from './CustomModal.style'; // Keep your existing styles
import type { ModalProps } from 'react-native-modal';

import Icon from '@components/Icon';
import COLORS from '@colors';

type CustomModalProps = Partial<ModalProps> & {
  children: React.ReactNode;
  onClose: () => void;
  isFullScreen?: boolean;
};

const CustomModal = ({
  children,
  onBackdropPress,
  onClose,
  isFullScreen = true,
  ...rest
}: CustomModalProps) => {

  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      {...rest}
      style={isFullScreen ? styles.fullScreenModalContainer : styles.modalContainer}
    >
      <View
        style={isFullScreen ? styles.fullScreenContentContainer : styles.contentContainer}
      >
        <TouchableOpacity onPress={onClose} style={styles.closeButtonContainer}>
          <Icon name='close-outline' type='ion' size={28} color={'rgba(0,0,0,0.5)'}/>
        </TouchableOpacity>
        {children}
      </View>
    </Modal>
  );
};

export default CustomModal;
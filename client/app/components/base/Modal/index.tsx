import React, { FC } from 'react';
import { Modal as BaseModal } from 'antd';
import { ModalProps as BaseModalProps } from 'antd/es/modal';
import { ModalStaticFunctions as BaseModalStaticFunctions } from 'antd/es/modal/confirm';

const { confirm, info, error, success, warn, warning, useModal, destroyAll } = BaseModal;
export type ModalProps = BaseModalProps;
type ModalComponent = FC<ModalProps> &
    BaseModalStaticFunctions & {
        destroyAll: () => void;
        useModal: typeof useModal;
    };

const Modal: ModalComponent = (props) => <BaseModal {...props} />;

Modal.confirm = confirm;
Modal.info = info;
Modal.error = error;
Modal.success = success;
Modal.warning = warning;
Modal.warn = warn;
Modal.useModal = useModal;
Modal.destroyAll = destroyAll;

export default Modal;

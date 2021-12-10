import React  from "react";
import { Modal } from 'antd';

export const CloseModal = ({ visible, setVisible, callback, title }: any) => {
  
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  //const [modalText, setModalText] = React.useState('Content of the modal');

  //const showModal = () => {
  //  setVisible(true);
  //};

  const handleOk = () => {
    //setModalText('The modal will be closed after two seconds');
	callback()
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
      <Modal
        title="Delete This Post?"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
		<p>Are you sure you want to delete the <b>{title}</b>?</p>
        <p>This action cannot be undone.</p>
      </Modal>
  );
};
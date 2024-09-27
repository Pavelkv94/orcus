import { Modal } from "antd";

type PropsType = {
  visible: boolean;
  setVisible: (value: boolean) => void;
  callback: () => void;
  title: string;
};
export const CloseModal = ({ visible, setVisible, callback, title }: PropsType) => {
  const handleOk = () => {
    callback();
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal title="Delete This Post?" visible={visible} onOk={handleOk} onCancel={handleCancel}>
      <p>
        Are you sure you want to delete the <b>{title}</b>?
      </p>
      <p>This action cannot be undone.</p>
    </Modal>
  );
};

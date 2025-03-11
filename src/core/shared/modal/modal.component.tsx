import './modal.component.scss';
import {Modal} from 'antd';
import {IModalTypes} from './modal';
import {TableCloseIcon} from '../../../assets/images/icons/rack';




const ModalComponent = ({isOpen, handleOk, handleCancel, footerContent, mainContent, headerContent, width} : IModalTypes) => {





    return (
        <Modal
            open={isOpen}
            title={headerContent}
            onOk={handleOk}
            onCancel={handleCancel}
            width={width}
            footer={[
                footerContent
            ]}
            closeIcon={<div><TableCloseIcon /></div>}
        >
            {mainContent}
        </Modal>
    );
};

export default ModalComponent;

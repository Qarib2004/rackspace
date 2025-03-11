import './add-device-form.component.scss';
import {Checkbox, Form, Input, Select} from 'antd';
import type {FormProps} from 'antd';
import {IAddDeviceForm} from './add-device-d';
import ButtonComponent from '../../../core/shared/button/button.component';
import {useNavigate} from 'react-router-dom';
import {useForm} from 'antd/es/form/Form';
import {useRef} from 'react';


function AddDeviceFormComponent() {

    const [form] = useForm<IAddDeviceForm>();


    const navigate = useNavigate();

    const checkRef = useRef<any>(null);

    const onFinish: FormProps<IAddDeviceForm>['onFinish'] = (values) => {
        console.log('Success:', values);
        console.log('Success:', form);
    };

    const onFinishFailed: FormProps<IAddDeviceForm>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
        console.log('Success:', form);
    };

    return (
        <div className="add-device-form">
            <Form
                style={{width: '100%'}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>
                <div className={'add-device-form--group'}>
                    <p>
                        İnventar nömrəsi
                    </p>
                    <Form.Item
                        name={'inventory'}
                        rules={[{required: true}]}
                    >
                        <Input type={'number'} placeholder="Daxil edin"/>
                    </Form.Item>
                </div>
                <div className={'add-device-form--group'}>
                    <p>
                        Seriya nömrəsi
                    </p>
                    <Form.Item
                        name={'serialNumber'}
                        rules={[{required: true}]}
                    >
                        <Input type={'number'} placeholder="Daxil edin"/>
                    </Form.Item>
                </div>
                <div className={'add-device-form--group'}>
                    <p>
                        Marka adı
                    </p>
                    <Form.Item
                        name={'brand'}
                        rules={[{required: true}]}
                    >
                        <Input placeholder="Daxil edin"/>
                    </Form.Item>
                </div>
                <div className={'add-device-form--group'}>
                    <p>
                        Model adı
                    </p>
                    <Form.Item
                        name={'model'}
                        rules={[{required: true}]}
                    >
                        <Input placeholder="Daxil edin"/>
                    </Form.Item>
                </div>
                <div className={'add-device-form--group'}>
                    <p>
                        Avadanlıq tipi
                    </p>
                    <Form.Item
                        name={'deviceType'}
                        rules={[{required: true}]}
                    >
                        <Select
                            placeholder="Seçin"
                        />
                    </Form.Item>
                </div>
                <div className={'add-device-form--group'}>
                    <p>
                        Unit sayı
                    </p>
                    <Form.Item
                        name={'unitCount'}
                        rules={[{required: true}]}
                    >
                        <Input placeholder="Daxil edin"/>
                    </Form.Item>
                </div>
                <div className={'add-device-form--group'}>
                    <p>
                        Anbardakı otaq
                    </p>
                    <Form.Item
                        name={'room'}
                        rules={[{required: true}]}
                    >
                        <Select
                            placeholder="Daxil edin"
                        />
                    </Form.Item>
                </div>
                <div className={'add-device-form--group'}>
                    <p>
                        Aid olduğu şirkət
                    </p>
                    <Form.Item
                        name={'company'}
                        rules={[{required: true}]}
                    >
                        <Select
                            placeholder="Daxil edin"
                        />
                    </Form.Item>
                </div>
                <div className={'add-device-form--checkbox'}>
                    <Form.Item
                        name={'confirm'}
                        valuePropName="checked">
                        <Checkbox>
                            <p>Cihazın ölçüsü uzun olduğuna görə rack-in hər iki tərəfini əhatə edəcək.</p>
                        </Checkbox>
                    </Form.Item>

                </div>
                <div className={'add-device-form--footer'}>

                    <ButtonComponent
                        click={() => navigate(-1)}
                        classNamesComponent={'add-device-form--button table-modal-footer--button_left'}>İmtina
                        edin</ButtonComponent>
                    <Form.Item>
                        <ButtonComponent type={'primary'}
                                         classNamesComponent={'add-device-form--button table-modal-footer--button_right'}
                                         htmlType={'submit'}>
                            Təsdiq edin</ButtonComponent>
                    </Form.Item>
                </div>


            </Form>
        </div>
    );
}

export default AddDeviceFormComponent;

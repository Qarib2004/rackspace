import './table-modal-main.component.scss';
import {Select, Input, Form} from 'antd';
import TableModalCustomDropdownComponent from '../table-modal-custom-dropdown/table-modal-custom-dropdown.component';
import ButtonComponent from '../../../../core/shared/button/button.component';
import {ITableModalMain} from './table-modal-main';
import type {FormProps} from 'antd';


function TableModalMainComponent({closeFn} : { closeFn?: () => void }) {
    const [form] = Form.useForm();
    const onFinish: FormProps<ITableModalMain>['onFinish'] = (values) => {

        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<ITableModalMain>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };




    const roomOptions = [
        {label: 'Computer Room - 1', value: 'room1'},
        {label: 'Computer Room - 2', value: 'room2'},
        {label: 'Computer Room - 3', value: 'room3'}
    ];

    const rackOptions = [
        {label: 'Rack 101', value: 'rack101'},
        {label: 'Rack 102', value: 'rack102'},
        {label: 'Rack 103', value: 'rack103'},
        {label: 'Rack 104', value: 'rack104'},
        {label: 'Rack 105', value: 'rack105'},
        {label: 'Rack 106', value: 'rack106'},
        {label: 'Rack 107', value: 'rack107'}

    ];

    const directionOptions = [
        {label: 'Ön', value: 'front', disabled: false},
        {label: 'Arxa', value: 'back', disabled: false},
    ];

    const unitsOptions = [
        {label: '1', value: '1', disabled: false},
        {label: '2', value: '2', disabled: false},
        {label: '3', value: '3', disabled: true},
        {label: '4', value: '4', disabled: true},
        {label: '5', value: '5', disabled: false},
        {label: '6', value: '6', disabled: false},
        {label: '7', value: '7', disabled: false},
    ];


    return (
        <>
            <Form onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  form={form}
            >
                <div className={'table-modal-main'}>
                    <div className={'table-modal-main--group'}>
                        <p>Otaq</p>
                        <Form.Item<ITableModalMain>
                            name={'room'}
                            style={{margin: 0}}
                            rules={[{required: true}]}
                        >
                            <Select
                                placeholder={'Seçin'}
                                style={{width: '100%'}}
                                options={roomOptions}
                            />
                        </Form.Item>
                    </div>
                    <div className={'table-modal-main--group'}>
                        <p>Rack</p>
                        <Form.Item<ITableModalMain>
                            name={'rack'}
                            style={{margin: 0}}
                            rules={[{required: true}]}>
                            <Select
                                placeholder={'Seçin'}
                                style={{width: '100%'}}
                                options={rackOptions}
                            />
                        </Form.Item>
                    </div>
                    <div className={'table-modal-main--group'}>
                        <p>Yerləşəcəyi istiqamət</p>
                        <Form.Item<ITableModalMain>
                            name={'directions'}
                            style={{margin: 0}}
                            rules={[{required: true}]}
                        >
                            <TableModalCustomDropdownComponent
                                options={directionOptions}
                            />
                        </Form.Item>
                    </div>
                    <div className={'table-modal-main--group'}>
                        <p>Unit</p>
                        <Form.Item<ITableModalMain>
                            name={'units'}
                            style={{margin: 0}}
                            rules={[{required: true}]}
                        >
                            <TableModalCustomDropdownComponent
                                options={unitsOptions}/>
                        </Form.Item>
                    </div>
                    <div className={'table-modal-main--group'}>
                        <p>Label</p>
                        <Form.Item<ITableModalMain>
                            name={'label'}
                            style={{margin: 0}}
                            rules={[{required: true}]}>
                            <Input placeholder="Daxil edin"/>
                        </Form.Item>
                    </div>

                </div>
                <div className='table-modal-footer'>

                    <ButtonComponent click={closeFn} classNamesComponent={'table-modal-footer--button table-modal-footer--button_left'}>İmtina
                        edin</ButtonComponent>
                    <Form.Item>
                        <ButtonComponent type={'primary'}
                                         classNamesComponent={'table-modal-footer--button table-modal-footer--button_right'}
                                         htmlType={'submit'}>
                            Təsdiq edin</ButtonComponent>
                    </Form.Item>
                </div>
            </Form>
        </>

    );
}

export default TableModalMainComponent;
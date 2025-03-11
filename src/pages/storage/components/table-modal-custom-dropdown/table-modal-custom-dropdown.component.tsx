import {Select, Checkbox} from 'antd';
import {useCallback, useState} from 'react';


function TableModalCustomDropdownComponent({options, onChange}: any) {
    const [valuesList, setValuesList] = useState<string[]>([]);
    const handleCheckboxChange = (value: any) => {
        let newSelected = [...valuesList];
        if (newSelected.includes(value)) {
            newSelected = newSelected.filter((val) => val !== value);
        } else {
            newSelected.push(value);
        }
        setValuesList(newSelected);
        onChange(newSelected);
    };


    const dropdownRender = () => (
        <div>
            {options.map((option: any) => (
                <div key={option.value} className={'table-modal-main--custom'}>
                    <Checkbox
                        className={'table-modal-main--custom_checkbox'}
                        checked={valuesList.includes(option.value)}
                        onChange={() => handleCheckboxChange(option.value)}
                        disabled={option.disabled}
                    >
                        <p>{option.label} {option.disabled ? 'Dolu' : ''}</p>
                    </Checkbox>
                </div>
            ))}
        </div>
    );

    const onClear = useCallback((value: string[]) => {
        setValuesList(value);
        onChange(value);
    }, [onChange]);

    return (
        <>
            <Select
                mode="multiple"
                style={{width: '100%'}}
                placeholder={'Seçin'}
                value={valuesList}
                onChange={onClear}
                showSearch={false}
                options={options}
                dropdownRender={dropdownRender}
            />
        </>
    );
}

export default TableModalCustomDropdownComponent;
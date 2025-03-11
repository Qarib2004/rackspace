import './storage-buttonlist.scss';
import ButtonComponent from '../../../../core/shared/button/button.component';

import {ArrowMove} from '../../../../assets/images/icons/arrows';
import {DeleteIcon, EditIcon} from '../../../../assets/images/icons/edit';


function StorageButtonListComponent({buttonsFunction}: any) {

    return (
        <div className='storage-buttonlist'>
            <ButtonComponent classNamesComponent={'storage-buttonlist--move'}
                             click={() => buttonsFunction('move')}>
                <div className='storage-buttonlist--move_wrapper'>
                    <ArrowMove/>
                    <p>Yerləşdir</p>
                </div>
            </ButtonComponent>
            <ButtonComponent classNamesComponent={'storage-buttonlist--edit'}>
                <EditIcon/>
            </ButtonComponent>
            <ButtonComponent classNamesComponent={'storage-buttonlist--delete'}>
                <DeleteIcon/>
            </ButtonComponent>
        </div>
    );
}

export default StorageButtonListComponent;

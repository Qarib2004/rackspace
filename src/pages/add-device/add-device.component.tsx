import './add-device.component.scss';
import BackComponent from '../../core/shared/back/back.component';
import CardComponent from '../../core/shared/card/card.component';
import TitleComponent from '../../core/shared/title/title.component';
import {LibraryIcon} from '../../assets/images/icons/lib';
import AddDeviceFormComponent from './add-device-form/add-device-form.component';

function AddDeviceComponent() {


    return (
        <div className="add-device">
            <BackComponent/>
            <CardComponent
                classNamesComponent={'add-device--card'}>
                <div className="add-device--card__content">
                    <TitleComponent icon={<LibraryIcon/>} text={'Cihazın əlavə edilməsi'}/>
                    <AddDeviceFormComponent/>
                </div>
            </CardComponent>
        </div>
    );
}

export default AddDeviceComponent;

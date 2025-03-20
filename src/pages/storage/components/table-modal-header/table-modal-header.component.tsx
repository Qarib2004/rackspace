import './table-modal-header.component.scss';
import {RackIcon} from '../../../../assets/images/icons/rack';
import TitleComponent from '../../../../core/shared/title/title.component';


function TableModalHeaderComponent() {


    return (

        <div className="table-modal-header">
            <TitleComponent
                text={'Rack-a yerləşdirmə'}
                icon={<RackIcon/>}/>
        </div>


    );
}

export default TableModalHeaderComponent;
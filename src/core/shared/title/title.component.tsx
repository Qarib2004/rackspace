import './title.component.scss';
import {ITitleType} from './table';
function TitleComponent({icon, text} : ITitleType) {



    return (
        <>
            <div className={'title'}>
                {icon}
                <p className={'title--text'}>{text}</p>
            </div>
        </>

    );
}

export default TitleComponent;
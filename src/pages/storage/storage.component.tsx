import './storage.component.scss';
import NavigationComponent from '../../core/shared/navigation/navigation.component';
import StorageSearchbarComponent from './components/storage-searchbar/storage-searchbar.component';
import StorageTableComponent from './components/table/storage-table.component';



function StorageComponent() {

    return (
        <div>
            <NavigationComponent text={'Anbar'}/>
            <StorageSearchbarComponent />
            <StorageTableComponent/>
        </div>
    );
}

export default StorageComponent;

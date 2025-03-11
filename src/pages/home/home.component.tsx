import {useHomeStyles} from './home.style';

function HomeComponent() {
    const classes = useHomeStyles();


    return (
        <div className={classes.home}>

        </div>
    );
}

export default HomeComponent;

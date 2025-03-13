import useHomeStyles from './home.style';
import OneSection from 'core/layouts/public/components/section-one/one.component';
import CategoriesSection from 'core/layouts/public/components/categories-section/categories.component';

function HomeComponent() {
    const classes = useHomeStyles();


    return (
        <div className={classes.home}>
          <OneSection/>
          <CategoriesSection/>
        </div>
    );
}

export default HomeComponent;

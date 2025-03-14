import useHomeStyles from './home.style';
import OneSection from 'core/layouts/public/components/section-one/one.component';
import CategoriesSection from 'core/layouts/public/components/categories-section/categories.component';
import Card from 'core/shared/home-card/card.component';
import ClienteSection from 'core/layouts/public/components/client-section/client.component';
import ProfilCard from 'core/layouts/public/components/profil-card/profil.component';

function HomeComponent() {
    const classes = useHomeStyles();


    return (
        <div className={classes.home}>
          <OneSection/>
          <CategoriesSection/>
          <Card/>
          <ClienteSection/>
          <ProfilCard/>
        </div>
    );
}

export default HomeComponent;

import React from 'react';
import './categories.compinent.scss';

const iconPath = 'src/assets/images/categories/6wNfUPvIoLpNWXHmuqmeRa5nUvGw14EPfMkDQcti.svg';
const iconPath2 = 'src/assets/images/categories/8xXVbe14xepA6ZPuguAJc823EcqkTeJSp28R88Z8.svg';
const iconPath3 = 'src/assets/images/categories/dkR35eUlXHHiagLjqSrvjXry0RhAF7EzRfZeoOne.svg';
const iconPath4 = 'src/assets/images/categories/FgeFXvjnO5eV7G6UShtS2v4OsRdsaag8re7vqaLy.svg';
const iconPath5 = 'src/assets/images/categories/NVRcywro3PdiVYHhMhsyf7yMkICzi7BOMPevofRr.svg';
const iconPath6 = 'src/assets/images/categories/UcMFgzAJT18PBXZg4atWpblYEKpc9B2R97VwmAxh.svg';
const iconPath7 = 'src/assets/images/categories/vlg4oW5Mer92yvZJnTTdd8HVdxki8oKM94RQ6Nkj.svg';
const iconPath8 = 'src/assets/images/categories/WLZEU9UisqTjbSraMy5IGOIQUOsOgoi1FHljo0EX.svg';
const iconPath9 = 'src/assets/images/categories/X4tme9oett1sQ2YyGCp6JF8L5q9N5oLNg4xaP3bk.svg';
const iconPath10 = 'src/assets/images/categories/ykX4ezOTRvxC3J41Wa9z2UB7spSd4eNBynxMPFOV.svg';


const categories = [
  { icon: `${iconPath3}`, label: 'Verduras', color: 'green' },
  { icon: `${iconPath9}`, label: 'Tubérculos', color: 'orange' },
  { icon: `${iconPath4}`, label: 'Sementes', color: 'red' },
  { icon: `${iconPath6}`, label: 'Raizes', color: 'blue' },
  { icon: `${iconPath7}`, label: 'Leguminosas', color: 'amber-dark' },
  { icon: `${iconPath}`, label: 'Legumes', color: 'orange-dark' },
  { icon: `${iconPath5}`, label: 'Frutos secos', color: 'amber' },
  { icon: `${iconPath10}`, label: 'Frutas', color: 'yellow' },
  { icon: `${iconPath2}`, label: 'Ervas Aromáticas', color: 'emerald' },
  { icon: `${iconPath8}`, label: 'Cereais', color: 'amber-light' },
];

const CategoriesSection = () => {
  return (
    <section className="categories-section">
      <h2 className="section-title">Categorias</h2>
      <div className="categories-container">
        <div className="categories-grid">
          {categories.map((category, index) => (
            <div
              key={index}
              className="category-item"
            >
                                <div className="icon-background"></div>

              <div className="icon-container">
                <div className={`icon-wrapper ${category.color}`} >
                  <img 
                    src={category.icon} 
                    alt={category.label} 
                    className="category-icon"
                    
                  />
                </div>
              </div>
              <span className="category-label">
                {category.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
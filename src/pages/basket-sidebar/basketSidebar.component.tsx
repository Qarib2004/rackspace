import React, { useEffect, useState } from 'react';
import './basketSidebar.component.scss';
import ot from '../../assets/images/basket/OKdAduzv3SOT6gVBYVfP349DhSyKO3MoRclv3BoP.png';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface SidebarBasketProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarBasket: React.FC<SidebarBasketProps> = ({ isOpen, onClose }) => {
  const [basketItems, setBasketItems] = useState<Product[]>([
    {
      id: 1,
      name: 'Ot',
      price: 4.00,
      quantity: 4,
      image: ot
    }
  ]);

  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const total = basketItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalPrice(total);
  }, [basketItems]);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity >= 0) {
      setBasketItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleRemoveItem = (id: number) => {
    setBasketItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <>
      <div className={`sidebar-basket-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <div className={`sidebar-basket ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-basket-header">
          <button className="back-button" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Geri qayıtmaq üçün
          </button>
        </div>

        <div className="sidebar-basket-title">
          <h2>Məhsullar <span>({basketItems.length})</span></h2>
        </div>

        <div className="sidebar-basket-content">
          {basketItems.length === 0 ? (
            <div className="empty-basket">
              <p>Səbətiniz boşdur</p>
            </div>
          ) : (
            <>
              <div className="product-list">
                {basketItems.map(item => (
                  <div className="product-item" key={item.id}>
                    <div className="product-image">
                      {item.image && <img src={item.image} alt={item.name} />}
                    </div>
                    <div className="product-details">
                      <p className="product-name">{item.name}</p>
                      <div className="product-price-controls">
                        <div className="quantity-control">
                          <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>−</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                        </div>
                        <div className="price">€{item.price.toFixed(2)}</div>
                      </div>
                    </div>
                    <button className="remove-item" onClick={() => handleRemoveItem(item.id)}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              <div className="basket-summary">
                <div className="summary-row">
                  <span>ƏDV</span>
                  <span>€0,19</span>
                </div>
                <div className="summary-row total">
                  <span>Cəmi:</span>
                  <span>€{totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <button className="checkout-button">Yoxlama</button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SidebarBasket;
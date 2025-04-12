import React, { useEffect, useState } from 'react';
import './basketSidebar.component.scss';
import { useGetBasket } from './actions/basket.query';
import {
  useUpdateBasketItem,
  useRemoveFromBasket,
} from './actions/basket.mutation';
import { useSelector } from 'react-redux';
import placeholderImg from '../../assets/images/basket/OKdAduzv3SOT6gVBYVfP349DhSyKO3MoRclv3BoP.png';

interface BasketProduct {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string[];
  productId?: string;
}

interface SidebarBasketProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarBasket: React.FC<SidebarBasketProps> = ({ isOpen, onClose }) => {
  const user = useSelector((state: any) => state.user);
  const userId = user?.id || '';

  const [basketItems, setBasketItems] = useState<BasketProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const {
    data: basketData,
    error: basketError,
    isLoading: basketLoading,
    refetch,
  } = useGetBasket(userId);

  const updateItemMutation = useUpdateBasketItem(userId);
  const removeItemMutation = useRemoveFromBasket(userId);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId || !isOpen) return;

      setIsLoading(true);
      setError(null);

      try {
        await refetch();
      } catch (err) {
        console.error('Failed to fetch basket:', err);
        setError('It was not possible to load the basket.Please try later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId, isOpen, refetch]);

  useEffect(() => {
    if (basketData && basketData.status === 'success') {
      try {
        const mappedItems = basketData.data.items.map(
          (item: {
            product?: {
              _id: string;
              name: string;
              price: number;
              image: string[];
            };
            quantity: number;
            _id?: string;
          }) => ({
            _id:
              item.product?._id ||
              item._id ||
              `temp-${Date.now()}-${Math.random()
                .toString(36)
                .substring(2, 9)}`,
            productId: item.product?._id,
            name: item.product?.name || 'Unknown goods',
            price: item.product?.price || 0,
            quantity: item.quantity,
            image: item.product?.image || [],
          })
        );

        setBasketItems(mappedItems);
        setTotalPrice(basketData.data.totalPrice);
      } catch (error) {
        console.error('Error processing basket data:', error);
        setError('Basket processing error');
      }
    }
  }, [basketData]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }

    return () => {
      document.body.classList.remove('sidebar-open');
    };
  }, [isOpen]);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }

    updateItemMutation.mutate(
      {
        itemId: itemId,
        quantity: newQuantity,
      },
      {
        onSuccess: () => {
          setBasketItems((prevItems) =>
            prevItems.map((item) =>
              item._id === itemId ? { ...item, quantity: newQuantity } : item
            )
          );
        },
        onError: (error) => {
          console.error('Failed to update item quantity:', error);
        },
      }
    );
  };

  const handleRemoveItem = (itemId: string) => {
    removeItemMutation.mutate(
      {
        itemId: itemId,
      },
      {
        onSuccess: () => {
          setBasketItems((prevItems) =>
            prevItems.filter((item) => item._id !== itemId)
          );
        },
        onError: (error) => {
          console.error('Failed to remove item:', error);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <>
        <div
          className={`sidebar-basket-overlay ${isOpen ? 'open' : ''}`}
          onClick={onClose}
        ></div>
        <div className={`sidebar-basket ${isOpen ? 'open' : ''}`}>
          <div className="sidebar-basket-header">
            <button className="back-button" onClick={onClose}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 12H5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 19L5 12L12 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Geri qayıtmaq üçün
            </button>
          </div>
          <div className="sidebar-basket-content">
            <div className="loading-basket">
              <p>Səbət yüklənir...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div
          className={`sidebar-basket-overlay ${isOpen ? 'open' : ''}`}
          onClick={onClose}
        ></div>
        <div className={`sidebar-basket ${isOpen ? 'open' : ''}`}>
          <div className="sidebar-basket-header">
            <button className="back-button" onClick={onClose}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 12H5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 19L5 12L12 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Geri qayıtmaq üçün
            </button>
          </div>
          <div className="sidebar-basket-content">
            <div className="error-basket">
              <p>{error}</p>
              <button onClick={() => refetch()}>Повторить попытку</button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div
        className={`sidebar-basket-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      ></div>
      <div className={`sidebar-basket ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-basket-header">
          <button className="back-button" onClick={onClose}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 12H5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 19L5 12L12 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Geri qayıtmaq üçün
          </button>
        </div>

        <div className="sidebar-basket-title">
          <h2>
            Məhsullar <span>({basketItems.length})</span>
          </h2>
        </div>

        <div className="sidebar-basket-content">
          {!userId ? (
            <div className="empty-basket">
              <p>Войдите в аккаунт, чтобы увидеть корзину</p>
            </div>
          ) : basketItems.length === 0 ? (
            <div className="empty-basket">
              <p>Səbətiniz boşdur</p>
            </div>
          ) : (
            <>
              <div className="product-list">
                {basketItems.map((item) => (
                  <div className="product-item" key={item._id}>
                    <div className="product-image">
                      {item.image && item.image.length > 0 ? (
                        <img src={item.image[0]} alt={item.name} />
                      ) : (
                        <img src={placeholderImg} alt={item.name} />
                      )}
                    </div>
                    <div className="product-details">
                      <p className="product-name">{item.name}</p>
                      <div className="product-price-controls">
                        <div className="quantity-control">
                          <button
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity - 1)
                            }
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                        <div className="price">€{item.price.toFixed(2)}</div>
                      </div>
                    </div>
                    <button
                      className="remove-item"
                      onClick={() => handleRemoveItem(item._id)}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15 5L5 15M5 5L15 15"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              <div className="basket-summary">
                <div className="summary-row">
                  <span>ƏDV</span>
                  <span>€{(totalPrice * 0.18).toFixed(2)}</span>
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

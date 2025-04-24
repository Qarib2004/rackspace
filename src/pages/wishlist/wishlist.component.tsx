import React, { useEffect, useState } from 'react';
import './wishlist.component.scss';
import { Filter, X, Trash2 } from 'lucide-react';
import Card from 'core/shared/base-card/card.component';
import { useSelector } from 'react-redux';
import placeholderImg from '../../assets/images/basket/OKdAduzv3SOT6gVBYVfP349DhSyKO3MoRclv3BoP.png';
import { useGetWishlist } from './actions/wishlist.query';
import { useRemoveFromWishlist } from './actions/wihslist.mutation';
import { useGetUser } from 'pages/profile/actions/profile.query';

export interface FavoriteProduct {
  _id: string;
  name: string;
  price: number;
  image?: string[];
  productId?: string;
  category?: string;
  availableStock?: number;
  rating?: number;
}

interface CardProps {
  rating?: number;
  productId?: string;
  title: string;
  price: number;
  image: string;
  category?: string;
  onCartClick: () => void;
  onFavoriteClick: () => void;
  isFavorite: boolean;
}

const FavoritesPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Hamısı');
  const [favoriteItems, setFavoriteItems] = useState<FavoriteProduct[]>([]);

  const user = useSelector((state: any) => state.user);
  const userId = user?.id || '';

  const filterOptions = ['Hamısı', 'Məhsullar', 'Elan', 'Istehsalci'];

  const {
    data: wishlistData,
    error: wishlistError,
    isLoading: wishlistLoading,
    refetch,
  } = useGetWishlist(userId);
  const { data: User } = useGetUser(userId);

  const removeItemMutation = useRemoveFromWishlist(userId);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      try {
        await refetch();
      } catch (err) {
        console.error('Failed to fetch wishlist:', err);
      }
    };

    fetchData();
  }, [userId, refetch]);

  useEffect(() => {
    if (wishlistData) {
      try {
        const items = Array.isArray(wishlistData.data.items)
          ? wishlistData.data.items
          : [];

        const mappedItems = items.map((item: any) => {
          const product = item.product || item;
          return {
            _id:
              product._id ||
              item._id ||
              `temp-${Date.now()}-${Math.random()
                .toString(36)
                .substring(2, 9)}`,
            productId: product._id,
            name: product.name || 'Unknown product',
            price: product.price || 0,
            image: product.image || [],
            rating: product.rating,
            availableStock: product.quantity,
          };
        });

        if (mappedItems.length > 0) {
          setFavoriteItems(mappedItems);
        }
      } catch (error) {
        console.error('Error processing wishlist data:', error);
      }
    }
  }, [wishlistData]);

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    setIsModalOpen(false);
  };

  const handleDeleteAll = () => {
    favoriteItems.forEach((item) => {
      handleRemoveFavorite(item._id);
    });
  };

  const handleRemoveFavorite = (itemId: string) => {
    setFavoriteItems((prevItems) =>
      prevItems.filter((item) => item._id !== itemId)
    );

    removeItemMutation.mutate(
      { productId: itemId },
      {
        onSuccess: (data) => {
          console.log(
            '[Wishlist] Removal API call successful, response:',
            data
          );
          refetch().then((result) => {
            console.log('[Wishlist] Refetch after removal:', result);
          });
        },
        onError: (error: any) => {
          console.error('[Wishlist] Removal API call failed:', error);
          console.error('[Wishlist] Error details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
          });

          refetch();
        },
      }
    );
  };

  const filteredItems =
    selectedFilter === 'Hamısı'
      ? favoriteItems
      : favoriteItems.filter((item) => item.category === selectedFilter);

  const renderFavoritesList = () => {
    if (wishlistLoading) {
      return <p className="favorites-list__loading">Yüklənir...</p>;
    }

    if (wishlistError) {
      return (
        <div className="favorites-list__error">
          <p>
            Sevimliləri yükləmək mümkün olmadı. Zəhmət olmasa sonra cəhd edin.
          </p>
          <button onClick={() => refetch()}>Yenidən cəhd edin</button>
        </div>
      );
    }

    if (!userId) {
      return (
        <p className="favorites-list__empty-message">
          Sevimlilər siyahınızı görmək üçün daxil olun
        </p>
      );
    }

    if (filteredItems.length === 0) {
      return (
        <>
          <p className="favorites-list__empty-message">
            Axtarışınız heç bir favoritə uyğun gəlmədi.
          </p>
          <div className="illustration">
            <div className="illustration__image">
              <img
                src="src\assets\images\favorites\download.webp"
                alt="Empty favorites"
              />
            </div>
          </div>
        </>
      );
    }

    const cardData = filteredItems.map((item) => ({
      ...item,
      image:
        item.image && item.image.length > 0 ? item.image[0] : placeholderImg,
    }));

    return (
      <div className="favorites-grid">
        <Card
          data={cardData}
          imageKey="image"
          titleKey="name"
          priceKey="price"
          itemsPerPage={8}
          showPagination={true}
          pageTitle=""
        />
      </div>
    );
  };

  return (
    <div className="favorites-page">
      <header className="header1">
        <h1 className="header1__title">SALAM {User?.firstname || 'USERNAME'}</h1>
        <p className="header1__welcome">SEVİMLİ SİYAHINA XOŞ GƏLİRSİNİZ</p>
      </header>

      <main className="main-content">
        <div className="favorites-container">
          <div className="favorites-header">
            <h2 className="favorites-header__title">
              Sevimlilər siyahısı
              {filteredItems.length > 0 && (
                <span> ({filteredItems.length})</span>
              )}
            </h2>

            <div className="favorites-header__actions">
              <button
                className="favorites-header__filter"
                onClick={() => setIsModalOpen(true)}
              >
                <Filter size={18} />
                <span>Filtr: {selectedFilter}</span>
                <div className="dropdown-icon">▼</div>
              </button>

              {favoriteItems.length > 0 && (
                <button
                  className="favorites-header__delete"
                  onClick={handleDeleteAll}
                  aria-label="Delete all favorites"
                >
                  <Trash2 size={18} />
                  <span className="delete-text">Hamısını sil</span>
                </button>
              )}
            </div>
          </div>

          <div className="favorites-list">{renderFavoritesList()}</div>
        </div>
      </main>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__header">
              <h3>Filtr seçin</h3>
              <button
                className="modal__close"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal__content">
              <ul className="filter-options">
                {filterOptions.map((filter) => (
                  <li
                    key={filter}
                    className={`filter-option ${
                      selectedFilter === filter ? 'filter-option--selected' : ''
                    }`}
                    onClick={() => handleFilterSelect(filter)}
                  >
                    {filter}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;

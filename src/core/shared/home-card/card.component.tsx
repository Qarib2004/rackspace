import { useState, useEffect, useRef } from 'react';
import { Heart, MoreVertical, Share2, ShoppingCart } from 'lucide-react';
import './card.component.scss';
import { Product } from './card';
import { useGetProducts } from './actions/card.query';
import {
  useAddToBasket,
  useRemoveFromBasket,
} from 'pages/basket-sidebar/actions/basket.mutation';
import { useSelector } from 'react-redux';
import { User } from 'core/utils/IUser';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useAddToWishlist,
  useRemoveFromWishlist,
} from 'pages/wishlist/actions/wihslist.mutation';
import { FavoriteProduct } from 'pages/wishlist/wishlist.component';
import { useGetBasket } from 'pages/basket-sidebar/actions/basket.query';
import { useGetWishlist } from 'pages/wishlist/actions/wishlist.query';
import { BasketItem } from 'pages/basket-sidebar/basket';
import { WishlistItem } from 'pages/wishlist/wishlist';

export interface RootState {
  user: User;
}

export interface DropdownRefs {
  [key: string]: HTMLDivElement | null;
}

const Card = () => {
  const user = useSelector((state: RootState) => state.user);
  const userId = user?._id || user?.id || '';

  const addToBasketMutation = useAddToBasket(userId);
  const addToWishlistMutation = useAddToWishlist(userId);
  const { data: basketData, refetch: refetchBasket } = useGetBasket(userId);
  const { data: wishlistData, refetch: refetchWishlist } =
    useGetWishlist(userId);
  const { data: products, refetch } = useGetProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(4);
  const navigate = useNavigate();

  useEffect(() => {
    const checkScreenSize = () => {
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      setProductsPerPage(isMobile ? 2 : 4);
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const [openDropdownId, setOpenDropdownId] = useState<string | number | null>(
    null
  );
  const dropdownRefs = useRef<DropdownRefs>({});

  const allProducts = products?.data ?? [];

  const totalPages = Math.ceil(allProducts.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toggleDropdown = (productId: string | number, e: React.MouseEvent) => {
    console.log('Toggling dropdown for:', productId);
    e.stopPropagation();
    setOpenDropdownId((prevId) => {
      const newId = prevId === productId ? null : productId;
      return newId;
    });
  };

  const handleAddToBasket = (product: Product) => {
    if (!userId) {
      console.warn('User not logged in - cannot add to basket');
      console.groupEnd();
      return;
    }

    const mutationData = {
      item: {
        productId: String(product._id),
        quantity: 1,
      },
    };

    addToBasketMutation.mutate(mutationData, {
      onSuccess: (data) => {
        refetchBasket();
        setOpenDropdownId(null);
      },
      onError: (error) => {
        console.groupEnd();
      },
      onSettled: () => {
        toast.success('Məhsul səbətə əlavə edildi', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      },
    });
  };

  const handleAddToWishlist = (item: Product) => {
    if (!('_id' in item)) {
      console.warn('Item does not have _id property');
      console.groupEnd();
      return;
    }

    if (!userId) {
      console.warn('User not logged in - cannot add to wishlist');
      console.groupEnd();
      return;
    }

    const mutationData = {
      productId: String(item._id),
    };

    addToWishlistMutation.mutate(mutationData, {
      onSuccess: (data) => {
        refetchWishlist();
        setOpenDropdownId(null);
      },
      onError: (error) => {
        console.error('Error adding to wishlist:', error);
        console.groupEnd();
      },
      onSettled: () => {
        toast.success('Məhsul sevimlere əlavə edildi', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      },
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdownId !== null) {
        const dropdownRef = dropdownRefs.current[openDropdownId];

        if (
          dropdownRef &&
          !dropdownRef.contains(event.target as Node) &&
          !(event.target as Element).closest(
            `.options-button[data-product-id="${openDropdownId}"]`
          )
        ) {
          setOpenDropdownId(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdownId]);

  const setDropdownRef = (
    id: string | number,
    element: HTMLDivElement | null
  ) => {
    dropdownRefs.current[id] = element;
  };

  const basketItems: BasketItem[] = basketData?.data?.items || [];
  const wishlistItems: WishlistItem[] = wishlistData?.data?.items || [];

  const isInBasket = (productId: string): boolean => {
    return basketItems.some((item) => item.product._id === productId);
  };

  const isInWishlist = (productId: string): boolean => {
    return wishlistItems.some((item) => item._id === productId);
  };

  const [favoriteItems, setFavoriteItems] = useState<FavoriteProduct[]>([]);
  const removeItemMutation = useRemoveFromWishlist(userId);

  const handleRemoveFavorite = (productId: string) => {
    setFavoriteItems((prevItems) => {
      const updated = prevItems.filter((item) => item._id !== productId);
      return updated;
    });

    removeItemMutation.mutate(
      { productId },
      {
        onSuccess: (data) => {
          toast.success('Məhsul sevimlerden silindi');

          refetch();
        },
        onError: (error) => {
          console.error('[Wishlist] Removal failed:', error);

          refetch();
        },
      }
    );
  };

  const removeFromBasketMutation = useRemoveFromBasket(userId);

  const handleRemoveFromBasket = (productId: string) => {
    if (!userId) {
      console.warn('User not logged in - cannot remove from basket');
      return;
    }

    removeFromBasketMutation.mutate(
      { itemId: productId },
      {
        onSuccess: () => {
          console.log('[Basket] Product removed successfully:', productId);
          toast.success('Məhsul səbətdən silindi');
        },
        onError: (error) => {
          console.error('[Basket] Error removing product:', productId, error);
          toast.error('Səbətdən silinmə zamanı xəta baş verdi');
        },
      }
    );
  };

  return (
    <div className="product-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Bu yaxınlarda əlavə edildi</h1>
          <div className="pagination">
            <span className="pagination-info">
              Səhifə {currentPage}/{totalPages || 1}
            </span>
            <div className="pagination-buttons">
              <button
                className="pagination-button"
                disabled={currentPage === 1}
                onClick={goToPreviousPage}
              >
                ←
              </button>
              <button
                className="pagination-button"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={goToNextPage}
              >
                →
              </button>
            </div>
          </div>
        </div>

        {allProducts.length === 0 ? (
          <div className="no-products">
            <p>No products available.</p>
          </div>
        ) : (
          <div className="products-grid">
            {currentProducts.map((product: Product) => (
              <div key={product._id} className="product-card">
                <button
                  className="options-button"
                  data-product-id={product._id}
                  onClick={(e) => toggleDropdown(product._id, e)}
                >
                  <MoreVertical className="options-icon" />
                </button>

                {openDropdownId === product._id && (
                  <div
                    className="dropdown-menu"
                    ref={(el) => setDropdownRef(product._id, el)}
                  >
                    {isInWishlist(String(product._id)) ? (
                      <button
                        className="dropdown-item"
                        onClick={() =>
                          handleRemoveFavorite(product._id.toString())
                        }
                      >
                        <Heart size={16} fill="red" color="red" />
                        <span>Sevimlilərdən silin</span>
                      </button>
                    ) : (
                      <button
                        className="dropdown-item"
                        onClick={() => handleAddToWishlist(product)}
                      >
                        <Heart size={16} />
                        <span>Sevimlilərə əlavə edin</span>
                      </button>
                    )}

                    {isInBasket(String(product._id)) ? (
                      <button
                        className="dropdown-item"
                        onClick={
                          () => handleRemoveFromBasket(product._id.toString()) 
                        }
                      >
                        <ShoppingCart size={16} fill="red" color="red" />
                        <span>Səbətdən silin</span>
                      </button>
                    ) : (
                      <button
                        className="dropdown-item"
                        onClick={() => handleAddToBasket(product)}
                      >
                        <ShoppingCart size={16} />
                        <span>Səbətə əlavə et</span>
                      </button>
                    )}

                    <button className="dropdown-item">
                      <Share2 size={16} />
                      <span>Paylaşın</span>
                    </button>
                  </div>
                )}

                <div className="product-image-container">
                  {product.image && product.image.length > 0 && (
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="product-image"
                      onClick={() => {
                        navigate(`/products/${product._id}`);
                      }}
                    />
                  )}
                </div>

                <div className="product-details">
                  <div className="product-header">
                    <div className="product-title-container">
                      <h3 className="product-title">{product.name}</h3>
                      {product.weight && (
                        <p className="product-weight">({product.weight})</p>
                      )}
                    </div>
                  </div>

                  {product.seller && (
                    <p className="product-producer">
                      İstehsalçı:{' '}
                      <span className="producer-name">
                        {typeof product.seller === 'object' &&
                        product.seller !== null
                          ? product.seller.firstname || 'Unknown'
                          : typeof product.seller === 'string'
                          ? product.seller
                          : 'Unknown'}
                      </span>
                    </p>
                  )}

                  <div className="product-rating">
                    <div className="rating">
                      {[...Array(5)].map((_, i) => {
                        const full = i + 1 <= Math.floor(product.rating || 0);
                        const half =
                          i < (product.rating || 0) &&
                          i + 1 > (product.rating || 0);
                        return (
                          <span key={i} className="rating-star">
                            {full ? '★' : half ? '⯪' : '☆'}
                          </span>
                        );
                      })}
                    </div>

                    <div>
                      <span className="product-price">
                        {product.price?.toFixed(2)} ₼
                      </span>
                    </div>
                  </div>

                  <div className="product-actions">
                    <button className="buy-button">
                      <ShoppingCart />
                      Indi al
                    </button>
                    <button className="add-button">
                      <span className="plus-icon">+</span> Əlavə etmək üçün
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;

import React, { useEffect, useRef, useState } from 'react';
import { Heart, MoreVertical, Share2, ShoppingCart } from 'lucide-react';
import './card.component.scss';
import { User } from 'core/utils/IUser';
import { useSelector } from 'react-redux';
import { DropdownRefs, RootState } from '../home-card/card.component';
import {
  useAddToBasket,
  useRemoveFromBasket,
} from 'pages/basket-sidebar/actions/basket.mutation';
import {
  useAddToWishlist,
  useRemoveFromWishlist,
} from 'pages/wishlist/actions/wihslist.mutation';
import { useGetBasket } from 'pages/basket-sidebar/actions/basket.query';
import { useGetWishlist } from 'pages/wishlist/actions/wishlist.query';
import { toast } from 'react-toastify';
import { FavoriteProduct } from 'pages/wishlist/wishlist.component';
import { BasketItem } from 'pages/basket-sidebar/basket';
import { WishlistItem } from 'pages/wishlist/wishlist';
import { useGetProducts } from '../home-card/actions/card.query';
import { useNavigate } from 'react-router-dom';

interface CardProps<T> {
  data: T[];
  imageKey?: keyof T;
  titleKey: keyof T;
  subtitleKey?: keyof T;
  additionalKeys?: (keyof T)[];
  itemsPerPage?: number;
  showPagination?: boolean;
  pageTitle?: string;
  priceKey?: keyof T;
  keyLabels?: Partial<Record<keyof T, string>>;
}

const Card = <T extends { rating?: number; _id?: string }>({
  data,
  imageKey,
  titleKey,
  subtitleKey,
  additionalKeys = [],
  itemsPerPage = 4,
  showPagination = true,
  pageTitle,
  priceKey,
  keyLabels,
}: CardProps<T>) => {
  const user = useSelector((state: RootState) => state.user);
  const userId = user?._id || user?.id || '';
  const navigate = useNavigate();

  const addToBasketMutation = useAddToBasket(userId);
  const addToWishlistMutation = useAddToWishlist(userId);
  const { data: basketData, refetch: refetchBasket } = useGetBasket(userId);
  const { data: wishlistData, refetch: refetchWishlist } =
    useGetWishlist(userId);
  const { data: products, refetch } = useGetProducts();
  const [openDropdownId, setOpenDropdownId] = useState<string | number | null>(
    null
  );
  const dropdownRefs = useRef<DropdownRefs>({});

  const onClickDetails = (id: string) => {
    navigate(`/products/${id}`);
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const currentItems = showPagination
    ? data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : data;

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const toggleDropdown = (productId: string | number, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDropdownId((prevId) => (prevId === productId ? null : productId));
  };

  const handleAddToBasket = (item: T, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!('_id' in item)) {
      console.warn('Item does not have _id property');
      return;
    }

    if (!userId) {
      toast.error('Zəhmət olmasa daxil olun');
      return;
    }

    const mutationData = {
      item: {
        productId: String(item._id),
        quantity: 1,
      },
    };

    addToBasketMutation.mutate(mutationData, {
      onSuccess: () => {
        refetchBasket();
        setOpenDropdownId(null);
        toast.success('Məhsul səbətə əlavə edildi');
      },
      onError: () => {
        toast.error('Xəta baş verdi');
      },
    });
  };

  const handleAddToWishlist = (item: T, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!('_id' in item)) {
      console.warn('Item does not have _id property');
      return;
    }

    if (!userId) {
      toast.error('Zəhmət olmasa daxil olun');
      return;
    }

    const mutationData = {
      productId: String(item._id),
    };

    addToWishlistMutation.mutate(mutationData, {
      onSuccess: () => {
        refetchWishlist();
        setOpenDropdownId(null);
        toast.success('Məhsul sevimlilərə əlavə edildi');
      },
      onError: () => {
        toast.error('Xəta baş verdi');
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

  const handleRemoveFavorite = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavoriteItems((prevItems) => prevItems.filter((item) => item._id !== productId));

    removeItemMutation.mutate(
      { productId },
      {
        onSuccess: () => {
          toast.success('Məhsul sevimlilərdən silindi');
          refetch();
        },
        onError: () => {
          toast.error('Xəta baş verdi');
          refetch();
        },
      }
    );
  };

  const removeFromBasketMutation = useRemoveFromBasket(userId);

  const handleRemoveFromBasket = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!userId) {
      toast.error('Zəhmət olmasa daxil olun');
      return;
    }

    removeFromBasketMutation.mutate(
      { itemId: productId },
      {
        onSuccess: () => {
          toast.success('Məhsul səbətdən silindi');
        },
        onError: () => {
          toast.error('Xəta baş verdi');
        },
      }
    );
  };

  return (
    <div className="product-page">
      <div className="container">
        <div className="page-header">
          {pageTitle && <h1 className="page-title">{pageTitle}</h1>}
          {showPagination && totalPages > 1 && (
            <div className="pagination">
              <span className="pagination-info">
                Page {currentPage} of {totalPages}
              </span>
              <div className="pagination-buttons">
                <button
                  className="pagination-button"
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                >
                  ←
                </button>
                <button
                  className="pagination-button"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                >
                  →
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="products-grid">
          {currentItems.map((item, index) => (
            <div 
              key={index} 
              className="product-card"
              onClick={() => item._id && onClickDetails(item._id)}
            >
              <button
                className="options-button"
                data-product-id={item._id}
                onClick={(e) => {
                  e.stopPropagation();
                  item._id && toggleDropdown(item._id, e);
                }}
              >
                <MoreVertical className="options-icon" />
              </button>

              {item && item._id && openDropdownId === item._id && (
                <div
                  className="dropdown-menu"
                  ref={(el) => setDropdownRef(item._id as string, el)}
                  onClick={(e) => e.stopPropagation()}
                >
                  {isInWishlist(item._id ? String(item._id) : '') ? (
                    <button
                      className="dropdown-item"
                      onClick={(e) =>
                        item._id && handleRemoveFavorite(item._id.toString(), e)
                      }
                    >
                      <Heart size={16} fill="red" color="red" />
                      <span>Sevimlilərdən silin</span>
                    </button>
                  ) : (
                    <button
                      className="dropdown-item"
                      onClick={(e) => item._id && handleAddToWishlist(item, e)}
                    >
                      <Heart size={16} />
                      <span>Sevimlilərə əlavə edin</span>
                    </button>
                  )}

                  {isInBasket(item._id ? String(item._id) : '') ? (
                    <button
                      className="dropdown-item"
                      onClick={(e) =>
                        item._id && handleRemoveFromBasket(item._id.toString(), e)
                      }
                    >
                      <ShoppingCart size={16} fill="red" color="red" />
                      <span>Səbətdən silin</span>
                    </button>
                  ) : (
                    <button
                      className="dropdown-item"
                      onClick={(e) => item._id && handleAddToBasket(item, e)}
                    >
                      <ShoppingCart size={16} />
                      <span>Səbətə əlavə et</span>
                    </button>
                  )}

                  <button className="dropdown-item" onClick={(e) => e.stopPropagation()}>
                    <Share2 size={16} />
                    <span>Paylaşın</span>
                  </button>
                </div>
              )}

              {imageKey && (
                <div className="product-image-container">
                  <img
                    src={String(item[imageKey])}
                    alt={String(item[titleKey])}
                    className="product-image"
                  />
                </div>
              )}

              <div className="product-details">
                <div className="product-info">
                  <div className="product-title-container">
                    <h3 className="product-title">{String(item[titleKey])}</h3>

                    {subtitleKey && (
                      <span className="product-weight">
                        Satıcı:
                        {typeof item[subtitleKey] === 'object' &&
                        item[subtitleKey] !== null
                          ? (item[subtitleKey] as User).firstname
                          : String(item[subtitleKey])}
                      </span>
                    )}
                  </div>

                  {additionalKeys.map((key) => (
                    <p key={String(key)} className="product-producer">
                      <span className="producer-name">
                        {keyLabels?.[key] ?? String(key)}
                      </span>
                      : {String(item[key])}
                    </p>
                  ))}
                </div>

                <div className="product-rating">
                  <div>
                    {[...Array(5)].map((_, i) => {
                      const rating = (item as any).rating || 0;
                      const full = i + 1 <= Math.floor(rating);
                      const half = i < rating && i + 1 > rating;
                      return (
                        <span key={i} className="rating-star">
                          {full ? '★' : half ? '⯪' : '☆'}
                        </span>
                      );
                    })}
                  </div>
                  {priceKey && (
                    <span className="product-price">
                      {String(item[priceKey as keyof T])}₼
                    </span>
                  )}
                </div>

                <div className="product-actions">
                  <button 
                    className="buy-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      item._id && handleAddToBasket(item, e);
                    }}
                  >
                    <span>
                      <i
                        className="fa-solid fa-cart-shopping"
                        style={{ color: '#ccdadb' }}
                      ></i>
                    </span>
                    Buy
                  </button>
                  <button 
                    className="add-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      item._id && handleAddToBasket(item, e);
                    }}
                  >
                    <span className="plus-icon">+</span>
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
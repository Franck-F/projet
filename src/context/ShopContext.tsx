import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, Order } from '../types';
import { products } from '../data/products';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  addToCart: (productId: string, size: number, quantity: number) => boolean;
  removeFromCart: (productId: string, size: number) => void;
  updateCartQuantity: (productId: string, size: number, quantity: number) => void;
  clearCart: () => void;
  updateStock: (productId: string, size: number, quantity: number) => void;
  createOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
}

const ShopContext = createContext<ShopContextType | null>(null);

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}

interface ShopProviderProps {
  children: ReactNode;
}

export function ShopProvider({ children }: ShopProviderProps) {
  const [shopProducts, setShopProducts] = useState<Product[]>(products);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Load data from localStorage
    const savedCart = localStorage.getItem('cart');
    const savedOrders = localStorage.getItem('orders');
    const savedProducts = localStorage.getItem('products');

    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedProducts) {
      setShopProducts(JSON.parse(savedProducts));
    } else {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(shopProducts));
  }, [shopProducts]);

  const addToCart = (productId: string, size: number, quantity: number): boolean => {
    const product = shopProducts.find(p => p.id === productId);
    if (!product) return false;

    const sizeInfo = product.sizes.find(s => s.size === size);
    if (!sizeInfo || sizeInfo.stock < quantity) return false;

    const existingItem = cart.find(item => item.productId === productId && item.size === size);
    
    if (existingItem) {
      if (sizeInfo.stock < existingItem.quantity + quantity) return false;
      setCart(cart.map(item =>
        item.productId === productId && item.size === size
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { productId, size, quantity }]);
    }

    return true;
  };

  const removeFromCart = (productId: string, size: number) => {
    setCart(cart.filter(item => !(item.productId === productId && item.size === size)));
  };

  const updateCartQuantity = (productId: string, size: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }

    const product = shopProducts.find(p => p.id === productId);
    const sizeInfo = product?.sizes.find(s => s.size === size);
    
    if (!sizeInfo || sizeInfo.stock < quantity) return;

    setCart(cart.map(item =>
      item.productId === productId && item.size === size
        ? { ...item, quantity }
        : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateStock = (productId: string, size: number, quantity: number) => {
    setShopProducts(shopProducts.map(product =>
      product.id === productId
        ? {
            ...product,
            sizes: product.sizes.map(sizeInfo =>
              sizeInfo.size === size
                ? { ...sizeInfo, stock: Math.max(0, sizeInfo.stock - quantity) }
                : sizeInfo
            )
          }
        : product
    ));
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): string => {
    const newOrder: Order = {
      ...orderData,
      id: `order-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setOrders([...orders, newOrder]);

    // Update stock for ordered items
    orderData.items.forEach(item => {
      updateStock(item.productId, 0, item.quantity); // Size 0 as placeholder, need to fix this
    });

    return newOrder.id;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(orders.map(order =>
      order.id === orderId
        ? { ...order, status, updatedAt: new Date() }
        : order
    ));
  };

  const getCartTotal = (): number => {
    return cart.reduce((total, item) => {
      const product = shopProducts.find(p => p.id === item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const getCartItemsCount = (): number => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const value: ShopContextType = {
    products: shopProducts,
    cart,
    orders,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    updateStock,
    createOrder,
    updateOrderStatus,
    getCartTotal,
    getCartItemsCount
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}
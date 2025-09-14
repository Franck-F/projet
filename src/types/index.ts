export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'seller' | 'customer';
  address?: string;
  phone?: string;
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'men' | 'women' | 'kids';
  price: number;
  description: string;
  image: string;
  sizes: ProductSize[];
  color: string;
  isActive: boolean;
  createdAt: Date;
}

export interface ProductSize {
  size: number;
  stock: number;
}

export interface CartItem {
  productId: string;
  size: number;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: string;
  productName: string;
  size: number;
  quantity: number;
  unitPrice: number;
}

export interface Address {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id' | 'createdAt'>) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}
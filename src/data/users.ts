import { User } from '../types';

export const defaultUsers: User[] = [
  {
    id: 'admin-1',
    email: 'admin@shoeshop.com',
    password: 'admin123',
    firstName: 'Jean',
    lastName: 'Administrateur',
    role: 'admin',
    address: '123 Rue Admin, 75001 Paris',
    phone: '+33 1 23 45 67 89',
    createdAt: new Date('2023-01-01')
  },
  {
    id: 'seller-1',
    email: 'vendeur@shoeshop.com',
    password: 'vendeur123',
    firstName: 'Marie',
    lastName: 'Vendeuse',
    role: 'seller',
    address: '456 Rue Vendeur, 69000 Lyon',
    phone: '+33 4 56 78 90 12',
    createdAt: new Date('2023-02-01')
  },
  {
    id: 'customer-1',
    email: 'client@email.com',
    password: 'client123',
    firstName: 'Pierre',
    lastName: 'Dupont',
    role: 'customer',
    address: '789 Rue Client, 13000 Marseille',
    phone: '+33 6 12 34 56 78',
    createdAt: new Date('2023-03-01')
  }
];
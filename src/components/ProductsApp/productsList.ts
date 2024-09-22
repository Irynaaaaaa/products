import { Product } from '../../types';

const products: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    description:
      'Comfortable wireless headphones with noise-cancelling feature and up to 20 hours of battery life.',
    price: 89.99,
    creationDate: new Date('2023-04-15'),
  },
  {
    id: 2,
    name: 'Smart Watch',
    description:
      'A sleek smartwatch with heart rate monitoring, GPS, and fitness tracking.',
    price: 149.95,
    creationDate: new Date('2023-05-10'),
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    price: 45.99,
    creationDate: new Date('2023-07-20'),
  },
  {
    id: 4,
    name: 'Ergonomic Office Chair',
    description:
      'Fully adjustable office chair with lumbar support for maximum comfort during long working hours.',
    price: 199.99,
    creationDate: new Date('2023-06-01'),
  },
  {
    id: 5,
    name: 'Gaming Mouse',
    description: '',
    price: 59.95,
    creationDate: new Date('2023-08-11'),
  },
  {
    id: 6,
    name: '4K Ultra HD TV',
    description:
      'A 55-inch smart TV with stunning 4K resolution and built-in streaming apps.',
    price: 499.99,
    creationDate: new Date('2023-03-25'),
  },
  {
    id: 7,
    name: 'Wireless Earbuds',
    description:
      'Compact and powerful wireless earbuds with noise isolation and water resistance.',
    price: 79.99,
    creationDate: new Date('2023-04-10'),
  },
  {
    id: 8,
    name: 'Mechanical Keyboard',
    description:
      'Durable mechanical keyboard with customizable RGB lighting and tactile feedback.',
    price: 89.0,
    creationDate: new Date('2023-06-15'),
  },
  {
    id: 9,
    name: 'Smart Thermostat',
    description:
      'An intelligent thermostat that learns your preferences and helps save energy.',
    price: 199.99,
    creationDate: new Date('2023-07-30'),
  },
  {
    id: 10,
    name: 'Electric Kettle',
    description:
      'Fast-boiling electric kettle with temperature control and a 1.7L capacity.',
    price: 39.99,
    creationDate: new Date('2023-08-05'),
  },
];

export default products;

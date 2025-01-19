import { CategoryInterface } from '@/models/categories';
import { ProductInterface } from '@/models/products';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://localhost:5000/api';

const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('jwtToken');
};

const handleResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok || !data.success) {
    const error = data.error || `HTTP error! status: ${response.status}`;
    alert(error.message || error);
    throw new Error(error);
  }
  return data.result;
};

const fetchData = async (url: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(url, options);
    return await handleResponse(response);
  } catch (error: any) {
    console.error('API Error:', error);
    throw new Error(
      error.message || 'Something went wrong. Please try again later.'
    );
  }
};

const apiService = {
  async register(data: { name: string; email: string; password: string }) {
    return fetchData(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },

  async login(data: { email: string; password: string }) {
    return fetchData(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },

  async fetchCart() {
    const token = await getToken();
    if (!token) throw new Error('Authentication token is missing.');
    return fetchData(`${BASE_URL}/order/cart`, {
      headers: { Authorization: `${token}` },
    });
  },

  async fetchOrders() {
    const token = await getToken();
    if (!token) throw new Error('Authentication token is missing.');
    return fetchData(`${BASE_URL}/order/orders`, {
      headers: { Authorization: `${token}` },
    });
  },

  async fetchCategories(): Promise<CategoryInterface[]> {
    return fetchData(`${BASE_URL}/categories`);
  },

  async fetchProducts(): Promise<ProductInterface[]> {
    return fetchData(`${BASE_URL}/products`);
  },

  async fetchProduct(productId: number): Promise<ProductInterface> {
    return fetchData(`${BASE_URL}/products/${productId}`);
  },

  async addToCart(productId: number, quantity: number) {
    const token = await getToken();
    if (!token) throw new Error('Authentication token is missing.');
    return fetchData(`${BASE_URL}/order/cart/add`, {
      method: 'POST',
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ product_id: productId, quantity }),
    });
  },

  async updateCart(productId: number, quantity: number) {
    const token = await getToken();
    if (!token) throw new Error('Authentication token is missing.');
    return fetchData(`${BASE_URL}/order/cart/add`, {
      method: 'POST',
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ product_id: productId, quantity }),
    });
  },

  async removeFromCart(productId: number) {
    const token = await getToken();
    if (!token) throw new Error('Authentication token is missing.');
    return fetchData(`${BASE_URL}/order/cart/remove`, {
      method: 'POST',
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ product_id: productId }),
    });
  },

  async placeOrder() {
    const token = await getToken();
    if (!token) throw new Error('Authentication token is missing.');
    return fetchData(`${BASE_URL}/order/place`, {
      method: 'POST',
      headers: { Authorization: `${token}` },
    });
  },

  async contactForm(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) {
    return fetchData(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },
};

export { apiService, getToken };

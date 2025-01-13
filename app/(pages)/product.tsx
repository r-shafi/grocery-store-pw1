import Header from '@/components/Header';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const BASE_URL = 'http://localhost:5000/api';

type RootStackParamList = {
  product: {
    query: string;
  };
};

type ProductScreenRouteProp = RouteProp<RootStackParamList, 'product'>;

const ProductPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const route = useRoute<ProductScreenRouteProp>();

  const fetchProduct = async (productId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/product/${productId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data || !data[0]) {
        throw new Error('Product not found');
      }

      setProduct(data[0]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An error occurred while fetching the product'
      );
      setProduct(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const productId = route.params?.query;

    if (productId) {
      fetchProduct(productId);
    } else {
      setError('No product ID provided');
      setIsLoading(false);
    }
  }, [route.params?.query]);

  const formatPrice = (price: number) => {
    return `৳${price.toFixed(2)}`;
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Product" />
      <ScrollView>
        {isLoading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : error ? (
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : product ? (
          <View>
            <Image
              source={{ uri: product.image }}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.contentContainer}>
              <Text style={styles.name}>{product.name}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>{formatPrice(product.price)}</Text>
                <Text style={styles.quantity}>
                  Available - {product.quantity} {product.unit}
                </Text>
              </View>
              <Text style={styles.description}>{product.description}</Text>
            </View>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 250,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E8B57',
  },
  quantity: {
    fontSize: 16,
    color: '#666',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});

export default ProductPage;

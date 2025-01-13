import Header from '@/components/Header';
import Product from '@/components/Product';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const BASE_URL = 'http://localhost:5000/api';

type RootStackParamList = {
  search: {
    query: string;
  };
};

type SearchScreenRouteProp = RouteProp<RootStackParamList, 'search'>;

const Search = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const route = useRoute<SearchScreenRouteProp>();

  const fetchProducts = async (searchQuery: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${BASE_URL}/search?query=${encodeURIComponent(searchQuery)}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error('Invalid response format');
      }

      setProducts(data);
      setQuery(searchQuery);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An error occurred while searching'
      );
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const searchQuery = route.params?.query;

    if (searchQuery) {
      fetchProducts(searchQuery);
    } else {
      setError('No search query provided');
      setIsLoading(false);
    }
  }, [route.params?.query]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }

    if (products.length === 0) {
      return (
        <View style={styles.centerContainer}>
          <Text>No products found for "{query}"</Text>
        </View>
      );
    }

    return (
      <View style={styles.productsContainer}>
        {products.map((product, index) => (
          <View key={product.id || index} style={styles.productWrapper}>
            <Product product={product} />
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView>
      <Header title="↼ Back" link="/" />

      <View style={styles.container}>
        {query && !isLoading && !error && (
          <Text style={styles.resultsText}>Showing Results For "{query}"</Text>
        )}

        {renderContent()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 32,
    marginHorizontal: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 200,
  },
  resultsText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  productsContainer: {
    marginVertical: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 8,
  },
  productWrapper: {
    width: '50%',
    marginBottom: 16,
  },
});

export default Search;

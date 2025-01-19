import Product from '@/components/Product';
import { ProductInterface } from '@/models/products';
import { Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

const BASE_URL = 'http://localhost:5000/api';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const { width } = useWindowDimensions();

  // Calculate item width based on screen width
  const itemWidth = (width - 48 - 16) / 2; // Total padding (48) + gap (16)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedQuery !== '') {
      fetchProducts();
    }
  }, [debouncedQuery]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${BASE_URL}/search?query=${encodeURIComponent(debouncedQuery)}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      if (data.success) {
        setProducts(data.result.products);
      } else {
        throw new Error(data.error || 'Failed to fetch products');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setProducts([]);
  };

  const renderProducts = () => {
    const rows = [];
    for (let i = 0; i < products.length; i += 2) {
      const row = (
        <View key={`row-${i}`} style={styles.row}>
          <View style={[styles.productItem, { width: itemWidth }]}>
            <Product product={products[i]} />
          </View>
          {products[i + 1] && (
            <View style={[styles.productItem, { width: itemWidth }]}>
              <Product product={products[i + 1]} />
            </View>
          )}
        </View>
      );
      rows.push(row);
    }
    return rows;
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search color="#666" size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            onSubmitEditing={fetchProducts}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <X color="#666" size={20} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#0066CC" />
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <ScrollView style={styles.resultsContainer}>
          {searchQuery === '' ? (
            <View style={styles.centerContainer}>
              <Search color="#666" size={48} />
              <Text style={styles.placeholderText}>
                Enter a search term to find products
              </Text>
            </View>
          ) : products.length === 0 ? (
            <View style={styles.centerContainer}>
              <Text style={styles.noResults}>
                No products found for "{searchQuery}"
              </Text>
            </View>
          ) : (
            <View style={styles.productsGrid}>{renderProducts()}</View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 8,
  },
  searchIcon: {
    marginHorizontal: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 8,
  },
  clearButton: {
    padding: 8,
  },
  resultsContainer: {
    flex: 1,
    padding: 16,
  },
  productsGrid: {
    paddingHorizontal: 0,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productItem: {},
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
  noResults: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
  placeholderText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 12,
  },
});

export default SearchPage;

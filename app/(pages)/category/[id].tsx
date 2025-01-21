import Product from '@/components/Product';
import { ProductInterface } from '@/models/products';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

const BASE_URL = 'http://localhost:5000/api';

export default function CategoryDetailScreen() {
  const params = useLocalSearchParams();
  const { id, categoryName, categoryImage } = params;
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { width } = useWindowDimensions();

  useEffect(() => {
    fetchProducts();
  }, [id]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products`);
      const data = await response.json();
      const categoryProducts = data.result.filter(
        (product: any) => product.category_id === Number(id)
      );
      setProducts(categoryProducts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0066CC" />
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.categoryHeader}>
        <Image
          source={{ uri: categoryImage as string }}
          style={styles.categoryImage}
        />
        <Text style={styles.header}>{categoryName}</Text>
      </View>

      <View style={styles.productsGrid}>
        {products.length === 0 ? (
          <Text style={styles.noProducts}>
            No products found in this category
          </Text>
        ) : (
          products.map((product) => (
            <View
              key={product.id}
              style={[styles.productItem, { width: (width - 48) / 2 }]}
            >
              <Product product={product} />
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  categoryHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  productItem: {
    marginBottom: 16,
  },
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
  noProducts: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    width: '100%',
    marginTop: 20,
  },
});

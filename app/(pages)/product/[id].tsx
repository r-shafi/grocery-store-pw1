import { apiService } from '@/service/API';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, Package, ShoppingCart } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const formatPrice = (price: number) => {
  return `৳${price.toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })}`;
};

const getStockStatus = (quantity: number) => {
  if (quantity === 0) return { text: 'Out of Stock', color: '#FF4444' };
  if (quantity < 5) return { text: 'Low Stock', color: '#FFA500' };
  return { text: 'In Stock', color: '#4CAF50' };
};

const ProductDetails = () => {
  const params = useLocalSearchParams();
  const { productId } = params;
  const [product, setProduct] = useState<ProductInterface | null>(null);
  const stockStatus = getStockStatus(product?.quantity || 0);
  const router = useRouter();

  useEffect(() => {
    apiService.fetchProduct(Number(productId)).then(setProduct);
  }, [productId]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ChevronLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>{product?.name}</Text>
      </View>

      {product ? (
        <>
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            resizeMode="cover"
          />

          <View style={styles.detailsContainer}>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{formatPrice(product.price)}</Text>
              <Text style={styles.unit}>/{product.unit}</Text>
            </View>

            <View
              style={[
                styles.stockContainer,
                { backgroundColor: `${stockStatus.color}15` },
              ]}
            >
              <Package size={14} color={stockStatus.color} />
              <Text style={[styles.stockText, { color: stockStatus.color }]}>
                {stockStatus.text}
              </Text>
            </View>

            <Text style={styles.description}>{product.description}</Text>

            <TouchableOpacity
              style={[
                styles.addToCartButton,
                product.quantity === 0 && styles.disabledButton,
              ]}
              disabled={product.quantity === 0}
            >
              <ShoppingCart size={16} color="white" />
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  image: {
    width: '100%',
    height: 300,
  },
  detailsContainer: {
    padding: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  unit: {
    fontSize: 16,
    color: '#666',
    marginLeft: 4,
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  stockText: {
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '500',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  addToCartButton: {
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductDetails;

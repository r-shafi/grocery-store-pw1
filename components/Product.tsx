import { useRouter } from 'expo-router';
import { Package, ShoppingCart } from 'lucide-react';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

const Product = ({ product }: { product: ProductInterface }) => {
  const router = useRouter();
  const stockStatus = getStockStatus(product.quantity);

  const handlePress = () => {
    router.push({
      pathname: `/product/${product.id}` as any,
      params: { productId: product.id },
    });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            resizeMode="cover"
          />
          {product.quantity === 0 && (
            <View style={styles.outOfStockOverlay}>
              <Text style={styles.outOfStockText}>Out of Stock</Text>
            </View>
          )}
        </View>

        <View style={styles.detailsContainer}>
          <Text numberOfLines={2} style={styles.name}>
            {product.name}
          </Text>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
            <Text style={styles.unit}>
              {product.unit && '/'}
              {product.unit}
            </Text>
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
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 220,
    marginBottom: 8,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  imageContainer: {
    position: 'relative',
    aspectRatio: 1,
    width: 220,
    height: 200,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: 220,
    height: 200,
    resizeMode: 'cover',
  },
  outOfStockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outOfStockText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailsContainer: {
    padding: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  unit: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderRadius: 6,
    marginBottom: 12,
  },
  stockText: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
  addToCartButton: {
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 8,
    gap: 8,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default Product;

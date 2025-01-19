import { apiService } from '@/service/API';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    apiService.fetchCart().then((response: any) => {
      setCartItems(response.cart_items);
      setTotalPrice(response.total_price);
    });
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    if (quantity < 1) {
      Alert.alert('Invalid Quantity', 'Quantity must be at least 1.');
      return;
    }

    try {
      setIsLoading(true);
      await apiService.updateCart(productId, quantity);
      await fetchCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderCartItem = ({ item }: any) => (
    <View style={styles.cartItem}>
      <View style={styles.imageContainer}>
        <View style={styles.productImage}>
          <Text style={styles.imageText}>IMG</Text>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{item.product_name}</Text>
        <Text style={styles.productPrice}>
          ${item.product_price.toFixed(2)}
        </Text>
        <View style={styles.quantityContainer}>
          <Text>Qty:</Text>
          <TextInput
            style={styles.quantityInput}
            keyboardType="numeric"
            defaultValue={item.quantity.toString()}
            onSubmitEditing={(e) =>
              updateQuantity(item.product_id, parseInt(e.nativeEvent.text))
            }
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={async () => await apiService.removeFromCart(item.product_id)}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item: any) => item.product_id.toString()}
        renderItem={renderCartItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Your cart is empty</Text>
        }
      />
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: ${totalPrice.toFixed(2)}</Text>
        <TouchableOpacity
          style={[styles.orderButton, isLoading && styles.disabledButton]}
          onPress={async () => await apiService.placeOrder()}
          disabled={isLoading}
        >
          <Text style={styles.orderButtonText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  orderButton: {
    padding: 16,
    backgroundColor: '#28a745',
    borderRadius: 4,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  imageContainer: {
    flex: 1,
    marginRight: 16,
  },
  productImage: {
    width: 60,
    height: 60,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    fontSize: 12,
    color: '#555',
  },
  detailsContainer: {
    flex: 2,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  productPrice: {
    fontSize: 14,
    color: '#777',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  quantityInput: {
    marginLeft: 8,
    width: 40,
    height: 30,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    textAlign: 'center',
  },
  removeButton: {
    flex: 0.5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#ff5555',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CartPage;

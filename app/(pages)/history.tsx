import { apiService } from '@/service/API';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.fetchOrders();
      setOrders(response.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderOrderItem = ({ item: order }: any) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View>
          <Text style={styles.orderId}>Order #{order.order_id}</Text>
          <Text style={styles.orderDate}>{formatDate(order.created_at)}</Text>
        </View>
        <View style={styles.statusContainer}>
          <Text
            style={[
              styles.statusText,
              order.status === 'completed' && styles.statusCompleted,
              order.status === 'processing' && styles.statusProcessing,
              order.status === 'cancelled' && styles.statusCancelled,
            ]}
          >
            {order.status.toUpperCase()}
          </Text>
        </View>
      </View>

      <FlatList
        data={order.items}
        keyExtractor={(item) => `${order.order_id}-${item.product_id}`}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <View style={styles.imageContainer}>
              <View style={styles.productImage}>
                <Text style={styles.imageText}>IMG</Text>
              </View>
            </View>
            <View style={styles.itemDetails}>
              <Text style={styles.productId}>Product #{item.product_id}</Text>
              <View style={styles.quantityPrice}>
                <Text style={styles.quantity}>Qty: {item.quantity}</Text>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        )}
      />

      <View style={styles.orderFooter}>
        <Text style={styles.totalText}>
          Total: ${order.total_price.toFixed(2)}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order History</Text>
      <FlatList
        data={orders}
        keyExtractor={(order: any) => order.order_id.toString()}
        renderItem={renderOrderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {isLoading ? 'Loading orders...' : 'No orders found'}
          </Text>
        }
      />
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
  orderCard: {
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  statusContainer: {
    borderRadius: 4,
    padding: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusCompleted: {
    color: '#28a745',
  },
  statusProcessing: {
    color: '#ffc107',
  },
  statusCancelled: {
    color: '#dc3545',
  },
  orderItem: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  imageContainer: {
    marginRight: 12,
  },
  productImage: {
    width: 50,
    height: 50,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    fontSize: 12,
    color: '#555',
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productId: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  quantityPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  quantity: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  reorderButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  reorderButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
});

export default OrderHistoryPage;

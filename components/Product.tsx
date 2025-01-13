import { useNavigation } from '@react-navigation/native';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const Product = ({ product }: { product: Product }) => {
  const navigation = useNavigation();

  const navigate = () => {
    navigation.navigate('product', { product_id: product.id });
  };

  return (
    <TouchableOpacity onPress={navigate}>
      <View
        style={{
          backgroundColor: '#3333',
          width: 150,
          height: 200,
          marginHorizontal: 8,
          position: 'relative',
        }}
      >
        <Image
          source={{ uri: product.image }}
          style={{
            width: 150,
            height: 200,
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
        <Text
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            padding: 8,
            color: 'white',
            fontSize: 16,
            backgroundColor: '#0005',
            width: '100%',
          }}
        >
          {product.name} - ${product.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Product;

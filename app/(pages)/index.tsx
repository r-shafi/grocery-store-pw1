import { Category } from '@/models/categories';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const BASE_URL = 'http://localhost:5000/api';

export default function HomeScreen() {
  const [CATEGORIES, setCATEGORIES] = useState<Category[]>([]);
  const [PRODUCTS, setPRODUCTS] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`${BASE_URL}/categories`).then(async (res) => {
      const categories = await res.json();
      setCATEGORIES(categories);
    });

    fetch(`${BASE_URL}/products`).then(async (res) => {
      const products = await res.json();
      setPRODUCTS(products);
    });
  }, []);

  return (
    <ScrollView>
      <View
        style={{
          padding: 16,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#BC3131',
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          Store
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: 'white',
            backgroundColor: '#fff2',
            maxWidth: 250,
            height: 30,
            borderRadius: 10,
            color: 'white',
            paddingLeft: 8,
          }}
          placeholder="Search..."
        />
      </View>

      {/* Welcome Banner */}
      <View
        style={{
          position: 'relative',
          backgroundColor: 'black',
          height: 200,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg',
          }}
          style={{
            width: '100%',
            height: 200,
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: 0.5,
          }}
        />
        <Text
          style={{
            fontSize: 25,
            color: 'white',
            textAlign: 'center',
            fontStyle: 'italic',
          }}
        >
          Welcome to Grocery Store!
        </Text>
      </View>

      {/* Available Categories */}
      <View
        style={{
          marginVertical: 32,
          marginHorizontal: 16,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          Available Categories
        </Text>

        <ScrollView
          horizontal={true}
          style={{
            marginVertical: 16,
          }}
        >
          {CATEGORIES.map((category, i) => (
            <View
              key={i}
              style={{
                width: 100,
                marginHorizontal: 8,
              }}
            >
              <Image
                source={{ uri: category.image }}
                style={{
                  width: 100,
                  height: 100,
                }}
              />
              <Text
                style={{
                  textAlign: 'center',
                }}
              >
                {category.name}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Trending Products */}
      <View
        style={{
          marginVertical: 32,
          marginHorizontal: 16,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          Trending Products
        </Text>

        <ScrollView
          horizontal={true}
          style={{
            marginVertical: 16,
          }}
        >
          {PRODUCTS.map((product, i) => (
            <View
              key={i}
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
          ))}
        </ScrollView>
      </View>

      {/* Footer */}
      <View
        style={{
          backgroundColor: '#BC3131',
          padding: 16,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <Image
          source={{ uri: '/assets/images/facebook.png' }}
          style={{ height: 16, width: 16 }}
        />{' '}
        <Image
          source={{ uri: '/assets/images/twitter.png' }}
          style={{ height: 16, width: 16 }}
        />
      </View>
    </ScrollView>
  );
}

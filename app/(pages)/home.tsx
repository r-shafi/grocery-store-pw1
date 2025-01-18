import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Product from '@/components/Product';
import { Category } from '@/models/categories';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

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
      <Header />

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

      <View
        style={{
          marginVertical: 32,
          marginHorizontal: 16,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Categories</Text>

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
                  paddingTop: 10,
                }}
              >
                {category.name}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

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
            <Product key={i} product={product} />
          ))}
        </ScrollView>
      </View>

      <Footer />
    </ScrollView>
  );
}

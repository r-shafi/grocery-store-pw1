import Product from '@/components/Product';
import { CategoryInterface } from '@/models/categories';
import { apiService } from '@/service/API';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [CATEGORIES, setCATEGORIES] = useState<CategoryInterface[]>([]);
  const [PRODUCTS, setPRODUCTS] = useState<ProductInterface[]>([]);

  useEffect(() => {
    apiService.fetchCategories().then(setCATEGORIES);
    apiService.fetchProducts().then(setPRODUCTS);
  }, []);

  const handleCategoryPress = (category: CategoryInterface) => {
    router.push({
      pathname: `/category/${category.id}` as any,
      params: {
        categoryName: category.name,
        categoryImage: category.image,
      },
    });
  };

  return (
    <ScrollView>
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
            <TouchableOpacity
              key={category.id}
              onPress={() => handleCategoryPress(category)}
            >
              <View
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
            </TouchableOpacity>
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
          contentContainerStyle={{
            gap: 16,
          }}
        >
          {PRODUCTS.map((product, i) => (
            <Product key={i} product={product} />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

import Header from '@/components/Header';
import Product from '@/components/Product';
import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

const BASE_URL = 'http://localhost:5000/api';

const Search = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const url = new URL(window.location.href);
    const query = url.searchParams.get('query');
    query && setQuery(query);

    fetch(`${BASE_URL}/search?query=${query}`)
      .then((res) => res.json())
      .then(setProducts);

    return () => {};
  }, [new URL(window.location.href)]);

  return (
    <ScrollView>
      <Header title="↼ Back" link="/" showSearchBar={false} />

      <View
        style={{
          marginVertical: 32,
          marginHorizontal: 16,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          Showing Results For "{query}"
        </Text>

        <ScrollView
          style={{
            marginVertical: 16,
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              padding: 8,
            }}
          >
            {products.map((product, i) => (
              <View
                key={i}
                style={{
                  width: '50%',
                  marginBottom: 16,
                }}
              >
                <Product product={product} />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default Search;

import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

const BASE_URL = 'http://localhost:5000/api';

const Product = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = new URL(window.location.href);
    const query = url.searchParams.get('product_id');
    console.log(query);

    if (query) {
      fetch(`${BASE_URL}/product/${query}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching product:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return <ScrollView></ScrollView>;
};

export default Product;

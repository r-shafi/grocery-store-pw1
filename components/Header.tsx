import { Link, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const Header = ({ title = 'Store', link = '/', showSearchBar = true }) => {
  const [search, setSearch] = useState('');
  const navigation = useNavigation();

  const handleSubmit = () => {
    const trimmedSearch = search.trim();
    if (trimmedSearch) {
      navigation.navigate('search', { query: trimmedSearch });
    } else {
      alert('Please enter a valid search query.');
    }
  };

  return (
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
      <Link to={link}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          {title}
        </Text>
      </Link>

      {showSearchBar && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
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
              marginRight: 8,
            }}
            placeholder="Search..."
            placeholderTextColor="#ddd"
            value={search}
            onChangeText={(text) => setSearch(text)}
            onSubmitEditing={handleSubmit}
          />
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              backgroundColor: '#fff2',
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>⇀</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Header;

import { Link } from '@react-navigation/native';
import { Text, TextInput, View } from 'react-native';

const Header = ({ title = 'Store', link = '/', showSearchBar = true }) => {
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
      )}
    </View>
  );
};

export default Header;

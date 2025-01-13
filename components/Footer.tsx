import { Image, View } from 'react-native';

const Footer = () => {
  return (
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
  );
};

export default Footer;

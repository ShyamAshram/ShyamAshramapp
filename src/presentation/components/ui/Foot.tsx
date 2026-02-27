import React from "react";
import { Text, View, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { Facebook, Instagram } from '../../icons/Icons';



const Footer = () => {
  const handlePress = () => {
    const websiteUrl = 'https://www.facebook.com/ShyamAshram/?paipv=0&eav=AfaZ9aWKsZ4ydXLeH8R74dhWKtHlK5SDqVZsH99Z9ftX7MCfXl6jQAxs6A86x30PYow&_rdr';
    Linking.openURL(websiteUrl);
  };

  const handlePress2 = () => {
    const websiteUrl2 = 'https://www.instagram.com/shyam_ashram/';
    Linking.openURL(websiteUrl2);
  };
  return (
    <View style={styles.padre}>
      <TouchableOpacity style={{ marginRight: 20 }} onPress={handlePress}>
        <Facebook />
      </TouchableOpacity>
      <TouchableOpacity style={{ marginRight: 20 }} onPress={handlePress2}>
        <Instagram />
      </TouchableOpacity>
      <Text maxFontSizeMultiplier={1} style={styles.text}>Copyright 2024 | Desarrollado por Andromeda</Text>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  padre: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 40,
    borderStartColor: '#00000',
    width: '100%',
    position: 'relative',
  },
  text: {
    color: 'black',
    fontSize: 9,

  }

})
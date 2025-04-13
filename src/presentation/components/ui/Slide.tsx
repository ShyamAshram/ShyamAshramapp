import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const LandingPage = () => {
  const [images, setImages] = useState([
    require('../../assets/Slide1.png'),
    require('../../assets/Slide2.png'),
    require('../../assets/Slide3.png'),
    require('../../assets/Slide4.png'),
    require('../../assets/Slide5.png'),
    require('../../assets/Slide6.png'),
    require('../../assets/Slide7.png'),
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={true}
        style={styles.scrollView}>
        {images.map((image, index) => (
          <Image key={index} source={image} style={styles.image} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
    width: '105%',
    marginRight: 0
  },
  scrollView: {
    width: screenWidth,

  },
  image: {
    width: screenWidth,
    height: 200,
    borderRadius: 20
  },
});

export default LandingPage;


import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

import Slide1 from '../../assets/Slide1.png';
import Slide2 from '../../assets/Slide2.png';
import Slide3 from '../../assets/Slide3.png';
import Slide4 from '../../assets/Slide4.png';
import Slide5 from '../../assets/Slide5.png';
import Slide6 from '../../assets/Slide6.png';
import Slide7 from '../../assets/Slide7.png';

const images = [
  Slide1,
  Slide2,
  Slide3,
  Slide4,
  Slide5,
  Slide6,
  Slide7,
];

const LandingPage = () => {
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(previous =>
        previous === images.length - 1 ? 0 : previous + 1,
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      x: currentIndex * width,
      animated: true,
    });
  }, [currentIndex, width]);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            resizeMode="cover"
            style={[styles.image, { width }]}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    height: 200,
    borderRadius: 20,
  },
});

export default LandingPage;

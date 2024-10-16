import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Text,
} from 'react-native';

const {width, height} = Dimensions.get('window'); // Get device width and height

const AnimatedImagesScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // For modal image view

  // Array of image URLs
  const images = [
    'https://i0.wp.com/picjumbo.com/wp-content/uploads/amazing-stone-path-in-forest-free-image.jpg?w=600&quality=80',
    'https://media.istockphoto.com/id/636208094/photo/tropical-jungle.jpg?s=612x612&w=0&k=20&c=3S-pXUxM-gWEPK9ocEPU-KG3clexrw6iIru-8QYEfl0=',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgnfh_cPq68QR-S_GpziU6M1zb-OA2P6DrZPtbnw2lI4swUAJRaPZHrS_7aJxy_J2RpaY&usqp=CAU',
    'https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-green-field-scenery-free-image.jpg?w=600&quality=80',
    'https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg?w=600&quality=80',
  ];

  // Initialize fade, slide, and rotate animations for each image
  const fadeAnim = useRef(images.map(() => new Animated.Value(0))).current;
  const slideAnim = useRef(images.map(() => new Animated.Value(0))).current;
  const rotateAnim = useRef(images.map(() => new Animated.Value(0))).current;

  // Fade-In Animation on component load
  useEffect(() => {
    images.forEach((_, index) => {
      Animated.timing(fadeAnim[index], {
        toValue: 1, // Final opacity: 1
        duration: 800,
        useNativeDriver: true,
      }).start();
    });
  }, [fadeAnim]);

  // Slide Animation on image click
  const handleSlide = index => {
    Animated.timing(slideAnim[index], {
      toValue: 1, // Slide the image up
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      // Reset to initial position after animation ends
      Animated.timing(slideAnim[index], {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  };

  // Rotate Animation on image click
  const handleRotate = index => {
    Animated.timing(rotateAnim[index], {
      toValue: 1, // Rotate to 360 degrees
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      rotateAnim[index].setValue(0); // Reset rotation after completing
    });
  };

  const rotateInterpolate = index =>
    rotateAnim[index].interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'], // Rotate 360 degrees
    });

  // Handle image click to open modal for fade view
  const openModal = image => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  // Render Fade Image
  const renderFadeImage = ({item, index}) => (
    <TouchableOpacity onPress={() => openModal(item)}>
      <Animated.View
        style={[styles.imageContainer, {opacity: fadeAnim[index]}]}>
        <Image source={{uri: item}} style={styles.image} />
      </Animated.View>
    </TouchableOpacity>
  );

  // Render Slide Image
  const renderSlideImage = ({item, index}) => (
    <TouchableOpacity onPress={() => handleSlide(index)}>
      <Animated.View
        style={[
          styles.imageContainer,
          {
            transform: [
              {
                translateY: slideAnim[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -100], // Slide up 100 units
                }),
              },
            ],
          },
        ]}>
        <Image source={{uri: item}} style={styles.image} />
      </Animated.View>
    </TouchableOpacity>
  );

  // Render Rotate Image
  const renderRotateImage = ({item, index}) => (
    <TouchableOpacity onPress={() => handleRotate(index)}>
      <Animated.View
        style={[
          styles.imageContainer,
          {
            transform: [{rotate: rotateInterpolate(index)}],
          },
        ]}>
        <Image source={{uri: item}} style={styles.image} />
      </Animated.View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          color: 'black',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 20,
        }}>
        WELCOME TO ANIMATION VIEWS
      </Text>
      <ScrollView>
        {/* Fade-In Animation */}
        <Text
        style={{
          fontSize: 14,
          color: 'black',
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        Fade-In Animation
      </Text>
        <View style={styles.section}>
          <FlatList
            data={images}
            renderItem={renderFadeImage}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Slide-In Animation */}
        <Text
        style={{
          fontSize: 14,
          color: 'black',
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        Slide-In Animation
      </Text>
        <View style={styles.section}>
          <FlatList
            data={images}
            renderItem={renderSlideImage}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Rotation Animation */}
        <Text
        style={{
          fontSize: 14,
          color: 'black',
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        Rotation Animation
      </Text>
        <View style={styles.section}>
          <FlatList
            data={images}
            renderItem={renderRotateImage}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>

      {/* Modal for full-screen image */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setModalVisible(false)}>
            <Image source={{uri: selectedImage}} style={styles.modalImage} />
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  section: {
    marginVertical: 20, // Spacing between sections
  },
  imageContainer: {
    margin: 10,
    borderRadius: 15,
    overflow: 'hidden', // To ensure the image follows the border radius
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 15, // Ensure the image also has border radius
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Dark background for modal
  },
  modalImage: {
    width: width * 0.9, // Fullscreen image size
    height: height * 0.7,
    resizeMode: 'contain',
    borderRadius: 15,
  },
  modalCloseButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AnimatedImagesScreen;

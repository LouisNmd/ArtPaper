import NativeGestureHandler, { Directions, Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { ImageBackground, Text, View, StyleSheet, Dimensions } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useState } from 'react';

const MAX_BLUR_RADIUS = 6;
const MIN_BLUR_RADIUS = 0;

export default function Index() {

  const { height } = Dimensions.get('screen');

  const translateY = useSharedValue(height / 2);
  const startTranslateY = useSharedValue(height / 2);

  const [showDescription, setShowDescription] = useState(false);
  const [blurRadius, setBlurRadius] = useState(0);

  const flingUp = Gesture.Fling()
    .direction(Directions.UP)
    .onBegin((_) => {
      setShowDescription(!showDescription);
    })
    .onStart((_) => {
      translateY.value = withTiming(
        0,
        { duration: 200 }
      );
      setBlurRadius(MAX_BLUR_RADIUS);
    })
    .runOnJS(true);
  
  const flingDown = Gesture.Fling()
    .direction(Directions.DOWN)
    .onBegin((_) => {
      setShowDescription(!showDescription);
    })
    .onStart((_) => {
      translateY.value = withTiming(
        height / 2,
        { duration: 200 }
      );
      setBlurRadius(MIN_BLUR_RADIUS)
    })
    .runOnJS(true);

  const boxAnimatedStyles = useAnimatedStyle(() => ({
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 100,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ImageBackground 
        source={require('./static/test.jpg')} 
        style={styles.image}
        blurRadius={blurRadius}
      >
        <GestureHandlerRootView style={styles.container}>
          <GestureDetector gesture={showDescription ? flingDown : flingUp}>
            <Animated.View style={[styles.description, boxAnimatedStyles]}>
              <Text style={styles.text}>La nuit étoilée</Text>
              <Text style={styles.text}>Vincent Van Gogh (1889)</Text>
            </Animated.View>
          </GestureDetector>
        </GestureHandlerRootView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    width: '100%',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000a0',
    padding: 10,
  },
  description: {
    width: '70%',
    height: '100%',
    borderRadius: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
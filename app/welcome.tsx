import React, { useState, useRef } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Dimensions,
    Animated,
    TouchableOpacity,
    FlatList
} from 'react-native';
import {
    Layout,
    Text,
    Button,
    Card,
} from '@ui-kitten/components';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

// Tutorial data
const tutorials = [
    {
        title: 'Welcome to Our App',
        description: 'Discover amazing features and possibilities',
        image: '🎉', // You can replace these with actual images
    },
    {
        title: 'Easy Navigation',
        description: 'Find everything you need with our intuitive interface',
        image: '🧭',
    },
    {
        title: 'Stay Connected',
        description: 'Connect with friends and share your experiences',
        image: '🤝',
    },
    {
        title: "You're All Set!",
        description: 'Start exploring the app now',
        image: '✨',
    },
];

export const WelcomeTutorialScreen = () => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const [currentIndex, setCurrentIndex] = useState(0);
    const slidesRef = useRef<FlatList<any>>(null);

    const router = useRouter();


    const viewableItemsChanged = useRef(({ viewableItems }: any) => {
        setCurrentIndex(viewableItems[0]?.index || 0);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const scrollTo = () => {
        if (currentIndex < tutorials.length - 1) {
            slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
        } else {
            // Navigate to main app
            router.replace('/main');
        }
    };

    const renderTutorialItem = ({ item, index }: any) => {
        return (
            <Card style={styles.slideCard}>
                <View style={styles.tutorialSlide}>
                    <Text style={styles.emoji}>{item.image}</Text>
                    <Text category='h1' style={styles.title}>
                        {item.title}
                    </Text>
                    <Text category='s1' style={styles.description}>
                        {item.description}
                    </Text>
                </View>
            </Card>
        );
    };

    return (
        <Layout style={styles.container}>
            <View style={styles.slidesContainer}>
                <Animated.FlatList
                    data={tutorials}
                    renderItem={renderTutorialItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item) => item.title}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false }
                    )}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    scrollEventThrottle={32}
                    ref={slidesRef}
                />
            </View>

            <View style={styles.pagination}>
                {tutorials.map((_, idx) => {
                    const inputRange = [
                        (idx - 1) * width,
                        idx * width,
                        (idx + 1) * width,
                    ];

                    const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange: [10, 20, 10],
                        extrapolate: 'clamp',
                    });

                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: 'clamp',
                    });

                    return (
                        <Animated.View
                            key={idx}
                            style={[
                                styles.dot,
                                { width: dotWidth, opacity },
                            ]}
                        />
                    );
                })}
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    style={styles.button}
                    onPress={scrollTo}
                    size='large'
                >
                    {currentIndex === tutorials.length - 1 ? 'Get Started' : 'Next'}
                </Button>
                {currentIndex < tutorials.length - 1 && (
                    <Button
                        appearance='ghost'
                        onPress={() => router.replace('/main')}
          >
                Skip
            </Button>
        )}
        </View>
    </Layout >
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E6F3FF',
    },
    slidesContainer: {
        flex: 3,
    },
    slideCard: {
        width: width - 40,
        marginHorizontal: 20,
        marginVertical: 20,
        height: height * 0.6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
    },
    tutorialSlide: {
        alignItems: 'center',
        padding: 20,
    },
    emoji: {
        fontSize: 80,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        marginBottom: 10,
        textAlign: 'center',
        color: '#1A2138',
    },
    description: {
        textAlign: 'center',
        color: '#8F9BB3',
        paddingHorizontal: 20,
    },
    pagination: {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        height: 10,
        borderRadius: 5,
        backgroundColor: '#3366FF',
        marginHorizontal: 4,
    },
    buttonContainer: {
        padding: 20,
    },
    button: {
        backgroundColor: '#3366FF',
        borderColor: '#3366FF',
        marginBottom: 10,
    },
});

export default WelcomeTutorialScreen;
import React from 'react';
import { Layout, Text, Card, Button } from '@ui-kitten/components';

import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

const Dashboard = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                <Layout style={styles.layout}>
                    <Text category='h1'>Dashboard</Text>
                    <Card style={styles.card}>
                        <Text category='h5'>Card 1</Text>
                        <Button style={styles.button}>Button 1</Button>
                    </Card>
                    <Card style={styles.card}>
                        <Text category='h5'>Card 2</Text>
                        <Button style={styles.button}>Button 2</Button>
                    </Card>
                    <Card style={styles.card}>
                        <Text category='h5'>Card 3</Text>
                        <Button style={styles.button}>Button 3</Button>
                    </Card>
                </Layout>
            </ScrollView>
        </SafeAreaView>
    );
};

export default function x () {
    return (
        <Dashboard />
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        marginVertical: 8,
        width: '100%',
    },
    button: {
        marginTop: 16,
    },
});
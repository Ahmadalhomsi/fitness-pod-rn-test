import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import {
  Layout,
  Text,
  Button,
  Input,
  Card,
} from '@ui-kitten/components';

type ScreenType = 'login' | 'signup';

export const AuthScreen = () => {
  const [activeScreen, setActiveScreen] = useState<ScreenType>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const renderLoginForm = () => (
    <>
      <Input
        style={styles.input}
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
        size='large'
      />
      <Input
        style={styles.input}
        placeholder='Password'
        value={password}
        secureTextEntry={secureTextEntry}
        onChangeText={setPassword}
        size='large'
      />
      <Button
        style={styles.button}
        size='large'
        onPress={() => console.log('Login pressed')}
      >
        LOGIN
      </Button>
      <Button
        style={styles.linkButton}
        appearance='ghost'
        onPress={() => setActiveScreen('signup')}
      >
        Don't have an account? Sign up
      </Button>
    </>
  );

  const renderSignupForm = () => (
    <>
      <Input
        style={styles.input}
        placeholder='Full Name'
        value={name}
        onChangeText={setName}
        size='large'
      />
      <Input
        style={styles.input}
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
        size='large'
      />
      <Input
        style={styles.input}
        placeholder='Password'
        value={password}
        secureTextEntry={secureTextEntry}
        onChangeText={setPassword}
        size='large'
      />
      <Button
        style={styles.button}
        size='large'
        onPress={() => console.log('Signup pressed')}
      >
        SIGN UP
      </Button>
      <Button
        style={styles.linkButton}
        appearance='ghost'
        onPress={() => setActiveScreen('login')}
      >
        Already have an account? Login
      </Button>
    </>
  );

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      bounces={false}
    >
      <Layout style={styles.container} level='1'>
        <Card style={styles.card}>
          <Text category='h1' style={styles.title}>
            {activeScreen === 'login' ? 'Welcome Back' : 'Create Account'}
          </Text>
          <Text category='s1' style={styles.subtitle}>
            {activeScreen === 'login' 
              ? 'Sign in to continue'
              : 'Sign up to get started'}
          </Text>
          {activeScreen === 'login' ? renderLoginForm() : renderSignupForm()}
        </Card>
      </Layout>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E6F3FF', // Light blue background
  },
  card: {
    margin: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#1A2138',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#8F9BB3',
  },
  input: {
    marginBottom: 15,
    borderRadius: 8,
  },
  button: {
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: '#3366FF',
    borderColor: '#3366FF',
  },
  linkButton: {
    marginTop: 15,
  },
});

export default AuthScreen;
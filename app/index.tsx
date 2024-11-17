import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import {
  ApplicationProvider,
  Layout,
  Text,
  Button,
  Card,
  Icon,
  Modal,
  List,
  ListItem,
  useTheme,
  Toggle,
} from '@ui-kitten/components';

const data = new Array(10).fill(null).map((_, i) => ({
  title: `Item ${i + 1}`,
  description: `Description of item ${i + 1}`,
}));

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const openModal = (item: any) => {
    setSelectedItem(item);
    setVisible(true);
  };

  const renderAccessory = (item: any) => (
    <Button size="tiny" onPress={() => openModal(item)}>
      View
    </Button>
  );

  const renderItem = ({ item }: { item: any }) => (
    <ListItem
      title={item.title}
      description={item.description}
      accessoryRight={() => renderAccessory(item)}
    />
  );

  return (
      <Layout style={styles.container}>
        {/* Header */}
        <Layout style={[styles.header,]}>
          <Text category="h1" status="control">
            UI Kitten Showcase
          </Text>
        </Layout>

        {/* Theme Toggle */}
        <Layout style={styles.themeToggle}>
          <Text category="label">Toggle Theme</Text>
          <Toggle checked={theme === 'dark'} onChange={toggleTheme} />
        </Layout>

        {/* Card Example */}
        <ScrollView contentContainerStyle={styles.content}>
          <Card
            style={styles.card}
            header={(props) => (
              <View {...props} style={[props?.style, styles.cardHeader]}>
                <Text category="h5">Card Header</Text>
              </View>
            )}
            footer={(props) => (
              <View {...props} style={[props?.style, styles.cardFooter]}>
                <Button size="small">Share</Button>
                <Button size="small" status="danger">
                  Dismiss
                </Button>
              </View>
            )}
          >
            <Text>Here is an example of a UI Kitten card with a header and footer.</Text>
          </Card>

          {/* List Example */}
          <Text category="h6" style={styles.listTitle}>
            Scrollable List
          </Text>
          <List data={data} renderItem={renderItem} style={styles.list} />

          {/* Modal Example */}
          <Modal visible={visible} backdropStyle={styles.backdrop} onBackdropPress={() => setVisible(false)}>
            <Card disabled>
              <Text category="h5" style={styles.modalTitle}>
                {selectedItem?.title || 'Details'}
              </Text>
              <Text>{selectedItem?.description}</Text>
              <Button onPress={() => setVisible(false)} style={styles.closeButton}>
                Close
              </Button>
            </Card>
          </Modal>
        </ScrollView>
      </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  content: {
    padding: 16,
  },
  card: {
    marginVertical: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
  list: {
    marginTop: 16,
  },
  listTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    marginBottom: 16,
  },
  closeButton: {
    marginTop: 16,
  },
});

import React, {useState, useMemo, useEffect} from 'react';
import { Text, View, Button, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

import * as SQLite from 'expo-sqlite' 

import * as Haptics from 'expo-haptics';

const queryClient = new QueryClient();
const Stack = createStackNavigator();
//pop
const PopCovers = {
  'Thank U, Next': require('./assets/Ariana_Grande_Thank_U_Next.jpg'),
  '1989': require('./assets/Taylor_Swift_1989.png'),
  'Born to Die': require('./assets/Lana_Del_Rey_BornToDie.png'),
  'Future Nostalgia': require('./assets/Dua_Lipa_Future_Nostalgia.png'),
};
//rock
import {rock} from './assets/imports'
const {beatles, nirvana, queen, led_zeppelin} = rock;
//jazz
import {jazz} from './assets/imports'
const {Armstrong, coltrane, Ellington, davis} = jazz;
//metal
import {metal} from './assets/imports'
const {metallica, maiden, sabbath, slipknot} = metal;

const genreAlbums = {
  rock: [
    { title: 'A Night at the Opera', artist: 'Queen' },
    { title: 'IV', artist: 'Led Zeppelin' },
    { title: 'Abbey Road', artist: 'The Beatles' },
    { title: 'Nevermind', artist: 'Nirvana' }
  ],
  jazz: [
    { title: 'Kind of Blue', artist: 'Miles Davis' },
    { title: 'A Love Supreme', artist: 'John Coltrane' },
    { title: 'What a Wonderful World', artist: 'Louis Armstrong' },
    { title: 'Money Jungle', artist: 'Duke Ellington' }
  ],
  metal: [
    { title: 'Master of Puppets', artist: 'Metallica' },
    { title: 'The Number of the Beast', artist: 'Iron Maiden' },
    { title: 'Paranoid', artist: 'Black Sabbath' },
    { title: 'Iowa', artist: 'Slipknot' }
  ]
};

//збереження даних у базу
const saveAlbumsToDb = (db) => {
  Object.keys(genreAlbums).forEach((genre) => {
    genreAlbums[genre].forEach(({ title, artist }) => {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO Albums (title, artist, genre) VALUES (?, ?, ?)',
          [title, artist, genre],
          null,
          (txObj, error) => console.log('Помилка запису:', error)
        );
      });
    });
  });
};
//отримання альбомів
const fetchAlbums = (db, genre, setAlbums) => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM Albums WHERE genre = ?',
      [genre],
      (txObj, resultSet) => setAlbums(resultSet.rows._array),
      (txObj, error) => console.log('Помилка вибірки:', error)
    );
  });
};


//Домашня сторінка
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Вибери свій жанр!</Text>
      <View style={styles.rowContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.genreButton} onPress={() => navigation.navigate('Pop')}>
            <Image source={musicIcon} style={styles.icon} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={styles.genreLabel}>Поп</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.genreButton} onPress={() => navigation.navigate('Jazz')}>
            <Image source={saxophoneIcon} style={styles.icon} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={styles.genreLabel}>Джаз</Text>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.genreButton} onPress={() => navigation.navigate('Rock')}>
            <Image source={guitarIcon} style={styles.icon} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={styles.genreLabel}>Рок</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.genreButton} onPress={() => navigation.navigate('Metal')}>
            <Image source={electricGuitarIcon} style={styles.icon} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={styles.genreLabel}>Метал</Text>
        </View>
      </View>
    </View>
  );
}
function PopPage({ navigation }) {
  const { data: albums, isLoading, error } = useQuery({
    queryKey: ['popAlbums'],
    queryFn: async () => {
      const response = await fetch('https://my-json-server.typicode.com/nonameblabla/pmp_labs/popAlbums');
      const data = await response.json();
      return data.map((album) => ({
        ...album,
        cover: PopCovers[album.title] || null,
      }));
    },
  });

  if (isLoading) return <Text>Завантаження...</Text>;
  if (error) return <Text>Помилка: {error.message}</Text>;

  return (
    <View style={styles.popContainer}>
      <Text style={styles.popHeader}>Поп</Text>
      <FlatList
        data={albums}
        renderItem={({ item }) => (
          <View style={styles.albumCardPop}>
            {item.cover && <Image source={item.cover} style={styles.albumCoverPop} />}
            <Text style={styles.albumTitle}>{item.title}</Text>
            <Text style={styles.albumArtist}>{item.artist}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button
        title="Назад"
        onPress={() => {
          Haptics.selectionAsync(); //Виклик вібрації при натисканні
          navigation.navigate('Музичні підбірки');
        }}
      />
    </View>
  );
}

//
function RockPage({ navigation }) {
  const [rockAlbums, setRockAlbums] = useState([]);
  const [db, setDb] = useState(null);

  useEffect(() => {
    if (db) fetchAlbums(db, 'rock', setRockAlbums);
  }, [db]);

  return (
    <View style={styles.rockContainer}>
      <Text style={styles.rockHeader}>Рок</Text>
      <FlatList
        data={rockAlbums}
        renderItem={({ item }) => (
          <View style={styles.albumCardRock}>
            <Image source={item.cover} style={styles.albumCoverRock} />
            <Text style={styles.albumTitle}>{item.title}</Text>
            <Text style={styles.albumArtist}>{item.artist}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button
        title="Назад"
        onPress={() => {
          Haptics.selectionAsync(); //Виклик вібрації при натисканні
          navigation.navigate('Музичні підбірки');
        }}
      />    </View>
  );
}

function JazzPage({ navigation }) {
  const [jazzAlbums, setJazzAlbums] = useState([]);
  const [db, setDb] = useState(null);

  useEffect(() => {
    if (db) fetchAlbums(db, 'jazz', setJazzAlbums);
  }, [db]);

  return (
    <View style={styles.jazzContainer}>
      <Text style={styles.jazzHeader}>Джаз</Text>
      <FlatList
        data={jazzAlbums}
        renderItem={({ item }) => (
          <View style={styles.albumCardJazz}>
            <Image source={item.cover} style={styles.albumCoverJazz} />
            <Text style={styles.albumTitle}>{item.title}</Text>
            <Text style={styles.albumArtist}>{item.artist}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button
        title="Назад"
        onPress={() => {
          Haptics.selectionAsync(); //Виклик вібрації при натисканні
          navigation.navigate('Музичні підбірки');
        }}
      />    </View>
  );
}

function MetalPage({ navigation }) {
  const [metalAlbums, setMetalAlbums] = useState([]);
  const [db, setDb] = useState(null);

  useEffect(() => {
    if (db) fetchAlbums(db, 'metal', setMetalAlbums);
  }, [db]);

  return (
    <View style={styles.metalContainer}>
      <Text style={styles.metalHeader}>Метал</Text>
      <FlatList
        data={metalAlbums}
        renderItem={({ item }) => (
          <View style={styles.albumCardMetal}>
            <Image source={item.cover} style={styles.albumCoverMetal} />
            <Text style={styles.albumTitle}>{item.title}</Text>
            <Text style={styles.albumArtist}>{item.artist}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button
        title="Назад"
        onPress={() => {
          Haptics.selectionAsync(); //Виклик вібрації при натисканні
          navigation.navigate('Музичні підбірки');
        }}
      />    </View>
  );
}

export default function App() {
  const [db, setDb] = useState(null);

  useEffect(() => {
    const database = SQLite.openDatabase('lmao.db');
    setDb(database);

    database.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS Albums (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, artist TEXT, genre TEXT)"
      );
    });

    saveAlbumsToDb(database);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Музичні підбірки">
          <Stack.Screen name="Музичні підбірки" component={HomeScreen} />
          <Stack.Screen name="Pop" component={PopPage} />
          <Stack.Screen name="Rock">
            {(props) => <RockPage {...props} db={db} />}
          </Stack.Screen>
          <Stack.Screen name="Jazz">
            {(props) => <JazzPage {...props} db={db} />}
          </Stack.Screen>
          <Stack.Screen name="Metal">
            {(props) => <MetalPage {...props} db={db} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
    paddingTop: 40,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  buttonContainer: {
    alignItems: 'center',
    width: '45%',
  },
  genreButton: {
    width: '100%',
    height: 80,
    borderRadius: 20,
    backgroundColor: '#ff6f61',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    flexShrink: 1,
  },
  genreLabel: {
    marginTop: 10,
    fontSize: 18,
    color: '#555',
  },
  popContainer: {
    flex: 1,
    backgroundColor: '#fff7f0',
    paddingTop: 40,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  popHeader: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ff6f61',
    textAlign: 'center',
    marginBottom: 20,
  },
  albumCardPop: {
    backgroundColor: '#ffe0b2',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  albumCoverPop: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  albumTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  albumArtist: {
    fontSize: 16,
    color: '#777',
  },
  // Рок
  rockContainer: {
    flex: 1,
    backgroundColor: '#f3e5f5', 
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  rockHeader: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4a148c', 
    textAlign: 'center',
    marginBottom: 20,
  },
  albumCardRock: {
    backgroundColor: '#ce93d8',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  albumCoverRock: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  // Джаз
  jazzContainer: {
    flex: 1,
    backgroundColor: '#e0f2f1', 
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  jazzHeader: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00695c', 
    textAlign: 'center',
    marginBottom: 20,
  },
  albumCardJazz: {
    backgroundColor: '#b2dfdb',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  albumCoverJazz: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  // Метал
  metalContainer: {
    flex: 1,
    backgroundColor: '#eceff1', 
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  metalHeader: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#37474f', 
    textAlign: 'center',
    marginBottom: 20,
  },
  albumCardMetal: {
    backgroundColor: '#b0bec5',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  albumCoverMetal: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
});

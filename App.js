import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Text, View, Button, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const musicIcon = require('./assets/music.png');
const saxophoneIcon = require('./assets/saxophone.png');
const guitarIcon = require('./assets/guitar.png');
const electricGuitarIcon = require('./assets/electric-guitar.png');
const grande = require('./assets/Ariana_Grande_Thank_U_Next.jpg');
const taylor = require('./assets/Taylor_Swift_1989.png');
const lanochka = require('./assets/Lana_Del_Rey_BornToDie.png');
const dualipa = require('./assets/Dua_Lipa_Future_Nostalgia.png');
const queen = require('./assets/Queen.jpg');
const nirvana = require('./assets/Nirvana.jpg');
const led_zeppelin = require('./assets/Led_zeppelin.jpg');
const beatles = require('./assets/Beatles.jpg');
const Ellington = require('./assets/ellington.jpg');
const Armstrong = require('./assets/Louis-Armstrong.jpg');
const davis = require('./assets/miles_davis.jpg');
const coltrane = require('./assets/John_Coltrane.jpeg');
const metallica = require('./assets/metallica.jpg');
const maiden = require('./assets/iron_maiden.jpg');
const sabbath = require('./assets/Black_Sabbath.png');
const slipknot = require('./assets/slipknot.jpg');

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
  const [popAlbums, setPopAlbums] = useState([
    { title: '1989', artist: 'Taylor Swift', cover: taylor },
    { title: 'Thank U, Next', artist: 'Ariana Grande', cover: grande },
    { title: 'Future Nostalgia', artist: 'Dua Lipa', cover: dualipa },
    { title: 'Born to Die', artist: 'Lana Del Rey', cover: lanochka },
  ]);

  const memoizedAlbums = useMemo(() => popAlbums, [popAlbums]);

  return (
    <View style={styles.popContainer}>
      <Text style={styles.popHeader}>Поп</Text>
      <FlatList
        data={memoizedAlbums}
        renderItem={({ item }) => (
          <View style={styles.albumCardPop}>
            <Image source={item.cover} style={styles.albumCoverPop} />
            <Text style={styles.albumTitle}>{item.title}</Text>
            <Text style={styles.albumArtist}>{item.artist}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button title="Назад" onPress={() => navigation.navigate('Музичні підбірки')} />
    </View>
  );
}

function RockPage({ navigation }) {
  const [rockAlbums, setRockAlbums] = useState([
    { title: 'A Night at the Opera', artist: 'Queen', cover: queen },
    { title: 'IV', artist: 'Led Zeppelin', cover: led_zeppelin },
    { title: 'Abbey Road', artist: 'The Beatles', cover: beatles },
    { title: 'Nevermind', artist: 'Nirvana', cover: nirvana },
  ]);

  const memoizedRockAlbums = useMemo(() => rockAlbums, [rockAlbums]);

  return (
    <View style={styles.rockContainer}>
      <Text style={styles.rockHeader}>Рок</Text>
      <FlatList
        data={memoizedRockAlbums}
        renderItem={({ item }) => (
          <View style={styles.albumCardRock}>
            <Image source={item.cover} style={styles.albumCoverRock} />
            <Text style={styles.albumTitle}>{item.title}</Text>
            <Text style={styles.albumArtist}>{item.artist}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button title="Назад" onPress={() => navigation.navigate('Музичні підбірки')} />
    </View>
  );
}

function JazzPage({ navigation }) {
  const [jazzAlbums, setJazzAlbums] = useState([
    { title: 'Kind of Blue', artist: 'Miles Davis', cover: davis },
    { title: 'A Love Supreme', artist: 'John Coltrane', cover: coltrane },
    { title: 'What a Wonderful World', artist: 'Louis Armstrong', cover: Armstrong },
    { title: 'Money Jungle', artist: 'Duke Ellington', cover: Ellington },
  ]);

  const fetchJazzAlbums = useCallback(() => {
    setJazzAlbums([...jazzAlbums]);
  }, [jazzAlbums]);

  useEffect(() => {
    fetchJazzAlbums();
  }, [fetchJazzAlbums]);

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
        keyExtractor={(item, index) => index.toString()}
      />
      <Button title="Назад" onPress={() => navigation.navigate('Музичні підбірки')} />
    </View>
  );
}

function MetalPage({ navigation }) {
  const [metalAlbums, setMetalAlbums] = useState([
    { title: "Kill 'Em All", artist: 'Metallica', cover: metallica },
    { title: 'The Number of the Beast', artist: 'Iron Maiden', cover: maiden },
    { title: 'Paranoid', artist: 'Black Sabbath', cover: sabbath },
    { title: 'Iowa', artist: 'Slipknot', cover: slipknot },
  ]);

  useEffect(() => {
    console.log('Metal albums updated');
  }, [metalAlbums]);

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
        keyExtractor={(item, index) => index.toString()}
      />
      <Button title="Назад" onPress={() => navigation.navigate('Музичні підбірки')} />
    </View>
  );
}

// Головна функція додатку
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Музичні підбірки">
        <Stack.Screen name="Музичні підбірки" component={HomeScreen} />
        <Stack.Screen name="Pop" component={PopPage} />
        <Stack.Screen name="Rock" component={RockPage} />
        <Stack.Screen name="Jazz" component={JazzPage} />
        <Stack.Screen name="Metal" component={MetalPage} />
      </Stack.Navigator>
    </NavigationContainer>
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
  //Pop
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

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { useEffect, useState } from 'react'
import * as MediaLibrary from 'expo-media-library'

export default function App() {
  const [permissionStatus, setPermissionStatus] = useState(null)
  const [albumList, setAlbumList] = useState([])
  
  useEffect(() => {
    const getPermissionStatus = async () => {
      const initialStatus = await MediaLibrary.getPermissionsAsync()
      let requestStatus = initialStatus
      if (initialStatus.status === 'undetermined') {
        requestStatus = await MediaLibrary.requestPermissionsAsync()
      }
      setPermissionStatus(requestStatus)
    }
    getPermissionStatus()
  }, [])

  useEffect(() => {
    const getAlbums = async () => {
      const albums = await MediaLibrary.getAlbumsAsync()
      setAlbumList(albums)
    }
    if (permissionStatus && permissionStatus.granted) {
      getAlbums()
    }
  }, [permissionStatus])

  const handleDelete = async (album) => {
    try {
      const success = await MediaLibrary.deleteAlbumsAsync(album, false)
      if (success) {
        setAlbumList(albumList => albumList.filter((a) => a.id !== album.id))
        alert('Deleted')
      }
    } catch {
      alert('Deletion denied')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {permissionStatus && permissionStatus.granted ? (
        <View flex={1}>
          <Text>Permission granted</Text>
          <ScrollView>
            {albumList.map((album, i) => (
              <View key={i} style={styles.albumRow}>
                <Text style={styles.albumTitle}>{album.title}</Text>
                <Pressable onPress={() => handleDelete(album)}><Text style={styles.buttonLabel}>Delete</Text></Pressable>
              </View>
            ))}
          </ScrollView>
        </View>
      ) : <Text>Needs permissions</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  albumRow: {
    backgroundColor: 'grey',
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  albumTitle: {
    color: 'white'
  },
  buttonLabel: {
    color: 'white',
    fontWeight: 'bold',
  }
});

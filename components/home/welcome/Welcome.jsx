import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native'
import { useState } from 'react'
import styles from './welcome.style'
import { useRouter } from 'expo-router'
import { icons, SIZES } from '../../../constants'

const jobTypes = [
  "Cardiologista", "Pediatra", "Otorrinolaringologista"
]


const Welcome = () => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState("Full-time");
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Olá Gabriel</Text>
        <Text style={styles.welcomeMessage}>Ache o médico perfeito</Text>

      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value=''
            onChange={() => { }}
            placeholder='O que você procura?'
          />

        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={() => { }}>
          <Image
            source={icons.search}
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>

      </View>
      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item);
                router.push(`/search/${item}`);
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal={true}
        />
      </View>
    </View>
  )
}

export default Welcome
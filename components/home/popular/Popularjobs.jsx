import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, SIZES } from '../../../constants';
import styles from './popularjobs.style';
import PopularJobCard from "../../common/cards/popular/PopularJobCard";


const Popularjobs = () => {
  const router = useRouter();
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Médicos Populares</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Mostra todos</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (<ActivityIndicator size="large" color={COLORS.primary} />) : (
          error ? (
            <Text>Algo deu errado</Text>
          ) : (
            <FlatList data={[1, 2, 3]}
              renderItem={({ item }) => (
                <PopularJobCard item={item} />
              )}
              keyExtractor={item => item?.job_id}
              contentContainerStyle={{ columnGap: SIZES.medium }}
              horizontal
            >

            </FlatList>
          )
        )}
      </View>
    </View>
  )
}

export default Popularjobs
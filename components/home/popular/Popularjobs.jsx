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
  const [selectedJob, setSelectedJob] = useState();

  const handleCardPress = (item) => {
    console.log(item)
    router.push(`/doctor-details/${item.doctor_id}`);
    setSelectedJob(item.doctor_id);
  };
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
            <FlatList data={[{
              doctor_id: "12312312",
              doctor_name: "Mariana Morais",
              doctor_role: "Pediatra",
              doctor_security: "123123123123",
              doctor_location: "Rio de Janeiro, RJ",
              doctor_picture: "https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59094041-stock-illustration-medical-doctor-profile.jpg"

            }, {
              doctor_id: "122312312",
              doctor_name: "Mariana Morais",
              doctor_role: "Pediatra",
              doctor_security: "123123123123",
              doctor_location: "Rio de Janeiro, RJ",
              doctor_picture: "https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59094041-stock-illustration-medical-doctor-profile.jpg"

            }, {
              doctor_id: "123123312",
              doctor_name: "Mariana Morais",
              doctor_role: "Pediatra",
              doctor_security: "123123123123",
              doctor_location: "Rio de Janeiro, RJ",
              doctor_picture: "https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59094041-stock-illustration-medical-doctor-profile.jpg"

            }]}
              renderItem={({ item }) => (
                <PopularJobCard
                  item={item}
                  selectedJob={selectedJob}
                  handleCardPress={handleCardPress} />
              )}
              keyExtractor={item => item?.doctor_id}
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
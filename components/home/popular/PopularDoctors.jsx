import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../../api/supabase';
import { COLORS, SIZES } from '../../../constants';
import styles from './popularjobs.style';
import PopularDoctorCard from '../../common/cards/popular/PopularDoctorCard.jsx';

const PopularDoctors = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState();

  useEffect(() => {
    const fetchPopularDoctors = async () => {
      try {
        const { data, error } = await supabase
          .from('doctors')
          .select()
          .limit(3);

        if (error) {
          setError(true);
        } else {
          setDoctors(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Erro ao buscar médicos:', error.message);
        setError(true);
        setIsLoading(false);
      }
    };

    fetchPopularDoctors();
  }, []);

  const handleCardPress = (item) => {
    router.push(`/doctor-details/${item.doctor_id}`);
    setSelectedDoctor(item.doctor_id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Médicos Populares</Text>

      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Algo deu errado</Text>
        ) : (
          <FlatList
            data={doctors}
            renderItem={({ item }) => (
              <PopularDoctorCard
                item={item}
                selectedDoctor={selectedDoctor}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={(item) => item?.doctor_id}
            contentContainerStyle={{ marginRight: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default PopularDoctors;

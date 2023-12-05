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
import { icons, SIZES } from '../../../constants';
import styles from './welcome.style';
import { useAppContext } from '../../../appContext/appContext';
import PopularDoctorCard from '../../common/cards/popular/PopularDoctorCard';



const Welcome = () => {
  const { userData } = useAppContext();
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState('Full-time');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedJob, setSelectedJob] = useState();

  useEffect(() => {
    // Lógica de inicialização, se necessário
  }, []);

  const handleCardPress = (item) => {
    router.push(`/doctor-details/${item.doctor_id}`);
    setSelectedJob(item.doctor_id);
  };

  const handleSearch = async () => {
    // Lógica para buscar resultados no Supabase com base em searchTerm
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select()
        .ilike('doctor_role', `%${searchTerm}%`)
        .limit(5);

      if (error) {
        console.error('Erro ao buscar resultados da pesquisa:', error.message);
      } else {
        setSearchResults(data);
      }
    } catch (error) {
      console.error('Erro ao buscar resultados da pesquisa:', error.message);
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Olá {userData?.user_full_name}</Text>
        <Text style={styles.welcomeMessage}>Ache o médico perfeito para você</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder="Digite uma especialidade"
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
          <Image source={icons.search} style={styles.searchBtnImage} />
        </TouchableOpacity>
      </View>

      {searchResults.length > 0 && (
        <View style={styles.searchResultsContainer}>
          <FlatList
            data={searchResults}
            renderItem={({ item }) => (
              <PopularDoctorCard
                item={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={(item) => item?.doctor_id}
            contentContainerStyle={{ marginRight: SIZES.medium }}
            horizontal
          />
        </View>
      )}


    </View>
  );
};

export default Welcome;

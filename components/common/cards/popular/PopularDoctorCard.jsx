import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./popularjobcard.style";
import { checkImageURL } from "../../../../utils";

const PopularDoctorCard = ({ item, selectedDoctor, handleCardPress }) => {
  return (
    <TouchableOpacity
      style={styles.container(selectedDoctor, item)}
      onPress={() => handleCardPress(item)}
    >
      
      <Text style={styles.companyName} numberOfLines={1}>
        {item.doctor_name}
      </Text>

      <View style={styles.infoContainer}>
        <Text numberOfLines={1}>{item.doctor_role}</Text>
        <View style={styles.infoWrapper}>
          <Text style={styles.location}> {item.doctor_location}</Text>
        </View>

      </View>
    </TouchableOpacity>
  );
};

export default PopularDoctorCard;

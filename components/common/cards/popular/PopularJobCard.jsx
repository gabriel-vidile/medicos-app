import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./popularjobcard.style";
import { checkImageURL } from "../../../../utils";
//Trocar as propriedades Dos Itens
const PopularJobCard = ({ item, selectedJob, handleCardPress }) => {
  return (
    <TouchableOpacity
      style={styles.container(selectedJob, item)}

      onPress={() => handleCardPress(item)}

    >
      <TouchableOpacity>
        <Image
          source={{
            uri: checkImageURL(item?.doctor_picture)
              ? item.doctor_picture
              : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          }}
          resizeMode='contain'
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1}>
        {item.doctor_name}
      </Text>

      <View style={styles.infoContainer}>
        <Text numberOfLines={1}>
          {item.doctor_role}
        </Text>
        <View style={styles.infoWrapper}>
          <Text >
            {item?.doctor_security} -
          </Text>
          <Text style={styles.location}> {item.doctor_location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobCard;
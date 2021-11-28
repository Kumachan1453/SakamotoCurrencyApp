import React from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";

export const GroupList = () => {
  return (
    <View style={styles.inputAndPlusButton}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setContent(text)} //ここで引数が使われている。
        value={content}
        placeholder="本を読む"
      />
      <TouchableOpacity onPress={() => addTasks()}>
        <Ionicons name="md-add-circle" size={40} color="#003366" />
      </TouchableOpacity>
    </View>
  );
};

export default GroupList;

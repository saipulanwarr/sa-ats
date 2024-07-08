import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { router } from "expo-router";

import { Colors } from "@/constants/Colors";
import client from "@/api/client";
import { SearchBox, Spinner } from "@/components";
import { addNegara } from "@/store/atsSlice";

const Negara = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [negara, setNegara] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getNegara();
  }, []);

  const getNegara = async () => {
    try {
      const { data } = await client("/negaras");
      setNegara(data);
    } catch (err) {
      console.log("err", err);
    }
    setIsLoading(false);
  };

  const onChangeSearch = (text) => {
    setSearchText(text);
    const filteredData = negara.filter((item) =>
      item.nama_negara.toLowerCase().includes(text.toLowerCase())
    );
    setNegara(filteredData);
  };

  const onSelect = (item) => {
    dispatch(addNegara(item));
    router.back();
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      <SearchBox onChangeSearch={(text) => onChangeSearch(text)} />

      <FlatList
        data={negara}
        renderItem={({ item }) => (
          <Pressable style={styles.content} onPress={() => onSelect(item)}>
            <Text style={styles.text}>{item.nama_negara}</Text>
          </Pressable>
        )}
        refreshing={refreshing}
        onRefresh={() => getNegara()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
  },
  content: {
    borderBlockColor: Colors.border,
    borderBottomWidth: 1,
    paddingBottom: 15,
    marginVertical: 15,
  },
  text: {
    color: Colors.black,
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default Negara;

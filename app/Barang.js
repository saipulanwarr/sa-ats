import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { router, useLocalSearchParams } from "expo-router";

import { Colors } from "@/constants/Colors";
import client from "@/api/client";
import { SearchBox, Spinner } from "@/components";
import { addBarang } from "@/store/atsSlice";

const Barang = () => {
  const params = useLocalSearchParams();
  const { id } = params;
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [barang, setBarang] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getBarang();
  }, []);

  const getBarang = async () => {
    try {
      let newUrl = decodeURIComponent(
        `barangs?filter={"where":{"id_pelabuhan":${id}}}`
      );
      const { data } = await client(newUrl);
      setBarang(data);
    } catch (err) {
      console.log("err", err);
    }
    setIsLoading(false);
  };

  const onChangeSearch = (text) => {
    setSearchText(text);
    const filteredData = barang.filter((item) =>
      item.nama_barang.toLowerCase().includes(text.toLowerCase())
    );
    setBarang(filteredData);
  };

  const onSelect = (item) => {
    dispatch(addBarang(item));
    router.back();
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      <SearchBox onChangeSearch={(text) => onChangeSearch(text)} />

      <FlatList
        data={barang}
        renderItem={({ item }) => (
          <Pressable style={styles.content} onPress={() => onSelect(item)}>
            <Text style={styles.text}>{item.nama_barang}</Text>
          </Pressable>
        )}
        refreshing={refreshing}
        onRefresh={() => getBarang()}
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

export default Barang;

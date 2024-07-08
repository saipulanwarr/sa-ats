import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { router, useLocalSearchParams } from "expo-router";

import { Colors } from "@/constants/Colors";
import client from "@/api/client";
import { SearchBox, Spinner } from "@/components";
import { addPelabuhan } from "@/store/atsSlice";

const Pelabuhan = () => {
  const params = useLocalSearchParams();
  const { id } = params;
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [pelabuhan, setPelabuhan] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPelabuhan();
  }, []);

  const getPelabuhan = async () => {
    try {
      let newUrl = decodeURIComponent(
        `pelabuhans?filter={"where":{"id_negara":${id}}}`
      );
      const { data } = await client(newUrl);
      setPelabuhan(data);
    } catch (err) {
      console.log("err", err);
    }
    setIsLoading(false);
  };

  const onChangeSearch = (text) => {
    setSearchText(text);
    const filteredData = pelabuhan.filter((item) =>
      item.nama_pelabuhan.toLowerCase().includes(text.toLowerCase())
    );
    setPelabuhan(filteredData);
  };

  const onSelect = (item) => {
    dispatch(addPelabuhan(item));
    router.back();
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      <SearchBox onChangeSearch={(text) => onChangeSearch(text)} />

      <FlatList
        data={pelabuhan}
        renderItem={({ item }) => (
          <Pressable style={styles.content} onPress={() => onSelect(item)}>
            <Text style={styles.text}>{item.nama_pelabuhan}</Text>
          </Pressable>
        )}
        refreshing={refreshing}
        onRefresh={() => getPelabuhan()}
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

export default Pelabuhan;

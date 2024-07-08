import { StyleSheet, ScrollView, View } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import { useSelector } from "react-redux";

import { Colors } from "@/constants/Colors";
import { CustomSelect, CustomInput } from "@/components";

const index = () => {
  const { negara, pelabuhan, barang } = useSelector((state) => state.ats);

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Home",
        }}
      />
      <CustomSelect
        title={negara.nama_negara ? negara.nama_negara : "Pilih Negara"}
        label="Negara"
        onPress={() => router.push({ pathname: "/Negara" })}
      />
      {negara.nama_negara && (
        <CustomSelect
          title={
            pelabuhan.nama_pelabuhan
              ? pelabuhan.nama_pelabuhan
              : "Pilih Pelabuhan"
          }
          label="Pelabuhan"
          onPress={() =>
            router.push({
              pathname: "/Pelabuhan",
              params: { id: negara.id_negara },
            })
          }
        />
      )}

      {pelabuhan.nama_pelabuhan && (
        <CustomSelect
          title={barang.nama_barang ? barang.nama_barang : "Pilih Barang"}
          label="Barang"
          onPress={() =>
            router.push({
              pathname: "/Barang",
              params: { id: pelabuhan.id_pelabuhan },
            })
          }
        />
      )}

      {barang.nama_barang && (
        <View style={{ marginBottom: 30 }}>
          <CustomInput
            title="Deskripsi"
            multiline
            editable={false}
            placeholder="Deskripsi"
            value={barang.description}
          />
          <CustomInput
            title="Diskon"
            placeholder="Diskon"
            value={barang.diskon}
            editable={false}
          />
          <CustomInput
            title="Harga"
            placeholder="Harga"
            value={barang.harga}
            editable={false}
          />
          <CustomInput
            title="Total"
            placeholder="Total"
            value={barang.harga * barang.diskon}
            editable={false}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});

export default index;

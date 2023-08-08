import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import CardMedium from "../components/CardMedium";
import mock_data from "./data.json";
// import { useFonts } from "expo-font";
import SearchBar from "../components/SearchBar";


export default function SearchScreen({ navigation }) {


    const [mock_list, setList] = useState(mock_data);

    //Read mock json
    const renderService = ({ item }) => (
        <CardMedium
            image_source={require("../../assets/user-profile.png")}
            service={item}
            onSelect={() => handleServiceSelect(item)}
        />
    );

    const handleServiceSelect = item => {
        navigation.navigate("ServiceDetailScreen", {item});
    };

    //Search function
    const handleSearch = (text) => {
        const filteredList = mock_data.filter((service) => {
            const searchedText = text.toLowerCase();
            const currentTitle = service.title.toLowerCase();

            return currentTitle.indexOf(searchedText) > -1;
        });

        setList(filteredList);
    };

    return (
        <View style={styles.container}>
            <View style={styles.search_container}>
                <SearchBar onSearch={handleSearch} />
            </View>
            <FlatList
                data={mock_list}
                renderItem={renderService}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    search_container: {
        marginTop: 48,
        marginHorizontal: 24,
    },
});

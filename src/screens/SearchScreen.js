import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import CardMedium from "../components/CardMedium";
import SearchBar from "../components/SearchBar";
import { getDatabase, ref, child, get } from "firebase/database";
import { colors, sizes } from "../styles/Theme";
import { filterServicesByCategory } from "../utils/CategoryUtils";
import categories from "../utils/Categories";
import Category from "../components/Category";
import { showTopMessage } from "../utils/ErrorHandler";
import parseContentData from "../utils/ParseContentData";

export default function SearchScreen({ navigation }) {
    const [loading, setLoading] = useState(true);
    const [serviceList, setServiceList] = useState([]);
    const [filteredServiceList, setFilteredServiceList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        const dbRef = ref(getDatabase());

        get(child(dbRef, "services"))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const serviceList = parseContentData(snapshot.val());
                    setServiceList(serviceList);
                    setFilteredServiceList(serviceList);
                } else {
                    showTopMessage("Gösterecek veri yok", "info");
                }
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false); // Veriler çekildikten sonra yükleme durumunu kapat
            });
    }, []);

    //filtering by category name
    const handleCategoryFilter = (category) => {
        if (selectedCategory === category) {
            setSelectedCategory(""); // Eğer zaten seçiliyse, seçili kategoriyi temizle
            setFilteredServiceList(serviceList); // Filtrelemeyi kaldır, tüm hizmetleri göster
        } else {
            const filteredList = filterServicesByCategory(
                category,
                serviceList
            );
            setSelectedCategory(category);
            setFilteredServiceList(filteredList);
        }
    };

    //Render to flatlist
    const renderService = ({ item }) => (
        <CardMedium
            image_source={require("../../assets/user-profile.png")}
            service={item}
            onSelect={() => handleServiceSelect(item)}
        />
    );

    const renderCategory = ({ item }) => (
        <Category
            category={item}
            isSelected={selectedCategory === item.name}
            onPress={() => handleCategoryFilter(item.name)}
            key={item.name}
        />
    );

    //Navigate to detail
    const handleServiceSelect = (item) => {
        navigation.navigate("ServiceDetailScreen", { item });
    };

    //Search function
    const handleSearch = (text) => {
        const searchedText = text.toLowerCase();

        const filteredList = serviceList.filter((service) => {
            const skillsMatch = service.skills.some((skill) =>
                skill.toLowerCase().includes(searchedText)
            );

            const expertAreaMatch = service.expert_area
                .toLowerCase()
                .includes(searchedText);

            return skillsMatch || expertAreaMatch;
        });

        setFilteredServiceList(filteredList);
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator
                    style={styles.loadingIndicator}
                    size="large"
                    color={colors.color_blue}
                />
            ) : (
                <View style={styles.container}>
                    <View style={styles.search_container}>
                        <SearchBar
                            onSearch={handleSearch}
                            placeholder_text={"Arama"}
                        />
                    </View>

                    <View style={styles.category_container}>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            snapToInterval={sizes.width + 24}
                            decelerationRate={"fast"}
                            data={categories}
                            keyExtractor={(category) => category.name}
                            renderItem={renderCategory}
                        />
                    </View>

                    <View style={styles.list_container}>
                        <FlatList
                            data={filteredServiceList}
                            renderItem={renderService}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    search_container: {
        marginTop: 56,
        marginBottom: 12,
        marginHorizontal: 24,
    },
    category_container: {
        marginHorizontal: 24,
        marginVertical: 8,
    },
    list_container: {
        marginBottom: 32,
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

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
import userImages from "../utils/UserImageUtils"

export default function SearchScreen({ navigation, route }) {
    const [loading, setLoading] = useState(true);
    const [serviceList, setServiceList] = useState([]);
    const [filteredServiceList, setFilteredServiceList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    const category = route.params?.category;

    useEffect(() => {
        const dbRef = ref(getDatabase());

        get(child(dbRef, "services"))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const serviceList = parseContentData(snapshot.val());
                    setServiceList(serviceList);

                    if (category) {
                        const filteredList = filterServicesByCategory(
                            category.name,
                            serviceList
                        );
                        setSelectedCategory(category.name);
                        setFilteredServiceList(filteredList);
                    } else {
                        setFilteredServiceList(serviceList);
                    }
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
            image_source={userImages[item.id]}
            service={item}
            key={item.id}
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
                    color={colors.color_primary}
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
                            contentContainerStyle={{ paddingBottom: 330 }} //scroll viewdan dolayı flatlist gömülüyordu
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

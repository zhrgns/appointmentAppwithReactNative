export const filterServicesByCategory = (category, serviceList) => {
    if (category === "") {
        return serviceList;
    } else {
        const filteredList = serviceList.filter((service) =>
            service.expert_area.toLowerCase() === category.toLowerCase()
        );
        return filteredList;
    }
};

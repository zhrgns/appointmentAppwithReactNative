export default function (data) {
    return Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
    }));
}

export default function parseContentData (data) {
    return Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
    }));
}

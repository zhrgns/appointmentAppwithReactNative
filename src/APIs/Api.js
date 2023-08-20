import {
    ref,
    get,
    child,
    getDatabase
} from "firebase/database";
import { showTopMessage } from "../utils/ErrorHandler";
import parseContentData from "../utils/ParseContentData";

export const getTimeListFromDatabase = (setTimeList, setLoading) => {
    const dbRef = ref(getDatabase());

    get(child(dbRef, "times"))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const timeList = parseContentData(snapshot.val());
                setTimeList(timeList);
            } else {
                showTopMessage("Gösterecek veri yok", "info");
            }
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            setLoading(false);
        });
};

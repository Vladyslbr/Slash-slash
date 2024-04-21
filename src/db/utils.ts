import Dexie from "dexie";

export const checkDbExistance = async () => {
    const db = await Dexie.exists("Slash-DB")
    if (db) {
        return true;
    } else {
        console.log("Database doesn't exist");
        return false;
    };
};
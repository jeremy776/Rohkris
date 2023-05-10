import {
  database
} from "../../../utils/firebaseConfig";
import {
  child,
  get,
  ref
} from "firebase/database";

export async function getPiket() {
  const dbref = ref(database);
  let data = await get(child(
    dbref,
    "jadwalpiket"
  ));

  return Object.values(data.val());
}

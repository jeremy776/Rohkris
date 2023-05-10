import {
  database
} from '../../../utils/firebaseConfig';
import {
  child,
  get,
  ref
} from 'firebase/database';

interface Ibadah {
  mingguke: number;
}

export async function getIbadah(param: Ibadah) {
  const dbref = ref(database)
  let mingguke;
  if (param.mingguke % 2 === 1) {
    mingguke = 1;
  } else {
    mingguke = 2;
  }
  let data = await get(child(
    dbref,
    mingguke == 1 ? 'jadwal-ibadah' : 'jadwal-ibadah-minggu2'
  ));

  return data.val();
}

import {
  database
} from '../../../utils/firebaseConfig';
import {
  child,
  get,
  ref
} from 'firebase/database';

export async function getEvent() {
  const dbref = ref(database);
  let data = await get(child(
    dbref,
    'event'
  ));

  return Object.values(data.val()).map((x: any) => {
    return {
      banner: x.banner,
      "biaya-regist": x['biaya-regist'],
      contact: x.contact,
      lokasi: x.lokasi,
      nama: x.nama,
      tanggal: x.tanggal,
      tema: x.tema,
      waktu: Object.values(x.waktu)
    }
  })
}

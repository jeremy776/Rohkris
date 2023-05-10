const books = [
  [
    {
      name: "Kejadian",
      shortName: "Kej",
      chapters: 50,
    },
    {
      name: "Keluaran",
      shortName: "Kel",
      chapters: 40,
    },
    {
      name: "Imamat",
      shortName: "Ima",
      chapters: 27,
    },
    {
      name: "Bilangan",
      shortName: "Bil",
      chapters: 36,
    },
    {
      name: "Ulangan",
      shortName: "Ula",
      chapters: 34,
    },
    {
      name: "Yosua",
      shortName: "Yos",
      chapters: 24,
    },
    {
      name: "Hakim-Hakim",
      shortName: "Hak",
      chapters: 21,
    },
    {
      name: "Rut",
      shortName: "Rut",
      chapters: 4,
    },
    {
      name: "1 Samuel",
      shortName: "1Sa",
      chapters: 31,
    },
    {
      name: "2 Samuel",
      shortName: "2Sa",
      chapters: 24,
    },
    {
      name: "1 Raja-raja",
      shortName: "1Ra",
      chapters: 22,
    },
    {
      name: "2 Raja-raja",
      shortName: "2Ra",
      chapters: 25,
    },
    {
      name: "1 Tawarikh",
      shortName: "1Ta",
      chapters: 29,
    },
    {
      name: "2 Tawarikh",
      shortName: "2Ta",
      chapters: 36,
    },
    {
      name: "Ezra",
      shortName: "Ezr",
      chapters: 10,
    },
    {
      name: "Nehemia",
      shortName: "Neh",
      chapters: 13,
    },
    {
      name: "Ester",
      shortName: "Est",
      chapters: 10,
    },
    {
      name: "Ayub",
      shortName: "Ayb",
      chapters: 42,
    },
    {
      name: "Mazmur",
      shortName: "Mzm",
      chapters: 150,
    },
    {
      name: "Amsal",
      shortName: "Ams",
      chapters: 31,
    },
    {
      name: "Pengkhotbah",
      shortName: "Pkh",
      chapters: 12,
    },
    {
      name: "Kidung Agung",
      shortName: "Kid",
      chapters: 8,
    },
    {
      name: "Yesaya",
      shortName: "Yes",
      chapters: 66,
    },
    {
      name: "Yeremia",
      shortName: "Yer",
      chapters: 52,
    },
    {
      name: "Ratapan",
      shortName: "Rtp",
      chapters: 5,
    },
    {
      name: "Yehezkiel",
      shortName: "Yeh",
      chapters: 48,
    },
    {
      name: "Daniel",
      shortName: "Dan",
      chapters: 12,
    },
    {
      name: "Hosea",
      shortName: "Hos",
      chapters: 14,
    },
    {
      name: "Yoel",
      shortName: "Yol",
      chapters: 3,
    },
    {
      name: "Amos",
      shortName: "Ams",
      chapters: 9,
    },
    {
      name: "Obaja",
      shortName: "Oba",
      chapters: 1,
    },
    {
      name: "Yunus",
      shortName: "Yun",
      chapters: 4,
    },
    {
      name: "Mikha",
      shortName: "Mkh",
      chapters: 7,
    },
    {
      name: "Nahum",
      shortName: "Nah",
      chapters: 3,
    },
    {
      name: "Habakuk",
      shortName: "Hab",
      chapters: 3,
    },
    {
      name: "Zefanya",
      shortName: "Zef",
      chapters: 3,
    },
    {
      name: "Hagai",
      shortName: "Hag",
      chapters: 2,
    },
    {
      name: "Zakharia",
      shortName: "Zak",
      chapters: 14,
    },
    {
      name: "Maleakhi",
      shortName: "Mal",
      chapters: 4,
    },
  ],
  [
    {
      name: "Matius",
      shortName: "Mat",
      chapters: 28,
    },
    {
      name: "Markus",
      shortName: "Mar",
      chapters: 16,
    },
    {
      name: "Lukas",
      shortName: "Luk",
      chapters: 24,
    },
    {
      name: "Yohanes",
      shortName: "Yoh",
      chapters: 21,
    },
    {
      name: "Kisah Para Rasul",
      shortName: "Kis",
      chapters: 28,
    },
    {
      name: "Roma",
      shortName: "Rom",
      chapters: 16,
    },
    {
      name: "1 Korintus",
      shortName: "1Ko",
      chapters: 16,
    },
    {
      name: "2 Korintus",
      shortName: "2Ko",
      chapters: 13,
    },
    {
      name: "Galatia",
      shortName: "Gal",
      chapters: 6,
    },
    {
      name: "Efesus",
      shortName: "Efe",
      chapters: 6,
    },
    {
      name: "Filipi",
      shortName: "Fil",
      chapters: 4,
    },
    {
      name: "Kolose",
      shortName: "Kol",
      chapters: 4,
    },
    {
      name: "1 Tesalonika",
      shortName: "1Te",
      chapters: 5,
    },
    {
      name: "2 Tesalonika",
      shortName: "2Te",
      chapters: 3,
    },
    {
      name: "1 Timotius",
      shortName: "1Ti",
      chapters: 6,
    },
    {
      name: "2 Timotius",
      shortName: "2Ti",
      chapters: 4,
    },
    {
      name: "Titus",
      shortName: "Tit",
      chapters: 3,
    },
    {
      name: "Filemon",
      shortName: "Flm",
      chapters: 1,
    },
    {
      name: "Ibrani",
      shortName: "Ibr",
      chapters: 13
    },
    {
      name: "Yakobus",
      shortName: "Yak",
      chapters: 5
    },
    {
      name: "1 Petrus",
      shortName: "1Pet",
      chapters: 5
    },
    {
      name: "2 Petrus",
      shortName: "2Pet",
      chapters: 3
    },
    {
      name: "1 Yohanes",
      shortName: "1Yoh",
      chapters: 5
    },
    {
      name: "2 Yohanes",
      shortName: "2Yoh",
      chapters: 1
    },
    {
      name: "3 Yohanes",
      shortName: "3Yoh",
      chapters: 1
    },
    {
      name: "Yudas",
      shortName: "Yud",
      chapters: 1
    },
    {
      name: "Wahyu",
      shortName: "Why",
      chapters: 22
    }
  ],
];

export default books;

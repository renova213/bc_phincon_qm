// 1. Hitung Bilangan Ganjil
function hitungBilanganGanjil(n) {
  return Math.floor(n / 2);
}

console.log("=== 1. Hitung bilangan ganjil ===");
console.log(hitungBilanganGanjil(10));
console.log(hitungBilanganGanjil(20));
console.log(`
Ekspektasi hasil:
hitungBilanganGanjil(10) => 5
hitungBilanganGanjil(20) => 10
`);

// 2. Cek Tahun Kabisat
function cekTahunKabisat(tahun) {
  if (tahun % 4 === 0) {
    return true;
  } else {
    return false;
  }
}

console.log("=== 2. Cek tahun kabisat ===");
console.log(cekTahunKabisat(2020));
console.log(cekTahunKabisat(2021));
console.log(
  `Ekspektasi hasil:
cekTahunKabisat(2020) => true
cekTahunKabisat(2021) => false
`
);

// 3. Hitung Faktorial
function hitungFaktorial(n) {
  if (n === 0) {
    return 1;
  } else {
    return n * hitungFaktorial(n - 1);
  }
}
console.log("=== 3. Hitung Faktorial ===");
console.log(hitungFaktorial(5));
console.log(hitungFaktorial(0));
console.log(
  `Ekspektasi hasil:
hitungFaktorial(5) => 120
hitungFaktorial(0) => 1
`
);

// 4. Cari Bilangan Prima
function cariBilanganPrima(n) {
  const bilanganPrima = [];
  for (let i = 2; i <= n; i++) {
    if (bilanganPrima.every((prime) => i % prime !== 0)) {
      bilanganPrima.push(i);
    }
  }
  return bilanganPrima;
}

console.log("=== 4. Cari bilangan prima ===");
console.log(cariBilanganPrima(20));
console.log(`Ekspektasi hasil:
cariBilanganPrima(20) => [2, 3, 5, 7, 11, 13, 17, 19]
`);

// 5. Hitung Jumlah Digit
function hitungJumlahDigit(angka) {
  return [...String(angka)].reduce((total, digit) => total + Number(digit), 0);
}

console.log("=== 5. Hitung Jumlah Digit ===");
console.log(hitungJumlahDigit(12345));
console.log(hitungJumlahDigit(9876));
console.log(`Ekspektasi hasil:
hitungJumlahDigit(12345) => 15
hitungJumlahDigit(9876) => 30
`);

// 6. Cek Palindrom
function cekPalindrom(kata) {
  const reversedKata = kata.split("").reverse().join("");
  return kata === reversedKata;
}

console.log("=== 6. Cek Palindrom ===");
console.log(cekPalindrom("katak"));
console.log(cekPalindrom("malam"));
console.log(cekPalindrom("hello"));
console.log(`Ekspektasi hasil:
cekPalindrom("katak") => true
cekPalindrom("malam") => true
cekPalindrom("hello") => false
`);

// 7. Hitung Pangkat
function hitungPangkat(angka, pangkat) {
  return angka ** pangkat;
}

console.log("=== 7. Hitung Pangkat ===");
console.log(hitungPangkat(2, 3));
console.log(hitungPangkat(5, 2));
console.log(`Ekspektasi hasil:
hitungPangkat(2, 3) => 8
hitungPangkat(5, 2) => 25
`);

// 8. Cari Bilangan Fibonacci
function deretFibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  const deret = [0, 1];
  while (deret.length < n) {
    deret.push(deret.at(-1) + deret.at(-2));
  }
  return deret;
}

console.log("=== 8. Cari Bilangan Fibonacci ===");
console.log(deretFibonacci(8));
console.log(`Ekspektasi hasil:
deretFibonacci(8) => [0, 1, 1, 2, 3, 5, 8, 13]
`);

// 9. Hitung Jumlah Kata
function hitungJumlahKata(kalimat) {
  return kalimat.split(" ").length;
}
console.log("=== 9. Hitung Jumlah Kata ===");
console.log(hitungJumlahKata("Saya suka belajar JavaScript"));
console.log(`Ekspektasi hasil:
hitungJumlahKata("Saya suka belajar JavaScript") => 4
`);

// 10. Cari Bilangan Terbesar
function cariBilanganTerbesar(angka) {
  return Math.max(...angka);
}
console.log("=== 10. Cari Bilangan Terbesar ===");
console.log(cariBilanganTerbesar([3, 7, 2, 9, 1]));
console.log(`Ekspektasi hasil:
cariBilanganTerbesar([3, 7, 2, 9, 1]) => 9
`);

// 11. Hitung Rata-rata
function hitungRataRata(angka) {
  const total = angka.reduce((sum, num) => sum + num, 0);
  return total / angka.length;
}
console.log("=== 11. Hitung Rata-rata ===");
console.log(hitungRataRata([1, 2, 3, 4, 5]));
console.log(`Ekspektasi hasil:
hitungRataRata([1, 2, 3, 4, 5]) => 3
`);

// 12. Hitung Jumlah Vokal
function hitungJumlahVokal(kata) {
  const vokal = "aeiou";
  return [...kata].filter((huruf) => vokal.includes(huruf.toLowerCase()))
    .length;
}

console.log("=== 12. Hitung Jumlah Vokal ===");
console.log(hitungJumlahVokal("javascript"));
console.log(`Ekspektasi hasil:
hitungJumlahVokal("javascript") => 3
`);

// 13. Cari Faktor Bilangan
function cariFaktorBilangan(angka) {
  return Array.from({ length: angka }, (_, i) => i + 1).filter(
    (i) => angka % i === 0
  );
}

console.log("=== 13. Cari Faktor Bilangan ===");
console.log(cariFaktorBilangan(12));
console.log(`Ekspektasi hasil:
cariFaktorBilangan(12) => [1, 2, 3, 4, 6, 12]
`);

// 14. Konversi Suhu
function konversiSuhu(suhu, jenis) {
  return jenis === "C" ? suhu * 1.8 + 32 : (suhu - 32) / 1.8;
}

console.log("=== 14. Konversi Suhu ===");
console.log(konversiSuhu(30, "C"));
console.log(konversiSuhu(86, "F"));
console.log(`Ekspektasi hasil:
konversiSuhu(30, "C") => 86 (Fahrenheit)
konversiSuhu(86, "F") => 30 (Celsius)
`);

// 15. Hitung Jumlah Karakter Unik
function hitungKarakterUnik(kalimat) {
  const karakterUnik = new Set(kalimat);
  return karakterUnik.size;
}
console.log("=== 15. Hitung Jumlah Karakter Unik ===");
console.log(hitungKarakterUnik("hello world"));
console.log(`Ekspektasi hasil:
hitungKarakterUnik("hello world") => 8
`);

// 16. Hitung Jumlah Kemunculan Kata
function hitungKemunculanKata(kalimat, kata) {
  const kataKata = kalimat.toLowerCase().split(" ");
  const kemunculan = {};
  kataKata.forEach((kata) => {
    kemunculan[kata] = kemunculan[kata] ? kemunculan[kata] + 1 : 1;
  });
  return kemunculan[kata.toLowerCase()];
}

console.log("=== 16. Hitung Jumlah Kemunculan Kata ===");
console.log(
  hitungKemunculanKata("Saya suka makan nasi, saya juga suka minum air", "suka")
);
console.log(`Ekspektasi hasil:
hitungKemunculanKata("Saya suka makan nasi, saya juga suka minum air", "suka") => 2
  `);

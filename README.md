# DailyBoard

DailyBoard adalah aplikasi sederhana untuk membantu mengatur tugas dan catatan harian.

## Fitur

- Menambahkan tugas
- Menghapus tugas
- Mengedit tugas
- Menandai tugas sebagai selesai
- Membatalkan status selesai
- Filter tugas berdasarkan status
- Pencarian tugas
- Debounce pada pencarian
- Drag and drop untuk mengatur urutan tugas
- Menambahkan catatan cepat
- Mengedit catatan
- Menghapus catatan
- Penyimpanan data menggunakan LocalStorage
- Menampilkan tanggal dan waktu secara real-time
- Kutipan harian menggunakan API
- Informasi cuaca menggunakan API
- Dark mode
- Tampilan responsif untuk berbagai ukuran layar

## Cara Menggunakan

### Tugas

1. Masukkan nama tugas pada kolom input.
2. Klik tombol Tambah.
3. Klik Selesai untuk menandai tugas sebagai selesai.
4. Klik Batal untuk mengembalikan tugas menjadi belum selesai.
5. Klik Hapus untuk menghapus tugas.
6. Double-click pada tugas untuk mengeditnya.
7. Gunakan tombol Semua, Selesai, atau Belum Selesai untuk memfilter tugas.
8. Gunakan kolom pencarian untuk mencari tugas tertentu.
9. Tugas dapat dipindahkan menggunakan fitur drag and drop.

### Catatan

1. Tulis catatan pada kolom Catatan Cepat.
2. Klik Tambah Catatan.
3. Double-click catatan untuk mengeditnya.
4. Klik Hapus untuk menghapus catatan.

### Cuaca

1. Masukkan nama kota pada kolom cuaca.
2. Klik Cari Cuaca.
3. Aplikasi akan menampilkan informasi cuaca kota tersebut.
4. Saat pertama kali dibuka, aplikasi menampilkan cuaca Jakarta secara otomatis.

### Kutipan

Kutipan harian akan dimuat secara otomatis ketika aplikasi dibuka.

### Dark Mode

Klik tombol Ganti Tema untuk mengubah tampilan antara tema terang dan gelap.

## Struktur File

DailyBoard/
├── index.html
├── style.css
├── script.js
├── tugas.js
├── catatan.js
├── storage.js
├── api.js
└── README.md
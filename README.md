# 📚 Sistem Informasi Management

## 📌 Deskripsi

**Sistem Informasi Management** adalah aplikasi berbasis web yang dirancang untuk membantu mahasiswa dalam mengelola kegiatan akademik sehari-hari. Aplikasi ini memungkinkan pengguna untuk mencatat jadwal kuliah, mengelola agenda pribadi, memantau kehadiran, serta menerima pengingat otomatis sebelum kelas dimulai. Data disimpan secara lokal (localStorage) per pengguna, sehingga setiap akun memiliki data yang terpisah.

## 🚀 Fitur Utama

- 🔐 **Autentikasi Pengguna** — Login dan registrasi akun mahasiswa menggunakan NIM dan password
- 🏠 **Dashboard Interaktif** — Tampilan ringkasan jadwal hari ini, agenda aktif, dan pengingat kelas mendatang dengan jam hidup (*live clock*)
- 📅 **Manajemen Jadwal** — Tambah, edit, dan hapus jadwal kuliah lengkap dengan jam mulai dan jam selesai; mendukung tampilan grid mingguan dan kalender
- 📝 **Agenda Pribadi** — CRUD lengkap untuk agenda: tambah, edit, hapus, dan tandai selesai
- ✅ **Rekap Kehadiran** — Pencatatan kehadiran per pertemuan dan ringkasan statistik mingguan
- 🔔 **Notifikasi Pengingat** — Notifikasi lokal otomatis 30 menit sebelum kelas dimulai (dapat diaktifkan/nonaktifkan)
- 📱 **Responsif & PWA** — Desain mobile-first dengan navbar floating dan dukungan *service worker*

## 🛠️ Teknologi yang Digunakan

| Teknologi | Keterangan |
|-----------|------------|
| HTML5 | Struktur halaman web |
| CSS3 | Styling, tema gelap, animasi, dan desain responsif |
| JavaScript (Vanilla) | Logika aplikasi dan manipulasi DOM |
| localStorage | Penyimpanan data per pengguna di sisi klien |
| Boxicons | Ikon antarmuka |
| Service Worker | Dukungan PWA dan notifikasi lokal |

## 📅 Progress Mingguan

### Week 1
- Inisialisasi proyek dan struktur folder awal
- Pembuatan halaman login dan registrasi
- Implementasi autentikasi berbasis localStorage

### Week 2
- Pembuatan halaman dashboard dengan ringkasan data
- Implementasi manajemen jadwal kuliah (CRUD)
- Penambahan jam hidup (*live clock*) pada dashboard

### Week 3
- Implementasi fitur agenda pribadi (CRUD lengkap)
- Pembuatan halaman rekap kehadiran
- Penyeragaman tema visual dan desain responsif

### Week 4
- Penambahan notifikasi pengingat 30 menit sebelum kelas
- Integrasi *service worker* untuk dukungan PWA
- Sinkronisasi data antar-tab menggunakan `storage` event listener

### Week 5
- Refactor struktur folder: aset dipindahkan ke `assets/css/` dan `assets/js/`, halaman ke `pages/`
- Perbaikan bug: routing, navbar, dan konsistensi penyimpanan data per pengguna
- Penambahan tampilan kalender sederhana pada halaman jadwal

### Week 6
- Perubahan default tema dari dark mode ke light mode
- Perbaikan tombol dark mode agar berfungsi sebagaimana mestinya (toggle antara light dan dark)
- Penambahan rencana presentasi (Input, Proses, Output) di README.md
- Penambahan changelog perubahan di changelog.md

### Week 7
- [ ] *(Akan diisi)*

### Week 8
- [ ] *(Akan diisi)*

## ⚠️ Kendala

- Notifikasi hanya berfungsi selama browser/webview aktif; belum mendukung notifikasi background penuh
- Fitur "Lupa Password" masih berupa demo sisi klien — tidak aman untuk lingkungan produksi
- Tab kalender pada halaman jadwal belum mendukung navigasi bulan (prev/next)
- Penyimpanan berbasis localStorage membatasi kapasitas data dan keamanan informasi

## 🔮 Rencana Presentasi Minggu Depan

### 📥 Input
- **Data Pengguna**: NIM dan password yang dimasukkan melalui form login/registrasi
- **Data Jadwal Kuliah**: Mata kuliah, tanggal, jam mulai, jam selesai yang diisi di halaman Jadwal
- **Data Agenda**: Judul tugas/kegiatan yang dimasukkan pengguna di halaman Agenda
- **Data Kehadiran**: Status hadir/tidak hadir yang direkam di halaman Rekap
- **Preferensi Pengguna**: Pilihan bahasa (ID/EN), tema warna, dan status notifikasi di halaman Pengaturan

### ⚙️ Proses
- **Autentikasi**: Validasi NIM & password menggunakan data yang tersimpan di localStorage, pembuatan sesi pengguna
- **Manajemen Jadwal**: CRUD jadwal kuliah dengan validasi jam (jamMulai < jamSelesai), deteksi konflik tumpang tindih, dan rendering grid mingguan
- **Manajemen Agenda**: CRUD agenda per pengguna, penandaan selesai/belum, dan filter tampilan
- **Rekap Kehadiran**: Perhitungan statistik kehadiran (total kelas, hadir, absen) dan rendering grafik Chart.js
- **Notifikasi**: Penjadwalan pengingat otomatis 30 menit sebelum kelas menggunakan setTimeout dan service worker
- **Tema & Bahasa**: Penerapan CSS class dark-mode / tema warna ke elemen HTML, penggantian teks berdasarkan kamus terjemahan

### 📤 Output
- **Tampilan Dashboard**: Ringkasan jadwal hari ini, agenda aktif, dan reminder mendatang dengan jam hidup (*live clock*)
- **Grid Jadwal Mingguan**: Visualisasi jadwal kuliah per hari dengan indikator warna dan peringatan konflik
- **Kalender Interaktif**: Tampilan kalender bulanan dengan navigasi prev/next dan highlight kelas per tanggal
- **Daftar Agenda**: List tugas/kegiatan dengan status selesai, tombol edit/hapus
- **Grafik Rekap**: Grafik batang jadwal mingguan, grafik donat status agenda, grafik frekuensi kelas
- **Notifikasi Browser**: Alert pengingat otomatis 30 menit sebelum kelas dimulai
- **Antarmuka Multibahasa**: Semua teks UI berganti antara Bahasa Indonesia dan Bahasa Inggris secara real-time

## 👨‍💻 Tim Pengembang

| Nama | NIM | Peran |
|------|-----|-------|
| Ananda Anugrah Handyanto | *(NIM)* | Ketua / Full-stack Developer |
| *(Nama Anggota 2)* | *(NIM)* | *(Peran)* |
| *(Nama Anggota 3)* | *(NIM)* | *(Peran)* |

---

> 📌 *Proyek ini dibuat sebagai bagian dari mata kuliah Pemrograman Berbasis Platform / Mobile — Semester Genap 2025/2026.*

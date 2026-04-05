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
- [ ] *(Akan diisi)*

### Week 7
- [ ] *(Akan diisi)*

### Week 8
- [ ] *(Akan diisi)*

## ⚠️ Kendala

- Notifikasi hanya berfungsi selama browser/webview aktif; belum mendukung notifikasi background penuh
- Fitur "Lupa Password" masih berupa demo sisi klien — tidak aman untuk lingkungan produksi
- Tab kalender pada halaman jadwal belum mendukung navigasi bulan (prev/next)
- Penyimpanan berbasis localStorage membatasi kapasitas data dan keamanan informasi

## 🔮 Rencana Minggu Depan

- Melengkapi kalender dengan navigasi bulan (prev/next) dan kemampuan menambah event dari kalender
- Menambahkan fitur pencarian jadwal dan agenda
- Memperbaiki alur "Lupa Password" agar lebih aman
- QA sweep: memastikan konsistensi kunci penyimpanan data di semua halaman

## 👨‍💻 Tim Pengembang

| Nama | NIM | Peran |
|------|-----|-------|
| Ananda Anugrah Handyanto | *(NIM)* | Ketua / Full-stack Developer |
| *(Nama Anggota 2)* | *(NIM)* | *(Peran)* |
| *(Nama Anggota 3)* | *(NIM)* | *(Peran)* |

---

> 📌 *Proyek ini dibuat sebagai bagian dari mata kuliah Pemrograman Berbasis Platform / Mobile — Semester Genap 2025/2026.*

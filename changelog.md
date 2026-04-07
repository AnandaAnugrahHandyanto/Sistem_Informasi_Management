# Changelog

## Light Mode Default & Dark Mode Fix (2026-04-07)

### ✨ Fitur Baru / Perbaikan
- 🌞 **Light Mode sebagai Default**: Ubah tampilan default aplikasi dari dark mode ke light mode. Semua halaman kini tampil dengan latar belakang terang (`#eef2ff`/`#e8f0fe`), kartu putih bersih, dan teks gelap yang mudah dibaca.
- 🌙 **Dark Mode Berfungsi Sesuai Harapan**: Tombol dark mode di halaman Pengaturan kini benar-benar mengubah tampilan menjadi gelap (`#0f172a`/`#0b1220`) saat diaktifkan, dan kembali terang saat dinonaktifkan.
- 🔧 **Perbaikan Bug Dark Mode**: Sebelumnya, menekan tombol dark mode membuat tampilan semakin gelap (karena `:root` sudah gelap, dan `html.dark-mode` menambahkan warna yang lebih gelap lagi). Sekarang logika ini diperbaiki sepenuhnya.

### 📁 File yang Dimodifikasi
- `assets/css/variables.css` — `:root` diubah ke light mode, `html.dark-mode` diisi dengan nilai dark mode yang benar
- `assets/css/style.css` — Body background dan card menggunakan CSS variables
- `assets/css/dashboard.css` — Light mode default untuk semua elemen
- `assets/css/settings.css` — Light mode default, toggle slider dan select disesuaikan
- `assets/css/jadwal.css` — Light mode default, modal, slot, dan tab disesuaikan
- `assets/css/agenda.css` — Light mode default untuk semua elemen
- `assets/css/rekap.css` — Light mode default untuk semua elemen
- `assets/css/register.css` — Light mode default untuk semua elemen
- `README.md` — Ditambahkan rencana presentasi minggu depan (Input, Proses, Output)
- `changelog.md` — File ini diperbarui

### 🎨 Perubahan Warna CSS Variables
| Variable | Light Mode (baru) | Dark Mode (html.dark-mode) |
|----------|-------------------|---------------------------|
| `--bg-from` | `#eef2ff` | `#0f172a` |
| `--bg-to` | `#e8f0fe` | `#0b1220` |
| `--bg-card` | `#ffffff` | `rgba(255,255,255,0.02)` |
| `--bg-input` | `rgba(241,245,255,0.9)` | `rgba(30,41,59,0.6)` |
| `--bg-navbar` | `rgba(255,255,255,0.95)` | `rgba(8,16,28,0.9)` |
| `--text-heading` | `#1e293b` | `#e6eefc` |
| `--text-body` | `#334155` | `#dbefff` |
| `--text-muted` | `#64748b` | `#9fb0d8` |

## UI/UX & Peningkatan Visual (2026-04-06)

### ✨ Fitur Baru
- 🎨 **Sistem Tema Warna Kustom**: Menambahkan 4 tema warna (Biru, Ungu, Hijau, Oranye) dengan CSS variables. Pemilih tema di halaman Pengaturan dengan penyimpanan persisten.
- 📊 **Grafik Interaktif di Halaman Rekap**: 
  - Grafik Batang Jadwal Mingguan (kelas per hari dalam seminggu)
  - Grafik Donat Status Agenda (tugas selesai vs tertunda)
  - Grafik Batang Frekuensi Kelas (5 kelas paling sering)
  - Grafik dibuat dengan Chart.js, responsif, dan multibahasa
- 🎬 **Animasi Halus**: Menambahkan CSS3 keyframe animations:
  - `slideInUp` (kartu jadwal) - transisi masuk 300ms yang halus
  - `shimmer` (loading skeletons) - efek berkilau 2 detik berulang
  - `float` (ikon empty state) - gerakan mengapung lembut 3 detik
  - `checkPulse` (indikator checkbox) - efek pulse 400ms
- 📦 **UI Empty State**: Mengganti teks biasa dengan empty state bergaya yang menampilkan:
  - Ikon animasi (📚 untuk jadwal, ✓ untuk agenda, 🔔 untuk reminder)
  - Pesan deskriptif dengan terjemahan yang tepat
  - Animasi floating yang halus
  - Diterapkan ke ketiga bagian dashboard

### 🐛 Perbaikan Bug
- ✅ **Memperbaiki 11 Masalah Utama**: Terjemahan bulan/hari dalam kalender, pemetaan hari dashboard, nav pengaturan tidak highlight, tanggal hari ini tidak highlight, dark mode tidak persisten, notifikasi reminder, deteksi tumpang tindih jadwal, ukuran checkbox, visibilitas tombol edit/hapus
- ✅ **Bug Kritis: Jadwal Berulang** - Memperbaiki jadwal yang muncul setiap hari/minggu:
  - Mengubah struktur data dari `{hari: 1-5}` (hari dalam minggu, berulang) ke `{tanggal: "YYYY-MM-DD"}` (tanggal spesifik)
  - Menambahkan fungsi migrasi otomatis untuk mengkonversi jadwal lama saat halaman dimuat
  - Mencegah masalah duplikat "Jumat setiap minggu"
- ✅ **Visibilitas Teks Empty State**: Mengubah warna dari gelap (#7080aa) ke terang (#e0e7ff) untuk keterbacaan lebih baik di dark mode
- ✅ **Pergantian Bahasa untuk Empty States**: Menerapkan translation keys yang tepat (`noScheduleToday`, `enjoyFreeDay`, `allTasksDone`) sehingga pesan diperbarui saat mengganti bahasa
- ✅ **Gaya Indikator Konflik**: Menambahkan perbatasan merah + badge peringatan ⚠️ untuk jadwal yang tumpang tindih
- ✅ **Checkbox Halus**: Diperbarui menjadi 16px dengan efek glow halus saat hover, cocok di grid layout

### 🎯 Peningkatan
- 🌈 **Penerapan Tema**: Tema diterapkan secara global di semua halaman saat startup melalui `applyTheme()` yang diperbarui di `common.js`
- 📝 **Translation Keys Ditambahkan**: `theme`, `themeDesc`, `agendaStatus`, `classFrequency`, `completed`, `pending`, `frequency` (bilingual: id/en)
- 🎨 **Gaya Checkbox**: Kelancaran visual dengan animasi checkPulse 400ms dan efek glow biru saat hover
- 🖱️ **Kejelasan Tombol**: Tombol Edit (ikon hitam ✎) dan Tombol Hapus (ikon merah 🗑️) untuk pengenalan visual instan
- 📅 **Badge Tanggal Hari Ini**: Highlight biru menonjol (#3b82f6) pada tanggal saat ini dalam kalender
- 🔄 **Transisi Halaman**: Animasi fade halus saat menavigasi antar halaman

### 📁 File yang Dimodifikasi
- `pages/settings.html` - Menambahkan dropdown pemilih warna tema di bagian Tampilan
- `pages/rekap.html` - Menambahkan 3 elemen canvas Chart.js untuk grafik
- `assets/js/settings.js` - Menambahkan fungsi `applyTheme()`, `loadCustomTheme()`, `changeTheme()`
- `assets/js/common.js` - Meningkatkan `applyTheme()` untuk menerapkan dark mode dan warna tema kustom
- `assets/js/dashboard.js` - Mengonversi teks empty menjadi div `.empty-state` bergaya dengan translation keys yang tepat
- `assets/js/jadwal.js` - Menambahkan logika deteksi konflik ke fungsi `renderGrid()`
- `assets/js/language.js` - Menambahkan 10+ translation keys baru untuk tema, grafik, dan empty states
- `assets/css/jadwal.css` - Menambahkan 200+ baris animasi, theme variables, dan peningkatan visual
- `assets/css/rekap.css` - Menambahkan gaya container grafik
- `assets/js/rekap.js` - **FILE BARU** dengan inisialisasi Chart.js dan rendering data

### 🌍 Dukungan Multibahasa
- Semua label grafik dan pesan empty state sekarang mendukungan Indonesian (id) dan English (en) dengan baik
- Pergantian bahasa memperbarui semua konten dinamis termasuk grafik
- Translation keys terorganisir dengan baik di `language.js`

### 📊 Peningkatan Visual
- 🎨 Sistem CSS variable untuk dukungan tema (--primary-color, --primary-light, --primary-dark)
- 🔵 Skema warna konsisten dengan kesadaran tema di semua komponen
- ✨ Hierarki visual yang ditingkatkan dengan animasi dan micro-interactions
- 📱 Animasi responsif untuk tampilan mobile dan desktop

## Fitur Baru

## Fitur Baru

- Redesain visual dashboard dengan tema gelap, kartu glass, dan animasi micro-interaction.
- Statistik cepat di dashboard: jumlah jadwal hari ini, agenda, dan reminder.
- Jam hidup (live clock) di dashboard.
- Sistem penyimpanan per-user: `jadwalUser`, `agendaUser`, `attendanceUser` (localStorage keyed by `user.nama`).
- Agenda per-user: CRUD lengkap (tambah, edit, hapus, tandai selesai).
- Rekap (halaman `rekap.html`): ringkasan kehadiran dan statistik mingguan.
- Floating bottom navbar responsif dengan ukuran tombol tetap dan efek show/hide saat scroll.
- Jadwal: dukungan `jamMulai` dan `jamSelesai` untuk setiap mata kuliah.
- Kalender sederhana di halaman `jadwal` (tab Kalender) menampilkan kelas per tanggal.
- Fitur attendance: pencatatan kehadiran per pertemuan, progress di rekap.

## Perubahan / Penyempurnaan

- Seragamkan tema dan responsive design ke halaman: `dashboard`, `jadwal`, `agenda`, `register`, `rekap`.
- Perbaikan routing/redirect: semua link ke halaman login diarahkan ke `index.html` (sebelumnya `rgl.html`).
- Navbar: tambahkan `z-index` dan `pointer-events` untuk mengatasi masalah klik tidak responsif.
- Konsolidasi penyimpanan: pindah dari kunci global lama (`jadwal`) ke `jadwalUser` per-user.
- Modal input jadwal: ubah input jam menjadi `jamMulai` dan `jamSelesai`.
- Input waktu sekarang mendukung entry manual 24-jam (HH:MM) dan divalidasi saat simpan.
- AM/PM sekarang otomatis dinormalisasi ke format 24-jam saat disimpan (mis. "1:30 PM" -> "13:30").
- Agenda: perbaikan rendering di dashboard (sebelumnya menampilkan "[object Object]"); dashboard sekarang membaca `agendaUser[user.nama]` dan menampilkan teks dan status.
- Desain halaman `agenda` diperbarui: input lebih modern, list item hover effect, responsive font sizes.
- Dashboard: gabungkan reminder tersimpan dan reminder pintar (kelas yang akan datang dalam 30 menit).

## Perbaikan Bug

- Memperbaiki 404 saat register -> login (ganti `rgl.html` → `index.html`).
- Memperbaiki masalah navbar tidak bisa diklik akibat layering CSS (ditambah `z-index`/`pointer-events`).
- Memperbaiki penyimpanan jadwal agar tersimpan per-user dan tidak saling tertimpa.
- Menambahkan tombol edit/hapus pada item jadwal dan perbaikan posisi grid item sesuai `jamMulai`.
- Menambahkan validasi sederhana pada form jadwal (mata kuliah wajib diisi).

## Known Issues / Catatan

~~Tab Kalender di halaman `jadwal` saat ini menampilkan view bulan sederhana tanpa navigasi prev/next.~~ **FIXED** (2026-04-06)
~~Dashboard belum sepenuhnya auto-refresh antar-tab; direkomendasikan menambahkan `storage` event listener agar perubahan di halaman lain langsung terlihat.~~ **FIXED** (2026-04-06)
~~Fitur "Lupa Password" saat ini berupa demo client-side (menampilkan password dari localStorage) — ini tidak aman untuk lingkungan produksi.~~ **FIXED** (2026-04-06)
~~Masih mungkin ada sisa referensi ke kunci lama (`jadwal`) di beberapa file; disarankan sweep konsistensi storage.~~ **VERIFIED FIXED** (2026-04-06)

## Fixes (2026-04-06)

- ✅ **Calendar Navigation**: Kalender di halaman `jadwal` sekarang memiliki tombol "Bulan Sebelumnya" dan "Bulan Berikutnya" untuk navigasi antar bulan. Menampilkan bulan dan tahun saat ini di atas kalender.
- ✅ **Dashboard Auto-Refresh**: Implementasi `window.addEventListener('storage', ...)` di `dashboard.js` untuk auto-refresh jadwal, agenda, dan reminder saat ada perubahan di tab lain. Data di-sync secara real-time antar tab.
- ✅ **Forgot Password Security**: Ganti "Lupa Password" dari fitur demo yang menampilkan password dengan modal dialog yang aman. Modal sekarang hanya memverifikasi keberadaan akun dan mengarahkan user untuk menghubungi admin, tanpa menampilkan password di alert.
- ✅ **Storage Key Cleanup**: Verifikasi bahwa semua referensi ke kunci storage lama (`jadwal`) sudah dipindahkan ke `jadwalUser` per-user. Tidak ada referensi lama yang ditemukan di codebase.

## Langkah Selanjutnya (Prioritas)

1. (Opsional) Tambahkan server-side password reset dengan email verification untuk keamanan lebih.
2. (Opsional) Implementasi notifikasi browser untuk reminder jadwal dan agenda.
3. (Opsional) Tambahkan fitur export/import data untuk backup user data.
4. QA testing: Verifikasi semua fitur berfungsi dengan baik di berbagai browser dan perangkat.

---

## Latest Changes

- Notifications: ditambahkan toggle `Aktifkan Notifikasi Pengingat` di dashboard, service worker `sw.js`, dan logika penjadwalan notifikasi lokal 30 menit sebelum `jamMulai`. Pengaturan notifikasi disimpan per-user (`notif_<user.nama>`).
- Agenda: perbaikan render di dashboard (sebelumnya menampilkan "[object Object]") dan desain ulang halaman `agenda` (input lebih modern, hover effect, responsive).
- Jadwal: perbaikan render agar item ditempatkan di dalam slot (tidak saling menimpa) dengan `.class-item` agar banyak kelas di slot yang sama terlihat dan dapat diedit/dihapus.
- Waktu: input `jamMulai`/`jamSelesai` sekarang menggunakan `input type="time"`, mendukung format 24-jam, AM/PM otomatis dinormalisasi, dan validasi `jamSelesai > jamMulai`.
- Auth: fitur login sekarang dapat otomatis membuat akun lokal jika belum ada user disimpan (konfirmasi pengguna), sehingga tidak perlu registrasi manual pada akses pertama.
- Dashboard: perbaikan rendering `greeting` (hindari menampilkan object), penambahan `refreshData()` dan listener `storage` untuk sinkronisasi antar-tab, perbaikan redirect logout ke `index.html`.
- Bug fixes: syntax errors di `dashboard.js` diperbaiki, navbar clickability diperkuat, penggantian redirect `rgl.html` → `index.html` selesai.

## Refactor: Struktur & Clean-up (2026-04-02)

- Memindahkan aset ke struktur folder yang lebih terorganisir:
  - CSS -> `assets/css/`
  - JS -> `assets/js/`
  - Halaman non-root -> `pages/` (mis. `pages/dashboard.html`, `pages/jadwal.html`, `pages/register.html`, `pages/rekap.html`, dst.)
- Memperbarui semua path `href`/`src` agar menunjuk ke lokasi baru tanpa mengubah perilaku fitur.
- Konsolidasi fungsi bersama: `togglePassword()` dipindahkan ke `assets/js/common.js`.
- Menghapus file duplikat di root, menjaga satu sumber kebenaran di `/assets` dan `/pages`.
- Menjaga kompatibilitas: redirect dan navigasi diperbarui (mis. login -> `pages/dashboard.html`, cek login mengarah ke `../index.html` dari halaman di `pages/`).
- Perbaikan kecil clean-code: menghilangkan fungsi ganda, menyederhanakan beberapa helper, dan merapikan includes script.
- Tidak menambahkan fitur baru; hanya refactor, perbaikan responsive ringan, dan perapihan kode.

Catatan: Silakan jalankan QA manual untuk memastikan semua rute menyala pada environment lokal (buka `index.html` di browser). Jika ingin, saya dapat membuat commit git dari perubahan ini sekarang.

## Catatan Teknis & Batasan

- Notifikasi saat ini dijadwalkan lokal (setTimeout) dan akan bekerja selama webview/browser aktif. Untuk notifikasi yang andal di background pada Android (setelah aplikasi dimatikan), integrasi push (FCM) atau native scheduled notifications melalui median.co wrapper diperlukan.

---

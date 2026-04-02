# Changelog

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
- Modal input jadwal: ubah input jam menjadi `jamMulai` dan `jamSelesai`.
- Input waktu sekarang mendukung entry manual 24-jam (HH:MM) dan divalidasi saat simpan.
- Input waktu sekarang mendukung entry manual 24-jam (HH:MM) dan divalidasi saat simpan.
- AM/PM sekarang otomatis dinormalisasi ke format 24-jam saat disimpan (mis. "1:30 PM" -> "13:30").
- Login: jika belum ada akun tersimpan, aplikasi kini menanyakan dan dapat otomatis membuat akun lokal dari NIM/password yang dimasukkan (memudahkan akses tanpa registrasi terpisah).
- Input waktu sekarang mendukung entry manual 24-jam (HH:MM) dan divalidasi saat simpan.
- AM/PM sekarang otomatis dinormalisasi ke format 24-jam saat disimpan (mis. "1:30 PM" -> "13:30").
- Agenda: perbaikan rendering di dashboard (sebelumnya menampilkan "[object Object]"); dashboard sekarang membaca `agendaUser[user.nama]` dan menampilkan teks dan status.
- Desain halaman `agenda` diperbarui: input lebih modern, list item hover effect, responsive font sizes.
- Login: jika belum ada akun tersimpan, aplikasi kini menanyakan dan dapat otomatis membuat akun lokal dari NIM/password yang dimasukkan (memudahkan akses tanpa registrasi terpisah).
- Dashboard: gabungkan reminder tersimpan dan reminder pintar (kelas yang akan datang dalam 30 menit).

## Perbaikan Bug

- Memperbaiki 404 saat register -> login (ganti `rgl.html` → `index.html`).
- Memperbaiki masalah navbar tidak bisa diklik akibat layering CSS (ditambah `z-index`/`pointer-events`).
- Memperbaiki penyimpanan jadwal agar tersimpan per-user dan tidak saling tertimpa.
- Menambahkan tombol edit/hapus pada item jadwal dan perbaikan posisi grid item sesuai `jamMulai`.
- Menambahkan validasi sederhana pada form jadwal (mata kuliah wajib diisi).

## Known Issues / Catatan

- Tab Kalender di halaman `jadwal` saat ini menampilkan view bulan sederhana tanpa navigasi prev/next.
- Dashboard belum sepenuhnya auto-refresh antar-tab; direkomendasikan menambahkan `storage` event listener agar perubahan di halaman lain langsung terlihat.
- Fitur "Lupa Password" saat ini berupa demo client-side (menampilkan password dari localStorage) — ini tidak aman untuk lingkungan produksi.
- Masih mungkin ada sisa referensi ke kunci lama (`jadwal`) di beberapa file; disarankan sweep konsistensi storage.

## Langkah Selanjutnya (Prioritas)

1. Tambahkan `window.addEventListener('storage', ...)` pada `dashboard.js` untuk auto-refresh data (jadwal/agenda/reminder) ketika terjadi perubahan di tab lain.
2. Lengkapi kalender dengan navigasi bulan (prev/next) dan kemampuan menambah event langsung dari tanggal.
3. Ganti demo "Lupa Password" dengan alur reset aman (server-side) jika aplikasi akan dipakai nyata.
4. QA sweep: cari referensi kunci penyimpanan lama (`jadwal`, `reminder`) dan samakan ke model per-user.

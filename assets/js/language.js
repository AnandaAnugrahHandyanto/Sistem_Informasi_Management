// Multi-language system
const translations = {
  id: {
    // Login page
    welcome: "Selamat Datang!",
    loginSubtitle: "Silakan login untuk melanjutkan.",
    nim: "NIM",
    password: "Password",
    forgotPassword: "Lupa Password?",
    login: "Login",
    noAccount: "Belum punya akun?",
    register: "Daftar",
    
    // Register page
    registerSubtitle: "Silakan isi form untuk mendaftar.",
    passwordNote: "Minimal 8 karakter",
    haveAccount: "Sudah punya akun?",
    email: "Email",
    name: "Nama Lengkap",
    invalidEmail: "Format email tidak valid!",
    nimAlreadyExists: "NIM sudah terbukti! Gunakan NIM lain.",
    
    // Dashboard
    greeting: "Halo",
    scheduleToday: "Jadwal hari ini",
    agenda: "Agenda",
    reminder: "Reminder",
    todaySchedule: "Jadwal Hari Ini",
    dashboard: "Dashboard",
    schedule: "Jadwal",
    recap: "Rekap",
    noSchedule: "Tidak ada jadwal",
    noScheduleToday: "Tidak ada jadwal hari ini",
    enjoyFreeDay: "Nikmati hari bebas kelas Anda!",
    noAgenda: "Tidak ada agenda",
    allTasksDone: "Semua tugas sudah selesai! 🎉",
    noReminder: "Tidak ada reminder",
    
    // Agenda page
    agendaTitle: "Agenda",
    agendaSubtitle: "Kelola tugas harian lu",
    addAgenda: "Tambah agenda...",
    agendaAdded: "Agenda ditambahkan",
    
    // Schedule page
    scheduleTitle: "Jadwal Kuliah",
    backDashboard: "Kembali ke Dashboard",
    thisWeek: "Minggu Ini",
    calendar: "Kalender",
    addSchedule: "Tambah Jadwal",
    addScheduleBtn: "+ Tambah Jadwal",
    subject: "Masukkan mata kuliah...",
    day: "Hari",
    date: "Tanggal",
    startTime: "Jam Mulai",
    endTime: "Jam Selesai",
    color: "Warna",
    blue: "Biru",
    green: "Hijau",
    orange: "Orange",
    red: "Merah",
    save: "Simpan",
    cancel: "Batal",
    deleteConfirm: "Hapus jadwal ini?",
    scheduleDeleted: "Jadwal dihapus",
    monday: "Senin",
    tuesday: "Selasa",
    wednesday: "Rabu",
    thursday: "Kamis",
    friday: "Jumat",
    reminder: "Reminder",
    reminderSaved: "Pengaturan reminder disimpan",
    
    // Recap page
    recapTitle: "Rekap",
    recapSubtitle: "Ringkasan aktivitas dan statistik",
    totalSchedule: "Total Jadwal",
    totalAgenda: "Total Agenda",
    totalReminder: "Total Reminder",
    weeklyChart: "Grafik Mingguan",
    agendaStatus: "Status Agenda",
    classFrequency: "Frekuensi Kelas",
    completed: "Selesai",
    pending: "Tertunda",
    frequency: "Frekuensi",
    
    // Settings page
    settings: "Pengaturan",
    settingsSubtitle: "Kelola preferensi aplikasi Anda",
    account: "Akun",
    appearance: "Tampilan",
    darkMode: "Mode Gelap",
    darkModeDesc: "Gunakan tema gelap untuk pengalaman visual yang lebih nyaman",
    theme: "Tema Warna",
    themeDesc: "Pilih tema warna untuk aplikasi Anda",
    language: "Bahasa",
    languageDesc: "Pilih bahasa tamilan aplikasi",
    notifications: "Notifikasi",
    notificationDesc: "Kelola pengaturan notifikasi",
    scheduleNotif: "Notifikasi Jadwal",
    agendaNotif: "Notifikasi Agenda",
    data: "Data",
    dataDesc: "Kelola data aplikasi Anda",
    clearData: "Hapus Semua Data",
    clearDataDesc: "Hapus seluruh data yang tersimpan di aplikasi",
    confirmClearData: "Apakah Anda yakin ingin menghapus semua data? Tindakan ini tidak dapat dibatalkan.",
    dataCleared: "Data berhasil dihapus",
    about: "Tentang",
    aboutDesc: "Informasi tentang aplikasi",
    appVersion: "Versi: 1.0.0",
    confirmLogout: "Apakah Anda ingin keluar?",
    studentId: "NIM",
    name: "Nama",
    logout: "Logout",
    
    // Validation & Errors
    invalidCredentials: "NIM atau Password salah!",
    accountNotFound: "Akun tidak ditemukan.",
    createNewAccount: "Buat akun baru dengan NIM ini dan password yang dimasukkan?",
    loginCanceled: "Login dibatalkan.",
    accountCreatedSuccess: "Akun dibuat dan login berhasil!",
    mustLoginFirst: "Harus login dulu!",
    fillSubject: "Isi mata kuliah!",
    deleteScheduleConfirm: "Hapus jadwal ini?",
    scheduleDeletedSuccess: "Jadwal dihapus",
    agendaAddedSuccess: "Agenda ditambahkan",
    registrationSuccess: "Registrasi berhasil!",
    timeValidationError: "Waktu selesai harus lebih besar dari waktu mulai (format 24-jam).",
    fillAgenda: "Isi agenda!",
    fillAllFields: "Harap isi semua field!",
    passwordMinimum: "Password minimal 8 karakter!",
    resetPassword: "Reset Password",
    resetPasswordDesc: "Untuk keamanan, reset password harus dilakukan melalui admin. Hubungi administrator untuk bantuan.",
    enterStudentId: "Masukkan NIM:",
    studentIdExample: "Contoh: 1234567890",
    cancel: "Batal",
    findAccount: "Cari Akun",
    accountFoundMessage: "Akun ditemukan! Silakan hubungi administrator untuk reset password.",
    studentIdNotFound: "NIM tidak ditemukan dalam sistem.",
    enterStudentIdFirst: "Masukkan NIM terlebih dahulu!",
    
    // Calendar months
    january: "Januari",
    february: "Februari",
    march: "Maret",
    april: "April",
    may: "Mei",
    june: "Juni",
    july: "Juli",
    august: "Agustus",
    september: "September",
    october: "Oktober",
    november: "November",
    december: "Desember",
    
    // Calendar days
    sunday: "Minggu",
    saturday: "Sabtu",
    
    // Calendar navigation
    prevMonth: "← Bulan Sebelumnya",
    nextMonth: "Bulan Berikutnya →",
    today: "Hari Ini",
    
    // Calendar headers
    sun: "Min",
    mon: "Sen",
    tue: "Sel",
    wed: "Rab",
    thu: "Kam",
    fri: "Jum",
    sat: "Sab",
    
    // Overlap warning
    scheduleConflict: "Jadwal tumpang tindih dengan suatu jadwal yang ada. Yakin ingin menyimpan?",
    
    // Logout
    logoutSuccess: "Logout berhasil",
  },
  en: {
    // Login page
    welcome: "Welcome!",
    loginSubtitle: "Please login to continue.",
    nim: "Student ID",
    password: "Password",
    forgotPassword: "Forgot Password?",
    login: "Login",
    noAccount: "Don't have an account?",
    register: "Sign Up",
    
    // Register page
    registerSubtitle: "Please fill in the form to register.",
    passwordNote: "Minimum 8 characters",
    haveAccount: "Already have an account?",
    email: "Email",
    name: "Full Name",
    invalidEmail: "Invalid email format!",
    nimAlreadyExists: "Student ID already exists! Use a different one.",
    
    // Dashboard
    greeting: "Hello",
    scheduleToday: "Today's Schedule",
    agenda: "Agenda",
    reminder: "Reminder",
    todaySchedule: "Today's Schedule",
    dashboard: "Dashboard",
    schedule: "Schedule",
    recap: "Recap",
    
    // Agenda page
    agendaTitle: "Agenda",
    agendaSubtitle: "Manage your daily tasks",
    addAgenda: "Add agenda...",
    agendaAdded: "Agenda added",
    
    // Schedule page
    scheduleTitle: "Class Schedule",
    backDashboard: "Back to Dashboard",
    thisWeek: "This Week",
    calendar: "Calendar",
    addSchedule: "Add Schedule",
    addScheduleBtn: "+ Add Schedule",
    subject: "Enter subject...",
    day: "Day",
    date: "Date",
    startTime: "Start Time",
    endTime: "End Time",
    color: "Color",
    blue: "Blue",
    green: "Green",
    orange: "Orange",
    red: "Red",
    save: "Save",
    cancel: "Cancel",
    deleteConfirm: "Delete this schedule?",
    scheduleDeleted: "Schedule deleted",
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    reminder: "Reminder",
    reminderSaved: "Reminder settings saved",
    noSchedule: "No schedule",
    noScheduleToday: "No schedule today",
    enjoyFreeDay: "Enjoy your free day!",
    noAgenda: "No agenda",
    allTasksDone: "All tasks finished! 🎉",
    noReminder: "No reminder",
    
    // Recap page
    recapTitle: "Recap",
    recapSubtitle: "Summary of activities and statistics",
    totalSchedule: "Total Schedule",
    totalAgenda: "Total Agenda",
    totalReminder: "Total Reminder",
    weeklyChart: "Weekly Chart",
    agendaStatus: "Agenda Status",
    classFrequency: "Class Frequency",
    completed: "Completed",
    pending: "Pending",
    frequency: "Frequency",
    
    // Settings page
    settings: "Settings",
    settingsSubtitle: "Manage your app preferences",
    account: "Account",
    appearance: "Appearance",
    darkMode: "Dark Mode",
    darkModeDesc: "Use dark theme for a more comfortable visual experience",
    theme: "Theme Color",
    themeDesc: "Choose a theme color for your app",
    language: "Language",
    languageDesc: "Choose the language for the app interface",
    notifications: "Notifications",
    notificationDesc: "Manage notification settings",
    scheduleNotif: "Schedule Notifications",
    agendaNotif: "Agenda Notifications",
    data: "Data",
    dataDesc: "Manage your app data",
    clearData: "Clear All Data",
    clearDataDesc: "Delete all data stored in the app",
    confirmClearData: "Are you sure you want to clear all data? This action cannot be undone.",
    dataCleared: "Data cleared successfully",
    about: "About",
    aboutDesc: "Information about the app",
    appVersion: "Version: 1.0.0",
    confirmLogout: "Are you sure you want to logout?",
    studentId: "Student ID",
    name: "Name",
    logout: "Logout",
    
    // Validation & Errors
    invalidCredentials: "Student ID or password is incorrect!",
    accountNotFound: "Account not found.",
    createNewAccount: "Create a new account with this Student ID and password?",
    loginCanceled: "Login canceled.",
    accountCreatedSuccess: "Account created and login successful!",
    mustLoginFirst: "You must login first!",
    fillSubject: "Please fill in the subject!",
    deleteScheduleConfirm: "Delete this schedule?",
    scheduleDeletedSuccess: "Schedule deleted",
    agendaAddedSuccess: "Agenda added",
    registrationSuccess: "Registration successful!",
    timeValidationError: "End time must be greater than start time (24-hour format).",
    fillAgenda: "Please fill in the agenda!",
    fillAllFields: "Please fill in all fields!",
    passwordMinimum: "Password must be at least 8 characters!",
    resetPassword: "Reset Password",
    resetPasswordDesc: "For security reasons, password reset must be done through the admin. Please contact the administrator for assistance.",
    enterStudentId: "Enter Student ID:",
    studentIdExample: "Example: 1234567890",
    cancel: "Cancel",
    findAccount: "Find Account",
    accountFoundMessage: "Account found! Please contact the administrator for password reset.",
    studentIdNotFound: "Student ID not found in the system.",
    enterStudentIdFirst: "Please enter the Student ID first!",
    
    // Calendar months
    january: "January",
    february: "February",
    march: "March",
    april: "April",
    may: "May",
    june: "June",
    july: "July",
    august: "August",
    september: "September",
    october: "October",
    november: "November",
    december: "December",
    
    // Calendar days
    sunday: "Sunday",
    saturday: "Saturday",
    
    // Calendar navigation
    prevMonth: "← Previous Month",
    nextMonth: "Next Month →",
    today: "Today",
    
    // Calendar headers
    sun: "Sun",
    mon: "Mon",
    tue: "Tue",
    wed: "Wed",
    thu: "Thu",
    fri: "Fri",
    sat: "Sat",
    
    // Overlap warning
    scheduleConflict: "Schedule overlaps with an existing schedule. Are you sure you want to save?",
    
    // Logout
    logoutSuccess: "Logout successful",
  }
};

// Get current language from localStorage or default to Indonesian
let currentLanguage = localStorage.getItem("language") || "id";

// Function to get current language
function getLang() {
  return currentLanguage;
}

// Function to translate text
function t(key) {
  return translations[currentLanguage]?.[key] || translations.id[key] || key;
}

// Function to switch language
function switchLanguage(lang) {
  if (lang === "id" || lang === "en") {
    currentLanguage = lang;
    localStorage.setItem("language", lang);
    // Reload page to apply new language
    window.location.reload();
  }
}

// Function to update DOM with translations
function updatePageLanguage() {
  // Update all elements with data-i18n attribute
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });

  // Update placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    el.placeholder = t(key);
  });

  // Update titles and attributes
  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    const key = el.getAttribute("data-i18n-title");
    el.title = t(key);
  });

  // Update option elements inside selects
  document.querySelectorAll("option[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });

  // Update language button
  const langBtn = document.getElementById("langBtn");
  if (langBtn) {
    langBtn.textContent = getLang() === "id" ? "EN" : "ID";
  }
}

// Apply language on page load
document.addEventListener("DOMContentLoaded", updatePageLanguage);

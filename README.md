# 🚑 Mediguard Connect
**"Siaga Saat Darurat, Setia Merawat Masa Tua."**

**Mediguard Connect** adalah platform web inovatif yang dirancang khusus untuk memantau kesehatan lansia dan memberikan respon darurat tercepat. Dibangun dengan pendekatan *human-centric design*, web ini membantu anak/wali memantau kondisi orang tua mereka secara real-time dan terhubung langsung dengan layanan IGD 24 Jam.

![Mediguard Connect Hero](assets/images/preview.png)
*(Catatan: Anda bisa menambahkan screenshot web di folder assets/images dengan nama preview.png)*

## ✨ Fitur Unggulan (The "Wah" Factors)

Web ini dilengkapi dengan fitur-fitur interaktif modern tanpa menggunakan framework berat:

### 🚨 1. Sistem Emergency Canggih
*   **Synthesized Siren Sound:** Menggunakan *Web Audio API* untuk menghasilkan suara sirine wiu-wiu asli dari browser saat tombol darurat ditekan (tanpa file MP3 eksternal).
*   **Floating SOS Button:** Tombol darurat *sticky* yang selalu muncul di layar HP (Mobile Only) untuk akses cepat.
*   **Simulasi Respons:** Visualisasi status "MENGHUBUNGI..." hingga "AMBULANS OTW" dengan estimasi waktu nyata.

### 📊 2. Prolanis Digital Dashboard
*   **Live Health Monitoring:** Grafik tensi interaktif dengan animasi "scanning line" dan efek "breathing".
*   **Data Simulation:** Demonstrasi pembaruan data real-time (detak jantung berkedip, grafik naik turun otomatis).
*   **Integrasi WhatsApp:** Mockup notifikasi otomatis ke keluarga jika pasien lupa minum obat.

### 🎨 3. Modern Glassmorphism UI
*   **Premium Aesthetics:** Desain berbasis *Glassmorphism* (efek kaca buram), gradien biru medis yang menenangkan, dan tipografi modern (Inter & Plus Jakarta Sans).
*   **Responsive & Fluid:** Layout yang menyesuaikan otomatis dari Desktop hingga layar HP terkecil.
*   **Heartbeat Preloader:** Animasi loading detak jantung saat pertama kali membuka web.

---

## 🛠️ Teknologi yang Digunakan

Project ini dibangun dengan prinsip **Vanillla Web Development** (Murni tanpa Framework) untuk performa maksimal dan kemudahan integrasi:

*   **HTML5:** Struktur semantik dan aksesibel.
*   **CSS3 Modern:**
    *   `CSS Variables` untuk konsistensi tema.
    *   `Flexbox & Grid` untuk layout responsif.
    *   `Keyframes Animation` untuk efek pulse, shake, dan scanning.
    *   `Backdrop-filter` untuk efek kaca (Glassmorphism).
*   **JavaScript (ES6+):**
    *   `Web Audio API` (Sound Synthesis).
    *   `IntersectionObserver` (Scroll Reveal Animations).
    *   `DOM Manipulation` (Interaktivitas UI).

---

## 📂 Struktur Folder

```
unipro-team-2/
├── assets/
│   ├── css/
│   │   ├── reset.css       # Reset & Base Styles
│   │   ├── variables.css   # Color palette & Global variables
│   │   └── style.css       # Main Component Styles
│   ├── js/
│   │   └── main.js         # Core Logic (Sound, Animation, Data)
│   └── images/             # Aset gambar
├── index.html              # Halaman Utama (Single Page App)
└── README.md               # Dokumentasi Proyek
```



---

## 👨‍💻 Tim Pengembang

**Team CareLink:**
*   **Front-end & UI/UX:** [Nama Anda / Tim]
*   **Tema:** Health Tech & Smart Emergency System

---
*© 2025 Mediguard Connect. All Rights Reserved.*

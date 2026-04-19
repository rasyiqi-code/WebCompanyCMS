# Next CMS (Bahasa Indonesia)

<p align="center">
  <a href="README.md">English</a> | <a href="README.id.md">Bahasa Indonesia</a>
</p>

Aplikasi Next.js bertenaga untuk membangun dan mengelola konten dengan CredBuild. Dilengkapi dengan **Universal Adaptive Installer**, Next CMS bekerja secara mulus di lingkungan Vercel, VPS, dan Docker.

## Fitur Utama

- **Adaptive Installer**: Deteksi lingkungan cerdas untuk pengaturan tanpa hambatan di platform apa pun.
- **Page Builder**: Pengeditan visual dengan CredBuild.
- **Content Management**: Dashboard yang tangguh untuk halaman, postingan, dan media.
- **SEO Optimized**: Sitemap dinamis, Robots.txt, dan metadata otomatis.
- **Modern Stack**: Dibangun dengan Next.js 15, Prisma ORM, dan Tailwind CSS.
- **Luxury Dark Studio**: UI dashboard premium dengan desain ringkas berkepadatan tinggi.

## Tampilan Preview

| Dashboard Overview | Media Library (Folder Based) |
| :---: | :---: |
| ![Dashboard Overview](docs/previews/dashboard_overview.png) | ![Media Library](docs/previews/media_library.png) |

| Manajemen Konten | Manajemen Taksonomi |
| :---: | :---: |
| ![Daftar Halaman](docs/previews/pages_list.png) | ![Manajemen Taksonomi](docs/previews/taxonomy_dashboard.png) |

| Pengelolaan Term | Pengaturan & UI Ringkas |
| :---: | :---: |
| ![Pengelolaan Term](docs/previews/terms_management.png) | ![Pengaturan Header](docs/previews/settings_header.png) |

## Memulai

### Prasyarat

- Node.js 18+
- Database PostgreSQL
- Cloudflare R2 (untuk penyimpanan utama)

### Instalasi & Pengaturan

1.  **Clone repositori**:
    ```bash
    git clone https://github.com/crediblemark-official/Next_CMS.git
    cd Next_CMS
    ```

2.  **Instal dependensi**:
    ```bash
    bun install
    ```

3.  **Deploy & Inisialisasi**:
    Untuk pengembangan lokal:
    ```bash
    npx prisma db push
    bun dev
    ```
    Kemudian kunjungi `http://localhost:3000/installer` untuk menginisialisasi situs Anda.

    Untuk **Cloud Deployment (Vercel/Railway)**, silakan baca [Panduan Deployment](docs/DEPLOYMENT.id.md).

## Dokumentasi

- [Panduan Instalasi](docs/INSTALLATION.id.md) - Penjelasan mendalam tentang pengaturan lokal dan cloud.
- [Panduan Deployment](docs/DEPLOYMENT.id.md) - Instruksi spesifik platform.
- [Panduan Pengembang](docs/creating-hero-components.md) - Membuat komponen kustom (Hero, dll).
- [Analisis Keamanan](docs/security-analysis.md) - Tinjauan keamanan arsitektur.

## Kredensial Default
*Hanya tersedia setelah menjalankan installer atau script seeding.*

| Peran | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@univedpress.com` | `admin` |

> **Catatan**: User tambahan dapat dibuat melalui `bun scripts/seed-user.ts`.

## Lisensi & Penulis
- **Penulis**: Rasyiqi Crediblemark
- **Homepage**: [build.crediblemark.com](https://build.crediblemark.com)

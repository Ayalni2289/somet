# Strapi CMS Kurulum Rehberi

Bu rehber, SOMET blog sitesi için Strapi Headless CMS kurulumunu açıklar.

## 📋 Gereksinimler

- Node.js 18.x veya üzeri
- npm veya yarn
- PostgreSQL, MySQL, MariaDB, veya SQLite (geliştirme için SQLite önerilir)

## 🚀 Kurulum Adımları

### 1. Strapi Projesi Oluşturma

Ana proje klasörünüzün dışında (örneğin `../somet-strapi`) Strapi projesini oluşturun:

```bash
cd ..
npx create-strapi-app@latest somet-strapi --quickstart
```

Veya manuel kurulum:

```bash
npx create-strapi-app@latest somet-strapi
# Database seçimi: SQLite (geliştirme için)
# Installation: Quickstart (önerilen)
```

### 2. Strapi Admin Kullanıcısı Oluşturma

İlk kurulumda tarayıcıda açılan sayfada admin kullanıcısını oluşturun:
- Email: admin@somet.org (veya istediğiniz email)
- Şifre: Güvenli bir şifre belirleyin

**Not:** Tek bir admin kullanıcı yeterli. Ek kullanıcı oluşturmanıza gerek yok.

### 3. Content Type Oluşturma

Strapi admin panelinde (`http://localhost:1337/admin`):

#### 3.1. Category Content Type

1. **Content-Type Builder** > **Create new collection type**
2. Collection type adı: `category`
3. Aşağıdaki alanları ekleyin:

| Field Name | Type | Required | Unique |
|------------|------|----------|--------|
| `name` | Text (Short text) | ✅ | ❌ |
| `slug` | UID (based on name) | ✅ | ✅ |

4. **Save** butonuna tıklayın

#### 3.2. Post Content Type

1. **Content-Type Builder** > **Create new collection type**
2. Collection type adı: `post`
3. Aşağıdaki alanları ekleyin:

| Field Name | Type | Required | Unique | Notes |
|------------|------|----------|--------|-------|
| `title` | Text (Short text) | ✅ | ❌ | |
| `slug` | UID (based on title) | ✅ | ✅ | |
| `content` | Rich text | ❌ | ❌ | |
| `coverImage` | Media (Single media) | ❌ | ❌ | |
| `publishedAt` | Date | ❌ | ❌ | |
| `isPublished` | Boolean | ❌ | ❌ | Default: false |
| `seoTitle` | Text (Short text) | ❌ | ❌ | |
| `seoDescription` | Text (Long text) | ❌ | ❌ | |

4. **Relation** alanı ekleyin:
   - **Post** → **Category** (Many-to-one)
   - Post tarafında: `category` (singular)
   - Category tarafında: `posts` (plural)

5. **Save** butonuna tıklayın
6. Strapi otomatik olarak API route'larını oluşturacak

### 4. API İzinlerini Ayarlama

**ÖNEMLİ:** Sadece `isPublished: true` olan içerikler public API'den erişilebilir olmalı.

1. **Settings** > **Users & Permissions plugin** > **Roles** > **Public**
2. **Post** bölümünde:
   - ✅ `find` (Tüm makaleleri getir)
   - ✅ `findOne` (Tek makale getir)
   - ❌ `create`, `update`, `delete` (Public erişim yok)
3. **Category** bölümünde:
   - ✅ `find` (Tüm kategorileri getir)
   - ✅ `findOne` (Tek kategori getir)
4. **Save** butonuna tıklayın

**Not:** Strapi API'de `isPublished` filtresi kod tarafında uygulanıyor. Public role'ün sadece `find` ve `findOne` izinleri olması yeterli.

### 5. CORS Ayarları

1. **Settings** > **Middleware**
2. **CORS** bölümünde:
   - **Origin**: `http://localhost:3000` (geliştirme için)
   - Production'da: `https://yourdomain.com`
3. **Save** butonuna tıklayın

### 6. Environment Variables

Strapi projesinin `.env` dosyasına ekleyin (opsiyonel, production için):

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys-here
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret
```

### 7. Next.js Environment Variables

Ana Next.js projenizin `.env.local` dosyasına ekleyin:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=  # Production için API token (opsiyonel)
```

## 📝 İlk İçerik Ekleme

### 1. Kategori Oluşturma

1. Strapi admin panelinde **Content Manager** > **Category** > **Create new entry**
2. Kategori bilgilerini doldurun:
   - Name: Örn. "Eğitim", "Etkinlikler", vb.
   - Slug otomatik oluşturulacak
3. **Save** ve ardından **Publish** butonuna tıklayın

### 2. Post Oluşturma

1. Strapi admin panelinde **Content Manager** > **Post** > **Create new entry**
2. Post bilgilerini doldurun:
   - **Title**: Makale başlığı
   - **Slug**: Otomatik oluşturulur (değiştirilebilir)
   - **Content**: Rich text editor ile içerik
   - **Cover Image**: Görsel yükleyin (Media Library'den)
   - **Published At**: Yayın tarihi
   - **Is Published**: ✅ (Yayınlanmak için işaretleyin)
   - **SEO Title**: Arama motorları için başlık (opsiyonel)
   - **SEO Description**: Arama motorları için açıklama (opsiyonel)
   - **Category**: Kategori seçin
3. **Save** butonuna tıklayın
4. **Publish** butonuna tıklayın (sadece publish edilen içerikler API'de görünür)

**ÖNEMLİ:** 
- `isPublished: false` olan içerikler API'den erişilemez
- İçeriği yayınlamak için hem **Save** hem de **Publish** butonlarına tıklamanız gerekir

## 🖼️ Media Library

Strapi'de görsel yükleme:

1. **Media Library** > **Add new assets**
2. Görselleri yükleyin
3. Post oluştururken/düzenlerken **Cover Image** alanından Media Library'den seçin

## 🚀 Production Deployment

### Strapi Deployment

Strapi'yi ayrı bir sunucuda veya platformda (Railway, Render, DigitalOcean, vb.) deploy edin.

**Önemli:**
- Production'da PostgreSQL veya MySQL kullanın (SQLite production için uygun değil)
- Environment variables'ları ayarlayın
- CORS ayarlarını production domain'inize göre güncelleyin
- `isPublished` kontrolü kod tarafında yapılıyor, ekstra güvenlik için API token kullanabilirsiniz

### Next.js Environment Variables (Production)

```env
NEXT_PUBLIC_STRAPI_URL=https://your-strapi-domain.com
STRAPI_API_TOKEN=your-production-api-token
```

## 🔐 API Token (Opsiyonel - Production için)

Production'da API token kullanmak için:

1. Strapi admin panelinde **Settings** > **API Tokens**
2. **Create new API Token**
3. Token adı: `nextjs-frontend`
4. Token type: `Read-only`
5. **Save** ve token'ı kopyalayın
6. Next.js `.env.local` dosyasına `STRAPI_API_TOKEN` olarak ekleyin

## 📚 Strapi API Endpoints

Strapi otomatik olarak şu endpoint'leri oluşturur:

- `GET /api/posts?filters[isPublished][$eq]=true` - Yayınlanmış tüm postlar
- `GET /api/posts?filters[slug][$eq]=slug-name&filters[isPublished][$eq]=true` - Slug ile post (sadece yayınlanmış)
- `GET /api/categories` - Tüm kategoriler

## ⚡ ISR (Incremental Static Regeneration)

Next.js tarafında ISR aktif:
- Her sayfa 60 saniyede bir revalidate edilir
- `revalidate: 60` ayarı ile yapılandırıldı
- Strapi'de içerik güncellendiğinde, en geç 60 saniye içinde Next.js'de görünür

## 🧪 Test

1. Strapi'yi başlatın: `cd somet-strapi && npm run develop`
2. Next.js'i başlatın: `npm run dev`
3. Strapi admin panelinde bir post oluşturun ve **Publish** edin
4. `http://localhost:3000/makaleler` sayfasını kontrol edin
5. `isPublished: false` olan bir post oluşturun ve API'den erişilemediğini doğrulayın

## 📖 Daha Fazla Bilgi

- [Strapi Dokümantasyonu](https://docs.strapi.io)
- [Strapi API Dokümantasyonu](https://docs.strapi.io/dev-docs/api/rest)
- [Next.js ISR Dokümantasyonu](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)

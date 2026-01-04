# Strapi Hızlı Başlangıç

## 🚀 Strapi Kurulumu

### 1. Strapi Projesini Oluşturun

Terminal'de şu komutları çalıştırın:

```bash
cd ..
npx create-strapi-app@latest somet-strapi --quickstart
```

Kurulum sırasında:
- **Database**: SQLite seçin (geliştirme için)
- Kurulum tamamlandığında tarayıcı otomatik açılacak

### 2. Admin Kullanıcısı Oluşturun

Tarayıcıda açılan sayfada:
- **First name**: Adınız
- **Last name**: Soyadınız  
- **Email**: `admin@somet.org`
- **Password**: Güvenli bir şifre
- **Create an account** butonuna tıklayın

### 3. Strapi'yi Başlatın

```bash
cd ../somet-strapi
npm run develop
```

Admin panel: **http://localhost:1337/admin**

## 📝 İlk Content Type'ları Oluşturun

### Category Content Type

1. **Content-Type Builder** > **Create new collection type**
2. Ad: `category`
3. Alanlar:
   - `name` (Text, Short text, Required)
   - `slug` (UID, based on name, Required, Unique)
4. **Save**

### Post Content Type

1. **Content-Type Builder** > **Create new collection type**
2. Ad: `post`
3. Alanlar:
   - `title` (Text, Short text, Required)
   - `slug` (UID, based on title, Required, Unique)
   - `content` (Rich text)
   - `coverImage` (Media, Single media)
   - `publishedAt` (Date)
   - `isPublished` (Boolean, Default: false)
   - `seoTitle` (Text, Short text)
   - `seoDescription` (Text, Long text)
4. **Relation** ekleyin:
   - Post → Category (Many-to-one)
5. **Save**

## ⚙️ API İzinlerini Ayarlayın

1. **Settings** > **Users & Permissions** > **Roles** > **Public**
2. **Post**:
   - ✅ `find`
   - ✅ `findOne`
3. **Category**:
   - ✅ `find`
   - ✅ `findOne`
4. **Save**

## 🌐 CORS Ayarları

1. **Settings** > **Middleware**
2. **CORS**:
   - Origin: `http://localhost:3000`
3. **Save**

## ✅ Test

1. Strapi'de bir Post oluşturun ve **Publish** edin
2. Next.js'i başlatın: `npm run dev`
3. `http://localhost:3000/makaleler` sayfasını kontrol edin

## 🎯 İlk Post Oluşturma

1. **Content Manager** > **Post** > **Create new entry**
2. Formu doldurun
3. **Is Published**: ✅ işaretleyin
4. **Save** ve **Publish**

Post'unuz Next.js sitenizde görünecek! 🎉



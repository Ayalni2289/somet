# Strapi Admin Paneline Erişim Rehberi

## 🚀 İlk Kurulum Sonrası

### 1. Strapi Projesini Başlatın

Strapi projenizin bulunduğu klasöre gidin:

```bash
cd ../somet-strapi
npm run develop
```

veya

```bash
cd ../somet-strapi
yarn develop
```

### 2. Admin Paneline Erişim

Strapi başlatıldıktan sonra tarayıcınızda otomatik olarak açılır:

**URL:** `http://localhost:1337/admin`

Eğer otomatik açılmazsa, tarayıcınızda manuel olarak açın:
- **Geliştirme:** `http://localhost:1337/admin`
- **Production:** `https://your-strapi-domain.com/admin`

### 3. İlk Admin Kullanıcısı Oluşturma

İlk kez açtığınızda admin kullanıcısı oluşturma formu görünür:

1. **First name**: Adınız
2. **Last name**: Soyadınız
3. **Email**: `admin@somet.org` (veya istediğiniz email)
4. **Password**: Güvenli bir şifre belirleyin
5. **Confirm password**: Şifreyi tekrar girin

**Create an account** butonuna tıklayın.

### 4. Giriş Yapma

Sonraki ziyaretlerde:

1. `http://localhost:1337/admin` adresine gidin
2. Email ve şifrenizi girin
3. **Login** butonuna tıklayın

## 📍 Admin Panel Bölümleri

Strapi admin panelinde şu bölümlere erişebilirsiniz:

### Content Manager
- **Post**: Blog yazılarınızı oluşturun, düzenleyin ve yayınlayın
- **Category**: Kategorileri yönetin

### Content-Type Builder
- Yeni content type'lar oluşturun
- Mevcut content type'ları düzenleyin

### Media Library
- Görselleri yükleyin ve yönetin
- Post'larda kullanmak için görselleri seçin

### Settings
- **Users & Permissions**: API izinlerini ayarlayın
- **Middleware**: CORS ayarları
- **API Tokens**: Production için API token oluşturun

## 🔐 Şifremi Unuttum

Eğer şifrenizi unuttuysanız:

1. `http://localhost:1337/admin` adresine gidin
2. **Forgot your password?** linkine tıklayın
3. Email adresinizi girin
4. Email'inize gelen link ile şifrenizi sıfırlayın

## 🚨 Sorun Giderme

### Strapi başlamıyor
```bash
# Port 1337 kullanımda mı kontrol edin
# Farklı bir port kullanmak için:
PORT=1338 npm run develop
```

### Admin panel açılmıyor
- Strapi'nin çalıştığından emin olun (terminal'de "Server started" mesajı)
- Tarayıcı konsolunda hata var mı kontrol edin
- `http://localhost:1337` adresine direkt erişebiliyor musunuz kontrol edin

### Giriş yapamıyorum
- Email ve şifrenin doğru olduğundan emin olun
- İlk kurulumda admin kullanıcısı oluşturduğunuzdan emin olun
- Strapi veritabanını kontrol edin (SQLite için `somet-strapi/.tmp/data.db`)

## 📝 Hızlı Başlangıç

1. **Strapi'yi başlatın:**
   ```bash
   cd ../somet-strapi
   npm run develop
   ```

2. **Tarayıcıda açın:**
   ```
   http://localhost:1337/admin
   ```

3. **İlk admin kullanıcısını oluşturun** (sadece ilk kez)

4. **Giriş yapın ve içerik oluşturmaya başlayın!**

## 🎯 İlk Post Oluşturma

Admin paneline giriş yaptıktan sonra:

1. Sol menüden **Content Manager** > **Post** seçin
2. **Create new entry** butonuna tıklayın
3. Formu doldurun:
   - Title: Makale başlığı
   - Slug: Otomatik oluşur (değiştirilebilir)
   - Content: İçerik (Rich text editor)
   - Cover Image: Görsel seçin
   - Is Published: ✅ İşaretleyin
   - Category: Kategori seçin
4. **Save** ve ardından **Publish** butonuna tıklayın

Post'unuz artık Next.js sitenizde görünecek!



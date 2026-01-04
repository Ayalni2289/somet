# Strapi Sonraki Adımlar - PostgreSQL Sonrası

PostgreSQL bağlantınız hazır! Şimdi sırayla şunları yapın:

## ✅ 1. Content Type'ları Oluşturun

### Category Content Type

1. Strapi admin panelinde: **Content-Type Builder** > **Create new collection type**
2. **Display name**: `Category`
3. **API ID (singular)**: `category`
4. **API ID (plural)**: `categories`
5. **Continue** butonuna tıklayın

6. **Add another field** ile alanları ekleyin:

   **Alan 1: name**
   - Field type: **Text**
   - Field name: `name`
   - Type: **Short text**
   - Required: ✅
   - **Finish** > **Continue**

   **Alan 2: slug**
   - Field type: **UID**
   - Field name: `slug`
   - Attached field: `name` (name alanına bağlı)
   - Required: ✅
   - **Finish** > **Continue**

7. **Save** butonuna tıklayın
8. Strapi otomatik olarak API route'larını oluşturacak

### Post Content Type

1. **Content-Type Builder** > **Create new collection type**
2. **Display name**: `Post`
3. **API ID (singular)**: `post`
4. **API ID (plural)**: `posts`
5. **Continue**

6. **Add another field** ile alanları ekleyin:

   **Alan 1: title**
   - Field type: **Text**
   - Field name: `title`
   - Type: **Short text**
   - Required: ✅
   - **Finish** > **Continue**

   **Alan 2: slug**
   - Field type: **UID**
   - Field name: `slug`
   - Attached field: `title`
   - Required: ✅
   - **Finish** > **Continue**

   **Alan 3: content**
   - Field type: **Rich text**
   - Field name: `content`
   - Required: ❌
   - **Finish** > **Continue**

   **Alan 4: coverImage**
   - Field type: **Media**
   - Field name: `coverImage`
   - Type: **Single media**
   - Required: ❌
   - **Finish** > **Continue**

   **Alan 5: publishedAt**
   - Field type: **Date**
   - Field name: `publishedAt`
   - Type: **Date**
   - Required: ❌
   - **Finish** > **Continue**

   **Alan 6: isPublished**
   - Field type: **Boolean**
   - Field name: `isPublished`
   - Default value: `false`
   - Required: ❌
   - **Finish** > **Continue**

   **Alan 7: seoTitle**
   - Field type: **Text**
   - Field name: `seoTitle`
   - Type: **Short text**
   - Required: ❌
   - **Finish** > **Continue**

   **Alan 8: seoDescription**
   - Field type: **Text**
   - Field name: `seoDescription`
   - Type: **Long text**
   - Required: ❌
   - **Finish** > **Continue**

7. **Add another field** > **Relation** ile ilişki ekleyin:
   - **Post** → **Category**
   - Post tarafında: `category` (singular)
   - Category tarafında: `posts` (plural)
   - **Finish** > **Continue**

8. **Save** butonuna tıklayın

## ✅ 2. API İzinlerini Ayarlayın

**ÖNEMLİ:** Sadece yayınlanmış içerikler API'den erişilebilir olmalı.

1. **Settings** (sol alt köşe) > **Users & Permissions plugin** > **Roles** > **Public**

2. **Post** bölümünde:
   - ✅ `find` (Tüm postları getir)
   - ✅ `findOne` (Tek post getir)
   - ❌ `create`, `update`, `delete` (Public erişim yok)
   - **Save**

3. **Category** bölümünde:
   - ✅ `find` (Tüm kategorileri getir)
   - ✅ `findOne` (Tek kategori getir)
   - **Save**

4. Sayfanın üstündeki **Save** butonuna tıklayın

## ✅ 3. CORS Ayarları

1. **Settings** > **Middleware**

2. **CORS** bölümünde:
   - **Origin**: `http://localhost:3000` (geliştirme için)
   - Production'da: `https://yourdomain.com`

3. **Save**

## ✅ 4. İlk Kategori Oluşturun

1. **Content Manager** > **Category** > **Create new entry**

2. Formu doldurun:
   - **name**: Örn. "Eğitim", "Etkinlikler", "Makaleler"
   - **slug**: Otomatik oluşur (değiştirilebilir)

3. **Save** ve ardından **Publish** butonuna tıklayın

## ✅ 5. İlk Post Oluşturun

1. **Content Manager** > **Post** > **Create new entry**

2. Formu doldurun:
   - **title**: Makale başlığı
   - **slug**: Otomatik oluşur
   - **content**: Rich text editor ile içerik yazın
   - **coverImage**: Media Library'den görsel seçin
   - **publishedAt**: Yayın tarihi (opsiyonel)
   - **isPublished**: ✅ **MUTLAKA İŞARETLEYİN** (yayınlanması için)
   - **seoTitle**: SEO başlığı (opsiyonel)
   - **seoDescription**: SEO açıklaması (opsiyonel)
   - **category**: Oluşturduğunuz kategoriyi seçin

3. **Save** butonuna tıklayın

4. **Publish** butonuna tıklayın (sadece publish edilen içerikler API'de görünür)

## ✅ 6. Test Edin

1. Next.js'i başlatın (eğer çalışmıyorsa):
   ```bash
   npm run dev
   ```

2. Tarayıcıda kontrol edin:
   - `http://localhost:3000/makaleler` - Post listesi
   - `http://localhost:3000/[post-slug]` - Post detay sayfası

3. Strapi API'yi test edin:
   - `http://localhost:1337/api/posts?filters[isPublished][$eq]=true`
   - Sadece `isPublished: true` olan postlar görünmeli

## 🎯 Kontrol Listesi

- [ ] Category Content Type oluşturuldu
- [ ] Post Content Type oluşturuldu
- [ ] Post-Category ilişkisi kuruldu
- [ ] API izinleri ayarlandı (Public role)
- [ ] CORS ayarlandı
- [ ] İlk kategori oluşturuldu ve publish edildi
- [ ] İlk post oluşturuldu ve publish edildi
- [ ] `isPublished: true` olarak işaretlendi
- [ ] Next.js'de post görünüyor

## 🚨 Sorun Giderme

### Post'lar görünmüyor
- `isPublished: true` olduğundan emin olun
- Post'u **Publish** ettiğinizden emin olun
- API izinlerini kontrol edin (Public role > Post > find, findOne)

### CORS hatası
- Settings > Middleware > CORS'da `http://localhost:3000` ekli olduğundan emin olun

### Görseller görünmüyor
- Media Library'den görsel yüklediğinizden emin olun
- Cover Image alanına görsel seçtiğinizden emin olun

## 📚 Sonraki Adımlar

Tüm adımlar tamamlandıktan sonra:
- Daha fazla post ekleyin
- Kategoriler oluşturun
- Görselleri Media Library'den yönetin
- SEO alanlarını doldurun

Başarılar! 🎉


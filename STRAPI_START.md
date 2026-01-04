# Strapi'yi Başlatma Rehberi

## 🚨 Hata: "This site can't be reached 1337/admin"

Bu hata, Strapi'nin çalışmadığı anlamına gelir. Strapi'yi başlatmanız gerekiyor.

## ✅ Çözüm Adımları

### 1. Strapi Projesi Var mı Kontrol Edin

Terminal'de şu komutu çalıştırın:

```bash
cd ..
ls
```

veya Windows PowerShell'de:

```powershell
cd ..
dir
```

Eğer `somet-strapi` klasörü yoksa, önce Strapi'yi kurmanız gerekir.

### 2. Strapi Henüz Kurulmadıysa

```bash
cd ..
npx create-strapi-app@latest somet-strapi --quickstart
```

Kurulum sırasında:
- Database: PostgreSQL seçin (zaten bağlantınız var)
- PostgreSQL bağlantı bilgilerinizi girin
- Kurulum tamamlandığında tarayıcı otomatik açılacak

### 3. Strapi'yi Başlatın

Strapi projesi klasörüne gidin ve başlatın:

```bash
cd ../somet-strapi
npm run develop
```

veya

```bash
cd ../somet-strapi
yarn develop
```

### 4. Strapi Başladığında

Terminal'de şu mesajı göreceksiniz:

```
Server started
Admin panel: http://localhost:1337/admin
```

### 5. Admin Paneline Erişin

Tarayıcıda şu adresi açın:

```
http://localhost:1337/admin
```

## 🔍 Sorun Giderme

### Port 1337 Kullanımda

Eğer port 1337 başka bir uygulama tarafından kullanılıyorsa:

1. Strapi projesinin `.env` dosyasını açın
2. Şu satırı ekleyin:
   ```
   PORT=1338
   ```
3. Strapi'yi yeniden başlatın
4. Admin panel: `http://localhost:1338/admin`

### Strapi Başlamıyor

1. Node.js versiyonunuzu kontrol edin (18.x veya üzeri olmalı):
   ```bash
   node --version
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   cd ../somet-strapi
   npm install
   ```

3. Tekrar başlatın:
   ```bash
   npm run develop
   ```

### PostgreSQL Bağlantı Hatası

1. PostgreSQL'in çalıştığından emin olun
2. Strapi `.env` dosyasında bağlantı bilgilerini kontrol edin:
   ```
   DATABASE_CLIENT=postgres
   DATABASE_HOST=127.0.0.1
   DATABASE_PORT=5432
   DATABASE_NAME=your_database_name
   DATABASE_USERNAME=your_username
   DATABASE_PASSWORD=your_password
   ```

## 📝 Hızlı Kontrol Listesi

- [ ] Strapi projesi oluşturuldu (`../somet-strapi` klasörü var)
- [ ] PostgreSQL bağlantısı yapılandırıldı
- [ ] Strapi başlatıldı (`npm run develop`)
- [ ] Terminal'de "Server started" mesajı görünüyor
- [ ] `http://localhost:1337/admin` adresine erişilebiliyor

## 🎯 Sonraki Adımlar

Strapi başarıyla başladıktan sonra:
1. Admin kullanıcısı oluşturun (ilk kez)
2. Content Type'ları oluşturun (Post, Category)
3. API izinlerini ayarlayın
4. İlk içerikleri ekleyin

Detaylar için `STRAPI_NEXT_STEPS.md` dosyasına bakın.



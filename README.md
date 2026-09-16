# Robombo — Web Vertical Slice

Tek bölümlük, mobil uyumlu WebGL robot süpürge oyunu prototipi.

## Çalıştırma

`index.html` tarayıcıda açılabilir. Oyun, Three.js ve web yazı tiplerini şu an CDN'den alır; yayın sürümünde bağımlılıklar proje içine alınmalıdır.

## Kontroller

- Masaüstü: WASD / yön tuşları, boşluk (turbo), U veya F (UV), C (kamera), H (dock).
- Dokunmatik: D-PAD düğmelerini kullanın; sağdaki kontrol düğmesi D-PAD ve joystick arasında geçiş yapar.

## Firebase Hosting hazırlığı

`firebase.json` yayımlama ayarını içerir. Firebase projesi bağlanınca `.firebaserc.example` dosyasını `.firebaserc` olarak kopyalayıp gerçek proje kimliğini yazın. Bu dosya kaynak koda gizli anahtar eklemez.

## Yayın öncesi kontrol listesi

1. Gerçek Android ve iOS cihazda D-PAD/joystick kontrol testi.
2. Düşük bellekli cihazda FPS testi.
3. Firebase Hosting proje kimliği ve yayın yetkisi.
4. GitHub deposu bağlandıktan sonra kaynak sürümünün gönderilmesi.

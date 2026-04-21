// هذا الكود فقط لإثبات وجود "موظف" شغال للمتصفح
self.addEventListener('install', (event) => {
    console.log('Najd Service Worker Installed');
});

self.addEventListener('fetch', (event) => {
    // يترك فارغاً حالياً، فقط للوفاء بشروط التثبيت
});

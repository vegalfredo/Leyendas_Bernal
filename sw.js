const CACHE_NAME = 'bernal-cache-v3'; // Cambié a v3 para obligar a actualizar

const urlsToCache = [
  './',
  './index.html',
  './css/estilos.css',
  './css/normalize.css',
  './js/menu.js',
  './js/questions.js',
  './js/slider.js',
  './logo_bernal.png',
  './00 Musica de Sala.mp3',
  './01 primera llamada Las Leyendas.mp3',
  './02 Musica de Sala.mp3',
  './03 Segunda llamada Las Leyendas.mp3',
  './04 Musica de Sala.mp3',
  './05 Tercera llamada Las Leyendas.mp3',
  './06 Suspenso entrada Viejita.mp3',
  './07 CHAN CHAN CHAAAN.mp3',
  './08 MUSICA AMOR TELENOVELA.mp3',
  './09 MUSICA DRAMATIC OK.mp3',
  './09 audio musica funebre.mp3',
  './17 Banda Sonora de miedo LEYENDAS BERNAL.mp3',
  './11 Camino hacia el terror.mp3',
  './12 Efecto de Cuervos.mp3',
  './13 MUSICA DIVINA, TENSION Y AGUA.mp3',
  './14 Musica para AGRADECER.mp3',
  './16 ENYA MUSICA FINAL EPICA.mp3'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      console.log('--- NUEVO SW (V3): INTENTANDO GUARDAR ARCHIVOS UNO POR UNO ---');
      
      for (const url of urlsToCache) {
        try {
          await cache.add(url);
          console.log('✅ Guardado: ' + url);
        } catch (error) {
          console.error('❌ ERROR FATAL: No se encontró este archivo: ' + url);
        }
      }
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Borrando caché vieja:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
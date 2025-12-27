// Nombre de la caché (si actualizas audios, cambia v1 a v2)
const CACHE_NAME = 'bernal-cache-v1';

// Lista de archivos que QUEREMOS que se guarden obligatoriamente
const urlsToCache = [
  './',
  './index.html',
  // CSS (Basado en tus carpetas)
  './css/estilos.css',
  './css/normalize.css',
  // JS (Basado en tus carpetas)
  './js/menu.js',
  './js/questions.js',
  './js/slider.js',
  // Imagenes (Asegurate que el nombre coincida)
  './logo_bernal.png',
  // AUDIOS (Extraídos de tu HTML)
  './00 Musica de Sala.mp3',
  './01 primera llamada Las Leyendas.mp3',
  './02 Musica de Sala.mp3',
  './03 Segunda llamada Las Leyendas.mp3',
  './04 Musica de Sala.mp3',
  './05 Tercera llamada Las Leyendas.mp3',
  './06 Suspenso entrada Viejita.mp3',
  './07 CHAN CHAN CHAAAN.mp3',
  './08 MUSICA AMOR TELENOVELA.mp3',
  './09 MUSICA DRAMATIC OK.mp4',  
  './09 audio musica funebre.mp3',
  './17 Banda Sonora de miedo LEYENDAS BERNAL.mp3',
  './11 Camino hacia el terror.mp3',
  './12 Efecto de Cuervos.mp3',
  './13 MUSICA DIVINA, TENSION Y AGUA.mp3',
  './14 Musica para AGRADECER.mp3',
  './16 ENYA MUSICA FINAL EPICA.mp3'
];

// 1. INSTALACIÓN: Al entrar a la web, descargamos todo
self.addEventListener('install', event => {
  console.log('Abriendo caché y guardando audios...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.error('Error al guardar en caché:', err))
  );
});

// 2. ACTIVACIÓN: Limpiamos cachés viejas si cambias la versión
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 3. INTERCEPTAR PETICIONES: Si pide un archivo, miramos primero en la caché
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si está en caché, lo devolvemos (Modo Offline)
        if (response) {
          return response;
        }
        // Si no, intentamos buscarlo en internet
        return fetch(event.request);
      })
  );
});
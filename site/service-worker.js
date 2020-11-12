
let cache_cont= "ver_2";
const shell_files=[
	"/",
	"/index.html",
	"/figura.html",
	"/js/script.js",
	"/css/estilo.css",
	"/bases/lista-imgs.json",
	"/favicon.ico",
	"/images/twitter.png",
	"/images/whatsapp.png",
	"/images/photo.png"
]




// Always updating i.e latest version available...
self.addEventListener('install', (event) => {
	self.skipWaiting();
	console.log("Latest version installed!");
});

self.addEventListener('fetch', (event) => {
	event.respondWith(caches.open(cache_cont).then((cache) => {
		return cache.match(event.request).then((response) => {
			console.log("cache request: " + event.request.url);
			var fetchPromise = fetch(event.request).then((networkResponse) => {           
		// Update the cache...                   
				console.log("fetch completed: " + event.request.url, networkResponse);
				if (networkResponse) {
					console.debug("updated cached page: " + event.request.url, networkResponse);
					cache.put(event.request, networkResponse.clone());}
					return networkResponse;
				}, event => {   
// Rejected promise - just ignore it, we're offline...  
					console.log("Error in fetch()", event);
					event.waitUntil(
// Name the *cache* in the caches.open()...
						caches.open(cache_cont).then((cache) => { 
// Take a list of URLs, then fetch them from the server and add the response to the cache...
							return cache.addAll(shell_files
/*

							[ 
								'/index.html', 
								'/css/estilo.css', 
								'/js/script.js', 
								'/images/*',
								'/gravuras/*',
								"/" ,
								"/figura.html"     
							]
						*/
							);
						})
					);
				});
	// Respond from the cache, or the network...
			return response || fetchPromise;
			});
		})
	);
});






/*
self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
    	caches.open(cache_cont).then((cache) => {
    		console.log('[Service Worker] Caching all: app shell and content');
    		return cache.addAll(shell_files);
    	})
    );
});

self.addEventListener('fetch', (e) => {
    console.log('[Service Worker] Fetched resource '+e.request.url);
	e.respondWith(
		caches.match(e.request).then((r) => {
			console.log('[Service Worker] Fetching resource: '+e.request.url);
			return r || fetch(e.request).then((response) => {
				return caches.open(cache_cont).then((cache) => {
					console.log('[Service Worker] Caching new resource: '+e.request.url);
					cache.put(e.request, response.clone());
					return response;
		       });
			});
		})
	 );
});
*/
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
          return Promise.all(keyList.map((key) => {
        if(key !== cache_cont) {
          return caches.delete(key);
        }
      })

      );
    })
  );
});



/*
// Always updating i.e latest version available...
self.addEventListener('install', (event) => {
    self.skipWaiting();
    console.log("Latest version installed!");
});
*/

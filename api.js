// Kutipan
export function ambilKutipan() {
    return fetch("https://dummyjson.com/quotes/random")
        .then(res => {
            if (!res.ok) {
                throw new Error("Gagal mengambil kutipan saat ini.");
            }

            return res.json();
        });
}

// Cuaca Open-Meteo
export function ambilCuaca(namaKota) {
    const geoUrl =
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(namaKota)}&count=1&language=id&format=json`;

    return fetch(geoUrl)
        .then(res => res.json())
        .then(geoData => {
            if (!geoData.results || geoData.results.length === 0) {
                throw new Error(`Kota '${namaKota}' yang anda cari tidak ditemukan.`);
            }

            const lokasi = geoData.results[0];

            const weatherUrl =
                `https://api.open-meteo.com/v1/forecast?latitude=${lokasi.latitude}&longitude=${lokasi.longitude}&current_weather=true`;

            return fetch(weatherUrl)
                .then(res => res.json())
                .then(data => ({
                    lokasi: lokasi,
                    cuaca: data.current_weather
                }));
        });
}
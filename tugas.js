// Minggu 15 - Module Tugas

export function tambahTugas(daftar, nama) {
    return [
        ...daftar,
        {
            id: Date.now(),
            nama: nama.trim(),
            selesai: false
        }
    ];
}

export function hapusTugas(daftar, id) {
    return daftar.filter(tugas => tugas.id !== id);
}

export function toggleSelesai(daftar, id) {
    return daftar.map(tugas =>
        tugas.id === id ?
        {...tugas, selesai: !tugas.selesai } :
        tugas
    );
}

export function editTugas(daftar, id, namaBaru) {
    return daftar.map(tugas =>
        tugas.id === id ?
        {...tugas, nama: namaBaru.trim() } :
        tugas
    );
}
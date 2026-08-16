// Minggu 15 - Module Catatan

export function tambahCatatan(daftar, isi) {
    return [
        ...daftar,
        {
            id: Date.now(),
            isi: isi.trim(),
            tanggal: new Date().toLocaleDateString("id-ID")
        }
    ];
}

export function hapusCatatan(daftar, id) {
    return daftar.filter(catatan => catatan.id !== id);
}

export function editCatatan(daftar, id, isiBaru) {
    return daftar.map(catatan =>
        catatan.id === id ?
        {
            ...catatan,
            isi: isiBaru.trim(),
            tanggal: new Date().toLocaleDateString("id-ID")
        } :
        catatan
    );
}
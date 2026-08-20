import {
    tambahTugas,
    hapusTugas,
    toggleSelesai,
    editTugas
} from "./tugas.js";
import {
    tambahCatatan,
    hapusCatatan,
    editCatatan
} from "./catatan.js";
import {
    simpanKeStorage,
    muatDariStorage
} from "./storage.js";
import {
    ambilKutipan,
    ambilCuaca
} from "./api.js";

// Minggu 1
console.log("DailyBoard siap dijalankan!");
document.addEventListener("DOMContentLoaded", function() {
    const app = document.getElementById("app");

    const headerTop = document.createElement("div");
    headerTop.className = "header-top";
    headerTop.innerHTML = `
    <h2 style="color: var(--primary)">Selamat datang di DailyBoard!</h2>
    <button id="toggle-tema">Ganti Tema</button>
`;
    app.appendChild(headerTop);

    document.getElementById("toggle-tema").onclick = () => {
        const isDark = document.body.classList.toggle("dark-mode");
        localStorage.setItem("tema", isDark ? "gelap" : "terang");
    };
    if (localStorage.getItem("tema") === "gelap") document.body.classList.add("dark-mode");

    // Minggu 2 - Layout Section
    const secTugas = document.createElement("section");
    secTugas.id = "sec-tugas";
    secTugas.innerHTML = "<h3>Daftar Tugas</h3>";
    app.appendChild(secTugas);
    const secCatatan = document.createElement("section");
    secCatatan.id = "sec-catatan";
    secCatatan.innerHTML = "<h3>Catatan</h3>";
    app.appendChild(secCatatan);
    const secKutipan = document.createElement("section");
    secKutipan.id = "sec-kutipan";
    secKutipan.innerHTML = "<h3>Kutipan</h3>";
    app.appendChild(secKutipan);
    const secCuaca = document.createElement("section");
    secCuaca.id = "sec-cuaca";
    secCuaca.innerHTML = "<h3>Widget Cuaca</h3>";
    app.appendChild(secCuaca);

    // Data Tugas
    let daftarTugas = muatDariStorage("daftarTugas", [
        { id: 1, nama: "Belajar JavaScript", selesai: false },
        { id: 2, nama: "Olahraga pagi", selesai: false }
    ]);
    let filterAktif = "semua";

    // Validasi Input
    function validasiInput(nilai) {
        if (!nilai || nilai.trim() === "") {
            alert("Input tidak boleh kosong!");
            return false;
        }
        if (nilai.length > 100) {
            alert("Input maksimal 100 karakter!");
            return false;
        }
        return true;
    }

    // Minggu 3 - Form Input Tugas
    const inputTugas = document.createElement("input");
    inputTugas.type = "text";
    inputTugas.placeholder = "Masukkan nama tugas...";
    const tombolTambah = document.createElement("button");
    tombolTambah.textContent = "Tambah";
    secTugas.appendChild(inputTugas);
    secTugas.appendChild(tombolTambah);

    // Filter Tugas
    const divFilter = document.createElement("div");
    const btnSemua = document.createElement("button");
    btnSemua.textContent = "Semua";
    const btnSelesai = document.createElement("button");
    btnSelesai.textContent = "Selesai";
    const btnBelum = document.createElement("button");
    btnBelum.textContent = "Belum Selesai";
    divFilter.appendChild(btnSemua);
    divFilter.appendChild(btnSelesai);
    divFilter.appendChild(btnBelum);
    const listUl = document.createElement("ul");
    listUl.id = "daftar-tugas";
    secTugas.appendChild(divFilter);
    secTugas.appendChild(listUl);

    // Minggu 5 & 6 - Fungsi Tugas
    function renderTugas(dataVisual = daftarTugas) {
        listUl.innerHTML = "";
        const tersaring = dataVisual.filter(t => {
            if (filterAktif === "selesai") return t.selesai;
            if (filterAktif === "belum") return !t.selesai;
            return true;
        });

        tersaring.forEach((tugas, index) => {
            const li = document.createElement("li");
            li.className = "tugas-item";
            li.draggable = true;
            li.dataset.index = index;
            const spanNama = document.createElement("span");
            spanNama.textContent = tugas.nama;
            if (tugas.selesai) {
                spanNama.style.textDecoration = "line-through";
                spanNama.style.opacity = "0.6";
            }
            li.appendChild(spanNama);
            li.ondblclick = function() {
                const namaBaru =
                    prompt("Edit tugas:", tugas.nama);
                if (namaBaru !== null &&
                    validasiInput(namaBaru)) {

                    daftarTugas =
                        editTugas(
                            daftarTugas,
                            tugas.id,
                            namaBaru.trim());
                    simpanKeStorage(
                        "daftarTugas",
                        daftarTugas);
                    renderTugas();
                }
            };

            const divAksi = document.createElement("div");
            const btnToggle = document.createElement("button");
            btnToggle.textContent =
                tugas.selesai ? "Batal" : "Selesai";
            btnToggle.style.backgroundColor =
                tugas.selesai ? "#64748b" : "var(--primary)";

            btnToggle.onclick = function(e) {
                e.stopPropagation();
                daftarTugas =
                    toggleSelesai(
                        daftarTugas,
                        tugas.id);
                simpanKeStorage(
                    "daftarTugas",
                    daftarTugas);
                renderTugas();
            };
            const btnHapus = document.createElement("button");
            btnHapus.textContent = "Hapus";
            btnHapus.style.backgroundColor = "var(--danger)";
            btnHapus.onclick = function(e) {
                e.stopPropagation();
                daftarTugas =
                    hapusTugas(
                        daftarTugas,
                        tugas.id);
                simpanKeStorage(
                    "daftarTugas",
                    daftarTugas);
                renderTugas();
            };

            divAksi.appendChild(btnToggle);
            divAksi.appendChild(btnHapus);
            li.appendChild(divAksi);

            // Drag and Drop
            li.ondragstart = function(e) {
                e.dataTransfer.setData(
                    "text/plain",
                    index);
            };
            listUl.appendChild(li);
        });
    }
    listUl.ondragover = function(e) {
        e.preventDefault();
    };
    listUl.ondrop = function(e) {
        e.preventDefault();
        const srcIndex =
            e.dataTransfer.getData("text/plain");
        const target = e.target.closest("li");
        if (target && srcIndex !== "") {
            const destIndex = target.dataset.index;
            const movedItem =
                daftarTugas.splice(srcIndex, 1)[0];
            daftarTugas.splice(
                destIndex,
                0,
                movedItem);
            simpanKeStorage(
                "daftarTugas",
                daftarTugas);
            renderTugas();
        }
    };

    // Tombol Tambah
    tombolTambah.onclick = function() {
        if (!validasiInput(inputTugas.value)) return;
        daftarTugas =
            tambahTugas(
                daftarTugas,
                inputTugas.value.trim());
        simpanKeStorage(
            "daftarTugas",
            daftarTugas);
        renderTugas();
        inputTugas.value = "";
    };

    // Filter
    btnSemua.onclick = function() {
        filterAktif = "semua";
        renderTugas();
    };
    btnSelesai.onclick = function() {
        filterAktif = "selesai";
        renderTugas();
    };
    btnBelum.onclick = function() {
        filterAktif = "belum";
        renderTugas();
    };

    // Minggu 8 - Catatan
    let daftarCatatan =
        muatDariStorage("daftarCatatan", [{
            id: Date.now(),
            isi: "Catatan pertama saya (Double-click buat edit)",
            tanggal: new Date().toLocaleDateString("id-ID")
        }]);

    const txtCatatan = document.createElement("textarea");
    txtCatatan.placeholder = "Tulis catatan baru";
    const btnCatatan = document.createElement("button");
    btnCatatan.textContent = "Tambah Catatan";
    const divDaftarCatatan = document.createElement("div");
    divDaftarCatatan.id = "daftar-catatan";
    secCatatan.appendChild(txtCatatan);
    secCatatan.appendChild(btnCatatan);
    secCatatan.appendChild(divDaftarCatatan);

    function renderCatatan() {
        divDaftarCatatan.innerHTML = "";
        daftarCatatan.forEach(catatan => {
            const div = document.createElement("div");
            div.className = "catatan-item";
            const pIsi = document.createElement("p");
            pIsi.textContent = catatan.isi;
            const smallTanggal = document.createElement("small");
            smallTanggal.textContent = catatan.tanggal;

            div.ondblclick = function() {
                const isiBaru =
                    prompt("Edit catatan:", catatan.isi);
                if (isiBaru !== null &&
                    validasiInput(isiBaru)) {
                    daftarCatatan =
                        editCatatan(
                            daftarCatatan,
                            catatan.id,
                            isiBaru.trim());
                    simpanKeStorage(
                        "daftarCatatan",
                        daftarCatatan);
                    renderCatatan();
                }
            };
            const btnHapus = document.createElement("button");
            btnHapus.textContent = "Hapus";
            btnHapus.style.backgroundColor = "var(--danger)";

            btnHapus.onclick = function(e) {
                e.stopPropagation();
                daftarCatatan =
                    hapusCatatan(
                        daftarCatatan,
                        catatan.id);
                simpanKeStorage(
                    "daftarCatatan",
                    daftarCatatan);
                renderCatatan();
            };
            div.appendChild(pIsi);
            div.appendChild(smallTanggal);
            div.appendChild(btnHapus);
            divDaftarCatatan.appendChild(div);
        });
    }

    btnCatatan.onclick = function() {
        if (!validasiInput(txtCatatan.value)) return;
        daftarCatatan =
            tambahCatatan(
                daftarCatatan,
                txtCatatan.value.trim()
            );
        simpanKeStorage(
            "daftarCatatan",
            daftarCatatan
        );
        renderCatatan();
        txtCatatan.value = "";
    };

    // Minggu 10 - Kutipan
    const headerKutipan = document.createElement("div");
    headerKutipan.style.display = "flex";
    headerKutipan.style.justifyContent = "space-between";
    headerKutipan.style.alignItems = "center";
    headerKutipan.style.marginBottom = "10px";
    const judulKutipan = document.createElement("h3");
    judulKutipan.textContent = "Kutipan";
    const btnRefreshKutipan = document.createElement("button");
    btnRefreshKutipan.textContent = "Refresh";
    headerKutipan.appendChild(judulKutipan);
    headerKutipan.appendChild(btnRefreshKutipan);
    secKutipan.innerHTML = "";
    secKutipan.appendChild(headerKutipan);
    const elKutipan = document.createElement("p");
    elKutipan.style.fontStyle = "italic";
    const statusKutipan = document.createElement("small");
    statusKutipan.style.color = "var(--text-muted)";
    secKutipan.appendChild(elKutipan);
    secKutipan.appendChild(statusKutipan);

    function tampilkanKutipan() {
        statusKutipan.textContent = "Memuat kutipan...";
        ambilKutipan()
            .then(data => {
                elKutipan.textContent = `"${data.quote}" — ${data.author}`;
                statusKutipan.textContent = "";
            })
            .catch(err => {
                elKutipan.textContent = "Tidak dapat memuat kutipan saat ini.";
                statusKutipan.textContent = err.message;
            });
    }
    btnRefreshKutipan.onclick = function() {
        tampilkanKutipan();
    };
    // Minggu 11 - Cuaca
    const inputKota = document.createElement("input");
    inputKota.placeholder = "Masukkan nama kota...";
    const btnCariCuaca = document.createElement("button");
    btnCariCuaca.textContent = "Cari Cuaca";
    const divInfoCuaca = document.createElement("div");
    divInfoCuaca.style.marginTop = "10px";
    secCuaca.appendChild(inputKota);
    secCuaca.appendChild(btnCariCuaca);
    secCuaca.appendChild(divInfoCuaca);

    function tampilkanCuaca(namaKota) {
        divInfoCuaca.innerHTML =
            `<p>Memuat cuaca yang dicari <strong>${namaKota}</strong>...</p>`;
        ambilCuaca(namaKota)
            .then(data => {
                const c = data.cuaca;
                const lokasi = data.lokasi;
                divInfoCuaca.innerHTML = `
                    <div>
                        <h4 style="color: var(--primary);">
                             ${lokasi.name}, ${lokasi.country}
                        </h4>
                        <p> Suhu: ${c.temperature}°C</p>
                    </div>
                `;
            })
            .catch(err => {
                divInfoCuaca.innerHTML =
                    `<p style="color: var(--danger);">
                        ${err.message}
                    </p>`;
            });
    }
    btnCariCuaca.onclick = function() {
        const kota = inputKota.value.trim();
        if (kota !== "") {
            tampilkanCuaca(kota);
        }
    };

    // Minggu 12 - Promise.all
    function muatSemuaWidget() {
        return Promise.all([
            ambilKutipan(),
            ambilCuaca("Jakarta")
        ]).then(([kutipan, cuaca]) => {
            elKutipan.textContent =
                `"${kutipan.quote}" — ${kutipan.author}`;
            const c = cuaca.cuaca;
            const lokasi = cuaca.lokasi;
            divInfoCuaca.innerHTML = `
                <div>
                    <h4 style="color: var(--primary);">
                         ${lokasi.name}, ${lokasi.country}
                    </h4>
                    <p>Suhu: ${c.temperature}°C</p>
                </div>`;
            console.log("Semua widget API sudah berhasil dimuat.");
        });
    }

    // Pencarian Tugas
    const inputCari = document.createElement("input");
    inputCari.id = "cari-tugas";
    inputCari.type = "text";
    inputCari.placeholder = " Cari tugas anda";
    secTugas.insertBefore(inputCari, divFilter);

    // Minggu 16 - Debounce
    function debounce(fn, delay = 300) {
        let timer;
        return function(...args) {
            clearTimeout(timer);
            timer = setTimeout(
                () => fn.apply(this, args),
                delay);
        };
    }

    const cariTugasDebounced =
        debounce(function(kataKunci) {
            const hasil =
                daftarTugas.filter(t =>
                    t.nama
                    .toLowerCase()
                    .includes(kataKunci.toLowerCase())
                );
            renderTugas(hasil);
        }, 300);
    inputCari.oninput = function(e) {
        cariTugasDebounced(
            e.target.value.trim());
    };
    renderTugas();
    renderCatatan();
    muatSemuaWidget();
});
const grid = document.getElementById("grid");

let jadwal = JSON.parse(localStorage.getItem("jadwal")) || [];

function renderGrid() {
    grid.innerHTML = "";

    const days = ["", "Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
    const times = ["08:00", "10:00", "11:00", "13:00"];

    // HEADER
    days.forEach(day => {
        const div = document.createElement("div");
        div.className = "day";
        div.innerText = day;
        grid.appendChild(div);
    });

    // TIME + SLOT
    times.forEach((time, i) => {

        // JAM
        const timeDiv = document.createElement("div");
        timeDiv.className = "time";
        timeDiv.innerText = time;
        timeDiv.style.gridColumn = 1;
        timeDiv.style.gridRow = i + 2;
        grid.appendChild(timeDiv);

        // SLOT BACKGROUND
        for (let d = 1; d <= 5; d++) {
            const slot = document.createElement("div");
            slot.className = "slot";
            slot.style.gridColumn = d + 1;
            slot.style.gridRow = i + 2;
            grid.appendChild(slot);
        }
    });

    // JADWAL
    jadwal.forEach((j, index) => {
        const div = document.createElement("div");
        div.className = "class " + j.warna;

        div.style.gridColumn = parseInt(j.hari) + 1;
        div.style.gridRow = parseInt(j.jam) + 1;

        div.innerHTML = `
            ${j.matkul}
            <button onclick="hapusJadwal(${index})">✕</button>
        `;

        grid.appendChild(div);
    });
}

// MODAL
function openModal() {
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// TAMBAH
function tambahJadwal() {
    const matkul = document.getElementById("matkul").value;
    const hari = document.getElementById("hari").value;
    const jam = document.getElementById("jam").value;
    const warna = document.getElementById("warna").value;

    if (!matkul) return alert("Isi mata kuliah!");

    jadwal.push({ matkul, hari, jam, warna });
    localStorage.setItem("jadwal", JSON.stringify(jadwal));

    closeModal();
    renderGrid();
}

// HAPUS
function hapusJadwal(index) {
    jadwal.splice(index, 1);
    localStorage.setItem("jadwal", JSON.stringify(jadwal));
    renderGrid();
}

function backDashboard() {
    window.location.href = "dashboard.html";
}

function goDashboard() {
    window.location.href = "dashboard.html";
}

function goJadwal() {
    window.location.href = "jadwal.html";
}

function goRekap() {
    window.location.href = "rekap.html";
}

function goAgenda() {
    window.location.href = "agenda.html";
}
// INIT
renderGrid();
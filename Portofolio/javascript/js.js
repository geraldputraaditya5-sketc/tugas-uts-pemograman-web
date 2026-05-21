const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const profileForm = document.querySelector("#profileForm");

if (profileForm) {
  profileForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(profileForm);
    const params = new URLSearchParams();

    formData.forEach((value, key) => {
      params.set(key, value.toString().trim());
    });

    localStorage.setItem("profilMahasiswa", params.toString());
    window.location.href = `profil-tampil.html?${params.toString()}`;
  });
}

const resultList = document.querySelector("#profileResult");

if (resultList) {
  const fallback = new URLSearchParams(localStorage.getItem("profilMahasiswa") || "");
  const currentParams = new URLSearchParams(window.location.search || fallback.toString());
  const fields = [
    ["nama", "Nama Lengkap"],
    ["kampus", "Kampus"],
    ["jurusan", "Jurusan"],
    ["minat", "Minat"],
    ["email", "Email"],
    ["telepon", "No. Telepon"],
    ["alamat", "Alamat"],
    ["cerita", "Tentang Saya"]
  ];

  resultList.innerHTML = fields
    .map(([key, label]) => {
      const value = currentParams.get(key) || "-";
      return `<div><dt>${label}</dt><dd>${value}</dd></div>`;
    })
    .join("");
}

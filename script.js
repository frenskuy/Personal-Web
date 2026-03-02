// =================== JS KECIL UNTUK INTERAKSI ===================
// Menu mobile
const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');
menuBtn?.addEventListener('click', () => menu.classList.toggle('open'));

// Back to top
const topBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    topBtn.style.display = window.scrollY > 400 ? 'inline-flex' : 'none';
});
topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Form kontak: kirim via mailto (tanpa backend)
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const f = new FormData(this);
    const nama = encodeURIComponent(f.get('nama'));
    const email = encodeURIComponent(f.get('email'));
    const subjek = encodeURIComponent(f.get('subjek') || 'Pesan dari Portfolio');
    const pesan = encodeURIComponent(f.get('pesan'));
    const body = `Halo, saya ${decodeURIComponent(nama)} (%3C${email}%3E)\n\n${pesan}`;
    window.location.href = `mailto:frenkygilang@gmail.com?subject=${subjek}&body=${body}`;
    document.getElementById('status').textContent = 'Membuka aplikasi email kamu…';
});

// Modal Logic
const modal = document.getElementById("projectModal");
const closeBtn = document.querySelector(".close-modal");

document.querySelectorAll(".detail-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.getElementById("modalTitle").textContent = btn.dataset.title;
        document.getElementById("modalImg").src = btn.dataset.img;
        document.getElementById("modalDesc").innerHTML = btn.dataset.desc;

        const tagsContainer = document.getElementById("modalTags");
        tagsContainer.innerHTML = "";
        if (btn.dataset.tags) {
            btn.dataset.tags.split(",").forEach(tag => {
                const span = document.createElement("span");
                span.className = "tag";
                span.textContent = tag.trim();
                tagsContainer.appendChild(span);
            });
        }

        const linksContainer = document.getElementById("modalLinks");
        linksContainer.innerHTML = "";
        if (btn.dataset.link) {
            const a = document.createElement("a");
            a.className = "btn";
            a.href = btn.dataset.link;
            a.target = "_blank";
            a.innerHTML = `<i class="fa-solid fa-arrow-up-right-from-square"></i> Kunjungi Proyek Web`;
            linksContainer.appendChild(a);
        }

        modal.classList.add("show");
        document.body.style.overflow = "hidden"; // Prevent background scrolling
    });
});

closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
});
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("show");
        document.body.style.overflow = "auto";
    }
});

// =================== SCROLL REVEAL (Intersection Observer) ===================
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: observer.unobserve(entry.target); // If you want animation to happen only once
        }
    });
};

const revealOptions = {
    root: null, // viewport
    threshold: 0.15, // activate when 15% of element is visible
    rootMargin: "0px 0px -50px 0px" // offset to trigger slightly earlier
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Immediately trigger elements already in viewport on load
window.addEventListener('load', () => {
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('active');
        }
    });
});

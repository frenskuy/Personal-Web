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
    const subjek = encodeURIComponent(f.get('subjek') || 'Message from Portfolio');
    const pesan = encodeURIComponent(f.get('pesan'));
    const body = `Hello, I am ${decodeURIComponent(nama)} (%3C${email}%3E)\n\n${pesan}`;
    window.location.href = `mailto:frenkygilang@gmail.com?subject=${subjek}&body=${body}`;
    const lang = localStorage.getItem('lang') || 'en';
    document.getElementById('status').textContent = lang === 'id' ? 'Membuka aplikasi email kamu…' : 'Opening your email app…';
});

// Modal Logic
const modal = document.getElementById("projectModal");
const closeBtn = document.querySelector(".close-modal");

document.querySelectorAll(".detail-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const lang = localStorage.getItem('lang') || 'en';
        const title = lang === 'id' ? (btn.dataset.titleId || btn.dataset.title) : (btn.dataset.titleEn || btn.dataset.title);
        const desc = lang === 'id' ? (btn.dataset.descId || btn.dataset.desc) : (btn.dataset.descEn || btn.dataset.desc);

        document.getElementById("modalTitle").textContent = title;
        document.getElementById("modalImg").src = btn.dataset.img;
        document.getElementById("modalDesc").innerHTML = desc;

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
            a.innerHTML = `<i class="fa-solid fa-arrow-up-right-from-square"></i> ${lang === 'id' ? 'Kunjungi Proyek Web' : 'Visit Project'}`;
            linksContainer.appendChild(a);
        }

        modal.classList.add("show");
        document.body.style.overflow = "hidden";
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
        }
    });
};

const revealOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

window.addEventListener('load', () => {
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('active');
        }
    });
});

// =================== BILINGUAL SUPPORT ===================
const translations = {
    en: {
        // Navbar
        'nav.about': 'About',
        'nav.skills': 'Skills',
        'nav.experience': 'Experience',
        'nav.projects': 'Projects',
        'nav.services': 'Services',
        'nav.contact': 'Contact',

        // Hero
        'hero.tagline': 'DATA • MACHINE LEARNING',
        'hero.greeting': "Hi, I'm",
        'hero.headline': 'creating digital solutions driven by data.',
        'hero.sub': 'I focus on building machine learning models and creating informative, easy-to-understand data visualizations. Open to collaboration to bring innovative solutions tailored to your needs.',
        'hero.btn.projects': 'View Projects',
        'hero.btn.contact': 'Contact Me',

        // About
        'about.title': 'About Me',
        'about.p1': 'I am a developer focused on building <strong>Machine Learning</strong> and <strong>Deep Learning</strong> solutions (TensorFlow, PyTorch), as well as data processing and visualization using Python. With experience in academic projects and organizations, I am used to turning ideas into useful digital products.',
        'about.p2': 'I am currently conducting research on the integration of CNN and LLM in leaf health classification, aiming to support innovation in smart agriculture.',
        'about.cv': 'Download CV',
        'about.info.title': 'Quick Info',
        'about.info.location': 'Location',
        'about.info.email': 'Email',
        'about.info.status': 'Status',
        'about.info.statusVal': 'Available for freelance',
        'about.info.lang': 'Language',

        // Skills
        'skills.title': 'Technical Skills',

        // Experience
        'exp.title': 'Experience',
        'exp.psds.when': '2025 • Instructor & Mentor',
        'exp.psds.role': 'Mentor – Advanced Class PSDS 9.0',
        'exp.psds.desc': 'Guided participants through understanding and implementing Convolutional Neural Networks (CNN) from fundamentals to advanced topics. Curriculum covered 9 notebook modules: Data Augmentation, Convolutional Layer, Pooling Layer, Activation Function, Fully Connected Layer, Bias vs No Bias, Model Training, Training with Augmentation, and Model Evaluation.',
        'exp.psds.link': 'View Materials on GitHub',
        'exp.bangkit.when': '2024 • Independent Study',
        'exp.bangkit.role': 'Machine Learning Cohort at Bangkit Academy',
        'exp.bangkit.desc': 'Studied and implemented machine learning and deep learning in a capstone project. Developed a TensorFlow-based classification model and integrated it into a digital solution.',
        'exp.bem1.when': '2024 • Organizational Activity',
        'exp.bem1.role': 'Head of PSDM Department – BEM FAST',
        'exp.bem1.desc': 'Led the planning and execution of student development programs. Coordinated the team in training, soft skill enhancement, and strengthening organizational culture.',
        'exp.bem2.when': '2023 • Organizational Activity',
        'exp.bem2.role': 'Member of PSDM Department – BEM FAST',
        'exp.bem2.desc': 'Participated in designing and implementing work programs related to student development. Supported training, mentoring, and organizational capacity-building activities.',

        // Projects
        'projects.title': 'Recent Projects',
        'proj.btn.detail': 'Detail',
        'proj.btn.link': 'Live Demo',
        'proj.cnnllm.title': 'Hybrid CNN & LLM – Leaf Health Classification',
        'proj.cnnllm.desc': 'Integrating CNN for visual feature extraction from leaf images with LLM to generate natural language explanations of plant health classification results.',
        'proj.bike.title': 'Bike Rental Analysis',
        'proj.bike.desc': 'Exploration and analysis of bike rental data using Python to understand usage patterns, seasonal factors, and demand trends.',
        'proj.air.title': 'World Air Quality Dashboard',
        'proj.air.desc': 'Development of an interactive dashboard to monitor global air quality using machine learning and data visualization.',
        'proj.pet.title': 'Dog & Cat Classification',
        'proj.pet.desc': 'Building a deep learning model to classify images of dogs and cats using Vision Transformer (ViT).',
        'proj.spam.title': 'Spam Detection',
        'proj.spam.desc': 'Development of a Twitter spam detection system using LLM (IBM Granite) with interactive visualizations built with Streamlit.',
        'proj.cnnopt.title': 'All CNN Optimizer Study',
        'proj.cnnopt.desc': 'Comparative evaluation of 6 CNN architectures x 4 optimizers for leukemia (ALL) detection. Xception + RMSprop achieves 99.69% accuracy.',

        // Services
        'services.title': 'Services',
        'services.data.title': 'Data & Dashboard',
        'services.data.desc': 'Providing in-depth data analysis, development of interactive dashboards, and informative data visualizations that are easy to understand.',
        'services.ml.title': 'ML Prototyping',
        'services.ml.desc': 'Building Machine Learning model prototypes for classification or prediction needs, as the initial stage of AI-based solution development.',

        // Contact
        'contact.title': 'Contact',
        'contact.sub': 'Interested in collaborating or discussing further? Feel free to reach out via the form, or directly through the contact details below.',
        'contact.form.name': 'Full Name',
        'contact.form.email': 'Email Address',
        'contact.form.subject': 'Subject',
        'contact.form.message': 'Your Message',
        'contact.form.send': 'Send Message',

        // Frameworks
        'fw.title': 'Frameworks & Tools',

        // Footer
        'footer.quote': '"Building technology with heart, for a better future. Continuously learning and creating meaningful solutions through data."',
    },

    id: {
        // Navbar
        'nav.about': 'Tentang',
        'nav.skills': 'Skills',
        'nav.experience': 'Pengalaman',
        'nav.projects': 'Proyek',
        'nav.services': 'Layanan',
        'nav.contact': 'Kontak',

        // Hero
        'hero.tagline': 'DATA • MACHINE LEARNING',
        'hero.greeting': 'Halo, saya',
        'hero.headline': 'menciptakan solusi digital berbasis data.',
        'hero.sub': 'Saya berfokus pada pengembangan model machine learning serta visualisasi data yang informatif dan mudah dipahami. Terbuka untuk kolaborasi dalam mewujudkan solusi inovatif sesuai kebutuhan Anda.',
        'hero.btn.projects': 'Lihat Proyek',
        'hero.btn.contact': 'Hubungi Saya',

        // About
        'about.title': 'Tentang Saya',
        'about.p1': 'Saya adalah seorang pengembang yang berfokus pada pengembangan solusi berbasis <strong>Machine Learning</strong> dan <strong>Deep Learning</strong> (TensorFlow, PyTorch), serta pengolahan dan visualisasi <strong>data</strong> menggunakan Python. Memiliki pengalaman dalam organisasi maupun proyek akademik, saya terbiasa mengubah ide menjadi produk digital yang bermanfaat.',
        'about.p2': 'Saat ini, saya tengah melakukan penelitian mengenai integrasi CNN dan LLM dalam klasifikasi kesehatan daun, dengan tujuan mendukung inovasi di bidang pertanian cerdas.',
        'about.cv': 'Unduh CV',
        'about.info.title': 'Info Singkat',
        'about.info.location': 'Lokasi',
        'about.info.email': 'Email',
        'about.info.status': 'Status',
        'about.info.statusVal': 'Available for freelance',
        'about.info.lang': 'Bahasa',

        // Skills
        'skills.title': 'Keterampilan Teknis',

        // Experience
        'exp.title': 'Pengalaman',
        'exp.psds.when': '2025 • Pengajar & Mentor',
        'exp.psds.role': 'Mentor Kelas Mahir PSDS 9.0',
        'exp.psds.desc': 'Membimbing peserta kelas mahir dalam memahami dan mengimplementasikan Convolutional Neural Network (CNN) dari dasar hingga tingkat lanjut. Materi mencakup 9 modul notebook: Data Augmentation, Convolutional Layer, Pooling Layer, Activation Function, Fully Connected Layer, Bias vs No Bias, Training Model, Training dengan Augmentation, dan Model Evaluation.',
        'exp.psds.link': 'Lihat Materi di GitHub',
        'exp.bangkit.when': '2024 • Studi Independent',
        'exp.bangkit.role': 'Machine Learning Cohort at Bangkit Academy',
        'exp.bangkit.desc': 'Mempelajari dan mengimplementasikan machine learning dan deep learning dalam proyek capstone. Mengembangkan model klasifikasi berbasis TensorFlow dan mengintegrasikan ke dalam solusi digital.',
        'exp.bem1.when': '2024 • Kegiatan Organisasi',
        'exp.bem1.role': 'Ketua Departemen PSDM BEM FAST',
        'exp.bem1.desc': 'Memimpin perencanaan dan pelaksanaan program pengembangan sumber daya mahasiswa. Mengkoordinasikan tim dalam pelatihan, peningkatan soft skills, serta penguatan budaya organisasi.',
        'exp.bem2.when': '2023 • Kegiatan Organisasi',
        'exp.bem2.role': 'Anggota Departemen PSDM BEM FAST',
        'exp.bem2.desc': 'Berpartisipasi dalam merancang dan melaksanakan program kerja terkait pengembangan mahasiswa. Mendukung kegiatan pelatihan, mentoring, dan peningkatan kapasitas organisasi.',

        // Projects
        'projects.title': 'Proyek Terkini',
        'proj.btn.detail': 'Detail',
        'proj.btn.link': 'Link Web',
        'proj.cnnllm.title': 'Hybrid CNN & LLM – Klasifikasi Kesehatan Daun',
        'proj.cnnllm.desc': 'Integrasi CNN untuk ekstraksi fitur visual citra daun dengan LLM untuk menghasilkan penjelasan natural language atas hasil klasifikasi kesehatan tanaman.',
        'proj.bike.title': 'Analisis Penyewaan Sepeda',
        'proj.bike.desc': 'Eksplorasi dan analisis data penyewaan sepeda menggunakan Python untuk memahami pola penggunaan, faktor musiman, dan tren permintaan.',
        'proj.air.title': 'Dashboard Analisis Kualitas Udara Dunia',
        'proj.air.desc': 'Pengembangan dashboard interaktif untuk memantau kualitas udara global menggunakan machine learning dan visualisasi data.',
        'proj.pet.title': 'Klasifikasi Anjing dan Kucing',
        'proj.pet.desc': 'Pembuatan model deep learning untuk mengklasifikasikan citra anjing dan kucing menggunakan Vision Transformer (ViT).',
        'proj.spam.title': 'Spam Detection',
        'proj.spam.desc': 'Pengembangan sistem deteksi spam pada Twitter menggunakan LLM (IBM Granite) dan visualisasi interaktif dengan Streamlit.',
        'proj.cnnopt.title': 'Studi Optimizer CNN untuk Klasifikasi ALL',
        'proj.cnnopt.desc': 'Evaluasi komparatif 6 arsitektur CNN x 4 optimizer untuk deteksi leukemia (ALL). Xception + RMSprop mencapai akurasi 99.69%.',

        // Services
        'services.title': 'Layanan',
        'services.data.title': 'Data & Dashboard',
        'services.data.desc': 'Menyediakan layanan analisis data mendalam, pengembangan dashboard interaktif, serta visualisasi data yang informatif dan mudah dipahami.',
        'services.ml.title': 'ML Prototyping',
        'services.ml.desc': 'Membangun prototipe model Machine Learning untuk kebutuhan klasifikasi maupun prediksi, sebagai tahap awal pengembangan solusi berbasis AI.',

        // Contact
        'contact.title': 'Kontak',
        'contact.sub': 'Tertarik untuk berkolaborasi atau berdiskusi lebih lanjut? Silakan hubungi saya melalui formulir di samping, atau langsung melalui detail kontak berikut.',
        'contact.form.name': 'Nama Lengkap',
        'contact.form.email': 'Alamat Email',
        'contact.form.subject': 'Subjek',
        'contact.form.message': 'Pesan Anda',
        'contact.form.send': 'Kirim Pesan',

        // Frameworks
        'fw.title': 'Framework & Tool',

        // Footer
        'footer.quote': '"Membangun teknologi dengan hati, untuk masa depan yang lebih baik. Terus belajar dan menciptakan solusi bermakna melalui data."',
    }
};

function setLanguage(lang) {
    // Update all data-i18n text elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key] !== undefined) {
            el.innerHTML = translations[lang][key];
        }
    });

    // Update placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key] !== undefined) {
            el.placeholder = translations[lang][key];
        }
    });

    // Update html lang attribute
    document.documentElement.lang = lang;

    // Update toggle button label
    const toggleBtn = document.getElementById('langToggle');
    if (toggleBtn) {
        toggleBtn.textContent = lang === 'en' ? '🌐 EN' : '🌐 ID';
    }

    // Persist choice
    localStorage.setItem('lang', lang);
}

// Language toggle button
document.getElementById('langToggle')?.addEventListener('click', () => {
    const current = localStorage.getItem('lang') || 'en';
    setLanguage(current === 'en' ? 'id' : 'en');
});

// Initialize on load — default to English
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('lang') || 'en';
    setLanguage(savedLang);
});

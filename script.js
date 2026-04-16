/* ============================================
   GEETANJALI COLLEGE EVENT MANAGEMENT
   Core JavaScript
   ============================================ */

// ===== AUTHENTICATION CHECK =====
(function checkStudentAuth() {
  const page = document.body.dataset.page;
  if (page === 'admin') return;
  const isLoggedIn = sessionStorage.getItem('gcet_student_logged_in');
  if (isLoggedIn !== 'true') {
    window.location.href = 'login.html';
    return;
  }
})();

function studentLogout() {
  sessionStorage.removeItem('gcet_student_logged_in');
  sessionStorage.removeItem('gcet_student_roll');
  sessionStorage.removeItem('gcet_student_email');
  window.location.href = 'login.html';
}

// ===== DEFAULT EVENT DATA =====
const DEFAULT_EVENTS = [
  {
    id: 1,
    name: "TechVista 2026 — Annual Tech Conference",
    category: "Tech",
    date: "2026-03-25",
    time: "09:00 AM - 05:00 PM",
    location: "Main Auditorium, GCET",
    image: "assets/tech_conference.png",
    description: "Join us for TechVista 2026 — our flagship annual technology conference featuring keynote speakers from top tech companies, hands-on tech demos, panel discussions on AI, ML, and cybersecurity, plus an exciting project showcase. A must-attend event for every aspiring engineer!",
    importance: "Enhances technical knowledge and provides exposure to cutting-edge industry trends. Networking opportunities with professionals and alumni.",
    prize: "₹25,000",
    deadline: "2026-03-22",
    certificate: true,
    status: "active",
    tickets: 200,
    link: ""
  },
  {
    id: 2,
    name: "Sargam — Cultural Fest 2026",
    category: "Cultural",
    date: "2026-04-05",
    time: "10:00 AM - 09:00 PM",
    location: "Open Air Theatre, GCET",
    image: "assets/cultural_fest.png",
    description: "Sargam is GCET's vibrant cultural extravaganza featuring music, dance, drama, fashion show, singing competitions, stand-up comedy, and much more! Celebrate art and culture with fellow students in an unforgettable evening of entertainment.",
    importance: "Develops teamwork, stage confidence, and creative expression. Great platform to showcase hidden talents and build lifelong memories.",
    prize: "₹30,000",
    deadline: "2026-04-01",
    certificate: true,
    status: "active",
    tickets: 500,
    link: ""
  },
  {
    id: 3,
    name: "CodeStorm — 24-Hour Hackathon",
    category: "Tech",
    date: "2026-04-12",
    time: "06:00 PM (24 Hrs)",
    location: "Computer Lab Block, GCET",
    image: "assets/hackathon.png",
    description: "CodeStorm is an intense 24-hour hackathon where teams of 3–4 build innovative solutions to real-world problems. Compete with the brightest minds, get mentored by industry experts, and win exciting prizes. Domains include HealthTech, EdTech, FinTech, and Sustainability.",
    importance: "Builds problem-solving, coding, and collaboration skills under pressure. Industry exposure and internship opportunities for top performers.",
    prize: "₹50,000",
    deadline: "2026-04-08",
    certificate: true,
    status: "upcoming",
    tickets: 120,
    link: ""
  },
  {
    id: 4,
    name: "IoT & Robotics Workshop",
    category: "Workshop",
    date: "2026-03-30",
    time: "10:00 AM - 04:00 PM",
    location: "Electronics Lab, GCET",
    image: "assets/workshop.png",
    description: "A hands-on workshop on Internet of Things (IoT) and Robotics! Learn to build smart devices using Arduino and Raspberry Pi, design sensor-based systems, and build a line-following robot. All components and kits will be provided.",
    importance: "Practical experience with embedded systems and robotics. Valuable skill-building for placements and higher studies.",
    prize: "₹10,000",
    deadline: "2026-03-27",
    certificate: true,
    status: "active",
    tickets: 60,
    link: ""
  },
  {
    id: 5,
    name: "Annual Sports Meet — Khel Mahakumbh",
    category: "Sports",
    date: "2026-04-20",
    time: "07:00 AM - 06:00 PM",
    location: "Sports Ground, GCET",
    image: "assets/sports.png",
    description: "The annual inter-department sports extravaganza! Events include cricket, basketball, football, badminton, athletics, tug-of-war, and more. Compete for glory and bring laurels to your department. Open to all students.",
    importance: "Promotes physical fitness, sportsmanship, and team spirit. Winning teams represent GCET at inter-college tournaments.",
    prize: "₹20,000 + Trophies",
    deadline: "2026-04-15",
    certificate: true,
    status: "upcoming",
    tickets: 400,
    link: ""
  },
  {
    id: 6,
    name: "AI in Healthcare — Expert Webinar",
    category: "Webinar",
    date: "2026-03-18",
    time: "02:00 PM - 04:00 PM",
    location: "Online (Zoom) + Seminar Hall",
    image: "assets/webinar.png",
    description: "Join an expert-led webinar on 'Artificial Intelligence in Healthcare' featuring Dr. Priya Sharma, AI Lead at MedTech Solutions. Learn how AI is transforming diagnostics, drug discovery, and patient care. Q&A session and e-certificates for all participants.",
    importance: "Exposure to real-world AI applications. Enhances understanding of interdisciplinary innovation and career opportunities in AI.",
    prize: "Free Entry",
    deadline: "2026-03-16",
    certificate: true,
    status: "active",
    tickets: 300,
    link: ""
  }
];

// ===== DEFAULT GALLERY DATA =====
const DEFAULT_GALLERY = [
  { id: 1, title: 'TechVista 2025 — Annual Tech Conference', category: 'tech', image: 'assets/tech_conference.png' },
  { id: 2, title: 'Sargam Cultural Fest — Dance Performances', category: 'cultural', image: 'assets/cultural_fest.png' },
  { id: 3, title: 'CodeStorm Hackathon — 24 Hours of Coding', category: 'tech', image: 'assets/hackathon.png' },
  { id: 4, title: 'IoT & Robotics Workshop — Hands-on Session', category: 'workshop', image: 'assets/workshop.png' },
  { id: 5, title: 'Khel Mahakumbh 2025 — Annual Sports Meet', category: 'sports', image: 'assets/sports.png' },
  { id: 6, title: 'AI in Healthcare — Expert Webinar', category: 'tech', image: 'assets/webinar.png' },
  { id: 7, title: 'Sargam 2025 — Fashion Show Highlights', category: 'cultural', image: 'assets/cultural_fest.png' },
  { id: 8, title: 'Inter-College Coding Competition', category: 'tech', image: 'assets/hackathon.png' },
  { id: 9, title: 'Machine Learning Workshop', category: 'workshop', image: 'assets/workshop.png' }
];

// ===== DATA MANAGEMENT =====
function initializeData() {
  if (!localStorage.getItem('gcet_events')) {
    localStorage.setItem('gcet_events', JSON.stringify(DEFAULT_EVENTS));
  }
  if (!localStorage.getItem('gcet_registrations')) {
    localStorage.setItem('gcet_registrations', JSON.stringify([]));
  }
  if (!localStorage.getItem('gcet_gallery')) {
    localStorage.setItem('gcet_gallery', JSON.stringify(DEFAULT_GALLERY));
  }
}

function getGallery() {
  return JSON.parse(localStorage.getItem('gcet_gallery')) || DEFAULT_GALLERY;
}

function saveGallery(gallery) {
  localStorage.setItem('gcet_gallery', JSON.stringify(gallery));
}

function getEvents() {
  return JSON.parse(localStorage.getItem('gcet_events')) || DEFAULT_EVENTS;
}

function getRegistrations() {
  return JSON.parse(localStorage.getItem('gcet_registrations')) || [];
}

function saveEvents(events) {
  localStorage.setItem('gcet_events', JSON.stringify(events));
}

function saveRegistrations(registrations) {
  localStorage.setItem('gcet_registrations', JSON.stringify(registrations));
}

// ===== NAVIGATION =====
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Add logged-in user info and logout to nav
  const page = document.body.dataset.page;
  if (page !== 'admin' && navLinks) {
    const studentRoll = sessionStorage.getItem('gcet_student_roll');
    if (studentRoll) {
      const userEl = document.createElement('div');
      userEl.style.cssText = 'display:flex;align-items:center;gap:8px;margin-left:5px;';
      userEl.innerHTML = `
        <span style="color:var(--gold);font-size:0.8rem;font-weight:500;">👤 ${studentRoll}</span>
        <button onclick="studentLogout()" class="btn btn-sm btn-danger" style="font-size:0.75rem;padding:5px 12px;">Logout</button>
      `;
      navLinks.appendChild(userEl);
    }
  }

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
      backToTop.classList.toggle('visible', window.scrollY > 300);
    }
  });

  // Mobile toggle
  if (toggle) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in, .slide-left, .slide-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  elements.forEach(el => observer.observe(el));
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-count'));
        const suffix = entry.target.getAttribute('data-suffix') || '';
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) { current = target; clearInterval(timer); }
          entry.target.textContent = Math.floor(current) + suffix;
        }, 16);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(counter => observer.observe(counter));
}

// ===== BACK TO TOP =====
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (btn) {
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// ===== UTILITY =====
function formatDate(dateStr) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString('en-IN', options);
}

// ===== REGISTRATION COUNT HELPERS =====
function getEventRegistrationCount(eventId) {
  return getRegistrations().filter(r => r.eventId === eventId).length;
}

function getSpotsInfo(event) {
  const registered = getEventRegistrationCount(event.id);
  const total = event.tickets || 100;
  const spotsLeft = Math.max(0, total - registered);
  const percentage = Math.min(100, (registered / total) * 100);
  const barColor = percentage >= 90 ? 'var(--danger)' : percentage >= 60 ? 'var(--warning)' : 'var(--success)';
  return { registered, total, spotsLeft, percentage, barColor };
}

// ===== EVENT RENDERING (EVENTS PAGE) =====
function renderEventCards(containerId, filterCategory = 'all') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const events = getEvents();
  const filtered = filterCategory === 'all'
    ? events
    : events.filter(e => e.category.toLowerCase() === filterCategory.toLowerCase());

  if (filtered.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:60px 20px;">
      <p style="font-size:1.2rem; color:var(--medium-gray);">No events found in this category.</p></div>`;
    return;
  }

  container.innerHTML = filtered.map(event => {
    const spots = getSpotsInfo(event);
    return `
    <div class="event-card fade-in" data-category="${event.category}">
      <div class="event-card-img">
        <img src="${event.image}" alt="${event.name}" loading="lazy">
        <span class="badge badge-${event.status}">${event.status}</span>
        ${event.certificate ? '<span class="badge badge-certificate">🏆 Certificate</span>' : ''}
      </div>
      <div class="event-card-body">
        <h3>${event.name}</h3>
        <div class="event-meta">
          <span><i>📅</i> ${formatDate(event.date)}</span>
          <span><i>🕐</i> ${event.time}</span>
          <span><i>📍</i> ${event.location}</span>
          <span><i>⏰</i> Deadline: ${formatDate(event.deadline)}</span>
        </div>
        <p class="description">${event.description}</p>
        <div style="margin-bottom: 12px;">
          <strong style="color: var(--gold); font-size: 0.85rem;">Why Attend:</strong>
          <p style="font-size: 0.82rem; color: var(--medium-gray); margin-top: 4px;">${event.importance}</p>
        </div>
        ${event.link ? `<a href="${event.link}" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; gap: 6px; font-size: 0.82rem; color: var(--gold); margin-bottom: 12px; font-weight: 500;">🔗 Event Link ↗</a>` : ''}
        <div style="margin-bottom: 8px;">
          <div style="display: flex; justify-content: space-between; font-size: 0.82rem; margin-bottom: 6px;">
            <span style="color: var(--info);">👥 ${spots.registered} Registered</span>
            <span style="color: ${spots.spotsLeft <= 10 ? 'var(--danger)' : 'var(--success)'}; font-weight: 600;">${spots.spotsLeft} Spots Left</span>
          </div>
          <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
            <div style="width: ${spots.percentage}%; height: 100%; background: ${spots.barColor}; border-radius: 3px; transition: width 0.5s ease;"></div>
          </div>
          <p style="font-size: 0.72rem; color: var(--medium-gray); margin-top: 4px; text-align: right;">${spots.registered} / ${spots.total} seats filled</p>
        </div>
      </div>
      <div class="event-card-footer">
        <span class="event-prize">🏅 ${event.prize}</span>
        ${spots.spotsLeft > 0 ? `<a href="register.html?event=${event.id}" class="btn btn-primary btn-sm">Register Now</a>` : '<span class="badge badge-closed">Full</span>'}
      </div>
    </div>`;
  }).join('');

  initScrollAnimations();
}

// ===== FEATURED EVENTS (HOME PAGE) =====
function renderFeaturedEvents(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const events = getEvents().filter(e => e.status === 'active').slice(0, 3);

  container.innerHTML = events.map(event => {
    const spots = getSpotsInfo(event);
    return `
    <div class="event-card fade-in">
      <div class="event-card-img">
        <img src="${event.image}" alt="${event.name}" loading="lazy">
        <span class="badge badge-${event.status}">${event.status}</span>
        ${event.certificate ? '<span class="badge badge-certificate">🏆 Certificate</span>' : ''}
      </div>
      <div class="event-card-body">
        <h3>${event.name}</h3>
        <div class="event-meta">
          <span><i>📅</i> ${formatDate(event.date)}</span>
          <span><i>📍</i> ${event.location}</span>
          <span><i>⏰</i> Deadline: ${formatDate(event.deadline)}</span>
        </div>
        <p class="description">${event.description}</p>
        ${event.link ? `<a href="${event.link}" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; gap: 6px; font-size: 0.82rem; color: var(--gold); margin-bottom: 8px; font-weight: 500;">🔗 Event Link ↗</a>` : ''}
        <div style="margin-top: 10px;">
          <div style="display: flex; justify-content: space-between; font-size: 0.82rem; margin-bottom: 6px;">
            <span style="color: var(--info);">👥 ${spots.registered} Registered</span>
            <span style="color: ${spots.spotsLeft <= 10 ? 'var(--danger)' : 'var(--success)'}; font-weight: 600;">${spots.spotsLeft} Spots Left</span>
          </div>
          <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
            <div style="width: ${spots.percentage}%; height: 100%; background: ${spots.barColor}; border-radius: 3px;"></div>
          </div>
        </div>
      </div>
      <div class="event-card-footer">
        <span class="event-prize">🏅 ${event.prize}</span>
        ${spots.spotsLeft > 0 ? `<a href="register.html?event=${event.id}" class="btn btn-primary btn-sm">Register Now</a>` : '<span class="badge badge-closed">Full</span>'}
      </div>
    </div>`;
  }).join('');

  initScrollAnimations();
}

// ===== FILTER TABS =====
function initFilterTabs() {
  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderEventCards('events-grid', tab.dataset.category);
    });
  });
}

// ===== REGISTRATION FORM =====
function initRegistrationForm() {
  const form = document.getElementById('registration-form');
  if (!form) return;

  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get('event');
  if (eventId) {
    const eventSelect = document.getElementById('event-select');
    if (eventSelect) eventSelect.value = eventId;
  }

  // Pre-fill with logged-in student data
  const studentEmail = sessionStorage.getItem('gcet_student_email');
  const studentRoll = sessionStorage.getItem('gcet_student_roll');
  const emailField = form.querySelector('[name="email"]');
  const rollField = form.querySelector('[name="rollNumber"]');
  if (emailField && studentEmail) emailField.value = studentEmail;
  if (rollField && studentRoll) rollField.value = studentRoll;

  populateEventDropdown();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm(form)) submitRegistration(form);
  });
}

function populateEventDropdown() {
  const select = document.getElementById('event-select');
  if (!select) return;

  const events = getEvents().filter(e => e.status !== 'closed');
  select.innerHTML = '<option value="">-- Select an Event --</option>';
  events.forEach(event => {
    const option = document.createElement('option');
    option.value = event.id;
    option.textContent = `${event.name} (${formatDate(event.date)})`;
    select.appendChild(option);
  });

  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get('event');
  if (eventId) select.value = eventId;
}

function validateForm(form) {
  let isValid = true;
  const fields = form.querySelectorAll('[required]');
  fields.forEach(field => {
    const group = field.closest('.form-group');
    if (!field.value.trim()) {
      group.classList.add('error');
      isValid = false;
    } else {
      group.classList.remove('error');
    }
    if (field.type === 'email' && field.value) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
        group.classList.add('error');
        isValid = false;
      }
    }
    if (field.type === 'tel' && field.value) {
      if (!/^[0-9]{10}$/.test(field.value.replace(/\D/g, ''))) {
        group.classList.add('error');
        isValid = false;
      }
    }
  });
  return isValid;
}

function submitRegistration(form) {
  const formData = new FormData(form);
  const registration = {
    id: Date.now(),
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    rollNumber: formData.get('rollNumber'),
    year: formData.get('year'),
    section: formData.get('section'),
    eventId: parseInt(formData.get('event')),
    tickets: parseInt(formData.get('tickets')) || 1,
    registeredAt: new Date().toISOString()
  };

  const events = getEvents();
  const event = events.find(e => e.id === registration.eventId);
  registration.eventName = event ? event.name : 'Unknown Event';

  const registrations = getRegistrations();
  registrations.push(registration);
  saveRegistrations(registrations);

  showModal('🎉', 'Registration Successful!',
    `You have been registered for <strong>${registration.eventName}</strong>. A confirmation will be sent to <strong>${registration.email}</strong>. You will receive your certificate after attending the event.`
  );

  form.reset();
  // Re-fill student data after reset
  const studentEmail = sessionStorage.getItem('gcet_student_email');
  const studentRoll = sessionStorage.getItem('gcet_student_roll');
  if (studentEmail) form.querySelector('[name="email"]').value = studentEmail;
  if (studentRoll) form.querySelector('[name="rollNumber"]').value = studentRoll;
  renderRegistrationHistory();
}

function renderRegistrationHistory() {
  const container = document.getElementById('registration-history');
  if (!container) return;

  const registrations = getRegistrations();
  if (registrations.length === 0) {
    container.innerHTML = '<p style="color: var(--medium-gray); text-align: center; padding: 20px;">No registrations yet.</p>';
    return;
  }

  container.innerHTML = `
    <table class="admin-table">
      <thead><tr><th>Event</th><th>Name</th><th>Roll No</th><th>Date</th></tr></thead>
      <tbody>
        ${registrations.slice().reverse().map(reg => `
          <tr>
            <td>${reg.eventName}</td>
            <td>${reg.name}</td>
            <td>${reg.rollNumber}</td>
            <td>${new Date(reg.registeredAt).toLocaleDateString()}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>`;
}

// ===== MODALS =====
function showModal(icon, title, message) {
  const overlay = document.querySelector('.modal-overlay');
  if (!overlay) return;
  overlay.querySelector('.success-icon').textContent = icon;
  overlay.querySelector('h3').textContent = title;
  overlay.querySelector('p').innerHTML = message;
  overlay.classList.add('active');

  overlay.querySelector('.close-modal').addEventListener('click', () => overlay.classList.remove('active'));
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.classList.remove('active'); });
}

// ===== GALLERY =====
function renderGalleryGrid(filterCategory = 'all') {
  const container = document.getElementById('gallery-grid');
  if (!container) return;

  const gallery = getGallery();
  const filtered = filterCategory === 'all' ? gallery : gallery.filter(g => g.category === filterCategory);

  if (filtered.length === 0) {
    container.innerHTML = '<p style="text-align:center; padding:40px; color:var(--medium-gray); grid-column:1/-1;">No photos in this category yet.</p>';
    return;
  }

  container.innerHTML = filtered.map(photo => `
    <div class="gallery-item fade-in" data-category="${photo.category}" data-id="${photo.id}">
      <img src="${photo.image}" alt="${photo.title}" loading="lazy">
      <div class="overlay">
        <p>${photo.title}</p>
      </div>
    </div>
  `).join('');

  initScrollAnimations();
  initGalleryLightbox();
}

function initGalleryLightbox() {
  const items = document.querySelectorAll('.gallery-item');
  const lightbox = document.querySelector('.lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.close-lightbox');

  items.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', () => lightbox.classList.remove('active'));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('active'); });
}

function initGalleryFilters() {
  document.querySelectorAll('.gallery-filter').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.gallery-filter').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderGalleryGrid(tab.dataset.category);
    });
  });
}

// ===== ADMIN GALLERY MANAGEMENT =====
function renderAdminGallery() {
  const container = document.getElementById('admin-gallery-grid');
  if (!container) return;

  const gallery = getGallery();
  if (gallery.length === 0) {
    container.innerHTML = '<p style="color:var(--medium-gray); text-align:center; grid-column:1/-1; padding:20px;">No photos in gallery.</p>';
    return;
  }

  container.innerHTML = gallery.map(photo => `
    <div style="position:relative; border-radius:var(--radius-md); overflow:hidden; border:1px solid var(--glass-border);">
      <img src="${photo.image}" alt="${photo.title}" style="width:100%; height:150px; object-fit:cover; display:block;">
      <div style="padding:10px; background:rgba(0,0,0,0.4);">
        <p style="font-size:0.78rem; color:var(--off-white); margin-bottom:6px; line-height:1.3;">${photo.title}</p>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span class="badge badge-${photo.category === 'tech' ? 'active' : photo.category === 'cultural' ? 'upcoming' : photo.category === 'sports' ? 'closed' : 'certificate'}" style="font-size:0.65rem;">${photo.category}</span>
          <button class="btn btn-sm btn-danger" onclick="deleteGalleryPhoto(${photo.id})" style="font-size:0.7rem; padding:3px 10px;">🗑️</button>
        </div>
      </div>
    </div>
  `).join('');
}

function openGalleryAddModal() {
  const modal = document.getElementById('gallery-add-modal');
  if (modal) {
    document.getElementById('gallery-add-form').reset();
    const preview = document.getElementById('gal-preview');
    if (preview) preview.style.display = 'none';
    modal.classList.add('active');
  }
}

function previewGalleryImage(input) {
  const preview = document.getElementById('gal-preview');
  const previewImg = document.getElementById('gal-preview-img');
  if (input.files && input.files[0] && preview && previewImg) {
    const reader = new FileReader();
    reader.onload = function(e) {
      previewImg.src = e.target.result;
      preview.style.display = 'block';
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function initAdminGalleryForm() {
  const form = document.getElementById('gallery-add-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('gal-title').value;
    const category = document.getElementById('gal-category').value;
    const imageInput = document.getElementById('gal-image');

    if (!imageInput.files || !imageInput.files[0]) return;

    const reader = new FileReader();
    reader.onload = function(ev) {
      const gallery = getGallery();
      gallery.push({
        id: Date.now(),
        title: title,
        category: category,
        image: ev.target.result
      });
      saveGallery(gallery);
      document.getElementById('gallery-add-modal').classList.remove('active');
      renderAdminGallery();
    };
    reader.readAsDataURL(imageInput.files[0]);
  });
}

function deleteGalleryPhoto(id) {
  if (confirm('Are you sure you want to remove this photo?')) {
    let gallery = getGallery();
    gallery = gallery.filter(g => g.id !== id);
    saveGallery(gallery);
    renderAdminGallery();
  }
}

// ===== CONTACT FORM =====
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm(form)) {
      showModal('✉️', 'Message Sent!', 'Thank you for reaching out. We will get back to you within 24 hours.');
      form.reset();
    }
  });
}

// ===== ADMIN PANEL =====
const ADMIN_CREDENTIALS = { username: 'vikram', password: 'vikram2026' };

function initAdminPanel() {
  const loginForm = document.getElementById('admin-login-form');

  const isLoggedIn = sessionStorage.getItem('gcet_admin_logged_in');
  if (isLoggedIn === 'true') showAdminDashboard();

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('admin-username').value;
      const password = document.getElementById('admin-password').value;
      if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        sessionStorage.setItem('gcet_admin_logged_in', 'true');
        showAdminDashboard();
      } else {
        const errorEl = document.getElementById('login-error');
        if (errorEl) {
          errorEl.textContent = 'Invalid username or password.';
          errorEl.style.display = 'block';
        }
      }
    });
  }
}

function showAdminDashboard() {
  const loginSection = document.getElementById('admin-login-section');
  const dashboard = document.getElementById('admin-dashboard');
  if (loginSection) loginSection.style.display = 'none';
  if (dashboard) dashboard.style.display = 'block';
  renderAdminStats();
  renderAdminEventsTable();
  renderAdminRegistrationsTable();
  renderAdminGallery();
}

function adminLogout() {
  sessionStorage.removeItem('gcet_admin_logged_in');
  location.reload();
}

function renderAdminStats() {
  const events = getEvents();
  const registrations = getRegistrations();
  const el1 = document.getElementById('admin-total-events');
  const el2 = document.getElementById('admin-total-registrations');
  const el3 = document.getElementById('admin-active-events');
  if (el1) el1.textContent = events.length;
  if (el2) el2.textContent = registrations.length;
  if (el3) el3.textContent = events.filter(e => e.status === 'active').length;
}

function renderAdminEventsTable() {
  const tbody = document.getElementById('admin-events-tbody');
  if (!tbody) return;
  const events = getEvents();
  tbody.innerHTML = events.map(event => `
    <tr>
      <td>${event.name}</td>
      <td>${event.category}</td>
      <td>${formatDate(event.date)}</td>
      <td><span class="badge badge-${event.status}">${event.status}</span></td>
      <td>${event.prize}</td>
      <td>
        <div class="admin-actions">
          <button class="btn btn-sm btn-secondary" onclick="editEvent(${event.id})">✏️ Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteEvent(${event.id})">🗑️ Delete</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function renderAdminRegistrationsTable() {
  const tbody = document.getElementById('admin-regs-tbody');
  if (!tbody) return;
  const registrations = getRegistrations();
  if (registrations.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; color:var(--medium-gray);">No registrations yet.</td></tr>';
    return;
  }
  tbody.innerHTML = registrations.slice().reverse().map(reg => `
    <tr>
      <td>${reg.name}</td>
      <td>${reg.email}</td>
      <td>${reg.rollNumber || 'N/A'}</td>
      <td>${reg.year || 'N/A'} - ${reg.section || 'N/A'}</td>
      <td>${reg.eventName}</td>
      <td>${new Date(reg.registeredAt).toLocaleDateString()}</td>
    </tr>
  `).join('');
}

function addNewEvent() {
  const modal = document.getElementById('event-form-modal');
  if (modal) {
    document.getElementById('event-form-title').textContent = 'Add New Event';
    document.getElementById('event-form').reset();
    document.getElementById('event-form').dataset.editId = '';
    const preview = document.getElementById('ef-image-preview');
    if (preview) preview.style.display = 'none';
    modal.classList.add('active');
    modal.querySelector('.modal').scrollTop = 0;
  }
}

function editEvent(id) {
  const events = getEvents();
  const event = events.find(e => e.id === id);
  if (!event) return;

  const modal = document.getElementById('event-form-modal');
  if (modal) {
    document.getElementById('event-form-title').textContent = 'Edit Event';
    document.getElementById('ef-name').value = event.name;
    document.getElementById('ef-category').value = event.category;
    document.getElementById('ef-date').value = event.date;
    document.getElementById('ef-time').value = event.time;
    document.getElementById('ef-location').value = event.location;
    document.getElementById('ef-description').value = event.description;
    document.getElementById('ef-importance').value = event.importance;
    document.getElementById('ef-prize').value = event.prize;
    document.getElementById('ef-deadline').value = event.deadline;
    document.getElementById('ef-status').value = event.status;
    document.getElementById('ef-certificate').checked = event.certificate;
    document.getElementById('ef-link').value = event.link || '';
    document.getElementById('event-form').dataset.editId = id;
    // Show current event image
    const preview = document.getElementById('ef-image-preview');
    const previewImg = document.getElementById('ef-image-preview-img');
    if (preview && previewImg && event.image) {
      previewImg.src = event.image;
      preview.style.display = 'block';
    }
    modal.classList.add('active');
    modal.querySelector('.modal').scrollTop = 0;
  }
}

function deleteEvent(id) {
  if (confirm('Are you sure you want to delete this event?')) {
    let events = getEvents();
    events = events.filter(e => e.id !== id);
    saveEvents(events);
    renderAdminEventsTable();
    renderAdminStats();
  }
}

// Image preview for event form
function previewEventImage(input) {
  const preview = document.getElementById('ef-image-preview');
  const previewImg = document.getElementById('ef-image-preview-img');
  if (input.files && input.files[0] && preview && previewImg) {
    const reader = new FileReader();
    reader.onload = function(e) {
      previewImg.src = e.target.result;
      preview.style.display = 'block';
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function initAdminEventForm() {
  const form = document.getElementById('event-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const editId = parseInt(form.dataset.editId);
    const eventData = {
      id: editId || Date.now(),
      name: document.getElementById('ef-name').value,
      category: document.getElementById('ef-category').value,
      date: document.getElementById('ef-date').value,
      time: document.getElementById('ef-time').value,
      location: document.getElementById('ef-location').value,
      image: 'assets/tech_conference.png',
      description: document.getElementById('ef-description').value,
      importance: document.getElementById('ef-importance').value,
      prize: document.getElementById('ef-prize').value,
      deadline: document.getElementById('ef-deadline').value,
      certificate: document.getElementById('ef-certificate').checked,
      status: document.getElementById('ef-status').value,
      link: document.getElementById('ef-link').value.trim() || '',
      tickets: 100
    };

    const imageInput = document.getElementById('ef-image');

    const saveAndClose = (imgSrc) => {
      eventData.image = imgSrc;
      let events = getEvents();
      if (editId) {
        const index = events.findIndex(e => e.id === editId);
        if (index !== -1) events[index] = eventData;
      } else {
        events.push(eventData);
      }
      saveEvents(events);
      document.getElementById('event-form-modal').classList.remove('active');
      renderAdminEventsTable();
      renderAdminStats();
    };

    if (imageInput && imageInput.files && imageInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function(ev) { saveAndClose(ev.target.result); };
      reader.readAsDataURL(imageInput.files[0]);
    } else if (editId) {
      const events = getEvents();
      const existing = events.find(e => e.id === editId);
      saveAndClose(existing ? existing.image : 'assets/tech_conference.png');
    } else {
      saveAndClose('assets/tech_conference.png');
    }
  });
}

// ===== DEADLINE TICKER =====
function renderDeadlineTicker() {
  const container = document.querySelector('.ticker-content');
  if (!container) return;
  const events = getEvents()
    .filter(e => e.status !== 'closed')
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  const tickerItems = events.map(event => `
    <span class="ticker-item">
      <span class="dot"></span>
      ${event.name} — Deadline: ${formatDate(event.deadline)}
    </span>
  `).join('');

  container.innerHTML = tickerItems + tickerItems;
}

// ===== GLOBAL INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initializeData();
  initNavbar();
  initScrollAnimations();
  animateCounters();
  initBackToTop();

  const page = document.body.dataset.page;

  switch (page) {
    case 'home':
      renderFeaturedEvents('featured-events');
      renderDeadlineTicker();
      break;
    case 'events':
      renderEventCards('events-grid');
      initFilterTabs();
      break;
    case 'register':
      initRegistrationForm();
      renderRegistrationHistory();
      break;
    case 'gallery':
      renderGalleryGrid();
      initGalleryFilters();
      break;
    case 'contact':
      initContactForm();
      break;
    case 'admin':
      initAdminPanel();
      initAdminEventForm();
      initAdminGalleryForm();
      break;
  }
});

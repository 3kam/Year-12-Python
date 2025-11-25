// Path: public/js/index.js
async function apiFetch(path, opts = {}) {
    const res = await fetch(path, opts);
    if (!res.ok) throw new Error('API error');
    return res.json();
}

/* Simple client-side auth (calls backend) */
const loginForm = document.getElementById('login-form');
const loginMsg = document.getElementById('login-msg');
const dashboardSection = document.getElementById('dashboard-section');
const loginSection = document.getElementById('login-section');
const goAddBtn = document.getElementById('go-add');

if (loginForm) {
    loginForm.addEventListener('submit', async e => {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        try {
            const r = await apiFetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            if (r.success) {
                loginSection.classList.add('hidden');
                dashboardSection.classList.remove('hidden');
                loadDashboard();
            } else {
                loginMsg.textContent = r.message || 'Invalid login';
            }
        } catch (err) {
            loginMsg.textContent = 'Server error';
        }
    });
}

function loadDashboard() {
    // load basic data
    document.getElementById('progress-summary').textContent = 'Loading...';
    fetch('/api/summary').then(r => r.json()).then(data => {
        document.getElementById('progress-summary').textContent = `Total entries: ${data.total || 0}`;
        document.getElementById('weekly-plan').textContent = (data.schedule && data.schedule.length) ? data.schedule.join(', ') : 'No plan';
    }).catch(() => { document.getElementById('progress-summary').textContent = 'Offline or error'; });
}

if (goAddBtn) goAddBtn.addEventListener('click', () => location.href = '/add.html');

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const searchResults = document.getElementById('search-results');

if (searchBtn) {
    searchBtn.addEventListener('click', async () => {
        const q = searchInput.value.trim();
        if (!q) return;
        searchResults.textContent = 'Searching...';
        try {
            const results = await apiFetch(`/api/search?q=${encodeURIComponent(q)}`);
            if (results.length === 0) searchResults.textContent = 'No results';
            else {
                searchResults.innerHTML = results.map(r => `<div class="card"><strong>${r.name}</strong><div>${r.category}</div></div>`).join('');
            }
        } catch (err) {
            searchResults.textContent = 'Search failed';
        }
    });
}

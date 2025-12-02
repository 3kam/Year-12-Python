async function apiFetchJson(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error('API');
    return res.json();
}

const viewSearchInput = document.getElementById('view-search-input');
const viewSearchBtn = document.getElementById('view-search-btn');
const catalogueList = document.getElementById('catalogue-list');
const progressList = document.getElementById('progress-list');

if (viewSearchBtn) {
    viewSearchBtn.addEventListener('click', async () => {
        const q = viewSearchInput.value.trim();
        catalogueList.innerHTML = 'Searching...';
        try {
            const res = await apiFetchJson(`/api/search?q=${encodeURIComponent(q)}`);
            catalogueList.innerHTML = res.map(x => `<li><strong>${x.name}</strong> — ${x.category || ''}</li>`).join('');
        } catch {
            catalogueList.textContent = 'Failed';
        }
    });
}

function loadProgressList() {
    fetch('/api/progress').then(r => r.json()).then(data => {
        if (!progressList) return;
        progressList.innerHTML = (data || []).map(p => `<li>${p.date} — ${p.workoutName} ${p.weight ?? ''}kg x${p.reps ?? ''} x${p.sets ?? ''}</li>`).join('');
    }).catch(() => {
        if (progressList) progressList.textContent = 'No data';
    });
}
loadProgressList();

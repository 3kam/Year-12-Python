// Path: public/js/addItem.js
async function apiPost(path, data) {
    const res = await fetch(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    return res.json();
}

const addExForm = document.getElementById('add-exercise-form');
if (addExForm) {
    addExForm.addEventListener('submit', async e => {
        e.preventDefault();
        const name = document.getElementById('exercise-name').value.trim();
        const group = document.getElementById('exercise-group').value.trim();
        const msg = document.getElementById('add-ex-msg');
        msg.textContent = 'Saving...';
        try {
            const r = await apiPost('/api/exercises', { name, category: group });
            msg.textContent = r.success ? 'Exercise added' : (r.message || 'Error');
        } catch (err) { msg.textContent = 'Server error'; }
    });
}

const addProgressForm = document.getElementById('add-progress-form');
if (addProgressForm) {
    addProgressForm.addEventListener('submit', async e => {
        e.preventDefault();
        const workout = document.getElementById('progress-workout').value.trim();
        const weight = Number(document.getElementById('progress-weight').value);
        const reps = Number(document.getElementById('progress-reps').value);
        const sets = Number(document.getElementById('progress-sets').value);
        const msg = document.getElementById('add-progress-msg');
        msg.textContent = 'Saving...';
        try {
            const r = await apiPost('/api/progress', { workoutName: workout, weight, reps, sets });
            msg.textContent = r.success ? 'Progress saved' : (r.message || 'Error');
        } catch (err) { msg.textContent = 'Server error'; }
    });
}

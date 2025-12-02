document.addEventListener("DOMContentLoaded", () => {
  const workoutList = document.getElementById("workout-list");
  const workoutTitle = document.getElementById("workout-title");
  const weeksContainer = document.getElementById("weeks-container");
  const addWeekBtn = document.getElementById("add-week");
  const deleteWeekBtn = document.getElementById("delete-week");
  const newWorkoutBtn = document.getElementById("new-workout");

  const STORAGE_KEY = "fittrack_workouts_v1";
  const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

  let workouts = loadWorkouts();
  let currentIndex = 0;

  function createEmptyDay(name) {
    return { name, exercises: [] };
  }

  function createWeek() {
    return { days: DAYS.map(d => createEmptyDay(d)) };
  }

  function createWorkout(name = "Untitled Workout") {
    return { name, weeks: [createWeek()] };
  }

  function loadWorkouts() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      const w = [createWorkout()];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(w));
      return w;
    }
    return JSON.parse(data);
  }

  function saveWorkouts() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
  }

  function renderSidebar() {
    workoutList.innerHTML = "";
    workouts.forEach((w, i) => {
      const li = document.createElement("li");
      li.textContent = w.name;
      li.className = i === currentIndex ? "active" : "";
      li.onclick = () => { currentIndex = i; renderAll(); };
      workoutList.appendChild(li);
    });
  }

  function renderWeeks() {
    const current = workouts[currentIndex];
    weeksContainer.innerHTML = "";
    workoutTitle.value = current.name;

    current.weeks.forEach((week, wi) => {
      const weekDiv = document.createElement("div");
      weekDiv.className = "week";

      const header = document.createElement("h3");
      header.textContent = `Week ${wi + 1}`;
      weekDiv.appendChild(header);

      const grid = document.createElement("div");
      grid.className = "week-grid";

      week.days.forEach((day, di) => {
        const dayDiv = document.createElement("div");
        dayDiv.className = "day";

        const title = document.createElement("h4");
        title.textContent = day.name;

        const addBtn = document.createElement("button");
        addBtn.textContent = "Add workout";
        addBtn.onclick = () => openAddForm(wi, di, dayDiv);

        dayDiv.appendChild(title);
        dayDiv.appendChild(addBtn);

        const table = document.createElement("table");
        table.className = "day-table";

        if (day.exercises.length === 0) {
          const p = document.createElement("p");
          p.textContent = "No workouts for this day.";
          dayDiv.appendChild(p);
        } else {
          const headerRow = `
            <thead>
              <tr>
                <th>Exercise</th><th>Weight</th><th>Reps</th><th>Sets</th><th></th>
              </tr>
            </thead>`;
          table.innerHTML = headerRow;

          const tbody = document.createElement("tbody");
          day.exercises.forEach((ex, ei) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
              <td>${ex.name}</td>
              <td>${ex.weight || ""}</td>
              <td>${ex.reps || ""}</td>
              <td>${ex.sets || ""}</td>
              <td><button class="delete-ex" data-week="${wi}" data-day="${di}" data-ex="${ei}">X</button></td>
            `;
            tbody.appendChild(tr);
          });

          table.appendChild(tbody);
          dayDiv.appendChild(table);
        }

        grid.appendChild(dayDiv);
      });

      weekDiv.appendChild(grid);
      weeksContainer.appendChild(weekDiv);
    });
  }

  function openAddForm(wi, di, parent) {
    if (parent.querySelector(".add-form")) return;

    const form = document.createElement("form");
    form.className = "add-form";
    form.innerHTML = `
      <input name="name" placeholder="Exercise name" required />
      <input name="weight" type="number" placeholder="Weight (kg)" />
      <input name="reps" type="number" placeholder="Reps" />
      <input name="sets" type="number" placeholder="Sets" />
      <button type="submit">Save</button>
      <button type="button" class="cancel">Cancel</button>
    `;

    parent.appendChild(form);

    form.querySelector(".cancel").onclick = () => form.remove();

    form.onsubmit = e => {
      e.preventDefault();
      const name = form.name.value;
      const weight = form.weight.value;
      const reps = form.reps.value;
      const sets = form.sets.value;

      workouts[currentIndex].weeks[wi].days[di].exercises.push({
        name, weight, reps, sets
      });

      saveWorkouts();
      renderAll();
    };
  }

  weeksContainer.addEventListener("click", e => {
    if (e.target.classList.contains("delete-ex")) {
      const wi = e.target.dataset.week;
      const di = e.target.dataset.day;
      const ei = e.target.dataset.ex;

      workouts[currentIndex].weeks[wi].days[di].exercises.splice(ei, 1);
      saveWorkouts();
      renderAll();
    }
  });

  addWeekBtn.onclick = () => {
    workouts[currentIndex].weeks.push(createWeek());
    saveWorkouts();
    renderAll();
  };

  deleteWeekBtn.onclick = () => {
    const weeks = workouts[currentIndex].weeks;
    if (weeks.length > 1) weeks.pop();
    saveWorkouts();
    renderAll();
  };

  newWorkoutBtn.onclick = () => {
    workouts.push(createWorkout());
    currentIndex = workouts.length - 1;
    saveWorkouts();
    renderAll();
  };

  workoutTitle.oninput = () => {
    workouts[currentIndex].name = workoutTitle.value;
    saveWorkouts();
    renderSidebar();
  };

  function renderAll() {
    renderSidebar();
    renderWeeks();
  }

  renderAll();
});

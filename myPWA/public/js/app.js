async function loadExercises() {
  try {
    const res = await fetch("./data/exercises.json");
    const data = await res.json();

    console.log("Loaded exercises:", data);

    const list = document.getElementById("exercise-list");
    const searchBox = document.getElementById("search-box");

    // Render full list
    function render(filter = "") {
      list.innerHTML = "";

      for (const category in data) {
        // Only show category if it matches search or contains exercise that matches search
        const filteredExercises = data[category].filter(ex =>
          ex.toLowerCase().includes(filter.toLowerCase())
        );

        if (
          category.toLowerCase().includes(filter.toLowerCase()) ||
          filteredExercises.length > 0
        ) {
          const div = document.createElement("div");
          div.className = "exercise-category card";

          div.innerHTML = `
            <h3>${category}</h3>
            <ul>
              ${filteredExercises.map(x => `<li>${x}</li>`).join("")}
            </ul>
          `;

          list.appendChild(div);
        }
      }
    }

    // Initial render
    render();

    // Search listener
    searchBox.addEventListener("input", () => {
      render(searchBox.value.trim());
    });

  } catch (err) {
    console.error("Failed to load exercises", err);
  }
}

loadExercises();

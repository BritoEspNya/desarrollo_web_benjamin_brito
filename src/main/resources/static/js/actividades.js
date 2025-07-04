document.addEventListener("DOMContentLoaded", () => {
  const evaluateButtons = document.querySelectorAll(".evaluar-btn");

  evaluateButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const activityId = event.target.dataset.activityId;
      const activityName = event.target.dataset.activityName;

      let score;
      let isValidScore = false;

      // Solicitar la nota y validar
      while (!isValidScore) {
        const input = prompt(
          'Selecciona una nota (entre 1 y 7):'
        );

        if (input === null) return;
        
        score = parseInt(input, 10); // Convertir a entero

        if (isNaN(score) || score < 1 || score > 7) {
          alert("Ingresa un número entero entre 1 y 7.");
        } else {
          isValidScore = true;
        }
      }

      try {
        const response = await fetch('/post-score', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({score: score, activityId: activityId}),
        });

        if (response.ok) {
          alert('Nota guardada exitosamente!');
          location.reload();
        } else {
          const errorData = await response.json();
          alert(`Error al guardar la nota: ${errorData.message || response.statusText}`);
        }
      } catch (error) {
        console.error("Error en fetch:", error);
        alert("Ocurrió un error de red al intentar guardar la nota.");
      }
    });
  });
});
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Login effettuato! Vai alla Dashboard.');
  window.location.href = 'dashboard.html';
});

document.getElementById('registerForm')?.addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Registrazione effettuata! Vai al Login.');
  window.location.href = 'login.html';
});

document.addEventListener("DOMContentLoaded", function () {
  fetch('navbar.html')
    .then(response => {
      if (!response.ok) {
        throw new Error("Errore nel caricamento della navbar.");
      }
      return response.text();
    })
    .then(html => {
      document.getElementById('navbar').innerHTML = html;
    })
    .catch(error => {
      console.error("Errore:", error);
    });

  // Memorizza gli eventi
  let events = {};

  const calendarDays = document.getElementById("calendar-days");
  const calendarTitle = document.getElementById("calendar-title");
  const downloadButton = document.getElementById("download-json");
  const uploadInput = document.getElementById("upload-json");
  let currentDate = new Date();

  function updateCalendar(date) {
    const options = { month: 'long', year: 'numeric', timeZone: 'Europe/Amsterdam' };
    const monthName = date.toLocaleString('it-IT', options);

    calendarTitle.textContent = monthName.charAt(0).toUpperCase() + monthName.slice(1);

    calendarDays.innerHTML = '';

    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const dayElement = document.createElement('div');
      dayElement.classList.add('day', 'position-relative');
      dayElement.textContent = i;

      const key = `${date.getFullYear()}-${date.getMonth()}-${i}`;

      if (events[key]) {
        const badge = document.createElement('span');
        badge.classList.add('badge', 'bg-primary', 'position-absolute', 'top-0', 'start-100', 'translate-middle');
        badge.textContent = events[key].length;
        dayElement.appendChild(badge);
      }

      dayElement.addEventListener('click', () => {
        const modal = new bootstrap.Modal(document.getElementById('eventModal'));
        modal.show();
        document.getElementById('event-date').value = `${date.getFullYear()}-${date.getMonth() + 1}-${i}`;
      });

      calendarDays.appendChild(dayElement);
    }
  }

  function updateEventList() {
    const eventsList = document.getElementById("events-list");
    eventsList.innerHTML = "";

    Object.keys(events).forEach((key) => {
      events[key].forEach((event) => {
        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item");
        listItem.textContent = `${key}: ${event}`;
        eventsList.appendChild(listItem);
      });
    });
  }

  document.getElementById("prev-month").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar(currentDate);
  });

  document.getElementById("next-month").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar(currentDate);
  });

  updateCalendar(currentDate);

  const eventForm = document.getElementById("event-form");
  eventForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const eventDate = document.getElementById("event-date").value;
    const eventType = document.getElementById("event-type").value;
    const eventCircuit = document.getElementById("event-circuit").value;
    const eventTime = document.getElementById("event-time").value;

    if (eventDate && eventType && eventCircuit && eventTime) {
      if (!events[eventDate]) events[eventDate] = [];
      events[eventDate].push(`${eventType} presso ${eventCircuit} alle ${eventTime}`);

      alert(`Evento creato: ${eventType} presso ${eventCircuit} alle ${eventTime}`);
      updateEventList();
      updateCalendar(currentDate);

      const modal = bootstrap.Modal.getInstance(document.getElementById("eventModal"));
      modal.hide();
      eventForm.reset();
    }
  });

  downloadButton.addEventListener("click", () => {
    const dataStr = JSON.stringify(events, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "calendar-events.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });

  uploadInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const importedEvents = JSON.parse(e.target.result);
        events = { ...events, ...importedEvents };
        updateCalendar(currentDate);
        updateEventList();
        alert("Eventi importati con successo!");
      };
      reader.readAsText(file);
    }
  });
});

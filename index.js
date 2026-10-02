let events = [
  {
    eventId: 1,
    title: "Meeting",
    beschreibung: "Presentation",
    datum: "2026-09-30",
    uhrzeit: "10:00",
    ort: "Trier",
    kategorie: "Meetup",
    maxTeilnehmer: 100,
    aktuellTeilnehmer: 3,
    status: "offen",
  },
  {
    eventId: 2,
    title: "JavaScript",
    beschreibung: "Presentation",
    datum: "2026-12-31",
    uhrzeit: "15:00",
    ort: "Hamburg",
    kategorie: "Workshop",
    maxTeilnehmer: 95,
    aktuellTeilnehmer: 88,
    status: "offen",
  },
  {
    eventId: 3,
    title: "React",
    beschreibung: "Grundlagen",
    datum: "2026-10-05",
    uhrzeit: "10:00",
    ort: "Berlin",
    kategorie: "Schulung",
    maxTeilnehmer: 50,
    aktuellTeilnehmer: 50,
    status: "ausgebucht",
  },
  {
    eventId: 4,
    title: "Meeting",
    beschreibung: "Presentation",
    datum: "2026-10-30",
    uhrzeit: "10:00",
    ort: "Berlin",
    kategorie: "Networking",
    maxTeilnehmer: 500,
    aktuellTeilnehmer: 3,
    status: "offen",
  },
  {
    eventId: 5,
    title: "Meeting",
    beschreibung: "Presentation",
    datum: "2027-01-13",
    uhrzeit: "10:00",
    ort: "Trier",
    kategorie: "Intern",
    maxTeilnehmer: 13,
    aktuellTeilnehmer: 9,
    status: "offen",
  },
  {
    eventId: 6,
    title: "JavaScript",
    beschreibung: "Workshop",
    datum: "2026-11-05",
    uhrzeit: "10:00",
    ort: "Köln",
    kategorie: "Workshop",
    maxTeilnehmer: 15,
    aktuellTeilnehmer: 13,
    status: "offen",
  },
  {
    eventId: 7,
    title: "JavaScript",
    beschreibung: "Grundlagen",
    datum: "2026-12-03",
    uhrzeit: "10:00",
    ort: "Köln",
    kategorie: "Schulung",
    maxTeilnehmer: 10,
    aktuellTeilnehmer: 10,
    status: "ausgebucht",
  },
  {
    eventId: 8,
    title: "Advanced JavaScript",
    beschreibung: "Presentation",
    datum: "2027-02-10",
    uhrzeit: "10:00",
    ort: "Frankfurt",
    kategorie: "Networking",
    maxTeilnehmer: 50,
    aktuellTeilnehmer: 23,
    status: "offen",
  },
];

const eventContainer = document.querySelector("#events-container");
const eventInput = document.querySelector("#event-name");
const modal = document.querySelector("#my_modal_1");
const newEventButton = document.querySelector("#new-event-btn");
const input_save = document.querySelector("#btn_speichern");
const suchenInput = document.querySelector("#suchen");
suchenInput.addEventListener("input", render_events);
const dashGesamtText = document.querySelector("#dashGesamt");
const dashFreiText = document.querySelector("#dashFrei");
const dashTeilnehmerText = document.querySelector("#dashTeilnehmer");
const dashVollText = document.querySelector("#dashVoll");
const categoryFilter = document.querySelector("#categoryFilter");
categoryFilter.addEventListener("change", render_events);
const statusFilter = document.querySelector("#statusFilter");
statusFilter.addEventListener("change", render_events);

loadEvents();
render_events();

// Render Stats

function render_stats() {
  dashGesamtText.innerText = events.length;

  const dashFrei = events.filter((item) => {
    return item.status.toLocaleLowerCase() === "offen";
  });
  dashFreiText.innerText = dashFrei.length;

  // Dashboard

  let teilnehmer = 0;
  events.forEach((item) => {
    teilnehmer = teilnehmer + Number(item.aktuellTeilnehmer);
  });
  dashTeilnehmerText.innerText = teilnehmer;

  const dashVoll = events.filter((item) => {
    return (
      item.status.toLocaleLowerCase() === "ausgebucht" ||
      Number(item.aktuellTeilnehmer) >= Number(item.maxTeilnehmer)
    );
  });
  dashVollText.innerText = dashVoll.length;
}

newEventButton.addEventListener("click", () => {
  editedEvent = null;
  resetForm();
  modal.showModal();
});

// Render Events & Suchbegriff

function render_events() {
  render_stats();
  eventContainer.innerHTML = "";

  const suchbegriff = suchenInput.value.toLowerCase().trim();

  const gefundeneEvents = events.filter((event) =>
    event.title.toLowerCase().includes(suchbegriff),
  );

  // Filter
  const kategorie = categoryFilter.value;
  const gefiltert = gefundeneEvents.filter((event) => {
    return kategorie === "alle" || event.kategorie === kategorie;
  });

  const status = statusFilter.value;
  const nachStatus = gefiltert.filter((event) => {
    return status === "alle" || event.status.toLowerCase() === status;
  });

  // Status Filter

  if (nachStatus.length === 0) {
    const keine_treffer = document.createElement("p");
    keine_treffer.innerText = "Keine Events gefunden.";
    eventContainer.appendChild(keine_treffer);
    return;
  }

  nachStatus.forEach((event) => {
    const card = generate_event_card(event);
    eventContainer.appendChild(card);
  });
}

// Generate Card

function generate_event_card(eventItem) {
  const {
    eventId,
    title,
    beschreibung,
    datum,
    uhrzeit,
    ort,
    kategorie,
    maxTeilnehmer,
    aktuellTeilnehmer,
    status,
  } = eventItem;

  const event_card = document.createElement("div");
  event_card.classList.add(
    "card",
    "w-96",
    "card-lg",
    "shadow-sm",
    "text-center",
    "bg-base-300",
    "p-4",
  );

  const h2 = document.createElement("h2");
  h2.innerText = title;
  h2.classList.add("text-center", "font-bold", "text-2xl", "m-2");
  event_card.appendChild(h2);

  const besch = document.createElement("p");
  besch.innerText = beschreibung;
  besch.classList.add("text-center", "font-semibold", "text-xl", "mb-2");
  event_card.appendChild(besch);

  const dat = document.createElement("p");
  dat.innerText = datum;
  event_card.appendChild(dat);

  const uhr = document.createElement("p");
  uhr.innerText = uhrzeit;
  event_card.appendChild(uhr);

  const event_ort = document.createElement("p");
  event_ort.innerText = ort;
  event_card.appendChild(event_ort);

  const kat = document.createElement("p");
  kat.innerText = kategorie;
  event_card.appendChild(kat);

  const maxT = document.createElement("p");
  maxT.innerText = maxTeilnehmer;
  event_card.appendChild(maxT);

  const akT = document.createElement("p");
  akT.innerText = aktuellTeilnehmer;
  event_card.appendChild(akT);

  const stat = document.createElement("p");
  stat.innerText = status;
  event_card.appendChild(stat);

  if (eventItem.status === "offen") {
    stat.classList.add("badge-offen");
  } else {
    stat.classList.add("badge-ausgebucht");
  }

  const bearb_btn = document.createElement("button");
  bearb_btn.innerText = "Bearbeiten";
  bearb_btn.classList.add("btn", "bg-yellow-200");
  event_card.appendChild(bearb_btn);

  bearb_btn.addEventListener("click", () => {
    modal.showModal();
    editEvent(eventItem);
  });

  // Events löschen Flow

  const btn_delete = document.createElement("button");
  btn_delete.innerText = "Löschen";
  btn_delete.classList.add("btn", "btn-error");
  btn_delete.addEventListener("click", () => delete_event(eventId, title));
  event_card.appendChild(btn_delete);

  function delete_event(eventId, title) {
    const bestaetigt = confirm(
      `Möchtest du das Event "${title}" wirklich löschen?`,
    );

    if (bestaetigt) {
      events = events.filter((e) => e.eventId !== eventId);
      render_events();
    } else {
      console.log("Löschen abgebrochen");
    }
  }

  // Teilnehmer Verwaltung

  const add_participants = document.createElement("button");
  add_participants.innerText = "+ Teilnehmer";
  add_participants.classList.add("btn", "bg-primary-content", "font-bold");
  event_card.appendChild(add_participants);

  add_participants.addEventListener("click", () => {
    if (eventItem.aktuellTeilnehmer < eventItem.maxTeilnehmer) {
      eventItem.aktuellTeilnehmer += 1;
    }

    if (eventItem.aktuellTeilnehmer >= eventItem.maxTeilnehmer) {
      eventItem.status = "Ausgebucht";
    } else {
      eventItem.status = "offen";
    }

    render_events();
    saveEvents();
  });

  const quit_participants = document.createElement("button");
  quit_participants.innerText = "- Teilnehmer";
  quit_participants.classList.add("btn", "bg-secondary-content", "font-bold");
  event_card.appendChild(quit_participants);

  quit_participants.addEventListener("click", () => {
    if (eventItem.aktuellTeilnehmer > 0) {
      eventItem.aktuellTeilnehmer -= 1;
    }

    if (eventItem.aktuellTeilnehmer < eventItem.maxTeilnehmer) {
      eventItem.status = "offen";
    }

    render_events();
    saveEvents();
  });

  return event_card;
}

// Event Erstellung & Bearbeitung Flow

let editedEvent = null;

function editEvent(eventItem) {
  editedEvent = eventItem;

  document.querySelector("#title").value = eventItem.title;
  document.querySelector("#description").value = eventItem.beschreibung;
  document.querySelector("#date").value = eventItem.datum;
  document.querySelector("#time").value = eventItem.uhrzeit;
  document.querySelector("#location").value = eventItem.ort;
  document.querySelector("#category").value = eventItem.kategorie;
  document.querySelector("#max").value = eventItem.maxTeilnehmer;
}

input_save.addEventListener("click", () => {
  const input_title = document.querySelector("#title").value;
  const input_description = document.querySelector("#description").value;
  const input_date = document.querySelector("#date").value;
  const input_time = document.querySelector("#time").value;
  const input_location = document.querySelector("#location").value;
  const input_category = document.querySelector("#category").value;
  const input_max = Number(document.querySelector("#max").value);

  if (editedEvent) {
    editedEvent.title = input_title;
    editedEvent.beschreibung = input_description;
    editedEvent.datum = input_date;
    editedEvent.uhrzeit = input_time;
    editedEvent.ort = input_location;
    editedEvent.kategorie = input_category;
    editedEvent.maxTeilnehmer = input_max;

    saveEvents();
    render_events();

    modal.close();
    resetForm();

    return;
  } else {
    const newEvent = {
      eventId: Date.now(),
      title: input_title,
      beschreibung: input_description,
      datum: input_date,
      uhrzeit: input_time,
      ort: input_location,
      kategorie: input_category,
      maxTeilnehmer: input_max,
      aktuellTeilnehmer: 0,
      status: "offen",
    };

    events.push(newEvent);
    editedEvent = null;
    saveEvents();
    render_events();

    modal.close();
    resetForm();
  }
});

function resetForm() {
  document.querySelector("#title").value = "";
  document.querySelector("#description").value = "";
  document.querySelector("#date").value = "";
  document.querySelector("#time").value = "";
  document.querySelector("#location").value = "";
  document.querySelector("#category").value = "";
  document.querySelector("#max").value = "";
}

// Local Storage Functionen

function saveEvents() {
  localStorage.setItem("events", JSON.stringify(events));
}

function loadEvents() {
  const gespeicherte_daten = localStorage.getItem("events");

  if (gespeicherte_daten) {
    events = JSON.parse(gespeicherte_daten);
  }
}

// Sortier Flow

const sortier_btn = document.querySelector("#sortier-input");

sortier_btn.addEventListener("change", () => {
  if (sortier_btn.value === "title") {
    events.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
    render_events();
    saveEvents(); //
  } else if (sortier_btn.value === "teilnehmer") {
    events.sort((a, b) => {
      return a.aktuellTeilnehmer - b.aktuellTeilnehmer;
    });
    render_events();
    saveEvents();
  } else if (sortier_btn.value === "aufsteigend") {
    events.sort((a, b) => {
      return new Date(a.datum) - new Date(b.datum);
    });
    render_events();
    saveEvents();
  } else if (sortier_btn.value === "absteigend") {
    events.sort((a, b) => {
      return new Date(b.datum) - new Date(a.datum);
    });
    render_events();
    saveEvents();
  }
});

let events = [
  {
    eventId: 1,
    title: "Meeting",
    beschreibung: "Presentation",
    datum: "30/09/2026",
    uhrzeit: "10:00",
    ort: "Trier",
    kategorie: "Meetup",
    maxTeilnehmer: 500,
    aktuellTeilnehmer: 3,
    status: "offen",
  },
  {
    eventId: 2,
    title: "Meeting",
    beschreibung: "Presentation",
    datum: "30/09/2026",
    uhrzeit: "10:00",
    ort: "Trier",
    kategorie: "Workshop",
    maxTeilnehmer: 500,
    aktuellTeilnehmer: 3,
    status: "offen",
  },
  {
    eventId: 3,
    title: "Meeting",
    beschreibung: "Presentation",
    datum: "30/09/2026",
    uhrzeit: "10:00",
    ort: "Trier",
    kategorie: "Schulung",
    maxTeilnehmer: 500,
    aktuellTeilnehmer: 3,
    status: "offen",
  },
  {
    eventId: 4,
    title: "Meeting",
    beschreibung: "Presentation",
    datum: "30/09/2026",
    uhrzeit: "10:00",
    ort: "Trier",
    kategorie: "Networking",
    maxTeilnehmer: 500,
    aktuellTeilnehmer: 3,
    status: "offen",
  },
  {
    eventId: 5,
    title: "Meeting",
    beschreibung: "Presentation",
    datum: "30/09/2026",
    uhrzeit: "10:00",
    ort: "Trier",
    kategorie: "Intern",
    maxTeilnehmer: 500,
    aktuellTeilnehmer: 3,
    status: "offen",
  },
];

const eventContainer = document.querySelector("#events-container");
const eventInput = document.querySelector("#event-name");
const modal = document.querySelector("#my_modal_1");
const newEventButton = document.querySelector("#new-event-btn");

render_events();

newEventButton.addEventListener("click", () => {
  resetForm();
});

function render_events() {
  eventContainer.innerHTML = "";

  events.forEach((event) => {
    const card = generate_event_card(event);
    eventContainer.appendChild(card);
  });
}

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
  event_card.classList.add("card", "w-96", "card-lg", "shadow-sm");

  const h2 = document.createElement("h2");
  h2.innerText = title;
  event_card.appendChild(h2);

  const besch = document.createElement("p");
  besch.innerText = beschreibung;
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

  const bearb_btn = document.createElement("button");
  bearb_btn.innerText = "Bearbeiten";
  bearb_btn.classList.add("btn");
  event_card.appendChild(bearb_btn);

  bearb_btn.addEventListener("click", () => {
    modal.showModal();
    editEvent(eventItem);
  });

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

  const add_participants = document.createElement("button");
  add_participants.innerText = "+ Teilnehmer";
  add_participants.classList.add("btn");
  event_card.appendChild(add_participants);

  const quit_participants = document.createElement("button");
  quit_participants.innerText = "- Teilnehmer";
  quit_participants.classList.add("btn");
  event_card.appendChild(quit_participants);

  return event_card;
}

function editEvent(eventItem) {
  const input_title = document.querySelector("#title");
  const input_description = document.querySelector("#description");
  const input_date = document.querySelector("#date");
  const input_time = document.querySelector("#time");
  const input_location = document.querySelector("#location");
  const input_category = document.querySelector("#category");
  const input_max = document.querySelector("#max");
  const input_save = document.querySelector("#btn_speichern");

  input_title.value = eventItem.title;
  input_description.value = eventItem.beschreibung;
  input_date.value = eventItem.datum;
  input_time.value = eventItem.uhrzeit;
  input_location.value = eventItem.ort;
  input_category.value = eventItem.kategorie;
  input_max.value = eventItem.maxTeilnehmer;

  input_save.addEventListener("click", () => {
    eventItem.title = input_title.value;
    eventItem.beschreibung = input_description.value;
    eventItem.datum = input_date.value;
    eventItem.uhrzeit = input_time.value;
    eventItem.ort = input_location.value;
    eventItem.kategorie = input_category.value;
    eventItem.maxTeilnehmer = input_max.value;
    render_events();
  });
}

function resetForm() {
  document.querySelector("#title").value = "";
  document.querySelector("#description").value = "";
  document.querySelector("#date").value = "";
  document.querySelector("#time").value = "";
  document.querySelector("#location").value = "";
  document.querySelector("#category").value = "";
  document.querySelector("#max").value = "";
}

let events = [
  {
    event: 1,
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
    event: 2,
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
    event: 3,
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
    event: 4,
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
    event: 5,
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

render_events();

function render_events() {
  eventContainer.innerHTML = "";

  events.forEach((event) => {
    const card = generate_event_card(event);
    eventContainer.appendChild(card);
  });
}

function generate_event_card(eventItem) {
  const {
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

  return event_card;
}

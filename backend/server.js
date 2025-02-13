const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const XLSX = require("xlsx");

const app = express();
const PORT = 3000;

// Middleware per parsing JSON
app.use(bodyParser.json());
app.use(express.static("public")); // Serve i file statici (HTML, CSS, JS)

// Percorso del file Excel
const FILE_PATH = "calendar.xlsx";

// Funzione per leggere gli eventi dal file Excel
function readEventsFromExcel() {
  if (!fs.existsSync(FILE_PATH)) {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([]);
    XLSX.utils.book_append_sheet(wb, ws, "Events");
    XLSX.writeFile(wb, FILE_PATH);
    return [];
  }

  const workbook = XLSX.readFile(FILE_PATH);
  const sheet = workbook.Sheets["Events"];
  return XLSX.utils.sheet_to_json(sheet);
}

// Funzione per salvare eventi nel file Excel
function saveEventsToExcel(events) {
  const workbook = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(events);
  XLSX.utils.book_append_sheet(workbook, ws, "Events");
  XLSX.writeFile(workbook, FILE_PATH);
}

// API per ottenere tutti gli eventi
app.get("/api/events", (req, res) => {
  const events = readEventsFromExcel();
  res.json(events);
});

// API per aggiungere un nuovo evento
app.post("/api/events", (req, res) => {
  const newEvent = req.body;
  const events = readEventsFromExcel();
  events.push(newEvent);
  saveEventsToExcel(events);
  res.json({ message: "Evento salvato con successo!" });
});

// API per cancellare un evento
app.delete("/api/events", (req, res) => {
  const { date, type } = req.body; // Usa data e tipo per identificare l'evento
  let events = readEventsFromExcel();
  events = events.filter((event) => !(event.Date === date && event.Type === type));
  saveEventsToExcel(events);
  res.json({ message: "Evento cancellato con successo!" });
});

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
});

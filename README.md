# RacingJourney

**RacingJourney** è un'applicazione web progettata per aiutare piloti e appassionati di motorsport a pianificare allenamenti e gare. Include una homepage informativa e una dashboard interattiva con funzionalità di gestione del calendario.

## 🏎️ Funzionalità Principali

1. **Homepage informativa**
   - Presenta informazioni introduttive sull'app.
   - Navigazione intuitiva per accedere rapidamente alle varie sezioni.
   - **Prossimi aggiornamenti**: Aggiunta di ulteriori dettagli utili sul mondo delle corse.

2. **Dashboard con calendario interattivo**
   - Pianifica eventi con dettagli personalizzabili:
     - **Tipologia** (es. allenamento, gara).
     - **Circuito**.
     - **Orario**.
   - Esporta e importa i tuoi eventi:
     - **Scarica JSON**: Salva i dati del calendario in un file.
     - **Importa JSON**: Carica eventi da un file JSON.

3. **Design moderno e responsivo**
   - Realizzato con **Bootstrap** e CSS personalizzato.
   - Compatibile con dispositivi desktop e mobile.


## 🗂️ Struttura dell'App

### **Frontend**
- `index.html`: Homepage principale con informazioni sull'app.
- `dashboard.html`: Dashboard interattiva con calendario.
- `navbar.html`: Navigazione comune tra le pagine.
- `style.css`: Stili personalizzati.
- `script.js`: Logica interattiva per il calendario e gestione eventi.

### **Backend**
- `server.js`: Server Node.js per gestire i dati JSON.

### **Assets**
- `images/`: Contiene immagini come logo, carousel e altro.


## 🚀 Come Utilizzare l'App

### **1. Installazione**
Clona il repository sul tuo computer:
```bash
git clone <repository-url>
```

Installa le dipendenze del backend:
```bash
cd backend
npm install
```

### **2. Avvia il server**
Esegui il server Node.js:
```bash
node server.js
```

L'app sarà disponibile su `http://localhost:3000`.

### **3. Naviga nell'app**
- Apri `index.html` per accedere alla homepage.
- Usa la **Dashboard** per gestire il calendario.

### **4. Gestione eventi**
- Aggiungi nuovi eventi (allenamenti o gare) tramite il calendario.
- **Scarica JSON**: Salva i tuoi eventi in un file JSON per backup.
- **Importa JSON**: Ripristina gli eventi caricandoli da un file JSON.


## 📂 Struttura del Progetto

```plaintext
RacingJourney/
├── backend/
│   ├── node_modules/
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
├── frontend/
│   ├── images/
│   │   ├── logo.png
│   │   ├── carousel/
│   │   └── tracks/
│   ├── index.html
│   ├── dashboard.html
│   ├── navbar.html
│   ├── style.css
│   └── script.js
└── README.md
```


## 🛠️ Prossimi Aggiornamenti
- Miglioramenti all'homepage con info dettagliate sull'app.
- Notifiche per ricordare gli eventi pianificati.
- Integrazione con Google Calendar o altri servizi di calendario.


## 📧 Contatti
Se hai domande o suggerimenti, sentiti libero di aprire una **issue** o di contattarmi tramite i canali indicati nel profilo GitHub.
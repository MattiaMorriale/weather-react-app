/*  Milestone 1: Struttura base e funzionalità core
Creazione del progetto React: Inizializza un nuovo progetto React utilizzando Create React App.
Componente principale: Crea un componente principale che renderizzerà l'intera applicazione.
Input per la città: Aggiungi un input text per permettere all'utente di inserire il nome della città.
Bottone di ricerca: Implementa un pulsante per inviare la richiesta all'API quando l'utente clicca su di esso.
Stato iniziale: Utilizza useState per gestire lo stato iniziale dell'applicazione, come il nome della città inserita e i dati meteo ricevuti.
Richiesta all'API: Utilizza fetch per inviare una richiesta all'API OpenWeatherMap e ottenere i dati meteo.
Visualizzazione dei dati: Visualizza le informazioni meteo di base (temperatura, umidità, ecc.) in un formato leggibile.

Milestone 2: Miglioramento dell'interfaccia utente
Stile: Applica uno stile base all'applicazione utilizzando CSS o una libreria di styling come styled-components o Material-UI.
Layout: Organizza i componenti in un layout chiaro e intuitivo.
Icone: Utilizza una libreria di icone (es. React Icons) per visualizzare icone rappresentative delle condizioni meteo.
Caricamento: Mostra un indicatore di caricamento mentre i dati meteo vengono recuperati.
Messaggi di errore: Gestisci gli errori che potrebbero verificarsi durante la richiesta all'API e mostra all'utente un messaggio appropriato.


Milestone 3: Funzionalità avanzate
Unità di misura: Permetti all'utente di scegliere tra gradi Celsius e Fahrenheit.
Previsioni multiple: Recupera le previsioni meteo per i prossimi giorni e visualizzale in un grafico o in una tabella.
Localizzazione automatica: Utilizza la geolocalizzazione del dispositivo per determinare la posizione dell'utente e visualizzare le previsioni per quella posizione.
Salvataggio dei preferiti: Permetti all'utente di salvare le città preferite e visualizzarne rapidamente le previsioni.
Notifiche: Implementa un sistema di notifiche per avvisare l'utente di condizioni meteo avverse (es. tempeste, temperature estreme).

Bonus
Dark mode: Aggiungi un'opzione per passare alla modalità scura.
Widget personalizzabile: Permetti all'utente di personalizzare il widget meteo scegliendo quali informazioni visualizzare.
Integrazione con un calendario: Mostra le previsioni meteo in un calendario.
Animazioni: Aggiungi delle animazioni per rendere l'interfaccia utente più dinamica.
Test unitari: Scrivi dei test unitari per assicurarti che il tuo codice funzioni correttamente.
 Deploy: Deploya l'applicazione su una piattaforma di hosting come Netlify o Vercel. */


import { useState } from 'react'
import './App.css'
import MainComponent from './components/MainComponent'

function App() {

  return (
    <>
      <MainComponent></MainComponent>
    </>
  )
}

export default App

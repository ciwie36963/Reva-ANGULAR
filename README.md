# Reva beursapplicatie

De reva beursapplicatie is een webapplicatie ontworpen met als doel de drukheid bij exposanten op de reva beurs te verspreiden. Ook wordt er met deze applicatie een soort van quiz aan gekoppeld waarin de autoritaire rollen zoals studenten ergotherapie, leerkrachten en de administrator de quiz creëeren. Deze quiz kan dan vervolgens uitgevoerd worden door klassen uit scholen aan de hand van een app. 

## Rollen

### Student ergotherapie

**Creëeren van de vragen**

Studenten uit de richting ergotherapie hebben in deze applicatie het doel om vragen op te stellen voor de quiz. Die vragen behoren vervolgens toe aan een bepaalde exposant op de beurs. 

**Overzicht opgestelde vragen** 

De studenten ergotherapie krijgen een overzicht van alle reeds opgestelde vragen te zien met: mogelijke antwoorden, tot welke exposant de vraag toebehoort en tot welke categorie de vraag toebehoort. 

### Leerkracht

**Creëren van groepen voor de quiz**

Wanneer leerkrachten naar de reva beurs komen kunnen zij voor de dag van de beurs op de webapplicatie groepen creëeren die vervolgens deel kunnen nemen aan de quiz. 

**Overzicht opgestelde vragen** 

De leerkrachten krijgen net zoals de studenten ergotherapie een overzicht van alle reeds opgestelde vragen.

**Overzicht antwoorden op de vragen**

Eenmaal groepen op de beurs de vragen beantwoorden, kunnen leerkrachten een overzicht op de webapplicatie verkrijgen met alle beantwoorde vragen. Dit kan ofwel per groep ofwel voor alle groepen tegelijk.

### Administrator

**Categorieën beheren**

De administrator kan de categorieën beheren (aanmaken, verwijderen, wijzigen). Deze categorieën kunnen vervolgens toegewezen worden aan bepaalde vragen. 

**Exposanten beheren**

De administrator kan de exposanten beheren (aanmaken, verwijderen, wijzigen). 

**Exposanten lokaliseren**

De administrator kan op een grondplan de exposanten pinnen. Op die manier wordt er op de reva app ook een grondplan getoond met een pin voor de locatie van de exposant. 

**Exposanten lokaliseren**

De administrator kan op een grondplan de exposanten pinnen. Op die manier wordt er op de reva app ook een grondplan getoond met een pin voor de locatie van de exposant. 

**Overzicht opgestelde vragen** 

De administrator krijgt net zoals de studenten ergotherapie een overzicht van alle reeds opgestelde vragen.

**Overzicht opgestelde vragen** 

De administrator krijgt net zoals de studenten ergotherapie een overzicht van alle reeds opgestelde vragen.

**Creëeren van de vragen** 

De administrator kan net zoals de studenten ergotherapie vragen creëeren. 

## Het opstellen en opstarten van de applicatie

Deze instructies zullen u helpen bij het opstellen van de applicatie lokaal op uw computer. 

### Voorwaarden

Voor het downloaden en installeren van de repository is het noodzakelijk een git installatie te hebben. Deze is downloadbaar op [Github](https://git-scm.com/downloads)

### Stap 1 - clonen repository

Indien Git geïnstalleerd is zal de repository met het project moeten gecloned worden. Hiervoor moet er in de command line het volgende commando uitgevoerd worden

```
git clone https://github.com/HoGent-Projecten3/projecten3-1819-angular-groep8-reva.git
```

### Stap 2 - installeren modules

Na het clonen van de repository is het vereist alle modules te installeren die in het project gebruikt worden. Hiervoor moet er vanuit de command line eerst genavigeerd worden naar de project-folder met het volgende commando: 

```
cd projecten3-1819-angular-groep8-reva/
```

Vervolgens worden de vereiste modules geïnstalleerd door het volgende commando uit te voeren:

```
npm install
```

### Stap 3 - opstarten webapplicatie

Eenmaal alle modules geïnstalleerd zijn kan het toffe werk beginnen. De applicatie tot leven zien komen. Om de applicatie op te starten wordt het volgende command uitgevoerd:  

```
npm start
```

Wanneer de onderstaande boodschap zichtbaar is in de command line, wilt dit zeggen dat de webapplicatie aan het draaien is. 

> ℹ ｢wdm｣: Compiled successfully.

Om op de webapplicatie te geraken wordt er gesurft naar [http://localhost:4200/](http://localhost:4200/)

### Alternatief

Indien u wenst te applicatie te builden om ze op een webserver te hosten kan u gebruik maken:

```
ng build --proud
```
Dit zal de onderliggende backend gebruiken in plaats van de lokale backend.

### Hosting

De applicatie wordt momenteel gehost op [projecten3studserver08.westeurope.cloudapp.azure.com](projecten3studserver08.westeurope.cloudapp.azure.com). Omdat deze server niet altijd aan staat is het mogelijk dat u deze zelf zal moeten aanzetten.

Dit kan u doen door de server via het Azure dashboard aan te zetten. Hierbij zou de backend zich normaal gezien automatisch moeten aanzetten. 

Indien dit de backend toch nie aanzet kan u deze altijd manueel aanzetten door via SSL in te loggen op de Azure server met volgende gegevens: 

```
Username: student
Wachtwoord: StudentStudent18
```

En u hierna naar de map reva/projecten3-1819... te gaan en npm start te doen.

Indien u de data in de databank wilt resetten kan u volgende endpoints gebruiken:

```
API/test/reset
API/test/seed
```



## Mappenstructuur

Alle modules van de rollen zijn in het project te vinden in de folder `src/app/content/pages`. In deze folder is de volgende onderverling gemaakt: 

| Module     | Functionaliteit                                              |
| ---------- | :----------------------------------------------------------- |
| Admin      | Deze module bevat de functionaliteiten die uniek zijn aan de administrator. Namelijk het beheren van de categorieën, exposanten, het lokaliseren van de exposanten en het beheren van de webapplicatie. |
| Ergo-admin | In deze module zitten de functionaliteiten die de studenten ergotherapie en de administrator gemeenschappelijk hebben. Namelijk het creëeren van vragen en het overzicht van de vragen. |
| Teacher    | Deze module de functionaliteiten die uniek zijn aan de leerkracht. Namelijk het creëren van groepen voor de quiz en de antwoorden op de vragen van zijn/haar groepen. |

## Authors

Zes derdejaars studenten Toegepaste Informatica - Programmeren - Mobiele Applicaties

- Alexander Willems - [ciwie36963](https://github.com/ciwie36963)
- Cedric Arickx - [Ganondus](https://github.com/ganondus)
- Jens De Wulf - [Jensdewulf](https://github.com/Jensdewulf/)

- Jelle Geers - [JelleGeers](https://github.com/jellegeers)
- Karel Heyndrickx - [KarelHeyndrickx](https://github.com/karelheyndrickx)
- Matthias De Fré - [MatthiasDeFre](https://github.com/MatthiasDeFre)

## License

Dit project is eigendom van Projecten III - team 8 - 2018 van HoGent .

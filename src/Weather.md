<!-- MODULE 1 — STATE KA GHAR (weatherReducer.js)
initialState = {
    ┌──────────────────────────────────────────┐
    │  statesData : []     ← All states list   │
    │  selectedState: ""   ← Chosen state      │
    │  selectedCity : ""   ← Chosen city       │
    │  village     : ""    ← Optional village  │
    │  cities      : []    ← Cities of state   │
    │  loading     : false ← Spinner control   │
    │  weatherData : null  ← API response      │
    └──────────────────────────────────────────┘
} -->

<!-- 📦 MODULE 2 — ACTION FLOW (Reducer kaise kaam karta hai)
                    DISPATCH(action)
                         │
                         ▼
┌────────────────────────────────────────────────────┐
│              weatherReducer SWITCH                 │
│                                                    │
│  "SET_STATES"  ──► statesData update              │
│  "SET_STATE"   ──► selectedState + cities update  │
│  "SET_CITY"    ──► selectedCity update            │
│  "SET_VILLAGE" ──► village update                 │
│  "SET_LOADING" ──► loading: true/false            │
│  "SET_WEATHER" ──► weatherData update             │
│  "RESET"       ──► sab clear, statesData rakho    │
└────────────────────────────────────────────────────┘
                         │
                         ▼
                  NEW STATE RETURN
                         │
                         ▼
                  UI RE-RENDER ✅ -->

<!-- MODULE 2 — ACTION FLOW (Reducer kaise kaam karta hai)
                    DISPATCH(action)
                         │
                         ▼
┌────────────────────────────────────────────────────┐
│              weatherReducer SWITCH                 │
│                                                    │
│  "SET_STATES"  ──► statesData update              │
│  "SET_STATE"   ──► selectedState + cities update  │
│  "SET_CITY"    ──► selectedCity update            │
│  "SET_VILLAGE" ──► village update                 │
│  "SET_LOADING" ──► loading: true/false            │
│  "SET_WEATHER" ──► weatherData update             │
│  "RESET"       ──► sab clear, statesData rakho    │
└────────────────────────────────────────────────────┘
                         │
                         ▼
                  NEW STATE RETURN
                         │
                         ▼
                  UI RE-RENDER ✅

📦 MODULE 3 — HOOK (useLocationWeather.js) — BRAIN OF APP
useLocationWeather()
│
├── Step 1: useReducer setup
│   const [state, dispatch] = useReducer(weatherReducer, initialState)
│   └── "state" = current data storage
│   └── "dispatch" = trigger actions
│
├── Step 2: useEffect (Sirf ek baar — App load pe)
│   dispatch({ type: "SET_STATES", payload: statesDataList })
│   └── statesData array populate ho jaata hai
│
├── Step 3: handleStateChange (Jab State dropdown change ho)
│   ┌─────────────────────────────────────────────┐
│   │  User selects "Maharashtra"                 │
│   │        ↓                                    │
│   │  Find that state object from statesData     │
│   │  { name: "Maharashtra", cities: [...] }     │
│   │        ↓                                    │
│   │  dispatch SET_STATE                         │
│   │  → selectedState = "Maharashtra"            │
│   │  → cities = ["Mumbai", "Pune", ...]         │
│   │  → selectedCity = "" (reset)                │
│   └─────────────────────────────────────────────┘
│
└── Step 4: fetchWeather (Submit pe API call)
    └── [Neeche Module 4 mein detail]


📦 MODULE 4 — API CALL FLOW (fetchWeather — Most Important)
USER clicks "☁️ Get Weather Data"
              │
              ▼
        form onSubmit fires
              │
              ▼
   ┌─── VALIDATION CHECK ───┐
   │ State/City selected?   │
   │  NO → toast.error()    │
   │  YES → continue ──────►│
   └────────────────────────┘
              │
              ▼
   dispatch SET_LOADING: true   ← Spinner ON 🌀
   dispatch SET_WEATHER: null   ← Old data clear
              │
              ▼
   ┌─────── URL BUILD ──────────────────────────────┐
   │                                                │
   │  BASE_URL = "http://localhost:8080/api/v1.0"  │
   │  ENDPOINT = "/weather"                         │
   │                                                │
   │  params = {                                    │
   │    state: "Maharashtra",                       │
   │    city:  "Pune",                             │
   │    village: "Kothrud"  ← (optional)           │
   │  }                                             │
   │                                                │
   │  FINAL URL:                                    │
   │  http://localhost:8080/api/v1.0/weather        │
   │  ?state=Maharashtra&city=Pune&village=Kothrud  │
   └────────────────────────────────────────────────┘
              │
              ▼
   ┌─── fetch() API CALL ───────────────────────────┐
   │                                                │
   │  HTTP GET Request ───────────────────────────► │
   │                        SPRING BOOT BACKEND     │
   │                        /weather controller     │
   │                        → OpenWeatherMap API    │
   │                        → JSON build karke      │
   │  JSON Response ◄─────────────────────────────  │
   │  {                                             │
   │    location: "Pune, Maharashtra",              │
   │    temperature: 28.5,                          │
   │    description: "Partly Cloudy",               │
   │    windSpeed: 12,                              │
   │    humidity: 65,                               │
   │    pressure: 1013,                             │
   │    hourlyForecast: [...],                      │
   │    fiveDayForecast: [...]                      │
   │  }                                             │
   └────────────────────────────────────────────────┘
              │
              ▼
   res.ok?
   ├── NO  → toast.error("Failed to fetch weather.")
   └── YES → dispatch SET_WEATHER: data ✅
              │
              ▼
   dispatch SET_LOADING: false  ← Spinner OFF -->

<!-- ## 🎬 COMPLETE 3D FLOW — EK NAZAR MEIN
```
┌─────────────────────────────────────────────────────────────────────┐
│                         LAYER 1: UI LAYER                           │
│   User fills form → State, City, Village select karta hai           │
└──────────────────────────┬──────────────────────────────────────────┘
                           │ onChange events
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      LAYER 2: HOOK LAYER                            │
│   useLocationWeather()                                              │
│   handleStateChange() → dispatch(SET_STATE)                         │
│   fetchWeather()      → fetch(URL) → dispatch(SET_WEATHER)          │
└──────────────────────────┬──────────────────────────────────────────┘
                           │ dispatch()
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    LAYER 3: REDUCER LAYER                           │
│   weatherReducer() → action type match → new state return           │
└──────────────────────────┬──────────────────────────────────────────┘
                           │ state update
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    LAYER 4: NETWORK LAYER                           │
│   fetch("http://localhost:8080/api/v1.0/weather?state=...&city=...") │
│   → HTTP GET → Backend → JSON Response                              │
└──────────────────────────┬──────────────────────────────────────────┘
                           │ JSON data
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    LAYER 5: DISPLAY LAYER                           │
│   weatherData state → JSX render → User ko dikhta hai              │
│   .map() → Cards → Forecast display                                 │
└─────────────────────────────────────────────────────────────────────┘ -->


<!-- // weatherData = wahi JSON object hai
// Isliye directly access kar sakte ho

weatherData.windSpeed   // → 12
weatherData.humidity    // → 65
weatherData.pressure    // → 1013

// JSX mein:
<span>{weatherData.windSpeed} km/h</span>  // → "12 km/h"
```

> **💡 Rule:** Jo naam Backend ke JSON mein hoga, **same naam** Frontend pe use karna padega. Ek bhi spelling galat = `undefined` aayega!

---

## ❓ SAWAAL 2 — Reducer Ke Baad Data Kahan Jaata Hai?

> Note: Yahan code mein `axios` nahi, **`fetch()`** use hua hai. Dono same kaam karte hain — HTTP request bhejna.

---

### COMPLETE STEP-BY-STEP FLOW:
```
STEP 1️⃣ — USER FORM SUBMIT KARTA HAI
─────────────────────────────────────
<form onSubmit={fetchWeather}>
     │
     ▼
fetchWeather() function call hota hai
(ye Hook ke andar define hai)


STEP 2️⃣ — LOADING ON + OLD DATA CLEAR
──────────────────────────────────────
dispatch({ type: "SET_LOADING", payload: true })
     │
     ▼
Reducer chalti hai:
case "SET_LOADING":
    return { ...state, loading: true }
     │
     ▼
UI mein Spinner dikhne lagta hai 🌀


STEP 3️⃣ — URL BANTA HAI
─────────────────────────
const params = new URLSearchParams({
    state: "Maharashtra",
    city: "Pune",
    village: "Kothrud"   // optional
})

FINAL URL =
"http://localhost:8080/api/v1.0/weather
 ?state=Maharashtra&city=Pune&village=Kothrud"


STEP 4️⃣ — NETWORK REQUEST JAATA HAI
──────────────────────────────────────
const res = await fetch(URL)

  BROWSER                    BACKEND SERVER
  ───────                    ─────────────
  fetch() ──── HTTP GET ───► /weather?state=..&city=..
               Request        │
                              ▼
                         Controller handle karta hai
                         OpenWeather API se data laata hai
                         WeatherResponse object banata hai
                              │
  res ◄──── JSON Response ───┘
  {
    windSpeed: 12,
    humidity: 65,
    ...
  }


STEP 5️⃣ — RESPONSE CHECK HOTA HAI
────────────────────────────────────
if (!res.ok) {
    // HTTP 404, 500 etc
    toast.error("Failed!")   // Error toast
}

// res.ok matlab HTTP 200 ✅
const data = await res.json()
// Ab "data" = wahi JSON object hai


STEP 6️⃣ — DATA REDUCER KO JAATA HAI
──────────────────────────────────────
dispatch({ type: "SET_WEATHER", payload: data })
     │
     ▼
Reducer chalti hai:
case "SET_WEATHER":
    return { ...state, weatherData: action.payload }
                                    │
                                    └── payload = wahi JSON data


STEP 7️⃣ — STATE UPDATE → UI RE-RENDER
────────────────────────────────────────
state.weatherData = {
    location: "Pune",
    temperature: 28.5,
    windSpeed: 12,      ◄── Ab ye available hai UI mein
    humidity: 65,
    pressure: 1013,
    ...
}
     │
     ▼
React automatically re-render karta hai
     │
     ▼
{weatherData && !loading && (
    <div>
        // YE SAB AB SCREEN PE DIKHTA HAI
        <span>{weatherData.windSpeed}</span>  → "12"
        <span>{weatherData.humidity}</span>   → "65"
        <span>{weatherData.pressure}</span>   → "1013"
    </div>
)}


STEP 8️⃣ — LOADING OFF
───────────────────────
dispatch({ type: "SET_LOADING", payload: false })
Spinner band ho jaata hai ✅
```

---

## 🧠 EK LINE MEIN POORA FLOW:
```
Form Submit
    → fetchWeather() [Hook]
        → dispatch(SET_LOADING) [Reducer → loading:true → Spinner ON]
        → fetch(URL) [Network Request to Backend]
            → Backend JSON Response
        → dispatch(SET_WEATHER) [Reducer → weatherData = JSON]
            → UI Re-render [weatherData.windSpeed dikhta hai]
        → dispatch(SET_LOADING:false) [Spinner OFF] -->



<!-- 
Soch lo ek Restaurant hai...

MENU CARD  = DTO        → Customer ko sirf selected info dikhta hai
KITCHEN    = Entity     → Andar sab kuch hota hai (recipe, cost, supplier, etc.)

Customer ko puri recipe nahi batate!
Sirf "Paneer Butter Masala - ₹280" dikhate ho.
┌─────────────────────────────────────────┐
│  DTO    → Data ka DARWAZA hai           │
│           Andar aane ka (Request DTO)   │
│           Bahar jaane ka (Response DTO) │
│                                         │
│  Entity → Data ka GHAR hai              │
│           Database mein rehta hai       │
│           Sab kuch store hota hai       │
└─────────────────────────────────────────┘

DTO == Filtered View of Data
Entity == Complete Data in Database -->

<!-- @Service → Spring ko batata hai ki yeh ek Service class hai
           Matlab Spring khud iska object banayega (Bean)
           Hume "new ChatService()" nahi likhna padega

@Value → application.properties se value utha ke
         variable mein daal deta hai automatically
RestTemplate → HTTP calls karne ka tool hai
               Jaise Postman karta hai, wahi kaam
               yeh code se karta hai

@Autowired → Spring khud inject kar deta hai
             (AppConfig mein @Bean define kiya tha)

Real Life: Courier boy jo parcel deliver karta hai
           Tum parcel do → woh Groq tak le jaata hai
           Response lekar wapas aata hai -->

<!-- public ChatResponseDTO chat(ChatRequestDTO request) {

    Map<String, Object> body = new HashMap<>();
    body.put("model", model);
```
```
ChatRequestDTO  → Farmer ka message andar aaya
ChatResponseDTO → AI ka reply bahar jayega

Map<String, Object> body → JSON body ban rahi hai
                           Groq API ko yeh JSON bhejenge

body.put("model", model) → Groq ko batao kaunsa AI model use karo
                           "llama-3.1-8b-instant"

Actual JSON banta hai:
{
    "model": "llama-3.1-8b-instant"
}


List<Map<String, String>> messages = new ArrayList<>();
```
Groq API ko messages ek LIST mein chahiye
List mein 2 messages honge:
    1. System Message  → AI ka role/character
    2. User Message    → Farmer ka sawaal

Actual JSON:
{
    "model": "llama-3.1-8b-instant",
    "messages": [         ← Yahi list hai
        {...},            ← System message
        {...}             ← User message
    ]
}

6. System Prompt (Most Important!)

Map<String, String> systemMsg = new HashMap<>();
systemMsg.put("role", "system");
systemMsg.put("content", "You are AgriConnect AI Assistant...");
messages.add(systemMsg);
```
role: "system" → Yeh AI ka CHARACTER set karta hai
                 Ek baar set karo → poori conversation follow karega

content → Tumne likha:
          - Sirf agriculture answer karo
          - Hindi mein pucho to Hindi mein jawab do
          - Outside topic pe politely refuse karo

Real Life: Jaise Manager apne employee ko
           training deta hai ki
           "Customer se sirf product ke baare mein baat karo"

Bina system prompt ke → AI sab kuch answer karega
Saath system prompt ke → Sirf AgriConnect topics ✅

JSON banta hai:
{
    "role": "system",
    "content": "You are AgriConnect AI Assistant..."
}

Map<String, String> userMsg = new HashMap<>();
userMsg.put("role", "user");
userMsg.put("content", request.getMessage());
messages.add(userMsg);
```
```
role: "user"          → Yeh farmer ka message hai
request.getMessage()  → Jo farmer ne Postman/App se bheja

Agar farmer ne likha "Gehu ki khad batao"
to content = "Gehu ki khad batao"

JSON banta hai:
{
    "role": "user",
    "content": "Gehu ki khad batao"
}

HttpHeaders headers = new HttpHeaders();
headers.setContentType(MediaType.APPLICATION_JSON);
headers.setBearerAuth(apiKey);
```
```
Headers → Extra information jo request ke saath jaati hai

setContentType(APPLICATION_JSON)
    → Groq ko batao "Main JSON bhej raha hoon"

setBearerAuth(apiKey)
    → Groq ko prove karo ki tum authorized ho
    → Header banta hai: "Authorization: Bearer gsk_xxx..."

Real Life: Jaise Club mein jaate waqt
           ID card dikhana padta hai
           apiKey tumhara ID card hai 


HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
```
```
HttpEntity → Body + Headers ek saath pack karo

Real Life: Courier parcel
           body    = Andar ka saman (JSON data)
           headers = Upar ka label (Authorization, Content-Type)


ResponseEntity<Map> response = restTemplate.postForEntity(apiUrl, entity, Map.class);
```
```
restTemplate.postForEntity(
    apiUrl,      → Kahan bhejno? Groq ka URL
    entity,      → Kya bhejno? Body + Headers
    Map.class    → Response kis format mein chahiye? Map mein
)

Yahan program RUKTA HAI ⏳
Groq process karta hai...
AI jawab generate karta hai...
Response wapas aata hai ✅

ResponseEntity → Groq ka poora response
                 (status code + headers + body)


  List<Map> choices = (List<Map>) response.getBody().get("choices");
Map message = (Map) choices.get(0).get("message");
String aiReply = (String) message.get("content");
```
```
Groq ka actual JSON response kuch aisa hota hai:
{
    "choices": [               ← choices list
        {
            "message": {       ← pehla choice
                "role": "assistant",
                "content": "Gehun ke liye DAP aur Urea..."  ← YAHI CHAHIYE!
            }
        }
    ]
}


return new ChatResponseDTO(aiReply);
```
```
ChatResponseDTO mein aiReply daal ke return karo

Farmer ko milega:
{
    "reply": "Gehun ke liye DAP aur Urea best hoti hai..."
}
```

---

## Poora Flow Ek Nazar Mein
```
Farmer → "Gehu ki khad batao"
              ↓
        ChatRequestDTO (request)
              ↓
        System Prompt + User Message → JSON body bana
              ↓
        Headers mein API Key dala
              ↓
        RestTemplate → Groq API ko bheja
              ↓
        Groq ne AI se jawab liya
              ↓
        choices[0].message.content se reply nikali
              ↓
        ChatResponseDTO mein wrap kiya
              ↓
Farmer ← "Gehun ke liye DAP aur Urea best hoti hai..."


Controller - > 
@RestController → 2 kaam karta hai ek saath:
    1. @Controller  → Yeh class HTTP requests handle karegi
    2. @ResponseBody → Response automatically JSON mein convert hoga

@RequestMapping("/chat") → Is Controller ka base URL
    context-path + mapping = /api/v1.0/chat

@Autowired
private ChatService chatService;
```
```
@Autowired → Spring khud ChatService ka object inject karega
             Hume "new ChatService()" nahi likhna

Controller  →  Service  →  API Call
(Traffic    →  Kaam     →  Groq)
 Police)       Karne
               Wala

Controller khud kaam nahi karta
Sirf request pakadta hai aur Service ko deta hai

## Controller ka Actual Role
```
Controller kya KARTA hai:
✅ Request receive karna
✅ Request Service ko dena
✅ Response wapas bhejana
✅ HTTP Status code set karna

Controller kya NAHI karta:
❌ Business logic
❌ API calls
❌ Data processing
❌ Database kaam

Yeh sirf TRAFFIC POLICE hai! 🚦
```

---

## Poora Flow Ek Baar
```
POSTMAN
  ↓  POST http://localhost:8080/api/v1.0/chat/send
  ↓  Body: { "message": "Gehu ki khad batao" }
  ↓
@RestController (request pakda)
  ↓
@RequestBody → ChatRequestDTO mein convert kiya
  ↓
chatService.chat(request) → Service ko diya
  ↓
Service → Groq API call ki → AI jawab aaya
  ↓
ChatResponseDTO → Controller ko wapas aaya
  ↓
ResponseEntity.ok(response) → 200 OK + JSON
  ↓
POSTMAN
  { "reply": "Gehun ke liye DAP aur Urea..." }
```

---

## Simple Summary
```
┌─────────────────────────────────────────────┐
│  @RestController  → JSON response dega      │
│  @RequestMapping  → Base URL set kiya       │
│  @Autowired       → Service inject ki       │
│  @PostMapping     → POST request handle     │
│  @RequestBody     → JSON → DTO convert      │
│  ResponseEntity   → Status + Body wrap      │ -->


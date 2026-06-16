# 🌾 AgriConnect

AgriConnect is a full-stack agriculture support platform designed to help farmers access weather forecasts, crop recommendations, government schemes, and AI-powered agricultural assistance from a single platform.

## Live Demo

**Deploy Url:** https://agri-connect-89.netlify.app/

## Features

### 🌦 Weather Forecast

* Real-time weather information
* Location-based weather updates
* Farming-friendly weather insights

### 🌱 Crop Recommendation

* AI-assisted crop recommendations
* Suggests suitable crops based on environmental conditions
* Helps farmers make informed cultivation decisions

### 🤖 AI Virtual Assistant

* Powered by Groq LLM
* Answers agriculture-related questions
* Provides guidance and farming assistance

### 📢 Government Schemes

* Browse agriculture-related government schemes
* View scheme details and benefits
* Search and filter available schemes

### 👤 User Authentication

* JWT-based authentication
* Secure login and registration
* BCrypt password encryption

### 🖼 Profile Management

* User profile management
* Cloudinary image upload support
* Role-based user access

---

## Tech Stack

### Frontend

* React.js
* Vite
* Axios
* Tailwind CSS

### Backend

* Spring Boot
* Spring Security
* Spring Data JPA
* JWT Authentication
* Maven

### Database

* MySQL

### Cloud Services

* Railway (Backend + Database)
* Netlify (Frontend)
* Cloudinary (Image Storage)

### AI Integration

* Groq API

### Weather Integration

* OpenWeather API

---

## Backend API Base URL

```text
https://your-backend-url/api/v1.0
```

---

## Environment Variables

### Backend

```env
JWT_SECRET=your_secret_key
WEATHER_API=your_openweather_api_key
GROQ_API_KEY=your_groq_api_key

MYSQLHOST=your_host
MYSQLPORT=3306
MYSQLDATABASE=your_database
MYSQLUSER=your_username
MYSQLPASSWORD=your_password
```

---

## Local Setup

### Clone Repository

```bash
git clone https://github.com/Jatin-chaurasiya/AgriConnect-Backend-V2.git
cd AgriConnect
```

### Build Project

```bash
./mvnw clean install
```

### Run Application

```bash
./mvnw spring-boot:run
```

---

## Security

* JWT Authentication
* BCrypt Password Hashing
* Protected APIs
* Secure Environment Variables

---

## Future Enhancements

* Farmer Marketplace
* Disease Detection using AI
* Multi-language Support
* Crop Price Prediction
* Farm Management Dashboard

---

## Author

**Jatin Chaurasiya**

Engineering Student | Full Stack Developer

---

## License

This project is intended for educational and portfolio purposes.

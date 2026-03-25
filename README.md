# NexusHub - Minecraft Server Management (Frontend)

Professional Minecraft server management panel with full JWT authentication, user roles and CRUD.

## Tech Stack

<div>
  <img src="https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/-TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/-React_Router_DOM-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />
  <img src="https://img.shields.io/badge/-Phosphor_Icons-356456?style=for-the-badge&logo=phosphor-icons&logoColor=white" />
  <img src="https://img.shields.io/badge/-Context_API-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/-Chart.js-FF6384?style=for-the-badge&logo=chart.js&logoColor=white" />
</div>

## Instalation

```bash
# 1. Install dependencies
npm install

# 2. Install tailwind
npm install -D tailwindcss @tailwindcss/postcss autoprefixer

# 3. Run dev server
npm run dev
```

## Features

-  Full JWT authentication (login/register/logout) (backend)
-  Role-based access control (user/admin)
-  CRUD operations for Minecraft servers
- CSRF protection with cookie-based tokens

## Variables

make sure you have backend set up on 
```bash
http://localhost:5000
```
or 
```bash
http://127.0.0.1:5000
```
or you can just change address in **vite.config.js**
```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:5000", <- here
        changeOrigin: true,
        credentials: true,
      },
    },
  },
});
```

## Project structure
```bash
src/
├── api/            # Defined api calls
├── context/        # React Context providers
├── pages/          # Page components
├── components/     # Reusable UI components  
├── App.jsx         # Root component
└── main.jsx        # Entry point
```

## API

This frontend connects to a backend API you can find [here](https://github.com/absolutecoder01/minecraft-server-hub-backend) 

# Gallery
### Login:

<img width="1677" height="901" alt="Screenshot 2026-03-24 at 19 17 37" src="https://github.com/user-attachments/assets/7f29f6dc-0ca0-4b45-85b0-f61f99f1bff2" />

### Register

<img width="1677" height="901" alt="Screenshot 2026-03-24 at 19 17 44" src="https://github.com/user-attachments/assets/adfe404e-ea48-450d-9945-e177a1c546c9" />

### User Dashboard

<img width="1677" height="901" alt="Screenshot 2026-03-24 at 19 16 36" src="https://github.com/user-attachments/assets/8f17150b-4932-4910-8129-f99e914f5c5f" />

### Add Server Page

<img width="1677" height="901" alt="Screenshot 2026-03-24 at 19 16 46" src="https://github.com/user-attachments/assets/57c3ea1d-52fc-4b0d-b1b7-6fa9206d74cb" />

### Admin Dashboard

<img width="1677" height="901" alt="Screenshot 2026-03-24 at 19 17 13" src="https://github.com/user-attachments/assets/7384b76d-b6a3-4217-b2a9-80346eaa15cb" />

### Admin Register User

<img width="1677" height="901" alt="Screenshot 2026-03-24 at 19 17 28" src="https://github.com/user-attachments/assets/54dcb5ff-611e-4c38-9bce-c09807ad2aec" />


## Author
<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/absolutecoder01">absolutecoder01</a></sub>
</div>

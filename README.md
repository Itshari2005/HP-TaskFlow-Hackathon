# HP TaskFlow - Hackathon Project 🧠✅

**HP TaskFlow** is a full-stack task management web application built for productivity, real-time task control, and multi-platform accessibility.

This project was created as part of a hackathon and focuses on essential project management features such as:

- User authentication via OAuth 2.0 (Google, GitHub, Facebook)
- JWT-based session management
- Task creation, editing, deletion (CRUD)
- Pagination, sorting, filtering (by status, priority, search)
- Sharing tasks via email
- Responsive UI for all devices (desktop, mobile, tablet)
- Hosting: Frontend on Vercel, Backend on Render

---

## 🔗 Live Links

- **Frontend (Vercel)**: [https://hp-task-flow-hackathon.vercel.app](https://hp-task-flow-hackathon.vercel.app)
- **Backend (Render)**: [https://hp-taskflow-hackathon.onrender.com](https://hp-taskflow-hackathon.onrender.com)

---

## 🔧 Tech Stack

**Frontend**  
- React.js (Vite)
- React Icons
- Axios
- Toast Notifications

**Backend**  
- Node.js + Express.js
- MongoDB (Mongoose)
- Passport.js for OAuth
- JWT Authentication
- Nodemailer (for task sharing)

---

## ⚙️ Features

- 🔐 **OAuth 2.0 login (Google, GitHub, Facebook)**
- 📝 **Task Management (Create, Read, Update, Delete)**
- 📤 **Share tasks via email**
- 🔍 **Filtering (Status, Priority), Search, Sort**
- 📊 **Pagination with next/previous buttons**
- 📱 **Responsive on all devices**
- ✅ **Input validation with `express-validator`**
- 🛡️ **Rate limiting and secure API handling**

---

## 🗂️ Folder Structure

```
Taskflow/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   └── server.js
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
├── README.md
```

---

## 🧱 Architecture Diagram

![Architecture Diagram](./public/architecture.png)

---

## 🎥 Demo Video (Loom)

Watch the full walkthrough here:  
👉 [Loom Video Link](https://www.loom.com/share/your-video-link)
🔄 UI Update Notice: The user interface shown in the loom video is subject to change as the project evolves and improvements are made.

---

## 🔴 Important Notes

- 🛑 **If a newly created task is not visible:**
  - Ensure the **"Status" filter** is set to **"All Status"**
  - Even if **"All Status"** is already selected by default, try **selecting it again manually** to refresh the task list
  - Or use the **search bar** to locate your task quickly
    
---

## 🚀 Setup Instructions

1. Clone the repo:
   ```bash
   git clone https://github.com/Itshari2005/HP-TaskFlow-Hackathon.git
   ```

2. Install frontend:
   ```bash
   cd Taskflow
   npm install
   ```

3. Install backend:
   ```bash
   cd backend
   npm install
   ```

4. Create `.env` file in backend:
   ```
   MONGO_URL=your_mongo_uri
   JWT_SECRET=your_jwt_key
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   CLIENT_URL=https://hp-task-flow-hackathon.vercel.app
   EMAIL_USER=your_email
   EMAIL_PASS=your_email_password
   ```

5. Run backend:
   ```bash
   node server.js
   ```

6. Run frontend:
   ```bash
   npm run dev
   ```

---

## 📌 Assumptions Made

- All users are authenticated before accessing the task dashboard.
- Tasks are private per user unless explicitly shared.
- Email sharing works using a Gmail SMTP account.
- No WebSockets used due to hackathon time constraints.

---

## 🏁 Hackathon Declaration

> **This project is a part of a hackathon run by https://www.katomaran.com**

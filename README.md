# HP TaskFlow - Hackathon Project 🧠✅

**HP TaskFlow** is a full-stack task management web application built for productivity, real-time task control, and multi-platform accessibility.

This project was created as part of a hackathon and focuses on essential project management features such as:

- User authentication via OAuth 2.0 (Google, GitHub)
- JWT-based session management
- Task creation, editing, deletion (CRUD)
- Pagination, sorting, filtering (by status, priority, search)
- Sharing tasks via email
- Responsive UI for all devices (desktop, mobile, tablet)
- Hosting: Frontend on Vercel, Backend on Render

---

## 🔗 Live Links

- **Frontend (Vercel)**: [https://hp-task-flow-hackathon.vercel.app](https://hp-task-flow-hackathon.vercel.app)

  ⚠️ Important: Open the above link in new tab
  🔁 Avoid refreshing or manually visiting inner routes (e.g., /dashboard, /login) as it may cause a 404 Not    Found error due to routing issues. If that happens, simply come back here and click the link again.
  🧭 Always access the site from the home page and use internal navigation links to explore the app.

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

![Architecture Diagram](src/assets/TaskFlow_Architecture_Diagram.png)

---

## 🎥 Demo Video 

Watch the full walkthrough here:  
👉 [Video Link](https://drive.google.com/file/d/1Zp01zUj6uwfE-wnvKsTq7StDOCLREERf/view?usp=sharing)
🔄 UI Update Notice: The user interface shown in the video is subject to change as the project evolves and improvements are made.

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

📢 Check out the LinkedIn post for this project:
👉 [TaskFlow Walkthrough on LinkedIn](https://www.linkedin.com/posts/hari-prashath-22032005h_taskmanagement-reactjs-mongodb-activity-7345380860696698880-v7gb?utm_source=share&utm_medium=member_android&rcm=ACoAAD8-5VMBuGh0BpeC2of-YDrNbOr4vqhWn7M)

---

## 🏁 Hackathon Declaration

> **This project is a part of a hackathon run by https://www.katomaran.com**

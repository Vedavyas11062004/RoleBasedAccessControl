# Role-Based Access Control (RBAC) UI

The **Role-Based Access Control (RBAC) UI** is a modern, responsive web application built using **React**, **TypeScript**, and **Tailwind CSS**. It simplifies user and role management with advanced features, robust security, and an intuitive user interface.

---

## 🚀 Features

### User Management
- View, add, edit, and delete users.
- Assign roles and manage user statuses.
- Real-time search with advanced filtering and sorting.

### Role Management
- Create, modify, and delete roles.
- Visual interface for assigning permissions dynamically.
- Flexible role-based assignments.

### Dashboard
- Overview of system statistics and user-role distribution.
- Interactive charts and quick access to functionalities.

### Responsive Design
- Mobile-first layouts and adaptive design.
- Touch-friendly elements with a collapsible sidebar for smaller devices.

### Security
- Input validation with **Zod**.
- Secure form submissions and robust error handling for API communication.

---

## 🛠️ Tech Stack

- **Frontend**: React (with TypeScript), Tailwind CSS, React Icons.
- **State Management**: React Hook Form for form validation and handling.
- **API Integration**: Axios with interceptors for type-safe RESTful API communication.
- **Routing**: React Router for seamless navigation.

---

## 📂 Project Structure

src/ ├── components/ │ ├── UserManagement/ # User CRUD operations │ ├── RoleManagement/ # Role and permission management │ └── Dashboard/ # Metrics and analytics view ├── utils/ │ └── api.js # Centralized API utility ├── styles/ │ └── global.css # Tailwind global styles ├── App.tsx # Main App component └── index.tsx # Entry point of the application

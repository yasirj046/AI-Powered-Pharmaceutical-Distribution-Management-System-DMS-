# AI-Powered Pharmaceutical Distribution Management System (DMS)

A comprehensive pharmaceutical distribution management system with AI integration, built with modern web technologies.

## 🏗️ Project Structure

```
AI-Powered-Pharmaceutical-Distribution-Management-System-DMS-/
├── package.json                 # Root workspace configuration
├── README.md                    # This file
├── DMS server/                  # Backend API Server
│   ├── package.json
│   ├── index.js                 # Express server entry point
│   ├── app/
│   │   ├── controllers/         # API controllers
│   │   ├── models/             # MongoDB models
│   │   ├── routes/             # API routes
│   │   ├── services/           # Business logic
│   │   ├── middleware/         # Custom middleware
│   │   └── util/               # Utility functions
│   └── ...
└── frontend/                    # Next.js Frontend Application
    ├── package.json
    ├── next.config.js
    ├── src/
    │   ├── app/                # Next.js App Router
    │   ├── components/         # React components
    │   └── ...
    └── ...
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd AI-Powered-Pharmaceutical-Distribution-Management-System-DMS-
   ```

2. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env` in the `DMS server` folder
   - Configure your MongoDB connection and other settings

### Development

**Start both backend and frontend in development mode:**
```bash
npm run dev
```

**Or start them individually:**

**Backend only:**
```bash
npm run dev:backend
```

**Frontend only:**
```bash
npm run dev:frontend
```

### Production

**Start backend in production:**
```bash
npm run start:backend
```

**Build and start frontend:**
```bash
npm run build:frontend
npm run start:frontend
```

## 🔧 Technologies Used

### Backend (DMS Server)
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React** - UI library

## 📁 Key Features

- 🏢 **Brand Management** - Manage pharmaceutical brands
- 👥 **Employee Management** - Handle employee records
- 📦 **Product Management** - Manage pharmaceutical products
- 🏪 **Customer Management** - Customer relationship management
- 📊 **Area & Territory Management** - Geographical organization
- 🔐 **Authentication & Authorization** - Secure access control
- 📱 **Responsive Design** - Works on all devices

## 🗄️ Database Models

- **Brand** - Pharmaceutical brand information
- **Employee** - Employee records and management
- **Product** - Product catalog and details
- **Customer** - Customer information and relationships
- **User** - System users and authentication
- **Area/SubArea** - Geographical management
- **Group/Subgroup** - Product categorization

## 🔗 API Endpoints

The backend provides RESTful APIs for all major operations:

- `/api/brands` - Brand management
- `/api/employees` - Employee operations
- `/api/products` - Product management
- `/api/customers` - Customer operations
- `/api/users` - User authentication
- `/api/areas` - Area management

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 📞 Support

For support and questions, please contact [your-email@example.com]
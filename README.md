# RSTL Appointment Portal

## Overview
The RSTL (Regional Science and Technology Laboratory) Appointment Portal is a web-based application designed to streamline the process of scheduling and managing laboratory services appointments. This system serves various laboratory departments including Metrology, Chemistry, Microbiology, Shelf Life, and Research & Consultation services.

## Features
- 🔒 Secure user authentication and role-based access control
- 📅 Appointment scheduling and management for multiple laboratory types
- 🏢 Company verification and management system
- 🚛 Truck and metrology service management
- 📊 Laboratory service cataloging and pricing
- 📝 Detailed appointment tracking and status updates
- 📋 Sample management and test results recording
- 📈 Administrative dashboard and reporting

## Tech Stack
- **Frontend**: Next.js 14, React 18, TailwindCSS
- **UI Components**: Headless UI, Hero Icons, Framer Motion
- **Data Visualization**: Chart.js with React-Chartjs-2
- **Database**: PostgreSQL
- **Styling**: TailwindCSS with PostCSS
- **Development Tools**: ESLint, Autoprefixer

## Appointment Form Architecture
- **Laboratory Appointment Form**: A multi-step, multi-appointment form is used for Chemistry, Microbiology, and Shelf Life appointments. It supports contact information, sample details, service selection, and (if applicable) shelf life details, allowing users to book multiple appointments in one session.
- **Metrology Appointment Form**: Metrology appointments use a separate, custom form that includes company and truck verification, and specific metrology test details.
- **Research Consultation Form**: Research consultation appointments have their own dedicated form tailored to research needs.
- **Shared Components**: Some UI elements (calendar, overlays, modals) are reused, but the main appointment form logic is not shared between modules.

## Backend API Structure
- **Laboratory Appointments**: Handled via `/api/appointments` endpoint, supporting creation, listing, updating, and deletion. Data is stored in normalized tables: `appointments`, `appointment_details`, `customers`, etc. Dates are always stored as local date strings (YYYY-MM-DD).
- **Metrology Appointments**: Managed via `/api/appointments/metrology`, with custom logic for company and truck validation.
- **Other Appointment Types**: Each has its own API endpoint and logic as needed.

## Prerequisites
- Node.js (Latest LTS version recommended)
- PostgreSQL database server
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd RSTL_Appointment
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/rstl_appointment
NEXT_PUBLIC_API_URL=http://localhost:3000/api
# Add other required environment variables
```

4. Set up the database:
- Create a PostgreSQL database
- Run the database setup script:
```bash
psql -U your_username -d your_database_name -f setup_database.sql
```

5. Run the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## Project Structure
```
RSTL_Appointment/
├── src/
│   ├── app/          # Next.js app directory
│   ├── components/   # React components
│   ├── lib/          # Utility functions and configurations
│   └── styles/       # Global styles and Tailwind configurations
├── public/           # Static assets
├── database_schema.md # Database documentation
└── setup_database.sql # Database setup script
```

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## Database Schema
The application uses a comprehensive PostgreSQL database schema. Key entities include:
- Users (Staff/Admin)
- Customers
- Companies
- Services
- Appointments
- Test Results
- And more...

For detailed database documentation, see `database_schema.md`

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
[Add License Information]

## Support
[Add Support Contact Information]
# Money Manager

A simple, personal finance tracking web app to log daily income and expenses and generate monthly and yearly insights. Built using Next.js, Material UI and Supabase.

> **⚠️ This project is a work in progress.**
> Money Manager is under active development and still evolving. While functional, certain features and refinements are incomplete or experimental.


## Purpose

Money Manager was developed as a self-initiated project to apply full-stack development skills. The core goal was to create a tool that simplifies daily financial logging and allows end-of-year financial review through interactive visualizations.

This project simulates building a real-world application with authentication, database integration, clean UI, and analytics. Designed to solve a common problem: understanding where your money goes.

## Demo

> [_Live Demo_](https://money-manager-eta-five.vercel.app/)  
> (Hosted on Vercel, Supabase instance live)

## Features

- Add and delete daily income and expense entries
- Categorize transactions for clarity
- Monthly and yearly data visualization (planned feature)
- Clean and responsive Material UI design
- Supabase for real-time database and user authentication

## Tech Stack

- **Frontend:** React with Next.js
- **UI:** Material UI (MUI)
- **Backend / DB:** Supabase (PostgreSQL, Auth, RESTful API)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/afilipapereira/money-manager.git
   cd money-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Add Supabase credentials in `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` to view the app.


## Status & Roadmap

This is a work-in-progress prototype with the following roadmap:

- [x] Add/Update/Delete Income and expenses
- [x] Supabase integration
- [x] User Authentication
- [ ] Monthly/yearly visualizations
- [ ] Data export (CSV)


## Data Privacy Notice

This project is intended for personal learning and experimentation purposes only. Although it uses Supabase to store user data (including email addresses and financial records), no data is shared with third parties, and no real user data is collected or processed for commercial use.

All information is handled according to basic data protection principles, and access is restricted through Supabase's authentication and row-level security features. However, the application is not intended for production use and does not claim full GDPR compliance.

At this time, the application does not include user-facing tools for data removal. If you have interacted with the app and would like your data deleted, you can contact me directly to afilipaspereira@gmail.com, and I will process the request manually.


## License

This project is open-source and available under the MIT License.


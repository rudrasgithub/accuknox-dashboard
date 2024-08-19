# Vite + React + TypeScript + Redux 
## Accuknox Assignment for Frontend Trainee Role

This project is a dashboard application built with Vite, React, TypeScript, and Redux. It includes functionalities for managing categories and widgets.

## Features

1. **Category Management:**
   - Add or delete categories.
   
2. **Widget Personalization:**
   - Personalize widgets according to your needs.
   
3. **Widget Management:**
   - Add multiple widgets to a category or delete widgets from a category.
   
4. **Search Functionality:**
   - Search through all widgets across all categories.

## Installation

To run the application locally, follow these steps:

1. **Install Node.js Packages:**

   ```bash
   npm install
2. **Start the Development Server:**
   ```bash
    npm run dev
## Installation through Docker

First, ensure that you have Docker installed on your machine.

1. **Build the Docker Image:**

   ```bash
    docker build -t accuknox-dashboard .
2. **Run the Docker Container:**

   ```bash
    docker run -p 5173:5173 accuknox-dashboard
This command maps port 5173 of the container to port 5173 on your host machine. You can access the application in your web browser at [localhost](http://localhost:5173).
## For Quick Demo
  You can view a live demo of the application here: [demo](https://accuknox-dashboard-task.vercel.app)
## Contact Us
   Contact us at [Send email](mailto:rudramanaidu99@gmail.com).

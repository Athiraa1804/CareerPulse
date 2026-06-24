# CareerPulse – Smart Placement Management Portal

## Overview

CareerPulse is a full-stack placement management portal designed to streamline the campus recruitment process for students and placement cells. The platform enables students to create accounts, maintain academic and professional profiles, discover eligible companies, and track placement opportunities through a centralized dashboard.

The project is built using React for the frontend, Flask for the backend, and ShaktiDB/PostgreSQL for database management.

---

## Problem Statement

In many colleges, placement-related information is scattered across spreadsheets, emails, and messaging platforms. Students often struggle to:

* Track placement opportunities
* Maintain updated profiles
* Identify companies they are eligible for
* Manage applications effectively

CareerPulse addresses these challenges by providing a single platform for placement activities.

---

## Key Features

### Authentication System

* Student Registration (Signup)
* Secure Login
* Session Management using Local Storage
* Logout Functionality

### Student Profile Management

* View Personal Profile
* Edit Academic Information
* Update CGPA
* Add Skills
* Add Interests
* Update Contact Information
* Graduation Year Tracking

### Dashboard

* Personalized Student Dashboard
* Dynamic Profile Loading
* Placement-Oriented Navigation
* Quick Access to Major Modules

### Company Management

* View Available Companies
* Company Information Display
* Role Details
* Package Information
* Location Information
* CGPA Cutoff Tracking

### Eligibility Checker

CareerPulse automatically identifies companies a student is eligible for based on:

* Student CGPA
* Company CGPA Cutoff

This helps students focus only on relevant opportunities.

### My Offers Module

Displays companies that the student is eligible to apply for.

Features:

* Eligibility-based filtering
* Organized card-based UI
* Company-specific information
* Future application tracking support

---

## System Workflow

Student Registration
↓
Login
↓
Complete Profile
↓
Update Skills & Interests
↓
Eligibility Check
↓
View Eligible Companies
↓
Apply for Opportunities

---

## Technology Stack

### Frontend

* React
* TypeScript
* React Router
* CSS

### Backend

* Flask
* Flask-CORS
* Python

### Database

* ShaktiDB
* PostgreSQL
* psycopg2

### Development Tools

* VS Code
* Git
* GitHub
* Postman

---

## Database Design

Main Tables:

### students

Stores:

* Student Information
* Academic Details
* Contact Information

### users

Stores:

* Login Credentials
* Student Authentication Data

### skills

Stores:

* Available Skills

### student_skills

Stores:

* Student-Skill Mapping

### interests

Stores:

* Student Interests

### companies

Stores:

* Company Information
* Recruitment Criteria

---

## Current Achievements

✔ User Authentication System

✔ Student Profile Management

✔ Dynamic Dashboard

✔ Company Listing Module

✔ Eligibility Checker

✔ Skills and Interests Management

✔ ShaktiDB Integration

✔ GitHub Version Control

---

## Future Enhancements

* Resume Upload and Management
* Application Tracking System
* Placement Analytics Dashboard
* Interview Scheduling
* Email Notifications
* Admin Portal
* Placement Cell Dashboard
* Advanced Skill-Based Matching
* AI-Powered Career Recommendations

---

## Project Goal

The goal of CareerPulse is to provide an efficient, scalable, and student-centric placement management solution that simplifies recruitment activities while helping students identify and apply for opportunities best suited to their profiles.

---

### Developed By

Athira K V

B.Tech Computer Science & Engineering

TKM College of Engineering

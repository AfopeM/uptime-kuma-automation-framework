# Exploratory Testing

This document captures exploratory testing notes for the Uptime Kuma application.  
The focus is on monitors, alerts, and history tracking with a dashboard view.

The goal is to understand if Uptime Kuma notices and can alert users when services go down.

---

## 📋 Table of Contents

1. [Application Overview](#1-application-overview)
2. [User Roles](#2-user-roles)
3. [Application Map](#3-application-map)
4. [Feature Inventory](#4-feature-inventory)
5. [Initial Observations](#5-initial-observations)

---

## 1. Application Overview

### 1.1 Purpose

Uptime Kuma is a self-hosted monitoring tool.  
It checks if services are up or down and sends alerts when problems happen.

### 1.2 Target Users

- **Team Lead:** Manage alerts and service health
- **Small Teams:** Track uptime without paid tools
- **Software Engineers:** Monitor servers, APIs, and websites

### 1.3 High-Level Functionality

| Feature        | Description                                 |
| -------------- | ------------------------------------------- |
| **Login Page** | Login into application                      |
| **Dashboard**  | Show current system status                  |
| **Monitors**   | Check if a service is up or down            |
| **Alerts**     | Send messages when a service fails/recovers |
| **Event Logs** | Record past uptime and downtime events      |

### 1.4 Assumptions / Notes

- Uptime Kuma is already installed and running
- User has access to notification services (email, Discord, etc.)
- Internet connection is stable during testing

---

## 2. User Roles

| Role  | Access Level | Notes                          |
| ----- | ------------ | ------------------------------ |
| Admin | Full access  | Can create monitors and alerts |

---

## 3. Application Map

```
Login Page
│
├─► Dashboard
│ ├─► Quick Stats
│ └─► Event Logs
│
├─► Monitor Section
│ ├─► Monitor List
│ └─► Add / Edit Monitor
│     └─► Notifications
│       └─► Add / Edit Notification
│
└─► User Menu
  ├─► Maintenance
  ├─► Settings
  ├─► Help
  └─► Logout
```

---

## 4. Feature Inventory

### 4.1 Global Features

#### Navigation Menu

| Feature     | Type     | Function                 |
| ----------- | -------- | ------------------------ |
| Dashboard   | Link     | View system status       |
| Status Page | Link     | View or edit status page |
| User Menu   | Dropdown | View user menu           |

#### User Menu

| Feature     | Type | Function                                                            |
| ----------- | ---- | ------------------------------------------------------------------- |
| Maintenance | Link | CRUD (Create, read, update and delete) schedule monitor maintenance |
| Settings    | Link | App and user settings                                               |
| Help        | Link | External link to uptime kuma git page                               |
| Logout      | Link | Logout of application and redirects to login page                   |

### 4.2 Page-Specific Features

#### Login Page

| Feature  | Type       | Function                                                    |
| -------- | ---------- | ----------------------------------------------------------- |
| Username | Text Input | Allows your to enter username                               |
| Password | Text Input | Allows your to enter password                               |
| Login    | Button     | Authenticates user and if successful redirects to dashboard |

#### Dashboard Page

| Feature          | Type      | Function                               |
| ---------------- | --------- | -------------------------------------- |
| Up Count         | Indicator | Shows total monitors currently online  |
| Down Count       | Indicator | Shows total monitors currently failing |
| Clear All Events | Button    | Clears monitor event history log       |
| Name             | Text      | Displays the service name              |
| Status           | Indicator | Shows current state (Down/Up/etc)      |
| Date/Time        | Text      | Timestamp of the status change         |
| Message          | Text      | Detailed error message                 |

#### Monitors Section

| Feature              | Type         | Function                               |
| -------------------- | ------------ | -------------------------------------- |
| Add Monitor Button   | Button       | Create a new monitor                   |
| Monitor Type         | Dropdown     | Select HTTP, Ping, TCP, etc.           |
| URL Field            | Text Input   | Enter target URL                       |
| Accepted Status Code | Dropdown     | Select successful status code response |
| Interval Setting     | Number Input | Enter check frequency in seconds       |
| Set Up Notification  | Button       | Open notification                      |
| Save Button          | Button       | Save monitor                           |

#### Notifications Page

| Feature           | Type       | Function                      |
| ----------------- | ---------- | ----------------------------- |
| Add Notification  | Button     | Create new alert method       |
| Notification Type | Dropdown   | Email, Discord, Webhook, etc. |
| Webhook URL       | Text Input | Enter webhook URL             |
| Test Notification | Button     | Send test alert               |
| Enable / Disable  | Toggle     | Turn alerts on or off         |
| Save Button       | Button     | Save notification             |

---

## 5. Initial Observations

### 5.1 Functional Observations

- Monitor setup is fast but UI is overwhelming at first glance
- Dashboard updates quickly after failures
- Alerts trigger on both failure and recovery

### 5.2 Issues & Risks Observed

| Issue                  | Severity  | Description                                      |
| ---------------------- | --------- | ------------------------------------------------ |
| Alert Noise            | 🟡 Medium | Fast up/down checks can create many alerts       |
| Crowded Monitor Screen | 🟢 Low    | A lot of features could be abstracted away       |
| Slow Failure Detection | 🟡 Medium | Large intervals delay failure detection          |
| Limited Alert Messages | 🟡 Medium | Alerts do not allow enough message customization |

### 5.3 Recommendations

| Recommendation            | Description                                                                   |
| ------------------------- | ----------------------------------------------------------------------------- |
| Alert Frequency Control   | Allow users to control how often alerts are sent during long outages          |
| Simplified Monitor Setup  | Hide advanced settings by default to reduce confusion                         |
| Failure Condition Options | Allow checks beyond simple response (status code, content, or timeout)        |
| Custom Alert Messages     | Let users fully customize alert text with service details                     |
| Testability Enhancements  | Add more dedicated data test identifier to make automated tests more reliable |

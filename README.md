# Jobby App

**Jobby App** is a job search platform that enables users to browse job listings, apply filters based on employment type and salary, and view detailed information about each job. The application includes a login system, navigable routes, and API integrations for an interactive job search experience.

🔗 **[Live Link: Jobby App](https://myjobbyapp12.ccbp.tech/)**

### Login Credentials
- **Username**: `rahul`
- **Password**: `rahul@2021`

---

## Features & Routes

### Authentication
- **Login Validation**: Displays an error message if credentials are invalid.
- **Navigation on Login**: Redirects to the Home page upon successful login.
- **Access Control**:
  - Unauthenticated users attempting to access restricted routes (Home, Jobs, Job Details) are redirected to the Login page.
  - Authenticated users accessing the Login page are redirected to the Home page.

#### Login Page
![Login Page](https://res.cloudinary.com/doov17zaw/image/upload/v1730166207/Jobbby%20App/Web_capture_29-10-2024_71121_myjobbyapp12.ccbp.tech_vl9l1x.jpg)

---

### Routes Overview

#### 1. Home Route
- **Find Jobs Button**: Clicking this button navigates to the Jobs page.
  
  ![Home Page](https://res.cloudinary.com/doov17zaw/image/upload/v1730166208/Jobbby%20App/Web_capture_29-10-2024_7853_myjobbyapp12.ccbp.tech_smfq8k.jpg)

#### 2. Jobs Route
- **Profile API Request**:
  - Fetches and displays user profile data upon loading with a loader.
  - If the data fetch fails, a retry button appears.
- **Jobs API Request**:
  - Retrieves a list of jobs with filters for `employment_type`, `minimum_package`, and `search`.
  - Displays a loader while fetching and a retry button if data fetch fails.
  - **Filtering Options**:
    - **Search by Keyword**: Searches for jobs based on input text.
    - **Filter by Employment Type**: Allows selection of multiple job types (e.g., Full-time, Part-time).
    - **Filter by Salary Range**: Filters jobs by minimum salary.
  - **No Jobs View**: Displays when no jobs match the selected filters.
  - **View Job Details**: Clicking a job navigates to the Job Details page.

  ![Jobs Page](https://res.cloudinary.com/doov17zaw/image/upload/v1730166209/Jobbby%20App/Web_capture_29-10-2024_7931_myjobbyapp12.ccbp.tech_xm6eid.jpg)
  

#### 3. Job Item Details Route
- **Job Details API Request**:
  - Fetches and displays job details and similar jobs while showing a loading spinner.
  - If data retrieval fails, a retry button is shown.
  - **Visit Company Website**: Opens the company's website in a new tab.

  ![Job Details Page](https://res.cloudinary.com/doov17zaw/image/upload/v1730166209/Jobbby%20App/Web_capture_29-10-2024_7956_myjobbyapp12.ccbp.tech_i6wpdx.jpg)

#### 4. Not Found Route
- Redirects to a 404 Not Found page if the user tries to access an invalid path.

---

### Header
- **Logo**: Clicking it navigates to the Home page.
- **Navigation Links**:
  - **Home**: Redirects to the Home page.
  - **Jobs**: Redirects to the Jobs page.
- **Logout Button**: Logs the user out and redirects to the Login page.

---

# CCC181 Week 10: CampusConnect Mobile-First Login Page

React + TypeScript starter for the Week 10 group activity. The page is already
built. Your group's job is the **mobile-first CSS** and the **GitHub teamwork**.

## Run it

```bash
npm install
npm run dev          # open the local URL it prints
npm run dev:phone    # same, but your phone (same Wi-Fi) can open the Network URL
npm run build        # must finish with no errors before you submit
```

## Rules

- Edit only the CSS files in `src/styles/` (one member = one file). Do not edit `reset.css`.
- Plain CSS only. No Tailwind, Bootstrap, Material UI, styled-components, or any UI library.
- Phone styles first (no media query), then `min-width` queries only. Never `max-width`.
- Do not edit the `.tsx` files or rename classes. If you must, tell the group first.

## Group information (fill in)

| Item | Your answer |
| --- | --- |
| Group number | 2 |
| Section | IT3-B|
| Repository URL |https://github.com/ernestoorate/CCC181-Week10-Group2/ |

## Members (each member fills in their own row in their own commit)

| Member | Name | GitHub username | CSS file | What I did |
| --- | --- | --- | --- | --- |
| 1 (leader) | Ernesto Jr. T. Orate | ernestoorate| `base.css` | Created base.css by setting up the website's global styles, color scheme, typography, and responsive layout.| 
| 2 | Joevan Lloyd ilustrado | joevanlloydilustrado3136| `nav.css` | Updated nav.css by creating a responsive navbar using Flexbox and a footer using CSS Grid, styling them with the project's color scheme, adding hover and focus effects for accessibility, and implementing 768px and 1024px breakpoints for tablet and desktop layouts.|
| 3 | Frank Leo Samson | FrankLeoSamson | `form.css` | Styled the login card and form in form.css with Flexbox: stacked 48 px fields and buttons on phone, checkbox row and buttons side by side from 768 px, and a larger card padding from 1024 px.|

## Experiment 0: the page without the viewport tag

What did the page look like in DevTools phone mode **before** adding the viewport meta tag?
What changed **after** adding it?

Before adding the viewport meta tag, the page appeared zoomed out and smaller in phone mode because the browser used a wider default layout viewport. After adding the viewport tag, the page adjusted to the actual screen width, making the content properly sized and easier to view on mobile devices.

## DevTools test results

| Width | What must be true | Pass? |
| --- | --- | --- |
| 360 px | 1 column. Nav links stacked and 48px tall. Options and buttons stacked. Footer in 1 column. No sideways scrollbar. | Yes |
| 768 px | Nav in one row (brand left, links right). Checkbox and link in one row. Two buttons side by side. | Yes |
| 1024 px | Brand panel and login card side by side. Footer in 3 columns. Heading is larger. | Yes |
| 1280 px | Content centered and stops at 1200px. | Yes 

### Breakpoints I observed

Using **Show media queries** and dragging slowly from 360 px to 1280 px, the layout changed at these exact widths:

768px – Tablet layout adjustments.

1024px – Brand panel and login card appear side by side.

1280px – Content becomes centered with a maximum width of 1200px.

No broken layouts or sideways scrolling were observed during testing.

Screenshots are in `screenshots/` as `360.png`, `768.png`, `1024.png`, `1280.png`.

## What our group learned (leader writes this last)

Our group learned the importance of mobile-first design, responsive breakpoints, and proper viewport settings. We also learned how CSS media queries help create a layout that adjusts to different screen sizes while maintaining readability, accessibility, and consistency.


#How to Run the Application
Prerequisites
- Node.js and npm installed
- Git installed
- Visual Studio Code

#1. Clone the repository
git clone https://github.com/ernestoorate/CCC181-Week10-Group2.git
cd CCC181-Week10-Group2

#2. Install frontend dependencies
Run in the project root: npm install

#3. Install backend dependencies
cd server
npm install

#4. Configure environment variables
Create a .env file in the project root: VITE_API_URL=http://localhost:3000/api/v1

Create another .env file inside the server/ folder:PORT=3000
JWT_SECRET=your-long-random-secret
CLIENT_ORIGIN=http://localhost:5173

The repository includes .env.example files for both frontend and backend configuration. Copy their contents when creating your local .env files.

Important: Never commit actual .env files or expose your JWT secret.

#5. Start the backend
Open the first terminal:cd server 
npm start

Expected output: API running on http://localhost:3000

#6. Start the frontend
Open a second terminal in the project root: npm run dev

Open the application: http://localhost:5173

#7. Test the backend health endpoint
Visit: http://localhost:3000/api/v1/health

Expected HTTP response: 200 OK.

#Demo Account
| Field | Value |
| --- | --- |
| Email | student@campusconnect.test | 
| Password |	Campus26 | 

#API Summary
The CampusConnect backend provides the following authentication endpoints:
| HTTP Method| Endpoint | 	Description |
| --- | --- | --- | 
| GET | /api/v1/health | Checks whether the backend server is running. | 
| POST| /api/v1/sessions | 	Authenticates a student and generates a JWT token. | 
| GET|	/api/v1/users/me | 	Retrieves the authenticated user's information using a valid JWT. | 

#Authentication
Protected endpoints require a JWT in the Authorization header: Authorization: Bearer <token>
#Common API Responses
| Status Code | Meaning |
| --- | --- |
| 200 | student@campusconnect.test | 
| 400 |	Invalid or incomplete request | 
| 401 | Unauthorized or invalid credentials  |
| 404 | Unauthorized or invalid credentials  |
| 500 | Internal server error |
#For detailed request formats, response examples, and authentication requirements, see API-SPEC.md.

## Members (each member fills in their own row in their own commit)

| Member | Name | GitHub username | Area | What I did |
| --- | --- | --- | --- | --- |
| 1 (leader) | Ernesto Jr. T. Orate | ernestoorate| Backend: login |Implemented the backend login functionality, configured the Express server, validated login credentials, verified passwords using bcrypt, and generated JWT tokens.| 
| 2 | Joevan Lloyd ilustrado | joevanlloydilustrado3136| Backend: protection and documents | 	Implemented JWT authentication middleware, protected the user information endpoint, handled API errors, prepared API documentation, and performed Postman testing.|
| 3 | Frank Leo Samson | FrankLeoSamson | Front end | Integrated the frontend login form with the backend API, implemented loading and error states, created the Welcome screen, managed sessions using sessionStorage, implemented logout, and styled authentication components.|

#Screenshots and Testing Evidence
The following screenshots demonstrate the functionality and testing results of the CampusConnect application.

#Postman API Testing
Save the following screenshots in the screenshots/ folder:
| Screenshot |	Description | 
| postman-health.png	| Successful backend health check (200 OK). |
| postman-login-200.png	| Successful login with valid credentials (200 OK). |
| postman-login-401.png	| Login attempt with invalid credentials (401 Unauthorized). |
| postman-me-401.png	| Access to the protected user endpoint without a valid token (401 Unauthorized). |

#Frontend Testing
Save these screenshots in the same screenshots/ folder: 
| Screenshot	| Description |
| login-fail-360.png |	Login page showing an error message at 360px mobile width. |
| login-success-360.png | Successful login and Welcome screen at 360px mobile width. |
These screenshots provide evidence of API functionality, authentication behavior, error handling, and mobile responsiveness.

##What We Learned
Through this activity, we gained practical experience in developing a full-stack web application by connecting a React frontend to an Express backend. We learned how to implement user authentication, validate login credentials, securely hash passwords using bcrypt, generate and verify JWT tokens, and protect API endpoints using authentication middleware.

We also improved our understanding of frontend and backend integration, environment variable configuration, API testing using Postman, responsive web design, and collaborative development using Git and GitHub. Working as a team helped us understand the importance of dividing responsibilities, managing branches, reviewing code, and integrating individual contributions into one functional application.

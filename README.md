# User Management Dashboard

## Project Overview

A robust, modern User Management Dashboard built with React and Vite. This application allows administrators to perform full CRUD (Create, Read, Update, Delete) operations on user data, interacting with the JSONPlaceholder mock REST API. 

It features real-time search, multi-field filtering, lexicographical sorting, and pagination to handle data efficiently. The UI is designed with a premium, responsive aesthetic using Vanilla CSS, eliminating the need for heavy CSS frameworks while maintaining a highly polished user experience.

## Installation Instructions

1. Ensure you have **Node.js** (v18+ recommended) installed.
2. Clone this repository or extract the project folder.
3. Open a terminal and navigate to the root directory of the project.
4. Run the following command to install all necessary dependencies:
   ```bash
   npm install
   ```

## Running the Project

To launch the local development server, run:
```bash
npm run dev
```
The application will typically be accessible at `http://localhost:5173`.

To build the project for production, run:
```bash
npm run build
```

## Folder Structure Map

```text
user-management-dashboard/
├── public/
│   └── vite.svg
├── src/
│   ├── api/
│   │   └── userService.js        # Axios configurations & API calls
│   ├── components/               # Modular UI components
│   │   ├── ConfirmDelete.jsx
│   │   ├── ConfirmDelete.css
│   │   ├── ErrorBoundary.jsx
│   │   ├── FilterPopup.jsx
│   │   ├── FilterPopup.css
│   │   ├── Header.jsx
│   │   ├── Header.css
│   │   ├── Pagination.jsx
│   │   ├── Pagination.css
│   │   ├── SearchBar.jsx
│   │   ├── SearchBar.css
│   │   ├── UserForm.jsx
│   │   ├── UserForm.css
│   │   ├── UserRow.jsx
│   │   ├── UserTable.jsx
│   │   └── UserTable.css
│   ├── hooks/
│   │   └── useUsers.js           # Custom hook for fetching and managing user state
│   ├── styles/
│   │   └── global.css            # Global CSS variables and design tokens
│   ├── utils/
│   │   ├── constants.js          # Shared constants (API URL, Departments)
│   │   └── validators.js         # Input validation logic
│   ├── App.jsx                   # Root layout and state aggregation
│   ├── App.css                   # Main application layout styles
│   ├── index.css                 # CSS reset and base typography
│   └── main.jsx                  # React application entry point
├── package.json
├── vite.config.js
└── README.md
```

## Libraries Used

- **React (v19)**: Core UI framework.
- **Vite**: Ultra-fast build tool and development server.
- **Axios**: Promise-based HTTP client for making reliable API requests.
- **Lucide React**: Beautiful, consistent iconography.

## Engineering Assumptions

Because the mock API (JSONPlaceholder) does not perfectly match the specific assignment requirements, the following data transformation assumptions were made during initialization:
1. **Name Extraction**: The API provides a single `name` string. The application automatically splits this string by the first space. The first segment is assigned to `firstName`, and the remaining segments are joined and assigned to `lastName`.
2. **Department Assignment**: The API does not provide a department field. The application injects a default placeholder department (`"Engineering"`) to all fetched users. Users can modify this later via the Edit functionality.
3. **Mock Backend Persistence**: Since JSONPlaceholder is a read-only mock API, `POST`, `PUT`, and `DELETE` requests return simulated success responses. The application handles this by instantly updating the local state to reflect the changes, ensuring a seamless user experience despite the lack of true backend persistence.

## Challenges Faced

- **Mock API Limitations**: Simulating CRUD operations on a read-only API requires robust local state management. I had to ensure that when a new user is added or edited, the local React state perfectly mimics a successful server response. For example, manually generating an ID for newly "created" users.
- **Complex Derived State**: Balancing Search, Filter, Sort, and Pagination simultaneously requires careful optimization. Using `useMemo` hooks ensured that deriving the final visible dataset remained highly performant and didn't cause unnecessary re-renders when only unrelated state (like a modal opening) changed.
- **Premium Vanilla CSS**: Building a cohesive, premium design system without Tailwind or Bootstrap required setting up a rigorous set of CSS variables (`global.css`) for consistent spacing, colors, and shadows, ensuring the app feels modern and responsive across all devices.

## Future Architectural Improvements

- **Real Backend Integration**: Replace JSONPlaceholder with a real Node.js/Express or serverless backend coupled with a database (e.g., PostgreSQL or MongoDB) for true data persistence.
- **Server-Side Pagination & Searching**: Currently, the app fetches all users and processes search/pagination locally. For production apps with thousands of users, these operations should be offloaded to the server using query parameters.
- **Advanced State Management**: As the application grows, moving from localized `useState` to a global store like Redux Toolkit or Zustand could simplify passing state between deeply nested components.
- **React Router**: Adding routing (e.g., `/users/add`, `/users/edit/:id`) to support deep linking.

## Submission Details

- **GitHub Repository Link**: [Insert GitHub Repo Link Here]
- **Published / Deployed Project Link**: [Insert Live URL Here]
- **Screen Recording Link**: [Insert Video Link Here (Google Drive, Loom, or YouTube)]

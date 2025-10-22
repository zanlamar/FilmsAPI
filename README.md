# FilmsAPI

A modern film discovery application built with **Angular 20** and The Movie Database (TMDB) API, demonstrating core front-end development practices including component architecture, reactive HTTP services, and responsive design patterns.

## 🍏 Features

- **Dynamic film grid** — infinite scroll pagination to load films progressively as users explore.
- **Real-time poster loading** — lazy-loaded images from TMDB with fallback placeholders for missing data.
- **Detailed film pages** — dedicated routes for each film displaying comprehensive information including title, genres, language, release date, and synopsis.
- **Rating display** — visual rating badges on detail pages for quick film assessment.
- **Responsive navigation** — sticky navbar with routing links across all screen sizes.
- **Infinite scrolling** — custom scroll directive to automatically trigger data loading at the bottom of the page.
- **Error handling** — graceful state management for failed API calls and missing data.
- **Mobile-first design** — fully optimized for desktop, tablet, and mobile devices with CSS Grid and media queries.

## 📂 Project Structure

This project follows a **component-based Angular folder structure** with clear separation of concerns, organizing features as standalone components while centralizing shared logic, state management, and utilities.

```
src/
 ├── app/
 │    ├── film-page/              # Film detail feature
 │    │    ├── film-page.ts       # Component logic
 │    │    ├── film-page.html     # Template
 │    │    ├── film-page.css      # Styles
 │    │    └── film-page.spec.ts  # Unit tests
 │    │
 │    ├── home/                   # Home/film grid feature
 │    │    ├── home.ts            # Component logic
 │    │    ├── home.html          # Template
 │    │    ├── home.css           # Styles
 │    │    └── home.spec.ts       # Unit tests
 │    │
 │    ├── login/                  # Authentication feature (placeholder)
 │    │    ├── login.ts
 │    │    ├── login.html
 │    │    └── login.css
 │    │
 │    ├── register/               # Registration feature (placeholder)
 │    │    ├── register.ts
 │    │    ├── register.html
 │    │    └── register.css
 │    │
 │    ├── shared/                 # Shared resources across features
 │    │    │
 │    │    ├── directives/        # Custom reusable directives
 │    │    │    └── scroll-end.directive.ts    # Detects scroll end for infinite loading
 │    │    │
 │    │    ├── guards/            # Route guards for protection
 │    │    │    ├── auth.guard.ts              # Authentication guard
 │    │    │    └── auth.guard.spec.ts        # Guard unit tests
 │    │    │
 │    │    ├── models/            # Data layer (TypeScript interfaces)
 │    │    │    ├── film-basics.ts             # Film and APIResponse interfaces
 │    │    │    └── film-details.ts            # FilmDetail, Genre, and Cast interfaces
 │    │    │
 │    │    └── services/          # Business logic layer (API calls, state)
 │    │         ├── API-service.ts             # Film listing with pagination logic
 │    │         ├── API-film-details.service.ts # Film details fetching
 │    │         └── auth.service.ts            # Authentication logic
 │    │
 │    ├── app.routes.ts           # Application routing definition
 │    ├── app.ts                  # Root component with navigation
 │    ├── app.css                 # Global styles
 │    └── app.config.ts           # Application bootstrap configuration
 │
 ├── environments/                # Environment-specific configuration
 │    └── environment.ts          # API keys and endpoints
 │
 ├── index.html                   # Entry point HTML
 ├── main.ts                      # Application bootstrap file
 └── styles.css                   # Global stylesheets
```

### Architecture Layers

This project demonstrates a **layered architecture** approach:

- **Presentation Layer** (`film-page/`, `home/`, `login/`, `register/`) — Standalone components handling user interactions and displaying data
- **Business Logic Layer** (`services/`) — API calls, state management with signals, and business rules encapsulated in injectable services
- **Data Layer** (`models/`) — TypeScript interfaces defining data structures for type safety and consistency
- **Shared Layer** (`directives/`, `guards/`) — Reusable utilities and route protection logic used across features
- **Routing Layer** (`app.routes.ts`) — Centralized route configuration with lazy loading capabilities

## 👾 Technologies Used

- **Angular 20.3.3** — standalone components with signals
- **TypeScript** — type-safe development
- **RxJS** — reactive programming with Observables
- **TMDB API** — The Movie Database (REST API with Bearer token authentication)
- **CSS Grid & Flexbox** — responsive layouts
- **Angular Router** — client-side routing and navigation
- **Angular Signals** — reactive state management

## 👩‍💻 Prerequisites

Before running this project, ensure you have installed:
- Node.js (v18 or higher)
- npm (comes with Node.js)
- Angular CLI (20.3.3)
- A valid TMDB API key (get it at [themoviedb.org](https://www.themoviedb.org/settings/api))

## ⚙️ Installation

1. Install Angular CLI globally:
```bash
npm install -g @angular/cli
```

2. Clone the repository:
```bash
git clone https://github.com/yourusername/films-api.git
```

3. Navigate to project directory:
```bash
cd films-api
```

4. Install dependencies:
```bash
npm install
```

5. Configure your environment variables in `src/environments/environment.ts`:
```typescript
export const environment = {
  API_KEY: 'your_tmdb_api_key_here',
  API_READ_TOKEN: 'your_tmdb_read_token_here'
};
```

6. Run the project:
```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload when you modify any source files.

## 🔮 Future Improvements

- **Angular Reactive Forms** — implement reactive forms with FormBuilder and FormGroups for advanced film filtering, search, and user authentication flows with built-in validation and error handling.
- **Advanced filtering** — implement genre, year, and rating filters with reactive form controls and query parameters for refined film searches.
- **Search functionality** — add real-time search capabilities powered by TMDB's search endpoint with debouncing for performance.
- **Live authentication styles** — integrate login/register flows with backend authentication for personalized experiences and user profiles.
- **Unit testing** — add Jasmine and Karma test suites for critical services and components to ensure reliability.

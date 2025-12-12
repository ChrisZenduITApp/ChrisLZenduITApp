# ZenduForms - Reports Module

This is the front-end project I built for the take-home, mainly focusing on the **Reports** screen. It lets users see a list of reports and includes basic features like searching, sorting, deleting, and pagination.

## 🏃 Local Setup and Running

This project uses the Angular framework. I use the Angular command line interface (`ng`) for managing and running the project.

### Prerequisites

You need to have the Angular CLI installed globally or locally, along with [Node.js](https://nodejs.org/en/) and npm.

### Installation Steps

1.  **Get the code:**

    ```bash
    git clone https://github.com/ChrisZenduITApp/ChrisLZenduITApp
    cd ChrisLZenduITApp
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

### How to Run

To start the local development server:

```bash
ng serve
```

  * This command compiles the project and hosts it locally.
  * It should automatically open in your browser at `http://localhost:4200/`.
  * The application automatically redirects to the `/reports` page.

### Testing

Run the unit tests:

```bash
ng test
```

### Building the Project

To build the final production files:

```bash
ng build
```

  * The output files will be located in the `dist/` directory.

-----

## 🛠️ Main Components and What They Do

The Reports page functionality is split up into a few parts:

| Component | What it is | Main job |
| :--- | :--- | :--- |
| `App` (`app-root`) | The root component | Sets up the entire page, including the `Header` and the area where page content loads (`router-outlet`). |
| `Header` (`app-header`) | The top navigation bar | Handles global navigation and displays the company title ("ZenduForms"). It has 6 navigation links for different modules. |
| `ReportsPage` | The main screen (container) | It handles all the data logic: getting the list, filtering it, sorting it, and figuring out what reports to show on the current page. It calls the service. |
| `ReportsTable` | The table (presentational) | It just takes the small list of reports passed to it and draws the table rows. If the user clicks delete, it tells the main page. |
| `ReportsService` | The backend mock | This holds the dummy data (`MOCK_REPORTS`) and has the functions to search, sort, and delete the reports from that list. |

### How the Features Work

  * **Navigation (`Header`):** The navigation links in the header are set up with Angular's `routerLink` and `routerLinkActive` directives to handle routing and highlight the active page. All non-reports paths (like `/forms` or `/customers`) load a basic placeholder component.
  * **Search/Filter:** The search bar looks for a match in the report's `name`, `ownerEmail`, or `associatedForm` field. It's case-insensitive.
  * **Sort:** You can sort by **Newest** or **Oldest**, based on the `createdDate` of the report.
  * **Pagination:** I set the page size to 5 items. The logic automatically moves the page back if the last item on a page is deleted. There is also some logic in `getVisiblePages()` to add the `...` for lots of pages.

-----

## 🧐 Additional Notes for Reviewers

  * I used **Angular Standalone Components** for everything (no old NgModules).
  * I tried to use the new Angular built-in control flow syntax like `@for` and `@if` in the templates.
  * All data handling happens inside the `ReportsPage.applyFiltersAndSort()` method, which calls the service methods in order (filter, sort, then paginate).
  * The styles are just regular CSS files linked to the components (`styleUrl`), I didn't use a pre-processor.
  * I put accessibility attributes like `aria-label` on the pagination buttons.
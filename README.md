# Stock tracker app

## About the Project

### This is a stock tracker application, it allows the user to subscribe to stocks by entering ISIN codes and receives real-time updates of their prices.

## Implementation description

- The app is built using `Vue.js`, and receives real-time updates through a WebSocket connection to a server.
- The app validates the inputted ISIN codes, displays error messages if the validation fails, and displays the subscribed stocks in a table.
- The component includes other reusable components such as a `header`, `text-field`, `card`, `button`, and a `toast-center` for displaying notifications.
- The project uses `Jest` for unit testing and `Vite` as the build tool.

## Setup instructions

1. Install npm packages

   ```bash
   npm i
   ```

2. Run the app

   ```bash
   # npm
   npm run dev

   # or yarn
   yarn dev
   ```

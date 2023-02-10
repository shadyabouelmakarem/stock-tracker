# Stock tracker app

## About the Project

### This is a stock tracker application, it allows the user to subscribe to stocks by entering ISIN codes and receives real-time updates of their prices.

## live demo

CodeSandBox: [Stock Tracker App](https://codesandbox.io/p/github/shadyabouelmakarem/stock-tracker/master?workspaceId=bb72ea86-2cde-4940-9d78-8159e42aa185&file=%2FREADME.md&workspace=%257B%2522activeFileId%2522%253A%2522cldyuwun8000yfogv1ygi9fvi%2522%252C%2522openFiles%2522%253A%255B%2522%252FREADME.md%2522%255D%252C%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522gitSidebarPanel%2522%253A%2522COMMIT%2522%252C%2522spaces%2522%253A%257B%2522cldyuq17y000x356imbczm2b8%2522%253A%257B%2522key%2522%253A%2522cldyuq17y000x356imbczm2b8%2522%252C%2522name%2522%253A%2522Default%2522%252C%2522devtools%2522%253A%255B%257B%2522key%2522%253A%2522cldyuwvjb000x356i4uecvdbk%2522%252C%2522type%2522%253A%2522PROJECT_SETUP%2522%252C%2522isMinimized%2522%253Afalse%257D%252C%257B%2522type%2522%253A%2522PREVIEW%2522%252C%2522taskId%2522%253A%2522dev%2522%252C%2522port%2522%253A3000%252C%2522key%2522%253A%2522cldyuxhxe009s356ih6bo3gde%2522%252C%2522isMinimized%2522%253Afalse%257D%252C%257B%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522dev%2522%252C%2522key%2522%253A%2522cldyuxh28007o356ibt23etva%2522%252C%2522isMinimized%2522%253Afalse%257D%255D%257D%257D%252C%2522currentSpace%2522%253A%2522cldyuq17y000x356imbczm2b8%2522%252C%2522spacesOrder%2522%253A%255B%2522cldyuq17y000x356imbczm2b8%2522%255D%252C%2522hideCodeEditor%2522%253Afalse%257D)

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

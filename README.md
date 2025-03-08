# Barebones, basic modern web backend setup

## Dependency list:
- `TypeScript`
- `Express`
- `Prisma`
- `Zod`
- `Nodemon`

## Key features:
- `Simple token based auth`
- `Barebones structure`

Install the project dependencies:

```
npm i
```

## Usage

For development purposes, you can run the application using Nodemon to automatically restart the server when changes are detected. Execute the following command:

```
npm run dev
```

This will start the server at `http://localhost:1337` by default. You can change the port in the `src/index.ts` file or create an `.env` file to manage the environt-specific variables separately.

For production, you can build the TypeScript files and then start the server. Run the following commands:

```
npm run build
npm start
```

## Project Structure

The project structure is organized as follows:

- `src`: Contains TypeScript source files
    - `index.ts`: Configures and starts the Express application
    - `data`: Contains stuff related to the database
        - `data-source.ts` Initializes and exports the Prisma instance - exports `appDataSource` 
    - `modules`: Contains stuff
        - `routes` Contains web routes
            - `auth.ts` Configures authentication requests
        - `utilities` Contains different utilities in seperate files
            - `auth-util.ts` Auth utilities
            - `route-util.ts` Routing utilities
- `dist`: Output directory created during build for compiled TypeScript files
- `package.json`: Project configuration and dependencies
- `tsconfig.json`: TypeScript configuration

You can customize the project configuration i nthe `tsconfig.json` file and adjust the server settings in the `src/index.ts` file.

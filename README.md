# TypeScript x Express x Node.js x Prisma + project structure setup

Install the project dependencies:

```
npm i
```

## Usage

For development purposes, you can run the application using Nodemon to automatically restart the server when changes are detected. Execute the following command:

```
npm run dev
```

This will start the server at `http://localhost:3000` by default. You can change the port in the `src/index.ts` file or create an `.env` file to manage the environt-specific variables separately.

For production, you can build the TypeScript files and then start the server. Run the following commands:

```
npm run build
npm start
```

## Project Structure

The project structure is organized as follows:

- `src`: Contains TypeScript source files
    - `index.ts`: Configures and starts the Express application
- `dist`: Output directory created during build for compiled TypeScript files
- `package.json`: Project configuration and dependencies
- `tsconfig.json`: TypeScript configuration

You can customize the project configuration i nthe `tsconfig.json` file and adjust the server settings in the `src/index.ts` file.

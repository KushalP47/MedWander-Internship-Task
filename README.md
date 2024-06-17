# Project Title

A brief description of what this project does and who it's for.

## Description

This project consists of a full-stack application with a React frontend and an Express backend. The backend interacts with a PostgreSQL database to perform Read-Write operations and serves data to the frontend. The frontend, built with React and TypeScript, provides a user interface for interacting with the data. Key features include form submissions to the backend and retrieving data from a Google Sheet.

### Links

- **Frontend Screenshots**: [View Here](https://drive.google.com/drive/folders/1bVU-Oud3vnzTEH166WtjurixdNapNEEi?usp=sharing)
- **Excel Sheet**: [Access Here](https://docs.google.com/spreadsheets/d/1s-esBYzi5BOrA_wUzjHoVJv7tKPH1KA4s8bKKuzyJbY/edit?usp=sharing)
- **Deployed Link**: [Visit](https://med-wander-internship-task-j41sgfkf6-kushalp47s-projects.vercel.app/)

## Installation

Follow these steps to set up your project locally.

### Backend Setup

1. Navigate to the `backend` directory:

```sh
cd backend
```

2. Install the necessary dependencies:
```
npm install
```

3. Create a .env file in the backend directory and fill it with your PostgreSQL and Google Sheets API credentials details:

```
env
POSTGRES_HOST=<your_host> 
POSTGRES_USER=<your_user> 
POSTGRES_PORT=<your_port> 
POSTGRES_PASSWORD=<your_password> 
POSTGRES_DATABASE_NAME=<your_database_name> 
SPREADSHEET_ID=<your_spreadsheet_id>
GOOGLE_SERVICE_ACCOUNT_KEY=<google_service_accounts_details>
```

4. Ensure your PostgreSQL database is running and accessible with the credentials provided in the `.env` file.


### Frontend Setup

1. Navigate to the `frontend` directory:

```sh
cd frontend
```

2. nstall the necessary dependencies:

```sh
npm install
```

## Running the Application

### Starting the Backend

1. In the backend directory, start the server:

```sh
npm run start
```
The backend server will start on port 3000.

### Starting the Frontend

1. In the frontend directory, start the React application:

```sh
npm run dev
```

The application will be available at http://localhost:5173.

## Functionality

Read/Write Operations: The backend provides endpoints for creating and reading user data in a PostgreSQL database.

Google Sheets Integration: Data can be written to a specified Google Sheet using the backend.

Form Submission: The frontend includes a form that allows users to submit data to the backend.

Data Display: The frontend fetches and displays data from the backend.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your proposed changes.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details. 
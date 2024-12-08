<!-- # Auth MS

Welcome to the **Auth MS** repository, a system designed to provide authentication services as a Software as a Service (SaaS) solution. This application is intended to be used via API calls, meaning there is no need to install any software locally.

## Getting Started

To utilize the API, applications must first be registered with the system to obtain the necessary credentials.

### Registering an Application

#### Endpoint

- **Create Application**: POST `/api/applications`
  - **Description**: Registers a new application in the system, which then receives an API key for future requests.
  - **Parameters**:
    - `name`: The name of the application.
    - `url`: The base URL of the application.
    - `description`: A brief description of the application.
    - `redirectUrl`: Redirection URL used for OAuth flows or similar.
    - `contactEmail`: Contact email for application-related communications.
    - `schemaDefinition`: JSON schema defining the structure of user data that the application will manage. This schema is crucial for customizing how users are authenticated and managed within the application.
  - **Response**: API key for the application.

#### Managing API Keys

- **Retrieve Application API Key**: GET `/api/applications/:appId/apiKey`

  - **Description**: Retrieves the current API key for a registered application.
  - **Authentication**: Requires authentication.
  - **Response**: API key.

- **Regenerate Application API Key**: POST `/api/applications/:appId/apiKey/regenerate`
  - **Description**: Generates a new API key for the application and replaces the old one.
  - **Authentication**: Requires authentication.
  - **Response**: New API key.

### API Call Examples Using `curl`

```bash
# Register Application
curl -X POST http://auth-ms.com/api/applications \
     -H 'Content-Type: application/json' \
     -d '{
           "name": "MyApp",
           "url": "https://myapp.com",
           "description": "This is my application.",
           "redirectUrl": "https://myapp.com/oauth/callback",
           "contactEmail": "contact@myapp.com",
           "schemaDefinition": "{\"fields\": {\"username\": \"string\", \"password\": \"string\"}}"
         }'

# Retrieve API Key
curl -X GET http://auth-ms.com/api/applications/{appId}/apiKey \
     -H 'Authorization: Bearer {token}'

# Regenerate API Key
curl -X POST http://auth-ms.com/api/applications/{appId}/apiKey/regenerate \
     -H 'Authorization: Bearer {token}'
``` -->

# Auth MS

Welcome to the **Auth MS** repository, a robust authentication microservice designed to operate as a Software as a Service (SaaS) solution. This service provides secure authentication capabilities via API calls, eliminating the need for local installations.

## Features

- **Application-based Authentication**: Register applications to obtain unique credentials.
- **Secure API Integration**: Easily integrate with various platforms using provided endpoints.
- **Scalable and Modular**: Designed with scalability and maintainability in mind.

## Requirements

- **Node.js**: Version 16 or higher.
- **Docker**: Installed and running (optional but recommended).
- **Environment Variables**: Defined in an `.env` file (use `.env.template` as a reference).

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd auth-ms
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

1. Copy the `.env.template` file to `.env`:
   ```bash
   cp .env.template .env
   ```
2. Edit `.env` to include your specific configuration values.

### 4. Run the Application

#### Locally

```bash
npm start
```

#### Using Docker

1. Build the Docker image:
   ```bash
   docker-compose build
   ```
2. Run the container:
   ```bash
   docker-compose up
   ```

## API Usage

### Registering an Application

#### Endpoint

- **Create Application**: `POST /api/applications`

#### Request Body

```json
{
  "name": "MyApp",
  "description": "Description of MyApp"
}
```

#### Response Example

```json
{
  "id": "unique-id",
  "name": "MyApp",
  "credentials": {
    "clientId": "client-id",
    "clientSecret": "client-secret"
  }
}
```

### Authentication

#### Endpoint

- **Authenticate User**: `POST /api/auth`

#### Request Body

```json
{
  "clientId": "client-id",
  "clientSecret": "client-secret",
  "username": "user",
  "password": "pass"
}
```

#### Response Example

```json
{
  "token": "jwt-token",
  "expiresIn": 3600
}
```

### Other Endpoints

For a complete list of endpoints and their usage, refer to the API documentation (future feature).

## Development and Contribution

### Local Development

1. Use TypeScript for all development.
2. Follow the existing folder structure:
   - `src/core`: Core business logic.
   - `src/providers`: Service integrations.
   - `src/utils`: Utility functions.
   - `src/shared`: Shared components and configurations.

### Running Tests

Add and run tests to ensure functionality:

```bash
npm test
```

### Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a detailed explanation of your changes.

## Roadmap

- Implement detailed API documentation.
- Add unit and integration tests.
- Enhance security measures, such as rate limiting and IP whitelisting.
- Introduce multi-factor authentication (MFA).

## License

This project is licensed under the [MIT License](LICENSE).

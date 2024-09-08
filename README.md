# Auth MS

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
```

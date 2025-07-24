# Equals Money API Integration

This project provides a Node.js back-end for integrating with the Equals Money API. It includes services for managing beneficiaries, getting exchange rate quotes, initiating payments, and more.

## Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd equals-money-api-integration
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add your Equals Money API credentials:
    ```
    EQUALS_MONEY_API_URL=[https://api-sandbox.equalsmoney.com](https://api-sandbox.equalsmoney.com)
    EQUALS_MONEY_API_KEY=your_api_key
    EQUALS_MONEY_API_SECRET=your_api_secret
    ```

## Running the Application

-   **Development Mode:**
    ```bash
    npm run dev
    ```
    This will start the server with `nodemon`, which automatically restarts the application when file changes are detected.

-   **Production Mode:**
    ```bash
    npm start
    ```
    This will start the server in a production environment.

## API Endpoints

-   `POST /api/payments/beneficiaries`: Add a new beneficiary.
-   `GET /api/payments/beneficiaries`: List all beneficiaries.
-   `POST /api/payments/quote`: Get an exchange rate quote.
-   `POST /api/payments/initiate`: Initiate a new payment.
-   `GET /api/payments/:paymentId/status`: Get the status of a payment.
-   `GET /api/payments/:paymentId/confirmation`: Download a payment confirmation PDF.
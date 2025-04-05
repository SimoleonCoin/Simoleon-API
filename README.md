# Simoleon API

Express server that powers the Simoleon Checkout payment rail.

## Endpoints

### `POST /checkout/initiate`
- Starts a transaction session
- Calculates SIM amount
- Returns session ID and rate

### `POST /checkout/confirm`
- Accepts session ID and biometric or cryptographic signature
- Placeholder: Simulates on-chain transaction confirmation

## Security (In Progress)
- Session expiry (5 min max)
- JWT or API key authentication for merchant routes
- Signature verification planned (Face ID or wallet-signed)

---
© Simoleon Labs

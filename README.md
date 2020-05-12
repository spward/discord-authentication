# Discord Authorization

A solo developed discord authentication system with stripe implementation developed for a freelance job.

## Getting Started

### Prerequisites

Install the node_modules in both the server and client directories

```
npm install
```

create a .env file in the server directory with these variables.

```
env=development
CLIENT_ID=
CLIENT_SECRET=
STRIPE_SECRET=
STRIPE_PUBLISHABLE_KEY=
PORT=9000
```

Change the Stripe Publishable key in Dashboard.js which is located in client/src/components/Dashboard

Run `npm run start` in both the client and server directories

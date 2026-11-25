# Ela Capture Website

Photography studio website built with React and Vite.

## Run locally

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

## Deploy to Vercel

Import this repository into Vercel. Vercel detects Vite automatically; use
`npm run build` as the build command and `dist` as the output directory.

The booking form currently opens a prefilled WhatsApp message and stores
enquiries in the submitting browser's local storage. It does not send bookings
to a shared database or provide authenticated admin access.

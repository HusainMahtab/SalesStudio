# Round-Robin Coupon Distribution System

A web application that distributes coupons to guest users in a round-robin manner, with built-in abuse prevention mechanisms.

## Features

- Round-robin coupon distribution
- Guest access without login
- Abuse prevention through IP and cookie tracking
- 1-hour cooldown period between claims
- Modern, responsive UI
- Type-safe implementation with TypeScript

## Prerequisites

- Node.js 18.x or later
- npm 9.x or later

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd sales-studio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. Seed the database with initial coupons:
   ```bash
   npm run prisma:seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Abuse Prevention Mechanisms

The application implements several layers of abuse prevention:

1. **IP Tracking**: Records each user's IP address and prevents multiple claims from the same IP within a 1-hour period.
2. **Cookie Tracking**: Uses secure HTTP-only cookies to track unique browser sessions.
3. **Cooldown Period**: Enforces a 1-hour waiting period between claims from the same user.
4. **Round-Robin Distribution**: Ensures coupons are distributed sequentially to maintain fairness.

## Development

- Built with Next.js 14
- Uses Prisma for database management
- Styled with Tailwind CSS
- TypeScript for type safety

## License

MIT 
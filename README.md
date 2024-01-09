# Headshot Critic

Receive personal feedback on your professional headshot using the power of AI.

## Tech Stack

- [uploadthing](https://uploadthing.com/) - Image Upload/Storage
- [GPT Vision](https://platform.openai.com/docs/guides/vision) - Image Analysis
- [Next.js](https://nextjs.org/docs/app) - App Router, Server Actions
- [Vercel KV](https://vercel.com/storage/kv) - Redis Database
- [Vercel](https://vercel.com/) - Hosting
- [NextAuth.js](https://next-auth.js.org/) - LinkedIn Authentication

## Self Hosting

> Note: This self hosting guide is somewhat incomplete. If you have any questions, feel free to create an issue.

1. Clone the repo
2. Set up a `.env.local` file using the `.env.example` template.
3. Obtain all necessary API keys and secrets.
4. Run `pnpm install` to install dependencies.
5. Run `pnpm dev` to start the development server.
6. Visit `localhost:3000` to view the app.

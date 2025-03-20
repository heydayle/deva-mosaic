export const installation = `
## # Installation

\`\`\`bash
# Clone repository
git clone https://github.com/heydayle/nuxt-boilerplate-v3.git
cd nuxt-boilerplate-v3

# Install dependencies
yarn install
# or
npm install
# or
pnpm install
\`\`\`

## # Usage

### # Development Environment

\`\`\`bash
# Start development server
yarn dev
# or
npm run dev
# or
pnpm dev
\`\`\`

Access the application at \`http://localhost:3000\`

### # Production Build

\`\`\`bash
# Build for production
yarn build
# or
npm run build
# or
pnpm build

# Run the built application
yarn start
# or
npm run start
# or
pnpm start
\`\`\`

## # Project Structure

\`\`\`
nuxt-boilerplate-v3/
├── assets/            # Static assets (images, fonts, etc.)
├── components/        # Reusable Vue components
├── composables/       # Vue composables
├── layouts/           # Page layouts
├── middleware/        # Nuxt middleware
├── pages/             # Application pages
├── plugins/           # Nuxt plugins
├── public/            # Public static files
├── server/            # Server API endpoints and middleware
├── stores/            # Pinia stores
├── utils/             # Utility functions
├── .env.example       # Environment variables template
├── nuxt.config.ts     # Nuxt configuration
├── tailwind.config.js # TailwindCSS configuration
└── tsconfig.json      # TypeScript configuration
\`\`\`
`
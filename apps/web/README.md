This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

project-root/
├── .env.local
├── .env.example
├── .gitignore
├── .eslintrc.json
├── .prettierrc
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
├── README.md
│
├── public/
│   ├── icons/
│   ├── images/
│   └── favicon.ico
│
├── src/
│   ├── app/                          # App Router (Next.js 13+)
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   ├── error.tsx
│   │   ├── page.tsx
│   │   │
│   │   ├── (auth)/                   # Route groups
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx
│   │   │   └── error.tsx
│   │   │
│   │   ├── profile/
│   │   │   ├── page.tsx
│   │   │   └── edit/
│   │   │       └── page.tsx
│   │   │
│   │   └── api/                      # API routes
│   │       ├── auth/
│   │       │   └── route.ts
│   │       ├── users/
│   │       │   ├── route.ts
│   │       │   └── [id]/
│   │       │       └── route.ts
│   │       └── products/
│   │           ├── route.ts
│   │           └── [id]/
│   │               └── route.ts
│   │
│   ├── features/                     # Feature-based modules
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── RegisterForm.tsx
│   │   │   │   ├── AuthGuard.tsx
│   │   │   │   └── index.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useAuth.ts
│   │   │   │   ├── useLogin.ts
│   │   │   │   └── index.ts
│   │   │   ├── services/
│   │   │   │   ├── authApi.ts
│   │   │   │   ├── authService.ts
│   │   │   │   └── index.ts
│   │   │   ├── store/
│   │   │   │   ├── authStore.ts
│   │   │   │   ├── authTypes.ts
│   │   │   │   └── index.ts
│   │   │   ├── types/
│   │   │   │   ├── auth.types.ts
│   │   │   │   └── index.ts
│   │   │   ├── utils/
│   │   │   │   ├── authHelpers.ts
│   │   │   │   ├── validation.ts
│   │   │   │   └── index.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── dashboard/
│   │   │   ├── components/
│   │   │   │   ├── DashboardLayout.tsx
│   │   │   │   ├── StatCards.tsx
│   │   │   │   ├── RecentActivity.tsx
│   │   │   │   └── index.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useDashboardData.ts
│   │   │   │   └── index.ts
│   │   │   ├── services/
│   │   │   │   ├── dashboardApi.ts
│   │   │   │   └── index.ts
│   │   │   ├── store/
│   │   │   │   ├── dashboardStore.ts
│   │   │   │   └── index.ts
│   │   │   ├── types/
│   │   │   │   ├── dashboard.types.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── products/
│   │   │   ├── components/
│   │   │   │   ├── ProductCard.tsx
│   │   │   │   ├── ProductList.tsx
│   │   │   │   ├── ProductForm.tsx
│   │   │   │   ├── ProductFilters.tsx
│   │   │   │   └── index.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useProducts.ts
│   │   │   │   ├── useProductFilters.ts
│   │   │   │   └── index.ts
│   │   │   ├── services/
│   │   │   │   ├── productApi.ts
│   │   │   │   └── index.ts
│   │   │   ├── store/
│   │   │   │   ├── productStore.ts
│   │   │   │   ├── productTypes.ts
│   │   │   │   └── index.ts
│   │   │   ├── types/
│   │   │   │   ├── product.types.ts
│   │   │   │   └── index.ts
│   │   │   ├── utils/
│   │   │   │   ├── productHelpers.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   └── user-profile/
│   │       ├── components/
│   │       │   ├── ProfileForm.tsx
│   │       │   ├── AvatarUpload.tsx
│   │       │   └── index.ts
│   │       ├── hooks/
│   │       │   ├── useProfile.ts
│   │       │   └── index.ts
│   │       ├── services/
│   │       │   ├── profileApi.ts
│   │       │   └── index.ts
│   │       ├── store/
│   │       │   ├── profileStore.ts
│   │       │   └── index.ts
│   │       ├── types/
│   │       │   ├── profile.types.ts
│   │       │   └── index.ts
│   │       └── index.ts
│   │
│   ├── shared/                       # Shared resources
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   ├── Toast.tsx
│   │   │   │   ├── Spinner.tsx
│   │   │   │   └── index.ts
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── Navigation.tsx
│   │   │   │   └── index.ts
│   │   │   ├── forms/
│   │   │   │   ├── FormField.tsx
│   │   │   │   ├── FormError.tsx
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── hooks/
│   │   │   ├── useLocalStorage.ts
│   │   │   ├── useDebounce.ts
│   │   │   ├── useToggle.ts
│   │   │   ├── useClickOutside.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── services/
│   │   │   ├── api/
│   │   │   │   ├── apiClient.ts
│   │   │   │   ├── apiTypes.ts
│   │   │   │   └── index.ts
│   │   │   ├── storage/
│   │   │   │   ├── localStorage.ts
│   │   │   │   ├── sessionStorage.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── store/
│   │   │   ├── globalStore.ts
│   │   │   ├── storeTypes.ts
│   │   │   ├── middleware/
│   │   │   │   ├── persistMiddleware.ts
│   │   │   │   ├── devtoolsMiddleware.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── types/
│   │   │   ├── common.types.ts
│   │   │   ├── api.types.ts
│   │   │   ├── store.types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── constants.ts
│   │   │   ├── helpers.ts
│   │   │   ├── formatters.ts
│   │   │   ├── validators.ts
│   │   │   ├── dateUtils.ts
│   │   │   └── index.ts
│   │   │
│   │   └── styles/
│   │       ├── globals.css
│   │       ├── components.css
│   │       └── utilities.css
│   │
│   └── lib/                          # External library configurations
│       ├── zustand.ts
│       ├── axios.ts
│       ├── auth.ts
│       └── database.ts
│
├── docs/                             # Documentation
│   ├── README.md
│   ├── CONTRIBUTING.md
│   └── API.md
│
├── tests/                            # Test files
│   ├── __mocks__/
│   ├── features/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   └── products/
│   ├── shared/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── utils/
│   ├── setup.ts
│   └── jest.config.js
│
└── scripts/                          # Build and deployment scripts
    ├── build.sh
    ├── deploy.sh
    └── seed-data.js
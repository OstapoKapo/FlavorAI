# FlavorAI Client - AI Coding Agent Instructions

## Project Overview
Next.js 15 (App Router) + TypeScript recipe management application with JWT authentication. Users can create, browse, and search recipes.

## Architecture Patterns

### HTTP Service Layer
Use the **factory pattern** for all API calls via `HttpFactoryService`:
- `createHttpService()` → Basic HTTP (login, register, logout)
- `createAuthHttpService()` → Auto-attaches JWT cookies for authenticated endpoints

```typescript
// Example in src/api/recipe/recipe.api.ts
const httpFactory = new HttpFactoryService();
const authHttp = httpFactory.createAuthHttpService();
export const getRecipes = async (params) => authHttp.get<IGetRecipesRes>(`recipes?...`);
```

**Server-side cookie handling**: `EnhancedWithAuthHttpService` automatically forwards cookies from Next.js `cookies()` store when rendering on server (see `src/services/http-auth.service.ts`).

### Authentication Flow
- **Middleware**: `src/middleware.ts` protects routes using `jose` JWT verification
- **Public routes**: `/login`, `/signup` (auto-redirect to `/` if authenticated)
- **Protected routes**: `/`, `/recipe/*` (redirect to `/login` if no token)
- **Tokens**: Stored in httpOnly cookies (`accessToken`), managed server-side
- **Logout**: Axios interceptor catches 401s → auto-calls `logout()` → clears token

### State Management
**Zustand + Immer** for client state (see `src/store/`):
- `useUserStore` - Current user profile
- `useSearchStore` - Recipe search term (drives query refetch)

```typescript
// Always use Immer's produce for immutable updates
set(produce((state: UserStore) => {
  state.user = user;
}))
```

### Data Fetching Pattern
**TanStack Query** for server state:
1. Server Components fetch initial data (SSR)
2. Pass as `initialData` or `placeholderData` to Client Components
3. Client uses `useQuery` with same data for hydration

```typescript
// src/app/page.tsx (Server Component)
const user = await getProfile();
const recipes = await getRecipes({ page: 1, perPage: 3, searchTerm: '' });
return <MainContainer initialUser={user} initialRecipes={recipes} />;

// mainContainer.component.tsx (Client Component)
useQuery({
  queryKey: ['recipes', currentPage, heroesPerPage, searchTerm],
  queryFn: () => getRecipes({ page, perPage, searchTerm }),
  placeholderData: { recipes: initialRecipes.recipes, totalPages: initialRecipes.totalPages },
  staleTime: 5 * 60 * 1000
});
```

### Form Handling
**React Hook Form** with reusable `CustomForm` component (see `src/app/components/custom/customForm/form.tsx`):
- Define fields in config arrays (e.g., `src/config/authConfig.ts`)
- Supports dynamic validation functions (password confirmation example)
- Renders `InputField` or `TextAreaField` based on `type`

### Mutations & Navigation
Use custom mutation hooks (pattern in `src/api/*/[resource].mutation.ts`):

```typescript
export const useCreateRecipeMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: createRecipe,
    onSuccess: () => {
      toast.success('Recipe created successfully');
      router.push('/');
    }
  });
};
```

## File Organization
- `src/api/[resource]/` - API functions + mutation hooks
- `src/services/` - HTTP layer (factory, base service, auth wrapper, axios config)
- `src/app/components/` - UI components (containers, custom, layout, ui)
- `src/types/` - TypeScript interfaces (suffixed `.types.ts`)
- `src/store/` - Zustand stores
- `src/config/` - Form configurations

## Development Commands
```bash
npm run dev          # Next.js dev server (Turbopack enabled)
npm run build        # Production build with Turbopack
npm run lint         # Biome linter check
npm run format       # Biome auto-format
```

## Code Quality Standards
- **Linter**: Biome (not ESLint) - config in `biome.json`
- **Formatting**: 2-space indentation, organized imports on save
- **TypeScript**: Strict mode, all API responses typed (see `src/types/`)
- **UI**: TailwindCSS 4 with utility classes, Lucide React icons

## Common Gotchas
1. **Never use `cacheTime`** - TanStack Query v5 replaced it with `staleTime`
2. **FormData uploads**: Pass directly to `authHttp.post()` (no JSON.stringify)
3. **Environment variables**: `SERVER_URL` defaults to `http://localhost:8000` if not set
4. **Cookie forwarding**: Server-side API calls auto-forward via `attachAuthHeader()` in `http-auth.service.ts`
5. **Toasts**: Use `react-hot-toast` for all user feedback (success/error)

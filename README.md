# McNab Ventures - Next.js + PocketBase

A modern full-stack web application built with Next.js 16 and PocketBase backend.

## 🚀 Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19
- **Backend**: PocketBase (hosted on Railway)
- **Styling**: Tailwind CSS 4
- **Package Manager**: pnpm

## 📋 Prerequisites

- Node.js 18+ installed
- pnpm installed (`npm install -g pnpm`)
- Access to PocketBase instance

## 🛠️ Setup

### 1. Clone and Install

```bash
git clone <repository-url>
cd mcnabventures
pnpm install
```

### 2. Environment Configuration

Copy the example environment file and configure it:

```bash
cp .env.example .env.local
```

Edit `.env.local` and set your PocketBase URL:

```env
NEXT_PUBLIC_POCKETBASE_URL=https://mcnabventuresapi.up.railway.app
```

### 3. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## 📁 Project Structure

```
mcnabventures/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.js            # Home page (Server Component)
│   │   ├── layout.js          # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   └── CollectionsList.js # Example client component
│   └── lib/                   # Utilities and services
│       ├── pocketbase.js      # PocketBase client configuration
│       ├── hooks/             # Custom React hooks
│       │   └── usePocketBase.js
│       └── services/          # API service layers
│           ├── collections.js # Collection operations
│           └── auth.js        # Authentication services
├── public/                    # Static assets
├── .env.local                 # Local environment variables (gitignored)
├── .env.example              # Example environment variables
└── package.json              # Project dependencies
```

## 🔌 PocketBase Integration

### Client Configuration

The PocketBase client is configured in `src/lib/pocketbase.js`:

```javascript
import { pb } from '@/lib/pocketbase';

// Use the client in your components
const records = await pb.collection('posts').getList(1, 50);
```

### Service Layer

Use the service layer for organized API calls:

```javascript
import { getRecords, createRecord } from '@/lib/services/collections';

// Fetch records
const result = await getRecords('posts', {
  filter: 'status = "published"',
  sort: '-created',
});

// Create a record
const newPost = await createRecord('posts', {
  title: 'Hello World',
  content: 'This is my first post',
});
```

### Custom Hooks

For client components, use the provided React hooks:

```javascript
import { useCollection } from '@/lib/hooks/usePocketBase';

function MyComponent() {
  const { data, loading, error, refresh } = useCollection('posts', {
    page: 1,
    perPage: 10,
    sort: '-created',
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {data?.items.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

## 📚 Available Services

### Collections Service

- `getRecords(collection, options)` - Fetch paginated records
- `getFullList(collection, options)` - Fetch all records
- `getRecord(collection, id, options)` - Fetch single record
- `createRecord(collection, data)` - Create new record
- `updateRecord(collection, id, data)` - Update existing record
- `deleteRecord(collection, id)` - Delete record
- `subscribeToCollection(collection, callback, recordId)` - Real-time updates

### Authentication Service

- `loginWithPassword(email, password)` - User login
- `register(userData)` - User registration
- `logout()` - User logout
- `isAuthenticated()` - Check auth status
- `getCurrentUser()` - Get current user
- `requestPasswordReset(email)` - Request password reset
- `confirmPasswordReset(token, password, passwordConfirm)` - Confirm reset
- `updateProfile(userId, data)` - Update user profile

### Custom Hooks

- `useCollection(collection, options)` - Fetch collection with state management
- `useRecord(collection, id, options)` - Fetch single record
- `useRealtimeCollection(collection, recordId, callback)` - Real-time subscriptions
- `useAuth()` - Authentication state management

## 🎨 Features

- ✅ Server-side rendering with Next.js App Router
- ✅ Client-side data fetching with React hooks
- ✅ Real-time updates with WebSocket subscriptions
- ✅ Complete authentication flow
- ✅ File upload support
- ✅ Type-safe API calls with error handling
- ✅ Responsive design with Tailwind CSS
- ✅ Dark mode support

## 🔐 Authentication Example

```javascript
import { loginWithPassword, getCurrentUser } from '@/lib/services/auth';

async function handleLogin(email, password) {
  const result = await loginWithPassword(email, password);
  
  if (result.success) {
    const user = getCurrentUser();
    console.log('Logged in as:', user.email);
  } else {
    console.error('Login failed:', result.error);
  }
}
```

## 📡 Real-time Updates Example

```javascript
'use client';

import { useRealtimeCollection } from '@/lib/hooks/usePocketBase';

function RealtimeComponent() {
  const [items, setItems] = useState([]);

  useRealtimeCollection('posts', '*', (e) => {
    console.log('Real-time event:', e.action);
    
    if (e.action === 'create') {
      setItems((prev) => [e.record, ...prev]);
    } else if (e.action === 'update') {
      setItems((prev) =>
        prev.map((item) => (item.id === e.record.id ? e.record : item))
      );
    } else if (e.action === 'delete') {
      setItems((prev) => prev.filter((item) => item.id !== e.record.id));
    }
  });

  return <div>{/* Render items */}</div>;
}
```

## 🚀 Deployment

### Vercel (Recommended for Next.js)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables in Production

Make sure to set these in your hosting platform:

```env
NEXT_PUBLIC_POCKETBASE_URL=https://your-pocketbase-url.com
```

## 📖 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [PocketBase Documentation](https://pocketbase.io/docs/)
- [PocketBase JavaScript SDK](https://github.com/pocketbase/js-sdk)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🐛 Troubleshooting

### Connection Issues

If you can't connect to PocketBase:

1. Check that your PocketBase instance is running
2. Verify the `NEXT_PUBLIC_POCKETBASE_URL` in `.env.local`
3. Check CORS settings in PocketBase admin dashboard
4. Ensure your collections have proper API rules set

### Authentication Issues

1. Make sure email/password auth is enabled in PocketBase
2. Check that your auth collection name matches (default: 'users')
3. Verify API rules allow record creation for registration

### Build Issues

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Rebuild
pnpm build
```

## 📧 Support

For issues and questions, please open an issue on GitHub or contact the maintainers.

# 🚀 PocketBase + Next.js Quick Reference

## 📦 Installation Status

✅ **PocketBase SDK**: `pocketbase@0.26.5` installed  
✅ **Environment**: Configured with `.env.local`  
✅ **API URL**: `https://mcnabventuresapi.up.railway.app`

---

## 🎯 Common Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

---

## 📁 File Locations

### Core Files
- `src/lib/pocketbase.js` - PocketBase client
- `src/lib/services/collections.js` - Collection operations
- `src/lib/services/auth.js` - Authentication
- `src/lib/hooks/usePocketBase.js` - React hooks

### Configuration
- `.env.local` - Environment variables (gitignored)
- `.env.example` - Template for env vars
- `jsconfig.json` - Path aliases configured

---

## 💻 Code Snippets

### Import PocketBase Client

```javascript
import { pb } from '@/lib/pocketbase';
```

### Server Component - Fetch Data

```javascript
// app/posts/page.js
import { pb } from '@/lib/pocketbase';

export default async function Page() {
  const records = await pb.collection('posts').getList(1, 50, {
    sort: '-created',
  });
  
  return <div>{/* render records.items */}</div>;
}
```

### Client Component - Use Hook

```javascript
// components/Posts.js
'use client';
import { useCollection } from '@/lib/hooks/usePocketBase';

export default function Posts() {
  const { data, loading, error } = useCollection('posts');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>{/* render data.items */}</div>;
}
```

### Service Layer - CRUD Operations

```javascript
import { 
  getRecords, 
  getRecord, 
  createRecord, 
  updateRecord, 
  deleteRecord 
} from '@/lib/services/collections';

// Read
const result = await getRecords('posts', { 
  page: 1, 
  perPage: 10 
});

// Create
const newPost = await createRecord('posts', {
  title: 'Hello',
  content: 'World',
});

// Update
const updated = await updateRecord('posts', id, {
  title: 'Updated Title',
});

// Delete
await deleteRecord('posts', id);
```

### Authentication

```javascript
import { 
  loginWithPassword, 
  logout, 
  isAuthenticated, 
  getCurrentUser 
} from '@/lib/services/auth';

// Login
const result = await loginWithPassword('user@email.com', 'pass');
if (result.success) {
  console.log('User:', result.data.user);
}

// Check auth
if (isAuthenticated()) {
  const user = getCurrentUser();
  console.log(user.email);
}

// Logout
logout();
```

### Auth Hook

```javascript
'use client';
import { useAuth } from '@/lib/hooks/usePocketBase';

export default function UserMenu() {
  const { user, isAuthenticated, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  return isAuthenticated ? (
    <div>Welcome, {user.email}</div>
  ) : (
    <a href="/login">Login</a>
  );
}
```

### Real-time Updates

```javascript
'use client';
import { useRealtimeCollection } from '@/lib/hooks/usePocketBase';

export default function LivePosts() {
  const [posts, setPosts] = useState([]);
  
  useRealtimeCollection('posts', '*', (event) => {
    if (event.action === 'create') {
      setPosts(prev => [event.record, ...prev]);
    }
    // handle 'update' and 'delete' too
  });
  
  return <div>{/* render posts */}</div>;
}
```

---

## 🔍 Query Options

### Filtering

```javascript
// Simple filter
filter: 'status = "published"'

// Multiple conditions
filter: 'status = "published" && views > 100'

// Text search (contains)
filter: 'title ~ "Next.js"'

// Date comparison
filter: 'created >= "2024-01-01"'

// User-specific
filter: `author = "${userId}"`
```

### Sorting

```javascript
// Ascending
sort: 'created'

// Descending
sort: '-created'

// Multiple fields
sort: '-featured,title'
```

### Expand Relations

```javascript
// Single relation
expand: 'author'

// Multiple relations
expand: 'author,category,tags'

// Nested relations
expand: 'author.profile,comments.user'

// Access expanded data
record.expand.author.name
```

---

## 🛠️ API Routes

### Available Endpoints

```
GET  /api/health                    - Check PocketBase connection
GET  /api/collections/[name]        - Fetch collection records
```

### Usage Examples

```javascript
// Check health
const res = await fetch('/api/health');
const status = await res.json();

// Fetch collection
const res = await fetch('/api/collections/posts?page=1&perPage=10');
const data = await res.json();
```

---

## 🎨 UI Components

### Current Components

- `page.js` - Home page with connection demo
- `CollectionsList.js` - Interactive collection browser

### Styling

- **Framework**: Tailwind CSS 4
- **Dark Mode**: Supported (system preference)
- **Responsive**: Mobile-first design

---

## 📚 Documentation

| File | Description |
|------|-------------|
| `README.md` | Complete project documentation |
| `POCKETBASE_GUIDE.md` | Comprehensive usage guide |
| `SETUP_COMPLETE.md` | Setup summary and next steps |
| `QUICK_REFERENCE.md` | This file (quick commands) |

---

## 🔗 Important URLs

| Resource | URL |
|----------|-----|
| **Your App** | http://localhost:3000 |
| **PocketBase API** | https://mcnabventuresapi.up.railway.app |
| **Admin Dashboard** | https://mcnabventuresapi.up.railway.app/\_/ |
| **PocketBase Docs** | https://pocketbase.io/docs/ |
| **Next.js Docs** | https://nextjs.org/docs |

---

## ⚡ Best Practices

1. ✅ Use Server Components for initial data (better SEO & performance)
2. ✅ Use Client Components for interactivity
3. ✅ Use service layer instead of direct `pb` calls
4. ✅ Always handle loading and error states
5. ✅ Enable real-time only when necessary
6. ✅ Use environment variables (never hardcode URLs)
7. ✅ Validate data before sending to PocketBase

---

## 🐛 Troubleshooting

### Connection Issues

```bash
# Check if PocketBase is accessible
curl https://mcnabventuresapi.up.railway.app/api/health

# Verify environment variable
cat .env.local
```

### Common Errors

| Error | Solution |
|-------|----------|
| Collection not found | Check collection exists in PocketBase admin |
| Unauthorized | Check API rules in collection settings |
| CORS error | Add your domain to allowed origins in PocketBase |
| Auth token expired | Use `refreshAuth()` from auth service |

---

## 🎯 Next Steps Checklist

- [ ] Create your first collection in PocketBase admin
- [ ] Test connection on home page
- [ ] Try fetching data from your collection
- [ ] Build your first custom page
- [ ] Add authentication if needed
- [ ] Deploy to Vercel/Netlify

---

## 💡 Pro Tips

- 📖 Check `POCKETBASE_GUIDE.md` for detailed examples
- 🔍 Use DevTools to inspect PocketBase API calls
- 🎨 Customize the UI in `src/app/globals.css`
- 🚀 Use Server Components when possible
- 🔐 Set up proper API rules in PocketBase
- 📝 Read PocketBase docs for advanced features

---

## 📞 Support

- **PocketBase Discord**: https://discord.gg/pocketbase
- **Next.js Discord**: https://discord.gg/nextjs
- **Documentation**: Check README.md and POCKETBASE_GUIDE.md

---

**Happy coding! 🚀**

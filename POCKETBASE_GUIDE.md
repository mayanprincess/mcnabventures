# PocketBase Integration Guide

This guide will help you get started with PocketBase in your Next.js application.

## 🎯 Quick Start

### 1. Environment Setup

Make sure your `.env.local` file has the correct PocketBase URL:

```env
NEXT_PUBLIC_POCKETBASE_URL=https://mcnabventuresapi.up.railway.app
```

### 2. Basic Usage Examples

#### Server Component (Recommended for Initial Data)

```javascript
// src/app/posts/page.js
import { pb } from '@/lib/pocketbase';

export default async function PostsPage() {
  // Fetch data on the server
  const posts = await pb.collection('posts').getList(1, 50, {
    sort: '-created',
  });

  return (
    <div>
      {posts.items.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  );
}
```

#### Client Component with Hooks

```javascript
// src/components/PostsList.js
'use client';

import { useCollection } from '@/lib/hooks/usePocketBase';

export default function PostsList() {
  const { data, loading, error, refresh } = useCollection('posts', {
    page: 1,
    perPage: 10,
    sort: '-created',
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <button onClick={refresh}>Refresh</button>
      {data?.items.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  );
}
```

#### Using Service Layer

```javascript
// src/app/actions.js (Server Actions)
'use server';

import { createRecord, updateRecord, deleteRecord } from '@/lib/services/collections';

export async function createPost(formData) {
  const result = await createRecord('posts', {
    title: formData.get('title'),
    content: formData.get('content'),
    status: 'draft',
  });

  return result;
}

export async function updatePost(id, formData) {
  const result = await updateRecord('posts', id, {
    title: formData.get('title'),
    content: formData.get('content'),
  });

  return result;
}

export async function deletePost(id) {
  const result = await deleteRecord('posts', id);
  return result;
}
```

## 🔐 Authentication

### Login Component

```javascript
'use client';

import { useState } from 'react';
import { loginWithPassword } from '@/lib/services/auth';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const result = await loginWithPassword(email, password);

    if (result.success) {
      router.push('/dashboard');
      router.refresh(); // Refresh server components
    } else {
      setError(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
}
```

### Auth Status Hook

```javascript
'use client';

import { useAuth } from '@/lib/hooks/usePocketBase';
import { logout } from '@/lib/services/auth';

export default function UserMenu() {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <a href="/login">Login</a>;
  }

  return (
    <div>
      <span>Welcome, {user.email}</span>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}
```

## 📡 Real-time Updates

### Subscribe to Collection Changes

```javascript
'use client';

import { useState, useEffect } from 'react';
import { useRealtimeCollection } from '@/lib/hooks/usePocketBase';
import { getRecords } from '@/lib/services/collections';

export default function RealtimePosts() {
  const [posts, setPosts] = useState([]);

  // Initial fetch
  useEffect(() => {
    async function fetchPosts() {
      const result = await getRecords('posts');
      if (result.success) {
        setPosts(result.data.items);
      }
    }
    fetchPosts();
  }, []);

  // Subscribe to real-time updates
  useRealtimeCollection('posts', '*', (event) => {
    if (event.action === 'create') {
      setPosts((prev) => [event.record, ...prev]);
    } else if (event.action === 'update') {
      setPosts((prev) =>
        prev.map((post) => (post.id === event.record.id ? event.record : post))
      );
    } else if (event.action === 'delete') {
      setPosts((prev) => prev.filter((post) => post.id !== event.record.id));
    }
  });

  return (
    <div>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  );
}
```

## 📁 File Uploads

### Upload File with Form Data

```javascript
'use client';

import { useState } from 'react';
import { createRecord } from '@/lib/services/collections';

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('title', 'My Document');
    formData.append('file', file);

    const result = await createRecord('documents', formData);

    if (result.success) {
      console.log('File uploaded:', result.data);
      setFile(null);
    } else {
      console.error('Upload failed:', result.error);
    }

    setUploading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        disabled={uploading}
      />
      <button type="submit" disabled={!file || uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  );
}
```

### Display File URL

```javascript
import { pb } from '@/lib/pocketbase';

// Get file URL
const fileUrl = pb.files.getUrl(record, filename, {
  thumb: '100x250', // Optional thumbnail size
});

// Example usage
<img src={fileUrl} alt="Document" />
```

## 🔍 Advanced Filtering

### Filter Examples

```javascript
import { getRecords } from '@/lib/services/collections';

// Simple filter
const published = await getRecords('posts', {
  filter: 'status = "published"',
});

// Multiple conditions
const recentPublished = await getRecords('posts', {
  filter: 'status = "published" && created >= "2024-01-01"',
});

// Text search
const searchResults = await getRecords('posts', {
  filter: 'title ~ "Next.js"', // Contains
});

// Array/Relation filters
const userPosts = await getRecords('posts', {
  filter: `author = "${userId}"`,
});

// Complex conditions
const featured = await getRecords('posts', {
  filter: '(featured = true || views > 1000) && status = "published"',
  sort: '-views',
});
```

## 🔗 Working with Relations

### Expand Relations

```javascript
import { getRecords } from '@/lib/services/collections';

// Single relation
const posts = await getRecords('posts', {
  expand: 'author', // Expands the author relation
});

// Access expanded data
posts.data.items.forEach((post) => {
  console.log(post.title);
  console.log(post.expand.author.name);
});

// Multiple relations
const posts = await getRecords('posts', {
  expand: 'author,category,tags',
});

// Nested relations
const posts = await getRecords('posts', {
  expand: 'author.profile,comments.user',
});
```

## 📊 API Routes

### Using PocketBase in API Routes

```javascript
// src/app/api/posts/route.js
import { NextResponse } from 'next/server';
import { getRecords } from '@/lib/services/collections';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const search = searchParams.get('search') || '';

  const filter = search ? `title ~ "${search}"` : '';

  const result = await getRecords('posts', {
    page,
    perPage: 20,
    filter,
    sort: '-created',
  });

  if (result.success) {
    return NextResponse.json(result.data);
  }

  return NextResponse.json(
    { error: result.error },
    { status: 400 }
  );
}
```

## 🛡️ Error Handling Best Practices

```javascript
import { getRecord } from '@/lib/services/collections';

async function fetchPost(id) {
  try {
    const result = await getRecord('posts', id);

    if (!result.success) {
      // Handle PocketBase errors
      if (result.error.includes('not found')) {
        // Show 404 page
        notFound();
      } else if (result.error.includes('unauthorized')) {
        // Redirect to login
        redirect('/login');
      } else {
        // Show error message
        throw new Error(result.error);
      }
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
}
```

## 🎨 Best Practices

### 1. Use Server Components When Possible

Server Components are more efficient for initial data loading:

```javascript
// ✅ Good - Server Component
export default async function Page() {
  const data = await pb.collection('posts').getList(1, 50);
  return <div>{/* render data */}</div>;
}
```

### 2. Create Reusable Service Functions

Keep your code DRY by using the service layer:

```javascript
// ✅ Good
import { getRecords } from '@/lib/services/collections';

// ❌ Avoid
import { pb } from '@/lib/pocketbase';
const data = await pb.collection('posts').getList(1, 50);
```

### 3. Handle Loading and Error States

Always handle loading and error states in client components:

```javascript
const { data, loading, error } = useCollection('posts');

if (loading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} />;
return <PostsList posts={data.items} />;
```

### 4. Use Environment Variables

Never hardcode API URLs:

```javascript
// ✅ Good
const url = process.env.NEXT_PUBLIC_POCKETBASE_URL;

// ❌ Avoid
const url = 'https://mcnabventuresapi.up.railway.app';
```

## 📚 Additional Resources

- [PocketBase Documentation](https://pocketbase.io/docs/)
- [PocketBase JavaScript SDK](https://github.com/pocketbase/js-sdk)
- [Next.js Documentation](https://nextjs.org/docs)
- [API Rules Reference](https://pocketbase.io/docs/api-rules-and-filters/)

## 🐛 Common Issues

### CORS Errors

If you get CORS errors, check your PocketBase settings:

1. Go to PocketBase Admin Dashboard (`/_/`)
2. Navigate to Settings → Application
3. Add your Next.js URL to allowed origins

### Authentication Token Expired

The SDK automatically refreshes tokens, but you can manually refresh:

```javascript
import { refreshAuth } from '@/lib/services/auth';

const result = await refreshAuth();
```

### Collection Not Found

Make sure:
1. The collection exists in PocketBase
2. API rules allow access
3. Collection name is spelled correctly (case-sensitive)

## 💡 Tips

1. **Use Server Components for SEO-critical content**
2. **Use Client Components for interactive features**
3. **Enable real-time only when needed** (it uses WebSocket connections)
4. **Cache static data** using Next.js caching strategies
5. **Validate data** before sending to PocketBase
6. **Use TypeScript** for better type safety (optional but recommended)

---

Need help? Check the [PocketBase Discord](https://discord.gg/pocketbase) or [Next.js Discord](https://discord.gg/nextjs).

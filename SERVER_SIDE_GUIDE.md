# 🔒 Server-Side PocketBase Integration Guide

This application is configured to make **all PocketBase API calls on the server** using **super admin authentication**. This is a read-only setup focused on consuming data securely.

---

## 🔐 Configuration

### Environment Variables

Update your `.env.local` file with your PocketBase credentials:

```env
# PocketBase Configuration (Server-Side Only)
POCKETBASE_URL=https://mcnabventuresapi.up.railway.app

# Super Admin Authentication (Required)
POCKETBASE_ADMIN_EMAIL=your-admin@email.com
POCKETBASE_ADMIN_PASSWORD=your-secure-password
```

**Important:**
- These credentials are **NEVER exposed to the client**
- Variables use `POCKETBASE_URL` (not `NEXT_PUBLIC_*`)
- Admin authentication is required for protected collections

---

## 📋 Server-Side Architecture

### How It Works

```
┌─────────────────────────────────────────┐
│         Next.js Server                  │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │   Server Component/API Route    │   │
│  └──────────────┬──────────────────┘   │
│                 │                       │
│  ┌──────────────▼──────────────────┐   │
│  │   Service Layer                 │   │
│  │   (lib/services/collections.js) │   │
│  └──────────────┬──────────────────┘   │
│                 │                       │
│  ┌──────────────▼──────────────────┐   │
│  │   PocketBase Client             │   │
│  │   (Auto-authenticated as admin) │   │
│  └──────────────┬──────────────────┘   │
└─────────────────┼───────────────────────┘
                  │ HTTPS (Admin Auth)
                  ▼
    ┌─────────────────────────┐
    │   PocketBase API        │
    │   (Railway Hosted)      │
    └─────────────────────────┘
```

---

## 🚀 Usage Examples

### 1. Server Component (Recommended)

Fetch data directly in your page components:

```javascript
// app/posts/page.js
import { getRecords } from '@/lib/services/collections';

export default async function PostsPage() {
  // Fetch data on the server with admin auth
  const result = await getRecords('posts', {
    page: 1,
    perPage: 50,
    sort: '-created',
  });

  if (!result.success) {
    return <div>Error: {result.error}</div>;
  }

  const { items } = result.data;

  return (
    <div>
      <h1>Posts</h1>
      {items.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  );
}
```

### 2. API Route

Create server-side endpoints for more complex operations:

```javascript
// app/api/posts/route.js
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

  if (!result.success) {
    return NextResponse.json(
      { error: result.error },
      { status: 400 }
    );
  }

  return NextResponse.json(result.data);
}
```

### 3. Server Action

Use Server Actions for form submissions and mutations:

```javascript
// app/actions.js
'use server';

import { getRecords, getRecord } from '@/lib/services/collections';
import { revalidatePath } from 'next/cache';

export async function searchPosts(query) {
  const result = await getRecords('posts', {
    filter: `title ~ "${query}" || content ~ "${query}"`,
    sort: '-created',
  });

  return result;
}

export async function getPost(id) {
  const result = await getRecord('posts', id, {
    expand: 'author,category',
  });

  return result;
}
```

---

## 📚 Available Service Functions

### Read Operations (Available)

```javascript
import {
  getRecords,    // Paginated list
  getFullList,   // All records (use carefully)
  getRecord,     // Single record by ID
} from '@/lib/services/collections';
```

#### getRecords(collectionName, options)

Fetch paginated records from a collection.

```javascript
const result = await getRecords('posts', {
  page: 1,
  perPage: 50,
  filter: 'status = "published"',
  sort: '-created',
  expand: 'author,category',
});

if (result.success) {
  const { items, page, totalItems, totalPages } = result.data;
  // Use the data
}
```

#### getFullList(collectionName, options)

Fetch all records (no pagination). **Use with caution on large collections.**

```javascript
const result = await getFullList('categories', {
  filter: '',
  sort: 'name',
  expand: '',
});

if (result.success) {
  const categories = result.data; // Array of all records
}
```

#### getRecord(collectionName, recordId, options)

Fetch a single record by ID.

```javascript
const result = await getRecord('posts', 'record_id_here', {
  expand: 'author,comments.user',
});

if (result.success) {
  const post = result.data;
}
```

---

## 🔍 Filtering & Sorting

### Filter Examples

```javascript
// Simple equality
filter: 'status = "published"'

// Multiple conditions
filter: 'status = "published" && featured = true'

// Text search (contains)
filter: 'title ~ "Next.js"'

// Greater than / less than
filter: 'views > 1000'
filter: 'created >= "2024-01-01"'

// Negation
filter: 'status != "draft"'

// In array
filter: 'category.name ?= "Technology"'

// Complex queries
filter: '(status = "published" || status = "featured") && views > 100'
```

### Sort Examples

```javascript
// Ascending
sort: 'title'

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
const post = result.data;
console.log(post.expand.author.name);
```

---

## 🌐 Dynamic Routes

### View Any Collection

Visit `/collections/[name]` to view any collection:

- `/collections/posts`
- `/collections/users`
- `/collections/products`

This dynamic route automatically fetches and displays data from any collection.

---

## 🔒 Security Best Practices

### ✅ What's Secure

1. **Admin credentials never exposed to client**
   - Environment variables use `POCKETBASE_URL` (not `NEXT_PUBLIC_*`)
   - All API calls happen on the server

2. **Automatic admin authentication**
   - Client is authenticated on first use
   - Token is managed server-side only

3. **Read-only by design**
   - Write operations removed from codebase
   - Focuses on data consumption

### ⚠️ Important Notes

1. **Never import `getPocketBaseClient` in Client Components**
   ```javascript
   // ❌ DON'T DO THIS
   'use client';
   import { getPocketBaseClient } from '@/lib/pocketbase';
   ```

2. **Always use in Server Components, API Routes, or Server Actions**
   ```javascript
   // ✅ CORRECT - Server Component
   import { getRecords } from '@/lib/services/collections';
   
   export default async function Page() {
     const result = await getRecords('posts');
     // ...
   }
   ```

3. **Protect sensitive data**
   - Never commit `.env.local` to git
   - Use strong admin passwords
   - Rotate credentials regularly

---

## 🎯 Example: Complete Page

```javascript
// app/products/page.js
import { getRecords } from '@/lib/services/collections';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Products - McNab Ventures',
  description: 'Browse our product catalog',
};

export default async function ProductsPage({ searchParams }) {
  const page = parseInt(searchParams.page || '1');
  const category = searchParams.category || '';

  // Build filter
  const filter = category ? `category = "${category}"` : '';

  // Fetch products
  const result = await getRecords('products', {
    page,
    perPage: 20,
    filter,
    sort: '-created',
    expand: 'category,images',
  });

  // Handle errors
  if (!result.success) {
    console.error('Failed to fetch products:', result.error);
    notFound();
  }

  const { items, totalItems, totalPages } = result.data;

  return (
    <div>
      <h1>Products ({totalItems})</h1>
      
      <div className="grid grid-cols-3 gap-4">
        {items.map((product) => (
          <div key={product.id} className="border rounded p-4">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p className="font-bold">${product.price}</p>
            {product.expand?.category && (
              <span className="badge">{product.expand.category.name}</span>
            )}
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          {/* Add pagination links */}
          Page {page} of {totalPages}
        </div>
      )}
    </div>
  );
}
```

---

## 🐛 Troubleshooting

### "Admin credentials not configured"

**Solution:** Update `.env.local` with your PocketBase admin email and password:

```env
POCKETBASE_ADMIN_EMAIL=your-admin@email.com
POCKETBASE_ADMIN_PASSWORD=your-secure-password
```

### "PocketBase admin authentication failed"

**Possible causes:**
1. Wrong email or password
2. Admin user doesn't exist in PocketBase
3. PocketBase is not accessible

**Solution:**
1. Check credentials in PocketBase admin dashboard (`/_/`)
2. Verify admin user exists
3. Test PocketBase URL manually

### "Collection not found"

**Solution:**
1. Check collection name (case-sensitive)
2. Verify collection exists in PocketBase admin
3. Ensure admin has access rights

### Can't fetch data

**Check:**
1. PocketBase is running and accessible
2. Admin credentials are correct
3. Collection has API rules that allow admin access
4. Network connectivity to PocketBase URL

---

## 📊 Performance Tips

1. **Use Server Components** for initial page loads
   - Better SEO
   - Faster first paint
   - No client-side JavaScript needed

2. **Cache strategically**
   ```javascript
   // Force dynamic rendering
   export const dynamic = 'force-dynamic';
   
   // Or use Next.js caching
   export const revalidate = 60; // Revalidate every 60 seconds
   ```

3. **Paginate large collections**
   - Use `getRecords()` with pagination
   - Avoid `getFullList()` on large datasets

4. **Expand relations selectively**
   - Only expand what you need
   - Nested expansions can be slow

---

## 🎓 Learning Path

1. ✅ **Start here:** Test connection on home page
2. ✅ **Try dynamic route:** Visit `/collections/your_collection_name`
3. ✅ **Create a page:** Use server components to fetch data
4. ✅ **Build a feature:** Implement search, filters, pagination
5. ✅ **Deploy:** Push to Vercel with environment variables

---

## 📞 Support

- **PocketBase Docs:** https://pocketbase.io/docs/
- **Next.js Docs:** https://nextjs.org/docs
- **API Reference:** See `QUICK_REFERENCE.md`

---

**All API calls are secure, server-side, and authenticated as admin! 🔒**

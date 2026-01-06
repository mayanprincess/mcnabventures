# 🚀 START HERE - Server-Side PocketBase Setup

## ✅ What You Have Now

Your Next.js application is configured for **100% server-side PocketBase integration** with **super admin authentication**. All API calls are secure and never expose credentials to the client.

---

## ⚡ Quick Start (3 Steps)

### Step 1: Configure Environment Variables

Edit `.env.local` and add your **real** PocketBase admin credentials:

```bash
nano .env.local
```

```env
POCKETBASE_URL=https://mcnabventuresapi.up.railway.app
POCKETBASE_ADMIN_EMAIL=your-actual-admin@email.com
POCKETBASE_ADMIN_PASSWORD=your-actual-password
```

**Where to get credentials:**
- Go to: https://mcnabventuresapi.up.railway.app/_/
- Login to PocketBase admin dashboard
- Use those same credentials in `.env.local`

### Step 2: Start Development Server

```bash
pnpm dev
```

### Step 3: Test Connection

Open http://localhost:3000

You should see:
- ✅ "Connected successfully with admin authentication!"
- Your PocketBase URL
- Your admin email

---

## 🎯 Try These URLs

### Home Page
http://localhost:3000
- Connection status
- Documentation links

### View Any Collection
http://localhost:3000/collections/YOUR_COLLECTION_NAME

Examples (replace with your actual collections):
- http://localhost:3000/collections/posts
- http://localhost:3000/collections/products
- http://localhost:3000/collections/users

### Health Check API
http://localhost:3000/api/health
- JSON response with connection status

### Collections API
http://localhost:3000/api/collections/YOUR_COLLECTION?page=1&perPage=10
- JSON API endpoint for any collection

---

## 💻 How to Fetch Data

### Server Component (Recommended)

Create a new page: `src/app/my-page/page.js`

```javascript
import { getRecords } from '@/lib/services/collections';

export default async function MyPage() {
  // Fetch data on the server (admin authenticated automatically)
  const result = await getRecords('your_collection_name', {
    page: 1,
    perPage: 50,
    sort: '-created',
  });

  // Handle errors
  if (!result.success) {
    return <div>Error: {result.error}</div>;
  }

  // Use the data
  const { items } = result.data;

  return (
    <div>
      <h1>My Data</h1>
      {items.map((item) => (
        <div key={item.id}>
          <pre>{JSON.stringify(item, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
}
```

Visit: http://localhost:3000/my-page

---

## 📚 Available Functions

```javascript
import {
  getRecords,    // Get paginated list
  getFullList,   // Get all records
  getRecord,     // Get single record
} from '@/lib/services/collections';

// Examples:

// 1. Paginated list with filters
const posts = await getRecords('posts', {
  page: 1,
  perPage: 20,
  filter: 'status = "published"',
  sort: '-created',
  expand: 'author,category',
});

// 2. All records
const categories = await getFullList('categories', {
  sort: 'name',
});

// 3. Single record
const post = await getRecord('posts', 'record_id', {
  expand: 'author,comments',
});
```

---

## 🔍 Filter Examples

```javascript
// Simple
filter: 'status = "published"'

// Text search
filter: 'title ~ "Next.js"'

// Multiple conditions
filter: 'status = "published" && views > 100'

// Date comparison
filter: 'created >= "2024-01-01"'
```

---

## 🔐 Security Features

✅ Admin credentials stored server-side only (`.env.local`)  
✅ Never exposed to client browser  
✅ Automatic admin authentication  
✅ All API calls happen on server  
✅ Read-only operations only  

---

## 📖 Documentation Files

| File | Purpose | When to Read |
|------|---------|-------------|
| **START_HERE.md** | This file (quickstart) | Read first! |
| **SERVER_SIDE_SETUP.md** | Setup summary | After setup |
| **SERVER_SIDE_GUIDE.md** | Complete usage guide | When building |
| **README.md** | Project documentation | Reference |
| **QUICK_REFERENCE.md** | Code snippets | Quick lookup |

---

## 🐛 Troubleshooting

### ❌ "Admin credentials not configured"

**Fix:** Update `.env.local` with real admin email/password

### ❌ "Authentication failed"

**Check:**
1. Can you login to: https://mcnabventuresapi.up.railway.app/_/
2. Are the credentials in `.env.local` exactly the same?
3. Any typos?

### ❌ "Collection not found"

**Check:**
1. Does the collection exist in PocketBase admin?
2. Is the name spelled correctly? (case-sensitive)
3. Does admin have access?

### ❌ Still not working?

```bash
# Test the health check
curl http://localhost:3000/api/health

# Check if dev server is running
pnpm dev

# Clear cache and rebuild
rm -rf .next
pnpm dev
```

---

## 🎯 Your Next Steps

### ✅ Immediate (Now)

1. [ ] Update `.env.local` with real credentials
2. [ ] Run `pnpm dev`
3. [ ] Visit http://localhost:3000
4. [ ] Confirm connection successful

### ✅ Today

5. [ ] Try viewing a collection: `/collections/your_collection`
6. [ ] Create your first page (see example above)
7. [ ] Read **SERVER_SIDE_GUIDE.md** for more examples

### ✅ This Week

8. [ ] Build your main pages
9. [ ] Implement search/filters
10. [ ] Add pagination
11. [ ] Deploy to Vercel

---

## 💡 Pro Tips

1. **Always check `result.success`** before using data
2. **Use Server Components** for all data fetching (better SEO)
3. **Paginate large collections** to avoid slowness
4. **Read the guides** - they have tons of examples
5. **Test in PocketBase admin** first before coding

---

## 🚀 Ready to Build!

Everything is configured and ready. Start by:

1. Updating `.env.local` with your credentials
2. Running `pnpm dev`
3. Testing the connection
4. Creating your first page

**Need help?** Read **SERVER_SIDE_GUIDE.md** for detailed examples and patterns.

---

**Happy coding! 🎉**

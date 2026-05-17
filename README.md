# Express.js + Neon DB + PostgreSQL CRUD Operation Practice Project

এই প্রজেক্টের মাধ্যমে আমি Express.js এর basic server setup, Neon DB ব্যবহার করে PostgreSQL database connection এবং CRUD operation (Create, Read, Update, Delete) প্র্যাকটিস করেছি।

## ব্যবহার করা Technology

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Neon DB
- pg
- dotenv

## এই প্রজেক্টে যা প্র্যাকটিস করেছি

- Express server create করা
- সব code সুন্দরভাবে Modular Pattern এ organize করা
- Neon DB এর মাধ্যমে PostgreSQL database connect করা
- REST API তৈরি করা
- CRUD operation করা
- SQL query লেখা
- JWT ব্যবহার করে Authentication system তৈরি করা
- bcryptjs ব্যবহার করে password hash/encrypt করে database এ save করা
- Middleware ব্যবহার করা
- Environment variable ব্যবহার করা
- TypeScript দিয়ে type-safe backend development practice করা

## Practice করতে চাইলে

প্রথমে project clone করুন:

```bash
git clone https://github.com/mdalamin0/node-express-practice-server-project.git
```

তারপর project folder এ যান:

```bash
cd your-project-name
```

এরপর dependency install করুন:

```bash
npm install
```

তারপর `.env` file তৈরি করে নিজের Neon DB database URL add করুন:

```env
CONNECTION_STRING=your_neonDB_connection_url
PORT=5000
```

সবশেষে server run করুন:

```bash
npm run dev
```

ধন্যবাদ ❤️
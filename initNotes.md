# init
### git
``` bash
git init
git branch -M main
git remote add origin git@github.com:alkisax/hiddenLottery.git
```
### reeact - vite
```bash
mkdir frontend
cd frontend
npm create vite@latest . -- --template react-ts
npm install
npm run dev
```
- προσθεσα στο package.json
```json
    "dev": "vite",
    "build": "tsc -b && vite build",
    "postbuild": "rm -rf ../backend/dist && cp -r dist ../backend/dist",
    "lint": "eslint .",
    "preview": "vite preview"
```
- κάποια αρχικα packages
```bash
npm i react-router-dom
npm i axios
npm i jwt-decode
npm i uuid
npm i @mui/material @mui/icons-material @emotion/react @emotion/styled
```

### node
```bash
mkdir backend
cd backend
npm init -y
mkdir src
npm i -D typescript ts-node @types/node
```
- προσθέτω scripts στο package.json
```json
  "scripts": {
    "build": "tsc && npm run copy-assets",
    "copy-assets": "copyfiles src/**/*.yml build/",
    "dev": "ts-node-dev src/server.ts",
    "dev:test": "cross-env NODE_ENV=test ts-node-dev src/server.ts",
    "lint": "eslint src/**/*.{js,jsx,ts,tsx} --ignore-pattern build --ignore-pattern dist",
    "start": "node build/src/server.js",
    "test": "cross-env NODE_ENV=test jest --coverage --testTimeout=50000 --runInBand --verbose  --silent --resetModules --clearMocks",
    "test:log": "cross-env NODE_ENV=test jest --coverage --testTimeout=50000 --runInBand --verbose --resetModules --clearMocks"
  },
```

```bash
npm i ts-node-dev
npm i express cors helmet express-rate-limit
npm i jsonwebtoken bcrypt google-auth-library
npm i dotenv
npm i zod
npm i winston
npm i axios yamljs
npm i nodemailer
npm i swagger-ui-express swagger-jsdoc
npm i supertest
npm i @prisma/client

npm i prisma -D
npm i -D @types/express
npm i -D @types/express @types/cors @types/jsonwebtoken @types/bcrypt @types/nodemailer @types/supertest @types/swagger-jsdoc @types/swagger-ui-express @types/yamljs
npm i -D jest ts-jest @types/jest
npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm i -D cross-env
```

- backend\tsconfig.json
```json
{
  "compilerOptions": {
    "types": ["node", "jest"],
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": ".",
    "outDir": "./build",
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "strictNullChecks": true,
    "strictPropertyInitialization": true,
    "strictBindCallApply": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "esModuleInterop": true,
    "declaration": true,
    "sourceMap": true,
    "useUnknownInCatchVariables": true
  },
  "include": ["./**/*"]
}
```


###  postgress init (restart)
`https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/postgresql`
Αρχικοποίηση PostgreSQL με Supabase & Prisma (Prisma 7)

Σε αυτό το project στήσαμε PostgreSQL μέσω Supabase και συνδέσαμε το backend με Prisma 7 αποκλειστικά για runtime queries. Επειδή το τοπικό περιβάλλον δεν επιτρέπει direct συνδέσεις (port 5432), δεν χρησιμοποιούμε Prisma Migrate ούτε db pull. Αντίθετα, οι πίνακες δημιουργούνται χειροκίνητα από το Supabase SQL Editor, το schema.prisma γράφεται manual ως source of truth και το Prisma Client συνδέεται μέσω pg adapter (@prisma/adapter-pg) και Supabase connection pooler. Η ροή είναι: εγκατάσταση Prisma & pg adapter → prisma init → ρύθμιση .env με pooler URL → ορισμός schema → δημιουργία tables από SQL → prisma generate → σύνδεση Prisma Client στο runtime. Το setup αυτό είναι σταθερό, συμβατό με Prisma 7 και λειτουργεί κανονικά σε development και production, χωρίς migrations από το συγκεκριμένο PC.

1. Με την εντολή npm install prisma @prisma/client @prisma/adapter-pg pg @types/pg dotenv εγκαθιστούμε όλα τα απαραίτητα εργαλεία για να δουλέψει το Prisma 7 με PostgreSQL: το Prisma CLI για generate/config, το Prisma Client για type-safe queries, τον pg adapter και τον pg driver για τη σύνδεση με PostgreSQL (Supabase), καθώς και το dotenv για φόρτωση μεταβλητών περιβάλλοντος. Στη συνέχεια, με το npx prisma init --datasource-provider postgresql --output ../generated/prisma αρχικοποιούμε το Prisma στο project: δημιουργείται το schema.prisma, το prisma.config.ts και ρυθμίζεται το project ώστε ο Prisma Client να παράγεται σε ξεχωριστό φάκελο (generated/prisma), σύμφωνα με το νέο μοντέλο του Prisma 7 όπου το datasource ορίζεται μέσω config και η σύνδεση γίνεται runtime μέσω adapter.

- `npm install prisma @prisma/client @prisma/adapter-pg pg @types/pg dotenv`
- `npx prisma init --datasource-provider postgresql --output ../generated/prisma`

ΘΑ δημιουργήσει:

prisma/
  schema.prisma
prisma.config.ts
generated/prisma/

2. env προσθήκη
- env
```ts
DATABASE_URL="postgresql://postgres.<project-ref>:<password>@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
BACK_END_PORT=3001
```

3. Schema 
Στο schema.prisma ορίζουμε χειροκίνητα το μοντέλο δεδομένων που θέλουμε να χρησιμοποιεί το backend, χωρίς να περιλαμβάνεται connection URL, γιατί στο Prisma 7 η σύνδεση γίνεται μέσω prisma.config.ts και adapter στο runtime. Το generator client δηλώνει ότι θα παραχθεί Prisma Client (με custom output path στο generated/prisma), ενώ το datasource db απλώς δηλώνει ότι η βάση είναι PostgreSQL. Το model User περιγράφει τη δομή του πίνακα όπως τη “βλέπει” το application (types, relations, defaults) και λειτουργεί ως source of truth για τον κώδικα, όχι για τη βάση. Μετά από αυτό, πηγαίνουμε στο Supabase SQL Editor και δημιουργούμε ή τροποποιούμε τον αντίστοιχο πίνακα με καθαρό SQL, ώστε η πραγματική βάση να ταιριάζει ακριβώς με το schema που γράψαμε. Αυτή τη διαδικασία τη επαναλαμβάνουμε κάθε φορά που αλλάζει το schema (πρώτα ενημερώνουμε schema.prisma, μετά εφαρμόζουμε την αλλαγή με SQL στο Supabase), γιατί στο συγκεκριμένο περιβάλλον δεν χρησιμοποιούμε Prisma Migrate, αλλά διατηρούμε τον έλεγχο των αλλαγών της βάσης χειροκίνητα.
- schema.prisma
```ts
generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
}
```

4. ΔΗΜΙΟΥΡΓΙΑ ΠΙΝΑΚΑ (SUPABASE SQL)
supabase → sql editor. Θα πρέπει να φτιάξουμε χειροκίνητα το schema και θα πρέπει απο εδώ κάθε αλλαγή
`https://supabase.com/dashboard/project/hmptfwrwfpjuxjucvakk/sql/63f63f3b-fdc2-41ec-826b-b57d17bd4dcf`
```sql
create table "User" (
  id serial primary key,
  email text not null unique,
  name text,
  "createdAt" timestamptz not null default now()
);
```

5. generate
Η εντολή npx prisma generate διαβάζει το schema.prisma και το prisma.config.ts και δημιουργεί τον Prisma Client, δηλαδή τον type-safe κώδικα που χρησιμοποιεί το backend για να κάνει queries στη βάση (π.χ. prisma.user.findMany()). Στην περίπτωση του Prisma 7, ο client παράγεται στο generated/prisma και δεν περιέχει πληροφορίες σύνδεσης· η σύνδεση γίνεται στο runtime μέσω adapter (@prisma/adapter-pg). Κάθε φορά που αλλάζει το schema, πρέπει να τρέχει το prisma generate ώστε ο client να συγχρονιστεί με τα μοντέλα και τα types της βάσης.
- `npx prisma generate`

6. client
Εδώ αρχικοποιούμε το Prisma Client για runtime queries σύμφωνα με το Prisma 7. Ο PrismaPg adapter χρησιμοποιεί το pg driver και το DATABASE_URL (Supabase pooler) για να ανοίξει σύνδεση με τη βάση. Το adapter περνάει ρητά στον PrismaClient, που σημαίνει ότι το Prisma δεν διαβάζει URL από το schema, αλλά χρησιμοποιεί αυτή τη σύνδεση μόνο τη στιγμή που τρέχει ο server. Έτσι το Prisma λειτουργεί αποκλειστικά ως type-safe query layer, χωρίς migrations ή introspection από το τοπικό περιβάλλον.
- backend/src/prisma/client.ts
```ts
import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../../generated/prisma/client'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

export const prisma = new PrismaClient({ adapter })
```
7. postgress/mongo connect in server
Εδώ γίνεται η αρχικοποίηση των συνδέσεων με τις βάσεις δεδομένων πριν ξεκινήσει ο HTTP server. Στο postgres.ts δημιουργείται η σύνδεση με την PostgreSQL μέσω του Prisma Client (prisma.$connect()), που εξασφαλίζει ότι η εφαρμογή μπορεί να εκτελεί SQL queries πριν δεχτεί αιτήματα. Στο mongo.ts γίνεται προαιρετικά σύνδεση με MongoDB μέσω Mongoose, μόνο αν υπάρχει MONGODB_URI στο περιβάλλον, ώστε το project να μπορεί να χρησιμοποιεί ταυτόχρονα SQL (PostgreSQL) και NoSQL (MongoDB) χωρίς υποχρεωτική εξάρτηση. Στο server.ts φορτώνονται τα environment variables, καλούνται διαδοχικά οι συναρτήσεις σύνδεσης (connectPostgres, connectMongo) και μόνο αφού επιβεβαιωθεί ότι οι βάσεις είναι έτοιμες, ξεκινά ο Express server. Με αυτό το pattern αποφεύγεται να σηκωθεί το API χωρίς ενεργές DB συνδέσεις και γίνεται ξεκάθαρος ο έλεγχος του lifecycle των εξωτερικών εξαρτήσεων.

- backend/src/db/postgres.ts
```ts
import { prisma } from '../prisma/client';

export const connectPostgres = async () => {
  await prisma.$connect();
  console.log('Connected to PostgreSQL (Prisma)');
};
```

- backend\src\db\mongo.ts
```ts
import mongoose from 'mongoose';

export const connectMongo = async () => {
  if (!process.env.MONGODB_URI) return;

  mongoose.set('strictQuery', false);
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');
};
```

- backend\src\server.ts
```ts
import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { connectMongo } from './db/mongo';
import { connectPostgres } from './db/postgres';

const PORT = process.env.BACK_END_PORT || 3001;

const start = async () => {
  await connectPostgres();
  await connectMongo(); 

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

start();
```

- `npm run dev` → 
```bash
[INFO] 21:19:45 ts-node-dev ver. 2.0.0 (using ts-node ver. 10.9.2, typescript ver. 5.9.3)
[dotenv@17.2.3] injecting env (2) from .env -- tip: ⚙️  load multiple .env files with { path: ['.env.local'', '.env'] }
Connected to PostgreSQL (Prisma)
Server running on http://localhost:3001
```
✅

ΑΥΤΟΙ ΕΙΝΑΙ ΟΙ ΚΑΝΟΝΕΣ (ΜΗΝ ΤΟΥΣ ΣΠΑΣΕΙΣ)
❌ Όχι prisma migrate dev από αυτό το PC
❌ Όχι db pull
✅ Schema = manual
✅ Tables = Supabase SQL
✅ Prisma = runtime μόνο

## δημιουργία branch init για να το κάνω import απο άλλα νεα projects
→ “no fast-forward”.
git checkout -b init
git add .
git commit -m "feat: init with mongo and postgres/prisma/supabase"
git checkout main
git merge init --no-ff
git tag init-infra
git push origin init-infra
git push origin main
git push origin init


Πώς το ξαναχρησιμοποιείς σε ΑΛΛΟ project
git remote add template git@github.com:alkisax/hiddenLottery.git
git fetch template --tags
git cherry-pick init-infra


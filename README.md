# CreativaLab
## Start Develop
- Clone this repository
- Install dependencies
  ```
    npm i
  ```
- Create new file called '.env' and copy that:
  ```
    DATABASE_URL=
    AUTH_SECRET=
    GOOGLE_CLIENT_ID=
    GOOGLE_CLIENT_SECRET=
    UPLOADTHING_TOKEN=
  ```
- Generate types of databases 
  ```
    npx prisma generate
  ```
- Run application
  ```
    npm run dev
  ```
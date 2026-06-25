REPLACE THE COMPONENTS WITH REUSABLE COMPONENTS?



When setting up for the first time

1. npm i
2. npm install @prisma/client@^6.12.0
3. npm install prisma@^6.12.0 --save-dev
4. docker run --name id607001-db-dev -e POSTGRES\_PASSWORD=HelloWorld123 -p 5432:5432 -d postgres
5. npm run env:copy
6. npx prisma migrate deploy
7. npm run dev
8. or just run
9. chmod +x application-setup.sh
10. ./application-setup.sh
11. &#x20;in git bash



When opening up again, run

1. docker run --name id607001-db-dev -e POSTGRES\_PASSWORD=HelloWorld123 -p 5432:5432 -d postgres
2. npx prisma migrate deploy
3. npm run dev


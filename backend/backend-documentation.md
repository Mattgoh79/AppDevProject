Project description and purpose



This is an RESTful API that allows users to write reviews about albums that they have listened to, sharing their thoughts to other users, as well as being able to use it as a personal journal regarding thoughts they had regarding the music they listen to/used to listen to.




Installation and setup instructions

1. git clone https://github.com/Mattgoh79/AppDevProject.git
2. cd backend
3. npm i
4. npm install @prisma/client@^6.12.0
5. npm install prisma@^6.12.0 --save-dev
6. docker run --name id607001-db-dev -e POSTGRES\_PASSWORD=HelloWorld123 -p 5432:5432 -d postgres
7. npm run env:copy
8. npx prisma migrate deploy
or 
In Git Bash
9. chmod +x application-setup.sh
10. ./application-setup.sh





Environment variable configuration

&#x20; NODE\_ENV=development

&#x20; PORT=3000

&#x20; API\_BASE\_URL=http://localhost

&#x20; DATABASE\_URL=postgresql://postgres:HelloWorld123@localhost:5432/postgres

&#x20; JWT\_SECRET=MySuperSecretKeyChangeInProduction256Bits

&#x20; JWT\_LIFETIME=1h




How to run the application in development environment
1. npm run dev



How to run the API tests in testing environment
1. In package.json find 



Deployment URL

https://appdevproject-d0w3.onrender.com


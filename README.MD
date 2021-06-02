# Instaclone Project Start !!
Instaclone Backend with Nomad coders   
5/18 Let's do this  

## 백엔드 생성

### GraphQL Server 생성 <-> Prisma  

1) GitHub Repo 생성 후 Git 저장소 init + VSCode 열기  
> git init  
> git remote add origin [레파지토리 링크]  
2) npm 프로젝트 생성 후 VSCode로 열기  
> npm init -y  
> code .  
### gitignore Extension을 깔면 .gitignore 파일 생성을 도와줌
1) Extension 설치  
2) 좌측하단의 톱니 아이콘을 누르면 나오는 Command Pallette 클릭  
3) add gitignore> node 선택  


### Apollo Server, GraphQL 설치  
> npm install apollo-server graphql
   
### 코드가 수정될 때 마다 서버를 재시작시켜주는 nodemon
- nodemon 라이브러리 설치
> npm i nodemon --save-dev
### babel 설치
- babel : javascript complier, 어떤 문법으로 쓰든 브라우저가 이해할 수 있는 형태로 변환해주는 역할을 함
> npm install --save-dev @babel/core
> npm install @babel/preset-env --save-dev
> npm install @babel/node --save-dev
### GraphQL 복습

-. const typeDefs = gql`(...내용...)` 변수 형태로 스키마 선언해서 바로 사용 가능, 이전 GraphQL 영화 API 강의에서 graphql-yoga 쓸 때 (.graphql) 파일을 만들어 선언해서 쓰는 것과 똑같음   
-. resolver: 사용자가 날리는 쿼리에 따라 reply 줌으로써 '해결'해주는 역할  
-. 사용자 쿼리  
  - Query: 원하는 대상 데이터 조회  
  - Mutation: 원하는 대상 데이터 변경  
    * Mutation resolver 인자 구조: 특이한 점은 root의 경우 underbar(_)를 써서 대신할 수 있음  
      someAction(root, args, context, info)   
 --> someAction(_, args)  

### Prisma Set up
- Prisma란? ORM 프레임워크임
> ORM(Object Relation Mapping), 클래스를 만들면 이 클래스들이 RDB와 자동으로 연결(Mapping)됨. SQL 쓸 필요 없이 자바스크립트 코드 작성하면 Prisma가 데이터베이스와 대신 소통함
- 설치 스크립트 (Windows 10 기준)  
> npm install prisma -D
> npx prisma init
### PostgreSQL 설치
https://www.enterprisedb.com/postgresql-tutorial-resources-training?cid=437

### ✔ pgAdmin4 fatal error 발생 시에는.. (이것땜에 1시간 삽질함; ㅡㅡ)
1) 시작> 검색> 구성 요소 서비스> 서비스(로컬)> postgressql-x64-13 서비스를 중지  
2) pgAdmin4 실행 (아마 될거임)  
3) postgressql-x64-13 서비스 다시 시작  

### Prisma migrate: 데이터 베이스의 형태를 변경해준다.  
→ 원래는 client를 생성하지 않지만 dev 명령어와 함께 실행하면 자동으로 prisma client가 생성된다.  

- 명령어
> npx prisma migrate dev (--name init) --preview-feature
### Windows10에서 P1001 에러가 뜰 경우
1) .env 파일의 URL에 비빌번호를 랜덤패턴→실제pw 로 변경한다  
~그래도 안될경우~  
2) prisma migrate 설정 reset 후 다시 실행
npx prisma migrate reset --preview-feature
npx prisma migrate dev --preview-feature

### 프리즈마 스튜디오
pqAdmin4 접속 없이도 Data 조회, 생성, 삭제 등을 가능하게 해주는 유용한 Studio Tool ~Wow...~   

- 설치 스크립트   
> npx prisma studio 
### graphql-tools
npm i graphql-tools


### dotenv 설치 (유용함)
npm install dotenv

# 5/19~ API Plan
## User: 완료된 요건은 ✔ 체크
- [x] Create Account
- [x] See Profile
- [x] Login
- [x] Edit Profile
- [x] Change Avatar (Image Upload)
- [ ] Follow User
- [ ] Unfollow User
- [ ] Search Users
- [ ] See Followers
- [ ] See Following

## Photos

- [ ] See Photo
- [ ] Upload Photo
- [ ] Edit Photo
- [ ] Like / Unlike Photo
- [ ] See Photo Likes
- [ ] See Feed
- [ ] Search Photos
- [ ] See Hashtags

## Comments

- [ ] Comment on Photo
- [ ] Edit Comment
- [ ] Delete Comment

## 백엔드 테스트 중 Maximum call stack size exceeded Error 발생 시..
1. Delete node_modules
2. Add scripts "preinstall": "npx npm-force-resolutions" in pakage.json
3. sudo npm i --unsafe-perm
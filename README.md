# Westerops Todo App

This is a [Next.js](https://nextjs.org/) project that created with [`npx create-next-app@latest`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)

## Getting Started

First, install npm packages:

```bash
npm install
# or
yarn
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Tasks

- Build the design according to `figma-design.png` (as pixel perfect as possible)
- You can find design details in `figma-design-details.png`
- You can also find design details and icons&logo files in [Figma](https://www.figma.com/file/8AUZwSFrERAZQ0TkpoWHV2/fe_case?node-id=0%3A1)
- You can replace the icons with the icon you want.

User should be able to:

- create new todo
- remove todo
- update todo
- pin the todo

Nice to have:

- Responsive design (for web, tablet and mobile screens)
- Use of TypeScript (you can start a new project with next.js typescript template)
- Use of TailwindCSS
- Use of localstorage
- Git history and commit messages
- Project deployment (to the vercel-netlify-heroku-firebase etc)

## API

**Create Todo**

    POST /api/todos

| Parameter | Type     | Description              |
| :-------- | :------- | :----------------------- |
| `title`   | `string` | **Required**. Todo Title |

**CURL Example:**

    curl -X POST http://localhost:3000/api/todos
           -H 'Content-Type: application/json'
           -d '{ "title": "Example Todo 1"}'

**Response**

```javascript
{
	"id" : number,
	"title" : string,
	"checked" : bool,
	"pinned" : bool
}
```

---

**Get Todo List**

    GET /api/todos

**CURL Example:**

    curl -X GET http://localhost:3000/api/todos

**Response**

```javascript
[
  {
    id: number,
    title: string,
    checked: bool,
    pinned: bool,
  },
  {
    id: number,
    title: string,
    checked: bool,
    pinned: bool,
  },
];
```

---

**Get Todo Detail**

    GET /api/todos/:id

**CURL Example:**

    curl -X GET http://localhost:3000/api/todos/1652861603540

---

**Update Todo**

    PATCH /api/todos/:id

**CURL Example:**

    curl -X PATCH http://localhost:3000/api/todos/1652861603540
           -H 'Content-Type: application/json'
           -d '{ "title": "Example Todo Updated" }'

---

**Delete Todo**

    DELETE /api/todos/:id

**CURL Example:**

    curl -X DELETE http://localhost:3000/api/todos/1652861603540

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



## Final Project

## Completion requirements
During Project Week, you will be designing and making a new web app that has multiple pages - including an About Us page. 

It should also have dynamic routes which will take you to pages created for content that is added.
It should use a database and a server (it will probably use server-side rendering - nextjs - but it does not have to).
It should have a neat front end that is easy to use and makes you want to use it.
It must allow the user to add content - eg in the form of items, posts, comments, images ...
It must save added content to the database. It should associate that content with the user.
It must have authentication implemented. It can also use this for authorisation eg to enable access to an admin area, or to allow a user to review and edit only their own posts.
It must be mobile responsive.
It will be a collaboration, so everybody must contribute. The expectation is either to contribute to or learn from others on each bit.
It will be presented at the end of the week - with contributions from all team members, and some sick visual aids (probably slides) to engage and inform the crowd.
It will be well planned - with a database schema, page wireframes, route maps and other designer magic.
It will be documented with information about who it is for, why they need it (eg user stories), what it does, how it does it (eg database schema, plans) and how to set it up on a local machine (eg node packages used, keys that need sourcing)
Marking rubric: (up to 4 marks for each criterion)

Web fundamentals	Expected: Semantic html / jsx
Exceeding: Components are split up, rather than long page.js returns everything
Web fundamentals	Expected: Well organised, easy to follow CSS - eg thematic groupings or commenting used to create sections
Exceeding: Also CSS used to add function / meaning eg :hover, transitions, animations
OR Tailwind implemented = 4 on its own
Web fundamentals	Expected: Uses media queries & works on mobile
Exceeding: Full function on mobile
Web fundamentals	Expected: Well planned UI
Exceeding: Excellence
Web fundamentals	Expected: Lighthouse-tested
Exceeding: Scores above 90%
Programming Logic	Expected: Sensible code: variables, functions, components named semantically, line-breaks and indents used to aid readability
Exceeding: Very sensible code: comments to explain odd decisions AND all commented-out code removed;
OR evidence of refactoring to reduce repetition and aid readability
Programming Logic	Expected: full CR(UD) functionality, correct data schema and queries
Exceeding: CRUD permissions managed (data changes tied to user_id/ownership) and/or relational tables with foreign keys
Programming Logic	Expected: Forms correctly submit data to the database
Exceeding: Forms have validation features to enforce data requirements and inform user
Programming Logic	Expected: Uses some of ES6 features: let /const, arrow functions, template literals
Exceeding: Uses all of these
OR TypeScript = 4 on its own
Modern development tools	Expected: Use nextjs or react to create the app
Exceeding: Use a third party libary - eg Radix, MUI, framer motion or other
Modern development tools	Expected: Dynamic routes & params
Exceeding: Also uses query strings for filtering, or sorting, or searching etc.
Modern development tools	Expected: Authentication implemented
Exceeding: User id used in app to associate data with users
Modern development tools	Expected: Manage state across the app with useState and passing props
Exceeding: Manage state concisely - eg using objects / useContext / useReducer
Modern development tools	Expected: Pages / components mapped out
Exceeding: Explain choices of structure / tools in presentation
Modern development tools	Expected: Accessible with keyboard tab + enter nav
Exceeding: Adds additional accessibility features such as voiceover support
Modern development tools	Expected: Deployed to Vercel or Render
Exceeding: README.md in github to enable others to use the code and run the project themselves
Dev skills & industry practices	Expected: 1. User stories;
2. Problem domain;
3. Wireframing;
4. File / page / component structure
5. Trello
Exceeding: Critical reflections on the challenges, successes and learning within the project
Dev skills & industry practices	Expected: Clear commit messages related to code changes uses pull requests to manage preview deployments and manual testing
Exceeding: Independently solving merge conflicts - group would need to mention in presentation; version control protocols used
Professional skills	Expected:
1. Use presentation tools (eg slides, props)
2. Follow a clear structure
3. With each group member clearly knowing their role
4. Keep to time - 10 minutes! Rehearse it
Exceeding: Excellence in flow and audience engagment; sick visual aids
Professional skills	Expected:
1. Contribute to the group’s discussions;
2. Contribute to the group’s work;
3. Work together to learn eg paired programming;
4. Contribute to team cohesion
5. Evaluate colleagues generously but fairly
Exceeding: Active and engaged and supportive and asking for and giving help...

🌮

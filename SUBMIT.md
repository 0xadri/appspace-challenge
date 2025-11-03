# Hello

You can find a minimal Task Management System in [Tasks Tracker](./TASKS_LOG.md)

## Additional questions

**What are Custom Hooks in React? Propose a practical example where you would create one and explain why it would be useful**

The purpose of custom hooks is to reuse logic with React Hooks (React state, effects, or context), example use cases: create a data fetching custom hook to centralize and reuse API fetching logic.

**What advantages does using TypeScript offer in a Frontend project?**

It adds static typing, helping to catch error early (type error caught at compile time vs runtime), prior to deployment, which means there are less errors in production hence less production issues and rollbacks. The trade off is the added code complexity, resulting in a longer development time.

**What challenges might arise when integrating TypeScript into an existing project?**

Migrating large code bases (convert all .js files to .ts at once) is difficult. It is better to do it gradually: on few modules first, and first adding "// @ts-check" at the top.

Also some libraries may not support TypeScript properly, especially older ones. Another thing is that the team needs to upskill and it may take some time.

**How would you approach implementing testing in a Frontend application?**

Implement the Testing Pyramid strategy: Unit Tests as a priority before anything, with a minimum coverage of 65%, Integration Tests second, and E2E Tests third.

Integrate the automated tests in the CI/CD pipeline whther GH Actions or GitLab CI.

**What types of tests do you consider essential, and why?**

Implement the Testing Pyramid strategy: Unit Tests as a priority before anything.

**You are assigned a project with a team distributed across different time zones and cultures. What strategies would you use to ensure effective communication and an efficient workflow?**

Overlapping work hours of minimum 3H. Weekly personal intro calls, where each person can give a short presentation about her/himself, his past work, maybe mention some hobbies, languages spoken, places lived in, and encourage people to find things they have in common with the presenter.

**A team member suggests a technical solution that you consider inefficient or incorrect. How would you handle this situation to avoid tension while ensuring that the best solution is adopted?**

In situation of potential escalating tension, potential conflict, always try to remove biase and emotions from the discussion by encouraging collecting facts and data. So that a rational analysis can be done, and a down to earth conversation can take place leading to a logical collective decision.

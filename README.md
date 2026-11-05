# CCC181 Week 10: CampusConnect Mobile-First Login Page

React + TypeScript starter for the Week 10 group activity. The page is already
built. Your group's job is the **mobile-first CSS** and the **GitHub teamwork**.

## Run it

```bash
npm install
npm run dev          # open the local URL it prints
npm run dev:phone    # same, but your phone (same Wi-Fi) can open the Network URL
npm run build        # must finish with no errors before you submit
```

## Rules

- Edit only the CSS files in `src/styles/` (one member = one file). Do not edit `reset.css`.
- Plain CSS only. No Tailwind, Bootstrap, Material UI, styled-components, or any UI library.
- Phone styles first (no media query), then `min-width` queries only. Never `max-width`.
- Do not edit the `.tsx` files or rename classes. If you must, tell the group first.

## Group information (fill in)

| Item | Your answer |
| --- | --- |
| Group number | 2 |
| Section | IT3-B|
| Repository URL |https://github.com/ernestoorate/CCC181-Week10-Group2/ |

## Members (each member fills in their own row in their own commit)

| Member | Name | GitHub username | CSS file | What I did |
| --- | --- | --- | --- | --- |
| 1 (leader) | Ernesto Jr. T. Orate | ernestoorate| `base.css` | Created base.css by setting up the website's global styles, color scheme, typography, and responsive layout. | 
| 2 | Joevan Lloyd ilustrado | joevanlloydilustrado3136| `nav.css` | Updated nav.css by creating a responsive navbar using Flexbox and a footer using CSS Grid, styling them with the project's color scheme, adding hover and focus effects for accessibility, and implementing 768px and 1024px breakpoints for tablet and desktop layouts.|
| 3 | Frank Leo Samson | FrankLeoSamson | `form.css` | Styled the login card and form in form.css with Flexbox: stacked 48 px fields and buttons on phone, checkbox row and buttons side by side from 768 px, and a larger card padding from 1024 px. |

## Experiment 0: the page without the viewport tag

What did the page look like in DevTools phone mode **before** adding the viewport meta tag?
What changed **after** adding it?

Before adding the viewport meta tag, the page appeared zoomed out and smaller in phone mode because the browser used a wider default layout viewport. After adding the viewport tag, the page adjusted to the actual screen width, making the content properly sized and easier to view on mobile devices.

## DevTools test results

| Width | What must be true | Pass? |
| --- | --- | --- |
| 360 px | 1 column. Nav links stacked and 48px tall. Options and buttons stacked. Footer in 1 column. No sideways scrollbar. | Yes |
| 768 px | Nav in one row (brand left, links right). Checkbox and link in one row. Two buttons side by side. | Yes |
| 1024 px | Brand panel and login card side by side. Footer in 3 columns. Heading is larger. | Yes |
| 1280 px | Content centered and stops at 1200px. | Yes 

### Breakpoints I observed

Using **Show media queries** and dragging slowly from 360 px to 1280 px, the layout changed at these exact widths:

768px – Tablet layout adjustments.

1024px – Brand panel and login card appear side by side.

1280px – Content becomes centered with a maximum width of 1200px.

No broken layouts or sideways scrolling were observed during testing.

Screenshots are in `screenshots/` as `360.png`, `768.png`, `1024.png`, `1280.png`.

## What our group learned (leader writes this last)

Our group learned the importance of mobile-first design, responsive breakpoints, and proper viewport settings. We also learned how CSS media queries help create a layout that adjusts to different screen sizes while maintaining readability, accessibility, and consistency.

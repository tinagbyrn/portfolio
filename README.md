# Christine Gabayeron — Portfolio ("Intersect")

Concept: three rings — UI/UX (terracotta), Graphic (ochre), Web Dev (slate blue). They meet in the hero,
pull apart as you scroll, and show up again in the logo, favicon, preloader, page transitions and project tags.
Ivory paper background, ink type, annotations like "fig. 01" borrowed from a designer's working sheet.

## Pages
| File | What it is |
|---|---|
| `index.html` | Hero with draggable 3D rings, word-fill statement, three disciplines, horizontal project scroll, tools marquee, numbers |
| `work.html` | All projects. Filters (UI/UX · Graphic · Web Dev), grid/list toggle, image preview that follows the cursor in list view |
| `project.html?p=slug` | Case study page made from `assets/js/data.js`: cover, story, gallery with lightbox, next project |
| `about.html` | Bio, portrait reveal on hover, process timeline, experience, skills, certifications |
| `contact.html` | Form (opens the visitor's email app), 3D rings that react to typing, click-to-copy email |
| `404.html` | Not-found page |

## Editing
- **Projects:** `assets/js/data.js`. Add an object to `PROJECTS` and put the images in `assets/img/`.
- **Colors and fonts:** the `:root` block at the top of `assets/css/style.css`.
- **Email, phone, LinkedIn:** at the top of `assets/js/main.js` (`EMAIL`, `PHONE`, `LINKEDIN`).
- **Résumé download:** replace `assets/Christine-Gabayeron-Resume.pdf`.

## Run it locally
Double-click `index.html`, or for the best results run a local server in this folder:
```
python -m http.server 5173
```
Then open http://localhost:5173

## Publish (free)
- **Netlify Drop:** drag this folder onto https://app.netlify.com/drop
- **GitHub Pages / Vercel:** push the folder to a repo and deploy it as a static site (there's no build step).

## Hidden extras
- Press **G** to show the 12-column design grid.
- Drag the rings on the home page.
- Hover over the role pills or discipline cards to light up their ring.

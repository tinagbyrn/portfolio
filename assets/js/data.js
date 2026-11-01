/* Project data — edit this file to add, remove or reword work.
   disciplines: "ux" (UI/UX), "gfx" (Graphic), "dev" (Web Dev)
   gallery item types: "img" (plain), "web" (tall screenshot in a browser frame that scrolls on hover),
                       "pad" (centered on a cream panel — good for phones, logos, posters)
   size: "full" | "half" (default) | "third"
   wire: true → no images (internal tools under NDA), a wireframe cover is drawn instead */
window.PROJECTS = [
  {
    slug: "cruz-garcia",
    title: "Cruz & Garcia",
    type: "Brand Identity",
    disciplines: ["gfx", "ux"],
    tools: ["Adobe Illustrator", "Photoshop", "Canva"],
    role: "Brand & social design",
    summary: "A friendly identity for a multi-specialty dental clinic, built around a single smile.",
    cover: "assets/img/cg-logo.webp",
    coverFit: "contain",
    body: [
      "Dental clinics tend to look clinical. Cruz & Garcia wanted the opposite: a brand that feels warm enough to make people actually book that check-up.",
      "The mark is one stroke: a coral smile with a single dot, which also reads as a face looking up. That shape carries across every piece, from the logo to the social templates, so the clinic is recognisable even when the name is cropped out."
    ],
    points: [
      "Logo mark and wordmark with a coral and sky-blue palette",
      "Social media templates: tips, trivia and booking prompts",
      "Banner set for campaigns such as “The Tooth Matters”"
    ],
    gallery: [
      { src: "assets/img/cg-logo.webp", type: "pad", size: "half" },
      { src: "assets/img/cg-social.webp", type: "pad", size: "half" },
      { src: "assets/img/cg-trivia.webp", type: "img", size: "half" },
      { src: "assets/img/cg-consult.webp", type: "img", size: "half" },
      { src: "assets/img/cg-banner.webp", type: "img", size: "full" }
    ]
  },
  {
    slug: "the-hive",
    title: "The Hive at Gateway",
    type: "Website & Mobile",
    disciplines: ["ux", "dev"],
    tools: ["WordPress", "Responsive design"],
    role: "Web design & build",
    summary: "A dark, honey-gold website for Kenosha’s coworking space — desktop and mobile.",
    cover: "assets/img/hive-home.webp",
    body: [
      "The Hive rents private offices, desks and meeting suites. The site needed to do two jobs: show the space, and get people to sign up for a free day pass.",
      "Black and gold come straight from the logo. Every page leads to one action — memberships or a suite booking — and the mobile version puts those two buttons first."
    ],
    points: [
      "Home, member directory and contact pages",
      "Mobile layout with the main calls to action at the top",
      "Map and inquiry form for office space"
    ],
    gallery: [
      { src: "assets/img/hive-home.webp", type: "web", size: "half" },
      { src: "assets/img/hive-mobile.webp", type: "pad", size: "half" },
      { src: "assets/img/hive-directory.webp", type: "web", size: "half" },
      { src: "assets/img/hive-contact.webp", type: "web", size: "half" }
    ]
  },
  {
    slug: "pod",
    title: "POD — PPAP Operations Database",
    type: "Internal Web App",
    disciplines: ["dev", "ux"],
    tools: ["ASP.NET", "C# .NET Core", "Figma"],
    role: "Sole designer & developer",
    summary: "Designed and shipped v1 alone in Q1 2025 to replace manual PPAP tracking.",
    wire: "table",
    body: [
      "PPAP (Production Part Approval Process) work at Lear was tracked by hand. POD puts every submission, status and owner in one database.",
      "I designed, built and launched version 1 by myself in Q1 2025. Working as the only developer meant planning scope and communication carefully with management to get it over the line."
    ],
    points: [
      "Wireframes and prototype in Figma, then built in ASP.NET",
      "Shipped v1 in Q1 2025 as a one-person project",
      "Screens are confidential — shown here as wireframes"
    ],
    gallery: []
  },
  {
    slug: "c-o-sportswear",
    title: "C&O Sportswear",
    type: "E-commerce Website",
    disciplines: ["dev", "ux"],
    tools: ["WordPress", "WooCommerce"],
    role: "Web design & customization",
    summary: "An online store for a custom printing and sportswear shop, in maroon and gold.",
    cover: "assets/img/co-home.webp",
    body: [
      "C&O Sportswear sells team apparel and custom printing, so the site has to work as a real shop.",
      "The new store leads with a free-shipping offer, then gets straight to the product grid. The shop page is a clean catalogue, and the contact page puts the storefront photo up front so locals recognise it."
    ],
    points: [
      "Home, shop and contact pages",
      "Product grid that works on phones",
      "Brand colors pulled from the storefront"
    ],
    gallery: [
      { src: "assets/img/co-home.webp", type: "web", size: "third" },
      { src: "assets/img/co-shop.webp", type: "web", size: "third" },
      { src: "assets/img/co-contact.webp", type: "web", size: "third" }
    ]
  },
  {
    slug: "brand-marks",
    title: "Logo Marks",
    type: "Logo Design",
    disciplines: ["gfx"],
    tools: ["Adobe Illustrator", "Canva"],
    role: "Logo design",
    summary: "Marks for internal applications and small brands — simple shapes that still read small.",
    cover: "assets/img/logo-mdp.webp",
    coverFit: "contain",
    body: [
      "At Lear I design logos for the applications our team builds, so each tool has its own face on the intranet.",
      "The rule I follow: a logo should still work at 32 pixels, in one color. These marks use one bold idea each — a magnifier, a flame — and nothing else."
    ],
    points: ["Application logos made in Adobe Creative Suite and Canva", "Built to work in one color and at small sizes"],
    gallery: [
      { src: "assets/img/logo-mdp.webp", type: "pad", size: "half" },
      { src: "assets/img/logo-fl.webp", type: "pad", size: "half" }
    ]
  },
  {
    slug: "cromark",
    title: "Cromark",
    type: "Corporate Website",
    disciplines: ["dev"],
    tools: ["WordPress", "Bricks Builder"],
    role: "Web design & build",
    summary: "A clean corporate site with a strong red header, built in WordPress with Bricks.",
    cover: "assets/img/cromark-message.webp",
    body: [
      "A multi-page company site: services, a message from the owner, and a contact page.",
      "Built in WordPress with Bricks Builder so the client can edit content without breaking the layout."
    ],
    points: ["Home, about and contact pages", "Reusable Bricks components for easy editing"],
    gallery: [
      { src: "assets/img/cromark-home.webp", type: "web", size: "half" },
      { src: "assets/img/cromark-message.webp", type: "web", size: "half" },
      { src: "assets/img/cromark-contact.webp", type: "img", size: "full" }
    ]
  },
  {
    slug: "ams",
    title: "AMS — Asset Management System",
    type: "Internal Web App",
    disciplines: ["dev", "ux"],
    tools: ["C# .NET Core", "Figma"],
    role: "Designer & developer",
    summary: "A department tool for tracking equipment and handling user requests.",
    wire: "dash",
    body: [
      "Started as a continuous-improvement project: the department needed one place to see what equipment exists, who has it, and what people are requesting.",
      "IT policy blocked executable files, so the obvious approach wasn’t allowed. I worked with management on a solution that fit the policy and still shipped."
    ],
    points: ["Asset list, assignment history and request queue", "Delivered within company IT policy restrictions", "Screens are confidential — shown here as wireframes"],
    gallery: []
  },
  {
    slug: "print-social",
    title: "Posters & Social",
    type: "Graphic Design",
    disciplines: ["gfx"],
    tools: ["Canva", "Photoshop", "Meta Ads"],
    role: "Graphic design",
    summary: "Event posters, itineraries and infographics — made to be read in a few seconds.",
    cover: "assets/img/poster-pajama.webp",
    coverFit: "contain",
    body: [
      "Company events, team trips and internal campaigns all need something people will actually stop and read.",
      "Each piece puts the one thing you need to know — the date, the destination, the message — biggest on the page."
    ],
    points: ["Event poster for a team-building night", "Travel itinerary layout", "Infographic on strong work ethics"],
    gallery: [
      { src: "assets/img/poster-pajama.webp", type: "pad", size: "third" },
      { src: "assets/img/travel-itinerary.webp", type: "pad", size: "third" },
      { src: "assets/img/work-ethics.webp", type: "pad", size: "third" }
    ]
  },
  {
    slug: "mobile-concepts",
    title: "Mobile Concepts",
    type: "Mobile UI",
    disciplines: ["ux"],
    tools: ["Figma"],
    role: "UI design",
    summary: "Phone-first layouts for a photographer, a fashion lookbook and a dental academy.",
    cover: "assets/img/lookbook-mobile.webp",
    coverFit: "contain",
    body: [
      "Most visitors arrive on a phone, so I design that screen first. These are three different moods using the same rule: one idea per screen.",
      "A quiet black gallery for a photographer, a soft serif lookbook for fashion, and a direct, button-first layout for a dental academy."
    ],
    points: ["Editorial photography portfolio", "“Fresh, Fun, Female” lookbook", "Dental academy mobile site"],
    gallery: [
      { src: "assets/img/stilllife-mobile.webp", type: "pad", size: "third" },
      { src: "assets/img/lookbook-mobile.webp", type: "pad", size: "third" },
      { src: "assets/img/dpg-mobile.webp", type: "pad", size: "third" }
    ]
  },
  {
    slug: "isc",
    title: "ISC — IMDS Solutions Central",
    type: "Internal Web App",
    disciplines: ["ux", "dev"],
    tools: ["Figma", "ASP.NET"],
    role: "Wireframes, prototype & development",
    summary: "Speeds up IMDS tasks and requests. Started in my internship, still growing.",
    wire: "form",
    body: [
      "ISC began during my on-the-job training at Lear in 2019, where I made the wireframes and prototypes and helped build the login module.",
      "Years later I came back to it as an IT Specialist and helped bring in new updates, so teams can handle IMDS requests without the old manual steps."
    ],
    points: ["Wireframes, prototype and authentication module (2019)", "New features and integration (2024–2026)", "Screens are confidential — shown here as wireframes"],
    gallery: []
  }
];

window.DISC = {
  ux: { name: "UI/UX", long: "UI/UX Design" },
  gfx: { name: "Graphic", long: "Graphic Design" },
  dev: { name: "Web Dev", long: "Web Development" }
};

/* Simple wireframe drawings for NDA projects */
window.WIRES = {
  table: '<svg viewBox="0 0 400 260" fill="none" stroke="#171614" stroke-opacity=".55" stroke-width="1.2"><rect x="1" y="1" width="398" height="258" rx="8" fill="#fbf9f4"/><path d="M1 30h398"/><circle cx="16" cy="15" r="4"/><circle cx="30" cy="15" r="4"/><rect x="16" y="46" width="90" height="10" rx="3" fill="#e4572e" fill-opacity=".8" stroke="none"/><rect x="290" y="42" width="94" height="20" rx="10"/><path d="M16 80h368M16 108h368M16 136h368M16 164h368M16 192h368M16 220h368"/><g fill="#171614" fill-opacity=".14" stroke="none"><rect x="16" y="88" width="60" height="8" rx="3"/><rect x="120" y="88" width="110" height="8" rx="3"/><rect x="16" y="116" width="50" height="8" rx="3"/><rect x="120" y="116" width="90" height="8" rx="3"/><rect x="16" y="144" width="66" height="8" rx="3"/><rect x="120" y="144" width="120" height="8" rx="3"/><rect x="16" y="172" width="44" height="8" rx="3"/><rect x="120" y="172" width="80" height="8" rx="3"/><rect x="16" y="200" width="58" height="8" rx="3"/><rect x="120" y="200" width="100" height="8" rx="3"/></g><g stroke="none"><rect x="310" y="86" width="56" height="12" rx="6" fill="#3d5a80" fill-opacity=".7"/><rect x="310" y="114" width="56" height="12" rx="6" fill="#d99a1e" fill-opacity=".7"/><rect x="310" y="142" width="56" height="12" rx="6" fill="#3d5a80" fill-opacity=".7"/><rect x="310" y="170" width="56" height="12" rx="6" fill="#e4572e" fill-opacity=".7"/><rect x="310" y="198" width="56" height="12" rx="6" fill="#3d5a80" fill-opacity=".7"/></g></svg>',
  dash: '<svg viewBox="0 0 400 260" fill="none" stroke="#171614" stroke-opacity=".55" stroke-width="1.2"><rect x="1" y="1" width="398" height="258" rx="8" fill="#fbf9f4"/><path d="M90 1v258"/><g fill="#171614" fill-opacity=".14" stroke="none"><rect x="14" y="20" width="60" height="8" rx="3"/><rect x="14" y="44" width="50" height="8" rx="3"/><rect x="14" y="62" width="56" height="8" rx="3"/><rect x="14" y="80" width="44" height="8" rx="3"/></g><rect x="106" y="18" width="84" height="56" rx="6"/><rect x="200" y="18" width="84" height="56" rx="6"/><rect x="294" y="18" width="92" height="56" rx="6"/><text x="118" y="56" font-family="serif" font-size="22" fill="#171614" stroke="none">128</text><text x="212" y="56" font-family="serif" font-size="22" fill="#e4572e" stroke="none">14</text><text x="306" y="56" font-family="serif" font-size="22" fill="#171614" stroke="none">6</text><rect x="106" y="88" width="178" height="154" rx="6"/><path d="M118 220l30-40 30 18 30-54 30 26 30-44" stroke="#e4572e" stroke-opacity=".9" stroke-width="2"/><rect x="294" y="88" width="92" height="154" rx="6"/><circle cx="340" cy="140" r="30" stroke="#3d5a80" stroke-width="10" stroke-opacity=".6" stroke-dasharray="120 200"/><circle cx="340" cy="140" r="30" stroke="#d99a1e" stroke-width="10" stroke-opacity=".7" stroke-dasharray="60 200" stroke-dashoffset="-120"/></svg>',
  form: '<svg viewBox="0 0 400 260" fill="none" stroke="#171614" stroke-opacity=".55" stroke-width="1.2"><rect x="1" y="1" width="398" height="258" rx="8" fill="#fbf9f4"/><rect x="120" y="30" width="160" height="200" rx="10"/><circle cx="200" cy="66" r="14" stroke="#e4572e"/><g fill="#171614" fill-opacity=".14" stroke="none"><rect x="140" y="96" width="50" height="7" rx="3"/><rect x="140" y="136" width="56" height="7" rx="3"/></g><rect x="140" y="108" width="120" height="18" rx="4"/><rect x="140" y="148" width="120" height="18" rx="4"/><rect x="140" y="184" width="120" height="22" rx="11" fill="#171614" fill-opacity=".85" stroke="none"/><path d="M40 60h50M40 76h36M310 180h50M310 196h36" stroke-dasharray="3 4"/></svg>'
};

/* Shared render helpers */
window.coverHTML = function (p, eager) {
  if (p.wire) return '<div class="wire">' + window.WIRES[p.wire] + '<span class="chip mono nda">NDA · wireframe</span></div>';
  return '<img src="' + p.cover + '" alt="' + p.title + ' — ' + p.type + '"' + (p.coverFit === "contain" ? ' class="contain"' : "") + (eager ? "" : ' loading="lazy"') + ">";
};
window.tagsHTML = function (p) {
  return p.disciplines.map(function (d) { return '<span class="dot ' + d + '" title="' + window.DISC[d].long + '"></span>'; }).join("");
};

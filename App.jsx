import { useState, useEffect, useRef } from "react";

const BOOK_DB = [
  { id:1,  title:"The Night Circus",       author:"Erin Morgenstern",  genre:"Fantasy",          pages:387, cover:"🎪", desc:"Two young magicians compete inside a mysterious circus that only appears at night.", rating:4.6, themes:["Love & relationships","Adventure & discovery"], darkness:"mild",     pace:"savour", isMovie:false, isClassic:false },
  { id:2,  title:"Klara and the Sun",      author:"Kazuo Ishiguro",    genre:"Sci-Fi",           pages:307, cover:"☀️", desc:"An Artificial Friend observes the human world, exploring what it means to be human.", rating:4.3, themes:["Identity & belonging","Technology & society"], darkness:"mild",     pace:"savour", isMovie:false, isClassic:false },
  { id:3,  title:"The Hitchhiker's Guide to the Galaxy", author:"Douglas Adams", genre:"Humour", pages:224, cover:"🚀", desc:"An ordinary man is whisked across the universe after Earth is demolished.", rating:4.8, themes:["Adventure & discovery"], darkness:"light",    pace:"fast",   isMovie:true,  isClassic:false },
  { id:4,  title:"Normal People",          author:"Sally Rooney",      genre:"Literary Fiction", pages:273, cover:"💬", desc:"Two Irish students navigate an intense, complicated relationship across young adulthood.", rating:4.1, themes:["Love & relationships","Identity & belonging"], darkness:"moderate", pace:"medium", isMovie:true,  isClassic:false },
  { id:5,  title:"Educated",               author:"Tara Westover",     genre:"Memoir",           pages:334, cover:"📚", desc:"A woman raised in survivalist Idaho teaches herself enough to escape and earn a PhD.", rating:4.7, themes:["Family & legacy","Personal growth"], darkness:"dark",     pace:"fast",   isMovie:false, isClassic:false },
  { id:6,  title:"Project Hail Mary",      author:"Andy Weir",         genre:"Sci-Fi",           pages:476, cover:"🌌", desc:"A lone astronaut wakes with no memory, tasked with saving Earth.", rating:4.9, themes:["Adventure & discovery","Technology & society"], darkness:"light",    pace:"fast",   isMovie:false, isClassic:false },
  { id:7,  title:"The Alchemist",          author:"Paulo Coelho",      genre:"Philosophy",       pages:197, cover:"⭐", desc:"A shepherd boy travels from Spain to Egypt following a dream.", rating:4.2, themes:["Personal growth","Adventure & discovery"], darkness:"light",    pace:"savour", isMovie:false, isClassic:false },
  { id:8,  title:"Piranesi",               author:"Susanna Clarke",    genre:"Fantasy",          pages:272, cover:"🏛️", desc:"A man lives in a labyrinthine house, slowly uncovering his own past.", rating:4.5, themes:["Identity & belonging"], darkness:"mild",     pace:"savour", isMovie:false, isClassic:false },
  { id:9,  title:"Atomic Habits",          author:"James Clear",       genre:"Self-Help",        pages:320, cover:"⚡", desc:"A proven framework for building good habits and breaking bad ones.", rating:4.7, themes:["Personal growth"], darkness:"light",    pace:"medium", isMovie:false, isClassic:false },
  { id:10, title:"Anxious People",         author:"Fredrik Backman",   genre:"Fiction",          pages:341, cover:"🔑", desc:"A bank robbery gone wrong traps strangers at an apartment viewing.", rating:4.4, themes:["Love & relationships","Identity & belonging"], darkness:"mild",     pace:"fast",   isMovie:false, isClassic:false },
  { id:11, title:"Pachinko",               author:"Min Jin Lee",       genre:"Historical Fiction",pages:496, cover:"🌊", desc:"Four generations of a Korean family navigate discrimination, love, and survival in Japan.", rating:4.6, themes:["Family & legacy","Power & politics"], darkness:"dark",     pace:"savour", isMovie:true,  isClassic:false },
  { id:12, title:"The Midnight Library",   author:"Matt Haig",         genre:"Fiction",          pages:304, cover:"🌙", desc:"A library between life and death where every book is a different life.", rating:4.2, themes:["Personal growth","Loss & grief"], darkness:"moderate", pace:"medium", isMovie:false, isClassic:false },
  { id:13, title:"Dune",                   author:"Frank Herbert",     genre:"Sci-Fi",           pages:688, cover:"🏜️", desc:"A sweeping epic of politics, ecology and destiny on a desert planet.", rating:4.8, themes:["Power & politics","Adventure & discovery"], darkness:"dark",     pace:"savour", isMovie:true,  isClassic:false },
  { id:14, title:"Where the Crawdads Sing",author:"Delia Owens",       genre:"Mystery",          pages:384, cover:"🦅", desc:"A woman who raised herself in the marshes becomes a suspect in a murder case.", rating:4.5, themes:["Nature & environment","Love & relationships"], darkness:"moderate", pace:"fast",   isMovie:true,  isClassic:false },
  { id:15, title:"The Thursday Murder Club",author:"Richard Osman",    genre:"Mystery",          pages:382, cover:"🔎", desc:"Four retirees investigate cold cases — charming, witty, and clever.", rating:4.3, themes:["Morality & ethics"], darkness:"mild",     pace:"fast",   isMovie:false, isClassic:false },
  { id:16, title:"A Little Life",          author:"Hanya Yanagihara",  genre:"Literary Fiction", pages:720, cover:"🕯️", desc:"Four friends in New York — a deeply affecting portrait of trauma and survival.", rating:4.4, themes:["Loss & grief","Love & relationships"], darkness:"very dark", pace:"savour", isMovie:false, isClassic:false },
  { id:17, title:"Pride and Prejudice",    author:"Jane Austen",       genre:"Classic",          pages:432, cover:"🌹", desc:"The sharp, witty story of Elizabeth Bennet navigating love, class, and Mr Darcy.", rating:4.7, themes:["Love & relationships","Power & politics"], darkness:"light",    pace:"savour", isMovie:true,  isClassic:true },
  { id:18, title:"Sense and Sensibility",  author:"Jane Austen",       genre:"Classic",          pages:374, cover:"🎀", desc:"Two sisters navigate love and heartbreak in early 19th-century England.", rating:4.5, themes:["Love & relationships","Family & legacy"], darkness:"light",    pace:"savour", isMovie:true,  isClassic:true },
  { id:19, title:"The Old Man and the Sea",author:"Ernest Hemingway",  genre:"Classic",          pages:127, cover:"⚓", desc:"An ageing fisherman battles a giant marlin — a meditation on courage and loss.", rating:4.3, themes:["Loss & grief","Personal growth"], darkness:"moderate", pace:"savour", isMovie:false, isClassic:true },
  { id:20, title:"A Farewell to Arms",     author:"Ernest Hemingway",  genre:"Classic",          pages:332, cover:"🪖", desc:"A love story set against the brutality of World War I Italy.", rating:4.2, themes:["Love & relationships","Loss & grief"], darkness:"dark",     pace:"medium", isMovie:false, isClassic:true },
  { id:21, title:"Moby Dick",              author:"Herman Melville",   genre:"Classic",          pages:635, cover:"🐋", desc:"Captain Ahab's obsessive hunt for the white whale.", rating:4.1, themes:["Adventure & discovery","Morality & ethics"], darkness:"dark",     pace:"savour", isMovie:false, isClassic:true },
  { id:22, title:"Anna Karenina",          author:"Leo Tolstoy",       genre:"Classic",          pages:864, cover:"🚂", desc:"A married aristocrat falls into a passionate, doomed affair in 19th-century Russia.", rating:4.6, themes:["Love & relationships","Power & politics"], darkness:"dark",     pace:"savour", isMovie:true,  isClassic:true },
  { id:23, title:"Crime and Punishment",   author:"Fyodor Dostoevsky", genre:"Classic",          pages:551, cover:"⚖️", desc:"A student commits murder and is consumed by guilt.", rating:4.5, themes:["Morality & ethics","Identity & belonging"], darkness:"very dark", pace:"savour", isMovie:false, isClassic:true },
  { id:24, title:"Jane Eyre",              author:"Charlotte Brontë",  genre:"Classic",          pages:507, cover:"🕰️", desc:"An orphaned governess finds love in the brooding Rochester.", rating:4.6, themes:["Love & relationships","Identity & belonging"], darkness:"moderate", pace:"savour", isMovie:true,  isClassic:true },
  { id:25, title:"Great Expectations",     author:"Charles Dickens",   genre:"Classic",          pages:544, cover:"🎩", desc:"Pip rises from poverty in Victorian England, but money changes everything.", rating:4.3, themes:["Personal growth","Family & legacy"], darkness:"moderate", pace:"medium", isMovie:false, isClassic:true },
  { id:26, title:"1984",                   author:"George Orwell",     genre:"Classic",          pages:328, cover:"👁️", desc:"Winston Smith lives under a totalitarian regime that controls even thought.", rating:4.7, themes:["Power & politics","Technology & society"], darkness:"very dark", pace:"fast",   isMovie:false, isClassic:true },
  { id:27, title:"The Hunger Games",       author:"Suzanne Collins",   genre:"Sci-Fi",           pages:374, cover:"🏹", desc:"A girl volunteers for a deadly televised competition to protect her sister.", rating:4.5, themes:["Power & politics","Adventure & discovery"], darkness:"dark",     pace:"fast",   isMovie:true,  isClassic:false },
  { id:28, title:"Gone Girl",              author:"Gillian Flynn",     genre:"Mystery",          pages:422, cover:"🔪", desc:"A woman disappears on her anniversary. Her husband is the prime suspect.", rating:4.4, themes:["Love & relationships","Morality & ethics"], darkness:"very dark", pace:"fast",   isMovie:true,  isClassic:false },
  { id:29, title:"The Fault in Our Stars", author:"John Green",        genre:"Fiction",          pages:313, cover:"💫", desc:"Two teens with cancer fall in love — devastating, funny, and deeply human.", rating:4.5, themes:["Love & relationships","Loss & grief"], darkness:"moderate", pace:"fast",   isMovie:true,  isClassic:false },
  { id:30, title:"The Martian",            author:"Andy Weir",         genre:"Sci-Fi",           pages:369, cover:"🔴", desc:"An astronaut is stranded on Mars and must science his way home.", rating:4.7, themes:["Adventure & discovery","Personal growth"], darkness:"mild",     pace:"fast",   isMovie:true,  isClassic:false },
  { id:31, title:"The Girl with the Dragon Tattoo", author:"Stieg Larsson", genre:"Mystery",   pages:672, cover:"🐉", desc:"A journalist and hacker investigate a decades-old disappearance.", rating:4.5, themes:["Morality & ethics","Power & politics"], darkness:"very dark", pace:"fast",   isMovie:true,  isClassic:false },
];

const BOOK_REGISTER = [
  "1984 — George Orwell","A Farewell to Arms — Ernest Hemingway","A Little Life — Hanya Yanagihara",
  "A Man Called Ove — Fredrik Backman","Anna Karenina — Leo Tolstoy","Anxious People — Fredrik Backman",
  "Atomic Habits — James Clear","Beloved — Toni Morrison","Big Little Lies — Liane Moriarty",
  "Brave New World — Aldous Huxley","Crime and Punishment — Fyodor Dostoevsky",
  "Daisy Jones and The Six — Taylor Jenkins Reid","Dune — Frank Herbert","Educated — Tara Westover",
  "Emma — Jane Austen","Gone Girl — Gillian Flynn","Good Omens — Terry Pratchett & Neil Gaiman",
  "Great Expectations — Charles Dickens","Harry Potter — J.K. Rowling","His Dark Materials — Philip Pullman",
  "It Ends with Us — Colleen Hoover","Jane Eyre — Charlotte Brontë","Klara and the Sun — Kazuo Ishiguro",
  "Lessons in Chemistry — Bonnie Garmus","Lord of the Flies — William Golding","Moby Dick — Herman Melville",
  "Normal People — Sally Rooney","Norwegian Wood — Haruki Murakami","Of Mice and Men — John Steinbeck",
  "One Hundred Years of Solitude — Gabriel García Márquez","Pachinko — Min Jin Lee",
  "Piranesi — Susanna Clarke","Pride and Prejudice — Jane Austen","Project Hail Mary — Andy Weir",
  "Rebecca — Daphne du Maurier","Sapiens — Yuval Noah Harari","Sense and Sensibility — Jane Austen",
  "Stoner — John Williams","The Alchemist — Paulo Coelho","The Catcher in the Rye — J.D. Salinger",
  "The Count of Monte Cristo — Alexandre Dumas","The Fault in Our Stars — John Green",
  "The Girl with the Dragon Tattoo — Stieg Larsson","The Great Gatsby — F. Scott Fitzgerald",
  "The Handmaid's Tale — Margaret Atwood","The Hitchhiker's Guide to the Galaxy — Douglas Adams",
  "The Hunger Games — Suzanne Collins","The Kite Runner — Khaled Hosseini","The Martian — Andy Weir",
  "The Midnight Library — Matt Haig","The Night Circus — Erin Morgenstern",
  "The Old Man and the Sea — Ernest Hemingway","The Road — Cormac McCarthy",
  "The Secret History — Donna Tartt","The Thursday Murder Club — Richard Osman",
  "The Vanishing Half — Brit Bennett","To Kill a Mockingbird — Harper Lee",
  "Verity — Colleen Hoover","War and Peace — Leo Tolstoy",
  "Where the Crawdads Sing — Delia Owens","Wuthering Heights — Emily Brontë",
  "Jane Austen","Ernest Hemingway","Herman Melville","Leo Tolstoy","Fyodor Dostoevsky",
  "George Orwell","Agatha Christie","Haruki Murakami","Gabriel García Márquez",
  "Toni Morrison","Colleen Hoover","Sally Rooney","Fredrik Backman",
];

const QUIZ_SECTIONS = [
  { section:"ABOUT YOU", questions:[
    { id:"age", type:"single", q:"How old are you?", sub:"Helps us match books to your life stage and experience", options:["Under 16","16 – 20","21 – 29","30 – 39","40 – 54","55 – 69","70 or older","Prefer not to say"] },
    { id:"genres", type:"multiselect", q:"Which genres speak to you?", sub:"Select all that feel right — or pick 'I don't know' if you're exploring", options:["Fantasy & Magic","Literary Fiction","Sci-Fi","Mystery & Thriller","Historical Fiction","Romance","Non-Fiction","Horror","Humour","Self-Help","Memoir","Philosophy","I don't know — surprise me"] },
    { id:"fiction", type:"single", q:"Fiction or non-fiction?", options:["Pure fiction — I want to escape","Mostly fiction, occasionally real","A healthy mix","Mostly non-fiction","Real stories only","I don't know yet"] },
    { id:"era", type:"single", q:"How old should your books be?", options:["Brand new — last 2 years","Last 10 years","I love classics too","Old classics only (pre-1950)","Age doesn't matter"] },
    { id:"loved", type:"booksearch", q:"A book or author you've loved", sub:"Search our register — this helps us understand your taste" },
  ]},
  { section:"READING HABITS", questions:[
    { id:"length", type:"single", q:"Ideal book length?", options:["Short — under 200 pages","Medium — 200 to 350","Anything goes","Long — 350 to 500","Epic — 500+","I don't know"] },
    { id:"series", type:"single", q:"Series or standalone?", options:["Standalone — I like closure","Love a good series","Either works","I don't know"] },
    { id:"pace", type:"single", q:"How should the story move?", options:["Fast & gripping","Slow & immersive","Steady pace","Depends on the book"] },
    { id:"format", type:"single", q:"How do you prefer to read?", options:["Physical book","Ebook","Audiobook","Mix of all three","Just getting started"] },
    { id:"frequency", type:"single", q:"How often do you read?", options:["Every day","A few times a week","Weekends","Whenever I can","Trying to read more"] },
  ]},
  { section:"WHAT MOVES YOU", questions:[
    { id:"themes", type:"multiselect", q:"Which themes draw you in?", sub:"Pick as many as feel true", options:["Love & relationships","Identity & belonging","Power & politics","Family & legacy","Adventure & discovery","Loss & grief","Morality & ethics","Nature & environment","Technology & society","Personal growth","No strong preferences"] },
    { id:"driver", type:"single", q:"What makes a great book for you?", options:["Deep, complex characters","A plot full of twists","Beautiful writing","Big ideas that change how I see the world","All of the above","Not sure yet"] },
    { id:"romance", type:"single", q:"Romance in books?", options:["Essential — I live for it","A little is nice","Background only","None please"] },
    { id:"endings", type:"single", q:"What ending do you need?", options:["Happy endings","Bittersweet","Ambiguous is fine","Whatever fits"] },
    { id:"movie", type:"single", q:"Books that became famous films?", sub:"Some readers like knowing there's a film — it can help motivate finishing the book", options:["Yes — I love that connection","Nice to have","Doesn't matter","I prefer no film"] },
    { id:"classics", type:"single", q:"Are you curious about classic literature?", sub:"Think Jane Austen, Hemingway, Tolstoy — timeless but sometimes unfamiliar", options:["Yes — I'd love a gateway into classics","Open to one classic alongside modern books","Only if it's short and accessible","Modern books only"] },
  ]},
  { section:"COMFORT ZONE", questions:[
    { id:"darkness", type:"darkness", q:"How dark can your book get?", sub:"Be honest — this helps us avoid content that might upset you" },
    { id:"avoid", type:"multiselect", q:"Anything to avoid?", sub:"We'll filter these out completely", options:["Graphic murder or violence","Sexual assault or abuse","Explicit sexual content","Child harm","Animal harm","Torture or war atrocities","Suicide or self-harm","Heavy political messaging","Cliffhanger endings","Love triangles","Supernatural elements"] },
    { id:"feeling", type:"single", q:"What do you want from your next read?", sub:"Trust your gut", options:["Escapism — take me somewhere else","Inspiration — motivate me","Challenge — make me think","Comfort — make me feel safe","Adventure — thrill me","Wonder — amaze me","Truth — reflect my real life"] },
  ]},
];

const DARKNESS_LEVELS = [
  { key:"light",     label:"Light",     desc:"No disturbing content. Feel-good stories, cosy mysteries, uplifting memoirs.", example:"e.g. The Thursday Murder Club, The Alchemist" },
  { key:"mild",      label:"Mild",      desc:"Some conflict or emotional tension — nothing graphic or traumatic.", example:"e.g. Normal People, The Night Circus" },
  { key:"moderate",  label:"Moderate",  desc:"Themes like death, betrayal, addiction or war — handled thoughtfully.", example:"e.g. The Kite Runner, The Midnight Library" },
  { key:"dark",      label:"Dark",      desc:"Graphic violence, murder, abuse, trauma — explored in depth.", example:"e.g. Gone Girl, Educated, Dune" },
  { key:"very dark", label:"Very Dark", desc:"Explicit content: sexual violence, torture, extreme trauma — unflinching.", example:"e.g. A Little Life, Crime and Punishment, The Girl with the Dragon Tattoo" },
];

const BOOK_CLUB_TIPS = [
  { icon:"🎯", title:"Reading Tips — Start Here", desc:"Before diving in, read the back cover slowly. Notice the title and what it might mean. As you read, pause every few chapters and ask: what's actually happening? Not just in the plot — but to the characters inside.", highlight:true },
  { icon:"💡", title:"What to look for", desc:"Great books work on two levels: the story on the surface, and the meaning underneath. Look for patterns — does a symbol keep appearing? Does a character keep making the same mistake? Ask me to help you spot these." },
  { icon:"🙋", title:"Your Own Reactions", desc:"Your gut feeling matters. If something upsets you, bores you, or excites you — that's data. Share it with me. We'll work out why the book made you feel that way. Your reaction is always valid." },
  { icon:"🔍", title:"Dig Into Themes", desc:"Every book has something it's really about beneath the plot. A story about war might actually be about guilt. A romance might really be about identity. Ask me 'what is this book really about?' — I'll unpack it with you." },
  { icon:"🙋‍♀️", title:"Ask About Characters", desc:"Confused by a character's choices? Ask me why they did what they did. I'll explain their background, psychology, and arc without spoilers — unless you want them." },
  { icon:"💬", title:"Start a Discussion", desc:"Share your thoughts, theories, or questions. There are no wrong answers in a book club. Ask 'why did it end that way?' or 'was the main character likeable?' — I'll engage with everything." },
  { icon:"📚", title:"Historical Context", desc:"Many books are richer with context. Ask me about the era, the author's life, or the real events behind the story. It often transforms how you read the next chapter." },
];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Jost:ital,wght@0,200;0,300;0,400;0,500;1,200;1,300&display=swap');
:root{
  --bg:#E8F4EA;
  --bg2:#D2E7D6;
  --bg3:#F0F8F1;
  --white:#F5FAF6;
  --card:#F5FAF6;
  --ink:#0D2410;
  --ink2:#1A3D1E;
  --mid:#3A6640;
  --muted:#7AA880;
  --amber:#2E6B36;
  --amber-light:#B8D8BE;
  --line:#C8E1CC;
  --ld:#B8D8BE;
  --warm-dark:#1A3D1E;
}
*{box-sizing:border-box;margin:0;padding:0;-webkit-font-smoothing:antialiased;}
html,body{background:var(--bg);}
.root{font-family:'Jost',sans-serif;color:var(--ink);min-height:100vh;background:var(--bg);max-width:430px;margin:0 auto;}

/* ── LANDING ─────────────────────────── */
.landing{min-height:100vh;background:var(--bg);display:flex;flex-direction:column;overflow:hidden;position:relative;}

.landing-grid{position:absolute;inset:0;background-image:repeating-linear-gradient(0deg,transparent,transparent 59px,rgba(46,107,54,.06) 59px,rgba(46,107,54,.06) 60px),repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(46,107,54,.06) 59px,rgba(46,107,54,.06) 60px);pointer-events:none;}

.landing-top{padding:52px 28px 0;position:relative;z-index:2;display:flex;align-items:center;justify-content:space-between;}
.landing-mark{font-family:'Bebas Neue',sans-serif;font-size:18px;letter-spacing:4px;color:var(--muted);}
.landing-signin-link{background:none;border:none;font-family:'Jost',sans-serif;font-size:12px;font-weight:400;letter-spacing:1.5px;text-transform:uppercase;color:var(--mid);cursor:pointer;text-decoration:underline;text-underline-offset:3px;padding:0;}
.landing-signin-link:hover{color:var(--ink2);}

.landing-hero{padding:48px 28px 0;flex:1;position:relative;z-index:2;}
.landing-pill{display:inline-block;border:1px solid var(--ld);padding:6px 14px;font-size:10px;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;color:var(--mid);margin-bottom:22px;}
.landing-headline{font-family:'Bebas Neue',sans-serif;font-size:68px;line-height:.9;letter-spacing:1px;color:var(--ink2);margin-bottom:16px;}
.landing-headline span{color:var(--amber-light);}
.landing-subline{font-size:14px;font-weight:300;color:var(--mid);line-height:1.75;max-width:300px;margin-bottom:36px;}

.landing-features{display:flex;flex-direction:column;gap:0;margin-bottom:36px;}
.landing-feature{display:flex;align-items:flex-start;gap:14px;padding:14px 0;border-top:1px solid var(--line);}
.landing-feature:last-child{border-bottom:1px solid var(--line);}
.lf-num{font-family:'Bebas Neue',sans-serif;font-size:11px;letter-spacing:1px;color:var(--mid);width:18px;flex-shrink:0;margin-top:2px;}
.lf-text{}
.lf-title{font-size:13px;font-weight:600;color:var(--ink2);margin-bottom:2px;letter-spacing:.2px;}
.lf-desc{font-size:12px;font-weight:300;color:var(--mid);line-height:1.55;}

.landing-cta-area{padding:0 28px 52px;position:relative;z-index:2;}
.landing-cta-btn{width:100%;background:var(--ink2);border:none;border-radius:12px;padding:18px;font-family:'Jost',sans-serif;font-size:12px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:var(--bg3);cursor:pointer;transition:opacity .15s;margin-bottom:14px;box-shadow:0 4px 20px rgba(13,36,16,.22);}
.landing-cta-btn:hover{opacity:.85;}
.landing-sub-row{text-align:center;font-size:12px;font-weight:300;color:var(--muted);}

/* ── SIGN IN SHEET ─────────────────── */
.sheet-overlay{position:fixed;inset:0;background:rgba(13,36,16,.55);z-index:300;display:flex;align-items:flex-end;}
.sheet{background:var(--card);width:100%;max-width:430px;margin:0 auto;padding:32px 28px 52px;border-radius:20px 20px 0 0;box-shadow:0 -8px 40px rgba(13,36,16,.15);}
.sheet-handle{width:36px;height:4px;background:var(--ld);border-radius:2px;margin:0 auto 28px;}
.ls-label{font-size:10px;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:var(--muted);margin-bottom:6px;}
.ls-title{font-family:'Bebas Neue',sans-serif;font-size:32px;letter-spacing:1px;color:var(--ink);margin-bottom:24px;line-height:1;}
.srow{display:flex;gap:10px;margin-bottom:14px;}
.sbtn{flex:1;background:var(--white);border:1.5px solid var(--ld);border-radius:10px;padding:13px 10px;font-family:'Jost',sans-serif;font-size:12px;font-weight:500;letter-spacing:1px;text-transform:uppercase;color:var(--ink);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:all .15s;}
.sbtn:hover{background:var(--ink2);color:var(--bg3);}
.or-row{display:flex;align-items:center;gap:14px;margin:14px 0;}
.or-row::before,.or-row::after{content:'';flex:1;height:1px;background:var(--line);}
.or-row span{font-size:10px;color:var(--muted);letter-spacing:2px;text-transform:uppercase;}
.field{width:100%;background:var(--bg3);border:1.5px solid var(--ld);border-radius:10px;padding:13px 16px;margin-bottom:10px;font-family:'Jost',sans-serif;font-size:14px;font-weight:300;color:var(--ink);outline:none;transition:border-color .2s;}
.field:focus{border-color:var(--mid);}
.field::placeholder{color:var(--muted);}
.primary-btn{width:100%;background:var(--ink2);color:var(--bg3);border:none;border-radius:10px;padding:15px;font-family:'Jost',sans-serif;font-size:11px;font-weight:500;letter-spacing:3px;text-transform:uppercase;cursor:pointer;transition:opacity .15s;margin-top:4px;}
.primary-btn:hover{opacity:.8;}
.sheet-foot{text-align:center;margin-top:16px;font-size:13px;font-weight:300;color:var(--muted);}
.lnk{background:none;border:none;color:var(--amber);font-family:'Jost',sans-serif;font-size:13px;cursor:pointer;text-decoration:underline;text-underline-offset:3px;}
.sheet-close{position:absolute;top:20px;right:24px;background:none;border:none;font-size:18px;color:var(--muted);cursor:pointer;}

/* ── HOME ─────────────────────────── */
.home{background:var(--bg);min-height:100vh;padding-bottom:90px;}
.home-header{padding:48px 22px 0;display:flex;align-items:flex-start;justify-content:space-between;}
.profile-cluster{display:flex;align-items:center;gap:12px;}
.profile-photo{width:48px;height:48px;border-radius:50%;background:var(--ink2);box-shadow:0 2px 10px rgba(13,36,16,.15);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:500;color:var(--white);font-family:'Bebas Neue',sans-serif;letter-spacing:1px;overflow:hidden;flex-shrink:0;border:2px solid var(--ld);cursor:pointer;}
.profile-photo img{width:100%;height:100%;object-fit:cover;}
.profile-hello{font-size:10px;font-weight:400;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-bottom:1px;}
.profile-name-s{font-family:'Bebas Neue',sans-serif;font-size:20px;letter-spacing:1.5px;color:var(--ink);line-height:1;}
.home-wm{font-family:'Bebas Neue',sans-serif;font-size:16px;letter-spacing:3px;color:var(--muted);}

.home-hero{padding:36px 22px 0;}
.hero-eyebrow{font-size:10px;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:var(--mid);margin-bottom:10px;}
.hero-headline{font-family:'Bebas Neue',sans-serif;font-size:56px;line-height:.92;letter-spacing:1px;color:var(--ink);margin-bottom:16px;}
.hero-sub{font-size:13px;font-weight:200;color:var(--mid);line-height:1.75;margin-bottom:28px;max-width:290px;}

.btn-row{display:flex;gap:8px;flex-wrap:wrap;}
.filled-btn{background:var(--ink2);border:none;border-radius:8px;padding:12px 18px;font-family:'Jost',sans-serif;font-size:10px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;color:var(--bg3);cursor:pointer;transition:opacity .15s;white-space:nowrap;box-shadow:0 2px 8px rgba(13,36,16,.2);}
.filled-btn:hover{opacity:.75;}
.ghost-btn{background:var(--card);border:1.5px solid var(--ld);border-radius:8px;padding:11px 16px;font-family:'Jost',sans-serif;font-size:10px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:var(--ink2);cursor:pointer;transition:all .15s;white-space:nowrap;}
.ghost-btn:hover{background:var(--ink2);color:var(--bg3);border-color:var(--ink2);}

.home-divider{margin:28px 22px;height:1px;background:var(--line);}

.home-quick{padding:0 22px;}
.home-quick-label{font-size:10px;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:var(--muted);margin-bottom:14px;}
.quick-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.quick-card{background:var(--white);border:1px solid var(--line);padding:18px 16px;cursor:pointer;transition:all .15s;}
.quick-card:hover{border-color:var(--ink);}
.qc-icon{font-size:22px;margin-bottom:10px;display:block;}
.qc-title{font-family:'Bebas Neue',sans-serif;font-size:16px;letter-spacing:.5px;color:var(--ink);margin-bottom:3px;line-height:1;}
.qc-sub{font-size:11px;font-weight:300;color:var(--muted);line-height:1.4;}
.qc-empty{color:var(--muted);font-size:11px;font-weight:300;margin-top:8px;font-style:italic;}

/* ── TAB BAR ─────────────────────── */
.tab-bar{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;background:rgba(253,250,240,.95);backdrop-filter:blur(12px);border-top:1px solid var(--line);box-shadow:0 -2px 16px rgba(13,36,16,.06);display:flex;padding:10px 0 22px;z-index:200;}
.tab-btn{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;background:none;border:none;cursor:pointer;padding:4px;}
.tab-icon-text{font-size:18px;line-height:1;}
.tab-label-text{font-size:9px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);transition:color .15s;}
.tab-btn.on .tab-label-text{color:var(--amber);}
.tab-btn .tab-icon-text{opacity:.3;}
.tab-btn.on .tab-icon-text{opacity:1;}

/* ── PAGES ───────────────────────── */
.page{background:var(--bg);min-height:100vh;padding-bottom:100px;}
.page-header{padding:52px 22px 20px;border-bottom:1px solid var(--line);}
.page-eyebrow{font-size:10px;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:var(--mid);margin-bottom:6px;}
.page-title{font-family:'Bebas Neue',sans-serif;font-size:44px;letter-spacing:1px;color:var(--ink);line-height:1;}
.page-body{padding:0 22px;}

/* ── LIBRARY — Journal card style ──────────────────────── */
.search-bar{margin:16px 16px 0;position:relative;}
.search-field{width:100%;background:var(--card);border:none;border-radius:12px;padding:12px 16px 12px 40px;box-shadow:0 1px 6px rgba(13,36,16,.08);font-family:'Jost',sans-serif;font-size:14px;font-weight:300;color:var(--ink);outline:none;transition:box-shadow .2s;}
.search-field:focus{box-shadow:0 2px 12px rgba(13,36,16,.15);border:1.5px solid var(--mid);}
.search-field::placeholder{color:var(--muted);}
.search-icon-s{position:absolute;left:28px;top:50%;transform:translateY(-50%);color:var(--muted);font-size:14px;}
.genre-scroll{display:flex;overflow-x:auto;padding:14px 16px 0;scrollbar-width:none;border-bottom:1px solid var(--line);}
.genre-scroll::-webkit-scrollbar{display:none;}
.genre-pill{background:transparent;border:none;padding:10px 16px;font-family:'Jost',sans-serif;font-size:11px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:var(--muted);cursor:pointer;white-space:nowrap;flex-shrink:0;border-bottom:2px solid transparent;transition:all .15s;}
.genre-pill.on{color:var(--ink2);border-bottom-color:var(--mid);}

/* Journal-style book cards */
.book-cards-list{padding:14px 16px;display:flex;flex-direction:column;gap:10px;}
.bcard{background:var(--card);border-radius:16px;padding:16px;box-shadow:0 1px 8px rgba(13,36,16,.07);display:flex;align-items:center;gap:14px;cursor:pointer;transition:box-shadow .2s;position:relative;}
.bcard:hover{box-shadow:0 4px 16px rgba(13,36,16,.12);}
.bcard-rank{position:absolute;top:12px;right:14px;font-family:'Bebas Neue',sans-serif;font-size:22px;color:var(--amber-light);letter-spacing:1px;line-height:1;}
.bcard-cover{width:56px;height:72px;background:var(--ink2);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:26px;flex-shrink:0;box-shadow:2px 3px 8px rgba(13,36,16,.18);}
.bcard-body{flex:1;min-width:0;padding-right:28px;}
.bcard-genre{font-size:9px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--mid);margin-bottom:4px;}
.bcard-title{font-size:16px;font-weight:600;color:var(--ink);line-height:1.25;margin-bottom:2px;}
.bcard-author{font-size:13px;font-weight:300;font-style:italic;color:var(--mid);margin-bottom:7px;}
.bcard-footer{display:flex;align-items:center;justify-content:space-between;}
.bcard-stars{font-size:12px;color:var(--mid);}
.bcard-meta{display:flex;gap:6px;}
.bcard-badge{font-size:10px;font-weight:500;padding:3px 8px;border-radius:20px;background:var(--bg2);color:var(--mid);}
.bcard-badge.film{background:var(--ink2);color:var(--bg3);}
.bcard-expanded{background:var(--card);border-radius:0 0 16px 16px;margin:-6px 0 0;padding:0 16px 16px 86px;box-shadow:0 4px 16px rgba(13,36,16,.1);}
.bcard-desc{font-size:13px;font-weight:300;color:var(--mid);line-height:1.65;margin-bottom:12px;padding-top:10px;border-top:1px solid var(--line);}

/* ── NOTES FIELD (Book Club) ────────── */
.notes-section-unused{display:none;}
.notes-intro{font-size:12px;font-weight:300;color:var(--mid);margin-bottom:10px;line-height:1.5;}
.notes-ta{width:100%;background:var(--card);border:1.5px solid var(--line);border-radius:14px;padding:14px 16px;font-family:'Jost',sans-serif;font-size:14px;font-weight:300;color:var(--ink);resize:none;outline:none;min-height:110px;transition:border-color .2s;box-shadow:0 1px 6px rgba(13,36,16,.05);line-height:1.6;}
.notes-ta:focus{border-color:var(--mid);}
.notes-ta::placeholder{color:var(--muted);}
.notes-save-row{display:flex;justify-content:space-between;align-items:center;margin-top:8px;}
.notes-saved-label{font-size:11px;color:var(--mid);font-weight:600;opacity:0;transition:opacity .4s;}
.notes-saved-label.show{opacity:1;}
.notes-save-btn{background:var(--ink2);color:var(--bg3);border:none;border-radius:8px;padding:8px 16px;font-family:'Jost',sans-serif;font-size:10px;font-weight:600;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:opacity .15s;}
.notes-save-btn:hover{opacity:.8;}

/* ── QUIZ ─────────────────────────── */
.quiz-bg{background:var(--bg);min-height:100vh;padding-bottom:100px;}
.quiz-head{padding:52px 22px 24px;border-bottom:1px solid var(--line);}
.quiz-head-eyebrow{font-size:10px;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:var(--amber);margin-bottom:6px;opacity:.8;}
.quiz-head-title{font-family:'Bebas Neue',sans-serif;font-size:44px;letter-spacing:1px;color:var(--ink2);line-height:1;}
.quiz-body{padding:24px 22px 0;}
.quiz-start{border:1px solid var(--ld);border-radius:14px;padding:32px 24px;background:var(--card);box-shadow:0 2px 14px rgba(13,36,16,.08);}
.quiz-start-title{font-family:'Bebas Neue',sans-serif;font-size:32px;letter-spacing:1px;color:var(--ink2);margin-bottom:10px;}
.quiz-start-sub{font-size:13px;font-weight:300;color:var(--mid);line-height:1.7;margin-bottom:24px;}
.sections-row{display:flex;flex-direction:column;gap:8px;margin-bottom:28px;}
.section-tag{font-size:10px;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;color:var(--mid);display:flex;align-items:center;gap:8px;}
.section-tag::before{content:'';width:20px;height:1px;background:var(--ld);}
.white-btn{width:100%;background:var(--ink2);border:none;border-radius:10px;padding:16px;font-family:'Jost',sans-serif;font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:var(--bg3);cursor:pointer;transition:opacity .15s;}
.white-btn:hover{opacity:.85;}
.qcard{border:1px solid var(--ld);border-radius:14px;padding:28px 22px;background:var(--card);box-shadow:0 2px 14px rgba(13,36,16,.08);}
.q-progress{height:2px;background:var(--line);margin-bottom:28px;position:relative;overflow:hidden;border-radius:1px;}
.q-progress-fill{position:absolute;top:0;left:0;height:100%;background:var(--mid);transition:width .4s ease;border-radius:1px;}
.q-section-tag{font-size:10px;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;color:var(--mid);margin-bottom:20px;}
.q-counter{font-family:'Bebas Neue',sans-serif;font-size:13px;letter-spacing:1px;color:var(--muted);margin-bottom:8px;}
.q-question{font-family:'Bebas Neue',sans-serif;font-size:28px;letter-spacing:.5px;color:var(--ink2);line-height:1.2;margin-bottom:6px;}
.q-sub{font-size:12px;font-weight:300;color:var(--mid);margin-bottom:22px;letter-spacing:.3px;line-height:1.6;}
.q-opts{display:flex;flex-direction:column;gap:0;}
.q-opt{background:transparent;border:none;border-bottom:1px solid var(--line);padding:14px 0;font-family:'Jost',sans-serif;font-size:14px;font-weight:300;color:var(--mid);cursor:pointer;text-align:left;display:flex;align-items:center;justify-content:space-between;transition:all .15s;}
.q-opt:first-child{border-top:1px solid var(--line);}
.q-opt:hover{color:var(--ink2);}
.q-opt.sel{color:var(--ink2);font-weight:500;background:var(--bg2);border-radius:8px;padding:14px 12px;margin:2px 0;border-left:3px solid var(--mid);}
.q-opt.sel::after{content:"✓";color:var(--mid);}
.q-multi-hint{font-size:10px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:var(--mid);margin-bottom:16px;}
.q-nav{display:flex;justify-content:space-between;align-items:center;margin-top:24px;}
.back-btn{background:none;border:none;font-family:'Jost',sans-serif;font-size:11px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:var(--muted);cursor:pointer;display:flex;align-items:center;gap:5px;}
.back-btn:hover{color:var(--ink2);}
.back-btn:disabled{opacity:.2;cursor:not-allowed;}
.text-btn{background:none;border:none;font-family:'Jost',sans-serif;font-size:11px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:var(--muted);cursor:pointer;}
.text-btn:hover{color:var(--ink2);}
.q-sec-row{display:flex;gap:6px;margin-bottom:22px;}
.q-sec-pip{flex:1;height:2px;background:var(--line);border-radius:1px;transition:background .3s;}
.q-sec-pip.done{background:var(--mid);}
.q-sec-pip.act{background:var(--amber-light);}
.book-search-wrap{position:relative;}
.book-search-field{width:100%;background:var(--bg3);border:1.5px solid var(--ld);border-radius:10px;padding:14px 16px;font-family:'Jost',sans-serif;font-size:15px;font-weight:300;color:var(--white);outline:none;transition:border-color .2s;}
.book-search-field:focus{border-color:var(--mid);}
.book-search-field::placeholder{color:var(--muted);}
.book-search-hint{font-size:11px;color:var(--muted);margin-top:8px;font-weight:300;}
.book-dropdown{position:absolute;top:100%;left:0;right:0;background:var(--card);border:1.5px solid var(--ld);border-top:none;border-radius:0 0 10px 10px;max-height:220px;overflow-y:auto;z-index:50;}
.book-dd-item{padding:12px 16px;font-family:'Jost',sans-serif;font-size:13px;font-weight:300;color:var(--mid);cursor:pointer;border-bottom:1px solid var(--line);transition:background .15s;}
.book-dd-item:hover{background:var(--bg2);color:var(--ink2);}
.book-selected-tag{display:inline-flex;align-items:center;gap:8px;background:var(--bg2);border:1.5px solid var(--ld);border-radius:8px;padding:8px 14px;margin-top:12px;font-size:13px;font-weight:300;color:var(--ink2);}
.book-selected-clear{background:none;border:none;color:var(--muted);cursor:pointer;font-size:14px;}
.darkness-opts{display:flex;flex-direction:column;gap:0;}
.dark-opt{background:transparent;border:none;border-bottom:1px solid var(--line);padding:16px 0;cursor:pointer;text-align:left;width:100%;}
.dark-opt:first-child{border-top:1px solid var(--line);}
.dark-opt-label{font-family:'Bebas Neue',sans-serif;font-size:18px;letter-spacing:.5px;color:var(--mid);transition:color .15s;display:block;margin-bottom:4px;}
.dark-opt.sel .dark-opt-label,.dark-opt:hover .dark-opt-label{color:var(--ink2);}
.dark-opt-desc{font-size:12px;font-weight:300;color:var(--muted);line-height:1.5;}
.dark-opt-example{font-size:11px;font-style:italic;color:var(--muted);margin-top:3px;opacity:.75;}
.dark-opt.sel .dark-opt-desc{color:var(--mid);}

/* ANALYSING */
.analysing-screen{padding:48px 22px;}
.analysing-title{font-family:'Bebas Neue',sans-serif;font-size:13px;letter-spacing:4px;color:var(--mid);margin-bottom:36px;}
.analysing-steps{display:flex;flex-direction:column;gap:0;border:1px solid var(--ld);border-radius:12px;overflow:hidden;background:var(--card);box-shadow:0 2px 14px rgba(13,36,16,.08);}
.a-step{display:flex;align-items:flex-start;gap:14px;padding:16px 18px;border-bottom:1px solid var(--line);}
.a-step:last-child{border-bottom:none;}
.a-step-num{font-family:'Bebas Neue',sans-serif;font-size:12px;letter-spacing:1px;color:var(--muted);flex-shrink:0;width:20px;}
.a-step-text{font-size:13px;font-weight:300;color:var(--muted);line-height:1.4;}
.a-step.active .a-step-text{color:var(--ink2);}
.a-step.active .a-step-num{color:var(--mid);}
.dots-inline{display:inline-flex;gap:3px;margin-left:4px;vertical-align:middle;}
.dots-inline span{width:4px;height:4px;border-radius:50%;background:var(--mid);animation:bop 1.1s infinite;display:inline-block;}
.dots-inline span:nth-child(2){animation-delay:.2s;}
.dots-inline span:nth-child(3){animation-delay:.4s;}

/* MATCHES — card layout */
.results-dark-head{background:var(--ink2);padding:52px 22px 28px;}
.results-eyebrow{font-size:10px;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:rgba(255,200,100,.4);margin-bottom:6px;}
.results-title{font-family:'Bebas Neue',sans-serif;font-size:48px;letter-spacing:1px;color:var(--white);line-height:1;margin-bottom:4px;}
.results-sub{font-size:13px;font-weight:200;color:rgba(255,255,255,.38);}

/* horizontal scroll row */
.match-cards-scroll{display:flex;overflow-x:auto;gap:14px;padding:36px 22px 28px;scroll-snap-type:x mandatory;scrollbar-width:none;background:var(--bg);border-bottom:1px solid var(--line);}
.match-cards-scroll::-webkit-scrollbar{display:none;}

/* individual card */
.mcard{flex-shrink:0;width:200px;background:var(--card);border:1.5px solid var(--line);border-radius:16px;scroll-snap-align:start;display:flex;flex-direction:column;align-items:center;padding:0 0 18px;position:relative;cursor:pointer;transition:border-color .2s,box-shadow .2s;box-shadow:0 2px 12px rgba(13,36,16,.07);}
.mcard:hover,.mcard.active{border-color:var(--amber);box-shadow:0 6px 24px rgba(13,36,16,.12);}
.mcard.rank1{width:220px;border-color:var(--ink2);border-width:2px;box-shadow:0 4px 20px rgba(13,36,16,.15);}

/* rank badge */
.mcard-badge{position:absolute;top:-20px;left:50%;transform:translateX(-50%);width:42px;height:42px;border-radius:50%;background:var(--ink2);display:flex;align-items:center;justify-content:center;font-family:'Bebas Neue',sans-serif;font-size:20px;color:var(--bg2);letter-spacing:0;border:3px solid var(--bg);}
.mcard.rank1 .mcard-badge{width:50px;height:50px;font-size:26px;top:-25px;background:var(--ink2);color:var(--bg3);}
.mcard.rank2 .mcard-badge,.mcard.rank3 .mcard-badge{background:var(--mid);color:var(--white);}

/* cover circle */
.mcard-cover-wrap{width:100%;padding:36px 0 14px;display:flex;justify-content:center;}
.mcard-cover{width:80px;height:80px;border-radius:50%;background:var(--ink2);display:flex;align-items:center;justify-content:center;font-size:36px;border:3px solid var(--line);box-shadow:0 2px 8px rgba(13,36,16,.15);}
.mcard.rank1 .mcard-cover{width:90px;height:90px;font-size:40px;border-color:var(--ink2);}

/* card text */
.mcard-genre{font-size:9px;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;color:var(--muted);margin-bottom:6px;text-align:center;}
.mcard-title{font-family:'Bebas Neue',sans-serif;font-size:18px;letter-spacing:.5px;color:var(--ink);line-height:1.15;text-align:center;padding:0 12px;margin-bottom:4px;}
.mcard.rank1 .mcard-title{font-size:20px;}
.mcard-author{font-size:11px;font-weight:300;font-style:italic;color:var(--mid);text-align:center;margin-bottom:10px;}
.mcard-label{font-size:9px;font-weight:600;letter-spacing:2px;text-transform:uppercase;padding:5px 12px;border:1.5px solid var(--ld);border-radius:20px;color:var(--mid);}
.mcard.rank1 .mcard-label{background:var(--ink2);color:var(--bg3);border-color:var(--ink2);}
.mcard-stars{font-size:11px;color:var(--mid);margin-top:8px;}

/* detail panel below cards */
.match-detail{background:var(--card);border-radius:14px;margin:0 16px 16px;padding:22px 20px;box-shadow:0 2px 12px rgba(13,36,16,.07);border:1px solid var(--line);}
.match-detail-header{display:flex;align-items:center;gap:14px;margin-bottom:16px;}
.match-detail-cover{width:56px;height:76px;background:var(--ink2);border-radius:8px;box-shadow:2px 3px 8px rgba(13,36,16,.2);display:flex;align-items:center;justify-content:center;font-size:26px;flex-shrink:0;}
.match-detail-info{flex:1;min-width:0;}
.match-detail-genre{font-size:10px;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;color:var(--muted);margin-bottom:4px;}
.match-detail-title{font-family:'Bebas Neue',sans-serif;font-size:24px;letter-spacing:.5px;color:var(--ink);line-height:1.1;margin-bottom:3px;}
.match-detail-author{font-size:12px;font-weight:300;font-style:italic;color:var(--mid);}
.match-why{background:var(--bg2);border-left:3px solid var(--mid);border-radius:0 8px 8px 0;padding:14px 16px;margin-bottom:12px;}
.match-why-label{font-size:9px;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;color:var(--mid);margin-bottom:7px;letter-spacing:2px;}
.match-why-text{font-size:13px;font-weight:300;color:var(--mid);line-height:1.75;}
.match-desc-text{font-size:13px;font-weight:300;color:var(--mid);line-height:1.65;margin-bottom:16px;}
.match-badge-row{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px;}
..badge{font-size:10px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;padding:4px 10px;border:1px solid var(--ld);border-radius:20px;color:var(--mid);}
..badge.film{background:var(--ink2);color:var(--bg3);border-color:var(--ink2);}
.match-actions{display:flex;gap:10px;}

/* save button */
.save-btn{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;background:transparent;border:1.5px solid var(--ld);border-radius:8px;padding:13px;font-family:'Jost',sans-serif;font-size:10px;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;color:var(--muted);cursor:pointer;transition:all .2s;margin-top:4px;}
.save-btn.saved{background:var(--ink2);color:var(--bg3);border-color:var(--ink2);}
.save-btn:hover:not(.saved){border-color:var(--ink2);color:var(--ink2);}

/* saved page */
.saved-banner{background:var(--ink2);padding:52px 22px 28px;}
.saved-banner-label{font-size:10px;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:rgba(255,200,100,.4);margin-bottom:6px;}
.saved-banner-title{font-family:'Bebas Neue',sans-serif;font-size:44px;letter-spacing:1px;color:var(--bg3);line-height:1;}

/* BOOK CLUB */
.club-page{background:var(--bg);min-height:100vh;display:flex;flex-direction:column;padding-bottom:0;}
.club-head{padding:52px 22px 16px;border-bottom:1px solid var(--line);}
.club-head-eyebrow{font-size:10px;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:var(--muted);margin-bottom:6px;}
.club-head-title{font-family:'Bebas Neue',sans-serif;font-size:44px;letter-spacing:1px;color:var(--ink);line-height:1;margin-bottom:14px;}
.club-book-sel-row{display:flex;align-items:center;gap:8px;}
.club-book-sel-row label{font-size:10px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:var(--muted);white-space:nowrap;}
.book-sel{flex:1;background:none;border:none;border-bottom:1.5px solid var(--ld);padding:6px 0;font-family:'Jost',sans-serif;font-size:13px;font-weight:500;color:var(--ink2);cursor:pointer;outline:none;}

/* AI banner */
.chat-ai-banner{display:flex;align-items:center;gap:12px;padding:14px 22px;background:var(--card);border-bottom:1px solid var(--line);box-shadow:0 1px 8px rgba(13,36,16,.05);}
.chat-ai-avatar{width:38px;height:38px;border-radius:50%;background:var(--ink2);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;}
.chat-ai-name{font-size:13px;font-weight:600;color:var(--ink2);margin-bottom:1px;}
.chat-ai-status{font-size:12px;font-weight:300;color:var(--mid);}
.chat-ai-dot{width:8px;height:8px;border-radius:50%;background:#4CAF50;margin-left:auto;flex-shrink:0;box-shadow:0 0 0 3px rgba(76,175,80,.2);}

/* Chat messages - big and visible */
.chat-msgs{overflow-y:auto;padding:18px 22px 8px;display:flex;flex-direction:column;gap:12px;height:calc(100vh - 310px);min-height:280px;flex-shrink:0;}

.cmsg{max-width:84%;}
.cmsg.ai{align-self:flex-start;}
.cmsg.ai .mlabel{font-size:9px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--mid);margin-bottom:5px;}
.cmsg.ai .mbody{font-size:14px;font-weight:300;line-height:1.65;color:var(--ink);background:var(--card);padding:12px 16px;border-radius:4px 16px 16px 16px;box-shadow:0 1px 6px rgba(13,36,16,.07);display:inline-block;}
.cmsg.user{align-self:flex-end;}
.cmsg.user .mbody{font-size:14px;font-weight:300;line-height:1.65;color:var(--bg3);background:var(--ink2);padding:12px 16px;border-radius:16px 4px 16px 16px;display:inline-block;}

/* Chat input - always visible, prominent */
.chat-input-area{padding:10px 16px 14px;background:var(--bg);border-top:1px solid var(--line);display:flex;align-items:flex-end;gap:10px;}
.chat-field{flex:1;background:var(--card);border:1.5px solid var(--ld);border-radius:22px;box-shadow:0 2px 8px rgba(13,36,16,.07);padding:12px 18px;font-family:'Jost',sans-serif;font-size:14px;font-weight:300;color:var(--ink);resize:none;outline:none;min-height:46px;max-height:120px;transition:border-color .2s,box-shadow .2s;}
.chat-field:focus{border-color:var(--mid);box-shadow:0 2px 12px rgba(13,36,16,.12);}
.chat-field::placeholder{color:var(--muted);}
.send-btn-min{background:var(--ink2);border:none;border-radius:50%;width:46px;height:46px;display:flex;align-items:center;justify-content:center;font-size:18px;color:var(--bg3);box-shadow:0 3px 10px rgba(13,36,16,.25);cursor:pointer;flex-shrink:0;transition:all .2s;}
.send-btn-min:hover{opacity:.8;transform:scale(1.05);}
.send-btn-min:disabled{opacity:.25;cursor:not-allowed;transform:none;}

/* Collapsible sections */
.collapsible-section{border-top:1px solid var(--line);background:var(--bg);}
.collapsible-toggle{width:100%;background:none;border:none;padding:16px 22px;display:flex;align-items:center;justify-content:space-between;font-family:'Jost',sans-serif;font-size:13px;font-weight:500;color:var(--mid);cursor:pointer;text-align:left;transition:background .15s;}
.collapsible-toggle:hover{background:var(--bg2);}
.collapsible-arrow{font-size:10px;color:var(--muted);}
.collapsible-body{padding:0 22px 20px;background:var(--bg);}

/* Notes inside collapsible */
.notes-intro{font-size:13px;font-weight:300;color:var(--mid);margin-bottom:12px;line-height:1.5;}
.notes-ta{width:100%;background:var(--card);border:1.5px solid var(--line);border-radius:14px;padding:14px 16px;font-family:'Jost',sans-serif;font-size:14px;font-weight:300;color:var(--ink);resize:none;outline:none;min-height:100px;transition:border-color .2s;box-shadow:0 1px 6px rgba(13,36,16,.05);line-height:1.6;}
.notes-ta:focus{border-color:var(--mid);}
.notes-ta::placeholder{color:var(--muted);}
.notes-save-row{display:flex;justify-content:space-between;align-items:center;margin-top:8px;}
.notes-saved-label{font-size:11px;color:var(--mid);font-weight:600;opacity:0;transition:opacity .4s;}
.notes-saved-label.show{opacity:1;}
.notes-save-btn{background:var(--ink2);color:var(--bg3);border:none;border-radius:8px;padding:8px 16px;font-family:'Jost',sans-serif;font-size:10px;font-weight:600;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:opacity .15s;}
.notes-save-btn:hover{opacity:.8;}

/* tips inside collapsible */
.tips-scroll{display:flex;overflow-x:auto;padding:0 22px 20px;scrollbar-width:none;}
.tips-scroll::-webkit-scrollbar{display:none;}
.tip-card{flex-shrink:0;width:200px;border-right:1px solid var(--line);padding:16px 16px 16px 0;margin-right:16px;}
.tip-card:last-child{border-right:none;}
.tip-card.highlight{border-left:3px solid var(--mid);padding-left:12px;}
.tip-icon{font-size:18px;margin-bottom:8px;display:block;}
.tip-title{font-family:'Bebas Neue',sans-serif;font-size:15px;letter-spacing:.5px;color:var(--ink2);margin-bottom:4px;}
.tip-desc{font-size:12px;font-weight:300;color:var(--muted);line-height:1.6;}

/* PROFILE */
.profile-top{background:var(--ink2);padding:52px 22px 32px;}
.profile-photo-lg{width:80px;height:80px;border-radius:50%;background:rgba(184,216,190,.3);border:2px solid rgba(46,107,54,.3);display:flex;align-items:center;justify-content:center;font-family:'Bebas Neue',sans-serif;font-size:34px;color:var(--white);margin-bottom:14px;overflow:hidden;cursor:pointer;}
.profile-name-lg{font-family:'Bebas Neue',sans-serif;font-size:36px;letter-spacing:1px;color:var(--bg3);line-height:1;}
.profile-sub{font-size:12px;font-weight:300;color:rgba(213,232,215,.65);margin-top:5px;}
.profile-body{padding:0 22px;background:var(--bg);}
.settings-sec-label{font-size:10px;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:var(--amber);opacity:.8;padding:22px 0 12px;display:block;}
.settings-row{display:flex;align-items:center;padding:15px 0;border-bottom:1px solid var(--line);}
.settings-row:first-of-type{border-top:1px solid var(--line);}
.settings-label{flex:1;font-size:14px;font-weight:300;color:var(--ink);}
.conn-status{font-size:10px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;padding:6px 12px;cursor:pointer;border:1.5px solid var(--ld);border-radius:20px;transition:all .15s;background:transparent;color:var(--mid);}
.conn-status:hover{background:var(--ink2);color:var(--bg2);border-color:var(--ink2);}.conn-status.on{background:var(--ink2);color:var(--bg3);border-color:var(--ink2);}
.toggle{width:48px;height:28px;border-radius:14px;border:none;position:relative;cursor:pointer;transition:background .25s;flex-shrink:0;}
.toggle.off{background:rgba(13,36,16,.1);}
.toggle.on{background:var(--ink2);}
.toggle::after{content:'';position:absolute;width:24px;height:24px;border-radius:50%;background:var(--white);top:2px;box-shadow:0 1px 4px rgba(0,0,0,.2);transition:left .25s;}
.toggle.off::after{left:2px;}
.toggle.on::after{left:22px;}

/* MY BOOKS / MY CLUBS */
.subpage{background:var(--bg);min-height:100vh;padding-bottom:100px;}
.subpage-head{padding:52px 22px 20px;border-bottom:1px solid var(--line);display:flex;align-items:center;gap:14px;}
.subpage-back{background:none;border:none;font-family:'Jost',sans-serif;font-size:11px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:var(--muted);cursor:pointer;display:flex;align-items:center;gap:5px;flex-shrink:0;}
.subpage-back:hover{color:var(--ink);}
.subpage-title{font-family:'Bebas Neue',sans-serif;font-size:36px;letter-spacing:1px;color:var(--ink);line-height:1;}
.empty-state{padding:60px 22px;text-align:center;}
.empty-state-icon{font-size:44px;margin-bottom:16px;display:block;}
.empty-state-title{font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:1px;color:var(--ink);margin-bottom:8px;}
.empty-state-sub{font-size:13px;font-weight:300;color:var(--muted);line-height:1.7;max-width:240px;margin:0 auto 24px;}

@keyframes bop{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}
`;

const starStr = r => "★".repeat(Math.round(r)) + "☆".repeat(5 - Math.round(r));
const allQ = QUIZ_SECTIONS.flatMap(s => s.questions);
const totalQ = allQ.length;

// Sort books by rating for ranked library view
const rankedBooks = [...BOOK_DB].sort((a,b) => b.rating - a.rating);

function BookSearch({ value, onChange }) {
  const [query, setQuery] = useState(value || "");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value || null);
  const ref = useRef(null);
  const results = query.length > 1 ? BOOK_REGISTER.filter(b => b.toLowerCase().includes(query.toLowerCase())).slice(0, 8) : [];
  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const pick = item => { setSelected(item); setQuery(item); setOpen(false); onChange(item); };
  const clear = () => { setSelected(null); setQuery(""); onChange(""); };
  return (
    <div className="book-search-wrap" ref={ref}>
      {!selected ? <>
        <input className="book-search-field" placeholder="Start typing a title or author…" value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); onChange(e.target.value); }}
          onFocus={() => setOpen(true)} autoComplete="off" />
        {open && results.length > 0 && <div className="book-dropdown">{results.map(r => <div key={r} className="book-dd-item" onMouseDown={() => pick(r)}>{r}</div>)}</div>}
        <div className="book-search-hint">Search by title or author — e.g. "Austen" or "Kite Runner"</div>
      </> : <div className="book-selected-tag"><span>📖 {selected}</span><button className="book-selected-clear" onClick={clear}>✕</button></div>}
    </div>
  );
}

function DarknessPicker({ value, onChange }) {
  return (
    <div className="darkness-opts">
      {DARKNESS_LEVELS.map(d => (
        <button key={d.key} className={`dark-opt${value === d.key ? " sel" : ""}`} onClick={() => onChange(d.key)}>
          <span className="dark-opt-label">{d.label}</span>
          <div className="dark-opt-desc">{d.desc}</div>
          <div className="dark-opt-example">{d.example}</div>
        </button>
      ))}
    </div>
  );
}

function AnalysingScreen() {
  const [step, setStep] = useState(0);
  const steps = ["Reading your quiz answers…", "Mapping your themes and preferences…", "Cross-referencing the book library…", "Weighing genre, pace, and darkness…", "Writing personalised match reasons…", "Finalising your top 3 picks…"];
  useEffect(() => { const t = setInterval(() => setStep(s => s < steps.length - 1 ? s + 1 : s), 1800); return () => clearInterval(t); }, []);
  return (
    <div className="analysing-screen">
      <div className="analysing-title">FINDING YOUR TOP 3</div>
      <div className="analysing-steps">
        {steps.map((s, i) => (
          <div key={i} className={`a-step${i <= step ? " active" : ""}`}>
            <div className="a-step-num">{String(i + 1).padStart(2, "0")}</div>
            <div className="a-step-text">{s}{i === step && <span className="dots-inline"><span /><span /><span /></span>}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BookMatch() {
  const [screen, setScreen] = useState("landing");
  const [sheetMode, setSheetMode] = useState(null); // null | 'signin' | 'signup'
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [uname, setUname] = useState("");
  const [tab, setTab] = useState("home");
  const [subpage, setSubpage] = useState(null); // null | 'mybooks' | 'myclubs'

  const [secIdx, setSecIdx] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [ans, setAns] = useState({});
  const [history, setHistory] = useState([]);
  const [quizDone, setQuizDone] = useState(false);
  const [matches, setMatches] = useState([]);
  const [savedMatches, setSavedMatches] = useState(null);
  const [profileSaved, setProfileSaved] = useState(false);
  const [selectedMatchIdx, setSelectedMatchIdx] = useState(0);
  const [aiLoading, setAiLoading] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const [search, setSearch] = useState("");
  const [gf, setGf] = useState("All");
  const [expandedBook, setExpandedBook] = useState(null);
  const [notes, setNotes] = useState("");
  const [notesSaved, setNotesSaved] = useState(false);
  const [tipsOpen, setTipsOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);

  const [cbook, setCbook] = useState(BOOK_DB[0].title);
  const [cmsgs, setCmsgs] = useState([]);
  const [cin, setCin] = useState("");
  const [cload, setCload] = useState(false);
  const cend = useRef(null);
  const [conn, setConn] = useState({ goodreads: false, kindle: false, audible: false });
  const [profileImg, setProfileImg] = useState(null);
  const fileRef = useRef(null);
  const [myBooks] = useState([]);
  const [myClubs] = useState([]);

  const flatIdx = QUIZ_SECTIONS.slice(0, secIdx).reduce((a, s) => a + s.questions.length, 0) + qIdx;
  const curSec = QUIZ_SECTIONS[secIdx];
  const curQ = curSec?.questions[qIdx];

  useEffect(() => { if (cend.current) cend.current.scrollIntoView({ behavior: "smooth" }); }, [cmsgs, cload]);
  useEffect(() => { if (tab === "sparring" && cmsgs.length === 0) initChat(cbook); }, [tab]);

  const initChat = t => setCmsgs([{ role: "ai", text: `Hey! Ready to read "${t}" together? 📖\n\nI can help you build a reading plan, discuss each chapter as you go, or just answer questions whenever you're stuck.\n\nWant to start with a plan — or have you already begun? 😊` }]);
  const changeBook = t => { setCbook(t); setCmsgs([]); initChat(t); };

  const handleAns = (id, val, type) => {
    let na;
    if (type === "multiselect") {
      const prev = ans[id] || [];
      na = { ...ans, [id]: prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val] };
    } else { na = { ...ans, [id]: val }; }
    setAns(na);
    if (type !== "multiselect" && type !== "booksearch" && type !== "darkness") doAdvance(na);
  };

  const doAdvance = async na => {
    setHistory(h => [...h, { secIdx, qIdx }]);
    const sec = QUIZ_SECTIONS[secIdx];
    if (qIdx < sec.questions.length - 1) setQIdx(qIdx + 1);
    else if (secIdx < QUIZ_SECTIONS.length - 1) { setSecIdx(secIdx + 1); setQIdx(0); }
    else { setQuizDone(true); setAiLoading(true); await fetchMatches(na); }
  };

  const goBack = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory(h => h.slice(0, -1));
    setSecIdx(prev.secIdx); setQIdx(prev.qIdx);
  };

  const fetchMatches = async na => {
    try {
      const summary = Object.entries(na).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`).join("\n");
      const wantsClassics = na.classics && !na.classics.includes("Modern");
      const wantsMovies = na.movie && na.movie.includes("love");
      const dLevels = ["light", "mild", "moderate", "dark", "very dark"];
      const maxDark = dLevels.indexOf(na.darkness || "very dark");
      const blist = BOOK_DB.filter(b => maxDark < 0 || dLevels.indexOf(b.darkness) <= maxDark)
        .map(b => `${b.title}|${b.author}|${b.genre}|classic:${b.isClassic}|movie:${b.isMovie}|pages:${b.pages}|darkness:${b.darkness}|themes:${b.themes.join(",")}`)
        .join("\n");
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_ANTHROPIC_KEY || "",
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true"
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 1500,
          messages: [{ role: "user", content: `You are an expert librarian. Based on this reader profile, pick exactly 3 books from the list.\n\nFor each match write a warm, specific 3–5 sentence explanation that DIRECTLY references their quiz answers using phrases like "Because you said…", "You told us you want…", "Since you prefer…", "Given that you loved…"\n\nREADER PROFILE:\n${summary}\n\n${wantsClassics ? "Include at least one classic (pre-1950)." : ""}${wantsMovies ? " Prefer books with film adaptations." : ""}\n\nBOOKS:\n${blist}\n\nRespond ONLY as JSON:\n{"matches":[{"title":"Title","author":"Author","reason":"personalised reason"}]}` }]
        })
      });
      const data = await res.json();
      const txt = data.content.map(c => c.text || "").join("").replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(txt);
      const found = parsed.matches.slice(0, 3).map(m => { const b = BOOK_DB.find(x => x.title === m.title); return b ? { ...b, reason: m.reason } : null; }).filter(Boolean);
      setMatches(found.length ? found : BOOK_DB.slice(0, 3).map(b => ({ ...b, reason: "A strong match for your reading taste." })));
    } catch { setMatches(BOOK_DB.slice(0, 3).map(b => ({ ...b, reason: "A strong match for your reading taste." }))); }
    setAiLoading(false);
  };

  const sendChat = async () => {
    if (!cin.trim() || cload) return;
    const msg = cin.trim(); setCin("");
    setCmsgs(p => [...p, { role: "user", text: msg }]); setCload(true);
    try {
      const book = BOOK_DB.find(b => b.title === cbook);
      const hist = cmsgs.map(m => ({ role: m.role === "ai" ? "assistant" : "user", content: m.text }));
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_ANTHROPIC_KEY || "",
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true"
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 1000,
          system: `You are a warm, encouraging reading companion and book club coach discussing "${cbook}" by ${book?.author}. ${book?.desc}\n\nYour job is to:\n- Help the reader build a reading plan (chapters per week, daily pages etc.) if they want one\n- Discuss each chapter or section as they finish it — celebrate their progress\n- Explain themes, characters, and what the author is really trying to say — in plain, exciting language\n- Ask questions that make the reader think, not feel tested\n- Keep them motivated, especially if they're stuck or finding it hard\n- Never make them feel bad for not understanding something\n\nBe like a brilliant friend who loves books and genuinely wants this person to have a great reading experience. Keep responses warm, conversational, under 180 words. Always end with one question or invitation to continue.`,
          messages: [...hist, { role: "user", content: msg }]
        })
      });
      const data = await res.json();
      setCmsgs(p => [...p, { role: "ai", text: data.content.map(c => c.text || "").join("") }]);
    } catch { setCmsgs(p => [...p, { role: "ai", text: "Something went wrong — try again." }]); }
    setCload(false);
  };

  const handlePhoto = e => { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = ev => setProfileImg(ev.target.result); r.readAsDataURL(f); };

  const genres = ["All", "Classic", "Books → Films", ...Array.from(new Set(BOOK_DB.map(b => b.genre)))];
  const filteredRanked = rankedBooks.filter(b => {
    const q = search.toLowerCase();
    const mq = b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q);
    let mg = true;
    if (gf === "Classic") mg = b.isClassic;
    else if (gf === "Books → Films") mg = b.isMovie;
    else if (gf !== "All") mg = b.genre === gf;
    return mq && mg;
  });

  // ── LANDING ──
  if (screen === "landing") return (
    <><style>{css}</style>
    <div className="landing">
      <div className="landing-grid" />
      <div className="landing-top">
        <div className="landing-mark">BOOKMATCH</div>
        <button className="landing-signin-link" onClick={() => setSheetMode("signin")}>Sign in</button>
      </div>
      <div className="landing-hero">
        <div className="landing-headline">FIND YOUR<br/>BOOK<br/><span>MATCHES.</span></div>
        <div className="landing-subline">A 3-minute quiz finds your perfect book. Then your personal reading companion guides you through every page — like a book club that never closes.</div>
        <div className="landing-features">
          {[
            { n:"01", title:"Matched to you", desc:"Answer 17 questions about your taste, habits, and what moves you. Get 3 books chosen just for you." },
            { n:"02", title:"Curated library", desc:"Browse 30+ handpicked books — classics, modern fiction, films — ranked and filtered to your level." },
            { n:"03", title:"Your reading companion", desc:"An AI that teaches you how to read deeply — themes, characters, what to look for — chapter by chapter." },
          ].map(f => (
            <div key={f.n} className="landing-feature">
              <div className="lf-num">{f.n}</div>
              <div className="lf-text">
                <div className="lf-title">{f.title}</div>
                <div className="lf-desc">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="landing-cta-area">
        <button className="landing-cta-btn" onClick={() => { setUname("Reader"); setScreen("app"); }}>GET STARTED — IT'S FREE</button>
        <div className="landing-sub-row">Takes 3 minutes · No credit card needed</div>
      </div>

      {sheetMode && (
        <div className="sheet-overlay" onClick={e => { if (e.target.className === "sheet-overlay") setSheetMode(null); }}>
          <div className="sheet" style={{ position: "relative" }}>
            <div className="sheet-handle" />
            <button className="sheet-close" onClick={() => setSheetMode(null)}>✕</button>
            {sheetMode === "signin" && <>
              <div className="ls-label">Welcome back</div>
              <div className="ls-title">SIGN IN</div>
              <div className="srow">
                <button className="sbtn" onClick={() => { setUname("Reader"); setScreen("app"); setSheetMode(null); }}>🔵 Google</button>
                <button className="sbtn" onClick={() => { setUname("Reader"); setScreen("app"); setSheetMode(null); }}>🍎 Apple</button>
              </div>
              <div className="or-row"><span>or</span></div>
              <input className="field" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} type="email" />
              <input className="field" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} type="password" />
              <button className="primary-btn" onClick={() => { setUname(email.split("@")[0] || "Reader"); setScreen("app"); setSheetMode(null); }}>Sign In</button>
              <div className="sheet-foot">No account? <button className="lnk" onClick={() => setSheetMode("signup")}>Create one free</button></div>
            </>}
            {sheetMode === "signup" && <>
              <div className="ls-label">New here</div>
              <div className="ls-title">CREATE ACCOUNT</div>
              <input className="field" placeholder="Your name" value={uname} onChange={e => setUname(e.target.value)} />
              <input className="field" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} type="email" />
              <input className="field" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} type="password" />
              <button className="primary-btn" onClick={() => { setScreen("app"); setSheetMode(null); }}>Create Account</button>
              <div className="sheet-foot"><button className="lnk" onClick={() => setSheetMode("signin")}>Already have an account?</button></div>
            </>}
          </div>
        </div>
      )}
    </div></>
  );

  // ── SUBPAGES (My Books / My Clubs) ──
  if (subpage) return (
    <><style>{css}</style>
    <div className="subpage">
      <div className="subpage-head">
        <button className="subpage-back" onClick={() => setSubpage(null)}>← HOME</button>
        <div className="subpage-title">{subpage === "mybooks" ? "MY BOOKS" : "MY BOOK CLUBS"}</div>
      </div>
      <div className="empty-state">
        <span className="empty-state-icon">{subpage === "mybooks" ? "📚" : "👥"}</span>
        <div className="empty-state-title">{subpage === "mybooks" ? "No books yet" : "No clubs yet"}</div>
        <div className="empty-state-sub">
          {subpage === "mybooks"
            ? "Books you save from the library or your quiz matches will appear here. Start by taking the quiz or browsing the library."
            : "Start a book club by picking a book in the Book Club tab and inviting others to discuss it together."}
        </div>
        <button className="filled-btn" onClick={() => { setSubpage(null); setTab(subpage === "mybooks" ? "browse" : "sparring"); }}>
          {subpage === "mybooks" ? "BROWSE LIBRARY" : "OPEN BOOK CLUB"}
        </button>
      </div>
      <div className="tab-bar">
        {[{ id: "home", icon: "◎", label: "HOME" }, { id: "quiz", icon: "◈", label: "QUIZ" }, { id: "browse", icon: "▣", label: "LIBRARY" }, { id: "sparring", icon: "◇", label: "BOOK CLUB" }, { id: "saved", icon: "☆", label: "SAVED" }, { id: "profile", icon: "○", label: "PROFILE" }].map(({ id, icon, label }) => (
          <button key={id} className={`tab-btn${tab === id ? " on" : ""}`} onClick={() => { setSubpage(null); setTab(id); }}>
            <span className="tab-icon-text">{icon}</span>
            <span className="tab-label-text">{label}</span>
          </button>
        ))}
      </div>
    </div></>
  );

  return (
    <><style>{css}</style>
    <div className="root">

      {/* HOME */}
      {tab === "home" && <div className="home">
        <div className="home-header">
          <div className="profile-cluster">
            <div className="profile-photo" onClick={() => fileRef.current?.click()}>
              {profileImg ? <img src={profileImg} alt="" /> : uname[0].toUpperCase()}
            </div>
            <div>
              <div className="profile-hello">Welcome back</div>
              <div className="profile-name-s">{uname.toUpperCase()}</div>
            </div>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhoto} />
          </div>
          <div className="home-wm">BM</div>
        </div>

        <div className="home-hero">
          <div className="hero-eyebrow">Personal Book Intelligence</div>
          <div className="hero-headline">FIND YOUR<br/>NEXT GREAT<br/>READ</div>
          <div className="hero-sub">A 3-minute quiz matches you with books you'll actually finish. Your reading companion helps you understand every page.</div>
          <div className="btn-row">
            <button className="filled-btn" onClick={() => setTab("quiz")}>{quizDone ? "RETAKE QUIZ" : "TAKE THE QUIZ"}</button>
            <button className="ghost-btn" onClick={() => setTab("browse")}>BROWSE BOOKS</button>
            <button className="ghost-btn" onClick={() => setSubpage("mybooks")}>MY BOOKS</button>
            <button className="ghost-btn" onClick={() => setSubpage("myclubs")}>MY BOOK CLUBS</button>
          </div>
        </div>

      </div>}

      {/* QUIZ */}
      {tab === "quiz" && <div className="quiz-bg">
        <div className="quiz-head">
          <div className="quiz-head-eyebrow">Step 02</div>
          <div className="quiz-head-title">READER PROFILE</div>
        </div>
        <div className="quiz-body">
          {!quizStarted && !quizDone && <div className="quiz-start">
            <div className="quiz-start-title">YOUR READING DNA</div>
            <div className="quiz-start-sub">{totalQ} questions across 4 sections. Takes about 3 minutes. The more honest, the better your top 3 matches.</div>
            <div className="sections-row">{QUIZ_SECTIONS.map(s => <div key={s.section} className="section-tag">{s.section}</div>)}</div>
            <button className="white-btn" onClick={() => setQuizStarted(true)}>BEGIN →</button>
          </div>}

          {quizStarted && !quizDone && curQ && <div className="qcard">
            <div className="q-sec-row">{QUIZ_SECTIONS.map((_, i) => <div key={i} className={`q-sec-pip${i < secIdx ? " done" : i === secIdx ? " act" : ""}`} />)}</div>
            <div className="q-progress"><div className="q-progress-fill" style={{ width: `${((flatIdx + 1) / totalQ) * 100}%` }} /></div>
            <div className="q-section-tag">{curSec.section}</div>
            <div className="q-counter">{String(flatIdx + 1).padStart(2, "0")} / {String(totalQ).padStart(2, "0")}</div>
            <div className="q-question">{curQ.q}</div>
            {curQ.sub && <div className="q-sub">{curQ.sub}</div>}

            {curQ.type === "booksearch" && <>
              <BookSearch value={ans[curQ.id] || ""} onChange={v => setAns({ ...ans, [curQ.id]: v })} />
              <div className="q-nav">
                <button className="back-btn" onClick={goBack} disabled={history.length === 0}>← BACK</button>
                <div style={{ display: "flex", gap: 10 }}>
                  <button className="text-btn" onClick={() => doAdvance(ans)}>SKIP</button>
                  <button className="white-btn" style={{ width: "auto", padding: "12px 22px" }} onClick={() => doAdvance(ans)}>NEXT →</button>
                </div>
              </div>
            </>}
            {curQ.type === "darkness" && <>
              <DarknessPicker value={ans[curQ.id] || ""} onChange={v => setAns({ ...ans, [curQ.id]: v })} />
              <div className="q-nav">
                <button className="back-btn" onClick={goBack} disabled={history.length === 0}>← BACK</button>
                <div style={{ display: "flex", gap: 10 }}>
                  <button className="text-btn" onClick={() => doAdvance(ans)}>SKIP</button>
                  <button className="white-btn" style={{ width: "auto", padding: "12px 22px" }} onClick={() => doAdvance(ans)}>NEXT →</button>
                </div>
              </div>
            </>}
            {curQ.type === "multiselect" && <>
              <div className="q-multi-hint">Select all that apply</div>
              <div className="q-opts">{curQ.options.map(opt => <button key={opt} className={`q-opt${(ans[curQ.id] || []).includes(opt) ? " sel" : ""}`} onClick={() => handleAns(curQ.id, opt, "multiselect")}>{opt}</button>)}</div>
              <div className="q-nav">
                <button className="back-btn" onClick={goBack} disabled={history.length === 0}>← BACK</button>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,.25)", letterSpacing: "1px" }}>{(ans[curQ.id] || []).length} SELECTED</span>
                  <button className="white-btn" style={{ width: "auto", padding: "12px 22px" }} onClick={() => doAdvance(ans)}>NEXT →</button>
                </div>
              </div>
            </>}
            {curQ.type === "single" && <>
              <div className="q-opts">{curQ.options.map(opt => <button key={opt} className={`q-opt${ans[curQ.id] === opt ? " sel" : ""}`} onClick={() => handleAns(curQ.id, opt, "single")}>{opt}</button>)}</div>
              <div className="q-nav"><button className="back-btn" onClick={goBack} disabled={history.length === 0}>← BACK</button></div>
            </>}
          </div>}

          {quizDone && (aiLoading ? <AnalysingScreen /> : <>
            {/* Dark header */}
            <div style={{ background:"var(--bg2)", margin:"-24px -22px 0", padding:"24px 22px 32px", borderBottom:"1px solid var(--ld)" }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:13, letterSpacing:"3px", color:"var(--mid)", marginBottom:6, opacity:1 }}>AI-MATCHED FOR YOU</div>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:48, letterSpacing:"1px", color:"var(--ink2)", lineHeight:1, marginBottom:6 }}>YOUR TOP 3</div>
              <div style={{ fontSize:13, fontWeight:200, color:"var(--mid)" }}>Tap a card to see why it's right for you</div>
            </div>

            {/* Horizontal card scroll */}
            <div className="match-cards-scroll">
              {matches.map((b, i) => (
                <div key={b.id}
                  className={`mcard rank${i+1}${selectedMatchIdx===i?" active":""}`}
                  onClick={()=>setSelectedMatchIdx(i)}>
                  <div className="mcard-badge">{i+1}</div>
                  <div className="mcard-cover-wrap">
                    <div className="mcard-cover">{b.cover}</div>
                  </div>
                  <div className="mcard-genre">{b.genre}</div>
                  <div className="mcard-title">{b.title}</div>
                  <div className="mcard-author">{b.author}</div>
                  <div className="mcard-label">{["Best Match","2nd Pick","3rd Pick"][i]}</div>
                  <div className="mcard-stars">{starStr(b.rating)} {b.rating}</div>
                </div>
              ))}
            </div>

            {/* Detail panel for selected card */}
            {matches[selectedMatchIdx] && (() => { const b = matches[selectedMatchIdx]; return (
              <div className="match-detail">
                <div className="match-detail-header">
                  <div className="match-detail-cover">{b.cover}</div>
                  <div className="match-detail-info">
                    <div className="match-detail-genre">{b.genre} · {b.pages}p</div>
                    <div className="match-detail-title">{b.title}</div>
                    <div className="match-detail-author">{b.author}</div>
                  </div>
                </div>
                <div className="match-badge-row">
                  {b.isMovie&&<span className="mbadge film">🎬 Film</span>}
                  {b.isClassic&&<span className="mbadge">📜 Classic</span>}
                  <span className="mbadge">{b.darkness} content</span>
                </div>
                <div className="match-why">
                  <div className="match-why-label">Why this book is for you</div>
                  <div className="match-why-text">{b.reason}</div>
                </div>
                <div className="match-desc-text">{b.desc}</div>
                <div className="match-actions">
                  <button className="filled-btn" onClick={()=>{changeBook(b.title);setTab("sparring");}}>BOOK CLUB →</button>
                  <button className="ghost-btn" onClick={()=>setTab("browse")}>MORE LIKE THIS</button>
                </div>
              </div>
            );})()}

            {/* Save + Retake */}
            <div style={{ padding:"20px 22px", display:"flex", flexDirection:"column", gap:10 }}>
              <button
                className={`save-btn${profileSaved?" saved":""}`}
                onClick={()=>{ setSavedMatches(matches); setProfileSaved(true); }}>
                {profileSaved ? "✓  MATCHES SAVED" : "☆  SAVE MY MATCHES"}
              </button>
              <button className="ghost-btn" style={{ width:"100%", textAlign:"center" }}
                onClick={()=>{ setSecIdx(0); setQIdx(0); setAns({}); setHistory([]); setQuizDone(false); setQuizStarted(false); setMatches([]); setProfileSaved(false); setSelectedMatchIdx(0); }}>
                RETAKE QUIZ
              </button>
            </div>
          </>)}
        </div>
      </div>}

      {/* BROWSE / LIBRARY */}
      {tab === "browse" && <div className="page">
        <div className="page-header"><div className="page-eyebrow">Rangert etter vurdering</div><div className="page-title">LIBRARY</div></div>
        <div className="search-bar"><span className="search-icon-s">🔍</span><input className="search-field" placeholder="Søk tittel eller forfatter…" value={search} onChange={e => setSearch(e.target.value)} /></div>
        <div className="genre-scroll">{genres.map(g => <button key={g} className={`genre-pill${gf === g ? " on" : ""}`} onClick={() => setGf(g)}>{g}</button>)}</div>
        <div className="book-cards-list">
          {filteredRanked.length === 0
            ? <div style={{ textAlign:"center", padding:"60px 20px", color:"var(--muted)" }}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:26, color:"var(--ink)", marginBottom:6 }}>NOTHING FOUND</div>
                <div style={{ fontSize:13, fontWeight:300 }}>Prøv et annet søk</div>
              </div>
            : filteredRanked.map((b, idx) => (
              <div key={b.id}>
                <div className="bcard" onClick={() => setExpandedBook(expandedBook === b.id ? null : b.id)}>
                  <div className="bcard-rank">#{idx+1}</div>
                  <div className="bcard-cover">{b.cover}</div>
                  <div className="bcard-body">
                    <div className="bcard-genre">{b.genre}</div>
                    <div className="bcard-title">{b.title}</div>
                    <div className="bcard-author">{b.author}</div>
                    <div className="bcard-footer">
                      <div className="bcard-stars">{starStr(b.rating)} {b.rating}</div>
                      <div className="bcard-meta">
                        {b.isMovie && <span className="bcard-badge film">🎬</span>}
                        {b.isClassic && <span className="bcard-badge">📜</span>}
                        <span className="bcard-badge">{b.pages}s</span>
                      </div>
                    </div>
                  </div>
                </div>
                {expandedBook === b.id && (
                  <div className="bcard-expanded">
                    <div className="bcard-desc">{b.desc}</div>
                    <button className="filled-btn" style={{fontSize:10}} onClick={() => { changeBook(b.title); setTab("sparring"); }}>BOOK CLUB →</button>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>}

      {/* BOOK CLUB */}
      {tab === "sparring" && <div className="club-page">

        {/* Header */}
        <div className="club-head">
          <div className="club-head-eyebrow">Your reading companion</div>
          <div className="club-head-title">BOOK CLUB</div>
          <div className="club-book-sel-row">
            <label>READING</label>
            <select className="book-sel" value={cbook} onChange={e => changeBook(e.target.value)}>
              {BOOK_DB.map(b => <option key={b.id} value={b.title}>{b.cover} {b.title}</option>)}
            </select>
          </div>
        </div>

        {/* AI intro banner */}
        <div className="chat-ai-banner">
          <div className="chat-ai-avatar">🤖</div>
          <div className="chat-ai-intro">
            <div className="chat-ai-name">BookMatch AI</div>
            <div className="chat-ai-status">Ready to discuss <strong>{cbook}</strong></div>
          </div>
          <div className="chat-ai-dot"/>
        </div>

        {/* CHAT — prominent and tall */}
        <div className="chat-msgs" ref={null}>
          {cmsgs.map((m, i) => (
            <div key={i} className={`cmsg ${m.role}`}>
              {m.role === "ai" && <div className="mlabel">BOOKMATCH AI</div>}
              <div className="mbody" style={{whiteSpace:"pre-line"}}>{m.text}</div>
            </div>
          ))}
          {cload && <div className="cmsg ai"><div className="mlabel">BOOKMATCH AI</div><div className="mbody"><span className="dots-inline"><span /><span /><span /></span></div></div>}
          <div ref={cend} />
        </div>

        {/* Chat input — always visible */}
        <div className="chat-input-area">
          <textarea className="chat-field" rows={1} placeholder={`Ask about "${cbook}", share your thoughts…`}
            value={cin} onChange={e => setCin(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendChat(); } }} />
          <button className="send-btn-min" onClick={sendChat} disabled={cload || !cin.trim()}>↑</button>
        </div>

        {/* Collapsible: My Notes */}
        <div className="collapsible-section">
          <button className="collapsible-toggle" onClick={() => setNotesOpen(o => !o)}>
            <span>📝 My Reading Notes</span>
            <span className="collapsible-arrow">{notesOpen ? "▲" : "▼"}</span>
          </button>
          {notesOpen && <div className="collapsible-body">
            <div className="notes-intro">Write down thoughts, quotes or questions while you read — just for you.</div>
            <textarea
              className="notes-ta"
              placeholder={`What do you think about "${cbook}" so far? Anything that surprised you?`}
              value={notes}
              onChange={e => { setNotes(e.target.value); setNotesSaved(false); }}
            />
            <div className="notes-save-row">
              <span className={`notes-saved-label${notesSaved ? " show" : ""}`}>✓ Saved</span>
              <button className="notes-save-btn" onClick={() => setNotesSaved(true)}>SAVE NOTES</button>
            </div>
          </div>}
        </div>

        {/* Collapsible: Reading Tips */}
        <div className="collapsible-section" style={{marginBottom:90}}>
          <button className="collapsible-toggle" onClick={() => setTipsOpen(o => !o)}>
            <span>🎯 Reading Tips &amp; How to Use AI</span>
            <span className="collapsible-arrow">{tipsOpen ? "▲" : "▼"}</span>
          </button>
          {tipsOpen && <div className="collapsible-body" style={{padding:0}}>
            <div style={{padding:"0 16px 8px",fontSize:13,fontWeight:300,color:"var(--mid)",lineHeight:1.65}}>
              Most people were never taught <em>how</em> to read deeply. Here's what you can explore with BookMatch AI:
            </div>
            <div className="tips-scroll" style={{borderTop:"1px solid var(--line)",paddingTop:16}}>
              {BOOK_CLUB_TIPS.map(t => (
                <div key={t.title} className={`tip-card${t.highlight ? " highlight" : ""}`}>
                  <span className="tip-icon">{t.icon}</span>
                  <div className="tip-title">{t.title}</div>
                  <div className="tip-desc">{t.desc}</div>
                </div>
              ))}
            </div>
          </div>}
        </div>

      </div>}

      {/* SAVED */}
      {tab==="saved"&&<div className="page" style={{paddingBottom:100}}>
        <div className="saved-banner">
          <div className="saved-banner-label">Your reader profile</div>
          <div className="saved-banner-title">SAVED MATCHES</div>
        </div>
        {!savedMatches
          ? <div style={{padding:"60px 22px",textAlign:"center"}}>
              <div style={{fontSize:40,marginBottom:16}}>☆</div>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:26,color:"var(--ink)",marginBottom:8}}>NOTHING SAVED YET</div>
              <div style={{fontSize:13,fontWeight:300,color:"var(--muted)",lineHeight:1.7,maxWidth:240,margin:"0 auto 24px"}}>Take the reader quiz and save your top 3 book matches to access them here anytime.</div>
              <button className="filled-btn" onClick={()=>setTab("quiz")}>TAKE THE QUIZ →</button>
            </div>
          : <div>
              {/* saved card scroll */}
              <div className="match-cards-scroll">
                {savedMatches.map((b,i)=>(
                  <div key={b.id} className={`mcard rank${i+1}${selectedMatchIdx===i?" active":""}`} onClick={()=>setSelectedMatchIdx(i)}>
                    <div className="mcard-badge">{i+1}</div>
                    <div className="mcard-cover-wrap"><div className="mcard-cover">{b.cover}</div></div>
                    <div className="mcard-genre">{b.genre}</div>
                    <div className="mcard-title">{b.title}</div>
                    <div className="mcard-author">{b.author}</div>
                    <div className="mcard-label">{["Best Match","2nd Pick","3rd Pick"][i]}</div>
                    <div className="mcard-stars">{starStr(b.rating)} {b.rating}</div>
                  </div>
                ))}
              </div>
              {savedMatches[selectedMatchIdx]&&(()=>{const b=savedMatches[selectedMatchIdx];return(
                <div className="match-detail">
                  <div className="match-detail-header">
                    <div className="match-detail-cover">{b.cover}</div>
                    <div className="match-detail-info">
                      <div className="match-detail-genre">{b.genre} · {b.pages}p</div>
                      <div className="match-detail-title">{b.title}</div>
                      <div className="match-detail-author">{b.author}</div>
                    </div>
                  </div>
                  <div className="match-badge-row">
                    {b.isMovie&&<span className="mbadge film">🎬 Film</span>}
                    {b.isClassic&&<span className="mbadge">📜 Classic</span>}
                    <span className="mbadge">{b.darkness} content</span>
                  </div>
                  <div className="match-why">
                    <div className="match-why-label">Why this book is for you</div>
                    <div className="match-why-text">{b.reason}</div>
                  </div>
                  <div className="match-desc-text">{b.desc}</div>
                  <div className="match-actions">
                    <button className="filled-btn" onClick={()=>{changeBook(b.title);setTab("sparring");}}>BOOK CLUB →</button>
                    <button className="ghost-btn" onClick={()=>setTab("browse")}>MORE LIKE THIS</button>
                  </div>
                </div>
              );})()}
              <div style={{padding:"20px 22px"}}>
                <button className="ghost-btn" style={{width:"100%",textAlign:"center"}} onClick={()=>setTab("quiz")}>RETAKE QUIZ</button>
              </div>
            </div>
        }
      </div>}

      {/* PROFILE */}
      {tab === "profile" && <div className="page" style={{ padding: 0 }}>
        <div className="profile-top">
          <div className="profile-photo-lg" onClick={() => fileRef.current?.click()}>
            {profileImg ? <img src={profileImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} /> : uname[0].toUpperCase()}
          </div>
          <div className="profile-name-lg">{uname.toUpperCase()}</div>
          <div className="profile-sub">{quizDone ? `Top 3 matches ready` : "Reader profile not built yet"}</div>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhoto} />
        </div>
        <div className="profile-body">
          {!quizDone && <button className="primary-btn" style={{ marginTop: 24 }} onClick={() => setTab("quiz")}>BUILD READER PROFILE →</button>}
          <span className="settings-sec-label">Reading Apps</span>
          {[{ key: "goodreads", label: "Goodreads", sub: "Shelves & ratings" }, { key: "kindle", label: "Kindle", sub: "Amazon library" }, { key: "audible", label: "Audible", sub: "Audiobook history" }].map(({ key, label, sub }) => (
            <div key={key} className="settings-row">
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 400, color: "var(--ink)" }}>{label}</div>
                <div style={{ fontSize: 12, fontWeight: 300, color: "var(--muted)", marginTop: 2 }}>{conn[key] ? "Connected" : sub}</div>
              </div>
              <button className={`conn-status${conn[key] ? " on" : ""}`} onClick={() => setConn(p => ({ ...p, [key]: !p[key] }))}>
                {conn[key] ? "CONNECTED" : "CONNECT"}
              </button>
            </div>
          ))}
          <span className="settings-sec-label">Account</span>
          <div className="settings-row"><div className="settings-label">Notifications</div><button className="toggle off" /></div>
          <div className="settings-row" style={{ cursor: "pointer" }} onClick={() => setScreen("landing")}>
            <div className="settings-label" style={{ color: "#c00" }}>Sign Out</div>
          </div>
        </div>
      </div>}

      {/* TAB BAR */}
      <div className="tab-bar">
        {[{ id:"home",icon:"◎",label:"HOME"},{id:"quiz",icon:"◈",label:"QUIZ"},{id:"browse",icon:"▣",label:"LIBRARY"},{id:"sparring",icon:"◇",label:"BOOK CLUB"},{id:"saved",icon:"☆",label:"SAVED"},{id:"profile",icon:"○",label:"PROFILE"}].map(({id,icon,label})=>(
          <button key={id} className={`tab-btn${tab===id?" on":""}`} onClick={()=>setTab(id)}>
            <span className="tab-icon-text" style={id==="saved"&&profileSaved?{opacity:1,fontSize:20}:{}}>{id==="saved"&&profileSaved?"★":icon}</span>
            <span className="tab-label-text">{label}</span>
          </button>
        ))}
      </div>
    </div></>
  );
}

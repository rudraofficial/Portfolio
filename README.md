# My Portfolio Website

Hey there! This is my personal portfolio website that I built to showcase my work and skills. I wanted something modern and clean, so I went with a glassmorphism design style - you know, those nice frosted glass effects with the blurred backgrounds. I think it turned out pretty well!

## What I Built

I kept things simple but effective:
- Clean glassmorphism UI with those subtle blur effects everyone loves
- Built with Tailwind CSS because honestly, writing custom CSS for everything is exhausting
- Works great on phones, tablets, and desktops - tested it myself on all my devices
- Used Material Design colors because Google knows their stuff
- Kept it lightweight and fast - nobody likes waiting for pages to load

## Getting Started

If you want to run this locally or fork it for your own use, here's what you need to do:

**What you'll need:**
- Node.js (anything v14 or newer should work fine)
- npm (comes with Node.js)

**Setting it up:**

First, grab the code:
```bash
git clone https://github.com/rudraofficial/portfolio.git
cd portfolio
```

Install the stuff it needs:
```bash
npm install
```

Build the CSS:
```bash
npm run build
```

Then just open `index.html` in your browser. Or if you want a proper local server:
```bash
# I usually use Python for this
python -m http.server 8000

# Or if you prefer Node
npx http-server
```

**For development:**

If you're actively working on it and want Tailwind to rebuild automatically:
```bash
npm run dev
```

## How It's Organized

```
portfolio/
├── index.html              # Everything's in here - the whole site
├── style.css               # Main stylesheet
├── package.json            # Dependencies and build scripts
├── tailwind.config.js      # Tailwind settings
├── css/
│   └── input.css           # Tailwind source file
├── assets/
│   └── tailwind.css        # Generated CSS (gets rebuilt automatically)
└── js/
    └── app.js              # Just handles the mobile menu
```

## The Design

I went for a glassmorphism look throughout. There are a few custom components I made:
- Glass cards with different opacity levels
- Buttons with smooth hover effects
- Skill cards that pop a bit when you hover
- Project cards with a nice zoom effect on the images

Colors are from Material Design - mostly blues, with some accent colors for variety. Using Poppins font because it's clean and modern.

## Making It Your Own

Want to customize it? Go for it!

**Colors:** Check out `tailwind.config.js` and mess with the color values there.

**Content:** All the actual content is in `index.html`. Just edit it there and rebuild with `npm run build`.

**Styles:** If you want to add custom components, throw them in `css/input.css` using Tailwind's @apply directive.

## What's Inside

The site has these main sections:
1. Hero section with my intro
2. About me
3. My experience and skills
4. Projects I've worked on
5. Contact info
6. Footer with links

Pretty standard portfolio stuff, but organized in a way that makes sense.

## Browser Compatibility

Works fine on all modern browsers - Chrome, Firefox, Safari, Edge. If you're using Internet Explorer... well, it's 2025, time to upgrade!

## License

This is my personal portfolio, but feel free to use it as inspiration or a starting point for your own. Just please don't straight-up copy it without making it your own - that's not cool.

## About Me

I'm Anand Pathak, and I love building stuff for the web.

- LinkedIn: [rudraofficial](https://linkedin.com/in/rudraofficial)
- GitHub: [rudraofficial](https://github.com/rudraofficial)  
- Email: anandpathakrudra@gmail.com

Feel free to reach out if you want to chat or collaborate on something!

---

Made with Tailwind CSS and way too much coffee ☕

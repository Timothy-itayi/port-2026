export type ProjectCategory = 'personal' | 'web-app' | 'mobile-app';

export interface Project {
	slug: string;
	title: string;
	author: string;
	image: string;
	description: string;
	category: ProjectCategory;
	client?: string;
	year: string;
	techStack: string[];
	content: string;
	githubUrl?: string;
	youtubeUrl?: string;
	liveSiteUrl?: string;
}

export const categoryLabels: Record<ProjectCategory, string> = {
	personal: 'Personal',
	'web-app': 'Web Apps',
	'mobile-app': 'Mobile Apps'
};

export const projects: Project[] = [
	{
		slug: 'amber',
		title: 'Amber',
		author: 'Timothy Itayi',
		image: '/projects/amber-app-icon.png',
		description: 'A single-player mobile game inspired by Papers Please',
		category: 'mobile-app',
		client: 'Amber Ltd',
		year: '2026',
		techStack: ['ReactNative', 'TypeScript', 'GSAP'],
		content: `
			<p>Amber is a grounded surveillance simulation where human decisions have city-wide consequences..</p>
			<h3>Inspiration</h3>
			<p>I was inspired by the concept of Papers Please, where the player is tasked with managing a border control checkpoint and making decisions that have far-reaching consequences.</p>
			<h3>The Challenge</h3>
			<p>Creating a game purley for the IOS device but with a twist. I was not going to procedurally create NPC's like in papers please and was going to write my own story and characters.</p>
		
		`
	},
	{
		slug: 'restock',
		title: 'Restock',
		author: 'Timothy Itayi',
		image: '/projects/restock-icon-app.png',
		description: 'Mobile-first inventory restocking tool for independent retailers — two major versions, from over-engineered hexagonal architecture to a lean, offline-first MVP shipping to the App Store.',
		category: 'mobile-app',
		year: '2025',
		techStack: ['React Native', 'Expo', 'TypeScript', 'Zustand', 'Cloudflare Workers', 'Groq API', 'Resend'],
		content: `
			<p>Restock addresses a real operational pain point: small business and grocery store owners manually managing 50–200 product restocks per location, multiple times a week, with clipboards and spreadsheets. The goal was to reduce a multi-hour, error-prone workflow to a simple Walk → Log → Send loop with AI-powered email generation and smart supplier linking.</p>
			<h3>V1: The Over-Engineered Foundation</h3>
			<p>The first iteration was a full-stack endeavour — React Native with TypeScript, Supabase for PostgreSQL and edge functions, Clerk for multi-provider authentication, and GROQ API for AI email generation. The codebase grew past 10,000 lines and I implemented a hexagonal architecture with domain, application, infrastructure, and UI layers, dependency injection containers, repository patterns, and 85+ unit tests with full domain layer coverage. On paper, enterprise-grade. In practice, the architectural complexity became the bottleneck — context pollution, mixed abstraction levels, and infrastructure coupling made iteration painfully slow for a solo developer.</p>
			<h3>The Pivot Decision</h3>
			<p>Rather than continuing to polish an over-engineered system, I made the call to retire V1 entirely and rebuild from first principles. The core insight: small business owners don't want another login, another cloud dependency, or another subscription to manage. They want something that just works on their device, immediately.</p>
			<h3>V2: Lean, Offline-First, Shipping</h3>
			<p>The rebuild adopted a client-heavy, serverless-light architecture. All data lives on-device via AsyncStorage and Zustand — no login required, no cloud sync, zero-latency UI interactions. The entire backend is two stateless Cloudflare Workers: one for image parsing (Llama 4 Maverick via Groq Vision for OCR on photographed clipboards) and one for sending branded HTML emails via Resend. PDF parsing was scrapped after edge-runtime complications — users prefer photographing their stock sheets anyway.</p>
			<h3>Key Learnings</h3>
			<p>Architecture must serve the product, not the other way around. Hexagonal patterns with DI containers add no value when you're the only engineer and the app needs to ship. Local-first removes 90% of user friction. Model selection matters — Llama 3.2 hallucinated products that didn't exist; Llama 4 Maverick's 128-expert MoE architecture delivers the precision inventory lists demand. V2 is currently in Apple App Store review.</p>
		`,
		githubUrl: 'https://github.com/Timothy-itayi/restock-app-2.0'
	},
	{
		slug: 'bellroy',
		title: 'Bellroy',
		author: 'Timothy Itayi',
		image: '/projects/Bellroy_logo.svg',
		description: 'A deliberate foray into unfamiliar territory — Elm and Astro — to demonstrate adaptability and cross-paradigm front-end competency for a potential role.',
		category: 'personal',
		year: '2025',
		techStack: ['Elm', 'Astro', 'TypeScript'],
		content: `
			<p>Bellroy was built with a specific intent: demonstrate to prospective employers that I could operate outside my comfort zone. I had no prior exposure to Elm or Astro — Elm as a language was completely alien, and Astro's island architecture was a departure from the SPA frameworks I'd been working in. I used React as a mental reference point, then attempted to map those patterns onto Elm's functional paradigm to accelerate the learning curve.</p>
			<h3>Challenges</h3>
			<p>Elm's strict type system and purely functional model required a fundamental shift in how I reasoned about state. There are no side effects, no mutable variables, no escape hatches. The compiler is unforgiving but instructive — every error message became a lesson in correctness. Integrating an Elm component into Astro's build pipeline introduced a second layer of unfamiliarity, requiring manual configuration that neither framework's documentation covered well.</p>
			<h3>Learnings</h3>
			<p>The project reinforced that language-agnostic thinking is the actual transferable skill. Understanding component contracts, data flow, and rendering lifecycles matters more than syntax familiarity. Elm's compiler-driven development also shifted my appreciation for type safety — a perspective that directly influenced my subsequent TypeScript strictness.</p>
		`,
		githubUrl: 'https://github.com/Timothy-itayi/bellroy'
	},
	{
		slug: 'genius-sports',
		title: 'Genius Sports',
		author: 'Timothy Itayi',
		image: '/projects/genuis-sports.png',
		description: 'A reverse-engineering exercise targeting Genius Sports\' micro-interactions — animated buttons and infinite scroll — built to demonstrate React proficiency for a potential role.',
		category: 'web-app',
		year: '2025',
		techStack: ['React', 'Tailwind CSS', 'JavaScript'],
		content: `
			<p>This project was purpose-built as a portfolio piece for a job application at Genius Sports. Rather than submitting a generic CV, I reverse-engineered their homepage's most distinctive front-end behaviours and rebuilt them from scratch in React to demonstrate practical competency and genuine interest in the role.</p>
			<h3>Challenges</h3>
			<p>The homepage featured two interactions that weren't trivial to replicate: animated buttons with directional colour-changing transitions on hover, and a seamless infinite-scroll logo carousel with no visible seams. Both required digging into CSS animation fundamentals — keyframe sequencing, transition timing functions, and pseudo-element layering — at a depth I hadn't previously operated at. The infinite scroll specifically demanded precise clone placement and overflow management to maintain the illusion of continuity.</p>
			<h3>Learnings</h3>
			<p>The project forced a deeper engagement with Tailwind's transition and pseudo-class utilities than typical application work requires. More broadly, the exercise of studying a production site, decomposing its interactions into reproducible components, and rebuilding them independently became a repeatable methodology I applied to subsequent clone projects. Understanding how professional teams implement micro-interactions provided a benchmark for my own front-end output quality.</p>
		`,
		liveSiteUrl: 'https://genius-sports.vercel.app/'
	},
	{
		slug: 'kogan',
		title: 'Kogan',
		author: 'Timothy Itayi',
		image: '/projects/Kogan_logo.png',
		description: 'A pixel-accurate static clone of Kogan\'s product detail page — a fundamentals-first exercise in HTML, CSS, and layout precision for an e-commerce role application.',
		category: 'web-app',
		year: '2025',
		techStack: ['HTML', 'CSS', 'JavaScript'],
		content: `
			<p>Built as a targeted demonstration piece for a potential role at Kogan. The objective was straightforward: prove I could replicate a production e-commerce interface with pixel-level accuracy using nothing but foundational web technologies. No frameworks, no component libraries — just HTML, CSS, and vanilla JavaScript.</p>
			<h3>Challenges</h3>
			<p>Stripping back to fundamentals exposed gaps that frameworks typically abstract away. Spacing systems, typography scales, responsive image galleries, and pricing tier layouts all had to be hand-crafted. Matching Kogan's specific visual language — their colour palette, font weights, component spacing, and information hierarchy — required meticulous attention to detail and repeated comparison against the production site.</p>
			<h3>Learnings</h3>
			<p>The exercise was a deliberate return to basics that proved more valuable than anticipated. Working without framework abstractions reinforced core CSS competencies — box model behaviour, flexbox/grid layout precision, and responsive design patterns. It also developed a sharper eye for visual fidelity: understanding how professional design systems achieve consistency through disciplined spacing, colour, and typographic choices. These fundamentals became the foundation for every subsequent front-end project.</p>
		`,
		liveSiteUrl: 'https://kogan-test.vercel.app/'
	},
	{
		slug: 't2-tea',
		title: 'T2 Tea',
		author: 'Timothy Itayi',
		image: '/projects/t2-logo.png',
		description: 'A front-end clone of T2 Tea\'s e-commerce pages — built with vanilla HTML, CSS, and JavaScript to sharpen foundational web development skills for an industry role.',
		category: 'web-app',
		year: '2025',
		techStack: ['HTML', 'CSS', 'JavaScript', 'Figma'],
		content: `
			<p>T2 was one of my earliest clone projects, built with the explicit goal of breaking into the industry. The target was T2 Tea's product catalog and detail pages — a visually rich e-commerce site that demanded precision in layout, responsive behaviour, and component replication using only foundational technologies.</p>
			<h3>Challenges</h3>
			<p>This was pre-framework territory: no React, no component abstractions, no state management libraries. Every product card, navigation bar, carousel, and detail view had to be constructed from raw HTML and CSS. Responsive behaviour required manual media queries and careful testing across viewports. The carousel component was particularly demanding — managing image transitions, indicator states, and touch responsiveness without a library forced a deep understanding of DOM manipulation and CSS transitions.</p>
			<h3>Learnings</h3>
			<p>Building at this level of abstraction instilled an appreciation for what frameworks actually solve. Understanding the manual effort behind responsive layouts, component reuse patterns, and state synchronisation made the subsequent transition to React and component-based architectures significantly more intuitive. Figma was introduced here as a design reference tool — learning to translate static designs into functional markup became a core workflow that persisted through every project after.</p>
		`,
		githubUrl: 'https://github.com/Timothy-itayi/T2-Clone',
		youtubeUrl: 'https://www.youtube.com/watch?v=RwTk8pEVnSI'
	},
	{
		slug: 'show-down',
		title: 'Show Down',
		author: 'Timothy Itayi',
		image: '/projects/showdown-logo.png',
		description: ' A React Native card battle game where players compete with unique car cards!',
		category: 'mobile-app',
		client: 'Timothy Itayi',
		year: '2025',
		techStack: ['Expo', 'React-Native', 'TypeScript', 'GSAP', 'supabase'],
		content: `
			<p>Inspired by the popular card game TopTrumps where you compare your cards to the opponent's cards and the highest value card wins based on the catergory called.</p>

		
		`,
		githubUrl: 'https://github.com/Timothy-itayi/expo-react-native',
	
	},
	{
		slug: 'coffee-snob',
		title: 'CoffeeSnob',
		author: 'Timothy Itayi',
		image: '/projects/coffee-snob-icon.png',
		description: 'A mobile app that helps you discover and explore cafes using TomTomMapsSDK. Built natively in Swift after iterating from a React Native prototype.',
		category: 'mobile-app',
		year: '2024',
		techStack: ['Swift', 'SwiftUI', 'TomTomSDK', 'Xcode'],
		content: `
			<p>CoffeeSnob helps you discover cafes in your area using an interactive map powered by TomTom. The idea originated from a product designer's prototype — a full-featured cafe finder with auth, favourites, and routing — that I scaled back to focus on the core experience: map display and marker interaction.</p>
			<h3>The Journey</h3>
			<p>The first iteration was built in React Native with Expo, where I coded all front-end components from scratch since no library matched the visual tone I wanted. After hitting scaling walls — no auth, no database support without months of solo work — I went back to the drawing board.</p>
			<h3>Swift Rewrite</h3>
			<p>CoffeeSnobv1.3 was a full rewrite in Swift, a language I'd never used. Google Maps SDK and Firebase were incompatible with my goals (deprecated features, Apple Developer Program blockers), so I pivoted to TomTom. Their SDK was solid but required learning Swift's delegate patterns and map interaction methods from zero.</p>
			<h3>Architecture</h3>
			<p>RouteViewController handles map display and TomTom SDK methods. Cafe data lives in a separate manager file. TomTom's OnInteraction delegate triggers a bottom sheet with cafe cards when markers are tapped. The whole thing was built in a 2-week sprint — week 1 for Swift fundamentals and SDK integration, week 2 for SwiftUI cards and polish.</p>
		`,
		githubUrl: 'https://github.com/Timothy-itayi/CoffeeSnobv1.3',
		youtubeUrl: 'https://www.youtube.com/watch?v=i3jE4w2PQig'
	},
	{
		slug: 'formula1-heritage',
		title: 'Formula1 Heritage',
		author: 'Timothy Itayi',
		image: '/projects/formula1-heritage.jpeg',
		description: 'Second-generation F1 data platform — a post-bootcamp deep dive into component architecture, TypeScript adoption, and UI-Aceternity integration.',
		category: 'web-app',
		year: '2024',
		techStack: ['Next.js', 'TypeScript', 'UI-Aceternity'],
		content: `
			<p>Coming out of Dev Academy, I had a clear gap in my understanding of front-end component architecture — how composable UI primitives actually work under the hood, and how to leverage them at scale. During that self-directed learning phase, I discovered UI-Aceternity. At the time it felt like striking a goldmine — a library offering polished, interactive React components with real visual fidelity. In hindsight, the creator simply executed early on patterns that the broader ecosystem would later commoditise, but I was invested and wanted to stress-test every component in a meaningful context.</p>
			<h3>Domain Context</h3>
			<p>I had entered the Formula 1 ecosystem as a viewer around the 2022 season opener. The sport's data density — driver statistics, constructor lineage, race telemetry — presented an ideal domain for a component-heavy, visually rich front-end. By 2023, that interest materialised into GrandPrix History, my first F1 web platform, built with standard React components and ElevenLabs for audio narration.</p>
			<h3>The Sequel</h3>
			<p>Formula1 Heritage is the second iteration of that initiative. The first version exposed architectural limitations — no type safety, rigid component coupling, and limited interactivity. Heritage addressed those gaps directly: full TypeScript adoption for compile-time guarantees, UI-Aceternity for a richer interaction layer, and a more disciplined component hierarchy. This project was where TypeScript stopped being theoretical and became a practical tool in my workflow.</p>
			<h3>Outcome</h3>
			<p>A production-deployed F1 data experience that serves as both a portfolio piece and a personal benchmark for front-end maturity — evidence of progression from bootcamp React to typed, composable, design-system-driven development.</p>
		`,
		liveSiteUrl: 'https://formula1heritage.cc/'
	},
	{
		slug: 'waitless',
		title: 'Waitless',
		author: 'Timothy Itayi',
		image: '/projects/waitless-logo.png',
		description: 'Capstone project from a 6-month intensive bootcamp — a full-stack restaurant ordering platform built under team lead responsibilities.',
		category: 'web-app',
		year: '2023',
		techStack: ['TypeScript', 'JavaScript', 'Tailwind CSS', 'SQLite'],
		content: `
			<p>Waitless is the culmination of a 6-month in-person software engineering bootcamp at Dev Academy — an intensive programme centred on pair programming, agile methodologies, and delivering production-grade applications under real constraints. This capstone project synthesised everything the cohort had learned into a single, end-to-end deliverable.</p>
			<h3>Leadership & Role Allocation</h3>
			<p>I served as team lead for a five-person engineering squad. Responsibilities included task delegation, sprint coordination, and stakeholder alignment. I assigned each team member to areas that leveraged their strengths while ensuring knowledge transfer across the stack. My individual contributions focused on the payment integration pipeline, transactional UI flows (success/failure states), and brand identity — including designing the Waitless logo from concept to final asset.</p>
			<h3>Challenges</h3>
			<p>Candidly, we were not the strongest cohort. Skill distribution was uneven, timelines were aggressive, and the scope of a full-stack ordering platform with QR-code integration, admin tooling, and a payment layer was ambitious for the team's experience level. Managing delivery velocity while maintaining code quality required constant re-prioritisation and hands-on mentorship.</p>
			<h3>Outcomes</h3>
			<p>Despite the constraints, we shipped a functional product: QR-driven table ordering, real-time kitchen order management, an admin panel for menu CRUD operations, and branded payment flows. The project demonstrated that structured leadership, clear role definition, and relentless scope management can compensate for raw technical gaps.</p>
		`,
		githubUrl: 'https://github.com/Timothy-itayi/Waitless'
	},
	{
		slug: 'soundscape',
		title: 'Soundscape',
		author: 'Timothy Itayi',
		image: '/projects/soundscape-logo.png',
		description: 'A web-based music player born from an unfinished bootcamp personal project — resurrected post-graduation with deeper CSS exploration and React lifecycle mastery.',
		category: 'personal',
		year: '2023',
		techStack: ['React', 'CSS', 'JavaScript'],
		content: `
			<p>Soundscape originated as a personal project during Dev Academy — each student was tasked with building something of their own in React before moving into the final group project. I wanted to build a music player. The ambition was there; the execution was not. The player would initiate playback but never terminate it — an unresolved component lifecycle issue where the audio context failed to unmount correctly. Time constraints forced the cohort forward into the group phase, and the project was shelved incomplete.</p>
			<h3>The Resurrection</h3>
			<p>Post-graduation, with a firmer grasp on React hooks, component lifecycles, and state management patterns, I revisited the concept from scratch. The core playback bug — persistent audio state surviving component unmounts — was resolved through proper cleanup functions in useEffect hooks. What had been a blocking deficiency during the bootcamp became a straightforward engineering problem with a few more months of experience.</p>
			<h3>CSS as a Creative Medium</h3>
			<p>The rebuild became an unexpected deep dive into CSS craftsmanship. I discovered the potential of nested div structures for CSS art — constructing the retro TV housing and vinyl record visualisations entirely through layered markup and styling. CodePen became a significant influence during this phase, exposing me to the creative coding community and inspiring the visual direction. The TV aesthetic that characterises Soundscape's interface was a direct product of that exploration.</p>
			<h3>Outcome</h3>
			<p>A deployed, functional music player that serves as evidence of a specific growth trajectory — from being unable to debug a component lifecycle issue to shipping a polished product with custom CSS art, proper audio state management, and a distinctive visual identity. Sometimes the best projects are the ones you failed at first.</p>
		`,
		liveSiteUrl: 'https://redesigned-tribble.vercel.app/'
	}
];

export const getProjectsByCategory = (cat: ProjectCategory): Project[] =>
	projects.filter((p) => p.category === cat);

export const getFeaturedProject = (): Project => projects[0];

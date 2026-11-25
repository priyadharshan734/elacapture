import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Album,
  Aperture,
  Baby,
  Box,
  Building2,
  Cake,
  Camera,
  Clapperboard,
  Drone,
  Film,
  Gem,
  GraduationCap,
  Heart,
  HeartHandshake,
  Laptop,
} from "lucide-react";

const t = (english) => english;
const imageUrl = (id, width = 1000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
const placeholderImage = (label) =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#e7c978"/><stop offset=".5" stop-color="#aab08a"/><stop offset="1" stop-color="#8e4a3a"/></linearGradient></defs><rect width="800" height="600" fill="url(#g)"/><rect x="24" y="24" width="752" height="552" fill="none" stroke="#fff" stroke-opacity=".72" stroke-width="3"/><text x="400" y="300" fill="#fff" font-family="Arial,sans-serif" font-size="38" text-anchor="middle">${label}</text></svg>`,
  )}`;

const mediaImages = {
  hero: placeholderImage("Add Wedding Hero Photo"),
  packages: [
    placeholderImage("Package 1 Photo"),
    placeholderImage("Package 2 Photo"),
    placeholderImage("Package 3 Photo"),
    placeholderImage("Package 4 Photo"),
  ],
  gallery: [
    { image: placeholderImage("Wedding Photo 1"), category: "Wedding", alt: "Wedding moment placeholder photo 1" },
    { image: placeholderImage("Reception Photo 1"), category: "Reception", alt: "Reception moment placeholder photo 1" },
    { image: placeholderImage("Pre-Wedding Photo 1"), category: "Pre-Wedding", alt: "Pre-wedding moment placeholder photo 1" },
    { image: placeholderImage("Candid Photo 1"), category: "Candid", alt: "Candid moment placeholder photo 1" },
    { image: placeholderImage("Album Photo 1"), category: "Albums", alt: "Premium album placeholder photo 1" },
    { image: placeholderImage("Wedding Photo 2"), category: "Wedding", alt: "Wedding moment placeholder photo 2" },
    { image: placeholderImage("Reception Photo 2"), category: "Reception", alt: "Reception moment placeholder photo 2" },
    { image: placeholderImage("Pre-Wedding Photo 2"), category: "Pre-Wedding", alt: "Pre-wedding moment placeholder photo 2" },
    { image: placeholderImage("Candid Photo 2"), category: "Candid", alt: "Candid moment placeholder photo 2" },
    { image: placeholderImage("Album Photo 2"), category: "Albums", alt: "Couple magazine placeholder photo" },
    { image: placeholderImage("Wedding Photo 3"), category: "Wedding", alt: "Wedding moment placeholder photo 3" },
    { image: placeholderImage("Candid Photo 3"), category: "Candid", alt: "Candid moment placeholder photo 3" },
  ],
  albums: [
    { image: placeholderImage("Premium Album"), alt: "Premium wedding album placeholder", caption: "Premium Album" },
    { image: placeholderImage("Coffee Table Album"), alt: "Coffee table album placeholder", caption: "Coffee Table Album" },
    { image: placeholderImage("Couple Magazine"), alt: "Couple magazine placeholder", caption: "Couple Magazine" },
    { image: placeholderImage("Wedding Frame"), alt: "Wedding photograph frame placeholder", caption: "Frames" },
  ],
  videoThumbnail: placeholderImage("Add Highlight Film Thumbnail"),
  social: [
    { image: placeholderImage("Instagram 1"), alt: "Ela Capture Instagram photo placeholder 1" },
    { image: placeholderImage("Instagram 2"), alt: "Ela Capture Instagram photo placeholder 2" },
    { image: placeholderImage("Instagram 3"), alt: "Ela Capture Instagram photo placeholder 3" },
    { image: placeholderImage("Instagram 4"), alt: "Ela Capture Instagram photo placeholder 4" },
    { image: placeholderImage("Instagram 5"), alt: "Ela Capture Instagram photo placeholder 5" },
    { image: placeholderImage("Instagram 6"), alt: "Ela Capture Instagram photo placeholder 6" },
  ],
};

const categories = [
  { id: "wedding", en: "Wedding", ta: "திருமணம்", note: "Kalyanam", image: "photo-1606216794074-735e91aa2c92", photos: ["photo-1606800052052-a08af7148866", "photo-1519741497674-611481863552"] },
  { id: "engagement", en: "Engagement", ta: "நிச்சயதார்த்தம்", note: "A promise, beautifully kept", image: "photo-1522673607200-164d1b6ce486", photos: ["photo-1529636798458-92182e662485", "photo-1532712938310-34cb3982ef74"] },
  { id: "prewedding", en: "Pre & Post Wedding", ta: "திருமணத்திற்கு முன் & பின்", note: "A little time, just for two", image: "photo-1511285560929-80b456fea0bc", photos: ["photo-1511285560929-80b456fea0bc", "photo-1523438885200-e635ba2c371e"] },
  { id: "babyshower", en: "Baby Shower", ta: "வளைகாப்பு", note: "Seemantham", image: "photo-1511895426328-dc8714191300", photos: ["photo-1492725764893-90b379c2b6e7", "photo-1511895426328-dc8714191300"] },
  { id: "earpiercing", en: "Ear Piercing", ta: "காது குத்து விழா", note: "A tiny, brave moment", image: "photo-1530103862676-de8c9debad1d", photos: ["photo-1530103862676-de8c9debad1d", "photo-1513151233558-d860c5398176"] },
  { id: "puberty", en: "Coming of Age", ta: "மஞ்சள் நீராட்டு விழா", note: "A day of becoming", image: "photo-1542038784456-1ea8e935640e", photos: ["photo-1542038784456-1ea8e935640e", "photo-1531058020387-3be344556be6"] },
  { id: "housewarming", en: "House Warming", ta: "புதுமனை புகுவிழா", note: "A new home, a full heart", image: "photo-1600210492486-724fe5c67fb0", photos: ["photo-1600210492486-724fe5c67fb0", "photo-1600607687939-ce8a6c25118c"] },
  { id: "birthday", en: "Birthday & Naming", ta: "பிறந்தநாள் & பெயர் சூட்டு விழா", note: "Little years, big memories", image: "photo-1464366400600-7168b8af9bc3", photos: ["photo-1464366400600-7168b8af9bc3", "photo-1530103862676-de8c9debad1d"] },
  { id: "temple", en: "Temple Festival", ta: "கோவில் திருவிழா", note: "Faith, colour & community", image: "photo-1514525253161-7a46d19cd819", photos: ["photo-1514525253161-7a46d19cd819", "photo-1519671482749-fd09be7ccebf"] },
  { id: "pongal", en: "Pongal & Festivals", ta: "பொங்கல் & பண்டிகைகள்", note: "Our traditions, together", image: "photo-1547592180-85f173990554", photos: ["photo-1547592180-85f173990554", "photo-1504674900247-0877df9cc836"] },
  { id: "portraits", en: "Corporate & Portraits", ta: "நிறுவன & குடும்பப் படங்கள்", note: "The people behind it all", image: "photo-1521737711867-e3b97375f902", photos: ["photo-1521737711867-e3b97375f902", "photo-1500648767791-00dcc994a43e"] },
];
const galleryItems = categories.flatMap((category) =>
  category.photos.map((image, index) => ({
    id: `${category.id}-${index}`,
    category: category.id,
    image,
    title: index === 0 ? "The first light" : "A moment to keep",
  })),
);

const posts = [
  { date: "12.08.26", category: "WEDDINGS", image: "photo-1606800052052-a08af7148866", en: "Best Poses for Tamil Wedding Photos", ta: "தமிழ்த் திருமணப் படங்களுக்கான அழகான போஸ்கள்", excerpt: ["Natural, joyful frames that feel like you — from the first look to the last dance.", "உங்களுக்கே உரிய இயல்பான மகிழ்ச்சியான தருணங்கள் — முதல் பார்வை முதல் இறுதி நடனம் வரை."] },
  { date: "28.07.26", category: "PLANNING", image: "photo-1519741497674-611481863552", en: "Planning Your Muhurtham Photography", ta: "முகூர்த்தப் புகைப்படங்களைத் திட்டமிடுவது எப்படி", excerpt: ["A simple timeline for rituals, family portraits, and all the in-between moments.", "சடங்குகள், குடும்பப் படங்கள் மற்றும் இடைப்பட்ட தருணங்களுக்கான எளிய நேர அட்டவணை."] },
  { date: "03.06.26", category: "TRADITION", image: "photo-1591604466107-ec97de577aff", en: "Traditional Dress, Beautifully Yours", ta: "உங்களுக்கான பாரம்பரிய ஆடைத் தேர்வுகள்", excerpt: ["Sarees, veshtis, heirloom jewellery — a few ideas for a portrait that feels timeless.", "பட்டு, வேட்டி, பாரம்பரிய நகைகள் — என்றும் அழகாக இருக்கும் படங்களுக்கான சில யோசனைகள்."] },
  { date: "17.04.26", category: "FAMILY", image: "photo-1511895426328-dc8714191300", en: "The Little Details We Remember", ta: "நினைவில் நிற்கும் சின்னச் சின்ன தருணங்கள்", excerpt: ["A grandmother's blessing, a shared laugh, the kolam at the doorway — keep it all.", "பாட்டியின் ஆசீர்வாதம், பகிர்ந்த சிரிப்பு, வாசல் கோலம் — அனைத்தையும் நினைவாக வைத்துக்கொள்ளுங்கள்."] },
];

const albumPages = [
  { image: "photo-1606216794074-735e91aa2c92", en: "A day held close", ta: "மனதில் என்றும் நிற்கும் நாள்" },
  { image: "photo-1606800052052-a08af7148866", en: "The rituals we cherish", ta: "நாம் போற்றும் சடங்குகள்" },
  { image: "photo-1591604466107-ec97de577aff", en: "A family, a thousand stories", ta: "ஒரு குடும்பம், ஆயிரம் கதைகள்" },
];

const socials = ["instagram", "facebook", "youtube"];
const instagramUrl = "https://www.instagram.com/ela_sivaom/";
const facebookUrl = "https://www.facebook.com/p/Ela-Capture-100071858212820/";
const adminWhatsAppNumber = "918608337304";
const bookingStorageKey = "ela-capture-bookings";
const packageDetails = [
  {
    id: "1",
    name: ["Package 1", "தொகுப்பு 1"],
    length: ["WEDDING", "திருமணம்"],
    price: "₹59,999",
    items: [
      ["Traditional Photography", "பாரம்பரிய புகைப்படம்"], ["Traditional Videography", "பாரம்பரிய வீடியோகிராஃபி"],
      ["Wedding Highlights", "திருமண சிறப்புத் தொகுப்பு"], ["Full Length Wedding Video", "முழு நீள திருமண வீடியோ"],
      ["Premium Album (1)", "பிரீமியம் ஆல்பம் (1)"], ["Coffee Table Albums (2)", "காஃபி டேபிள் ஆல்பங்கள் (2)"],
      ["Frames & Calendars", "பிரேம்கள் & காலெண்டர்கள்"], ["Pre/Post Wedding Shoot", "திருமணத்துக்கு முன்/பின் புகைப்படம்"],
    ],
  },
  {
    id: "2",
    name: ["Package 2", "தொகுப்பு 2"],
    length: ["MOST POPULAR", "மிகப் பிரபலமானது"],
    price: "₹1,49,999",
    featured: true,
    items: [
      ["Traditional Photography", "பாரம்பரிய புகைப்படம்"], ["Traditional Videography", "பாரம்பரிய வீடியோகிராஃபி"],
      ["Candid Photography", "கேண்டிட் புகைப்படம்"], ["Candid Videography + Drone", "கேண்டிட் வீடியோகிராஃபி + ட்ரோன்"],
      ["Cinematic Teaser", "சினிமாடிக் டீசர்"], ["High-end Retouched Images", "உயர்தர எடிட்டிங் செய்யப்பட்ட படங்கள்"],
      ["Cinematic Wedding Highlights", "சினிமாடிக் திருமண சிறப்புத் தொகுப்பு"], ["Cinematic Wedding Story", "சினிமாடிக் திருமணக்கதை"],
      ["Full Length Wedding Video", "முழு நீள திருமண வீடியோ"], ["Save the Date Video", "தேதி நினைவூட்டல் வீடியோ"],
      ["Premium Album (1)", "பிரீமியம் ஆல்பம் (1)"], ["Coffee Table Albums (2)", "காஃபி டேபிள் ஆல்பங்கள் (2)"],
      ["Frames & Calendars", "பிரேம்கள் & காலெண்டர்கள்"], ["3 Wedding Reels", "3 திருமண ரீல்கள்"],
      ["Pre/Post Wedding Shoot", "திருமணத்துக்கு முன்/பின் புகைப்படம்"], ["Save the Date / Cinematic Song", "தேதி நினைவூட்டல் / சினிமாடிக் பாடல்"],
    ],
  },
  {
    id: "3",
    name: ["Package 3", "தொகுப்பு 3"],
    length: ["WEDDING", "திருமணம்"],
    price: "₹99,999",
    items: [
      ["Traditional Photography", "பாரம்பரிய புகைப்படம்"], ["Traditional Videography", "பாரம்பரிய வீடியோகிராஃபி"],
      ["Candid Photography", "கேண்டிட் புகைப்படம்"], ["Wedding Highlights", "திருமண சிறப்புத் தொகுப்பு"],
      ["Full Length Wedding Video", "முழு நீள திருமண வீடியோ"], ["High-end Retouched Images", "உயர்தர எடிட்டிங் செய்யப்பட்ட படங்கள்"],
      ["Premium Album (1)", "பிரீமியம் ஆல்பம் (1)"], ["Coffee Table Albums (2)", "காஃபி டேபிள் ஆல்பங்கள் (2)"],
      ["Frames & Calendars", "பிரேம்கள் & காலெண்டர்கள்"], ["Pre/Post Wedding Shoot", "திருமணத்துக்கு முன்/பின் புகைப்படம்"],
    ],
  },
  {
    id: "4",
    name: ["Package 4", "தொகுப்பு 4"],
    length: ["WEDDING & RECEPTION", "திருமணம் & வரவேற்பு"],
    price: "₹1,30,000",
    items: [
      ["WEDDING TEAM", "திருமண குழு"], ["1 Traditional Photographer", "1 பாரம்பரிய புகைப்படக்கலைஞர்"],
      ["1 Traditional Videographer", "1 பாரம்பரிய வீடியோ கலைஞர்"], ["1 Candid Cinematographer", "1 கேண்டிட் சினிமாடோகிராஃபர்"],
      ["1 Candid Photographer", "1 கேண்டிட் புகைப்படக்கலைஞர்"], ["RECEPTION TEAM", "வரவேற்பு குழு"],
      ["1 Traditional Photographer", "1 பாரம்பரிய புகைப்படக்கலைஞர்"], ["1 Traditional Videographer", "1 பாரம்பரிய வீடியோ கலைஞர்"],
      ["1 Candid Cinematographer", "1 கேண்டிட் சினிமாடோகிராஃபர்"], ["1 Candid Photographer", "1 கேண்டிட் புகைப்படக்கலைஞர்"],
      ["DELIVERABLES", "வழங்கப்படுபவை"], ["2 Premium Canvera Albums — 12x36, 160 pages, 450 traditional + candid photos", "2 பிரீமியம் கேன்வேரா ஆல்பங்கள் — 12x36, 160 பக்கங்கள், 450 பாரம்பரிய + கேண்டிட் படங்கள்"],
      ["4K Traditional Video for Wedding & Reception", "திருமணம் & வரவேற்புக்கு 4K பாரம்பரிய வீடியோ"], ["1 4K Cinematography Highlight Video (4–5 min)", "1 4K சினிமாடோகிராஃபி சிறப்புத் தொகுப்பு (4–5 நிமிடம்)"],
      ["1 Teaser Cut Video", "1 டீசர் வீடியோ"], ["1 Couple Magazine (30 photos)", "1 தம்பதியர் மேகசின் (30 படங்கள்)"],
      ["1 Save the Date Video (for pre-wedding only)", "1 சேவ் தி டேட் வீடியோ (முன் திருமணப் படப்பிடிப்புக்கு மட்டும்)"],
      ["Full event images (JPEG format)", "முழு நிகழ்வு படங்கள் (JPEG வடிவம்)"], ["30 Social Media Pictures", "30 சமூக ஊடகப் படங்கள்"],
      ["E-Album", "மின்னணு ஆல்பம்"], ["2 Frames (18x12) or 1 Frame (16x24)", "2 பிரேம்கள் (18x12) அல்லது 1 பிரேம் (16x24)"], ["1 Pen drive", "1 பென் டிரைவ்"],
      ["COMPLIMENTARY", "இலவச கூடுதல் சேவைகள்"], ["Drone — 1 session for Reception", "ட்ரோன் — வரவேற்புக்கு 1 அமர்வு"],
      ["2 Replica Mini Albums", "2 ரெப்ளிகா மினி ஆல்பங்கள்"], ["4 Hrs Pre or Post Wedding Shoot (before/after 30 days)", "4 மணி நேர முன்/பின் திருமணப் படப்பிடிப்பு (30 நாட்களுக்கு முன் அல்லது பின்)"], ["2 Calendars", "2 காலெண்டர்கள்"],
    ],
  },
];

function LanguageProvider({ children }) {
  useEffect(() => {
    document.documentElement.lang = "en";
  }, []);
  return children;
}

function useLanguage() {
  return { lang: "en" };
}

function SocialIcon({ name }) {
  const icons = {
    instagram: <><rect x="4" y="4" width="12" height="12" rx="3" /><circle cx="10" cy="10" r="3" /><circle cx="14" cy="6.5" r=".7" fill="currentColor" stroke="none" /></>,
    facebook: <path d="M12.5 7H11V5.8c0-.5.3-.7.8-.7h.8V3h-1.4C9.4 3 9 4.5 9 5.7V7H7.5v2H9v6h2V9h1.4l.1-2Z" />,
    youtube: <><rect x="3" y="5" width="14" height="10" rx="3" /><path d="m8 7.8 4.5 2.2L8 12.2V7.8Z" fill="currentColor" stroke="none" /></>,
  };
  return (
    <a className="social-link" href={name === "instagram" ? instagramUrl : name === "facebook" ? facebookUrl : `https://www.${name}.com/`} aria-label={name} target="_blank" rel="noreferrer">
      <svg viewBox="0 0 20 20" aria-hidden="true">{icons[name]}</svg>
    </a>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({ eyebrow, children, centered = false }) {
  return (
    <div className={`section-title${centered ? " centered" : ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{children}</h2>
      <span className="title-rule" />
    </div>
  );
}

function KolamDivider({ className = "" }) {
  return (
    <div className={`kolam-divider ${className}`} aria-hidden="true">
      <svg viewBox="0 0 180 38" fill="none">
        <path d="M12 19h34c11 0 11-13 22-13h44c11 0 11 13 22 13h34M12 19h34c11 0 11 13 22 13h44c11 0 11-13 22-13h34" />
        <path d="M72 19c0-10 18-10 18 0s-18 10-18 0Zm18 0c0-10 18-10 18 0s-18 10-18 0ZM28 19c0-4 7-4 7 0s-7 4-7 0Zm117 0c0-4 7-4 7 0s-7 4-7 0Z" />
        <circle cx="90" cy="19" r="2" fill="currentColor" stroke="none" />
      </svg>
    </div>
  );
}

function MangoGarland() {
  return (
    <div className="mango-garland" aria-hidden="true">
      <svg viewBox="0 0 1440 58" preserveAspectRatio="none">
        <path className="garland-string" d="M0 5 Q720 88 1440 5" />
        {Array.from({ length: 19 }, (_, index) => {
          const x = 25 + index * 77;
          const y = 7 + Math.sin((index / 18) * Math.PI) * 35;
          return <g className="mango-leaf" key={x} transform={`translate(${x} ${y}) rotate(${index % 2 ? 36 : -36})`}><path d="M0 0C-8-10-7-19 0-23 7-19 8-10 0 0Z" /><path d="M0-2v-17" /></g>;
        })}
      </svg>
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    ["Home", "#home"],
    ["About", "#about"],
    ["Portfolio", "#portfolio"],
    ["Services", "#services"],
    ["Blog", "#blog"],
    ["Contact", "#contact"],
  ];
  return (
    <header className="site-header">
      <div className="nav-shell">
        <a className="brand" href="#home" onClick={() => setMenuOpen(false)} aria-label="Ela Capture home">
          <img className="brand-logo" src="/ela-capture-logo.png" alt="Ela Capture" />
        </a>
        <button className={`menu-toggle${menuOpen ? " is-open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
          <span /><span />
        </button>
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
          {links.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <span className="nav-divider" />
          <div className="nav-socials">{socials.map((name) => <SocialIcon name={name} key={name} />)}</div>
        </nav>
      </div>
    </header>
  );
}

function Gopuram() {
  return (
    <svg className="gopuram-silhouette" viewBox="0 0 230 440" fill="none" aria-hidden="true">
      <path d="M115 20 145 50h-9l26 28h-13l24 28h-15l23 29H49l23-29H57l24-28H67l26-28h-9l31-30Z" />
      <path d="M64 135h102v13H64zM74 151h82v12H74zM82 166h66v13H82zM88 182h54v14H88zM94 199h42v13H94zM99 216h32v95H99zM84 311h62v11H84zM75 326h80v12H75zM67 342h96v13H67zM59 359h112v14H59zM48 377h134v15H48zM42 395h146v22H42z" />
      <path d="M106 36h18v20h-18zM91 82h48v12H91zM78 112h74v12H78zM108 232h14v22h-14zM107 271h16v16h-16z" />
    </svg>
  );
}

function Hero() {
  const { lang } = useLanguage();
  return (
    <>
      <MangoGarland />
      <section className="hero page-wrap hero-with-background" id="home" style={{ "--hero-photo": `url("${mediaImages.hero}")` }}>
        <div className="hero-background" aria-hidden="true" />
        <div className="hero-copy hero-copy-on-photo">
          <span className="eyebrow">{t("TAMIL NADU · PHOTOGRAPHY · FILM", "தமிழ்நாடு · புகைப்படம் · திரைப்படம்", lang)}</span>
          <h1 lang={lang}>{t("Capturing Your Traditions & Celebrations", "உங்கள் பாரம்பரியத்தையும் கொண்டாட்டங்களையும் படம் பிடிக்கிறோம்", lang)}<span className="hero-period">.</span></h1>
          <p className="hero-location">{t("In Erode, Tamil Nadu", "ஈரோடு, தமிழ்நாட்டில்", lang)}</p>
          <p className="hero-description">{t("Warm, honest photographs for the moments your family will tell stories about.", "உங்கள் குடும்பம் தலைமுறைகள் கடந்தும் பேசும் தருணங்களுக்கான அன்பான, உண்மையான புகைப்படங்கள்.", lang)}</p>
          <a className="button" href="#contact">{t("BOOK NOW", "முன்பதிவு செய்ய", lang)} <span aria-hidden="true">↗</span></a>
          <span className="hero-index">ERODE <i /> TAMIL NADU</span>
        </div>
        <div className="hero-image-wrap">
          <Gopuram />
          <div className="hero-frame">
            <img className="hero-image" src={imageUrl("photo-1583939003579-730e3918a45a", 1300)} alt={t("A couple celebrating their wedding in warm afternoon light", "மாலை ஒளியில் திருமணத்தை மகிழ்ச்சியாகக் கொண்டாடும் மணமக்கள்", lang)} fetchPriority="high" />
          </div>
          <div className="hero-image-caption"><span>{t("A DAY FULL OF MEANING", "அர்த்தம் நிறைந்த நாள்", lang)}</span><span>ERODE · 11°20'N</span></div>
          <div className="hero-seal" aria-hidden="true"><span>ROOTED IN TRADITION<br />MADE TO BE KEPT</span><b>✳</b></div>
        </div>
        <a className="scroll-cue" href="#about"><span>{t("SCROLL TO EXPLORE", "தொடர்ந்து பார்க்க", lang)}</span><i /></a>
      </section>
    </>
  );
}

function About() {
  const { lang } = useLanguage();
  const stats = [
    ["12+", t("Years of experience", "ஆண்டுகள் அனுபவம்", lang)],
    ["850+", t("Events covered", "பதிவு செய்த நிகழ்வுகள்", lang)],
    ["600+", t("Happy families", "மகிழ்ச்சியான குடும்பங்கள்", lang)],
  ];
  return (
    <section className="about section-space" id="about">
      <Reveal className="about-image-wrap">
        <img src={imageUrl("photo-1583939003579-730e3918a45a", 1100)} alt={t("A candid wedding portrait", "திருமணத்தில் எடுக்கப்பட்ட இயல்பான புகைப்படம்", lang)} loading="lazy" />
        <span className="about-photo-note">{t("ROOTED HERE. REMEMBERED EVERYWHERE.", "இங்கே வேரூன்றி, எங்கும் நினைவில்.", lang)}</span>
      </Reveal>
      <Reveal className="about-copy" delay={0.12}>
        <SectionTitle eyebrow={t("A LITTLE ABOUT OUR STUDIO", "எங்கள் ஸ்டுடியோ பற்றி", lang)}>{t("Stories that feel like home", "வீட்டைப் போல உணர வைக்கும் கதைகள்", lang)}</SectionTitle>
        <p className="lead-copy" lang={lang}>{t("Vanakkam, we’re Ela Capture — a family photography studio in the heart of Erode.", "வணக்கம், நாங்கள் எலா கேப்ச்சர் — ஈரோட்டின் இதயத்தில் இயங்கும் குடும்பப் புகைப்பட ஸ்டுடியோ.", lang)}</p>
        <p>{t("From the quiet of a muhurtham morning to the happy noise of a full house, we photograph the rituals, relationships, and little details that make your celebration yours.", "முகூர்த்தக் காலையின் அமைதியிலிருந்து நிறைந்த வீட்டின் மகிழ்ச்சியான ஓசை வரை — உங்கள் விழாவை தனித்துவமாக்கும் சடங்குகள், உறவுகள், சின்னச் சின்ன விவரங்களைப் பதிவு செய்கிறோம்.", lang)}</p>
        <p>{t("With more than a decade behind the lens, our small local team knows when to step in, when to step back, and how to make every generation feel at ease.", "பன்னிரண்டு ஆண்டுகளுக்கும் மேலான அனுபவத்துடன், எப்போது அருகில் இருக்க வேண்டும், எப்போது விலகி இருக்க வேண்டும், எல்லா வயதினரையும் எப்படி இயல்பாக உணரச் செய்ய வேண்டும் என்பதை எங்கள் குழு அறியும்.", lang)}</p>
        <div className="about-stats">{stats.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
        <a className="button" href="#portfolio">{t("VIEW OUR WORK", "எங்கள் படங்களைப் பாருங்கள்", lang)} <span aria-hidden="true">↗</span></a>
      </Reveal>
    </section>
  );
}

function EventShoots() {
  const { lang } = useLanguage();
  const services = [
    { Icon: Camera, en: "Wedding Photo / Videography", ta: "திருமண புகைப்படம் / வீடியோ", detail: "Traditional and candid coverage of your wedding rituals, family, and celebration.", detailTa: "திருமணச் சடங்குகள், குடும்பம் மற்றும் கொண்டாட்டங்களை பாரம்பரியமாகவும் கேண்டிட் முறையிலும் பதிவு செய்கிறோம்." },
    { Icon: Gem, en: "Pre / Post Wedding Shoot", ta: "திருமணத்திற்கு முன் / பின்", detail: "Relaxed couple portraits before or after your wedding day.", detailTa: "திருமண நாளுக்கு முன்போ பின்போ இயல்பான ஜோடி புகைப்படங்கள்." },
    { Icon: Baby, en: "Toddlers & Baby Shoot", ta: "குழந்தைகள் புகைப்படம்", detail: "Gentle, playful portraits that capture your little one's growing years.", detailTa: "உங்கள் குழந்தையின் வளர்ச்சிப் பருவத்தை அன்பாகப் பதிவு செய்யும் புகைப்படங்கள்." },
    { Icon: Aperture, en: "Events Photography", ta: "நிகழ்வு புகைப்படம்", detail: "Thoughtful coverage for family celebrations, cultural events, and gatherings.", detailTa: "குடும்ப விழாக்கள், பண்பாட்டு நிகழ்வுகள் மற்றும் சந்திப்புகளுக்கான புகைப்படப் பதிவு." },
    { Icon: Clapperboard, en: "Cinematic Videography", ta: "சினிமாடிக் வீடியோ", detail: "A story-led film with the sounds, details, and feeling of your day.", detailTa: "உங்கள் நாளின் ஒலிகள், விவரங்கள் மற்றும் உணர்வுகளைச் சொல்லும் திரைப்படம்." },
    { Icon: Drone, en: "Droneography / Real Estate", ta: "ட்ரோன் / ரியல் எஸ்டேட்", detail: "Aerial photo and video coverage for events, properties, and locations.", detailTa: "நிகழ்வுகள், வீடுகள் மற்றும் இடங்களுக்கான வான்வழி புகைப்படம் மற்றும் வீடியோ." },
    { Icon: Album, en: "Album Design", ta: "ஆல்பம் வடிவமைப்பு", detail: "A carefully curated album layout made to revisit and share.", detailTa: "மீண்டும் பார்த்து பகிரக்கூடிய வகையில் கவனமாக வடிவமைக்கப்படும் ஆல்பம்." },
    { Icon: Film, en: "Video Editing", ta: "வீடியோ எடிட்டிங்", detail: "Polished edits for event films, highlight reels, and social content.", detailTa: "நிகழ்வு திரைப்படங்கள், சிறப்புத் தொகுப்புகள் மற்றும் சமூக ஊடக உள்ளடக்கங்களுக்கான எடிட்டிங்." },
    { Icon: Heart, en: "Anniversary / House Warming", ta: "ஆண்டு விழா / புதுமனை புகுவிழா", detail: "Celebrate milestones and new beginnings with warm, natural coverage.", detailTa: "மைல்கற்களையும் புதிய தொடக்கங்களையும் இயல்பான அன்புடன் பதிவு செய்கிறோம்." },
    { Icon: HeartHandshake, en: "Engagement", ta: "நிச்சயதார்த்தம்", detail: "Keep the promises, family blessings, and joyful moments of your engagement.", detailTa: "நிச்சயதார்த்தத்தின் வாக்குறுதிகள், குடும்ப வாழ்த்துகள் மற்றும் மகிழ்ச்சியான தருணங்கள்." },
    { Icon: Cake, en: "Birthday Shoot", ta: "பிறந்தநாள் புகைப்படம்", detail: "From little candles to a lively party, we capture the day as it unfolds.", detailTa: "சிறிய மெழுகுவர்த்திகள் முதல் கலகலப்பான விழா வரை அன்றைய மகிழ்ச்சியைப் பதிவு செய்கிறோம்." },
    { Icon: Building2, en: "Corporate Shoot", ta: "கார்ப்பரேட் புகைப்படம்", detail: "Professional portraits and brand imagery for teams and businesses.", detailTa: "குழுக்கள் மற்றும் நிறுவனங்களுக்கான தொழில்முறை உருவப்படங்கள் மற்றும் பிராண்ட் படங்கள்." },
    { Icon: Box, en: "Product / Documentary Shoot", ta: "தயாரிப்பு / ஆவணப்படம்", detail: "Clear product photography and documentary storytelling for your work.", detailTa: "உங்கள் தயாரிப்புகளுக்கான தெளிவான படங்கள் மற்றும் ஆவணக் கதைசொல்லல்." },
    { Icon: Laptop, en: "Social Media Handling / Digital Marketing", ta: "சமூக ஊடகம் / டிஜிட்டல் மார்க்கெட்டிங்", detail: "Visual content and digital support to help your brand connect online.", detailTa: "உங்கள் பிராண்ட் இணையத்தில் மக்களைச் சென்றடைய காட்சிப்பட உள்ளடக்கம் மற்றும் டிஜிட்டல் ஆதரவு." },
    { Icon: HeartHandshake, en: "Maternity Shoot", ta: "மகப்பேறு புகைப்படம்", detail: "Celebrate this special season with comfortable, heartfelt portraits.", detailTa: "இந்தச் சிறப்பான காலத்தை வசதியான, மனமார்ந்த புகைப்படங்களால் கொண்டாடுங்கள்." },
    { Icon: GraduationCap, en: "School / College Events", ta: "பள்ளி / கல்லூரி நிகழ்வுகள்", detail: "Capture ceremonies, performances, and campus milestones for your community.", detailTa: "சமூகத்திற்கான விழாக்கள், நிகழ்ச்சிகள் மற்றும் வளாக மைல்கற்களைப் பதிவு செய்கிறோம்." },
  ];
  const [selectedService, setSelectedService] = useState(null);
  useEffect(() => {
    if (!selectedService) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setSelectedService(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    document.body.classList.add("lightbox-open");
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.body.classList.remove("lightbox-open");
    };
  }, [selectedService]);
  const selectService = (service) => {
    sessionStorage.setItem("ela-capture-selected-service", service.en);
    window.dispatchEvent(new CustomEvent("ela-capture-service-selected"));
  };
  const selectedServiceIndex = selectedService
    ? services.findIndex((service) => service.en === selectedService.en)
    : -1;
  return (
    <section className="services-section section-space" id="events">
      <Reveal>
        <div className="services-title">
          <span />
          <h2>Our Services<small>எங்கள் சேவைகள்</small></h2>
          <span />
        </div>
        <KolamDivider className="services-kolam" />
      </Reveal>
      <div className="services-list">
        {services.map((service, index) => {
          const Icon = service.Icon;
          return (
          <Reveal key={service.en} delay={(index % 4) * 0.055}>
            <button className={`service-card service-accent-${index % 5}`} onClick={() => setSelectedService(service)} aria-label={`${service.en} — ${service.ta}`}>
              <span className="service-icon" aria-hidden="true"><Icon size={25} strokeWidth={1.7} /></span>
              <span className="service-card-copy"><strong>{service.en}</strong><small>{service.ta}</small></span>
              <span className="service-enquire">{t("ENQUIRE", "விவரம்", lang)} <span aria-hidden="true">↗</span></span>
            </button>
          </Reveal>
          );
        })}
      </div>
      <div className="services-cta">
        <p>{t("Do not see your event? Talk to us", "உங்கள் நிகழ்வு இங்கே இல்லையா? எங்களிடம் பேசுங்கள்", lang)}</p>
        <a href="tel:+918608337304">☎ {t("CALL", "அழைக்க", lang)}</a>
        <a href="https://wa.me/918608337304" target="_blank" rel="noreferrer">◉ WHATSAPP</a>
      </div>
      <AnimatePresence>
        {selectedService && (
          <motion.div className="service-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedService(null)}>
            <motion.div className="service-modal" role="dialog" aria-modal="true" aria-labelledby="service-modal-title" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} onClick={(event) => event.stopPropagation()}>
              <button className="service-modal-close" onClick={() => setSelectedService(null)} aria-label={t("Close", "மூடு", lang)}>×</button>
              <img src={mediaImages.gallery[Math.max(0, selectedServiceIndex) % mediaImages.gallery.length].image} alt={`${selectedService.en} sample photo placeholder`} loading="lazy" />
              <div className="service-modal-copy">
                <span className="eyebrow">{t("ELA CAPTURE SERVICES", "எலா கேப்ச்சர் சேவைகள்", lang)}</span>
                <h3 id="service-modal-title">{selectedService.en}</h3>
                <p className="service-modal-tamil">{selectedService.ta}</p>
                <strong className="service-includes-label">{t("WHAT’S INCLUDED", "சேவையில் அடங்குவது", lang)}</strong>
                <p>{t(selectedService.detail, selectedService.detailTa, lang)}</p>
                <a className="button" href="#contact" onClick={() => { selectService(selectedService); setSelectedService(null); }}>{t("BOOK THIS SERVICE", "இந்த சேவையை முன்பதிவு செய்யுங்கள்", lang)} <span>↗</span></a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Portfolio({ activeFilter, setActiveFilter, selected, setSelected }) {
  const { lang } = useLanguage();
  const visibleItems = activeFilter === "all" ? galleryItems : galleryItems.filter((item) => item.category === activeFilter);
  const touchStart = useRef(0);
  const selectedIndex = visibleItems.findIndex((item) => item.id === selected?.id);

  const moveImage = (direction) => {
    if (!visibleItems.length) return;
    const index = selectedIndex < 0 ? 0 : selectedIndex;
    setSelected(visibleItems[(index + direction + visibleItems.length) % visibleItems.length]);
  };

  useEffect(() => {
    if (!selected) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowRight") moveImage(1);
      if (event.key === "ArrowLeft") moveImage(-1);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.classList.add("lightbox-open");
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("lightbox-open");
    };
  }, [selected, activeFilter]);

  return (
    <section className="portfolio section-space" id="portfolio">
      <Reveal><SectionTitle eyebrow={t("A FEW FRAMES, A THOUSAND FEELINGS", "சில படங்கள், ஆயிரம் உணர்வுகள்", lang)} centered>{t("Made to be remembered", "நினைவில் நிற்கும் படங்கள்", lang)}</SectionTitle></Reveal>
      <Reveal className="portfolio-intro">
        <p>{t("Rituals, little glances, happy tears — the moments between the moments.", "சடங்குகள், சின்னப் பார்வைகள், ஆனந்தக் கண்ணீர் — தருணங்களுக்கு இடையிலான தருணங்கள்.", lang)}</p>
        <div className="filter-list" role="group" aria-label="Filter portfolio by event">
          <button className={activeFilter === "all" ? "filter-button active" : "filter-button"} onClick={() => setActiveFilter("all")} aria-pressed={activeFilter === "all"}>{t("All stories", "அனைத்தும்", lang)}</button>
          {categories.map((category) => <button key={category.id} className={activeFilter === category.id ? "filter-button active" : "filter-button"} onClick={() => setActiveFilter(category.id)} aria-pressed={activeFilter === category.id}>{t(category.en, category.ta, lang)}</button>)}
        </div>
      </Reveal>
      <motion.div layout className="gallery-grid">
        <AnimatePresence mode="popLayout">
          {visibleItems.map((item, index) => {
            const category = categories.find((entry) => entry.id === item.category);
            return (
              <motion.button
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.32, delay: (index % 7) * 0.025 }}
                className={`gallery-item gallery-shape-${index % 5}`}
                key={item.id}
                onClick={() => setSelected(item)}
                aria-label={`${t(category.en, category.ta, lang)} — ${t(item.title, "ஒரு நினைவுத் தருணம்", lang)}`}
              >
                <img src={imageUrl(item.image, 900)} alt={t(`${category.en} photography`, `${category.ta} புகைப்படம்`, lang)} loading="lazy" />
                <span className="gallery-overlay"><span><small>{t(category.en, category.ta, lang)}</small>{t(item.title, "ஒரு நினைவுத் தருணம்", lang)}</span><b aria-hidden="true">↗</b></span>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </motion.div>
      <div className="portfolio-foot"><span>{t("PHOTOGRAPHED WITH CARE IN ERODE", "ஈரோட்டில் அன்புடன் பதிவு செய்யப்பட்டது", lang)}</span><a href="#events">{t("EXPLORE EVERY OCCASION", "அனைத்து நிகழ்வுகளையும் பாருங்கள்", lang)} <span aria-hidden="true">↗</span></a></div>
      <AnimatePresence>
        {selected && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)} role="dialog" aria-modal="true" aria-label={t("Photo gallery", "புகைப்படத் தொகுப்பு", lang)}>
            <button className="lightbox-close" onClick={() => setSelected(null)} aria-label={t("Close gallery", "தொகுப்பை மூடு", lang)}>×</button>
            <button className="lightbox-arrow previous" onClick={(event) => { event.stopPropagation(); moveImage(-1); }} aria-label={t("Previous photo", "முந்தைய படம்", lang)}>←</button>
            <div className="lightbox-content" onClick={(event) => event.stopPropagation()} onTouchStart={(event) => { touchStart.current = event.changedTouches[0].screenX; }} onTouchEnd={(event) => { const delta = event.changedTouches[0].screenX - touchStart.current; if (Math.abs(delta) > 45) moveImage(delta < 0 ? 1 : -1); }}>
              <img src={imageUrl(selected.image, 1800)} alt={t(selected.title, "ஒரு நினைவுத் தருணம்", lang)} />
              <p><span>{t(categories.find((category) => category.id === selected.category).en, categories.find((category) => category.id === selected.category).ta, lang)}</span>{t(selected.title, "ஒரு நினைவுத் தருணம்", lang)}</p>
              <span className="lightbox-count">{String(selectedIndex + 1).padStart(2, "0")} / {String(visibleItems.length).padStart(2, "0")}</span>
            </div>
            <button className="lightbox-arrow next" onClick={(event) => { event.stopPropagation(); moveImage(1); }} aria-label={t("Next photo", "அடுத்த படம்", lang)}>→</button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Pricing() {
  const { lang } = useLanguage();
  const packages = packageDetails;
  const [selection, setSelection] = useState(null);
  const pricingGridRef = useRef(null);
  const scrollPackages = (direction) => {
    const grid = pricingGridRef.current;
    if (!grid) return;
    const card = grid.querySelector(".price-card");
    const distance = card ? card.getBoundingClientRect().width + 14 : 274;
    const before = grid.scrollLeft;
    grid.scrollTo({ left: before + direction * distance, behavior: "smooth" });
  };
  const legacyPackages = [
    {
      name: ["Package 1", "தொகுப்பு 1"],
      length: ["WEDDING", "திருமணம்"],
      price: "₹59,999",
      items: [
        ["Traditional Photography", "பாரம்பரிய புகைப்படம்"],
        ["Traditional Videography", "பாரம்பரிய வீடியோகிராஃபி"],
        ["Wedding Highlights", "திருமண சிறப்புத் தொகுப்பு"],
        ["Full Length Wedding Video", "முழு நீள திருமண வீடியோ"],
        ["Premium Album (1)", "பிரீமியம் ஆல்பம் (1)"],
        ["Coffee Table Albums (2)", "காஃபி டேபிள் ஆல்பங்கள் (2)"],
        ["Frames & Calendars", "பிரேம்கள் & காலெண்டர்கள்"],
        ["Pre/Post Wedding Shoot", "திருமணத்துக்கு முன்/பின் புகைப்படம்"],
      ],
    },
    {
      name: ["Package 2", "தொகுப்பு 2"],
      length: ["MOST POPULAR", "மிகப் பிரபலமானது"],
      price: "₹1,49,999",
      featured: true,
      items: [
        ["Traditional Photography", "பாரம்பரிய புகைப்படம்"],
        ["Traditional Videography", "பாரம்பரிய வீடியோகிராஃபி"],
        ["Candid Photography", "கேண்டிட் புகைப்படம்"],
        ["Candid Videography + Drone", "கேண்டிட் வீடியோகிராஃபி + ட்ரோன்"],
        ["Cinematic Teaser", "சினிமாடிக் டீசர்"],
        ["High-end Retouched Images", "உயர்தர எடிட்டிங் செய்யப்பட்ட படங்கள்"],
        ["Cinematic Wedding Highlights", "சினிமாடிக் திருமண சிறப்புத் தொகுப்பு"],
        ["Cinematic Wedding Story", "சினிமாடிக் திருமணக்கதை"],
        ["Full Length Wedding Video", "முழு நீள திருமண வீடியோ"],
        ["Save the Date Video", "தேதி நினைவூட்டல் வீடியோ"],
        ["Premium Album (1)", "பிரீமியம் ஆல்பம் (1)"],
        ["Coffee Table Albums (2)", "காஃபி டேபிள் ஆல்பங்கள் (2)"],
        ["Frames & Calendars", "பிரேம்கள் & காலெண்டர்கள்"],
        ["3 Wedding Reels", "3 திருமண ரீல்கள்"],
        ["Pre/Post Wedding Shoot", "திருமணத்துக்கு முன்/பின் புகைப்படம்"],
        ["Save the Date / Cinematic Song", "தேதி நினைவூட்டல் / சினிமாடிக் பாடல்"],
      ],
    },
    {
      name: ["Package 3", "தொகுப்பு 3"],
      length: ["WEDDING", "திருமணம்"],
      price: "₹99,999",
      items: [
        ["Traditional Photography", "பாரம்பரிய புகைப்படம்"],
        ["Traditional Videography", "பாரம்பரிய வீடியோகிராஃபி"],
        ["Candid Photography", "கேண்டிட் புகைப்படம்"],
        ["Wedding Highlights", "திருமண சிறப்புத் தொகுப்பு"],
        ["Full Length Wedding Video", "முழு நீள திருமண வீடியோ"],
        ["High-end Retouched Images", "உயர்தர எடிட்டிங் செய்யப்பட்ட படங்கள்"],
        ["Premium Album (1)", "பிரீமியம் ஆல்பம் (1)"],
        ["Coffee Table Albums (2)", "காஃபி டேபிள் ஆல்பங்கள் (2)"],
        ["Frames & Calendars", "பிரேம்கள் & காலெண்டர்கள்"],
        ["Pre/Post Wedding Shoot", "திருமணத்துக்கு முன்/பின் புகைப்படம்"],
      ],
    },
    {
      name: ["Package 4", "தொகுப்பு 4"],
      length: ["WEDDING & RECEPTION", "திருமணம் & வரவேற்பு"],
      price: "₹1,30,000",
      items: [
        ["WEDDING TEAM", "திருமண குழு"],
        ["1 Traditional Photographer", "1 பாரம்பரிய புகைப்படக்கலைஞர்"],
        ["1 Traditional Videographer", "1 பாரம்பரிய வீடியோ கலைஞர்"],
        ["1 Candid Cinematographer", "1 கேண்டிட் சினிமாடோகிராஃபர்"],
        ["1 Candid Photographer", "1 கேண்டிட் புகைப்படக்கலைஞர்"],
        ["RECEPTION TEAM", "வரவேற்பு குழு"],
        ["1 Traditional Photographer", "1 பாரம்பரிய புகைப்படக்கலைஞர்"],
        ["1 Traditional Videographer", "1 பாரம்பரிய வீடியோ கலைஞர்"],
        ["1 Candid Cinematographer", "1 கேண்டிட் சினிமாடோகிராஃபர்"],
        ["1 Candid Photographer", "1 கேண்டிட் புகைப்படக்கலைஞர்"],
        ["DELIVERABLES", "வழங்கப்படுபவை"],
        ["2 Premium Canvera Albums — 12x36, 160 pages, 450 traditional + candid photos", "2 பிரீமியம் கேன்வேரா ஆல்பங்கள் — 12x36, 160 பக்கங்கள், 450 பாரம்பரிய + கேண்டிட் படங்கள்"],
        ["4K Traditional Video for Wedding & Reception", "திருமணம் & வரவேற்புக்கு 4K பாரம்பரிய வீடியோ"],
        ["1 4K Cinematography Highlight Video (4–5 min)", "1 4K சினிமாடோகிராஃபி சிறப்புத் தொகுப்பு (4–5 நிமிடம்)"],
        ["1 Teaser Cut Video", "1 டீசர் வீடியோ"],
        ["1 Couple Magazine (30 photos)", "1 தம்பதியர் மேகசின் (30 படங்கள்)"],
        ["1 Save the Date Video (for pre-wedding only)", "1 சேவ் தி டேட் வீடியோ (முன் திருமணப் படப்பிடிப்புக்கு மட்டும்)"],
        ["Full event images (JPEG format)", "முழு நிகழ்வு படங்கள் (JPEG வடிவம்)"],
        ["30 Social Media Pictures", "30 சமூக ஊடகப் படங்கள்"],
        ["E-Album", "மின்னணு ஆல்பம்"],
        ["2 Frames (18x12) or 1 Frame (16x24)", "2 பிரேம்கள் (18x12) அல்லது 1 பிரேம் (16x24)"],
        ["1 Pen drive", "1 பென் டிரைவ்"],
        ["COMPLIMENTARY", "இலவச கூடுதல் சேவைகள்"],
        ["Drone — 1 session for Reception", "ட்ரோன் — வரவேற்புக்கு 1 அமர்வு"],
        ["2 Replica Mini Albums", "2 ரெப்ளிகா மினி ஆல்பங்கள்"],
        ["4 Hrs Pre or Post Wedding Shoot (before/after 30 days)", "4 மணி நேர முன்/பின் திருமணப் படப்பிடிப்பு (30 நாட்களுக்கு முன் அல்லது பின்)"],
        ["2 Calendars", "2 காலெண்டர்கள்"],
      ],
    },
  ];
  return (
    <section className="pricing-section section-space" id="services">
      <Reveal className="pricing-heading">
        <SectionTitle eyebrow={t("CLEAR, CONSIDERED, MADE FOR YOUR DAY", "தெளிவான, உங்கள் நாளுக்கான தொகுப்புகள்", lang)}>{t("Photography packages", "புகைப்படத் தொகுப்புகள்", lang)}</SectionTitle>
        <p>{t("Thoughtful coverage, no surprises. Tell us what matters and we’ll make a package around it.", "எதிர்பாராத செலவுகள் இல்லாத அக்கறையான பதிவு. உங்கள் தேவைக்கேற்ப தொகுப்பை உருவாக்குகிறோம்.", lang)}</p>
      </Reveal>
      <div className="pricing-carousel-head">
        <span>{t("SCROLL PACKAGES", "தொகுப்புகளை நகர்த்துங்கள்", lang)}</span>
        <div className="pricing-arrows">
          <button type="button" onClick={() => scrollPackages(-1)} aria-label={t("Previous package", "முந்தைய தொகுப்பு", lang)}>←</button>
          <button type="button" onClick={() => scrollPackages(1)} aria-label={t("Next package", "அடுத்த தொகுப்பு", lang)}>→</button>
        </div>
      </div>
      <div className="pricing-grid" ref={pricingGridRef}>
        {packages.map((item, index) => <Reveal className="price-card" key={item.name[0]} delay={index * 0.07}>
          <span className="price-label">{item.length[lang === "ta" ? 1 : 0]}</span>
          <h3>{item.name[lang === "ta" ? 1 : 0]}</h3>
          <div className="price-amount"><strong>{item.price}</strong><span>{t("ONWARDS", "முதல்", lang)}</span></div>
          <ul>{item.items.map(([en, ta], itemIndex) => <li key={`${en}-${itemIndex}`}>{t(en, ta, lang)}</li>)}</ul>
          <div className="package-card-actions">
            <a className="package-link" href={`#package-${item.id}`}>{t("VIEW DETAILS", "விவரங்களைப் பாருங்கள்", lang)} <span>↗</span></a>
            <button
              className="package-link"
              type="button"
              onClick={() => setSelection(item)}
            >
              {t("SELECT", "தேர்ந்தெடுக்கவும்", lang)} <span>↗</span>
            </button>
          </div>
        </Reveal>)}
      </div>
      <p className="custom-package">{t("Need something different? We’ll shape a package around your celebration.", "வேறு தேவைகள் உள்ளதா? உங்கள் விழாவிற்கேற்ப தொகுப்பை உருவாக்குவோம்.", lang)} <a href="#contact">{t("Customize your package ↗", "உங்கள் தொகுப்பைத் தனிப்பயனாக்குங்கள் ↗", lang)}</a></p>
      <AnimatePresence>
        {selection && (
          <motion.div className="package-selection-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="presentation" onClick={() => setSelection(null)}>
            <motion.div className="package-selection-popup" initial={{ opacity: 0, y: 18, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.98 }} role="dialog" aria-modal="true" aria-label={t("Confirm package selection", "தொகுப்பு தேர்வை உறுதிப்படுத்தவும்", lang)} onClick={(event) => event.stopPropagation()}>
              <button className="package-selection-close" type="button" onClick={() => setSelection(null)} aria-label={t("Close", "மூடு", lang)}>×</button>
              <span className="eyebrow">{t("YOUR SELECTION", "உங்கள் தேர்வு", lang)}</span>
              <h3>{selection.name[0]}</h3>
              <strong>{selection.price}</strong>
              <p>{t("Continue to the enquiry form with this package selected.", "இந்தத் தொகுப்பைத் தேர்ந்தெடுத்து விவரம் படிவத்திற்குச் செல்க.", lang)}</p>
              <a
                className="button"
                href="#contact"
                onClick={() => {
                  sessionStorage.setItem("ela-capture-selected-package", `${selection.name[0]} — ${selection.price}`);
                  window.dispatchEvent(new CustomEvent("ela-capture-package-selected"));
                  setSelection(null);
                }}
              >
                {t("CONTINUE", "தொடரவும்", lang)} <span>↗</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function PackageDetailsPage({ packageId }) {
  const { lang } = useLanguage();
  const item = packageDetails.find((pkg) => pkg.id === packageId) || packageDetails[0];
  const selectPackage = () => {
    sessionStorage.setItem("ela-capture-selected-package", `${item.name[0]} — ${item.price}`);
    window.dispatchEvent(new CustomEvent("ela-capture-package-selected"));
  };

  return (
    <main className="package-details-page">
      <div className="package-details-shell">
        <a className="package-back" href="#services">← {lang === "ta" ? "தொகுப்புகளுக்குத் திரும்பு" : "BACK TO PACKAGES"}</a>
        <div className="package-details-card">
          <div className="package-details-head">
            <div>
              <span className="eyebrow">{t(item.length[0], item.length[1], lang)}</span>
              <h1>{t(item.name[0], item.name[1], lang)}</h1>
            </div>
            <strong>{item.price}</strong>
          </div>
          <div className="package-details-grid">
            {item.items.map(([en, ta], index) => (
              <div className="package-detail-item" key={`${en}-${index}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{t(en, ta, lang)}</p>
              </div>
            ))}
          </div>
          <div className="package-details-actions">
            <a className="button" href="#contact" onClick={selectPackage}>{t("SELECT THIS PACKAGE", "இந்த தொகுப்பைத் தேர்ந்தெடுக்கவும்", lang)} <span>↗</span></a>
            <a className="whatsapp-package-link" href={`https://wa.me/${adminWhatsAppNumber}?text=${encodeURIComponent(`Vanakkam, I am interested in ${item.name[0]} — ${item.price}.`)}`} target="_blank" rel="noreferrer">{t("ASK ON WHATSAPP", "வாட்ஸ்அப்பில் கேளுங்கள்", lang)}</a>
          </div>
        </div>
      </div>
    </main>
  );
}

function WorkGallery() {
  const { lang } = useLanguage();
  const [filter, setFilter] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const touchStart = useRef(null);
  const categories = ["All", "Wedding", "Reception", "Pre-Wedding", "Candid", "Albums"];
  const visibleItems = filter === "All"
    ? mediaImages.gallery
    : mediaImages.gallery.filter((item) => item.category === filter);

  useEffect(() => {
    if (selectedIndex === null) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setSelectedIndex(null);
      if (event.key === "ArrowRight") setSelectedIndex((index) => (index + 1) % visibleItems.length);
      if (event.key === "ArrowLeft") setSelectedIndex((index) => (index - 1 + visibleItems.length) % visibleItems.length);
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.classList.add("lightbox-open");
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("lightbox-open");
    };
  }, [selectedIndex, visibleItems.length]);

  const moveLightbox = (step) => setSelectedIndex((index) => (index + step + visibleItems.length) % visibleItems.length);

  return (
    <section className="work-gallery section-space" id="portfolio">
      <Reveal><SectionTitle eyebrow={t("SELECTED MOMENTS", "தேர்ந்தெடுக்கப்பட்ட தருணங்கள்", lang)} centered>{t("Our work", "எங்கள் படைப்புகள்", lang)}</SectionTitle></Reveal>
      <div className="work-filter" aria-label={t("Filter portfolio", "படத்தொகுப்பை வடிகட்டுங்கள்", lang)}>
        {categories.map((category) => <button className={filter === category ? "active" : ""} key={category} onClick={() => { setFilter(category); setSelectedIndex(null); }}>{category}</button>)}
      </div>
      <div className="work-grid">
        {visibleItems.map((item, index) => (
          <button className="work-grid-item" key={`${item.category}-${index}`} onClick={() => setSelectedIndex(index)} aria-label={`Open ${item.alt}`}>
            <img src={item.image} alt={item.alt} loading="lazy" />
            <span>{item.category}</span>
          </button>
        ))}
      </div>
      {selectedIndex !== null && (
        <div
          className="work-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={t("Portfolio photo viewer", "படத்தொகுப்பு பார்வையாளர்", lang)}
          onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
          onTouchEnd={(event) => {
            if (touchStart.current === null) return;
            const distance = event.changedTouches[0].clientX - touchStart.current;
            if (Math.abs(distance) > 45) moveLightbox(distance > 0 ? -1 : 1);
            touchStart.current = null;
          }}
        >
          <button className="work-lightbox-close" onClick={() => setSelectedIndex(null)} aria-label={t("Close photo", "படத்தை மூடு", lang)}>×</button>
          <button className="work-lightbox-arrow previous" onClick={() => moveLightbox(-1)} aria-label={t("Previous photo", "முந்தைய படம்", lang)}>←</button>
          <img src={visibleItems[selectedIndex].image} alt={visibleItems[selectedIndex].alt} />
          <button className="work-lightbox-arrow next" onClick={() => moveLightbox(1)} aria-label={t("Next photo", "அடுத்த படம்", lang)}>→</button>
        </div>
      )}
    </section>
  );
}

function AlbumShowcase() {
  const { lang } = useLanguage();
  return (
    <section className="album-showcase section-space">
      <Reveal><SectionTitle eyebrow={t("KEPT FOR GENERATIONS", "தலைமுறைகளுக்காகப் பாதுகாக்கப்பட்டது", lang)} centered>{t("Albums & prints", "ஆல்பங்கள் & பிரிண்டுகள்", lang)}</SectionTitle></Reveal>
      <div className="album-showcase-grid">
        {mediaImages.albums.map((album) => (
          <Reveal className="album-showcase-card" key={album.caption}>
            <img src={album.image} alt={album.alt} loading="lazy" />
            <p>{album.caption}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function VideoShowcase() {
  const { lang } = useLanguage();
  return (
    <section className="video-showcase section-space">
      <Reveal className="video-showcase-copy">
        <SectionTitle eyebrow={t("MOTION & MUSIC", "நடமாட்டம் & இசை", lang)}>{t("The highlight film", "சிறப்புத் திரைப்படம்", lang)}</SectionTitle>
        <p>{t("See the full feeling of the day in a short cinematic film.", "நாள் முழுவதையும் ஒரு சினிமாடிக் குறும் படமாகப் பாருங்கள்.", lang)}</p>
      </Reveal>
      <Reveal className="video-frame" delay={0.1}>
        <iframe
          src="https://www.youtube.com/embed?listType=search&list=Tamil+wedding+highlight+film"
          title={t("Ela Capture highlight film", "எலா கேப்ச்சர் சிறப்புத் திரைப்படம்", lang)}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Reveal>
    </section>
  );
}

function SocialStrip() {
  return (
    <section className="social-strip">
      <h2>{`Follow Us · @ela_sivaom`}</h2>
      <div className="social-strip-grid">
        {mediaImages.social.map((photo, index) => (
          <a href={instagramUrl} target="_blank" rel="noreferrer" key={photo.alt} aria-label={`Open Instagram photo ${index + 1}`}>
            <img src={photo.image} alt={photo.alt} loading="lazy" />
          </a>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const { lang } = useLanguage();
  const steps = [
    ["01", "Enquire", "விவரம் கேளுங்கள்", "Tell us about your celebration."],
    ["02", "Confirm Muhurtham", "முகூர்த்த நாளை உறுதி செய்யுங்கள்", "We’ll check the date and make a plan."],
    ["03", "Celebrate & shoot", "விழாவைக் கொண்டாடுங்கள்", "Be with your people; we’ll take care of the moments."],
    ["04", "Receive your memories", "நினைவுகளைப் பெறுங்கள்", "Your edited photos arrive in a private gallery."],
  ];
  return (
    <section className="how-section section-space">
      <Reveal><SectionTitle eyebrow={t("FOUR SIMPLE STEPS", "நான்கு எளிய படிகள்", lang)} centered>{t("From hello to heirloom", "முதல் உரையாடல் முதல் நினைவுப் பொக்கிஷம் வரை", lang)}</SectionTitle></Reveal>
      <div className="steps-grid">{steps.map(([number, en, ta, detail], index) => <Reveal key={number} delay={index * 0.06}><div className="step-card"><span>{number}</span><h3>{t(en, ta, lang)}</h3><p>{t(detail, ["உங்கள் விழாவைப் பற்றிச் சொல்லுங்கள்.", "தேதியை உறுதி செய்து திட்டமிடுவோம்.", "நீங்கள் விழாவைக் கொண்டாடுங்கள்; தருணங்களை நாங்கள் பதிவு செய்கிறோம்.", "திருத்திய படங்களைத் தனிப்பட்ட தொகுப்பில் பெறுங்கள்."][index], lang)}</p></div></Reveal>)}</div>
    </section>
  );
}

function Testimonials() {
  const { lang } = useLanguage();
  const quotes = [
    { quote: "They caught every little thing we didn't even know we wanted to remember. The whole family cried looking through the album.", tamil: "நாங்கள் நினைவில் வைக்க நினைக்காத சின்னச் சின்ன தருணங்களையும் அழகாகப் பதிவு செய்தார்கள். ஆல்பத்தைப் பார்த்து குடும்பமே நெகிழ்ந்தது.", name: "Meenakshi & Arun", event: "ERODE WEDDING · 2025" },
    { quote: "Our parents felt so comfortable. Nothing felt staged — it felt like our family, on our happiest day.", tamil: "எங்கள் பெற்றோர்கள் மிகவும் இயல்பாக உணர்ந்தார்கள். எதுவும் செயற்கையாக இல்லை — எங்கள் குடும்பத்தின் மகிழ்ச்சியான நாளாகவே இருந்தது.", name: "Priya & Karthik", event: "THANJAVUR WEDDING · 2025" },
    { quote: "The muhurtham photographs are now the first thing everyone asks to see when they visit.", tamil: "வீட்டிற்கு வருபவர்கள் முதலில் பார்க்க விரும்புவது எங்கள் முகூர்த்தப் படங்களைத்தான்.", name: "Lakshmi & Suresh", event: "TRICHY WEDDING · 2024" },
  ];
  return (
    <section className="testimonials section-space">
      <Reveal><SectionTitle eyebrow={t("KIND WORDS, KEPT CLOSE", "மனதிற்கு நெருக்கமான வார்த்தைகள்", lang)} centered>{t("From one family to another", "ஒரு குடும்பத்திடமிருந்து மற்றொன்றிற்கு", lang)}</SectionTitle></Reveal>
      <div className="testimonial-grid">{quotes.map((quote, index) => <Reveal key={quote.name} delay={index * 0.07}><article className="quote-card"><span className="stars" aria-label="5 out of 5 stars">★★★★★</span><p lang={lang}>{t(`“${quote.quote}”`, `“${quote.tamil}”`, lang)}</p><span className="quote-rule" /><strong>{quote.name}</strong><small>{quote.event}</small></article></Reveal>)}</div>
    </section>
  );
}

function AlbumPreview() {
  const { lang } = useLanguage();
  const [index, setIndex] = useState(0);
  const turn = (direction) => setIndex((current) => (current + direction + albumPages.length) % albumPages.length);
  const page = albumPages[index];
  return (
    <section className="album-section section-space">
      <div className="album-copy">
        <Reveal>
          <SectionTitle eyebrow={t("A KEEPSAKE, MADE BY HAND", "கைகளால் உருவாக்கிய நினைவுப் பொக்கிஷம்", lang)}>{t("Turn the pages again", "மீண்டும் புரட்டிப் பாருங்கள்", lang)}</SectionTitle>
          <p>{t("Our fine-art albums are made to live on the coffee table, to be passed around, and to grow more precious with every retelling.", "எங்கள் கலைநயமிக்க ஆல்பங்கள் மேசையில் இருக்கவும், குடும்பத்தினரிடையே பகிரவும், ஒவ்வொரு முறை பார்க்கும்போதும் இன்னும் மதிப்புமிக்கதாக மாறவும் உருவாக்கப்படுகின்றன.", lang)}</p>
          <a href="#contact" className="text-link">{t("ASK ABOUT ALBUMS", "ஆல்பங்கள் பற்றி கேளுங்கள்", lang)} ↗</a>
        </Reveal>
      </div>
      <Reveal className="album-preview" delay={0.12}>
        <div className="album-cover">
          <AnimatePresence mode="wait">
            <motion.div className="album-page" key={page.image} initial={{ opacity: 0, rotateY: -28 }} animate={{ opacity: 1, rotateY: 0 }} exit={{ opacity: 0, rotateY: 25 }} transition={{ duration: 0.4 }}>
              <img src={imageUrl(page.image, 900)} alt={t(page.en, page.ta, lang)} loading="lazy" />
              <span>{t(page.en, page.ta, lang)}</span>
            </motion.div>
          </AnimatePresence>
          <span className="album-spine" />
        </div>
        <div className="album-controls"><button onClick={() => turn(-1)} aria-label={t("Previous album page", "முந்தைய ஆல்பம் பக்கம்", lang)}>←</button><span>0{index + 1} <i /> 0{albumPages.length}</span><button onClick={() => turn(1)} aria-label={t("Next album page", "அடுத்த ஆல்பம் பக்கம்", lang)}>→</button></div>
      </Reveal>
    </section>
  );
}

function BeforeAfter() {
  const { lang } = useLanguage();
  const [amount, setAmount] = useState(54);
  const photo = imageUrl("photo-1591604466107-ec97de577aff", 1000);
  return (
    <section className="edit-section section-space">
      <Reveal className="edit-copy">
        <SectionTitle eyebrow={t("GENTLE, TRUE-TO-YOU FINISHING", "உங்களின் இயல்பைத் தக்கவைக்கும் திருத்தம்", lang)}>{t("The moment, beautifully finished", "அழகாக மெருகூட்டிய தருணம்", lang)}</SectionTitle>
        <p>{t("We keep the colour, warmth, and feeling true — just a little polish, never a different story.", "நிறம், வெப்பம், உணர்வு அனைத்தையும் இயல்பாக வைத்திருப்போம் — சிறு மெருகூட்டல் மட்டுமே, வேறு கதையல்ல.", lang)}</p>
        <div className="edit-labels"><span>{t("BEFORE", "முன்", lang)}</span><span>{t("AFTER", "பின்", lang)}</span></div>
        <input aria-label={t("Compare before and after editing", "திருத்தத்திற்கு முன் மற்றும் பின் ஒப்பிடுங்கள்", lang)} className="edit-range" type="range" min="0" max="100" value={amount} onChange={(event) => setAmount(Number(event.target.value))} />
      </Reveal>
      <Reveal className="edit-slider" delay={0.12}>
        <img className="edit-after" src={photo} alt={t("Finished wedding photograph", "திருத்திய திருமணப் புகைப்படம்", lang)} loading="lazy" />
        <div className="edit-before" style={{ clipPath: `inset(0 ${100 - amount}% 0 0)` }}><img src={photo} alt="" loading="lazy" /></div>
        <span className="edit-before-tag">{t("BEFORE", "முன்", lang)}</span><span className="edit-after-tag">{t("AFTER", "பின்", lang)}</span>
        <span className="edit-handle" style={{ left: `${amount}%` }} aria-hidden="true"><i /></span>
        <input aria-label={t("Drag to compare image edits", "படத் திருத்தத்தை ஒப்பிட இழுக்கவும்", lang)} className="edit-slider-input" type="range" min="0" max="100" value={amount} onChange={(event) => setAmount(Number(event.target.value))} />
      </Reveal>
    </section>
  );
}

function Journal() {
  const { lang } = useLanguage();
  return (
    <section className="journal section-space" id="blog">
      <div className="journal-top">
        <Reveal><SectionTitle eyebrow={t("NOTES FROM OUR LITTLE STUDIO", "எங்கள் சிறிய ஸ்டுடியோவின் குறிப்புகள்", lang)}>{t("The journal", "புகைப்படக் குறிப்புகள்", lang)}</SectionTitle></Reveal>
        <Reveal><p>{t("Planning notes, thoughtful ideas, and stories from the celebrations we’re lucky to photograph.", "திட்டமிடல் குறிப்புகள், அழகான யோசனைகள், நாங்கள் பதிவு செய்யும் விழாக்களின் கதைகள்.", lang)}</p></Reveal>
      </div>
      <div className="journal-grid">{posts.map((post, index) => <Reveal key={post.en} delay={(index % 2) * 0.07}><article className="journal-post">
        <img src={imageUrl(post.image, 650)} alt="" loading="lazy" />
        <div className="post-content"><div className="post-meta"><span>{post.date}</span><i />{post.category}</div><h3>{t(post.en, post.ta, lang)}</h3><p>{post.excerpt[lang === "ta" ? 1 : 0]}</p><a href="#contact">{t("READ THE STORY", "கட்டுரையைப் படியுங்கள்", lang)} <span aria-hidden="true">↗</span></a></div>
      </article></Reveal>)}</div>
      <a className="button journal-button" href="#blog">{t("VIEW ALL STORIES", "அனைத்துக் கதைகளையும் பாருங்கள்", lang)} <span aria-hidden="true">↗</span></a>
    </section>
  );
}

function InstagramFeed() {
  const { lang } = useLanguage();
  const photos = ["photo-1606800052052-a08af7148866", "photo-1591604466107-ec97de577aff", "photo-1519741497674-611481863552", "photo-1529636798458-92182e662485"];
  return (
    <section className="instagram-section section-space">
      <div className="instagram-head"><SectionTitle eyebrow="@ELA_SIVAOM">{t("A little more on Instagram", "இன்ஸ்டாகிராமில் இன்னும் கொஞ்சம்", lang)}</SectionTitle><a className="text-link" href={instagramUrl} target="_blank" rel="noreferrer">{t("FOLLOW ALONG ↗", "தொடர்ந்து பாருங்கள் ↗", lang)}</a></div>
      <div className="instagram-grid">{photos.map((photo, index) => <a href={instagramUrl} target="_blank" rel="noreferrer" key={photo} aria-label={`Instagram photo ${index + 1}`}><img src={imageUrl(photo, 550)} alt="" loading="lazy" /><span>↗</span></a>)}</div>
    </section>
  );
}

function PrivateGallery() {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  return (
    <>
      <section className="private-gallery">
        <div><span className="eyebrow">{t("ALREADY CELEBRATED WITH US?", "எங்களுடன் விழாவைக் கொண்டாடினீர்களா?", lang)}</span><h2>{t("Your memories, just for you.", "உங்கள் நினைவுகள், உங்களுக்காக.", lang)}</h2><p>{t("Open your private, password-protected photo gallery.", "கடவுச்சொல் பாதுகாப்புள்ள உங்கள் தனிப்பட்ட புகைப்படத் தொகுப்பைத் திறக்கவும்.", lang)}</p></div>
        <button className="button button-outline" onClick={() => { setOpen(true); setMessage(""); }}>{t("CLIENT GALLERY LOGIN", "வாடிக்கையாளர் தொகுப்பைத் திறக்க", lang)} <span>↗</span></button>
      </section>
      <AnimatePresence>{open && <motion.div className="private-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} role="dialog" aria-modal="true" aria-label={t("Client gallery login", "வாடிக்கையாளர் தொகுப்பு உள்நுழைவு", lang)}>
        <form className="private-form" onClick={(event) => event.stopPropagation()} onSubmit={(event) => { event.preventDefault(); setMessage(t("This is a gallery-login preview. Please use the private link shared by our studio.", "இது தொகுப்பு உள்நுழைவுக்கான முன்னோட்டம். ஸ்டுடியோ பகிர்ந்த தனிப்பட்ட இணைப்பைப் பயன்படுத்தவும்.", lang)); }}>
          <button className="lightbox-close" type="button" onClick={() => setOpen(false)} aria-label={t("Close", "மூடு", lang)}>×</button><span className="eyebrow">{t("A LITTLE PRIVACY, PLEASE", "உங்கள் தனியுரிமைக்காக", lang)}</span><h2>{t("Welcome back", "மீண்டும் வரவேற்கிறோம்", lang)}</h2>
          <label>{t("EMAIL ADDRESS", "மின்னஞ்சல் முகவரி", lang)}<input type="email" placeholder="you@example.com" required /></label><label>{t("GALLERY ACCESS CODE", "தொகுப்பு அணுகல் குறியீடு", lang)}<input type="password" placeholder="••••••••" required /></label>
          <button className="button" type="submit">{t("OPEN MY GALLERY", "என் தொகுப்பைத் திறக்க", lang)}</button>{message && <p className="private-status" role="status">{message}</p>}
        </form>
      </motion.div>}</AnimatePresence>
    </>
  );
}

function Contact() {
  const { lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(() => sessionStorage.getItem("ela-capture-selected-package") || "");
  const [selectedService, setSelectedService] = useState(() => sessionStorage.getItem("ela-capture-selected-service") || "");
  const today = new Date();
  const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  useEffect(() => {
    const updateSelectedPackage = () => setSelectedPackage(sessionStorage.getItem("ela-capture-selected-package") || "");
    const updateSelectedService = () => setSelectedService(sessionStorage.getItem("ela-capture-selected-service") || "");
    window.addEventListener("ela-capture-package-selected", updateSelectedPackage);
    window.addEventListener("ela-capture-service-selected", updateSelectedService);
    window.addEventListener("storage", updateSelectedPackage);
    return () => {
      window.removeEventListener("ela-capture-package-selected", updateSelectedPackage);
      window.removeEventListener("ela-capture-service-selected", updateSelectedService);
      window.removeEventListener("storage", updateSelectedPackage);
    };
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const booking = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: "New",
      ...data,
    };
    const bookings = JSON.parse(localStorage.getItem(bookingStorageKey) || "[]");
    localStorage.setItem(bookingStorageKey, JSON.stringify([booking, ...bookings]));

    const message = [
      "New Ela Capture booking enquiry",
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      `Event: ${data.event}`,
      `Package: ${data.package || "Not specified"}`,
      `Service: ${data.service || "Not specified"}`,
      `Date: ${data.date}`,
      `Time: ${data.time || "Not specified"}`,
      `Guests: ${data.guests || "Not specified"}`,
      `Venue: ${data.venue}`,
      `Note: ${data.message || "None"}`,
    ].join("\n");
    window.open(`https://wa.me/${adminWhatsAppNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    form.reset();
    sessionStorage.removeItem("ela-capture-selected-package");
    sessionStorage.removeItem("ela-capture-selected-service");
    setSelectedPackage("");
    setSelectedService("");
    setSubmitted(true);
  };
  return (
    <section className="contact-section" id="contact">
      <div className="contact-panel">
        <Reveal className="contact-copy">
          <SectionTitle eyebrow={t("TELL US WHAT YOU’RE CELEBRATING", "உங்கள் விழாவைப் பற்றி எங்களிடம் சொல்லுங்கள்", lang)}>{t("Let’s keep this day close.", "இந்த நாளை மனதிற்கு நெருக்கமாக வைத்துக்கொள்வோம்.", lang)}</SectionTitle>
          <p>{t("Share a few details and we’ll get back to you within one working day. For dates close at hand, give us a call.", "சில விவரங்களைப் பகிருங்கள்; ஒரு வேலை நாளுக்குள் தொடர்புகொள்கிறோம். அருகிலுள்ள தேதிகளுக்கு எங்களை அழைக்கவும்.", lang)}</p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input type="hidden" name="service" value={selectedService} />
            {selectedService && <p className="selected-service-note">{t("Enquiring about", "விவரம் கேட்கும் சேவை", lang)}: <strong>{selectedService}</strong></p>}
            <div className="form-pair">
              <label>{t("SELECTED PACKAGE", "தேர்ந்தெடுக்கப்பட்ட தொகுப்பு", lang)}
                <select name="package" value={selectedPackage} onChange={(event) => {
                  setSelectedPackage(event.target.value);
                  if (event.target.value) sessionStorage.setItem("ela-capture-selected-package", event.target.value);
                  else sessionStorage.removeItem("ela-capture-selected-package");
                }}>
                  <option value="">{t("Choose a package", "ஒரு தொகுப்பைத் தேர்ந்தெடுக்கவும்", lang)}</option>
                  <option value="Package 1 — ₹59,999">Package 1 — ₹59,999</option>
                  <option value="Package 2 — ₹1,49,999">Package 2 — ₹1,49,999</option>
                  <option value="Package 3 — ₹99,999">Package 3 — ₹99,999</option>
                  <option value="Package 4 — ₹1,30,000">Package 4 — ₹1,30,000</option>
                </select>
              </label>
            </div>
            <div className="form-pair">
              <label>{t("YOUR NAME", "உங்கள் பெயர்", lang)}<input name="name" type="text" autoComplete="name" placeholder={t("How should we call you?", "உங்களை எப்படி அழைக்கலாம்?", lang)} required /></label>
              <label>{t("PHONE NUMBER", "தொலைபேசி எண்", lang)}<input name="phone" type="tel" autoComplete="tel" pattern="[+]?[0-9][0-9 ]{7,}" placeholder="+91 86083 37304" required /></label>
            </div>
            <div className="form-pair">
              <label>{t("EVENT TYPE", "நிகழ்வு", lang)}<select name="event" required defaultValue=""><option value="" disabled>{t("Choose your occasion", "நிகழ்வைத் தேர்ந்தெடுக்கவும்", lang)}</option>{categories.map((category) => <option value={category.id} key={category.id}>{t(category.en, category.ta, lang)}</option>)}</select></label>
              <label>{t("EVENT DATE", "நிகழ்வு தேதி", lang)}<input name="date" type="date" min={minDate} required /></label>
            </div>
            <div className="form-pair">
              <label>{t("MUHURTHAM TIME", "முகூர்த்த நேரம்", lang)}<input name="time" type="time" /></label>
              <label>{t("GUESTS", "விருந்தினர்கள்", lang)}<input name="guests" type="number" min="1" placeholder={t("Approximate number", "தோராயமான எண்ணிக்கை", lang)} /></label>
            </div>
            <div className="form-pair">
              <label>{t("VENUE / LOCATION", "இடம் / முகவரி", lang)}<input name="venue" type="text" placeholder={t("Town, venue, or hall", "ஊர், மண்டபம் அல்லது இடம்", lang)} required /></label>
              <label>{t("ANYTHING ELSE?", "வேறு விவரங்கள்?", lang)}<input name="message" type="text" placeholder={t("A note for our team", "எங்கள் குழுவிற்குச் செய்தி", lang)} /></label>
            </div>
            <div className="form-bottom"><button className="button" type="submit">{t("SEND AN ENQUIRY", "விவரம் அனுப்புங்கள்", lang)} <span aria-hidden="true">↗</span></button><span aria-live="polite">{submitted ? t("Thank you. This preview doesn’t deliver bookings yet — please call or WhatsApp to confirm your date.", "நன்றி. இந்த முன்னோட்டம் முன்பதிவை அனுப்பாது — தேதியை உறுதிசெய்ய அழைக்கவும் அல்லது வாட்ஸ்அப் செய்யவும்.", lang) : t("WE’LL BE IN TOUCH SOON.", "விரைவில் உங்களைத் தொடர்புகொள்கிறோம்.", lang)}</span></div>
          </form>
          <div className="contact-quick-links"><a href="tel:+918608337304">☎ {t("CALL NOW", "இப்போதே அழைக்கவும்", lang)}</a><a href="https://wa.me/918608337304" target="_blank" rel="noreferrer">◉ WHATSAPP</a></div>
        </Reveal>
        <Reveal className="contact-photo" delay={0.1}><img src={imageUrl("photo-1591604466107-ec97de577aff", 1000)} alt={t("A wedding detail in warm light", "மென்மையான ஒளியில் திருமண அலங்காரம்", lang)} loading="lazy" /><span>{t("YOUR STORY STARTS HERE", "உங்கள் கதை இங்கே தொடங்குகிறது", lang)}</span></Reveal>
      </div>
      <div className="map-row"><div><span className="eyebrow">{t("COME BY FOR A CUP OF FILTER COFFEE", "ஃபில்டர் காபிக்காக வாருங்கள்", lang)}</span><h3>{t("Erode, Tamil Nadu", "ஈரோடு, தமிழ்நாடு", lang)}</h3><p>Erode, Tamil Nadu 638001, India</p></div><iframe title={t("Map showing Ela Capture in Erode", "ஈரோட்டில் எலா கேப்ச்சர் ஸ்டுடியோவைக் காட்டும் வரைபடம்", lang)} src="https://maps.google.com/maps?q=Erode%2C%20Tamil%20Nadu&t=&z=13&ie=UTF8&iwloc=&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
    </section>
  );
}

function Footer() {
  const { lang } = useLanguage();
  return (
    <footer className="site-footer">
      <KolamDivider className="footer-kolam" />
      <div className="footer-main">
        <div className="footer-brand"><a className="brand" href="#home" aria-label="Ela Capture home"><img className="brand-logo footer-logo" src="/ela-capture-logo.png" alt="Ela Capture" /></a><p>{t("Photographs that honour where we come from — and who we love.", "நம் மரபையும் நாம் நேசிப்பவர்களையும் போற்றும் புகைப்படங்கள்.", lang)}</p></div>
        <div className="footer-column"><span className="footer-heading">{t("GET IN TOUCH", "தொடர்புக்கு", lang)}</span><a href="mailto:vanakkam@thangamalar.in">vanakkam@thangamalar.in</a><a href="tel:+918608337304">+91 86083 37304</a><a href="https://wa.me/918608337304" target="_blank" rel="noreferrer">WHATSAPP ↗</a></div>
        <div className="footer-column"><span className="footer-heading">{t("OUR STUDIO", "எங்கள் ஸ்டுடியோ", lang)}</span><p>Erode, Tamil Nadu 638001<br />India</p><a href="#contact">{t("FIND US ON THE MAP ↗", "வரைபடத்தில் எங்களைக் காண ↗", lang)}</a></div>
        <div className="footer-column footer-social"><span className="footer-heading">{t("FOLLOW OUR STORIES", "எங்கள் கதைகளைப் பாருங்கள்", lang)}</span><div>{socials.map((name) => <SocialIcon name={name} key={name} />)}</div><p><a href={instagramUrl} target="_blank" rel="noreferrer">@ela_sivaom</a></p></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} ELA CAPTURE</span><span>MADE WITH <b>♥</b> IN ERODE, TAMIL NADU</span><a href="#home">{t("BACK TO TOP ↑", "மேலே செல்ல ↑", lang)}</a></div>
    </footer>
  );
}

function FloatingActions() {
  const { lang } = useLanguage();
  return <div className="floating-actions"><a className="call-button" href="tel:+918608337304" aria-label={t("Call Ela Capture", "எலா கேப்ச்சரை அழைக்க", lang)}>☎<span>{t("CALL", "அழைப்பு", lang)}</span></a><a className="whatsapp-button" href="https://wa.me/918608337304?text=Vanakkam%2C%20I%27d%20like%20to%20ask%20about%20a%20photoshoot." target="_blank" rel="noreferrer" aria-label={t("Message us on WhatsApp", "வாட்ஸ்அப்பில் தொடர்புகொள்ள", lang)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.7a8.4 8.4 0 0 1-12.4 7.4l-4.6 1.2 1.2-4.5a8.4 8.4 0 1 1 15.8-4.1Z" /><path d="M8.8 8.1c-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.3 1 2.6 1.1 2.8 1.9 3 4.7 4.1c2.3.9 2.8.7 3.3.7s1.6-.7 1.8-1.3.2-1.2.1-1.3-.3-.2-.6-.4l-1.8-.9c-.2-.1-.4-.1-.6.2s-.7.9-.9 1.1-.3.2-.6.1a7.2 7.2 0 0 1-2.1-1.3 8 8 0 0 1-1.5-1.8c-.2-.3 0-.5.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5Z" /></svg><span>WHATSAPP</span></a></div>;
}

function AdminPage() {
  const [bookings, setBookings] = useState(() => JSON.parse(localStorage.getItem(bookingStorageKey) || "[]"));
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const refresh = () => setBookings(JSON.parse(localStorage.getItem(bookingStorageKey) || "[]"));
    window.addEventListener("storage", refresh);
    return () => window.removeEventListener("storage", refresh);
  }, []);

  const updateStatus = (id, status) => {
    const updated = bookings.map((booking) => booking.id === id ? { ...booking, status } : booking);
    localStorage.setItem(bookingStorageKey, JSON.stringify(updated));
    setBookings(updated);
  };

  const clearBookings = () => {
    localStorage.removeItem(bookingStorageKey);
    setBookings([]);
  };

  const filtered = filter === "All" ? bookings : bookings.filter((booking) => booking.status === filter);
  const newCount = bookings.filter((booking) => booking.status === "New").length;

  return (
    <main className="admin-page">
      <div className="admin-shell">
        <div className="admin-heading">
          <div><span className="eyebrow">ELA CAPTURE · ADMIN</span><h1>Booking notifications {newCount > 0 && <span>{newCount}</span>}</h1></div>
          <a className="button" href="#home">← BACK TO WEBSITE</a>
        </div>
        <div className="admin-toolbar">
          {["All", "New", "Confirmed", "Completed"].map((status) => <button key={status} className={filter === status ? "active" : ""} onClick={() => setFilter(status)}>{status}</button>)}
          {bookings.length > 0 && <button className="admin-clear" onClick={clearBookings}>Clear bookings</button>}
        </div>
        {filtered.length === 0 ? (
          <div className="admin-empty"><b>No booking notifications</b><p>Customer enquiries submitted from the website will appear here.</p></div>
        ) : (
          <div className="booking-list">
            {filtered.map((booking) => (
              <article className={`booking-card ${booking.status === "New" ? "is-new" : ""}`} key={booking.id}>
                <div className="booking-top"><div><span>{booking.status}</span><h2>{booking.event || "Photography enquiry"}</h2></div><time>{new Date(booking.createdAt).toLocaleString()}</time></div>
                <dl>
                  <div><dt>Customer</dt><dd>{booking.name}</dd></div>
                  <div><dt>Phone</dt><dd><a href={`tel:${booking.phone}`}>{booking.phone}</a></dd></div>
                  <div><dt>Package</dt><dd>{booking.package || "Not specified"}</dd></div>
                  <div><dt>Service</dt><dd>{booking.service || "Not specified"}</dd></div>
                  <div><dt>Event date</dt><dd>{booking.date}</dd></div>
                  <div><dt>Muhurtham</dt><dd>{booking.time || "Not specified"}</dd></div>
                  <div><dt>Guests</dt><dd>{booking.guests || "Not specified"}</dd></div>
                  <div><dt>Venue</dt><dd>{booking.venue}</dd></div>
                  <div className="booking-note"><dt>Note</dt><dd>{booking.message || "None"}</dd></div>
                </dl>
                <div className="booking-actions">
                  <a href={`https://wa.me/${String(booking.phone).replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Vanakkam " + booking.name + ", thank you for your Ela Capture booking enquiry.")}`} target="_blank" rel="noreferrer">Reply on WhatsApp</a>
                  {["New", "Confirmed", "Completed"].map((status) => <button key={status} disabled={booking.status === status} onClick={() => updateStatus(booking.id, status)}>{status}</button>)}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function AppContent() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [adminPage, setAdminPage] = useState(() => window.location.hash.toLowerCase() === "#admin");
  const [packagePage, setPackagePage] = useState(() => {
    const match = window.location.hash.match(/^#package-(1|2|3|4)$/i);
    return match ? match[1] : null;
  });
  useEffect(() => {
    const onHashChange = () => {
      setAdminPage(window.location.hash.toLowerCase() === "#admin");
      const match = window.location.hash.match(/^#package-(1|2|3|4)$/i);
      setPackagePage(match ? match[1] : null);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  if (adminPage) return <AdminPage />;
  if (packagePage) return <PackageDetailsPage packageId={packagePage} />;
  return (
    <>
      <Header />
      <main>
        <Hero />
        <KolamDivider className="section-divider" />
        <About />
        <EventShoots />
        <Portfolio activeFilter={activeFilter} setActiveFilter={setActiveFilter} selected={selected} setSelected={setSelected} />
        <Pricing />
        <WorkGallery />
        <AlbumShowcase />
        <VideoShowcase />
        <SocialStrip />
        <HowItWorks />
        <Testimonials />
        <AlbumPreview />
        <BeforeAfter />
        <Journal />
        <InstagramFeed />
        <PrivateGallery />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}

export default function App() {
  return <LanguageProvider><AppContent /></LanguageProvider>;
}

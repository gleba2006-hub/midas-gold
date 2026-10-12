import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({ component: Home });

const WA = "https://wa.me/972515680600";
const WA_CATALOG = "https://wa.me/c/972515680600";

const P = "/media/products";

type Cat = "all" | "sets" | "bars" | "diamonds" | "tablets";

const pieces: {
  id: string;
  cat: Exclude<Cat, "all"> | "tablets";
  he: string;
  en: string;
  price: string;
  img: string;
  alt: string;
}[] = [
  {
    id: "g6",
    cat: "diamonds",
    he: "מארז 6",
    en: "Classic Gems 6",
    price: "₪66",
    img: `${P}/gems-6-marble.DixTx4TZ_ZyFo60.webp`,
    alt: "שישה פרליני שוקולד בצורת יהלומים",
  },
  {
    id: "g12",
    cat: "diamonds",
    he: "מארז 12",
    en: "Classic Gems 12",
    price: "₪119",
    img: `${P}/gems-12-marble.T5AjT6wr_ZcdMcd.webp`,
    alt: "שנים-עשר פרליני יהלומים",
  },
  {
    id: "g18",
    cat: "diamonds",
    he: "מארז 18",
    en: "Classic Gems 18",
    price: "₪169",
    img: `${P}/gems-18-marble.CH1AFVU2_ZUNTbc.webp`,
    alt: "קופסה מוזהבת עם שמונה-עשר פרליני יהלומים",
  },
  {
    id: "g24",
    cat: "diamonds",
    he: "מארז 24",
    en: "Classic Gems 24",
    price: "₪239",
    img: `${P}/gems-24-marble.CSyDFD8b_Z1GlnVv.webp`,
    alt: "קופסה שחורה עם עשרים וארבעה פרליני יהלומים",
  },
  {
    id: "ingot",
    cat: "bars",
    he: "מטיל קראנץ׳ חלבה",
    en: "Chocolate Ingot",
    price: "₪16",
    img: `${P}/gold-bar-marble._eEkyZqO_Z15uKb1.webp`,
    alt: "מטיל שוקולד עם הטבעת הירוגליפים",
  },
  {
    id: "trio",
    cat: "bars",
    he: "שלישיית מטילים",
    en: "Ingot Trio",
    price: "₪45",
    img: `${P}/gold-bars-trio-marble.D9A1kw0H_qfzyQ.webp`,
    alt: "שלושה מטילי שוקולד עם הירוגליפים",
  },
  {
    id: "hazelnut",
    cat: "sets",
    he: "קרם לוז מלוח",
    en: "Salted Hazelnut",
    price: "₪188",
    img: `${P}/hazelnut-24-marble.CLbO80nb_Z2fRGI9.webp`,
    alt: "מארז 24 פרליני קרם לוז מלוח",
  },
  {
    id: "pista-box",
    cat: "sets",
    he: "פיסטוק פטל",
    en: "Pistachio Raspberry",
    price: "₪188",
    img: `${P}/pistachio-raspberry-24-marble.DHoPWBF__Z1xc72X.webp`,
    alt: "מארז 24 פרליני פיסטוק ופטל",
  },
  {
    id: "pista-bar",
    cat: "tablets",
    he: "טבלת פיסטוק פטל",
    en: "Pistachio Raspberry",
    price: "₪48",
    img: `${P}/pistachio-crunch-bar-marble.DJnLXG4d_Pz28u.webp`,
    alt: "טבלת שוקולד פיסטוק עם קראנץ׳ פטל",
  },
  {
    id: "berry-bar",
    cat: "tablets",
    he: "טבלת קראנץ׳ תות",
    en: "Strawberry Crunch",
    price: "₪48",
    img: `${P}/strawberry-crunch-bar-marble.C_0rJ08o_27BviQ.webp`,
    alt: "טבלת שוקולד ורודה עם קראנץ׳ תות",
  },
  {
    id: "crunch",
    cat: "tablets",
    he: "טבלת קראנץ׳",
    en: "Crunch Bar",
    price: "₪48",
    img: `${P}/crunch-bar-marble.C4rRPP3q_2uB6nn.webp`,
    alt: "טבלת שוקולד קראנץ׳ על שיש",
  },
];

const nav: { id: Exclude<Cat, "all" | "tablets">; label: string }[] = [
  { id: "sets", label: "מארזים" },
  { id: "bars", label: "מטילים" },
  { id: "diamonds", label: "יהלומים" },
];

const filters: { id: Cat; label: string }[] = [
  { id: "all", label: "הכל" },
  { id: "diamonds", label: "יהלומים" },
  { id: "bars", label: "מטילים" },
  { id: "sets", label: "מארזים" },
  { id: "tablets", label: "טבלאות" },
];

const notes: Record<string, string> = {
  g6: "שישה מילויים: לוז, פיסטוק, שקדים, חמאת בוטנים, טופי קרמל ודובדבן אמרנה.",
  g12: "שנים-עשר פרליני יהלום. אותם שישה מילויים, במארז גדול יותר.",
  g18: "שמונה-עשר פרלינים בקופסה מוזהבת.",
  g24: "עשרים וארבעה פרלינים, עם מקרא הטעמים במכסה.",
  ingot: "מטיל בעבודת יד עם הטבעת הירוגליפים, במילוי קראנץ׳ חלבה.",
  trio: "שלושה מטילים יחד. מחווה קטנה שאפשר לחלק.",
  hazelnut: "עשרים וארבעה ריבועים במילוי קרם לוז ומלח עדין.",
  "pista-box": "עשרים וארבעה פרלינים מרובעים, פיסטוק ופטל.",
  "pista-bar": "טבלה עבה של שוקולד פיסטוק עם קראנץ׳ פטל.",
  "berry-bar": "טבלה עבה עם קראנץ׳ תות.",
  crunch: "טבלה עבה שנשברת בקול. לוז, חלבה או בוטנים.",
};

function waFor(name: string) {
  return `${WA}?text=${encodeURIComponent(`שלום, אשמח להצעה עבור ${name}`)}`;
}

function Crown({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 72 28" aria-hidden="true">
      <path
        d="M4 22 L14 8 L22 16 L36 4 L50 16 L58 8 L68 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="36" cy="4" r="1.3" fill="currentColor" />
    </svg>
  );
}

function Logo() {
  return (
    <a className="logo" href="#top">
      <Crown />
      <span className="logo-name">MIDAS</span>
      <span className="logo-sub">GOLD</span>
    </a>
  );
}

function StoryFilm() {
  const ref = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setPlay(true);
      },
      { rootMargin: "160px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="story-media" ref={ref}>
      {play ? (
        <video
          src="/media/story.mp4"
          poster="/media/story-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          aria-label="סרטון מידאס"
        />
      ) : (
        <img src="/media/story-poster.jpg" alt="" />
      )}
    </div>
  );
}

function Home() {
  const [menu, setMenu] = useState(false);
  const [cat, setCat] = useState<Cat>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const menuPanel = useRef<HTMLDivElement>(null);
  const sheetPanel = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const open = pieces.find((piece) => piece.id === openId) ?? null;

  function pick(next: Cat) {
    setCat(next);
    setMenu(false);
    document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    if (!menu && !open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (open) {
          const id = open.id;
          setOpenId(null);
          cardRefs.current[id]?.focus();
        } else {
          setMenu(false);
          menuBtn.current?.focus();
        }
        return;
      }
      if (event.key !== "Tab") return;
      const root = open ? sheetPanel.current : menuPanel.current;
      if (!root) return;
      const nodes = [...root.querySelectorAll<HTMLElement>("a, button")].filter(
        (node) => !node.hasAttribute("disabled"),
      );
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    const focusTimer = window.setTimeout(() => {
      (open ? sheetPanel : menuPanel).current?.querySelector("button")?.focus();
    }, 0);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
    };
  }, [menu, open]);

  const shown = cat === "all" ? pieces : pieces.filter((piece) => piece.cat === cat);
  const catLabel = filters.find((item) => item.id === cat)?.label ?? "הכל";

  return (
    <div className="site" id="top">
      <header className="topbar">
        <p className="eyebrow">יצירה בעבודת יד · אריזה כמו תכשיט</p>
        <Logo />
        <div className="top-actions">
          <a className="text-link" href={WA} target="_blank" rel="noreferrer">
            וואטסאפ
          </a>
          <button
            className="ghost-btn"
            type="button"
            ref={menuBtn}
            aria-expanded={menu}
            aria-controls="site-menu"
            onClick={() => setMenu(true)}
          >
            תפריט
          </button>
        </div>
      </header>

      {menu ? (
        <div
          className="menu"
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="תפריט"
          ref={menuPanel}
        >
          <header>
            <Logo />
            <button className="ghost-btn" type="button" onClick={() => { setMenu(false); menuBtn.current?.focus(); }}>
              סגור
            </button>
          </header>
          <nav>
            {filters.map((item) => (
              <button key={item.id} className="linkish" type="button" onClick={() => pick(item.id)}>
                {item.label}
              </button>
            ))}
            <a href="#story" onClick={() => setMenu(false)}>
              הסיפור
            </a>
            <a href="#contact" onClick={() => setMenu(false)}>
              יצירת קשר
            </a>
            <a href={WA} target="_blank" rel="noreferrer">
              וואטסאפ
            </a>
          </nav>
        </div>
      ) : null}

      <section className="hero" aria-label="פתיח">
        <video
          src="/media/hero.mp4"
          poster="/media/poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="hero-en">The Gold Collection</p>
          <h1>MIDAS</h1>
          <p className="hero-he">תכשיטי שוקולד בעבודת יד ולב</p>
          <a className="hero-cta" href="#collection">
            לאוסף
          </a>
        </div>
      </section>

      <section className="duo" aria-label="אוספים">
        <a href="#collection" onClick={() => setCat("bars")}>
          <img src={`${P}/gold-bars-trio-marble.D9A1kw0H_qfzyQ.webp`} alt="שלושה מטילי שוקולד" />
          <div className="duo-copy">
            <p className="duo-en">Chocolate Ingots</p>
            <h2>מטילים</h2>
            <span className="shop">לאוסף</span>
          </div>
        </a>
        <a href="#collection" onClick={() => setCat("diamonds")}>
          <img src={`${P}/gems-6-marble.DixTx4TZ_ZyFo60.webp`} alt="פרליני יהלומים" />
          <div className="duo-copy">
            <p className="duo-en">Classic Gems</p>
            <h2>יהלומים</h2>
            <span className="shop">לאוסף</span>
          </div>
        </a>
      </section>

      <section className="section" id="collection">
        <div className="section-head">
          <h2>{cat === "all" ? "הקולקציה" : catLabel}</h2>
          <p className="count">{shown.length} פריטים</p>
        </div>
        <div className="filters" role="toolbar" aria-label="סינון קולקציה">
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={cat === item.id}
              onClick={() => setCat(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="visually-hidden" aria-live="polite">
          {catLabel}, {shown.length} פריטים
        </p>
        <div className="grid">
          {shown.map((piece, index) => (
            <article className="card" key={piece.id}>
              <button
                className="card-open"
                type="button"
                ref={(node) => {
                  cardRefs.current[piece.id] = node;
                }}
                onClick={() => setOpenId(piece.id)}
                aria-label={`פרטים על ${piece.he}`}
              >
                <div className="card-frame">
                  <img src={piece.img} alt={piece.alt} loading={index < 2 ? "eager" : "lazy"} />
                </div>
              </button>
              <p className="piece-en">{piece.en}</p>
              <h3>{piece.he}</h3>
              <p className="price">{piece.price}</p>
              <a className="ask" href={waFor(piece.he)} target="_blank" rel="noreferrer">
                להזמנה
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="band" id="sets">
        <img src={`${P}/classic-gems-6-hero.CTN30laS_Z2tfmoA.webp`} alt="מארז Classic Gems" />
        <div className="band-copy">
          <p className="band-en">Gift Sets</p>
          <h2>מארזים</h2>
          <a className="shop" href="#collection" onClick={() => setCat("sets")}>
            לאוסף
          </a>
        </div>
      </section>

      <section className="order" id="order">
        <p className="order-en">Made to order</p>
        <h2>לא מדף. הזמנה.</h2>
        <p>כל מארז נארז בידיים, עם פתק אישי. לחברה, לאירוע, או כי מגיע.</p>
        <p>
          <a className="ask" href={waFor("מארז אישי")} target="_blank" rel="noreferrer">
            לקבלת הצעה
          </a>
        </p>
      </section>

      <section className="reasons" aria-label="למה מידאס">
        <article>
          <h3>עבודת יד</h3>
          <p>כל פרלין נוצר, מתקרר ונארז בידיים.</p>
        </article>
        <article>
          <h3>ארוז כמו תכשיט</h3>
          <p>קופסה שקטה. זהב עדין. בלי רעש.</p>
        </article>
        <article>
          <h3>כשר פרווה</h3>
          <p>רכיבים טבעיים. בהשגחת רבנות רעננה.</p>
        </article>
      </section>

      <section className="story" id="story">
        <div className="story-copy">
          <h2>האגדה על מידאס</h2>
          <p>במיתולוגיה, המלך נגע והכל הפך לזהב.</p>
          <p>אצלנו הזהב נשאר אכיל. מטיל, יהלום, מארז. נמסר ביד, או עד הבית.</p>
        </div>
        <StoryFilm />
      </section>

      <section className="contact" id="contact">
        <h2>יצירת קשר</h2>
        <p>
          <a className="phone" href="tel:+972515680600">
            051-5680600
          </a>
        </p>
        <p className="contact-row">
          <a className="ask" href={WA} target="_blank" rel="noreferrer">
            וואטסאפ
          </a>
          <a className="ask" href={WA_CATALOG} target="_blank" rel="noreferrer">
            לקטלוג
          </a>
        </p>
      </section>

      <footer className="footer">
        <Logo />
        <p>רכיבים טבעוניים וללא גלוטן, כשר פרווה. עלול להכיל עקבות חלב וגלוטן.</p>
        <p>כל המחירים כוללים מע״מ.</p>
        <p>
          <a className="ask" href="https://www.instagram.com/midas_chocolate_jewelry/" target="_blank" rel="noreferrer">
            אינסטגרם
          </a>
        </p>
        <p>© 2026 מידאס שוקולד. כל הזכויות שמורות.</p>
      </footer>

      <nav className="dock" aria-label="אוספים">
        {nav.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={cat === item.id}
            onClick={() => pick(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {open ? (
        <div className="sheet" role="presentation" onClick={() => setOpenId(null)}>
          <div
            className="sheet-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="sheet-title"
            ref={sheetPanel}
            onClick={(event) => event.stopPropagation()}
          >
            <img src={open.img} alt={open.alt} />
            <div className="sheet-copy">
              <button
                className="ghost-btn sheet-close"
                type="button"
                onClick={() => {
                  const id = open.id;
                  setOpenId(null);
                  cardRefs.current[id]?.focus();
                }}
              >
                סגור
              </button>
              <p className="piece-en">{open.en}</p>
              <h2 id="sheet-title">{open.he}</h2>
              <p className="price">{open.price}</p>
              <p>{notes[open.id]}</p>
              <p className="sheet-note">כולל מע״מ. הזמנה דרך וואטסאפ.</p>
              <a className="sheet-cta" href={waFor(open.he)} target="_blank" rel="noreferrer">
                להזמנה בוואטסאפ
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

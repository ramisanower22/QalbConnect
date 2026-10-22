import { motion, useReducedMotion } from "motion/react";

export default function MosqueIllustration() {
  const reduceMotion = useReducedMotion();

  const floatingMoon = reduceMotion
    ? {}
    : {
        y: [0, -4, 0],
      };

  const twinkle = reduceMotion
    ? {}
    : {
        opacity: [0.45, 1, 0.45],
        scale: [1, 1.08, 1],
      };

  const stars = [
    { x: 120, y: 78, type: "diamond", size: 6, delay: 0.95 },
    { x: 92, y: 110, type: "dot", size: 2.4, delay: 1.05 },
    { x: 176, y: 120, type: "dot", size: 3, delay: 1.15 },
    { x: 228, y: 84, type: "dot", size: 2.8, delay: 1.22 },
    { x: 450, y: 97, type: "dot", size: 2.2, delay: 1.3 },
    { x: 505, y: 104, type: "diamond", size: 6, delay: 1.38 },
    { x: 554, y: 118, type: "dot", size: 2.6, delay: 1.46 },
    { x: 390, y: 118, type: "dot", size: 2.2, delay: 1.54 },
    { x: 350, y: 100, type: "dot", size: 1.8, delay: 1.62 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="w-full max-w-[720px] overflow-hidden rounded-[34px] border border-[#0f5b47] bg-[#042f25] shadow-[0_25px_70px_rgba(0,0,0,0.35)]"
    >
      <div className="rounded-[30px] bg-[#05372b] p-5">
        <svg
          viewBox="0 0 760 560"
          className="w-full"
          role="img"
          aria-label="Moonlit mosque illustration"
        >
          <defs>
            <radialGradient id="bgGlow" cx="50%" cy="28%" r="80%">
              <stop offset="0%" stopColor="#0f6a52" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#08523f" stopOpacity="0.68" />
              <stop offset="100%" stopColor="#05372b" stopOpacity="1" />
            </radialGradient>

            <radialGradient id="moonGlow" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="#f0de9f" stopOpacity="0.52" />
              <stop offset="70%" stopColor="#f0de9f" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#f0de9f" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="mosqueBody" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#114f3f" />
              <stop offset="60%" stopColor="#0c4033" />
              <stop offset="100%" stopColor="#082e25" />
            </linearGradient>

            <linearGradient id="domeGreen" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1f7c5c" />
              <stop offset="50%" stopColor="#0f5a46" />
              <stop offset="100%" stopColor="#07372d" />
            </linearGradient>

            <linearGradient id="windowGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff3c7" />
              <stop offset="100%" stopColor="#d9c58b" />
            </linearGradient>

            <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Proper crescent mask so moon is not broken */}
            <mask id="crescentMask">
              <rect width="760" height="560" fill="black" />
              <circle cx="430" cy="150" r="98" fill="white" />
              <circle cx="476" cy="128" r="96" fill="black" />
            </mask>
          </defs>

          {/* background */}
          <rect x="0" y="0" width="760" height="560" rx="26" fill="url(#bgGlow)" />

          {/* moon glow */}
          <motion.circle
            cx="430"
            cy="150"
            r="130"
            fill="url(#moonGlow)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
          />

          {/* moon first */}
          <motion.g
            initial={{ opacity: 0, scale: 0.8, y: -18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <motion.g
              animate={floatingMoon}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <circle
                cx="430"
                cy="150"
                r="98"
                fill="#D9C58B"
                mask="url(#crescentMask)"
                filter="url(#softGlow)"
              />
            </motion.g>
          </motion.g>

          {/* stars second */}
          {stars.map((star, index) =>
            star.type === "diamond" ? (
              <motion.g
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: star.delay, duration: 0.35 }}
              >
                <motion.path
                  d={`
                    M ${star.x} ${star.y - star.size}
                    L ${star.x + star.size * 0.28} ${star.y - star.size * 0.28}
                    L ${star.x + star.size} ${star.y}
                    L ${star.x + star.size * 0.28} ${star.y + star.size * 0.28}
                    L ${star.x} ${star.y + star.size}
                    L ${star.x - star.size * 0.28} ${star.y + star.size * 0.28}
                    L ${star.x - star.size} ${star.y}
                    L ${star.x - star.size * 0.28} ${star.y - star.size * 0.28}
                    Z
                  `}
                  fill="#F7E8B2"
                  animate={twinkle}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    delay: star.delay + 0.8,
                  }}
                />
              </motion.g>
            ) : (
              <motion.circle
                key={index}
                cx={star.x}
                cy={star.y}
                r={star.size}
                fill="#F2F5EF"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, ...twinkle }}
                transition={{
                  delay: star.delay,
                  duration: 0.35,
                  repeat: reduceMotion ? 0 : Infinity,
                  repeatType: "loop",
                }}
              />
            )
          )}

          {/* soft background silhouettes */}
          <g opacity="0.18">
            <path
              d="M0 280 C30 248 58 245 90 280 C122 245 158 246 190 280 C225 247 270 249 300 286 C336 251 376 252 404 284 C434 254 474 255 507 287 C542 258 583 259 622 290 C662 261 707 262 760 295 V360 H0 Z"
              fill="#2a6c59"
            />
          </g>

          {/* mosque third */}
          <motion.g
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 1.75 }}
          >
            {/* left minaret */}
            <g>
              <rect x="120" y="150" width="34" height="210" rx="11" fill="url(#mosqueBody)" />
              <path d="M111 152 L137 110 L163 152 Z" fill="url(#domeGreen)" />
              <rect x="127" y="98" width="20" height="12" rx="4" fill="url(#domeGreen)" />
              <path d="M136 92 C139 86 142 84 145 84 C142 89 142 95 148 100 C142 100 138 97 136 92 Z" fill="#D9C58B" />
              <rect x="128" y="186" width="18" height="34" rx="8" fill="url(#windowGlow)" filter="url(#softGlow)" />
              <rect x="128" y="242" width="18" height="34" rx="8" fill="url(#windowGlow)" filter="url(#softGlow)" />
              <rect x="128" y="298" width="18" height="34" rx="8" fill="url(#windowGlow)" filter="url(#softGlow)" />
            </g>

            {/* right minaret */}
            <g>
              <rect x="606" y="168" width="34" height="192" rx="11" fill="url(#mosqueBody)" />
              <path d="M597 170 L623 131 L649 170 Z" fill="url(#domeGreen)" />
              <rect x="614" y="119" width="20" height="12" rx="4" fill="url(#domeGreen)" />
              <path d="M623 113 C626 107 629 105 632 105 C629 110 629 116 635 121 C629 121 625 118 623 113 Z" fill="#D9C58B" />
              <rect x="614" y="204" width="18" height="32" rx="8" fill="url(#windowGlow)" filter="url(#softGlow)" />
              <rect x="614" y="258" width="18" height="32" rx="8" fill="url(#windowGlow)" filter="url(#softGlow)" />
            </g>

            {/* main mosque */}
            <rect x="228" y="240" width="300" height="126" rx="10" fill="url(#mosqueBody)" />
            <rect x="258" y="210" width="240" height="34" rx="8" fill="url(#mosqueBody)" />

            {/* domes */}
            <path
              d="M265 210
                 C284 132, 339 88, 378 88
                 C417 88, 472 132, 491 210
                 Z"
              fill="url(#domeGreen)"
            />
            <rect x="367" y="74" width="22" height="14" rx="4" fill="url(#domeGreen)" />

            <path
              d="M182 247
                 C194 210, 225 186, 258 186
                 C291 186, 322 210, 334 247
                 Z"
              fill="url(#domeGreen)"
            />
            <rect x="247" y="174" width="14" height="10" rx="3" fill="url(#domeGreen)" />

            <path
              d="M430 247
                 C442 210, 473 186, 506 186
                 C539 186, 570 210, 582 247
                 Z"
              fill="url(#domeGreen)"
            />
            <rect x="495" y="174" width="14" height="10" rx="3" fill="url(#domeGreen)" />

            {/* small gold crescents */}
            <path d="M249 168 C252 162 255 160 259 160 C255 165 255 171 261 175 C255 175 251 173 249 168 Z" fill="#D9C58B" />
            <path d="M497 168 C500 162 503 160 507 160 C503 165 503 171 509 175 C503 175 499 173 497 168 Z" fill="#D9C58B" />

            {/* top line */}
            <line x1="248" y1="259" x2="508" y2="259" stroke="#D9C58B" strokeWidth="2.5" />

            {/* door arch */}
            <path
              d="M343 366
                 V292
                 C343 292 357 255 378 255
                 C399 255 413 292 413 292
                 V366
                 Z"
              fill="#ead9a5"
              filter="url(#softGlow)"
            />
            <path
              d="M356 366
                 V299
                 C356 299 365 273 378 273
                 C391 273 400 299 400 299
                 V366
                 Z"
              fill="url(#mosqueBody)"
            />
            <path
              d="M377 287
                 q -15 8 -24 20
                 q 10 -8 22 -1
                 q -12 13 -20 27
                 q 11 10 22 21"
              stroke="#D9C58B"
              strokeWidth="2.2"
              fill="none"
              opacity="0.7"
            />

            {/* windows */}
            <path d="M272 366 V311 C272 311 281 289 295 289 C309 289 318 311 318 311 V366 Z" fill="url(#windowGlow)" filter="url(#softGlow)" />
            <path d="M324 366 V311 C324 311 333 289 347 289 C361 289 370 311 370 311 V366 Z" fill="url(#windowGlow)" filter="url(#softGlow)" />
            <path d="M386 366 V311 C386 311 395 289 409 289 C423 289 432 311 432 311 V366 Z" fill="url(#windowGlow)" filter="url(#softGlow)" />
            <path d="M438 366 V311 C438 311 447 289 461 289 C475 289 484 311 484 311 V366 Z" fill="url(#windowGlow)" filter="url(#softGlow)" />
          </motion.g>

          {/* hills */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.1, duration: 0.7 }}
          >
            <path
              d="M0 350
                 C86 318, 170 320, 258 352
                 C343 382, 428 381, 530 346
                 C613 318, 685 322, 760 350
                 V560 H0 Z"
              fill="#083a2f"
            />
            <path
              d="M0 386
                 C95 357, 194 364, 301 393
                 C393 418, 494 416, 610 385
                 C665 370, 714 370, 760 381
                 V560 H0 Z"
              fill="#052c23"
            />

            {/* simple palms */}
            <g opacity="0.78">
              <path d="M82 372 C94 357 110 350 129 349 C114 358 104 371 99 390 Z" fill="#0d4638" />
              <path d="M76 380 C64 366 49 360 30 359 C46 367 57 379 63 398 Z" fill="#0d4638" />
              <rect x="72" y="378" width="8" height="42" rx="4" fill="#0d4638" />

              <path d="M657 384 C669 369 685 362 704 361 C689 370 679 383 674 402 Z" fill="#0d4638" />
              <path d="M651 392 C639 378 624 372 605 371 C621 379 632 391 638 410 Z" fill="#0d4638" />
              <rect x="647" y="390" width="8" height="40" rx="4" fill="#0d4638" />
            </g>

            <line x1="0" y1="476" x2="760" y2="476" stroke="#D9C58B" strokeWidth="2.5" />
          </motion.g>
        </svg>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.7 }}
          className="pb-4 text-center"
        >
          <p className="text-[14px] tracking-[0.35em] text-champagne">
            WELCOME TO
          </p>

          <h1
            className="mt-4 text-[64px] leading-none text-white"
            style={{ fontFamily: '"Great Vibes", cursive' }}
          >
            QalbConnect
          </h1>

          <p className="mt-4 text-lg text-ivory">
            A peaceful space for your heart and faith.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
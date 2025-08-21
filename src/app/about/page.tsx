import Link from 'next/link';
import Image from 'next/image';
import InfoCard from '../../components/InfoCard';
import SkillGroup from '../../components/SkillGroup';
import { skills } from '../../data/skills';

export default function About() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About Me
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A passionate developer and creator who loves turning ideas into working products.
          </p>
        </div>

        {/* Who I Am */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Who I Am
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                I&apos;m MJ — a CS grad and full‑stack developer who loves turning ideas into working products. 
                I care about clean UX, reliable backends, and building security and testing in from the start. 
                I&apos;m currently shipping small, focused projects and writing about what I learn along the way.
              </p>
            </div>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/40">
              <Image
                src="/images/professional-headshot.jpg"
                alt="Portrait of Mujahedulislam (MJ)"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />
            </div>
          </div>
        </section>

        {/* What I Do */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            What I Do
          </h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <InfoCard
                emoji="🎨"
                title="Frontend"
                blurb="Accessible, fast UIs."
                bullets={[
                  "React/Next.js + Tailwind",
                  "a11y & keyboard support",
                  "component libraries & theming"
                ]}
              />
              <InfoCard
                emoji="🧰"
                title="Backend"
                blurb="Typed APIs with auth & tests."
                bullets={[
                  "FastAPI/Express, Postgres/Prisma",
                  "auth, validation, pagination",
                  "pytest/Jest, OpenAPI"
                ]}
              />
              <InfoCard
                emoji="🧪"
                title="Product"
                blurb="Ship small slices, measure, iterate."
                bullets={[
                  "clear problem → solution",
                  "UX copy & empty states",
                  "metrics-informed changes"
                ]}
              />
              <InfoCard
                emoji="🛠"
                title="Reliability"
                blurb="CI/CD, tracing, runbooks."
                bullets={[
                  "GitHub Actions, Docker",
                  "OpenTelemetry, health checks",
                  "rate limits & error handling"
                ]}
              />
            </div>
          </div>
        </section>

        {/* Learning & Building Now */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Learning & Building Now
          </h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InfoCard
                emoji="🗂"
                title="Daily Flow"
                blurb="Minimal productivity app."
                bullets={[
                  "Auth + Postgres",
                  "tests + CI",
                  "clean UX"
                ]}
              />
              <InfoCard
                emoji="📝"
                title="Notes & Research"
                blurb="Writeups across systems, security, AI."
                bullets={[
                  "short notes",
                  "deeper dives",
                  "share learnings"
                ]}
              />
              <InfoCard
                emoji="🧭"
                title="Portfolio"
                blurb="A11y, Lighthouse, and content polish."
                bullets={[
                  "OG images",
                  "sitemaps/analytics",
                  "better copy"
                ]}
              />
            </div>
          </div>
        </section>

        {/* Skills & Tools */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Skills & Tools
          </h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skillGroup, index) => (
                <SkillGroup
                  key={index}
                  title={skillGroup.title}
                  items={skillGroup.items}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Beyond Code */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Beyond Code
          </h2>
          <div className="text-center">
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Outside of code, I&apos;m a personal trainer who loves strength training and running. I share fitness, lifestyle, and creative work through Wonder and To Be Great (TBG) — projects focused on growth, discipline, and uplifting stories. I also shoot photos and short videos, experimenting with visuals and sound to tell simple, honest narratives. When I&apos;m not building, I&apos;m training, reading, or planning the next small challenge.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://www.instagram.com/_wonder.mp4/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-gray-200 dark:border-gray-600 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-slate-900/40 transition-colors duration-200"
              >
                Instagram (Wonder)
              </a>
              <a
                href="https://www.instagram.com/tobegreat.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-gray-200 dark:border-gray-600 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-slate-900/40 transition-colors duration-200"
              >
                Instagram (TBG)
              </a>
              <a
                href="https://www.instagram.com/officialflashx_/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-gray-200 dark:border-gray-600 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-slate-900/40 transition-colors duration-200"
              >
                Personal IG
              </a>
              <a
                href="https://github.com/mujahedk"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-gray-200 dark:border-gray-600 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-slate-900/40 transition-colors duration-200"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/mujahedulislamkhan/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-gray-200 dark:border-gray-600 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-slate-900/40 transition-colors duration-200"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Let&apos;s Connect
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            I&apos;m always interested in new opportunities, collaborations, and interesting challenges. 
            Whether you want to discuss a project, share knowledge, or just say hello, I&apos;d love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              Get In Touch
              <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center px-6 py-3 text-base font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              View My Work
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

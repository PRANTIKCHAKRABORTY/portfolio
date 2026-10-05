"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  Code2,
  Database,
  Download,
  Github,
  ExternalLink,
  Linkedin,
  Mail,
  Menu,
  Server,
  Sparkles,
  X,
} from "lucide-react";
import { profile } from "@/data/profile";

const API =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function askAI(e: React.FormEvent) {
    e.preventDefault();

    const question = message.trim();
    if (!question || loading) return;

    setLoading(true);
    setAnswer("");

    try {
      const response = await fetch(`${API}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: question }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with ${response.status}`);
      }

      const data = await response.json();

      setAnswer(
        data.answer || "I could not generate an answer right now."
      );
    } catch {
      setAnswer(
        "The AI service is unavailable right now. You can still explore the portfolio or contact Prantik directly."
      );
    } finally {
      setLoading(false);
    }
  }

  const nav = ["About", "Experience", "Projects", "Skills", "Contact"];

  const suggestedQuestions = [
    "What backend technologies does Prantik use?",
    "Tell me about Prantik's projects.",
    "What internship experience does Prantik have?",
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#05070a] text-white grid-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/[.06] bg-[#05070a]/80 backdrop-blur-2xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a
            href="#top"
            className="group text-xl font-black tracking-tight"
          >
            PC<span className="text-cyan-300 transition group-hover:text-white">.</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-white/50 transition hover:text-white"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="rounded-full border border-white/10 p-2.5 text-white/60 transition hover:border-cyan-300/30 hover:bg-cyan-300/[.06] hover:text-cyan-200"
            >
              <Github className="h-4 w-4" />
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="rounded-full border border-white/10 p-2.5 text-white/60 transition hover:border-cyan-300/30 hover:bg-cyan-300/[.06] hover:text-cyan-200"
            >
              <Linkedin className="h-4 w-4" />
            </a>

            <a
              href={profile.resume}
              download
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-sm font-semibold transition hover:border-cyan-300/30 hover:bg-white/[.04]"
            >
              <Download className="h-4 w-4" />
              Resume
            </a>
          </div>

          <button
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-xl border border-white/10 p-2.5 transition hover:bg-white/[.05] md:hidden"
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </nav>

        {menuOpen && (
          <div className="border-t border-white/[.06] bg-[#05070a]/95 px-5 py-4 md:hidden">
            {nav.map((item) => (
              <a
                onClick={() => setMenuOpen(false)}
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block rounded-lg px-2 py-2.5 text-sm text-white/65 transition hover:bg-white/[.04] hover:text-white"
              >
                {item}
              </a>
            ))}

            <a
              href={profile.resume}
              download
              className="mt-2 block rounded-lg px-2 py-2.5 text-sm font-semibold text-cyan-300"
            >
              Download resume
            </a>
          </div>
        )}
      </header>

      {/* Hero */}
      <div id="top" />

      <section className="relative mx-auto max-w-7xl px-5 pb-24 pt-24 md:px-8 md:pb-32 md:pt-32">
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/[.08] blur-3xl" />

        <div className="relative grid items-end gap-12 lg:grid-cols-[1.25fr_.75fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[.06] px-3.5 py-2 text-xs font-medium text-emerald-200"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
              Open to opportunities
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.03 }}
              className="mb-5 text-sm font-semibold uppercase tracking-[.25em] text-white/35"
            >
              Prantik Chakraborty · Computer Science Engineer
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="max-w-5xl text-5xl font-black leading-[.94] tracking-[-.06em] md:text-7xl"
            >
              Building backend{" "}
              <span className="gradient-text">systems, data</span>{" "}
              AI products.
            </motion.h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-white/55 md:text-lg">
              {profile.summary}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition hover:-translate-y-0.5 hover:bg-cyan-100"
              >
                Explore projects
                <ArrowUpRight className="ml-1 inline h-4 w-4" />
              </a>

              <a
                href={profile.resume}
                download
                className="rounded-full border border-white/12 px-5 py-3 text-sm font-bold transition hover:-translate-y-0.5 hover:bg-white/[.05]"
              >
                <Download className="mr-2 inline h-4 w-4" />
                Download CV
              </a>
            </div>
          </div>

          <div className="glass glow rounded-[2rem] p-6 md:p-7">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[.25em] text-cyan-300/80">
                At a glance
              </p>
              <span className="rounded-full border border-cyan-300/15 bg-cyan-300/[.06] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-cyan-200">
                Data Science
              </span>
            </div>

            <div className="mt-7 space-y-5">
              <Stat label="Core focus" value="Backend · Data · AI" />
              <Stat label="Primary stack" value="Python · Django · Flask" />
              <Stat label="Education" value="M.E. CSE (Data Science) · Chandigarh University" />
              <Stat label="Based in" value={profile.location} />
            </div>

            <div className="mt-7 border-t border-white/[.07] pt-5">
              <p className="text-xs leading-6 text-white/35">
                Building reliable APIs, data workflows, and practical AI
                applications with a backend-first approach.
              </p>
            </div>
          </div>
        </div>

        <a
          href="#about"
          className="mt-16 inline-flex items-center gap-2 text-xs uppercase tracking-[.22em] text-white/30 transition hover:text-cyan-200"
        >
          Scroll to explore
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </a>
      </section>

      {/* About */}
      <Section
        id="about"
        eyebrow="About"
        title="Engineer with a backend-first mindset."
      >
        <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <p className="max-w-2xl text-lg leading-8 text-white/60">
              I enjoy designing APIs, automating data workflows, working
              with databases, and turning technical systems into reliable
              products. My projects combine application engineering with
              analytics and practical machine learning.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Metric
                icon={<Server />}
                label="Backend"
                value="APIs + Microservices"
              />

              <Metric
                icon={<Database />}
                label="Data"
                value="Python + SQL"
              />

              <Metric
                icon={<BrainCircuit />}
                label="AI"
                value="ML + Vision"
              />

              <Metric
                icon={<Code2 />}
                label="Frameworks"
                value="Django + Flask"
              />

              <Metric
                icon={<Database />}
                label="Databases"
                value="PostgreSQL + MySQL"
              />

              <Metric
                icon={<Server />}
                label="DevOps"
                value="Docker + CI/CD"
              />
            </div>
          </div>

          <div className="glass rounded-3xl p-7">
            <p className="text-sm font-semibold text-white/45">Education</p>

            <div className="mt-5 space-y-5">
              {profile.education.map((e, i) => (
                <div
                  key={`${e.school}-${e.degree}`}
                  className={i ? "border-t border-white/[.07] pt-5" : ""}
                >
                  <p className="font-semibold">{e.school}</p>
                  <p className="mt-1 text-sm text-white/50">{e.degree}</p>
                  <p className="mt-1 text-xs text-cyan-200/60">
                    {e.result} · {e.period}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Experience */}
      <Section
        id="experience"
        eyebrow="Experience"
        title="Hands-on engineering experience."
      >
        <div className="space-y-5">
          {profile.experience.map((job, i) => (
            <motion.article
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.05 }}
              key={job.company}
              className="glass group rounded-3xl p-6 transition hover:border-cyan-300/15 md:p-8"
            >
              <div className="flex flex-col justify-between gap-3 md:flex-row">
                <div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                    <h3 className="text-xl font-bold">{job.role}</h3>
                  </div>

                  <p className="mt-1 text-white/50">
                    {job.company} · {job.location}
                  </p>
                </div>

                <p className="text-sm text-white/35">{job.period}</p>
              </div>

              <ul className="mt-6 grid gap-3 text-white/60 md:grid-cols-3">
                {job.bullets.map((b) => (
                  <li
                    key={b}
                    className="rounded-2xl border border-white/[.06] bg-white/[.02] p-4 text-sm leading-6 transition group-hover:border-white/[.09]"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section
        id="projects"
        eyebrow="Selected work"
        title="Projects that show the range."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {profile.projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} GitHub repository`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="glass group relative block overflow-hidden rounded-3xl p-7 transition-shadow hover:shadow-2xl hover:shadow-cyan-950/20 focus:outline-none focus:ring-2 focus:ring-cyan-300/60"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent opacity-0 transition group-hover:opacity-100" />

              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-white/25">
                  {project.number}
                </span>
                <Code2 className="h-5 w-5 text-cyan-300/70" />
              </div>

              <h3 className="mt-10 text-2xl font-bold transition group-hover:text-cyan-100">
                {project.title}
              </h3>

              <p className="mt-3 leading-7 text-white/55">
                {project.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/8 bg-white/[.03] px-3 py-1 text-xs text-white/55"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-8 text-sm font-semibold text-cyan-300/80">
                View technical project
                <ArrowUpRight className="ml-1 inline h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">
                  <Github className="h-4 w-4" />
                  View on GitHub
                </span>
                <ExternalLink className="h-4 w-4 text-white/35 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.a>
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section
        id="skills"
        eyebrow="Toolkit"
        title="Technologies I work with."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(profile.skills).map(([group, items]) => (
            <div
              key={group}
              className="rounded-2xl border border-white/[.07] bg-white/[.02] p-6 transition hover:border-cyan-300/15 hover:bg-white/[.03]"
            >
              <h3 className="font-bold">{group}</h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-white/8 px-3 py-2 text-sm text-white/55 transition hover:border-cyan-300/20 hover:text-cyan-100"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-white/[.07] bg-white/[.02] p-7">
          <p className="text-sm font-semibold text-white/45">
            Certifications & leadership
          </p>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {profile.certifications.map((c) => (
              <div
                key={c}
                className="flex gap-3 text-sm leading-6 text-white/60"
              >
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan-300" />
                {c}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* AI Assistant */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-cyan-300/[.045] p-7 shadow-2xl shadow-cyan-950/10 md:p-10">
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-300/[.08] blur-3xl" />

          <div className="relative">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="rounded-xl border border-cyan-300/20 bg-cyan-300/[.08] p-2.5">
                  <Sparkles className="h-5 w-5 text-cyan-300" />
                </div>

                <p className="text-xs font-semibold uppercase tracking-[.25em] text-cyan-200">
                  AI portfolio assistant
                </p>
              </div>

              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[.05] px-3 py-1.5 text-[11px] font-semibold text-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                Online
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-bold tracking-tight md:text-4xl">
              Ask about my experience.
            </h2>

            <p className="mt-3 max-w-2xl text-white/50">
              Ask about projects, skills, internships, education, or
              technical experience. The assistant answers from the portfolio
              profile.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {suggestedQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => setMessage(question)}
                  className="rounded-full border border-white/10 bg-black/10 px-3 py-2 text-left text-xs text-white/45 transition hover:border-cyan-300/20 hover:text-cyan-100"
                >
                  {question}
                </button>
              ))}
            </div>

            <form
              onSubmit={askAI}
              className="mt-6 flex flex-col gap-3 sm:flex-row"
            >
              <input
                aria-label="Ask the portfolio AI"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="e.g. What backend technologies does Prantik use?"
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none transition placeholder:text-white/25 focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-300/10"
              />

              <button
                disabled={loading}
                className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Thinking…" : "Ask AI"}
              </button>
            </form>

            {answer && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-5 text-sm leading-7 text-white/70"
              >
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[.2em] text-cyan-300/70">
                  Assistant response
                </p>
                {answer}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 md:px-8"
      >
        <div className="border-t border-white/[.08] pt-12">
          <p className="text-xs font-semibold uppercase tracking-[.25em] text-cyan-300">
            Contact
          </p>

          <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="max-w-3xl text-4xl font-black tracking-tight md:text-6xl">
                Let’s build something useful.
              </h2>

              <p className="mt-5 max-w-xl text-white/50">
                For opportunities, collaborations, or technical
                conversations, the fastest way to reach me is email.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-cyan-100"
                href={`mailto:${profile.email}`}
              >
                <Mail className="h-4 w-4" />
                Email me
              </a>

              <a
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold transition hover:border-cyan-300/30 hover:bg-white/[.04]"
                href={profile.github}
                target="_blank"
                rel="noreferrer"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>

              <a
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold transition hover:border-cyan-300/30 hover:bg-white/[.04]"
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </div>

          <div className="mt-12 flex flex-col justify-between gap-3 border-t border-white/[.06] pt-6 text-xs text-white/30 md:flex-row">
            <span>© 2026 Prantik Chakraborty</span>
            <span>Next.js · Python · FastAPI · PostgreSQL · AI</span>
          </div>
        </div>
      </section>
    </main>
  );
}

/* Section component */
function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 md:px-8"
    >
      <p className="text-xs font-semibold uppercase tracking-[.25em] text-cyan-300">
        {eyebrow}
      </p>

      <div className="mt-3 mb-10 flex items-end justify-between gap-6">
        <h2 className="max-w-4xl text-4xl font-black tracking-tight md:text-5xl">
          {title}
        </h2>

        <div className="hidden h-px flex-1 bg-white/[.07] md:block" />
      </div>

      {children}
    </section>
  );
}

/* Stat component */
function Stat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[.2em] text-white/30">
        {label}
      </p>

      <p className="mt-1 font-semibold text-white/85">{value}</p>
    </div>
  );
}

/* Metric component */
function Metric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[.07] bg-white/[.02] p-4 transition hover:-translate-y-0.5 hover:border-cyan-300/15">
      <div className="text-cyan-300">{icon}</div>

      <p className="mt-3 text-[11px] uppercase tracking-wider text-white/30">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}

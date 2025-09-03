"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Rocket, Calendar, Network, Users, Gift, Shield, Code, Cpu, Globe, Timer, ChevronRight, Mail, Trophy, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const EVENT = {
  name: "Hack The Net",
  tagline: "Empowering students to hack the future.",
  start: new Date("2026-03-14T08:00:00-05:00"),
  end: new Date("2026-03-23T18:00:00-05:00"),
  location: "Virtual Hackathon",
  registrationUrl: "https://app.youform.com/forms/t57t7025",
  sponsorEmail: "hackthenet@gmail.com",
};

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState<string>("");
  useEffect(() => {
    const update = () => {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;
      if (diff <= 0) {
        setTimeLeft("00d : 00h : 00m : 00s");
        return;
      }
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setTimeLeft(`${String(d).padStart(2, "0")}d : ${String(h).padStart(2, "0")}h : ${String(m).padStart(2, "0")}m : ${String(s).padStart(2, "0")}s`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return timeLeft;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.5, ease: "easeOut" } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const SmoothScrollLink = ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { children: React.ReactNode }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};

const Logo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 37.5C30.3553 37.5 38.75 29.1053 38.75 18.75C38.75 8.39469 30.3553 0 20 0C9.64469 0 1.25 8.39469 1.25 18.75C1.25 29.1053 9.64469 37.5 20 37.5Z" fill="#2D2A32"/>
    <path d="M20 35C28.2843 35 35 27.2091 35 18.75C35 10.2909 28.2843 2.5 20 2.5C11.7157 2.5 5 10.2909 5 18.75C5 27.2091 11.7157 35 20 35Z" stroke="#3A1E52" strokeWidth="2.5"/>
    <path d="M35 18.75C35 27.2091 28.2843 35 20 35C11.7157 35 5 27.2091 5 18.75C5 10.2909 11.7157 2.5 20 2.5C28.2843 2.5 35 10.2909 35 18.75Z" stroke="#9370DB" strokeOpacity="0.5"/>
    <path d="M5 18.75H35" stroke="#9370DB" strokeOpacity="0.5"/>
    <path d="M20 2.5C18.0396 2.5 16.1264 2.87125 14.3331 3.58187C10.7834 5.00188 8.01906 7.78313 6.62156 11.3719M20 2.5C21.9604 2.5 23.8736 2.87125 25.6669 3.58187C29.2166 5.00188 31.9809 7.78313 33.3784 11.3719" stroke="#9370DB" strokeOpacity="0.5"/>
    <path d="M20 35C21.9604 35 23.8736 34.6288 25.6669 33.9181C29.2166 32.4981 31.9809 29.7169 33.3784 26.1281M20 35C18.0396 35 16.1264 34.6288 14.3331 33.9181C10.7834 32.4981 8.01906 29.7169 6.62156 26.1281" stroke="#9370DB" strokeOpacity="0.5"/>
    <path d="M20 2.5V35" stroke="#9370DB" strokeOpacity="0.5"/>
    <ellipse cx="20" cy="18.75" rx="8.125" ry="16.25" stroke="#9370DB" strokeOpacity="0.5"/>
    <ellipse cx="20" cy="18.75" rx="15" ry="5.625" stroke="#9370DB" strokeOpacity="0.5"/>
    <path d="M20 2.5C16.8297 2.5 13.9186 4.34125 12.0078 7.37125" stroke="#9370DB" strokeOpacity="0.5"/>
    <path d="M20 2.5C23.1703 2.5 26.0814 4.34125 27.9922 7.37125" stroke="#9370DB" strokeOpacity="0.5"/>
    <path d="M20 35C23.1703 35 26.0814 33.1587 27.9922 30.1287" stroke="#9370DB" strokeOpacity="0.5"/>
    <path d="M20 35C16.8297 35 13.9186 33.1587 12.0078 30.1287" stroke="#9370DB" strokeOpacity="0.5"/>
    <path d="M16.25 15V22.5H18.125V18.75H21.875V22.5H23.75V15H21.875V17.5H18.125V15H16.25Z" fill="#4B2E72"/>
    <path d="M16.4219 15.2188L17.2812 15.3438L16.4219 16.5V15.2188Z" fill="#3A1E52"/>
    <path d="M23.5781 22.2812L22.7188 22.1562L23.5781 21V22.2812Z" fill="#3A1E52"/>
    <path d="M10.2812 12.5C10.4375 12.5 10.5625 12.625 10.5625 12.8438C10.5625 12.9375 10.5312 13.0312 10.5 13.0938C10.4375 13.1875 10.375 13.25 10.2812 13.25C10.1562 13.25 10 13.125 10 12.9688C10 12.7812 10.125 12.5 10.2812 12.5Z" fill="#9370DB"/>
    <path d="M10.2812 12.5L10 12.9688L10.5625 12.8438L10.2812 12.5Z" fill="#4B2E72"/>
  </svg>
);

export default function HackTheNet() {
  const countdown = useCountdown(EVENT.start);

  const perks = [
    { icon: <Cpu className="h-5 w-5" />, title: "24/7 Workspace", text: "Power, snacks, mentors, and lightning-fast Wi-Fi." },
    { icon: <Users className="h-5 w-5" />, title: "Mentor Rooms", text: "Book time with experts in AI, web, cloud, and hardware." },
    { icon: <Gift className="h-5 w-5" />, title: "Prizes & Swag", text: "Win big and grab exclusive event merch." },
    { icon: <Shield className="h-5 w-5" />, title: "Beginner-Friendly", text: "Workshops and starter kits to help you ship." },
  ];

  const paths = [
    { icon: <Rocket className="h-6 w-6" />, title: "Hard Coding", text: "Show off your raw coding skills. Build from the ground up, optimize for performance, and solve complex challenges with pure algorithms." },
    { icon: <Code className="h-6 w-6" />, title: "AI-Powered App Generation", text: "Use AI to write the code for your entire application, from frontend to backend." },
    { icon: <Shield className="h-6 w-6" />, title: "Cybersecurity", text: "Secure the stack: detection, response, auth, and resilience." },
    { icon: <Palette className="h-6 w-6" />, title: "Vibecoding", text: "Create something beautiful, artistic, or just plain fun. The vibe is the only limit." },
  ];

  const schedule = [
    { time: "Day 1 — 3:00 PM", label: "Check-in & Team Formation" },
    { time: "Day 1 — 6:00 PM", label: "Opening Ceremony + Keynote" },
    { time: "Day 1 — 7:30 PM", label: "Hacking Begins" },
    { time: "Day 2 — 10:00 AM", label: "Workshops + Office Hours" },
    { time: "Day 2 — 7:00 PM", label: "Mini-challenges & Demos" },
    { time: "Day 3 — 12:00 PM", label: "Project Submission Deadline" },
    { time: "Day 3 — 1:30 PM", label: "Judging & Expo" },
    { time: "Day 3 — 5:00 PM", label: "Awards + Closing" },
  ];
  
  const prizes = [
    { icon: <Trophy className="h-8 w-8 text-amber-400" />, title: "Grand Prize", text: "$5,000 cash, plus high-end gear from our sponsors and a featured spot on our blog." },
    { icon: <Trophy className="h-8 w-8 text-slate-300" />, title: "Path Winners", text: "$1,500 for the best project in each path: Open Internet, AI x DevTools, and Cybersecurity." },
    { icon: <Trophy className="h-8 w-8 text-orange-400" />, title: "Best Wildcard", text: "$1,000 for the most creative, fun, or surprising 'Wildcard' project." },
  ];

  const faqs = [
    { q: "Who can participate?", a: "Students, professionals, and beginners are welcome. Form a team of up to 4 or hack solo—your call." },
    { q: "What should I bring?", a: "Laptop, chargers, valid ID, and anything you need to be comfy (hoodie, water bottle, etc.). We provide power and Wi-Fi." },
    { q: "Is it free?", a: "Yes! Thanks to our sponsors, admission is free for accepted hackers." },
    { q: "Do I need an idea beforehand?", a: "Nope. We'll run team-forming sessions and idea jams to help you get rolling." },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <motion.div
        initial="hidden" animate="visible" variants={fadeIn}
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 h-80 w-[48rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-40 left-1/4 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/3 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl animate-spin-slow" />
      </motion.div>

      <header className="sticky top-0 z-50 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
        <motion.div
          initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}
          className="mx-auto flex max-w-7xl items-center justify-between p-4"
        >
          <a href="#" className="flex items-center gap-2">
            <motion.div whileHover={{ rotate: 15 }}><Logo /></motion.div>
            <span className="text-lg font-semibold">{EVENT.name}</span>
          </a>
          <nav className="hidden gap-6 md:flex">
            {["About", "Paths", "Schedule", "Prizes", "FAQ"].map((link) => (
              <motion.div
                key={link}
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
              >
                <SmoothScrollLink
                  href={`#${link.toLowerCase()}`}
                  className="text-sm text-neutral-300 transition-colors hover:text-white"
                >
                  {link}
                </SmoothScrollLink>
              </motion.div>
            ))}
          </nav>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild className="rounded-xl bg-primary hover:bg-primary/90">
              <a href={EVENT.registrationUrl}>Register <ChevronRight className="ml-1 h-4 w-4" /></a>
            </Button>
          </motion.div>
        </motion.div>
      </header>

      <main>
        <section className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:pt-24" id="about">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <motion.div variants={fadeInUp} initial="hidden" animate="visible">
              <Badge className="mb-3 bg-gradient-to-r from-primary to-accent text-primary-foreground">9 day hackathon</Badge>
              <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">{EVENT.name}</h1>
              <p className="mt-4 max-w-xl text-lg text-neutral-300">{EVENT.tagline}</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4 text-sm text-neutral-300">
                <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4 text-accent" />{new Date(EVENT.start).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })} - {new Date(EVENT.end).toLocaleDateString(undefined, { day: 'numeric', year: 'numeric' })}</span>
                <span className="inline-flex items-center gap-2"><Network className="h-4 w-4 text-accent" />{EVENT.location}</span>
              </div>
              <div className="mt-8 flex items-center gap-3">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild size="lg" className="rounded-xl bg-primary hover:bg-primary/90">
                    <a href={EVENT.registrationUrl}>Apply to Hack</a>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="secondary" asChild size="lg" className="rounded-xl">
                    <SmoothScrollLink href="#paths">Explore Paths</SmoothScrollLink>
                  </Button>
                </motion.div>
              </div>
              <motion.div initial="hidden" animate="visible" variants={scaleIn} transition={{ delay: 0.2 }}>
                <Card className="mt-8 border-border bg-card">
                  <CardContent className="flex items-center justify-between gap-4 p-4">
                    <div className="flex items-center gap-3">
                      <Timer className="h-5 w-5 text-neutral-300" />
                      <div>
                        <p className="text-xs uppercase tracking-wide text-neutral-400">Countdown to kickoff</p>
                        <p className="text-lg font-semibold tabular-nums">{countdown}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-primary/50 text-neutral-300">Limited spots</Badge>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-[2rem] border border-border bg-card p-6 shadow-2xl">
                <div className="grid gap-4 md:grid-cols-2">
                  {perks.map((p, i) => (
                    <motion.div key={i} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                      <Card className="border-border bg-background/50 transition-shadow hover:shadow-primary/20">
                        <CardHeader className="flex flex-row items-center gap-3 space-y-0 p-4">
                          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-secondary">{p.icon}</div>
                          <CardTitle className="text-base">{p.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 text-sm text-neutral-300">{p.text}</CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="paths" className="py-20 sm:py-32">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mx-auto max-w-7xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Choose Your Path</h2>
              <p className="mt-4 text-lg text-neutral-300">Choose whichever style you prefer. We have everything that'll pique your interest.</p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {paths.map((path, i) => (
                <motion.div key={path.title} variants={fadeInUp} transition={{ delay: i * 0.1 }}>
                  <Card className="h-full border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20">
                    <CardHeader>
                      <div className="mb-4 grid h-12 w-12 place-items-center rounded-lg bg-secondary text-primary">{path.icon}</div>
                      <CardTitle>{path.title}</CardTitle>
                    </CardHeader>
                    <CardContent><p className="text-neutral-300">{path.text}</p></CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
        
        <section id="schedule" className="py-20 sm:py-32">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mx-auto max-w-7xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Event Schedule</h2>
              <p className="mt-4 text-lg text-neutral-300">48 hours of building, learning, and connecting. Here's what to expect.</p>
            </div>
            <div className="mt-16 flow-root">
              <div className="-my-8">
                {schedule.map((item, i) => (
                  <div key={i} className="relative py-8">
                    {i < schedule.length -1 && <span className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-border" aria-hidden="true" />}
                    <motion.div variants={fadeInUp} className="relative flex items-center space-x-6">
                      <div className="z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary"><Calendar className="h-5 w-5" /></div>
                      <div>
                        <p className="font-semibold">{item.label}</p>
                        <p className="text-sm text-neutral-400">{item.time}</p>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <section id="prizes" className="py-20 sm:py-32">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mx-auto max-w-7xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Prizes & Glory</h2>
              <p className="mt-4 text-lg text-neutral-300">Win incredible prizes, and more importantly, eternal bragging rights.</p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              {prizes.map((prize, i) => (
                <motion.div key={prize.title} variants={fadeInUp} transition={{ delay: i * 0.1 }}>
                  <Card className="h-full border-border bg-card text-center">
                    <CardHeader className="items-center">
                      <div className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-secondary">{prize.icon}</div>
                      <CardTitle>{prize.title}</CardTitle>
                    </CardHeader>
                    <CardContent><p className="text-neutral-300">{prize.text}</p></CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
        
        <section id="faq" className="py-20 sm:py-32">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mx-auto max-w-4xl px-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently Asked Questions</h2>
            </div>
            <Accordion type="single" collapsible className="mt-12 w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-border">
                  <AccordionTrigger className="text-left text-lg hover:no-underline">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-base text-neutral-300">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </section>

        <section className="py-20 sm:py-32">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mx-auto max-w-7xl px-4">
            <Card className="relative overflow-hidden bg-gradient-to-r from-primary to-accent p-8 text-center md:p-12">
              <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">Ready to Build the Future?</h2>
              <p className="mt-4 text-lg text-primary-foreground/90">Don't miss out. Spots are limited and filling up fast.</p>
              <div className="mt-8">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                  <Button asChild size="lg" variant="secondary" className="rounded-xl bg-background/20 text-foreground hover:bg-background/30">
                    <a href={EVENT.registrationUrl}>Apply to Hack The Net</a>
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-border bg-background/50">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <Logo />
              <span className="font-semibold">{EVENT.name}</span>
            </div>
            <p className="text-center text-sm text-neutral-400">
              Sponsorship inquiries: <a href={`mailto:${EVENT.sponsorEmail}`} className="text-accent hover:underline">{EVENT.sponsorEmail}</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

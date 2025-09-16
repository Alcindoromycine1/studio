"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Rocket, Calendar, Network, Users, Gift, Shield, Code, Cpu, Globe, Timer, ChevronRight, Mail, Trophy, Palette, Video, Wrench, Instagram, Linkedin, Target, Users2, BrainCircuit, Group } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Starfield } from "@/components/ui/starfield";

const EVENT = {
  name: "Hack The Net",
  tagline: "Empowering students to hack the future.",
  start: new Date("2026-03-14T08:00:00"),
  end: new Date("2026-03-23T18:00:00-05:00"),
  location: "Virtual Hackathon",
  registrationUrl: "https://app.youform.com/forms/t57t7025",
  sponsorEmail: "hackthenethackathon@gmail.com",
  discordUrl: "https://discord.com/invite/deBB7QCqKn",
  linkedinUrl: "https://www.linkedin.com/company/hack-the-net/about/",
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

const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03.42.42 0 0 0-.1.36l.64 2.26a11.12 11.12 0 0 1-3.37.27 11.12 11.12 0 0 1-3.37-.27L8.13 4.4A.42.42 0 0 0 8 4a.09.09 0 0 0-.07-.03c-1.5.26-2.94.71-4.27 1.33a.43.43 0 0 0-.2 0 .4.4 0 0 0-.14.41l1.46 5.35A12.58 12.58 0 0 0 2.2 17.11a.41.41 0 0 0 .1.46.42.42 0 0 0 .43.14 20.21 20.21 0 0 0 5.25-2.22 10.87 10.87 0 0 0 2.06.33 10.87 10.87 0 0 0 2.06-.33 20.21 20.21 0 0 0 5.25 2.22.42.42 0 0 0 .43-.14.41.41 0 0 0 .1-.46 12.58 12.58 0 0 0-2.61-5.92L21.31 6a.4.4 0 0 0-.14-.41.43.43 0 0 0-.2 0zM8.5 13.5C7.67 13.5 7 12.83 7 12s.67-1.5 1.5-1.5S10 11.17 10 12s-.67 1.5-1.5 1.5zm7 0c-.83 0-1.5-.67-1.5-1.5S14.67 10.5 15.5 10.5 17 11.17 17 12s-.67 1.5-1.5 1.5z"/>
    </svg>
);

const Logo = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 0L24.3284 5.67157L30 3.81966L31.1803 10L37.3644 10.3371L36.1803 16.1803L40 20L36.1803 23.8197L37.3644 29.6629L31.1803 30L30 36.1803L24.3284 34.3284L20 40L15.6716 34.3284L10 36.1803L8.81966 30L2.63565 29.6629L3.81966 23.8197L0 20L3.81966 16.1803L2.63565 10.3371L8.81966 10L10 3.81966L15.6716 5.67157L20 0Z" fill="hsl(var(--primary))"/>
      <path d="M26 14L14 26M14 14L26 26" stroke="hsl(var(--primary-foreground))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export default function HackTheNet() {
  const countdown = useCountdown(EVENT.start);

  const perks = [
    { icon: <Globe className="h-5 w-5" />, title: "Experience", text: "Acquire meaningful professional experience in Computer Science; enhance your knowledge. " },
    { icon: <Users className="h-5 w-5" />, title: "Teams", text: "Grab your friends and build your dream squad. Teams are up to 4 people." },
    { icon: <Gift className="h-5 w-5" />, title: "Prizes", text: <>Total Cash prizes up to <span className="font-bold">$500</span> plus your very own project for your portfolio.</> },
    { icon: <Video className="h-5 w-5" />, title: "Workshops", text: "Giving you an in-depth tutorial on how to start and take off on this hackathon." },
  ];
  
  const aboutCards = [
    { icon: <Calendar className="h-10 w-10 text-accent" />, title: "Schedule", text: `A 9-day virtual event from ${EVENT.start.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })} to March 22` },
    { icon: <Users2 className="h-10 w-10 text-accent" />, title: "Who It's For", text: "Open to all students, from seasoned coders to curious beginners. Everyone is welcome to join." },
    { icon: <Group className="h-10 w-10 text-accent" />, title: "Team Size", text: "You can hack solo or form a team of up to 4 people. Collaborate and bring your ideas to life." },
    { icon: <BrainCircuit className="h-10 w-10 text-accent" />, title: "Innovation & Learning", text: "Workshops, mentors, and resources to spark creativity and help you grow new skills." },
  ];

  const prizes = [
    { icon: <Trophy className="h-8 w-8 text-amber-400" />, title: "1st Place", text: <span className="text-4xl font-bold">$100 Cash Prize</span> },
    { icon: <Trophy className="h-8 w-8 text-slate-300" />, title: "2nd Place", text: <span className="text-3xl font-bold">$50 Cash</span> },
    { icon: <Trophy className="h-8 w-8 text-orange-400" />, title: "3rd Place", text: <span className="text-3xl font-bold">$25 Cash</span> },
  ];

  const judges = [
    { name: "Ricky Phan", title: "Videographer, Social Media Manager", image: "https://picsum.photos/seed/1/300/300", hint: "person" },
    { name: "Noah Sussman", title: "Director of Logistics", image: "https://picsum.photos/seed/2/300/300", hint: "person" },
    { name: "Akhilan Saravanan", title: "Sponsorship/Financial coordinator", image: "https://picsum.photos/seed/3/300/300", hint: "person" },
    { name: "Rudra Garg", title: "Social Media Intern, Video Editor", image: "https://picsum.photos/seed/4/300/300", hint: "person" },
  ];

  const faqs = [
    { q: "Who can participate?", a: "Students, professionals, and beginners are welcome. Form a team of up to 4 or hack solo." },
    { q: "Is it free?", a: "Yes! Admission is free for everyone!" },
    { q: "Do I need an idea beforehand?", a: "Nope. We'll run team-forming sessions and idea jams to help you get rolling." },
    { q: "When and where is the hackathon?", a: "HackTheNet 2026 is a 9-day virtual event from March 14 to March 23, 2026. Everything will be hosted online, so you can join from anywhere." },
    { q: "What can I build?", a: "Anything you like! Web, mobile, AI, hardware, or something totally out of the box. As long as it follows the rules, you’re free to innovate." },
    { q: "Are there prizes?", a: "Yes! We’ll have prizes for top projects, creative ideas, and more. Details will be shared closer to the event." },
    { q: "Do I need to know how to code?", a: "Not at all. Beginners are welcome! We’ll have workshops and mentors to help you learn and build something amazing." },
    { q: "How do I find a team?", a: "We’ll host networking sessions and team-matching events so you can meet others and form a group. You can also participate solo." },
  ];

  return (
    <div className="min-h-screen text-foreground">
      <Starfield />
      <div className="fixed inset-0 -z-10 bg-background/70"></div>
      
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
            {["About", "Prizes", "Judges", "FAQ"].map((link) => (
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
        <section className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:pt-24" id="home">
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
                    <SmoothScrollLink href="#about">Learn More</SmoothScrollLink>
                  </Button>
                </motion.div>
              </div>
              <motion.div initial="hidden" animate="visible" variants={scaleIn} transition={{ delay: 0.2 }}>
                <Card className="mt-8 border-border bg-card">
                  <CardContent className="flex items-center justify-between gap-4 p-4">
                    <div className="flex items-center gap-3">
                      <Timer className="h-5 w-5 text-neutral-300" />
                      <div>
                        <p className="text-xs uppercase tracking-wide text-neutral-400">Countdown to Hackathon</p>
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

        <section id="about" className="py-20 sm:py-32">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mx-auto max-w-7xl px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">About The Hackathon</h2>
              <p className="mt-4 text-lg text-neutral-300">
                Hack The Net is a 9-day virtual hackathon where students from across Canada come together to learn, build, and innovate.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {aboutCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  className="relative h-48 overflow-hidden rounded-lg border border-border bg-card p-6 text-center"
                  initial="initial"
                  whileHover="hover"
                  variants={{ initial: { y: 0 }, hover: { y: -8, shadow: '0 10px 20px -5px hsl(var(--primary) / 0.2)' } }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <motion.div
                    className="flex h-full flex-col items-center justify-center"
                    variants={{
                      initial: { y: 0, scale: 1 },
                      hover: { y: -20, scale: 0.8 },
                    }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    {card.icon}
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-end p-6"
                    initial={{ opacity: 0, y: 20 }}
                    variants={{
                      hover: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1 }}
                  >
                    <h3 className="text-xl font-bold">{card.title}</h3>
                    <p className="mt-2 text-sm text-neutral-300">{card.text}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
        
        <section id="prizes" className="py-20 sm:py-32">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mx-auto max-w-7xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Prizes & Glory</h2>
              <p className="mt-4 text-lg text-neutral-300">Win amazing prizes, and show-off your incredible talent.</p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8">
              <motion.div variants={fadeInUp}>
                <Card className="border-border bg-card text-center">
                  <CardHeader className="items-center">
                    <div className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-secondary">{prizes[0].icon}</div>
                    <CardTitle>{prizes[0].title}</CardTitle>
                  </CardHeader>
                  <CardContent><p className="text-neutral-300">{prizes[0].text}</p></CardContent>
                </Card>
              </motion.div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {prizes.slice(1).map((prize, i) => (
                  <motion.div key={prize.title} variants={fadeInUp} transition={{ delay: (i + 1) * 0.1 }}>
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
            </div>
          </motion.div>
        </section>

        <section id="judges" className="py-20 sm:py-32">
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mx-auto max-w-7xl px-4">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Meet The Judges</h2>
                </div>
                <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {judges.map((judge, i) => (
                        <motion.div
                            key={judge.name}
                            className="group relative"
                            initial="initial"
                            whileHover="hover"
                            variants={{
                                initial: { y: 0 },
                                hover: { y: -8 },
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="relative overflow-hidden rounded-lg border border-border bg-card shadow-lg transition-all duration-300 group-hover:shadow-primary/20">
                                <motion.div 
                                    className="flex flex-col items-center p-6"
                                    variants={{
                                        initial: { gap: 16 },
                                        hover: { gap: 0 },
                                    }}
                                >
                                    <div className="relative h-32 w-32 rounded-full overflow-hidden">
                                        <Image src={judge.image} alt={judge.name} width={300} height={300} className="h-full w-full object-cover" data-ai-hint={judge.hint}/>
                                    </div>
                                    <h3 className="text-lg font-semibold">{judge.name}</h3>
                                </motion.div>

                                <motion.div
                                    className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-card/90 backdrop-blur-sm"
                                    initial={{ opacity: 0 }}
                                    variants={{
                                        hover: { opacity: 1, transition: { delay: 0.1, duration: 0.3 } },
                                        initial: { opacity: 0, transition: { duration: 0.3 } },
                                    }}
                                >
                                    <div className="relative h-24 w-24 rounded-full overflow-hidden mb-4">
                                      <Image src={judge.image} alt={judge.name} width={300} height={300} className="h-full w-full object-cover" data-ai-hint={judge.hint}/>
                                    </div>
                                    <h3 className="text-lg font-bold">{judge.name}</h3>
                                    <p className="text-sm text-accent">{judge.title}</p>
                                    <p className="mt-2 text-xs text-neutral-300">More details about the judge can be shown here on hover, filling out the card.</p>
                                </motion.div>
                            </div>
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
            <div className="flex items-center gap-4 text-sm text-neutral-400">
              <a href={`mailto:${EVENT.sponsorEmail}`} className="flex items-center gap-2 text-accent hover:underline">
                <Mail className="h-4 w-4" />
                {EVENT.sponsorEmail}
              </a>
              <a href="https://instagram.com/hackthenet2026" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-accent hover:underline">
                <Instagram className="h-4 w-4" />
                @hackthenet2026
              </a>
              <a href={EVENT.discordUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-accent hover:underline">
                <DiscordIcon className="h-4 w-4" />
                Join our Discord
              </a>
              <a href={EVENT.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-accent hover:underline">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

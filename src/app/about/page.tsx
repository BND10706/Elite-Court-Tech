export const metadata = {
  title: 'About | Elite Court Tech',
  description: 'Learn about Elite Court Tech and our mission to elevate basketball training.',
}

export default function AboutPage() {
  return (
    <main className='bg-background-primary text-text-primary min-h-[60vh]'>
      <section className='relative overflow-hidden'>
        <div className='container mx-auto px-6 py-16 md:py-24'>
          <h1 className='text-4xl md:text-5xl font-extrabold tracking-wider text-[var(--accent-orange)]'>
            About Us
          </h1>
          <p className='mt-6 max-w-3xl text-lg leading-relaxed text-text-secondary'>
            Elite Court Tech was founded by a group of Central Florida college students who grew up
            living and breathing the game of basketball. What started as long hours in the gym and a
            relentless obsession with player development turned into a mission: build modern, data‑aware,
            durable training tools that actually help athletes and coaches get better—faster.
          </p>
          <p className='mt-6 max-w-3xl text-text-secondary'>
            We design, prototype, test, and refine every product ourselves. That hands‑on approach keeps us
            close to the real problems players face: consistency, feedback, repetition quality, and skill
            transfer under game speed. Each iteration is informed by on‑court sessions—what breaks, what
            distracts, what accelerates improvement—and we keep only what earns its place.
          </p>
          <p className='mt-6 max-w-3xl text-text-secondary'>
            Our early lineup focuses on foundational skill enhancers and intelligent accessories that slot
            seamlessly into existing workouts. Looking ahead, we&apos;re investing in sensor integration,
            responsive training surfaces, and modular systems that scale from solo grind sessions to team
            practice environments.
          </p>
          <p className='mt-6 max-w-3xl text-text-secondary'>
            We believe elite development shouldn&apos;t be locked behind exclusive facilities. With the
            right tools, intent, and repetition, any court can become a lab for improvement. That belief
            drives our product philosophy: rugged build, intuitive use, meaningful feedback.
          </p>
          <p className='mt-6 max-w-3xl text-text-secondary'>
            This is just the beginning. As we grow, we&apos;ll continue partnering with athletes, trainers,
            and coaches to push skill acquisition forward. If you share our passion for the craft of
            getting better, you&apos;re already part of the Elite Court Tech story.
          </p>
          <p className='mt-8 max-w-3xl font-semibold tracking-wide text-[var(--accent-orange)]'>
            Built by players. Refined through reps. Engineered for progress.
          </p>
        </div>
      </section>
    </main>
  )
}

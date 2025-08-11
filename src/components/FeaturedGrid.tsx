import Image from 'next/image'

export default function FeaturedGrid() {
  return (
    <section
      id='collections'
      className='text-text-secondary body-font bg-background-primary'
    >
      <div className='container px-5 py-16 md:py-20 mx-auto'>
        <div className='flex flex-wrap w-full mb-10 md:mb-16 items-end'>
          <div className='lg:w-1/2 w-full mb-6 lg:mb-0'>
            <h2 className='sm:text-3xl text-2xl font-semibold title-font mb-2 text-text-primary'>
              Shop Featured Collections
            </h2>
            <div className='h-1 w-20 bg-accent-orange rounded'></div>
          </div>
          <p className='lg:w-1/2 w-full leading-relaxed'>
            Pro-level basketball gear and training essentials. Built for
            control, comfort, and durability—on hardwood or blacktop.
          </p>
        </div>

        <div className='flex flex-wrap -m-4'>
          {/* Card 1 */}
          <div className='xl:w-1/4 md:w-1/2 p-4'>
            <div className='bg-background-secondary/60 p-6 rounded-lg ring-1 ring-white/10'>
              <div className='relative h-40 w-full mb-6'>
                <Image
                  src='https://images.unsplash.com/photo-1627627256672-027a4613d028?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                  alt='Balls & Grips'
                  fill
                  className='rounded object-cover object-center'
                />
              </div>
              <h3 className='tracking-widest text-accent-orange text-xs font-medium title-font'>
                COLLECTION
              </h3>
              <h4 className='text-lg text-text-primary font-medium title-font mb-2'>
                Balls & Grips
              </h4>
              <p className='leading-relaxed text-sm'>
                Elite composite leather, indoor/outdoor ready. Designed for true
                bounce and superior handle.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className='xl:w-1/4 md:w-1/2 p-4'>
            <div className='bg-background-secondary/60 p-6 rounded-lg ring-1 ring-white/10'>
              <div className='relative h-40 w-full mb-6'>
                <Image
                  src='https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                  alt='Training Gear'
                  fill
                  className='rounded object-cover object-center'
                />
              </div>
              <h3 className='tracking-widest text-accent-orange text-xs font-medium title-font'>
                COLLECTION
              </h3>
              <h4 className='text-lg text-text-primary font-medium title-font mb-2'>
                Training Gear
              </h4>
              <p className='leading-relaxed text-sm'>
                Agility ladders, cones, bands—everything you need to gain speed,
                balance, and control.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className='xl:w-1/4 md:w-1/2 p-4'>
            <div className='bg-background-secondary/60 p-6 rounded-lg ring-1 ring-white/10'>
              <div className='relative h-40 w-full mb-6'>
                <Image
                  src='https://images.unsplash.com/photo-1602357280104-742c517a1d82?q=80&w=1900&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                  alt='Court Essentials'
                  fill
                  className='rounded object-cover object-center'
                />
              </div>
              <h3 className='tracking-widest text-accent-orange text-xs font-medium title-font'>
                COLLECTION
              </h3>
              <h4 className='text-lg text-text-primary font-medium title-font mb-2'>
                Court Essentials
              </h4>
              <p className='leading-relaxed text-sm'>
                Nets, pumps, and maintenance tools to keep your setup game-ready
                every day.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className='xl:w-1/4 md:w-1/2 p-4'>
            <div className='bg-background-secondary/60 p-6 rounded-lg ring-1 ring-white/10'>
              <div className='relative h-40 w-full mb-6'>
                <Image
                  src='https://images.unsplash.com/photo-1625708458528-802ec79b1ed8?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                  alt='Apparel & Accessories'
                  fill
                  className='rounded object-cover object-center'
                />
              </div>
              <h3 className='tracking-widest text-accent-orange text-xs font-medium title-font'>
                COLLECTION
              </h3>
              <h4 className='text-lg text-text-primary font-medium title-font mb-2'>
                Other Stuff
              </h4>
              <p className='leading-relaxed text-sm'>
                Lots of Other Stuff that we sell that will help you do whatever.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

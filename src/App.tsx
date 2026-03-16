import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ArrowRight, Battery, Clock, Cpu, Facebook, MapPin, Menu, Monitor, Moon, PhoneCall, Shield, Smartphone, Sun, ThumbsUp, X, Zap } from 'lucide-react'

// Constants
const SERVICES = [
  {
    title: 'iPhone Repairing',
    description: 'Specialized hardware & software repairs for all iPhone generations with precision tools.',
    icon: <Smartphone className="w-8 h-8" />,
  },
  {
    title: 'Original Displays',
    description: 'Premium display replacements featuring original color accuracy and touch sensitivity.',
    icon: <Monitor className="w-8 h-8" />,
  },
  {
    title: 'Official Batteries',
    description: 'Restore your device longevity with high-cycle original replacement batteries.',
    icon: <Battery className="w-8 h-8" />,
  },
  {
    title: 'System Services',
    description: 'Professional flashing, unlocking, and software troubleshooting for all major brands.',
    icon: <Cpu className="w-8 h-8" />,
  },
]

const TRUST_FACTORS = [
  {
    title: 'Official Warranty',
    description: 'Full peace of mind with every repair we perform.',
    icon: <Shield className="w-6 h-6" />,
  },
  {
    title: 'Express Service',
    description: 'Most common repairs completed within 60 minutes.',
    icon: <Zap className="w-6 h-6" />,
  },
  {
    title: 'Original Parts',
    description: 'We only use high-quality, genuine replacement components.',
    icon: <ThumbsUp className="w-6 h-6" />,
  },
  {
    title: 'Expert Hands',
    description: 'Years of specialized experience in mobile micro-electronics.',
    icon: <Clock className="w-6 h-6" />,
  },
]

const STEPS = [
  { id: '01', title: 'Free Diagnosis', description: 'Bring your device for a comprehensive health check at no cost.' },
  { id: '02', title: 'Quick Repair', description: 'Our technicians work efficiently using specialized equipment.' },
  { id: '03', title: 'Quality QA', description: 'Rigorous testing ensures everything works perfectly before hand-over.' },
]

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const toggleTheme = () => setIsDarkMode(!isDarkMode)

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 overflow-x-hidden ${isDarkMode ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3 shadow-lg' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative flex items-center gap-3 cursor-pointer group"
          >
            {/* Red glow behind logo */}
            <div className="absolute inset-0 bg-brand-red/40 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-12 h-12 rounded-xl overflow-hidden shadow-2xl shadow-brand-red/40 ring-2 ring-brand-red/20"
            >
              <img 
                src="https://i.postimg.cc/yNq6Lvcz/repair-hut.jpg" 
                alt="Repairing Hut Logo" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            <span className="text-2xl font-black tracking-tighter uppercase relative z-10">Repairing <span className="text-brand-red">Hut</span></span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {['Home', 'Services', 'Process', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-xs uppercase tracking-widest font-bold hover:text-brand-red transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-red transition-all group-hover:w-full" />
              </a>
            ))}
            <button 
              onClick={toggleTheme}
              className="p-3 rounded-2xl bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 hover:bg-slate-300 dark:hover:bg-white/10 transition-all"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
             <button 
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-white dark:bg-black flex flex-col items-center justify-center gap-12"
          >
            {['Home', 'Services', 'Process', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={() => setIsMenuOpen(false)}
                className="text-4xl font-black uppercase tracking-tighter hover:text-brand-red transition-colors"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-red/20 dark:bg-brand-red/30 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-red-500/10 dark:bg-red-400/20 blur-[120px] rounded-full" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-4xl mx-auto text-center flex flex-col items-center"
            >
              <motion.div variants={itemVariants} className="mb-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-red/10 text-brand-red border border-brand-red/20 text-xs font-black uppercase tracking-widest mx-auto">
                <Shield size={14} className="fill-brand-red/20" /> The Trusted Choice in Nittambuwa
              </motion.div>

              {/* Animated Hero Logo */}
              <motion.div 
                variants={itemVariants}
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 1, 0, -1, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="mb-14 relative inline-flex group"
              >
                <div className="absolute inset-0 bg-brand-red/20 blur-[80px] rounded-full scale-125 animate-pulse" />
                <img 
                  src="https://i.postimg.cc/yNq6Lvcz/repair-hut.jpg" 
                  alt="Repairing Hut" 
                  className="w-40 h-40 md:w-56 md:h-56 rounded-[38px] shadow-2xl relative z-10 object-cover border-4 border-black"
                />
              </motion.div>
              
              <motion.h1 variants={itemVariants} className="text-6xl md:text-[100px] font-black tracking-tighter leading-[0.9] mb-6 text-slate-900 dark:text-white">
                REPAIRING <span className="text-brand-red">HUT</span>
              </motion.h1>

              <motion.p variants={itemVariants} className="text-base md:text-xl text-slate-600 dark:text-white/60 mb-10 max-w-2xl mx-auto font-medium">
                Get everything done with us. We provide professional, high-precision mobile phone repair services that bring your devices back to life.
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a href="#services" className="btn-primary w-full sm:w-auto">
                  View Services <ArrowRight size={20} />
                </a>
                <a href="#contact" className="btn-secondary w-full sm:w-auto">
                  Contact Us
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats / Trust Section */}
        <section className="py-12 border-y border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02]">
           <div className="container mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                 {TRUST_FACTORS.map((factor, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="text-center md:text-left flex flex-col md:flex-row items-center gap-4"
                    >
                       <div className="p-3 bg-brand-red/10 rounded-2xl text-brand-red">
                          {factor.icon}
                       </div>
                       <div>
                          <h4 className="font-bold text-sm uppercase tracking-tight">{factor.title}</h4>
                          <p className="text-xs text-slate-500 dark:text-white/40">{factor.description}</p>
                       </div>
                    </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-32 relative">
          <div className="container mx-auto px-6">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="mb-20"
            >
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 uppercase">What we do</h2>
              <div className="w-24 h-2 bg-brand-red rounded-full" />
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {SERVICES.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="glass-card p-10 group cursor-default"
                >
                  <div className="mb-8 w-fit icon-container-invert">
                     {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 tracking-tight">{service.title}</h3>
                  <p className="text-slate-500 dark:text-white/60 leading-relaxed text-xs font-medium">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-32 bg-brand-red text-white overflow-hidden relative">
          {/* Enhanced background effects */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-black/30 blur-[150px] rounded-full" />
            <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-white/10 blur-[150px] rounded-full" />
            <div className="absolute inset-0 backdrop-blur-[2px]" />
          </div>
          
          <div className="absolute top-1/2 -right-32 -translate-y-1/2 p-20 opacity-40 pointer-events-none scale-[2] z-0">
             <Smartphone className="w-96 h-96 text-black" strokeWidth={3} />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-6xl">
               <motion.h2 
                 className="text-5xl md:text-7xl font-black tracking-tighter mb-16 uppercase leading-none dark:text-black text-white"
               >
                 Fast Service.<br />True Quality.
               </motion.h2>
               <div className="grid md:grid-cols-3 gap-8">
                  {STEPS.map((step, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      className="glass-card-3d p-8 relative overflow-hidden group"
                    >
                       <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12 blur-2xl" />
                       <div className="text-6xl font-black mb-8 text-white dark:text-black text-3d leading-none">{step.id}</div>
                       <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter text-white dark:text-black">{step.title}</h3>
                       <p className="text-base text-white/90 dark:text-black/80 font-medium leading-relaxed">{step.description}</p>
                    </motion.div>
                  ))}
               </div>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section id="location" className="py-32">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, rotate: -2 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                className="h-[500px] rounded-[40px] overflow-hidden shadow-2xl border-8 border-white dark:border-white/5"
              >
                 <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.2974874415514!2d80.09481677610664!3d7.143710292858102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2fb00494be909%3A0x8e833f405553531b!2sRepairing%20hut!5e0!3m2!1sen!2slk!4v1710574000000!5m2!1sen!2slk" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                ></iframe>
              </motion.div>
              <div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-5xl font-black tracking-tighter mb-12 uppercase">Visit Our Shop</h2>
                  <div className="space-y-10">
                    <div className="flex items-start gap-6">
                      <div className="p-4 bg-black rounded-3xl text-white shadow-xl shadow-black/20 border border-white/20 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                        <MapPin size={28} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Location</h3>
                        <p className="text-slate-500 dark:text-white/60 text-base leading-relaxed font-medium mb-6">
                          Repairing Hut<br />
                          424/3/1 Negombo Road<br />
                          Nittambuwa, Sri Lanka
                        </p>
                        <a 
                          href="https://maps.app.goo.gl/ZpSR3GsBz6g4biXC9" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn-primary !px-6 !py-2.5 !text-sm flex w-fit shadow-lg shadow-brand-red/20"
                        >
                          Get Directions <ArrowRight size={18} />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Blurred Red Separator */}
        <div className="relative h-64 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-black" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-red/50 to-transparent" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-32 bg-brand-red/20 blur-[100px] rounded-full" />
        </div>

        {/* Contact Section */}
        <section id="contact" className="py-32 bg-black text-white relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-red/20 blur-[150px] rounded-full" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-red/10 blur-[150px] rounded-full" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-20 items-center justify-between">
               <div className="md:max-w-md">
                  <h2 className="text-6xl font-black tracking-tighter mb-8 uppercase leading-none">Need a fast repair?</h2>
                  <p className="text-xl text-white/50 mb-12 font-medium">Quick response, professional care, and direct communication.</p>
                  <div className="flex gap-4">
                     <a href="https://www.facebook.com/share/g/1HfKkzbPUN/?mibextid=wwXIfr" target="_blank" className="p-5 bg-white/5 hover:bg-brand-red transition-all rounded-full border border-white/10">
                        <Facebook size={32} />
                     </a>
                  </div>
               </div>
               
               <div className="w-full md:w-fit space-y-6">
                  {[
                    { name: 'Achina', phone: '076 90 96 200' },
                    { name: 'Sandaruwan', phone: '070 62 90 200' }
                  ].map((person) => (
                    <motion.div 
                      key={person.name} 
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/[0.03] border border-white/10 p-8 rounded-[32px] flex flex-col sm:flex-row items-center gap-8 min-w-[320px] backdrop-blur-sm"
                    >
                      <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center shadow-lg shadow-black/20 border border-white/20">
                         <PhoneCall size={28} className="text-white" />
                      </div>
                      <div className="text-center sm:text-left">
                        <h3 className="text-white text-sm font-black uppercase tracking-widest mb-1">{person.name}</h3>
                        <p className="text-3xl font-black mb-4 text-white hover:text-brand-red transition-colors">
                          {person.phone}
                        </p>
                        <a href={`tel:${person.phone.replace(/\s/g, '')}`} className="bg-brand-red text-white px-6 py-2 rounded-full font-bold inline-flex items-center gap-2 hover:scale-105 transition-all text-sm uppercase tracking-tighter">
                          Call now <ArrowRight size={16} />
                        </a>
                      </div>
                    </motion.div>
                  ))}
               </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <div className="flex flex-col items-center justify-center gap-4 mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-brand-red/30 blur-xl rounded-full scale-125" />
              <img 
                src="https://i.postimg.cc/yNq6Lvcz/repair-hut.jpg" 
                alt="Repairing Hut" 
                className="w-16 h-16 rounded-2xl object-cover relative z-10 grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase text-white">Repairing <span className="text-brand-red">Hut</span></span>
          </div>
          <p className="text-white/20 text-sm font-bold tracking-widest uppercase">
            &copy; {new Date().getFullYear()} Repairing Hut. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

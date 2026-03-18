"use client";

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import CanvasHover from '@/components/CanvasHover';

export default function Home() {
  const router = useRouter();
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const dashRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Text Animation
    gsap.fromTo(textRef.current.children, 
      { y: 100, opacity: 0 },
      { 
        y: 0, opacity: 1, stagger: 0.2, duration: 1.2, ease: "power4.out",
        delay: 0.5 
      }
    );

    // SVG Drawing Animation
    const path = pathRef.current;
    if (path) {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: path,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1.5,
        }
      });
    }

    // Parallax Dashboard Mockup
    gsap.fromTo(dashRef.current,
      { y: 150, scale: 0.9, opacity: 0, rotationX: 10 },
      {
        y: 0, scale: 1, opacity: 1, rotationX: 0, duration: 1.5,
        scrollTrigger: {
          trigger: dashRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
        }
      }
    );

  }, []);

  return (
    <div style={{ backgroundColor: '#0f172a', color: 'white', overflow: 'hidden', minHeight: '100vh', position: 'relative' }}>
      {/* Interactive WebGL/Canvas Background */}
      <CanvasHover />

      {/* HERO SECTION */}
      <section 
        ref={heroRef}
        style={{ 
          height: '100vh', display: 'flex', flexDirection: 'column', 
          justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: 1 
        }}
      >
        <div ref={textRef} style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '7vw', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.04em', margin: 0, overflow: 'hidden' }}>
            <span style={{ display: 'block' }}>UNIFIED SOCIAL</span>
          </h1>
          <h1 style={{ fontSize: '7vw', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.04em', margin: 0, overflow: 'hidden', color: '#4F46E5' }}>
            <span style={{ display: 'block' }}>INTELLIGENCE.</span>
          </h1>
          <p style={{ marginTop: '2rem', fontSize: '1.25rem', color: '#94a3b8', maxWidth: '600px', marginInline: 'auto', overflow: 'hidden' }}>
            <span style={{ display: 'block' }}>The ultimate platform to manage all your accounts, deployments, and analytics in real-time.</span>
          </p>
        </div>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/sign-in')}
          style={{ 
            marginTop: '3.5rem', padding: '1.25rem 3rem', fontSize: '1.1rem', fontWeight: 'bold', 
            background: 'white', color: '#0f172a', border: 'none', borderRadius: '50px', cursor: 'pointer',
            boxShadow: '0 20px 40px rgba(79,70,229,0.3)', position: 'relative', overflow: 'hidden', zIndex: 10
          }}
        >
          ENTER DASHBOARD
        </motion.button>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={{ position: 'absolute', bottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}
        >
          <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#94a3b8' }}>Scroll</span>
          <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, #94a3b8, transparent)' }} />
        </motion.div>
      </section>

      {/* SVG CONNECTOR SECTION WITH GSAP SCROLLTRIGGER */}
      <section style={{ height: '30vh', position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center' }}>
        <svg width="40" height="100%" viewBox="0 0 40 400" style={{ overflow: 'visible' }}>
          <path 
            ref={pathRef}
            d="M 20 0 Q 80 200 20 400" 
            fill="none" 
            stroke="#4F46E5" 
            strokeWidth="4" 
            strokeLinecap="round"
          />
        </svg>
      </section>

      {/* DASHBOARD PREVIEW SECTION WITH PARALLAX */}
      <section style={{ padding: '2rem', minHeight: '80vh', display: 'flex', alignItems: 'center', zIndex: 1, position: 'relative' }}>
        <div 
          ref={dashRef}
          style={{ 
            maxWidth: '1200px', margin: '0 auto', background: 'rgba(255,255,255,0.03)', 
            border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', borderRadius: '24px', 
            padding: '2rem', boxShadow: '0 40px 80px rgba(0,0,0,0.5)', width: '100%',
            transformStyle: 'preserve-3d', perspective: '1000px'
          }}
        >
          {/* Faux Dashboard UI */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }} />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <motion.div initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }} style={{ height: '120px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }} />
              <motion.div initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} style={{ height: '120px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }} />
              <motion.div initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} style={{ height: '200px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} style={{ height: '300px', background: 'rgba(79, 70, 229, 0.1)', borderRadius: '12px', border: '1px solid rgba(79, 70, 229, 0.3)' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', height: '156px' }}>
                <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }} />
                <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER BANNER */}
      <section style={{ height: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0f1d', position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontSize: '5vw', fontWeight: 900, textTransform: 'uppercase', color: 'rgba(255,255,255,0.05)' }}>
          Ready to deploy?
        </h2>
      </section>
    </div>
  );
}

        
  
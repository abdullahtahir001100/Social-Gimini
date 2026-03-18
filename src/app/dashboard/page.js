"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { FaInstagram, FaLinkedin, FaTwitter, FaArrowUp, FaCircle } from 'react-icons/fa6';
import { SignedIn, useUser } from '@clerk/nextjs';
import styles from './dashboard.module.scss';
import SpotlightCard from '@/components/SpotlightCard';

const followerData = [
  { name: 'Jan', followers: 4000 }, { name: 'Feb', followers: 3000 },
  { name: 'Mar', followers: 5000 }, { name: 'Apr', followers: 2780 },
  { name: 'May', followers: 4890 }, { name: 'Jun', followers: 2390 },
  { name: 'Jul', followers: 3490 },
];

const distributionData = [
  { name: 'Direct', value: 400 },
  { name: 'Social', value: 300 },
  { name: 'Referral', value: 300 },
];

const COLORS = ['#000000', '#4F46E5', '#94A3B8'];

export default function Dashboard() {
  const { user } = useUser();

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className={styles.dashboard}
    >
      {/* Top Navigation / Breadcrumb Area */}
      <nav className={styles.topNav}>
        <span>Analytics / Overview</span>
        <div className={styles.liveIndicator}>
          <FaCircle className={styles.pulse} /> Live System Status
        </div>
      </nav>

      <header className={styles.header}>
        {/* Animated Video Background for Premium Feel */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className={styles.headerVideo}
        >
          <source src="https://cdn.pixabay.com/video/2020/05/12/38865-420087853_tiny.mp4" type="video/mp4" />
        </video>
        <div className={styles.headerOverlay}></div>
        
        <div className={styles.titleArea}>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, type: "spring" }}
          >
            Intelligence Dashboard
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Analyzing performance for {user?.firstName || 'Account'}
          </motion.p>
        </div>
        <div className={styles.datePicker}>
          Last 30 Days
        </div>
      </header>

      {/* Hero Stats Section */}
      <motion.section 
        className={styles.heroGrid}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
        }}
      >
        {[
          { label: 'Total Engagement', value: '84.2k', growth: '+12%', icon: <FaInstagram /> },
          { label: 'Average Reach', value: '12.5k', growth: '+5%', icon: <FaLinkedin /> },
          { label: 'Click Rate', value: '3.2%', growth: '-2%', icon: <FaTwitter />, negative: true },
        ].map((stat, i) => (
          <motion.div 
            key={i} 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50 } }
            }}
          >
            <SpotlightCard className={styles.statCard}>
              <div className={styles.statLabel}>{stat.label}</div>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={`${styles.statGrowth} ${stat.negative ? styles.neg : ''}`}>
                <FaArrowUp /> {stat.growth} <span>vs last month</span>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.section>

      {/* Data Visualization Grid */}
      <motion.div 
        className={styles.mainGrid}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <SpotlightCard className={`${styles.chartBlock} ${styles.span2}`}>
          <div className={styles.blockHeader}>
            <h3>Audience Growth</h3>
            <div className={styles.legend}>
              <span className={styles.dotMain}></span> Followers
            </div>
          </div>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={followerData}>
                <defs>
                  <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="0" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <Tooltip contentStyle={{ borderRadius: '0', border: '1px solid #000' }} />
                <Area type="stepAfter" dataKey="followers" stroke="#000" fillOpacity={1} fill="url(#colorVis)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SpotlightCard>

        <SpotlightCard className={styles.chartBlock}>
          <div className={styles.blockHeader}>
            <h3>Traffic Source</h3>
          </div>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="#fff"
                  strokeWidth={2}
                >
                  {distributionData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </SpotlightCard>
      </motion.div>
    </motion.div>
  );
}
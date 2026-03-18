"use client";

import React, { useMemo } from 'react';
import { UserButton } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { FaChartPie, FaComments, FaPaperPlane, FaImages, FaUsers, FaGear } from 'react-icons/fa6';

export default function FloatingNav() {
  const brutalistAppearance = useMemo(() => ({
    elements: {
      userButtonPopoverFooter: { display: 'none' },
      userButtonPopoverActionButton__manageAccount: { display: 'none' },
      userButtonPopoverCard: {
        border: '3px solid #000',
        borderRadius: '0px',
        boxShadow: '8px 8px 0px #000',
        marginBottom: '10px' // Menu avatar ke upar khulega
      },
      userButtonPopoverActionButtonText: {
        fontWeight: '800',
        textTransform: 'uppercase',
      },
      userButtonTrigger: {
        width: '56px',
        height: '56px',
        border: '3px solid #000',
        boxShadow: '4px 4px 0px #000',
        transition: '0.1s',
        borderRadius: '50%', // Circle like iOS touch
        overflow: 'hidden',
        backgroundColor: '#fff',
        '&:active': { boxShadow: 'none', transform: 'translate(2px, 2px)' }
      }
    }
  }), []);

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 300, top: 0, bottom: 500 }} // Screen borders ke hisab se adjust karein
      whileDrag={{ scale: 1.1 }}
      style={{
        position: 'fixed',
        bottom: '40px',
        right: '40px',
        zIndex: 9999,
        cursor: 'grab'
      }}
    >
      <UserButton 
        appearance={brutalistAppearance}
      >
        <UserButton.MenuItems>
          <UserButton.Link label="Dashboard" labelIcon={<FaChartPie />} href="/dashboard" />
          <UserButton.Link label="Inbox" labelIcon={<FaComments />} href="inbox" />
          <UserButton.Link label="Publisher" labelIcon={<FaPaperPlane />} href="publisher" />
          <UserButton.Link label="Gallery" labelIcon={<FaImages />} href="gallery" />
          <UserButton.Link label="Accounts" labelIcon={<FaUsers />} href="accounts" />
          <UserButton.Action label="Manage Account" labelIcon={<FaGear />} open="userProfile" />
        </UserButton.MenuItems>
      </UserButton>
    </motion.div>
  );
}
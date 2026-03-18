"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaFolder, FaPlus, FaPaperPlane, FaXmark, 
  FaInstagram, FaFacebook, FaLinkedin, FaXTwitter, 
  FaCheck, FaCloudArrowUp, FaFileLines, FaTrashCan 
} from 'react-icons/fa6';
import styles from './gallery.module.scss';
import SpotlightCard from '@/components/SpotlightCard';

const folders = ['All Media', 'Insta Reels', 'LinkedIn Banners', 'Product Shots'];
const initialMedia = [
  { id: 1, src: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=500' },
  { id: 2, src: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=500' },
  { id: 3, src: 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=500' },
  { id: 4, src: 'https://images.unsplash.com/photo-1633533452148-8cb1594ccf1e?w=500' },
];

export default function Gallery() {
  // Modal States
  const [isPostModalOpen, setPostModalOpen] = useState(false);
  const [isUploadOpen, setUploadOpen] = useState(false);
  
  // Data States
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [uploadQueue, setUploadQueue] = useState([]);
  const [formats, setFormats] = useState({ insta: 'post', fb: 'feed', li: 'update', x: 'post' });
  
  const fileInputRef = useRef(null);

  // --- Handlers ---
  const togglePlatform = (id) => {
    setSelectedPlatforms(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const openPostModal = (item) => {
    setSelectedMedia(item);
    setPostModalOpen(true);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setUploadQueue(prev => [...prev, ...files]);
  };

  const removeFileFromQueue = (index) => {
    setUploadQueue(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <motion.div className={styles.gallery} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* HEADER */}
      <div className={styles.header}>
        <div>
          <h1>Media Gallery</h1>
          <p className={styles.subtitle}>Production-ready asset management and multi-channel deployment.</p>
        </div>
        <button className={styles.uploadBtn} onClick={() => setUploadOpen(true)}>
          <FaPlus /> Upload Asset
        </button>
      </div>

      {/* FOLDERS */}
      <motion.div 
        className={styles.folders}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
      >
        {folders.map((f, i) => (
          <motion.div 
            key={i} 
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 }
            }}
          >
            <SpotlightCard className={styles.folder}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaFolder />
                <span>{f}</span>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>

      {/* GRID */}
      <motion.div 
        className={styles.grid}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
        }}
      >
        {initialMedia.map(item => (
          <motion.div 
            key={item.id}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1 }
            }}
          >
            <div className={styles.item}>
              <img src={item.src} alt="Media" />
              <div className={styles.overlay}>
                <button onClick={() => openPostModal(item)}><FaPaperPlane /> Post Asset</button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* MODAL 1: UPLOAD ASSETS */}
      <AnimatePresence>
        {isUploadOpen && (
          <div className={styles.modalOverlay}>
            <motion.div 
              className={`${styles.modalContent} ${styles.uploadVariant}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className={styles.modalHeader}>
                <h3>Upload Assets</h3>
                <button className={styles.closeBtn} onClick={() => { setUploadOpen(false); setUploadQueue([]); }}>
                  <FaXmark />
                </button>
              </div>
              <div className={styles.modalBody}>
                <div className={styles.dropZone} onClick={() => fileInputRef.current.click()}>
                  <input type="file" multiple hidden ref={fileInputRef} onChange={handleFileSelect} />
                  <FaCloudArrowUp />
                  <p>Click or drag files to upload</p>
                  <span>Support for High-Res JPG, PNG, MP4</span>
                </div>

                {uploadQueue.length > 0 && (
                  <div className={styles.uploadQueue}>
                    <label>Upload Queue ({uploadQueue.length})</label>
                    <div className={styles.queueList}>
                      {uploadQueue.map((file, idx) => (
                        <div key={idx} className={styles.queueItem}>
                          <FaFileLines />
                          <div className={styles.fileDetails}>
                            <p>{file.name}</p>
                            <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                          </div>
                          <button onClick={() => removeFileFromQueue(idx)}><FaTrashCan /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.modalFooter}>
                <button className={styles.secondaryBtn} onClick={() => { setUploadOpen(false); setUploadQueue([]); }}>Cancel</button>
                <button className={styles.primaryBtn} disabled={uploadQueue.length === 0}>Start Upload</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: DEPLOY POST */}
      <AnimatePresence>
        {isPostModalOpen && (
          <div className={styles.modalOverlay}>
            <motion.div 
              className={styles.modalContent}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <div className={styles.modalHeader}>
                <h3>Deploy Content</h3>
                <button className={styles.closeBtn} onClick={() => setPostModalOpen(false)}><FaXmark /></button>
              </div>

              <div className={styles.modalBody}>
                <div className={styles.previewSection}>
                  <img src={selectedMedia?.src} alt="Preview" />
                  <textarea placeholder="Write your production caption..." />
                </div>

                <div className={styles.configSection}>
                  <h4>Target Platforms</h4>
                  <div className={styles.platformGrid}>
                    {[
                      { id: 'insta', icon: <FaInstagram />, name: 'Instagram' },
                      { id: 'fb', icon: <FaFacebook />, name: 'Facebook' },
                      { id: 'li', icon: <FaLinkedin />, name: 'LinkedIn' },
                      { id: 'x', icon: <FaXTwitter />, name: 'X / Twitter' },
                    ].map(p => (
                      <div 
                        key={p.id} 
                        className={`${styles.platformCard} ${selectedPlatforms.includes(p.id) ? styles.active : ''}`}
                        onClick={() => togglePlatform(p.id)}
                      >
                        <div className={styles.icon}>{p.icon}</div>
                        <span>{p.name}</span>
                        {selectedPlatforms.includes(p.id) && <FaCheck className={styles.check} />}
                      </div>
                    ))}
                  </div>

                  <div className={styles.formatSettings}>
                    {selectedPlatforms.map(platform => {
                      const options = {
                        insta: ['post', 'story', 'reel'],
                        fb: ['feed', 'story', 'group'],
                        li: ['update', 'article'],
                        x: ['post', 'thread']
                      }[platform];

                      return (
                        <div key={platform} className={styles.settingRow}>
                          <label>{platform.toUpperCase()} Format</label>
                          <div className={styles.typeCapsules}>
                            {options.map(opt => (
                              <span 
                                key={opt} 
                                className={formats[platform] === opt ? styles.active : ''} 
                                onClick={() => setFormats({...formats, [platform]: opt})}
                              >
                                {opt}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button className={styles.secondaryBtn} onClick={() => setPostModalOpen(false)}>Discard</button>
                <button className={styles.primaryBtn} disabled={selectedPlatforms.length === 0}>Confirm Publication</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
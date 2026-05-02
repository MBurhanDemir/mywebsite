import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase, GraduationCap, Award,
  User, Heart, Code2, BookOpen,
  Layers, ChevronRight, MonitorPlay, Brain, Zap, X
} from 'lucide-react';
import './index.css';

// ---- Dummy Data for the Portfolio ---- //
const PROFILE_DATA = {
  name: "Burhan DEMİR",
  title: "Bilgisayar Mühendisi",
  photo: '/mywebsite/fotom5.png',
  about: `Burada kendim hakkımda gelişmeler paylaşıyorum. Mümkün olduğunca güncel tutmaya çalışacağım. Beni tanımak için sayfama göz atabilirsiniz.
  Kişilik kısmına göz atmayı unutmayın :) Ve evet, yapay zeka ile oluşturdum..
  `,
  hobbies: ["Sinema", "Tiyatro", "Gezmek", "Kutu oyunları", "Online Oyunlar", "Tarih", "Felsefe"],
  skills: [
    { name: "Web/Network Sızma Testleri", level: 55 },
    { name: "SOC L1 Analist", level: 70 },
    { name: "CCNA Network", level: 60 },
    { name: "Vibe Coder", level: 85 },
    { name: "Algoritma Yeteneği", level: 85 },
    { name: "JAVA Programlama", level: 45 }
  ],
  previousCompanies: [
    { name: "HAVELSAN", logo: '/mywebsite/Havelsan_logo.svg.png' },
    { name: "S4E", logo: '/mywebsite/image.png' },
    { name: "Artinlife", logo: '/mywebsite/artinlifelogo.png' },
    { name: "Konumsal Bilgi Sistemleri", logo: '/mywebsite/konumsalLogo.png' }
  ],
  freelance: [
    {
      platform: "BugBounter",
      role: "Bug Hunter",
      logo: '/mywebsite/bugbounter.jpg',
      description: "Siber güvenlik açıklarını bulma ve raporlama süreçlerinde aktif rol alıyorum."
    },
    {
      platform: "Medium",
      role: "Yazar / Writer",
      logo: '/mywebsite/medium3.jpg',
      description: "Teknoloji, yazılım ve siber güvenlik üzerine içerikler üretiyorum."
    }
  ],
  education: [
    {
      school: "Fırat Üniversitesi",
      logo: '/mywebsite/Fırat_University_logo.svg.png',
      degree: "Bilgisayar Mühendisliği",
      dates: "2021 - 2025",
      gpa: "3.04 / 4.00"
    }
  ],
  completedOther: [
    { title: "Siber Güvenlik Temelleri ve Sızma Testleri", provider: "CISCO & FORTINET & AKBANK & TECHCAREER & UDEMY", date: "2022-2026" },
    { title: "CCNA 1 Eğitimi", provider: "CISCO", date: "2026" },
    { title: "Linux Eğitimi", provider: "CISCO", date: "2026" },
  ],
  activeEducation: [
    { title: "CyberOPS Eğitimi", provider: "AKBANK & CISCO", date: "Devam Ediyor, Başlangıç Tarihi: Ocak 2026" }
  ],
  certifications: [
    {
      name: "Introduction To Cyber Security",
      issuer: "CISCO",
      date: "2022",
      logo: '/mywebsite/cisco.png'
    },
    {
      name: "CCNA 1: Introduction to Networks",
      issuer: "CISCO",
      date: "2026",
      logo: '/mywebsite/cisco.png'
    },
    {
      name: "Fundamentals in Cyber Security",
      issuer: "FORTINET",
      date: "2026",
      logo: '/mywebsite/fortinet.png'
    },
    {
      name: "Linux Unhatched",
      issuer: "CISCO",
      date: "2026",
      logo: '/mywebsite/cisco.png'
    },
    {
      name: "Cyber Security 101 Bootcamp",
      issuer: "TechCareer",
      date: "2025",
      logo: '/mywebsite/techcareer.webp'
    },
    {
      name: "Web Sızma Testleri & Bug Bounty & Etik Hacker Eğitimi",
      issuer: "UDEMY",
      date: "2022-2023",
      logo: '/mywebsite/udemy2.jpg'
    }
  ],
  upcomingCertifications: [
    {
      name: "eWPT - Web Application Penetration Tester",
      issuer: "eLearnSecurity",
      logo: '/mywebsite/ine2.png'
    },
    {
      name: "CyberOps Associate",
      issuer: "CISCO",
      logo: '/mywebsite/cisco.png'
    }
  ],
  projects: [
    {
      name: "ADYUP - TÜBİTAK",
      tech: "Kotlin, Python, PostgreSQL..",
      description: "Afet durumlarında yardım kuruluşları arasında koordinasyon sağlama platformu. Canlıya çıkmadı."
    }
  ],
  activeProjects: [
    {
      name: "GİZLİ",
      tech: "Gizlilik amacıyla teknolojilerden bahsedilmemektedir.",
      description: "Henüz duyurmak istemediğimiz kapsamlı bir SaaS projesi."
    }
  ],
  personality: [
    {
      test: "16Personalities",
      result: "INTJ-T",
      link: "https://www.16personalities.com/tr/intj-ki%C5%9Fili%C4%9Fi",
      description: "Analitik ve stratejik düşünen, planlamayı seven kişilik tipi. Detaylı bilgi için tıklayın."
    },
    {
      test: "Jobcannon",
      result: "The Strategist",
      link: "https://jobcannon.io/tests/big-five/results/low-agreeableness",
      description: "Problem çözme ve uzun vadeli hedeflere odaklanma yeteneği. Detaylı bilgi için tıklayın."
    },
    {
      test: "Hangi Attack on Titan Karakterisin Testi",
      result: "Armin Arlert",
      description: "Bunu ben de beklemiyodum"
    },
    {
      test: "Big Five",
      image: '/mywebsite/rapor.png'
    }
  ]
};

// ---- Components ---- //

const Sidebar = () => (
  <motion.aside
    className="glass-panel sidebar"
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
  >
    <div className="profile-img-container">
      <img src={PROFILE_DATA.photo} alt={PROFILE_DATA.name} className="profile-img" />
    </div>

    <h1 className="profile-name text-gradient">{PROFILE_DATA.name}</h1>
    <p className="profile-title">{PROFILE_DATA.title}</p>

    <div className="sidebar-section">
      <h3 className="section-title small-title"><Heart size={18} /> Hobiler</h3>
      <div className="tags-container">
        {PROFILE_DATA.hobbies.map((hobby, idx) => (
          <span key={idx} className="tag">{hobby}</span>
        ))}
      </div>
    </div>

    <div className="sidebar-section">
      <h3 className="section-title small-title"><Code2 size={18} /> Beceriler</h3>
      <div className="skills-container">
        {PROFILE_DATA.skills.map((skill, idx) => (
          <div key={idx} className="skill-item">
            <div className="skill-header">
              <span className="skill-name">{skill.name}</span>
            </div>
            <div className="progress-bar">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: 0.5 + (idx * 0.1) }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </motion.aside>
);

const CompanyCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % PROFILE_DATA.previousCompanies.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="company-carousel-container">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="carousel-slide"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <img
            src={PROFILE_DATA.previousCompanies[index].logo}
            alt={PROFILE_DATA.previousCompanies[index].name}
            className="carousel-logo"
          />
        </motion.div>
      </AnimatePresence>

      <div className="carousel-dots">
        {PROFILE_DATA.previousCompanies.map((_, idx) => (
          <div
            key={idx}
            className={`dot ${idx === index ? 'active' : ''}`}
            onClick={() => setIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
};

const MainContent = () => {
  const [activeTab, setActiveTab] = useState<'tecrube' | 'egitim' | 'projeler' | 'kisilik'>('tecrube');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelectedImage(null)}>
                <X size={24} />
              </button>
              <img src={selectedImage} alt="Report Full Size" className="modal-image" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.main
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="main-content"
      >
        {/* Hero Section / Hakkımda */}
        <section className="hero-section glass-panel margin-bottom-lg">
          <div className="hero-content">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="hero-greeting"
            >
              Sayfama Hoş Geldiniz
            </motion.h2>
            <div className="about-text">
              <p>{PROFILE_DATA.about}</p>
            </div>
          </div>
        </section>

        {/* Navigasyon / Sekmeler */}
        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === 'tecrube' ? 'active' : ''}`}
            onClick={() => setActiveTab('tecrube')}
          >
            Şirketler & Sertifikalar
          </button>
          <button
            className={`tab-btn ${activeTab === 'egitim' ? 'active' : ''}`}
            onClick={() => setActiveTab('egitim')}
          >
            Eğitim Geçmişi
          </button>
          <button
            className={`tab-btn ${activeTab === 'projeler' ? 'active' : ''}`}
            onClick={() => setActiveTab('projeler')}
          >
            Projeler
          </button>
          <button
            className={`tab-btn ${activeTab === 'kisilik' ? 'active' : ''}`}
            onClick={() => setActiveTab('kisilik')}
          >
            Kişilik Bilgisi
          </button>
        </div>

        {/* Sekme İçerikleri */}
        <div className="glass-panel content-panel">
          <AnimatePresence mode="wait">

            {/* TECRÜBE SEKME */}
            {activeTab === 'tecrube' && (
              <motion.div
                key="tecrube"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="section-title"><Briefcase /> Daha Önce Çalıştığım Şirketler</h2>
                <CompanyCarousel />

                <h2 className="section-title"><Zap /> Freelance Çalışmalarım</h2>
                <div className="grid-2-col margin-bottom-lg">
                  {PROFILE_DATA.freelance.map((item, idx) => (
                    <div key={idx} className="card cert-card">
                      <img src={item.logo} alt={item.platform} className="cert-logo" />
                      <div className="cert-content">
                        <h4 className="card-title">{item.platform}</h4>
                        <p className="card-subtitle no-margin">{item.role}</p>
                        <p className="text-xs text-muted mt-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <h2 className="section-title"><Award /> Alınan Sertifikalar</h2>
                <div className="grid-2-col margin-bottom-lg">
                  {PROFILE_DATA.certifications.map((cert, idx) => (
                    <div key={idx} className="card cert-card">
                      <img src={cert.logo} alt={cert.issuer} className="cert-logo" />
                      <div className="cert-content">
                        <h4 className="card-title">{cert.name}</h4>
                        <p className="card-subtitle">{cert.issuer}</p>
                        <span className="badge">{cert.date}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <h2 className="section-title"><Award className="text-muted" /> Beklenen Sertifikalar</h2>
                <div className="grid-2-col">
                  {PROFILE_DATA.upcomingCertifications.map((cert, idx) => (
                    <div key={idx} className="card cert-card-pending">
                      <img src={cert.logo} alt={cert.issuer} className="cert-logo grayscale" />
                      <div className="cert-content">
                        <h4 className="card-title text-muted">{cert.name}</h4>
                        <p className="card-subtitle">{cert.issuer}</p>
                        <span className="badge-outline text-xs">Bekleniyor...</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* EĞİTİM SEKME */}
            {activeTab === 'egitim' && (
              <motion.div
                key="egitim"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="section-title"><GraduationCap /> Üniversite & Bölüm</h2>
                <div className="margin-bottom-lg">
                  {PROFILE_DATA.education.map((edu, idx) => (
                    <div key={idx} className="edu-logo-container">
                      <img src={edu.logo} alt={edu.school} className="edu-logo" />
                      <div className="timeline-content">
                        <h4>{edu.degree}</h4>
                        <span className="company">{edu.school}</span>
                        <div className="flex-row mt-sm">
                          <span className="date no-margin">{edu.dates}</span>
                          <span className="badge-outline">
                            GNO: <span className="highlight-text">{edu.gpa}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid-2-col">
                  <div className="edu-column">
                    <h3 className="section-title small-title"><GraduationCap size={18} /> Tamamlanan Eğitimler</h3>
                    <div className="timeline no-border-left">
                      {PROFILE_DATA.completedOther.map((edu, idx) => (
                        <div key={idx} className="timeline-item small-item">
                          <div className="timeline-content">
                            <h4 className="text-sm">{edu.title}</h4>
                            <span className="company text-xs">{edu.provider}</span>
                            <span className="date text-xs">{edu.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="edu-column">
                    <h3 className="section-title small-title"><BookOpen size={18} /> Devam Eden Eğitimler</h3>
                    <div className="flex-column gap-md">
                      {PROFILE_DATA.activeEducation.map((edu, idx) => (
                        <div key={idx} className="card-active-green">
                          <div className="card-glow card-glow-green"></div>
                          <div className="card-header">
                            <h4 className="card-title text-white">{edu.title}</h4>
                            <div className="ping-indicator">
                              <span className="ping-anim ping-anim-green"></span>
                              <span className="ping-dot ping-dot-green"></span>
                            </div>
                          </div>
                          <p className="text-sm text-green no-margin" style={{ position: 'relative', zIndex: 1 }}>{edu.provider}</p>
                          <div className="card-footer no-border" style={{ position: 'relative', zIndex: 1 }}>
                            <span className="text-xs text-muted">{edu.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* PROJELER SEKME */}
            {activeTab === 'projeler' && (
              <motion.div
                key="projeler"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="section-title"><Layers /> Aktif Projeler</h2>
                <div className="grid-2-col margin-bottom-lg">
                  {PROFILE_DATA.activeProjects.map((proj, idx) => (
                    <div key={idx} className="card-active-green">
                      <div className="card-glow card-glow-green"></div>
                      <div className="card-header">
                        <h4 className="card-title text-white">{proj.name}</h4>
                        <div className="ping-indicator">
                          <span className="ping-anim ping-anim-green"></span>
                          <span className="ping-dot ping-dot-green"></span>
                        </div>
                      </div>
                      <p className="text-secondary" style={{ position: 'relative', zIndex: 1 }}>{proj.description}</p>
                      <div className="card-footer" style={{ position: 'relative', zIndex: 1 }}>
                        <span className="badge-green">{proj.tech}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <h2 className="section-title"><MonitorPlay /> Geçmiş Projeler</h2>
                <div className="grid-2-col">
                  {PROFILE_DATA.projects.map((proj, idx) => (
                    <div key={idx} className="project-card card">
                      <h4 className="card-title text-white margin-bottom-sm">{proj.name}</h4>
                      <p>{proj.description}</p>
                      <div className="card-footer no-border">
                        <span className="text-muted text-xs">{proj.tech}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* KİŞİLİK SEKME */}
            {activeTab === 'kisilik' && (
              <motion.div
                key="kisilik"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="section-title"><Brain /> Kişilik Test Sonuçları</h2>
                <div className="grid-2-col">
                  {PROFILE_DATA.personality.map((item, idx) => (
                    <div key={idx} className={`card ${item.link || item.image ? 'card-hover-scale' : ''}`}>
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="no-style-link">
                          <div className="flex-row space-between align-center">
                            <h4 className="card-title text-gradient">{item.test}</h4>
                            <ChevronRight size={18} className="icon-hover" />
                          </div>
                          <p className="personality-result">{item.result}</p>
                          <p className="card-subtitle no-margin">{item.description}</p>
                        </a>
                      ) : item.image ? (
                        <div onClick={() => setSelectedImage(item.image)}>
                          <div className="flex-row space-between align-center cursor-pointer">
                            <h4 className="card-title text-gradient">{item.test}</h4>
                            <span className="text-xs text-muted">Büyütmek için tıkla</span>
                          </div>
                          <p className="personality-result">{item.result}</p>
                          <div className="preview-image-container">
                            <img src={item.image} alt={item.test} className="preview-image" />
                          </div>
                        </div>
                      ) : (
                        <div>
                          <h4 className="card-title text-gradient">{item.test}</h4>
                          <p className="personality-result">{item.result}</p>
                          <p className="card-subtitle no-margin">{item.description}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.main>
    </>
  );
};

function App() {
  return (
    <div className="app-container">
      <div className="bg-gradients">
        <div className="gradient-blob blob-1"></div>
        <div className="gradient-blob blob-2"></div>
        <div className="gradient-blob blob-3"></div>
      </div>

      <div className="portfolio-layout">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
}

export default App;

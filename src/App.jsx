import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LiquidEther from './components/LiquidEther';
import GradualBlur from './components/GradualBlur';

// --- TEAM DATA ---
const teamData = {
  "Krish Deo Ranjan": {
    initial: "K",
    image: "/team/krish.jpeg",
    role: "Technical Architect & Lead Coordinator",
    philosophy: "Krish firmly believes that trying to define 'The Philosophy of Engineering' is like trying to organize a bowl of spaghetti—a messy, unnecessary waste of time. To him, the only philosophy that matters is: 'If the code runs and the group hasn't dissolved into chaos, don't ask why.'",
    skills: ["Java", "C++", "Web Development", "Group Coordination"],
    details: { institution: "SRMIST", course: "Philosophy of Engineering", location: "Kattankulathur", group: "Team 05" },
    socials: [
      { icon: '📸', label: 'Insta', link: 'https://instagram.com/dean.k_236' },
      { icon: '✉', label: 'Email', link: 'mailto:krrishranjan@gmail.com' }
    ]
  },
  "Kovvuru Kritika": {
    initial: "K",
    image: "/team/Kritika.jpeg",
    role: "Team Anchor & Human Strategist",
    philosophy: "Kritika believes engineering is a human-centric discipline. Her philosophy centers on the idea that the best systems aren't just technically sound—they are built on discipline, empathy, and clear communication.",
    skills: ["People Management", "Conflict Resolution", "Public Speaking", "Strategic Communication"],
    details: { institution: "SRMIST", course: "Philosophy of Engineering", location: "Chhattisgarh / Andhra", group: "Team 05" },
    socials: [
      { icon: '📸', label: 'Insta', link: 'https://instagram.com/_.kritika._7' },
      { icon: '✉', label: 'Email', link: 'mailto:kritikak2460@gmail.com' }
    ]
  },
  "Subiksha Sri Subramanian": {
    initial: "S",
    image: "/team/subi.jpeg",
    role: "Research Architect",
    philosophy: "Subiksha operates on the principle of Calculated Precision. Much like a game of table tennis, she believes engineering is about focus, fast decision-making, and staying two steps ahead of the problem.",
    skills: ["Comprehensive Research", "Strategic Decision-Making", "Adaptability", "Collaborative Leadership"],
    details: { institution: "SRMIST", course: "Philosophy of Engineering", location: "Kattankulathur", group: "Team 05" },
    socials: [
      { icon: '📸', label: 'Insta', link: 'https://instagram.com/that.subi' },
      { icon: '✉', label: 'Email', link: 'mailto:Subisri1412@gmail.com' }
    ]
  },
  "Varada Manoj": {
    initial: "M",
    image: "/team/manoj.png",
    role: "The Integrator",
    philosophy: "Manoj is a firm believer in Cross-Pollination. He views engineering as a fluid field that borrows from biology, art, and technology. To him, curiosity is the primary fuel for innovation.",
    skills: ["Biomedical Fundamentals", "Rapid Problem Solving", "Trend Analysis", "Adaptive Learning"],
    details: { institution: "SRMIST", course: "Biomedical Engineering", location: "Kattankulathur", group: "Team 05" },
    socials: []
  },
  "Ruth Hazel Sahni": {
    initial: "R",
    image: "/team/hazel.jpeg",
    role: "Execution Specialist",
    philosophy: "Ruth treats engineering like competitive rifle shooting: Zero-In and Execute. She believes that even the most brilliant philosophical concept is useless without disciplined, high-performance execution.",
    skills: ["Precision Engineering", "Technical Innovation", "Team Leadership", "High-Performance Execution"],
    details: { institution: "SRMIST", course: "Biomedical Engineering", location: "Bangalore / North India", group: "Team 05" },
    socials: [
      { icon: '📸', label: 'Insta', link: 'https://instagram.com/haxel_0422' }
    ]
  },
  "Sai Srikar": {
    initial: "S",
    image: "/team/srikar.jpeg",
    role: "Strategic Planner",
    philosophy: "Srikar operates on the principle of Strategic Adaptability. He believes engineering isn't just about blueprints—it's about reading the environment and planning ten moves ahead. Discipline is the move that wins the long game.",
    skills: ["Strategic Thinking", "Crisis Management", "Pattern Recognition", "Adaptability"],
    details: { institution: "SRMIST", course: "Engineering", location: "Kuwait / Andhra", group: "Team 05" },
    socials: []
  }
};

// --- SHARED COMPONENTS ---
const SocialLink = ({ icon, label, link, isDark }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" className={`group relative flex items-center justify-center w-12 h-12 rounded-2xl border transition-all duration-500 hover:-translate-y-1 ${isDark ? 'bg-white/5 border-white/10 hover:border-yellow-500/50 hover:bg-yellow-500/10' : 'bg-emerald-50 border-emerald-100 hover:border-emerald-500 hover:bg-emerald-500/5'}`}>
    <span className={`text-xl transition-colors ${isDark ? 'group-hover:text-yellow-500' : 'group-hover:text-emerald-700'}`}>{icon}</span>
    <span className="absolute -bottom-10 scale-0 group-hover:scale-100 px-2 py-1 rounded bg-black text-white text-[9px] uppercase tracking-widest transition-all">{label}</span>
  </a>
);

const BioDetail = ({ label, value, isDark }) => (
  <div className="group">
    <h4 className={`text-[9px] uppercase tracking-[0.3em] font-black mb-2 opacity-30 transition-opacity group-hover:opacity-100 ${isDark ? 'text-emerald-400' : 'text-emerald-900'}`}>{label}</h4>
    <p className="text-xl font-medium tracking-tight">{value}</p>
  </div>
);

const ChromaCard = ({ name, data, onClick, isDark }) => {
  const handleMouseMove = (e) => {
    const { currentTarget: target, clientX, clientY } = e;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--x", `${clientX - rect.left}px`);
    target.style.setProperty("--y", `${clientY - rect.top}px`);
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.02, y: -5 }} 
      whileTap={{ scale: 0.98 }} 
      onMouseMove={handleMouseMove} 
      onClick={onClick} 
      className={`spotlight group relative cursor-pointer p-[1px] rounded-[2.5rem] transition-all duration-500 ${isDark ? 'bg-white/10 hover:bg-yellow-500/50' : 'bg-emerald-200 hover:bg-emerald-500'}`}
    >
      <div className={`relative z-10 p-8 h-full rounded-[2.45rem] overflow-hidden ${isDark ? 'bg-[#020d0a]/90' : 'bg-white'}`}>
        <div className="relative mb-8 w-full aspect-square overflow-hidden rounded-3xl bg-emerald-950/20 border border-white/5">
           {data.image ? (
             <img 
               src={data.image} 
               alt={name} 
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
               style={{ objectPosition: 'center 20%' }} 
             />
           ) : (
             <div className="w-full h-full flex items-center justify-center text-4xl font-serif italic text-yellow-500/40">{data.initial}</div>
           )}
           <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <h3 className={`text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-emerald-950'}`}>{name}</h3>
        <p className="text-[10px] uppercase tracking-[0.4em] mt-3 opacity-30 font-black">View Profile →</p>
      </div>
    </motion.div>
  );
};

const BioPage = ({ name, data, onBack, isDark }) => (
  <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="min-h-screen pt-32 pb-48 px-8 max-w-6xl mx-auto">
    <button onClick={onBack} className={`mb-12 flex items-center space-x-3 text-[10px] uppercase tracking-[0.4em] font-black opacity-40 hover:opacity-100 transition-all ${isDark ? 'text-white' : 'text-emerald-950'}`}>
      <span>←</span> <span>Exit Profile</span>
    </button>
    <div className="grid lg:grid-cols-[1fr_1.5fr] gap-20 items-start">
      <div className="space-y-10 sticky top-32">
        <div className={`relative aspect-square rounded-[4rem] overflow-hidden border transition-all duration-700 ${isDark ? 'bg-emerald-950/20 border-white/10 shadow-[0_0_60px_rgba(202,138,4,0.1)]' : 'bg-white border-emerald-100 shadow-xl shadow-emerald-900/5'}`}>
          {data.image ? (
            <img src={data.image} alt={name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-8xl font-serif italic text-yellow-500/40">{data.initial}</span>
          )}
        </div>
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold tracking-tighter mb-4">{name}</h1>
          <p className="text-yellow-600 text-[11px] font-black uppercase tracking-[0.5em] mb-8">{data.role}</p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 p-4 rounded-3xl border backdrop-blur-xl bg-white/5 border-white/5">
            {data.socials.map((s) => <SocialLink key={s.label} {...s} isDark={isDark} />)}
          </div>
        </div>
      </div>
      <div className={`p-16 rounded-[3.5rem] border backdrop-blur-3xl shadow-2xl ${isDark ? 'bg-[#020d0a]/80 border-white/5' : 'bg-white/60 border-emerald-50'}`}>
        <h2 className="text-3xl font-serif italic mb-6 opacity-80">The Philosophy</h2>
        <p className="text-xl leading-relaxed mb-12 opacity-60 font-light italic">"{data.philosophy}"</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           <div className="space-y-10">
              <BioDetail label="Institution" value={data.details.institution} isDark={isDark} />
              <BioDetail label="Course" value={data.details.course} isDark={isDark} />
           </div>
           <div className="space-y-10">
              <BioDetail label="Location" value={data.details.location} isDark={isDark} />
              <BioDetail label="Group" value={data.details.group} isDark={isDark} />
           </div>
        </div>
        <div className="mt-16 pt-10 border-t border-white/5">
          <h4 className="text-[9px] uppercase tracking-[0.3em] font-black mb-6 opacity-30">Technical & Soft Toolkit</h4>
          <div className="flex flex-wrap gap-2">
            {data.skills.map(s => <span key={s} className={`px-4 py-2 rounded-full text-[10px] font-bold border ${isDark ? 'bg-white/5 border-white/10' : 'bg-emerald-50 border-emerald-100'}`}>{s}</span>)}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

// --- ASSIGNMENT COMPONENTS ---
const AssignmentStrip = ({ data, onClick, onDelete, isDark }) => (
  <motion.div 
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    onClick={onClick}
    className={`group relative w-screen -ml-[max(2rem,calc((100vw-80rem)/2+2rem))] cursor-pointer overflow-hidden border-y transition-all duration-700 ${
      isDark ? 'border-white/5 hover:bg-white/[0.02]' : 'border-emerald-100 hover:bg-emerald-50'
    }`}
  >
    <div className="max-w-7xl mx-auto px-8 py-16 flex flex-col md:flex-row items-center gap-12 relative">
      <div className="w-full md:w-1/3 aspect-[21/9] rounded-2xl overflow-hidden border border-white/10">
        <img src={data.image || "/team/krish.jpeg"} alt={data.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" />
      </div>
      
      <div className="flex-1">
        <span className="text-yellow-600 text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">Assignment // 0{data.index + 1}</span>
        <h3 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 group-hover:text-yellow-500 transition-colors">{data.title}</h3>
        <p className="opacity-40 max-w-xl line-clamp-1 italic">"{data.description}"</p>
      </div>

      <div className="flex items-center gap-8">
        {/* DELETE BUTTON */}
        <button 
          onClick={(e) => onDelete(data.id, e)}
          className="p-4 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all z-20"
          title="Delete Entry"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
        </button>
        
        <div className="text-right hidden md:block">
          <span className="text-4xl font-serif italic opacity-10 group-hover:opacity-100 transition-opacity">Explore →</span>
        </div>
      </div>
    </div>
  </motion.div>
);

const AssignmentDetailView = ({ data, onBack, isDark }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[150] bg-[#020d0a] overflow-y-auto">
    <div className="h-[60vh] w-full relative">
      <img src={data.image} alt={data.title} className="w-full h-full object-cover opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020d0a] to-transparent" />
      <button onClick={onBack} className="absolute top-10 left-10 z-[160] px-6 py-3 bg-white/5 border border-white/10 backdrop-blur-xl rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-yellow-600 hover:text-black transition-all">
        ← Close Project
      </button>
    </div>
    <div className="max-w-5xl mx-auto px-8 -mt-32 relative z-10 pb-40">
      <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-8">{data.title}</h1>
      <p className="text-2xl font-light opacity-60 leading-relaxed mb-20 max-w-3xl">"{data.description}"</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <div className="space-y-12">
          <h4 className="text-yellow-600 text-[10px] font-black uppercase tracking-[0.4em] border-b border-white/10 pb-4">The Objective</h4>
          <p className="text-lg opacity-80 leading-relaxed">This module explores the intersection of technical engineering principles and philosophical inquiry, focusing on Team 05's collaborative approach to complex problem solving.</p>
        </div>
        <div className="space-y-8">
          <h4 className="text-yellow-600 text-[10px] font-black uppercase tracking-[0.4em] border-b border-white/10 pb-4">Member Contributions</h4>
          {Object.entries(data.contributions).map(([name, work]) => (
            <div key={name} className="flex justify-between items-start gap-4">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-40 whitespace-nowrap">{name}</span>
              <span className="text-sm text-right opacity-80">{work || "Reviewing documentation..."}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

// --- MAIN APP ---
export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [viewingBio, setViewingBio] = useState(null);
  const [viewingAssignment, setViewingAssignment] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAssign, setNewAssign] = useState({ title: '', description: '', image: '', contributions: {} });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNewAssign({ ...newAssign, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleAddAssignment = () => {
    if (!newAssign.title) return;
    setAssignments([...assignments, { ...newAssign, id: Date.now() }]);
    setShowAddForm(false);
    setNewAssign({ title: '', description: '', image: '', contributions: {} });
  };
  const handleDeleteAssignment = (id, e) => {
  e.stopPropagation(); // Prevents the detail view from opening when clicking delete
  setAssignments(assignments.filter(item => item.id !== id));
};

  return (
    <div className={`relative min-h-screen transition-all duration-1000 ${isDark ? 'bg-[#020d0a] text-emerald-100' : 'bg-[#f7fdfb] text-emerald-950'}`}>
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <LiquidEther colors={isDark ? ['#064e3b', '#ca8a04', '#022c22'] : ['#10b981', '#fbbf24', '#ecfdf5']} />
      </div>

      <div className="relative z-10">
        <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b transition-transform duration-700 ${viewingBio || viewingAssignment ? '-translate-y-full' : 'translate-y-0'} ${isDark ? 'bg-[#020d0a]/60 border-white/5' : 'bg-white/40 border-emerald-100'}`}>
          <div className="max-w-7xl mx-auto flex justify-between items-center h-20 px-8">
            <span className="text-xl font-black uppercase tracking-tighter text-shine">POE // PORTFOLIO</span>
            <button onClick={() => setIsDark(!isDark)} className="w-12 h-6 rounded-full relative bg-emerald-900/10 border border-white/5 overflow-hidden">
              <motion.div animate={{ x: isDark ? 24 : 0 }} className={`absolute top-1 left-1 w-4 h-4 rounded-full ${isDark ? 'bg-yellow-500 shadow-[0_0_10px_#eab308]' : 'bg-emerald-600'}`} />
            </button>
          </div>
        </nav>

        <AnimatePresence mode="wait">
          {viewingAssignment && (
            <AssignmentDetailView key="detail" data={viewingAssignment} onBack={() => setViewingAssignment(null)} isDark={isDark} />
          )}

          {viewingBio ? (
            <BioPage key="bio" name={viewingBio} data={teamData[viewingBio]} onBack={() => setViewingBio(null)} isDark={isDark} />
          ) : (
            <motion.main key={currentPage} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              {currentPage === 'home' && (
                <header className="pt-64 pb-20 px-8 max-w-7xl mx-auto min-h-[80vh] flex flex-col justify-center">
                  <h1 className="text-[clamp(3rem,10vw,8rem)] font-light leading-[0.85] tracking-tighter">Philosophy <br /><span className="font-serif italic text-yellow-600">Engineering.</span></h1>
                  <p className="mt-12 text-2xl font-light opacity-40 max-w-2xl">SRM Institute of Science & Technology // Kattankulathur</p>
                </header>
              )}

              {currentPage === 'team' && (
                <section className="px-8 pt-48 pb-64 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {Object.keys(teamData).map((name) => (
                    <ChromaCard key={name} name={name} data={teamData[name]} isDark={isDark} onClick={() => setViewingBio(name)} />
                  ))}
                </section>
              )}

             {currentPage === 'assignments' && (
  <section className="pt-48 pb-64 overflow-x-hidden">
    <div className="max-w-7xl mx-auto px-8 mb-24 flex justify-between items-end">
      <h2 className="text-8xl font-bold tracking-tighter">Archive</h2>
      <button 
        onClick={() => setShowAddForm(true)} 
        className="px-10 py-5 bg-yellow-600 text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-all"
      >
        + Add Entry
      </button>
    </div>

    <div className="flex flex-col">
      {assignments.map((item, index) => (
        <AssignmentStrip 
          key={item.id} 
          data={{...item, index}} 
          isDark={isDark} 
          onClick={() => setViewingAssignment(item)} 
          onDelete={handleDeleteAssignment} 
        />
      ))}
      {assignments.length === 0 && (
        <div className="text-center py-20 opacity-30 italic font-serif text-2xl">
          No projects in the archive yet.
        </div>
      )}
    </div>
  </section>
)}
            </motion.main>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-black/95 backdrop-blur-3xl">
            <div className="bg-[#05100d] border border-white/10 p-12 rounded-[3.5rem] max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-12">
                <h3 className="text-4xl font-bold tracking-tighter uppercase">Add Project</h3>
                <button onClick={() => setShowAddForm(false)} className="opacity-40 hover:opacity-100">CLOSE ✕</button>
              </div>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Cover Image</label>
                  <div className="aspect-video bg-white/5 border border-dashed border-white/20 rounded-3xl flex items-center justify-center overflow-hidden">
                    {newAssign.image ? <img src={newAssign.image} className="w-full h-full object-cover" alt="preview" /> : <input type="file" onChange={handleImageUpload} className="opacity-50 text-xs" />}
                  </div>
                  <input type="text" placeholder="Project Title" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none" onChange={(e) => setNewAssign({...newAssign, title: e.target.value})} />
                  <textarea placeholder="Executive Summary" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl h-40 outline-none" onChange={(e) => setNewAssign({...newAssign, description: e.target.value})} />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Contributor Logs</label>
                  {Object.keys(teamData).map(name => (
                    <input key={name} type="text" placeholder={`${name.split(' ')[0]}'s Task`} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-xs outline-none focus:border-yellow-500/50" onChange={(e) => setNewAssign({...newAssign, contributions: { ...newAssign.contributions, [name]: e.target.value }})} />
                  ))}
                  <button onClick={handleAddAssignment} className="w-full py-6 bg-yellow-600 text-black font-black uppercase tracking-widest rounded-2xl mt-8">Finalize & Push</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!viewingBio && !viewingAssignment && (
        <>
          <GradualBlur position="bottom" height="20rem" strength={4} isDark={isDark} />
          <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center p-1.5 rounded-2xl border backdrop-blur-2xl ${isDark ? 'bg-emerald-950/40 border-white/10' : 'bg-white/40 border-emerald-100'}`}>
            {['home', 'assignments', 'team'].map((id) => (
              <button key={id} onClick={() => setCurrentPage(id)} className="relative px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest z-10">
                {currentPage === id && <motion.div layoutId="activeTab" className={`absolute inset-0 rounded-lg -z-10 ${isDark ? 'bg-yellow-500/20 shadow-[inset_0_0_10px_rgba(234,179,8,0.2)]' : 'bg-emerald-600'}`} transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />}
                <span className={currentPage === id ? (isDark ? 'text-yellow-500' : 'text-white') : 'opacity-30'}>{id}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
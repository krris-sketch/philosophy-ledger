import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, Check, X, Plus, Trash2, Camera, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

// --- INITIAL TEAM DATA ---
const INITIAL_TEAM = {
  "Anuska Chakraborty": { role: "Lead Strategist", philosophy: "Engineering is the art of balancing chaos with calculated order." },
  "Yesha Gupta": { role: "Technical Architect", philosophy: "Build not just for the present, but for the legacy left behind." },
  "Kiruthika": { role: "Research Specialist", philosophy: "Every complex problem has a simple, elegant solution hidden within." },
  "Lakkakula Harshitha": { role: "Integrator", philosophy: "Fluidity in engineering allows for innovation in rigid spaces." },
  "Jaza KP": { role: "Execution Lead", philosophy: "Precision is the difference between a project and a masterpiece." }
};

export default function App() {
  const [team, setTeam] = useState(INITIAL_TEAM);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [assignments, setAssignments] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [expandedMember, setExpandedMember] = useState(null);

  // Form States for New Assignment
  const [newTitle, setNewTitle] = useState("");
  const [newSummary, setNewSummary] = useState("");
  const [newImages, setNewImages] = useState([]);
  const [contributions, setContributions] = useState(
    Object.keys(INITIAL_TEAM).reduce((acc, name) => ({ ...acc, [name]: "" }), {})
  );

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map(file => URL.createObjectURL(file));
    setNewImages(prev => [...prev, ...urls]);
  };

  const saveAssignment = () => {
    if (!newTitle) return;
    const entry = {
      id: Date.now(),
      title: newTitle,
      summary: newSummary,
      images: newImages,
      workLog: contributions
    };
    setAssignments([...assignments, entry]);
    resetForm();
  };

  const deleteAssignment = (id, e) => {
    e.stopPropagation();
    setAssignments(assignments.filter(item => item.id !== id));
  };

  const resetForm = () => {
    setNewTitle("");
    setNewSummary("");
    setNewImages([]);
    setContributions(Object.keys(INITIAL_TEAM).reduce((acc, name) => ({ ...acc, [name]: "" }), {}));
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-[#050102] text-[#fdfcfb] selection:bg-[#e0115f] selection:text-white font-sans overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      
      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full z-[100] border-b border-white/5 backdrop-blur-md bg-black/40 h-24 flex items-center px-8">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <span className="text-xs font-black tracking-[0.5em] uppercase text-[#d4af37]">Archive // Team 05</span>
          <button 
            onClick={() => setIsEditing(!isEditing)} 
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] font-bold uppercase tracking-widest transition-all ${isEditing ? 'bg-[#e0115f] border-[#e0115f] text-white' : 'border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10'}`}
          >
            {isEditing ? <Check size={12}/> : <Edit3 size={12}/>} {isEditing ? "Save Profile" : "Edit Mode"}
          </button>
        </div>
      </nav>

      <main className="relative z-10">
        {/* HOME VIEW */}
        {currentPage === 'home' && (
          <div className="pt-48 px-8 max-w-7xl mx-auto">
            <header className="mb-32">
              <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-[clamp(3.5rem,10vw,10rem)] font-serif italic leading-[0.8] mb-8">
                The <span className="text-[#d4af37]">Ledger.</span>
              </motion.h1>
              <div className="flex justify-between items-end">
                <p className="font-mono text-[#e0115f] uppercase tracking-[0.6em] text-[10px]">Digital Record of Engineering Philosophy</p>
                <button onClick={() => setShowAddForm(true)} className="flex items-center gap-3 group">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">Add Entry</span>
                  <div className="p-4 bg-white/5 rounded-full group-hover:bg-[#e0115f] transition-all"><Plus size={20}/></div>
                </button>
              </div>
            </header>

            {/* FULL WIDTH ASSIGNMENT STRIPS */}
            <div className="flex flex-col border-t border-white/5 mb-40">
              {assignments.map((item) => (
                <motion.div 
                  layout
                  key={item.id} 
                  onClick={() => setSelectedAssignment(item)}
                  className="group relative w-full border-b border-white/5 bg-transparent hover:bg-white/[0.02] transition-all duration-500 cursor-pointer overflow-hidden"
                >
                  {/* Image Peek on Hover */}
                  {item.images[0] && (
                    <img 
                      src={item.images[0]} 
                      className="absolute right-0 top-0 w-1/3 h-full object-cover opacity-0 group-hover:opacity-10 grayscale group-hover:grayscale-0 transition-all duration-1000 translate-x-10 group-hover:translate-x-0" 
                      alt="" 
                    />
                  )}

                  <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between p-12 md:p-16">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-[#e0115f] font-mono text-[10px] tracking-widest">ENTRY_{item.id.toString().slice(-4)}</span>
                        <div className="h-[1px] w-12 bg-white/10 group-hover:w-20 group-hover:bg-[#d4af37] transition-all duration-500"></div>
                      </div>
                      <h3 className="text-4xl md:text-6xl font-serif italic group-hover:text-[#d4af37] transition-colors">{item.title}</h3>
                      <p className="text-white/40 text-sm italic mt-4 max-w-2xl line-clamp-1 group-hover:line-clamp-none transition-all">{item.summary}</p>
                    </div>

                    <div className="flex items-center gap-8 mt-8 md:mt-0">
                      <button 
                        onClick={(e) => deleteAssignment(item.id, e)} 
                        className="p-3 text-white/20 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                      <ArrowRight size={32} className="text-[#d4af37] transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* TEAM VIEW */}
        {currentPage === 'team' && (
          <section className="pt-48 pb-64 px-8 max-w-7xl mx-auto">
            <h2 className="text-6xl font-serif italic text-[#d4af37] mb-20">The Collective</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(team).map(([name, data]) => (
                <motion.div 
                  layout
                  key={name} 
                  onClick={() => !isEditing && setExpandedMember(expandedMember === name ? null : name)}
                  className={`p-10 bg-white/[0.02] border border-white/5 transition-all cursor-pointer ${expandedMember === name ? 'ring-1 ring-[#e0115f]' : ''}`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-3xl font-serif">{name}</h3>
                      <p className="text-[#d4af37] text-[10px] uppercase tracking-[0.3em] font-bold">{data.role}</p>
                    </div>
                    {!isEditing && (expandedMember === name ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                  </div>

                  <AnimatePresence>
                    {(expandedMember === name || isEditing) && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        {isEditing ? (
                          <textarea 
                            className="w-full bg-white/5 p-4 text-sm italic text-white/60 outline-none border-l border-[#e0115f] mt-6 h-24"
                            value={data.philosophy}
                            onChange={(e) => setTeam({...team, [name]: {...data, philosophy: e.target.value}})}
                          />
                        ) : (
                          <p className="text-white/40 italic leading-relaxed border-l border-[#e0115f] pl-4 py-2 mt-6">"{data.philosophy}"</p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* DETAILED VIEW MODAL */}
      <AnimatePresence>
        {selectedAssignment && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25 }} className="fixed inset-0 z-[200] bg-[#050102] overflow-y-auto p-8 md:p-20">
            <button onClick={() => setSelectedAssignment(null)} className="fixed top-10 right-10 z-[210] p-4 bg-white/5 rounded-full hover:bg-[#e0115f] transition-all"><X /></button>
            <div className="max-w-5xl mx-auto pt-20">
              <h2 className="text-6xl md:text-8xl font-serif italic mb-6">{selectedAssignment.title}</h2>
              <p className="text-xl italic text-white/60 mb-12 leading-relaxed border-l-2 border-[#d4af37] pl-8">{selectedAssignment.summary}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
                {selectedAssignment.images.map((img, i) => (
                  <img key={i} src={img} className="w-full aspect-video object-cover border border-white/10" alt="" />
                ))}
              </div>

              <div className="border-t border-white/10 pt-12 pb-32">
                <h4 className="text-[10px] font-black tracking-widest text-[#e0115f] uppercase mb-12">Work Distribution Ledger</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {Object.entries(selectedAssignment.workLog).map(([name, work]) => (
                    <div key={name} className="bg-white/5 p-8 border border-white/5">
                      <p className="text-[#d4af37] text-xs font-bold uppercase mb-3">{name}</p>
                      <p className="text-white/40 text-sm italic">{work || "Log pending..."}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ADD FORM MODAL */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center p-6">
            <div className="max-w-3xl w-full bg-[#0a0a0a] border border-white/10 p-12 max-h-[90vh] overflow-y-auto no-scrollbar">
              <h2 className="text-4xl font-serif italic text-[#d4af37] mb-10">New Archive Entry</h2>
              <div className="space-y-8">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block">Project Title</label>
                  <input className="w-full bg-white/5 border-b border-white/10 p-4 outline-none focus:border-[#e0115f] transition-colors" onChange={(e) => setNewTitle(e.target.value)} />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block">Executive Summary</label>
                  <textarea className="w-full bg-white/5 border-b border-white/10 p-4 h-24 outline-none focus:border-[#e0115f] transition-colors" onChange={(e) => setNewSummary(e.target.value)} />
                </div>
                
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block">Media Gallery</label>
                  <label className="flex items-center justify-center h-20 border border-dashed border-white/10 cursor-pointer hover:bg-white/5 transition-all">
                    <Camera size={20} className="text-white/20 mr-3"/>
                    <span className="text-[10px] uppercase tracking-widest opacity-40">Inject Multiple Objects</span>
                    <input type="file" multiple className="hidden" onChange={handleImageUpload}/>
                  </label>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {newImages.map((img, i) => (
                      <div key={i} className="w-12 h-12 border border-white/10 overflow-hidden"><img src={img} className="w-full h-full object-cover" /></div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <label className="text-[10px] uppercase tracking-widest text-[#e0115f] block">Contribution Log</label>
                  {Object.keys(INITIAL_TEAM).map(name => (
                    <div key={name} className="flex flex-col gap-2 pb-4 border-b border-white/5">
                      <span className="text-[10px] font-bold opacity-60 uppercase">{name}</span>
                      <textarea className="bg-white/5 p-3 text-xs outline-none h-14 italic" placeholder="Assigned responsibility..." onChange={(e) => setContributions({...contributions, [name]: e.target.value})} />
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 pt-8">
                  <button onClick={resetForm} className="flex-1 py-4 border border-white/10 text-[10px] font-bold tracking-widest uppercase hover:bg-white/5 transition-all">Discard</button>
                  <button onClick={saveAssignment} className="flex-1 py-4 bg-[#e0115f] text-white text-[10px] font-bold tracking-widest uppercase hover:scale-[1.02] transition-all">Authorize</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING NAV */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[150] flex bg-black/80 border border-white/10 p-2 rounded-2xl backdrop-blur-xl">
        {['home', 'team'].map((page) => (
          <button 
            key={page} 
            onClick={() => setCurrentPage(page)} 
            className={`px-10 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${currentPage === page ? 'text-[#d4af37] bg-white/5' : 'text-white/20 hover:text-white'}`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}
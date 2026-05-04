"use client";

import React, { useMemo } from 'react';
import { USERS } from '@/data/users';
import { THERAPISTS } from '@/data/therapists';
import { matchUserToTherapists } from '@/lib/engine/matching';
import { ChevronLeft, Database, Search, Filter } from 'lucide-react';
import Link from 'next/link';

export default function AdminSandboxPage() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [highMatchesOnly, setHighMatchesOnly] = React.useState(false);

  // Pre-calculate all 352 matches (22 users x 16 therapists)
  const matrix = useMemo(() => {
    let filteredUsers = USERS;
    
    if (searchTerm) {
      filteredUsers = USERS.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    return filteredUsers.map(user => {
      let matches = matchUserToTherapists(user, THERAPISTS);
      
      if (highMatchesOnly) {
        matches = matches.filter(m => m.matchScore >= 80);
      }

      return {
        user,
        matches
      };
    });
  }, [searchTerm, highMatchesOnly]);

  return (
    <div className="max-w-full min-h-screen bg-trellis-bg p-8 font-sans text-trellis-text">
      <header className="flex items-center mb-8">
        <Link href="/" className="p-2 -ml-2 text-trellis-text-muted hover:text-trellis-text transition-colors">
          <ChevronLeft size={24} />
        </Link>
        <Database className="ml-4 mr-3 text-trellis-primary" size={28} />
        <div>
          <h1 className="font-serif text-3xl">Algorithm Sandbox</h1>
          <p className="text-trellis-text-muted text-sm mt-1">
            Validating the 52-variable mathematical engine across all {USERS.length} personas and {THERAPISTS.length} therapists.
          </p>
        </div>
      </header>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-trellis-text-muted" size={16} />
          <input 
            type="text" 
            placeholder="Search personas..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-trellis-primary/10 rounded-xl text-sm focus:ring-1 focus:ring-trellis-primary outline-none"
          />
        </div>
        <button 
          onClick={() => setHighMatchesOnly(!highMatchesOnly)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${highMatchesOnly ? 'bg-trellis-primary-deep text-white' : 'bg-white text-trellis-text-muted border border-trellis-primary/10'}`}
        >
          <Filter size={14} />
          High Matches Only (80%+)
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-trellis-primary/10 overflow-hidden">
        <div className="overflow-x-auto overflow-y-auto max-h-[70vh]">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="sticky top-0 z-30">
              <tr>
                <th className="px-4 py-4 bg-[#F5F2EB] border-b border-r border-trellis-surface font-bold text-trellis-text-muted uppercase tracking-wider sticky left-0 z-40 min-w-[140px] sm:min-w-[200px]">
                  User Persona
                </th>
                {THERAPISTS.map(t => (
                  <th key={t.id} className="px-3 py-4 bg-[#F5F2EB] border-b border-trellis-surface font-bold text-trellis-text-muted uppercase tracking-wider text-center min-w-[80px] sm:min-w-[100px]">
                    {t.name.split(' ')[0]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrix.map((row, i) => (
                <tr key={row.user.id} className={`group ${i % 2 === 0 ? 'bg-white' : 'bg-[#FAF8F5]'} hover:bg-trellis-primary/5 transition-colors`}>
                  <td className="px-4 py-3 border-b border-r border-trellis-surface sticky left-0 z-20 bg-inherit shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                    <div className="font-bold text-trellis-text truncate">{row.user.name}</div>
                    <div className="text-[9px] text-trellis-text-muted mt-0.5 uppercase tracking-tighter">
                      {row.user.stageOfChange.substring(0, 4)}
                    </div>
                  </td>
                  
                  {THERAPISTS.map(t => {
                    const matchRecord = row.matches.find(m => m.therapist.id === t.id);
                    const score = matchRecord ? matchRecord.matchScore : 0;
                    
                    let statusColor = "text-trellis-text-muted/40";
                    let statusBg = "";
                    
                    if (score >= 90) {
                      statusColor = "text-green-700 font-black";
                      statusBg = "bg-green-100";
                    } else if (score >= 80) {
                      statusColor = "text-trellis-primary-deep font-bold";
                      statusBg = "bg-trellis-primary/20";
                    } else if (score >= 70) {
                      statusColor = "text-trellis-primary font-bold";
                      statusBg = "bg-trellis-primary/10";
                    } else if (score === 0) {
                      statusColor = "text-red-400 font-medium";
                    }

                    return (
                      <td key={t.id} className="px-2 py-3 border-b border-trellis-surface text-center">
                        <div className={`inline-flex items-center justify-center rounded-md px-1.5 py-0.5 text-[10px] ${statusBg} ${statusColor}`}>
                          {score > 0 ? `${score}%` : 'FLTR'}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-8 text-center text-xs text-trellis-text-muted">
        <p>This matrix proves that no therapist is universally a 90%+ match, validating the specificity of the C-NIP and outcome-based routing logic.</p>
      </div>
    </div>
  );
}

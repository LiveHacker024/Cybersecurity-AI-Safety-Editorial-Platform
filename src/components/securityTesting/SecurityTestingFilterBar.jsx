import React from 'react';
import { Search, Filter, X, RotateCcw } from 'lucide-react';

export default function SecurityTestingFilterBar({
  search,
  setSearch,
  category,
  setCategory,
  platform,
  setPlatform,
  difficulty,
  setDifficulty,
  access,
  setAccess,
  totalCount,
  filteredCount
}) {
  const isFiltered = search || category !== 'ALL' || platform !== 'ALL' || difficulty !== 'ALL' || access !== 'ALL';

  const resetFilters = () => {
    setSearch('');
    setCategory('ALL');
    setPlatform('ALL');
    setDifficulty('ALL');
    setAccess('ALL');
  };

  return (
    <div
      className="glass-panel"
      style={{
        padding: '1.25rem',
        borderRadius: '12px',
        border: '1px solid rgba(56, 189, 248, 0.15)',
        background: 'rgba(15, 23, 42, 0.85)',
        marginBottom: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}
    >
      {/* Search & Reset Row */}
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '1 1 280px' }}>
          <Search
            size={18}
            color="#94a3b8"
            style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}
          />
          <input
            type="text"
            placeholder="Search vulnerabilities, CWEs, OWASP classifications, root causes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '0.7rem 1rem 0.7rem 2.75rem',
              background: 'rgba(3, 7, 18, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '8px',
              color: '#ffffff',
              fontSize: '0.875rem',
              outline: 'none'
            }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{
                position: 'absolute',
                right: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                padding: '0.2rem'
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {isFiltered && (
          <button
            onClick={resetFilters}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.65rem 0.95rem',
              borderRadius: '8px',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#f87171',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <RotateCcw size={14} />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Filter Badges Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {/* Category Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', fontFamily: 'var(--font-mono)', minWidth: '70px' }}>
            Category:
          </span>
          {[
            { id: 'ALL', label: 'All Categories' },
            { id: 'api-security', label: 'API Security' },
            { id: 'web-security', label: 'Web Security' },
            { id: 'mobile-security', label: 'Mobile Security' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: '6px',
                background: category === cat.id ? '#00f0ff' : 'rgba(3, 7, 18, 0.6)',
                border: '1px solid ' + (category === cat.id ? '#00f0ff' : 'rgba(255, 255, 255, 0.08)'),
                color: category === cat.id ? '#030712' : '#cbd5e1',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Platform Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', fontFamily: 'var(--font-mono)', minWidth: '70px' }}>
            Platform:
          </span>
          {['ALL', 'API', 'Web', 'Android', 'iOS'].map((plat) => (
            <button
              key={plat}
              onClick={() => setPlatform(plat)}
              style={{
                padding: '0.35rem 0.65rem',
                borderRadius: '6px',
                background: platform === plat ? '#38bdf8' : 'rgba(3, 7, 18, 0.6)',
                border: '1px solid ' + (platform === plat ? '#38bdf8' : 'rgba(255, 255, 255, 0.08)'),
                color: platform === plat ? '#030712' : '#cbd5e1',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {plat}
            </button>
          ))}
        </div>

        {/* Difficulty & Access Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          {/* Difficulty */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', fontFamily: 'var(--font-mono)', minWidth: '70px' }}>
              Difficulty:
            </span>
            {['ALL', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
              <button
                key={diff}
                onClick={() => setDifficulty(diff)}
                style={{
                  padding: '0.3rem 0.6rem',
                  borderRadius: '6px',
                  background: difficulty === diff ? 'rgba(56, 189, 248, 0.2)' : 'rgba(3, 7, 18, 0.6)',
                  border: '1px solid ' + (difficulty === diff ? '#38bdf8' : 'rgba(255, 255, 255, 0.08)'),
                  color: difficulty === diff ? '#38bdf8' : '#cbd5e1',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* Access Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              Access:
            </span>
            {[
              { id: 'ALL', label: 'All' },
              { id: 'FREE', label: 'Free' },
              { id: 'PAID', label: 'Paid+' }
            ].map((acc) => (
              <button
                key={acc.id}
                onClick={() => setAccess(acc.id)}
                style={{
                  padding: '0.3rem 0.6rem',
                  borderRadius: '6px',
                  background: access === acc.id ? 'rgba(0, 240, 255, 0.2)' : 'rgba(3, 7, 18, 0.6)',
                  border: '1px solid ' + (access === acc.id ? '#00f0ff' : 'rgba(255, 255, 255, 0.08)'),
                  color: access === acc.id ? '#00f0ff' : '#cbd5e1',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {acc.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result Count Indicator */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: '#64748b', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '0.65rem' }}>
        <span>
          Showing <strong style={{ color: '#f8fafc' }}>{filteredCount}</strong> of <strong style={{ color: '#f8fafc' }}>{totalCount}</strong> verified security vulnerability records
        </span>
      </div>
    </div>
  );
}

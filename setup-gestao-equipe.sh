#!/bin/bash
# Setup automático do projeto gestao-equipe
# Execute em uma sessão Claude Code conectada ao repositório gestao-equipe
set -e

echo "=== Criando projeto Gestão de Equipe ==="

mkdir -p .github/workflows src/{components,layouts,lib,pages/admin,styles} public


cat > "astro.config.mjs" << 'HEREDOC_ASTRO_CONFIG_MJS'
// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://gilsonbs.github.io',
  base: '/gestao-equipe',
  output: 'static',
});

HEREDOC_ASTRO_CONFIG_MJS

cat > "package.json" << 'HEREDOC_PACKAGE_JSON'
{
  "name": "gestao-equipe",
  "type": "module",
  "version": "0.0.1",
  "engines": {
    "node": ">=22.12.0"
  },
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.110.5",
    "astro": "^4.16.0"
  }
}

HEREDOC_PACKAGE_JSON

cat > "tsconfig.json" << 'HEREDOC_TSCONFIG_JSON'
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@lib/*": ["src/lib/*"],
      "@components/*": ["src/components/*"]
    }
  }
}

HEREDOC_TSCONFIG_JSON

cat > ".env.example" << 'HEREDOC__ENV_EXAMPLE'
PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-publica

HEREDOC__ENV_EXAMPLE

cat > ".gitignore" << 'HEREDOC__GITIGNORE'
# build output
dist/
.output/

# dependencies
node_modules/

# logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# environment variables
.env
.env.local
.env.production

# macOS-specific files
.DS_Store

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Astro
.astro/

HEREDOC__GITIGNORE

cat > "schema.sql" << 'HEREDOC_SCHEMA_SQL'
-- =============================================
-- Schema: Gestão de Equipe
-- Execute no Supabase SQL Editor
-- =============================================

-- Funcionários
CREATE TABLE IF NOT EXISTS funcionarios (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nome text NOT NULL,
  cargo text,
  data_nascimento date,
  ativo boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Metas mensais (também armazena valor realizado/vendas por funcionário)
CREATE TABLE IF NOT EXISTS metas (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  funcionario_id uuid NOT NULL REFERENCES funcionarios(id) ON DELETE CASCADE,
  mes integer NOT NULL CHECK (mes BETWEEN 1 AND 12),
  ano integer NOT NULL CHECK (ano >= 2020),
  valor_meta numeric(12,2) NOT NULL DEFAULT 0,
  valor_realizado numeric(12,2) NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(funcionario_id, mes, ano)
);

-- Vendas totais da loja
CREATE TABLE IF NOT EXISTS vendas_loja (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  mes integer NOT NULL CHECK (mes BETWEEN 1 AND 12),
  ano integer NOT NULL CHECK (ano >= 2020),
  valor_total numeric(12,2) NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Folgas e Férias
CREATE TABLE IF NOT EXISTS folgas (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  funcionario_id uuid NOT NULL REFERENCES funcionarios(id) ON DELETE CASCADE,
  data_inicio date NOT NULL,
  data_fim date NOT NULL,
  tipo text NOT NULL CHECK (tipo IN ('folga', 'ferias')),
  created_at timestamptz DEFAULT now(),
  CONSTRAINT data_valida CHECK (data_fim >= data_inicio)
);

-- Top Produtos
CREATE TABLE IF NOT EXISTS produtos_top (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nome text NOT NULL,
  substancia text,
  categoria text,
  quantidade integer,
  mes integer CHECK (mes BETWEEN 1 AND 12),
  ano integer CHECK (ano >= 2020),
  created_at timestamptz DEFAULT now()
);

-- =============================================
-- Row Level Security (RLS)
-- =============================================

ALTER TABLE funcionarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE metas ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendas_loja ENABLE ROW LEVEL SECURITY;
ALTER TABLE folgas ENABLE ROW LEVEL SECURITY;
ALTER TABLE produtos_top ENABLE ROW LEVEL SECURITY;

-- Leitura pública (dashboard sem login)
CREATE POLICY "Leitura pública - funcionarios" ON funcionarios FOR SELECT USING (true);
CREATE POLICY "Leitura pública - metas" ON metas FOR SELECT USING (true);
CREATE POLICY "Leitura pública - vendas_loja" ON vendas_loja FOR SELECT USING (true);
CREATE POLICY "Leitura pública - folgas" ON folgas FOR SELECT USING (true);
CREATE POLICY "Leitura pública - produtos_top" ON produtos_top FOR SELECT USING (true);

-- Escrita apenas para usuários autenticados (admin)
CREATE POLICY "Admin - funcionarios" ON funcionarios FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin - metas" ON metas FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin - vendas_loja" ON vendas_loja FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin - folgas" ON folgas FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin - produtos_top" ON produtos_top FOR ALL USING (auth.role() = 'authenticated');

-- =============================================
-- Índices para melhorar performance
-- =============================================
CREATE INDEX IF NOT EXISTS idx_metas_mes_ano ON metas(mes, ano);
CREATE INDEX IF NOT EXISTS idx_folgas_data_inicio ON folgas(data_inicio);
CREATE INDEX IF NOT EXISTS idx_produtos_top_nome ON produtos_top(nome);
CREATE INDEX IF NOT EXISTS idx_produtos_top_substancia ON produtos_top(substancia);
CREATE INDEX IF NOT EXISTS idx_funcionarios_ativo ON funcionarios(ativo);

HEREDOC_SCHEMA_SQL

cat > "public/favicon.svg" << 'HEREDOC_PUBLIC_FAVICON_SVG'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="20" fill="#1e3a8a"/>
  <text y="75" x="50" text-anchor="middle" font-size="65">💊</text>
</svg>

HEREDOC_PUBLIC_FAVICON_SVG

cat > "src/env.d.ts" << 'HEREDOC_SRC_ENV_D_TS'
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SUPABASE_URL: string;
  readonly PUBLIC_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

HEREDOC_SRC_ENV_D_TS

cat > "src/lib/supabase.ts" << 'HEREDOC_SRC_LIB_SUPABASE_TS'
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Funcionario = {
  id: string;
  nome: string;
  cargo: string | null;
  data_nascimento: string | null;
  ativo: boolean;
  created_at: string;
};

export type Meta = {
  id: string;
  funcionario_id: string;
  mes: number;
  ano: number;
  valor_meta: number;
  valor_realizado: number;
  funcionarios?: { nome: string; cargo: string | null };
};

export type VendaLoja = {
  id: string;
  mes: number;
  ano: number;
  valor_total: number;
};

export type Folga = {
  id: string;
  funcionario_id: string;
  data_inicio: string;
  data_fim: string;
  tipo: 'folga' | 'ferias';
  funcionarios?: { nome: string };
};

export type ProdutoTop = {
  id: string;
  nome: string;
  substancia: string | null;
  categoria: string | null;
  quantidade: number | null;
  mes: number | null;
  ano: number | null;
};

HEREDOC_SRC_LIB_SUPABASE_TS

cat > "src/styles/global.css" << 'HEREDOC_SRC_STYLES_GLOBAL_CSS'
:root {
  --color-primary: #1d4ed8;
  --color-primary-dark: #1e3a8a;
  --color-primary-light: #dbeafe;
  --color-secondary: #0f766e;
  --color-bg: #f1f5f9;
  --color-card: #ffffff;
  --color-text: #1e293b;
  --color-text-muted: #64748b;
  --color-border: #e2e8f0;
  --color-success: #16a34a;
  --color-success-light: #dcfce7;
  --color-warning: #d97706;
  --color-warning-light: #fef3c7;
  --color-danger: #dc2626;
  --color-danger-light: #fee2e2;
  --color-info: #0891b2;
  --color-info-light: #cffafe;
  --radius: 0.75rem;
  --shadow: 0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.06);
  --shadow-md: 0 4px 6px rgba(0,0,0,.07), 0 2px 4px rgba(0,0,0,.06);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--color-bg);
  color: var(--color-text);
  line-height: 1.5;
  font-size: 15px;
}

a { color: var(--color-primary); text-decoration: none; }
a:hover { text-decoration: underline; }

/* Layout */
.container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }

/* Cards */
.card {
  background: var(--color-card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  border: 1px solid var(--color-border);
}

.card-header {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: .5rem;
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: .5rem;
}

.card-body { padding: 1.25rem; }

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  gap: .4rem;
  padding: .5rem 1rem;
  border-radius: .5rem;
  font-size: .875rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: opacity .15s, background .15s;
}
.btn:hover { opacity: .9; }
.btn:disabled { opacity: .5; cursor: not-allowed; }

.btn-primary { background: var(--color-primary); color: #fff; }
.btn-secondary { background: var(--color-secondary); color: #fff; }
.btn-danger { background: var(--color-danger); color: #fff; }
.btn-ghost {
  background: transparent;
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
}
.btn-sm { padding: .35rem .75rem; font-size: .8rem; }

/* Forms */
.form-group { margin-bottom: 1rem; }
.form-label {
  display: block;
  font-size: .875rem;
  font-weight: 500;
  margin-bottom: .35rem;
  color: var(--color-text);
}
.form-control {
  width: 100%;
  padding: .55rem .75rem;
  border: 1px solid var(--color-border);
  border-radius: .5rem;
  font-size: .9rem;
  color: var(--color-text);
  background: #fff;
  transition: border-color .15s;
  outline: none;
}
.form-control:focus { border-color: var(--color-primary); box-shadow: 0 0 0 3px var(--color-primary-light); }

/* Tables */
.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; font-size: .875rem; }
th {
  text-align: left;
  padding: .65rem 1rem;
  background: var(--color-bg);
  color: var(--color-text-muted);
  font-weight: 600;
  font-size: .8rem;
  text-transform: uppercase;
  letter-spacing: .04em;
  border-bottom: 1px solid var(--color-border);
}
td {
  padding: .75rem 1rem;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text);
}
tr:last-child td { border-bottom: none; }
tr:hover td { background: var(--color-bg); }

/* Badge */
.badge {
  display: inline-flex;
  align-items: center;
  padding: .2rem .6rem;
  border-radius: 9999px;
  font-size: .75rem;
  font-weight: 500;
}
.badge-success { background: var(--color-success-light); color: var(--color-success); }
.badge-warning { background: var(--color-warning-light); color: var(--color-warning); }
.badge-danger { background: var(--color-danger-light); color: var(--color-danger); }
.badge-info { background: var(--color-info-light); color: var(--color-info); }

/* Progress bar */
.progress { height: 8px; background: var(--color-bg); border-radius: 9999px; overflow: hidden; }
.progress-bar { height: 100%; border-radius: 9999px; transition: width .3s; }
.progress-bar.success { background: var(--color-success); }
.progress-bar.warning { background: var(--color-warning); }
.progress-bar.danger { background: var(--color-danger); }

/* Alert */
.alert { padding: .75rem 1rem; border-radius: .5rem; font-size: .875rem; margin-bottom: 1rem; }
.alert-success { background: var(--color-success-light); color: var(--color-success); }
.alert-danger { background: var(--color-danger-light); color: var(--color-danger); }

/* Grid layouts */
.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }

@media (max-width: 900px) {
  .grid-4 { grid-template-columns: repeat(2, 1fr); }
  .grid-3 { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .grid-4, .grid-3, .grid-2 { grid-template-columns: 1fr; }
}

/* Stat card */
.stat-card {
  background: var(--color-card);
  border-radius: var(--radius);
  padding: 1.25rem;
  box-shadow: var(--shadow);
  border: 1px solid var(--color-border);
}
.stat-label { font-size: .8rem; color: var(--color-text-muted); font-weight: 500; text-transform: uppercase; letter-spacing: .04em; }
.stat-value { font-size: 1.75rem; font-weight: 700; color: var(--color-text); margin: .25rem 0; }
.stat-sub { font-size: .8rem; color: var(--color-text-muted); }

/* Loading */
.loading { display: flex; align-items: center; justify-content: center; padding: 2rem; color: var(--color-text-muted); gap: .5rem; }
.spinner { width: 1.5rem; height: 1.5rem; border: 2px solid var(--color-border); border-top-color: var(--color-primary); border-radius: 50%; animation: spin .7s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* Empty state */
.empty { text-align: center; padding: 2.5rem 1rem; color: var(--color-text-muted); }
.empty-icon { font-size: 2.5rem; margin-bottom: .5rem; }

/* Modal */
.modal-backdrop {
  position: fixed; inset: 0; background: rgba(0,0,0,.4);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000; padding: 1rem;
}
.modal {
  background: #fff; border-radius: var(--radius);
  box-shadow: var(--shadow-md); width: 100%; max-width: 480px;
  max-height: 90vh; overflow-y: auto;
}
.modal-header {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--color-border);
  display: flex; align-items: center; justify-content: space-between;
}
.modal-title { font-weight: 600; font-size: 1rem; }
.modal-close { background: none; border: none; font-size: 1.25rem; cursor: pointer; color: var(--color-text-muted); }
.modal-body { padding: 1.25rem; }
.modal-footer {
  padding: 1rem 1.25rem;
  border-top: 1px solid var(--color-border);
  display: flex; justify-content: flex-end; gap: .5rem;
}

HEREDOC_SRC_STYLES_GLOBAL_CSS

cat > "src/layouts/BaseLayout.astro" << 'HEREDOC_SRC_LAYOUTS_BASELAYOUT_ASTRO'
---
import '../styles/global.css';

interface Props {
  title?: string;
}
const { title = 'Gestão de Equipe' } = Astro.props;
---
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  <link rel="icon" href={`${import.meta.env.BASE_URL}favicon.svg`} />
</head>
<body>
  <slot />
</body>
</html>

HEREDOC_SRC_LAYOUTS_BASELAYOUT_ASTRO

cat > "src/layouts/AdminLayout.astro" << 'HEREDOC_SRC_LAYOUTS_ADMINLAYOUT_ASTRO'
---
import '../styles/global.css';

interface Props {
  title?: string;
  active?: string;
}
const { title = 'Admin', active = '' } = Astro.props;
const base = import.meta.env.BASE_URL;

const navItems = [
  { href: `${base}admin/`, label: 'Início', icon: '🏠', key: 'index' },
  { href: `${base}admin/funcionarios/`, label: 'Funcionários', icon: '👤', key: 'funcionarios' },
  { href: `${base}admin/metas/`, label: 'Metas', icon: '🎯', key: 'metas' },
  { href: `${base}admin/vendas/`, label: 'Vendas', icon: '💰', key: 'vendas' },
  { href: `${base}admin/folgas/`, label: 'Folgas & Férias', icon: '📅', key: 'folgas' },
  { href: `${base}admin/produtos/`, label: 'Top Produtos', icon: '💊', key: 'produtos' },
];
---
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title} — Admin</title>
  <link rel="icon" href={`${base}favicon.svg`} />
</head>
<body>
<div class="admin-shell">
  <aside class="sidebar">
    <div class="sidebar-brand">
      <span class="brand-icon">💊</span>
      <span class="brand-name">Gestão<br/><small>Equipe</small></span>
    </div>
    <nav class="sidebar-nav">
      {navItems.map(item => (
        <a
          href={item.href}
          class={`nav-item ${active === item.key ? 'active' : ''}`}
        >
          <span class="nav-icon">{item.icon}</span>
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
    <div class="sidebar-footer">
      <a href={`${base}`} class="nav-item">
        <span class="nav-icon">👁️</span>
        <span>Ver Dashboard</span>
      </a>
      <button class="nav-item" id="btn-logout" style="width:100%;text-align:left;background:none;border:none;cursor:pointer;">
        <span class="nav-icon">🚪</span>
        <span>Sair</span>
      </button>
    </div>
  </aside>

  <div class="admin-main">
    <header class="admin-header">
      <button class="menu-toggle" id="menu-toggle">☰</button>
      <h1 class="admin-page-title">{title}</h1>
    </header>
    <main class="admin-content">
      <slot />
    </main>
  </div>
</div>

<script>
  import { supabase } from '../lib/supabase';

  // Auth guard
  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      window.location.href = import.meta.env.BASE_URL + 'admin/login/';
    }
  }
  checkAuth();

  // Logout
  document.getElementById('btn-logout')?.addEventListener('click', async () => {
    await supabase.auth.signOut();
    window.location.href = import.meta.env.BASE_URL + 'admin/login/';
  });

  // Mobile menu toggle
  document.getElementById('menu-toggle')?.addEventListener('click', () => {
    document.querySelector('.sidebar')?.classList.toggle('open');
  });
</script>

<style>
  .admin-shell {
    display: flex;
    min-height: 100vh;
  }

  .sidebar {
    width: 240px;
    background: #1e3a8a;
    color: #fff;
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 100;
    transition: transform .25s;
  }

  .sidebar-brand {
    padding: 1.25rem 1rem;
    display: flex;
    align-items: center;
    gap: .75rem;
    border-bottom: 1px solid rgba(255,255,255,.1);
  }
  .brand-icon { font-size: 1.75rem; }
  .brand-name { font-weight: 700; font-size: .95rem; line-height: 1.3; }
  .brand-name small { font-weight: 400; opacity: .7; font-size: .8rem; }

  .sidebar-nav {
    flex: 1;
    padding: .75rem 0;
    overflow-y: auto;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: .75rem;
    padding: .65rem 1.25rem;
    color: rgba(255,255,255,.75);
    font-size: .9rem;
    transition: background .15s, color .15s;
    text-decoration: none;
  }
  .nav-item:hover { background: rgba(255,255,255,.1); color: #fff; text-decoration: none; }
  .nav-item.active { background: rgba(255,255,255,.15); color: #fff; border-left: 3px solid #60a5fa; }
  .nav-icon { width: 1.25rem; text-align: center; }

  .sidebar-footer {
    border-top: 1px solid rgba(255,255,255,.1);
    padding: .5rem 0;
  }

  .admin-main {
    flex: 1;
    margin-left: 240px;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .admin-header {
    background: #fff;
    border-bottom: 1px solid var(--color-border, #e2e8f0);
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    position: sticky;
    top: 0;
    z-index: 50;
  }

  .admin-page-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #1e293b;
  }

  .menu-toggle {
    display: none;
    background: none;
    border: none;
    font-size: 1.25rem;
    cursor: pointer;
  }

  .admin-content {
    flex: 1;
    padding: 1.5rem;
    background: #f1f5f9;
  }

  @media (max-width: 768px) {
    .sidebar { transform: translateX(-100%); }
    .sidebar.open { transform: translateX(0); }
    .admin-main { margin-left: 0; }
    .menu-toggle { display: block; }
  }
</style>

HEREDOC_SRC_LAYOUTS_ADMINLAYOUT_ASTRO

cat > "src/pages/index.astro" << 'HEREDOC_SRC_PAGES_INDEX_ASTRO'
---
import '../styles/global.css';
const base = import.meta.env.BASE_URL;
const MESES = ['','Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const now = new Date();
const mesAtual = now.getMonth() + 1;
const anoAtual = now.getFullYear();
---
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Dashboard — Gestão de Equipe</title>
  <link rel="icon" href={`${base}favicon.svg`} />
</head>
<body>

<header class="top-bar">
  <div class="top-bar-inner">
    <div class="brand">
      <span class="brand-icon">💊</span>
      <div>
        <div class="brand-title">Gestão de Equipe</div>
        <div class="brand-sub">Dashboard Interno</div>
      </div>
    </div>
    <div class="header-right">
      <div class="month-selector">
        <select id="sel-mes" class="form-control" style="display:inline-block;width:auto">
          {MESES.slice(1).map((m, i) => (
            <option value={i + 1} selected={i + 1 === mesAtual}>{m}</option>
          ))}
        </select>
        <input type="number" id="sel-ano" class="form-control" value={anoAtual}
          style="display:inline-block;width:90px" min="2020" max="2100" />
      </div>
      <a href={`${base}admin/`} class="btn btn-ghost btn-sm">⚙️ Admin</a>
    </div>
  </div>
</header>

<main class="dashboard">

  <!-- Stats Row -->
  <section class="grid-4 section" id="stats-row">
    <div class="stat-card" id="stat-vendas-loja">
      <div class="stat-label">Vendas da Loja</div>
      <div class="stat-value loading-val">—</div>
      <div class="stat-sub">este mês</div>
    </div>
    <div class="stat-card" id="stat-total-metas">
      <div class="stat-label">Funcionários com Meta</div>
      <div class="stat-value loading-val">—</div>
      <div class="stat-sub">lançadas este mês</div>
    </div>
    <div class="stat-card" id="stat-media-metas">
      <div class="stat-label">Atingimento Médio</div>
      <div class="stat-value loading-val">—</div>
      <div class="stat-sub">de metas este mês</div>
    </div>
    <div class="stat-card" id="stat-folgas">
      <div class="stat-label">Folgas/Férias</div>
      <div class="stat-value loading-val">—</div>
      <div class="stat-sub">agendadas este mês</div>
    </div>
  </section>

  <div class="grid-2 section">
    <!-- Metas dos Funcionários -->
    <div class="card">
      <div class="card-header">
        <span class="card-title">🎯 Metas dos Funcionários</span>
        <span id="metas-periodo" style="font-size:.8rem;color:#64748b"></span>
      </div>
      <div class="card-body" id="metas-body">
        <div class="loading"><div class="spinner"></div> Carregando...</div>
      </div>
    </div>

    <!-- Aniversários -->
    <div class="card">
      <div class="card-header">
        <span class="card-title">🎂 Aniversários do Mês</span>
      </div>
      <div class="card-body" id="aniv-body">
        <div class="loading"><div class="spinner"></div> Carregando...</div>
      </div>
    </div>
  </div>

  <div class="grid-2 section">
    <!-- Calendário de Folgas -->
    <div class="card">
      <div class="card-header">
        <span class="card-title">📅 Folgas & Férias</span>
        <div style="display:flex;gap:.5rem">
          <button class="btn btn-ghost btn-sm filter-tipo active" data-tipo="">Todos</button>
          <button class="btn btn-ghost btn-sm filter-tipo" data-tipo="folga">Folgas</button>
          <button class="btn btn-ghost btn-sm filter-tipo" data-tipo="ferias">Férias</button>
        </div>
      </div>
      <div class="card-body" id="folgas-body">
        <div class="loading"><div class="spinner"></div> Carregando...</div>
      </div>
    </div>

    <!-- Vendas por Funcionário -->
    <div class="card">
      <div class="card-header">
        <span class="card-title">💰 Vendas por Funcionário</span>
        <span id="vendas-periodo" style="font-size:.8rem;color:#64748b"></span>
      </div>
      <div class="card-body" id="vendas-body">
        <div class="loading"><div class="spinner"></div> Carregando...</div>
      </div>
    </div>
  </div>

  <!-- Top Produtos -->
  <section class="card section">
    <div class="card-header">
      <span class="card-title">💊 Top Produtos</span>
      <div style="display:flex;gap:.5rem;align-items:center;flex-wrap:wrap">
        <input class="form-control" id="busca-prod" placeholder="🔍 Nome ou substância..." style="width:220px" />
        <select class="form-control" id="prod-mes" style="width:auto">
          <option value="">Todos os meses</option>
          {MESES.slice(1).map((m, i) => (
            <option value={i + 1}>{m}</option>
          ))}
        </select>
      </div>
    </div>
    <div class="card-body" id="produtos-body">
      <div class="loading"><div class="spinner"></div> Carregando...</div>
    </div>
  </section>

</main>

<script>
  import { supabase } from '../lib/supabase';

  const MESES = ['','Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  const MESES_SHORT = ['','Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

  const selMes = document.getElementById('sel-mes') as HTMLSelectElement;
  const selAno = document.getElementById('sel-ano') as HTMLInputElement;

  function getMes() { return parseInt(selMes.value); }
  function getAno() { return parseInt(selAno.value); }

  // ===== STATS =====
  async function loadStats() {
    const mes = getMes(); const ano = getAno();
    const prefix = `${ano}-${String(mes).padStart(2,'0')}`;
    const [lojaRes, metasRes, folgasRes] = await Promise.all([
      supabase.from('vendas_loja').select('valor_total').eq('mes', mes).eq('ano', ano),
      supabase.from('metas').select('valor_meta, valor_realizado').eq('mes', mes).eq('ano', ano),
      supabase.from('folgas').select('id').gte('data_inicio', `${prefix}-01`).lte('data_inicio', `${prefix}-31`),
    ]);

    const totalLoja = (lojaRes.data ?? []).reduce((s: number, v: any) => s + Number(v.valor_total), 0);
    document.getElementById('stat-vendas-loja')!.querySelector('.stat-value')!.textContent =
      totalLoja > 0 ? `R$ ${totalLoja.toLocaleString('pt-BR', {minimumFractionDigits:2})}` : 'R$ 0,00';

    const metas = metasRes.data ?? [];
    document.getElementById('stat-total-metas')!.querySelector('.stat-value')!.textContent = String(metas.length);

    const media = metas.length > 0
      ? Math.round(metas.reduce((s: number, m: any) =>
          s + (m.valor_meta > 0 ? (m.valor_realizado / m.valor_meta) * 100 : 0), 0) / metas.length)
      : 0;
    const mediaEl = document.getElementById('stat-media-metas')!.querySelector('.stat-value')!;
    mediaEl.textContent = `${media}%`;
    mediaEl.style.color = media >= 100 ? 'var(--color-success)' : media >= 70 ? 'var(--color-warning)' : 'var(--color-danger)';

    document.getElementById('stat-folgas')!.querySelector('.stat-value')!.textContent =
      String((folgasRes.count ?? folgasRes.data?.length ?? 0));
  }

  // ===== METAS =====
  async function loadMetas() {
    const mes = getMes(); const ano = getAno();
    document.getElementById('metas-periodo')!.textContent = `${MESES[mes]} ${ano}`;
    const { data } = await supabase
      .from('metas')
      .select('*, funcionarios(nome, cargo)')
      .eq('mes', mes).eq('ano', ano)
      .order('valor_meta', { ascending: false });

    const body = document.getElementById('metas-body')!;
    if (!data || data.length === 0) {
      body.innerHTML = '<div class="empty"><div class="empty-icon">🎯</div>Nenhuma meta lançada para este período</div>';
      return;
    }
    body.innerHTML = data.map((m: any) => {
      const pct = m.valor_meta > 0 ? Math.min(Math.round((m.valor_realizado / m.valor_meta) * 100), 100) : 0;
      const pctReal = m.valor_meta > 0 ? Math.round((m.valor_realizado / m.valor_meta) * 100) : 0;
      const cls = pctReal >= 100 ? 'success' : pctReal >= 70 ? 'warning' : 'danger';
      const color = pctReal >= 100 ? 'var(--color-success)' : pctReal >= 70 ? 'var(--color-warning)' : 'var(--color-danger)';
      return `<div style="margin-bottom:1rem">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.35rem">
          <div>
            <span style="font-weight:600">${m.funcionarios?.nome ?? '—'}</span>
            ${m.funcionarios?.cargo ? `<span style="font-size:.75rem;color:#64748b;margin-left:.5rem">${m.funcionarios.cargo}</span>` : ''}
          </div>
          <span style="font-weight:700;color:${color}">${pctReal}%</span>
        </div>
        <div class="progress" style="margin-bottom:.3rem">
          <div class="progress-bar ${cls}" style="width:${pct}%"></div>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:.75rem;color:#64748b">
          <span>Realizado: R$ ${Number(m.valor_realizado).toLocaleString('pt-BR',{minimumFractionDigits:2})}</span>
          <span>Meta: R$ ${Number(m.valor_meta).toLocaleString('pt-BR',{minimumFractionDigits:2})}</span>
        </div>
      </div>`;
    }).join('');
  }

  // ===== ANIVERSÁRIOS =====
  async function loadAniversarios() {
    const mes = getMes();
    const { data } = await supabase
      .from('funcionarios')
      .select('nome, cargo, data_nascimento')
      .eq('ativo', true)
      .not('data_nascimento', 'is', null);

    const body = document.getElementById('aniv-body')!;
    const aniv = (data ?? [])
      .filter((f: any) => f.data_nascimento && parseInt(f.data_nascimento.split('-')[1]) === mes)
      .sort((a: any, b: any) => parseInt(a.data_nascimento.split('-')[2]) - parseInt(b.data_nascimento.split('-')[2]));

    const hoje = new Date();
    if (aniv.length === 0) {
      body.innerHTML = '<div class="empty"><div class="empty-icon">🎂</div>Nenhum aniversário este mês</div>';
      return;
    }
    body.innerHTML = aniv.map((f: any) => {
      const day = parseInt(f.data_nascimento.split('-')[2]);
      const birth = new Date(hoje.getFullYear(), mes - 1, day);
      const isToday = birth.getDate() === hoje.getDate() && birth.getMonth() === hoje.getMonth();
      const isPast = birth < hoje && !isToday;
      return `<div style="display:flex;align-items:center;gap:.75rem;padding:.6rem 0;border-bottom:1px solid #e2e8f0">
        <div style="font-size:1.5rem;min-width:2rem;text-align:center">${isToday ? '🎉' : isPast ? '🎂' : '🎂'}</div>
        <div style="flex:1">
          <div style="font-weight:600${isToday ? ';color:var(--color-success)' : ''}">${f.nome}${isToday ? ' — Hoje! 🎉' : ''}</div>
          <div style="font-size:.75rem;color:#64748b">${f.cargo ?? ''} · Dia ${day}</div>
        </div>
        ${isToday ? '<span class="badge badge-success">Hoje</span>' : ''}
      </div>`;
    }).join('');
  }

  // ===== FOLGAS =====
  let folgaFilter = '';
  async function loadFolgas() {
    const mes = getMes(); const ano = getAno();
    const prefix = `${ano}-${String(mes).padStart(2,'0')}`;
    let query = supabase
      .from('folgas')
      .select('*, funcionarios(nome)')
      .or(`data_inicio.gte.${prefix}-01,data_fim.gte.${prefix}-01`)
      .lte('data_inicio', `${prefix}-31`)
      .order('data_inicio');
    if (folgaFilter) query = query.eq('tipo', folgaFilter);
    const { data } = await query;

    const body = document.getElementById('folgas-body')!;
    if (!data || data.length === 0) {
      body.innerHTML = '<div class="empty"><div class="empty-icon">📅</div>Nenhuma folga ou férias agendada</div>';
      return;
    }
    body.innerHTML = `<div style="display:flex;flex-direction:column;gap:.5rem">` + data.map((f: any) => {
      const inicio = new Date(f.data_inicio + 'T00:00:00');
      const fim = new Date(f.data_fim + 'T00:00:00');
      const dias = Math.round((fim.getTime() - inicio.getTime()) / 86400000) + 1;
      const badge = f.tipo === 'ferias' ? 'badge-info' : 'badge-warning';
      const icon = f.tipo === 'ferias' ? '🏖️' : '📋';
      return `<div style="display:flex;align-items:center;gap:.75rem;padding:.6rem;background:#f8fafc;border-radius:.5rem;border:1px solid #e2e8f0">
        <span style="font-size:1.25rem">${icon}</span>
        <div style="flex:1">
          <div style="font-weight:600">${f.funcionarios?.nome ?? '—'}</div>
          <div style="font-size:.75rem;color:#64748b">
            ${formatDate(f.data_inicio)} → ${formatDate(f.data_fim)} · ${dias} dia${dias>1?'s':''}
          </div>
        </div>
        <span class="badge ${badge}">${f.tipo === 'ferias' ? 'Férias' : 'Folga'}</span>
      </div>`;
    }).join('') + '</div>';
  }

  function formatDate(d: string) {
    const [y, m, day] = d.split('-');
    return `${day}/${m}/${y}`;
  }

  document.querySelectorAll('.filter-tipo').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-tipo').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      folgaFilter = (btn as HTMLElement).dataset.tipo ?? '';
      loadFolgas();
    });
  });

  // ===== VENDAS =====
  async function loadVendas() {
    const mes = getMes(); const ano = getAno();
    document.getElementById('vendas-periodo')!.textContent = `${MESES[mes]} ${ano}`;
    const { data } = await supabase
      .from('metas')
      .select('valor_realizado, funcionarios(nome)')
      .eq('mes', mes).eq('ano', ano)
      .gt('valor_realizado', 0)
      .order('valor_realizado', { ascending: false });

    const body = document.getElementById('vendas-body')!;
    if (!data || data.length === 0) {
      body.innerHTML = '<div class="empty"><div class="empty-icon">💰</div>Nenhuma venda lançada</div>';
      return;
    }
    const maxVal = Math.max(...data.map((v: any) => Number(v.valor_realizado)));
    body.innerHTML = data.map((v: any, i: number) => {
      const pct = maxVal > 0 ? Math.round((v.valor_realizado / maxVal) * 100) : 0;
      const colors = ['var(--color-primary)','var(--color-secondary)','#7c3aed','#dc2626','#d97706'];
      const color = colors[i % colors.length];
      return `<div style="margin-bottom:.75rem">
        <div style="display:flex;justify-content:space-between;margin-bottom:.3rem">
          <span style="font-weight:500">${(v.funcionarios as any)?.nome ?? '—'}</span>
          <span style="font-weight:600">R$ ${Number(v.valor_realizado).toLocaleString('pt-BR',{minimumFractionDigits:2})}</span>
        </div>
        <div class="progress">
          <div class="progress-bar" style="width:${pct}%;background:${color}"></div>
        </div>
      </div>`;
    }).join('');
  }

  // ===== TOP PRODUTOS =====
  let allProdutos: any[] = [];
  async function loadProdutos() {
    const { data } = await supabase
      .from('produtos_top')
      .select('*')
      .order('quantidade', { ascending: false, nullsFirst: false });
    allProdutos = data ?? [];
    renderProdutos();
  }

  function renderProdutos() {
    const q = (document.getElementById('busca-prod') as HTMLInputElement).value.toLowerCase().trim();
    const mesFilter = (document.getElementById('prod-mes') as HTMLSelectElement).value;
    let filtered = allProdutos;
    if (q) filtered = filtered.filter(p => p.nome?.toLowerCase().includes(q) || p.substancia?.toLowerCase().includes(q));
    if (mesFilter) filtered = filtered.filter(p => String(p.mes) === mesFilter);

    const body = document.getElementById('produtos-body')!;
    if (filtered.length === 0) {
      body.innerHTML = '<div class="empty"><div class="empty-icon">💊</div>Nenhum produto encontrado</div>';
      return;
    }

    body.innerHTML = `<div class="table-wrap"><table>
      <thead><tr><th>#</th><th>Nome</th><th>Substância</th><th>Categoria</th><th>Quantidade</th><th>Período</th></tr></thead>
      <tbody>
        ${filtered.slice(0, 50).map((p, i) => `
          <tr>
            <td><strong>#${i+1}</strong></td>
            <td><strong>${p.nome}</strong></td>
            <td>${p.substancia ?? '—'}</td>
            <td>${p.categoria ? `<span class="badge badge-info">${p.categoria}</span>` : '—'}</td>
            <td>${p.quantidade ?? '—'}</td>
            <td>${p.mes ? `${MESES_SHORT[p.mes]}/${p.ano}` : '—'}</td>
          </tr>
        `).join('')}
      </tbody>
    </table></div>`;
  }

  let searchTimer: ReturnType<typeof setTimeout>;
  document.getElementById('busca-prod')?.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(renderProdutos, 200);
  });
  document.getElementById('prod-mes')?.addEventListener('change', renderProdutos);

  // ===== LOAD ALL =====
  function loadAll() {
    loadStats(); loadMetas(); loadAniversarios(); loadFolgas(); loadVendas(); loadProdutos();
  }

  selMes.addEventListener('change', () => { loadStats(); loadMetas(); loadFolgas(); loadVendas(); });
  selAno.addEventListener('change', () => { loadStats(); loadMetas(); loadFolgas(); loadVendas(); });

  loadAll();
</script>

<style>
  .top-bar {
    background: #1e3a8a;
    color: #fff;
    padding: .75rem 0;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 2px 8px rgba(0,0,0,.2);
  }
  .top-bar-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .brand { display: flex; align-items: center; gap: .75rem; }
  .brand-icon { font-size: 1.75rem; }
  .brand-title { font-weight: 700; font-size: 1rem; }
  .brand-sub { font-size: .75rem; opacity: .7; }
  .header-right { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
  .month-selector { display: flex; align-items: center; gap: .5rem; }
  .month-selector .form-control {
    background: rgba(255,255,255,.15);
    border-color: rgba(255,255,255,.3);
    color: #fff;
  }
  .month-selector .form-control option { background: #1e3a8a; }

  .dashboard {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1.5rem 1rem;
  }
  .section { margin-bottom: 1.5rem; }

  .filter-tipo.active { background: var(--color-primary); color: #fff; border-color: var(--color-primary); }

  @media (max-width: 600px) {
    .top-bar-inner { flex-direction: column; align-items: flex-start; }
    .header-right { width: 100%; }
  }
</style>
</body>
</html>

HEREDOC_SRC_PAGES_INDEX_ASTRO

cat > "src/pages/admin/login.astro" << 'HEREDOC_SRC_PAGES_ADMIN_LOGIN_ASTRO'
---
import '../../styles/global.css';
const base = import.meta.env.BASE_URL;
---
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Login — Admin</title>
  <link rel="icon" href={`${base}favicon.svg`} />
</head>
<body class="login-body">
  <div class="login-card">
    <div class="login-header">
      <div class="login-icon">💊</div>
      <h1>Gestão de Equipe</h1>
      <p>Painel Administrativo</p>
    </div>

    <form id="login-form">
      <div class="form-group">
        <label class="form-label" for="email">E-mail</label>
        <input class="form-control" type="email" id="email" required autocomplete="email" placeholder="seu@email.com" />
      </div>
      <div class="form-group">
        <label class="form-label" for="password">Senha</label>
        <input class="form-control" type="password" id="password" required autocomplete="current-password" placeholder="••••••••" />
      </div>
      <div id="error-msg" class="alert alert-danger" style="display:none"></div>
      <button class="btn btn-primary" type="submit" style="width:100%" id="btn-submit">
        Entrar
      </button>
    </form>
  </div>

<script>
  import { supabase } from '../../lib/supabase';

  // Already logged in → redirect
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) window.location.href = import.meta.env.BASE_URL + 'admin/';
  });

  const form = document.getElementById('login-form') as HTMLFormElement;
  const errorMsg = document.getElementById('error-msg') as HTMLDivElement;
  const btnSubmit = document.getElementById('btn-submit') as HTMLButtonElement;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMsg.style.display = 'none';
    btnSubmit.disabled = true;
    btnSubmit.textContent = 'Entrando...';

    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      errorMsg.textContent = 'E-mail ou senha incorretos.';
      errorMsg.style.display = 'block';
      btnSubmit.disabled = false;
      btnSubmit.textContent = 'Entrar';
    } else {
      window.location.href = import.meta.env.BASE_URL + 'admin/';
    }
  });
</script>

<style>
  body.login-body {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #1e3a8a 0%, #0f766e 100%);
  }

  .login-card {
    background: #fff;
    border-radius: 1rem;
    box-shadow: 0 20px 40px rgba(0,0,0,.2);
    padding: 2rem;
    width: 100%;
    max-width: 400px;
  }

  .login-header {
    text-align: center;
    margin-bottom: 1.75rem;
  }

  .login-icon {
    font-size: 2.5rem;
    margin-bottom: .5rem;
  }

  .login-header h1 {
    font-size: 1.35rem;
    font-weight: 700;
    color: #1e293b;
  }

  .login-header p {
    font-size: .875rem;
    color: #64748b;
    margin-top: .25rem;
  }
</style>
</body>
</html>

HEREDOC_SRC_PAGES_ADMIN_LOGIN_ASTRO

cat > "src/pages/admin/index.astro" << 'HEREDOC_SRC_PAGES_ADMIN_INDEX_ASTRO'
---
import AdminLayout from '../../layouts/AdminLayout.astro';
const base = import.meta.env.BASE_URL;
---
<AdminLayout title="Painel Admin" active="index">
  <div class="grid-4" style="margin-bottom:1.5rem">
    <div class="stat-card" id="stat-funcionarios">
      <div class="stat-label">Funcionários Ativos</div>
      <div class="stat-value" id="num-func">—</div>
      <div class="stat-sub">cadastrados</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Metas este mês</div>
      <div class="stat-value" id="num-metas">—</div>
      <div class="stat-sub">lançadas</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Folgas este mês</div>
      <div class="stat-value" id="num-folgas">—</div>
      <div class="stat-sub">agendadas</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Top Produtos</div>
      <div class="stat-value" id="num-produtos">—</div>
      <div class="stat-sub">cadastrados</div>
    </div>
  </div>

  <div class="grid-2">
    <div class="card">
      <div class="card-header">
        <span class="card-title">⚡ Acesso Rápido</span>
      </div>
      <div class="card-body" style="display:flex;flex-direction:column;gap:.75rem">
        <a href={`${base}admin/funcionarios/`} class="btn btn-ghost" style="justify-content:flex-start">👤 Gerenciar Funcionários</a>
        <a href={`${base}admin/metas/`} class="btn btn-ghost" style="justify-content:flex-start">🎯 Lançar Metas</a>
        <a href={`${base}admin/vendas/`} class="btn btn-ghost" style="justify-content:flex-start">💰 Lançar Vendas</a>
        <a href={`${base}admin/folgas/`} class="btn btn-ghost" style="justify-content:flex-start">📅 Gerenciar Folgas & Férias</a>
        <a href={`${base}admin/produtos/`} class="btn btn-ghost" style="justify-content:flex-start">💊 Gerenciar Top Produtos</a>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">🎂 Aniversários do Mês</span>
      </div>
      <div class="card-body" id="aniv-list">
        <div class="loading"><div class="spinner"></div> Carregando...</div>
      </div>
    </div>
  </div>
</AdminLayout>

<script>
  import { supabase } from '../../lib/supabase';

  const now = new Date();
  const mes = now.getMonth() + 1;
  const ano = now.getFullYear();

  async function loadStats() {
    const [funcRes, metasRes, folgasRes, prodRes, anivRes] = await Promise.all([
      supabase.from('funcionarios').select('id', { count: 'exact', head: true }).eq('ativo', true),
      supabase.from('metas').select('id', { count: 'exact', head: true }).eq('mes', mes).eq('ano', ano),
      supabase.from('folgas').select('id', { count: 'exact', head: true })
        .gte('data_inicio', `${ano}-${String(mes).padStart(2,'0')}-01`)
        .lte('data_inicio', `${ano}-${String(mes).padStart(2,'0')}-31`),
      supabase.from('produtos_top').select('id', { count: 'exact', head: true }),
      supabase.from('funcionarios').select('nome, data_nascimento').eq('ativo', true).not('data_nascimento', 'is', null),
    ]);

    document.getElementById('num-func')!.textContent = String(funcRes.count ?? 0);
    document.getElementById('num-metas')!.textContent = String(metasRes.count ?? 0);
    document.getElementById('num-folgas')!.textContent = String(folgasRes.count ?? 0);
    document.getElementById('num-produtos')!.textContent = String(prodRes.count ?? 0);

    const anivList = document.getElementById('aniv-list')!;
    const anivData = (anivRes.data ?? []).filter(f => {
      if (!f.data_nascimento) return false;
      const m = parseInt(f.data_nascimento.split('-')[1]);
      return m === mes;
    });

    if (anivData.length === 0) {
      anivList.innerHTML = '<div class="empty"><div class="empty-icon">🎂</div><div>Nenhum aniversário este mês</div></div>';
    } else {
      anivList.innerHTML = anivData.map(f => {
        const day = f.data_nascimento!.split('-')[2];
        return `<div style="display:flex;align-items:center;gap:.75rem;padding:.5rem 0;border-bottom:1px solid #e2e8f0">
          <span style="font-size:1.25rem">🎂</span>
          <div>
            <div style="font-weight:500">${f.nome}</div>
            <div style="font-size:.8rem;color:#64748b">Dia ${parseInt(day)}</div>
          </div>
        </div>`;
      }).join('');
    }
  }

  loadStats();
</script>

HEREDOC_SRC_PAGES_ADMIN_INDEX_ASTRO

cat > "src/pages/admin/funcionarios.astro" << 'HEREDOC_SRC_PAGES_ADMIN_FUNCIONARIOS_ASTRO'
---
import AdminLayout from '../../layouts/AdminLayout.astro';
---
<AdminLayout title="Funcionários" active="funcionarios">
  <div style="display:flex;justify-content:flex-end;margin-bottom:1rem">
    <button class="btn btn-primary" id="btn-novo">+ Novo Funcionário</button>
  </div>

  <div class="card">
    <div class="card-body">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Cargo</th>
              <th>Aniversário</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody id="tbody">
            <tr><td colspan="5"><div class="loading"><div class="spinner"></div> Carregando...</div></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal-backdrop" id="modal" style="display:none">
    <div class="modal">
      <div class="modal-header">
        <span class="modal-title" id="modal-title">Novo Funcionário</span>
        <button class="modal-close" id="modal-close">✕</button>
      </div>
      <div class="modal-body">
        <form id="form">
          <input type="hidden" id="func-id" />
          <div class="form-group">
            <label class="form-label">Nome *</label>
            <input class="form-control" id="nome" required placeholder="Nome completo" />
          </div>
          <div class="form-group">
            <label class="form-label">Cargo</label>
            <input class="form-control" id="cargo" placeholder="Ex: Farmacêutico, Atendente..." />
          </div>
          <div class="form-group">
            <label class="form-label">Data de Nascimento</label>
            <input class="form-control" type="date" id="data_nascimento" />
          </div>
          <div class="form-group">
            <label class="form-label">Status</label>
            <select class="form-control" id="ativo">
              <option value="true">Ativo</option>
              <option value="false">Inativo</option>
            </select>
          </div>
          <div id="form-error" class="alert alert-danger" style="display:none"></div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" id="btn-cancel">Cancelar</button>
        <button class="btn btn-primary" id="btn-save">Salvar</button>
      </div>
    </div>
  </div>
</AdminLayout>

<script>
  import { supabase } from '../../lib/supabase';

  type Func = { id: string; nome: string; cargo: string | null; data_nascimento: string | null; ativo: boolean };
  let editingId: string | null = null;

  async function load() {
    const { data } = await supabase.from('funcionarios').select('*').order('nome');
    const tbody = document.getElementById('tbody')!;
    if (!data || data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5"><div class="empty"><div class="empty-icon">👤</div>Nenhum funcionário cadastrado</div></td></tr>';
      return;
    }
    tbody.innerHTML = data.map((f: Func) => `
      <tr>
        <td><strong>${f.nome}</strong></td>
        <td>${f.cargo ?? '—'}</td>
        <td>${f.data_nascimento ? formatDate(f.data_nascimento) : '—'}</td>
        <td><span class="badge ${f.ativo ? 'badge-success' : 'badge-danger'}">${f.ativo ? 'Ativo' : 'Inativo'}</span></td>
        <td style="display:flex;gap:.5rem">
          <button class="btn btn-ghost btn-sm" onclick="openEdit('${f.id}')">✏️ Editar</button>
          <button class="btn btn-danger btn-sm" onclick="deleteFunc('${f.id}')">🗑️</button>
        </td>
      </tr>
    `).join('');
  }

  function formatDate(d: string) {
    const [y, m, day] = d.split('-');
    return `${day}/${m}/${y}`;
  }

  function openModal() { document.getElementById('modal')!.style.display = 'flex'; }
  function closeModal() {
    document.getElementById('modal')!.style.display = 'none';
    (document.getElementById('form') as HTMLFormElement).reset();
    (document.getElementById('func-id') as HTMLInputElement).value = '';
    document.getElementById('form-error')!.style.display = 'none';
    editingId = null;
  }

  document.getElementById('btn-novo')?.addEventListener('click', () => {
    document.getElementById('modal-title')!.textContent = 'Novo Funcionário';
    editingId = null;
    openModal();
  });
  document.getElementById('modal-close')?.addEventListener('click', closeModal);
  document.getElementById('btn-cancel')?.addEventListener('click', closeModal);

  (window as any).openEdit = async (id: string) => {
    const { data } = await supabase.from('funcionarios').select('*').eq('id', id).single();
    if (!data) return;
    editingId = id;
    document.getElementById('modal-title')!.textContent = 'Editar Funcionário';
    (document.getElementById('nome') as HTMLInputElement).value = data.nome;
    (document.getElementById('cargo') as HTMLInputElement).value = data.cargo ?? '';
    (document.getElementById('data_nascimento') as HTMLInputElement).value = data.data_nascimento ?? '';
    (document.getElementById('ativo') as HTMLSelectElement).value = String(data.ativo);
    openModal();
  };

  (window as any).deleteFunc = async (id: string) => {
    if (!confirm('Excluir este funcionário?')) return;
    await supabase.from('funcionarios').delete().eq('id', id);
    load();
  };

  document.getElementById('btn-save')?.addEventListener('click', async () => {
    const nome = (document.getElementById('nome') as HTMLInputElement).value.trim();
    const cargo = (document.getElementById('cargo') as HTMLInputElement).value.trim() || null;
    const data_nascimento = (document.getElementById('data_nascimento') as HTMLInputElement).value || null;
    const ativo = (document.getElementById('ativo') as HTMLSelectElement).value === 'true';
    const errorDiv = document.getElementById('form-error')!;

    if (!nome) { errorDiv.textContent = 'Nome é obrigatório.'; errorDiv.style.display = 'block'; return; }
    errorDiv.style.display = 'none';

    if (editingId) {
      await supabase.from('funcionarios').update({ nome, cargo, data_nascimento, ativo }).eq('id', editingId);
    } else {
      await supabase.from('funcionarios').insert({ nome, cargo, data_nascimento, ativo });
    }
    closeModal();
    load();
  });

  load();
</script>

HEREDOC_SRC_PAGES_ADMIN_FUNCIONARIOS_ASTRO

cat > "src/pages/admin/metas.astro" << 'HEREDOC_SRC_PAGES_ADMIN_METAS_ASTRO'
---
import AdminLayout from '../../layouts/AdminLayout.astro';
---
<AdminLayout title="Metas" active="metas">
  <div class="card" style="margin-bottom:1rem">
    <div class="card-body" style="display:flex;gap:1rem;align-items:flex-end;flex-wrap:wrap">
      <div class="form-group" style="margin:0;flex:1;min-width:140px">
        <label class="form-label">Mês</label>
        <select class="form-control" id="sel-mes">
          <option value="1">Janeiro</option><option value="2">Fevereiro</option>
          <option value="3">Março</option><option value="4">Abril</option>
          <option value="5">Maio</option><option value="6">Junho</option>
          <option value="7">Julho</option><option value="8">Agosto</option>
          <option value="9">Setembro</option><option value="10">Outubro</option>
          <option value="11">Novembro</option><option value="12">Dezembro</option>
        </select>
      </div>
      <div class="form-group" style="margin:0;flex:1;min-width:100px">
        <label class="form-label">Ano</label>
        <input class="form-control" type="number" id="sel-ano" value={new Date().getFullYear()} min="2020" max="2100" />
      </div>
      <button class="btn btn-primary" id="btn-novo">+ Lançar Meta</button>
    </div>
  </div>

  <div class="card">
    <div class="card-body">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Funcionário</th>
              <th>Meta (R$)</th>
              <th>Realizado (R$)</th>
              <th>%</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody id="tbody">
            <tr><td colspan="6"><div class="loading"><div class="spinner"></div> Carregando...</div></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div class="modal-backdrop" id="modal" style="display:none">
    <div class="modal">
      <div class="modal-header">
        <span class="modal-title" id="modal-title">Lançar Meta</span>
        <button class="modal-close" id="modal-close">✕</button>
      </div>
      <div class="modal-body">
        <form id="form">
          <input type="hidden" id="meta-id" />
          <div class="form-group">
            <label class="form-label">Funcionário *</label>
            <select class="form-control" id="funcionario_id" required>
              <option value="">Selecione...</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Valor da Meta (R$) *</label>
            <input class="form-control" type="number" id="valor_meta" min="0" step="0.01" required placeholder="0,00" />
          </div>
          <div class="form-group">
            <label class="form-label">Valor Realizado (R$)</label>
            <input class="form-control" type="number" id="valor_realizado" min="0" step="0.01" placeholder="0,00" value="0" />
          </div>
          <div id="form-error" class="alert alert-danger" style="display:none"></div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" id="btn-cancel">Cancelar</button>
        <button class="btn btn-primary" id="btn-save">Salvar</button>
      </div>
    </div>
  </div>
</AdminLayout>

<script>
  import { supabase } from '../../lib/supabase';

  let editingId: string | null = null;
  const selMes = document.getElementById('sel-mes') as HTMLSelectElement;
  const selAno = document.getElementById('sel-ano') as HTMLInputElement;
  selMes.value = String(new Date().getMonth() + 1);

  async function load() {
    const mes = parseInt(selMes.value);
    const ano = parseInt(selAno.value);
    const { data } = await supabase
      .from('metas')
      .select('*, funcionarios(nome)')
      .eq('mes', mes).eq('ano', ano)
      .order('created_at', { ascending: false });

    const tbody = document.getElementById('tbody')!;
    if (!data || data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6"><div class="empty"><div class="empty-icon">🎯</div>Nenhuma meta lançada para este período</div></td></tr>';
      return;
    }
    tbody.innerHTML = data.map((m: any) => {
      const pct = m.valor_meta > 0 ? Math.round((m.valor_realizado / m.valor_meta) * 100) : 0;
      const cls = pct >= 100 ? 'success' : pct >= 70 ? 'warning' : 'danger';
      const badge = pct >= 100 ? 'badge-success' : pct >= 70 ? 'badge-warning' : 'badge-danger';
      const label = pct >= 100 ? 'Atingida' : pct >= 70 ? 'Em progresso' : 'Abaixo';
      return `<tr>
        <td><strong>${m.funcionarios?.nome ?? '—'}</strong></td>
        <td>R$ ${Number(m.valor_meta).toLocaleString('pt-BR', {minimumFractionDigits:2})}</td>
        <td>R$ ${Number(m.valor_realizado).toLocaleString('pt-BR', {minimumFractionDigits:2})}</td>
        <td>
          <div style="min-width:80px">
            <div style="font-weight:600;margin-bottom:4px">${pct}%</div>
            <div class="progress"><div class="progress-bar ${cls}" style="width:${Math.min(pct,100)}%"></div></div>
          </div>
        </td>
        <td><span class="badge ${badge}">${label}</span></td>
        <td style="display:flex;gap:.5rem">
          <button class="btn btn-ghost btn-sm" onclick="openEdit('${m.id}')">✏️</button>
          <button class="btn btn-danger btn-sm" onclick="deleteMeta('${m.id}')">🗑️</button>
        </td>
      </tr>`;
    }).join('');
  }

  async function loadFuncionarios() {
    const { data } = await supabase.from('funcionarios').select('id, nome').eq('ativo', true).order('nome');
    const sel = document.getElementById('funcionario_id') as HTMLSelectElement;
    (data ?? []).forEach((f: any) => {
      const opt = document.createElement('option');
      opt.value = f.id; opt.textContent = f.nome;
      sel.appendChild(opt);
    });
  }

  function openModal() { document.getElementById('modal')!.style.display = 'flex'; }
  function closeModal() {
    document.getElementById('modal')!.style.display = 'none';
    (document.getElementById('form') as HTMLFormElement).reset();
    document.getElementById('form-error')!.style.display = 'none';
    (document.getElementById('valor_realizado') as HTMLInputElement).value = '0';
    editingId = null;
  }

  document.getElementById('btn-novo')?.addEventListener('click', () => {
    document.getElementById('modal-title')!.textContent = 'Lançar Meta';
    editingId = null;
    openModal();
  });
  document.getElementById('modal-close')?.addEventListener('click', closeModal);
  document.getElementById('btn-cancel')?.addEventListener('click', closeModal);
  selMes.addEventListener('change', load);
  selAno.addEventListener('change', load);

  (window as any).openEdit = async (id: string) => {
    const { data } = await supabase.from('metas').select('*').eq('id', id).single();
    if (!data) return;
    editingId = id;
    document.getElementById('modal-title')!.textContent = 'Editar Meta';
    (document.getElementById('funcionario_id') as HTMLSelectElement).value = data.funcionario_id;
    (document.getElementById('valor_meta') as HTMLInputElement).value = data.valor_meta;
    (document.getElementById('valor_realizado') as HTMLInputElement).value = data.valor_realizado;
    openModal();
  };

  (window as any).deleteMeta = async (id: string) => {
    if (!confirm('Excluir esta meta?')) return;
    await supabase.from('metas').delete().eq('id', id);
    load();
  };

  document.getElementById('btn-save')?.addEventListener('click', async () => {
    const funcionario_id = (document.getElementById('funcionario_id') as HTMLSelectElement).value;
    const valor_meta = parseFloat((document.getElementById('valor_meta') as HTMLInputElement).value);
    const valor_realizado = parseFloat((document.getElementById('valor_realizado') as HTMLInputElement).value) || 0;
    const mes = parseInt(selMes.value);
    const ano = parseInt(selAno.value);
    const errorDiv = document.getElementById('form-error')!;

    if (!funcionario_id || isNaN(valor_meta)) {
      errorDiv.textContent = 'Preencha todos os campos obrigatórios.';
      errorDiv.style.display = 'block'; return;
    }
    errorDiv.style.display = 'none';

    if (editingId) {
      await supabase.from('metas').update({ funcionario_id, valor_meta, valor_realizado, mes, ano }).eq('id', editingId);
    } else {
      await supabase.from('metas').insert({ funcionario_id, valor_meta, valor_realizado, mes, ano });
    }
    closeModal(); load();
  });

  loadFuncionarios(); load();
</script>

HEREDOC_SRC_PAGES_ADMIN_METAS_ASTRO

cat > "src/pages/admin/vendas.astro" << 'HEREDOC_SRC_PAGES_ADMIN_VENDAS_ASTRO'
---
import AdminLayout from '../../layouts/AdminLayout.astro';
---
<AdminLayout title="Vendas" active="vendas">
  <div class="card" style="margin-bottom:1rem">
    <div class="card-body" style="display:flex;gap:1rem;align-items:flex-end;flex-wrap:wrap">
      <div class="form-group" style="margin:0;flex:1;min-width:140px">
        <label class="form-label">Mês</label>
        <select class="form-control" id="sel-mes">
          <option value="1">Janeiro</option><option value="2">Fevereiro</option>
          <option value="3">Março</option><option value="4">Abril</option>
          <option value="5">Maio</option><option value="6">Junho</option>
          <option value="7">Julho</option><option value="8">Agosto</option>
          <option value="9">Setembro</option><option value="10">Outubro</option>
          <option value="11">Novembro</option><option value="12">Dezembro</option>
        </select>
      </div>
      <div class="form-group" style="margin:0;flex:1;min-width:100px">
        <label class="form-label">Ano</label>
        <input class="form-control" type="number" id="sel-ano" value={new Date().getFullYear()} min="2020" />
      </div>
    </div>
  </div>

  <div class="grid-2" style="margin-bottom:1.5rem">
    <!-- Vendas por Funcionário -->
    <div class="card">
      <div class="card-header">
        <span class="card-title">👤 Vendas por Funcionário</span>
        <button class="btn btn-primary btn-sm" id="btn-novo-func">+ Lançar</button>
      </div>
      <div class="card-body">
        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>Funcionário</th><th>Valor (R$)</th><th>Ações</th></tr>
            </thead>
            <tbody id="tbody-func">
              <tr><td colspan="3"><div class="loading"><div class="spinner"></div></div></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Vendas da Loja -->
    <div class="card">
      <div class="card-header">
        <span class="card-title">🏪 Vendas da Loja</span>
        <button class="btn btn-primary btn-sm" id="btn-novo-loja">+ Lançar</button>
      </div>
      <div class="card-body">
        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>Total (R$)</th><th>Ações</th></tr>
            </thead>
            <tbody id="tbody-loja">
              <tr><td colspan="2"><div class="loading"><div class="spinner"></div></div></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Funcionário -->
  <div class="modal-backdrop" id="modal-func" style="display:none">
    <div class="modal">
      <div class="modal-header">
        <span class="modal-title" id="modal-func-title">Lançar Venda — Funcionário</span>
        <button class="modal-close" onclick="closeModalFunc()">✕</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label class="form-label">Funcionário *</label>
          <select class="form-control" id="vf-func" required>
            <option value="">Selecione...</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Valor Total de Vendas (R$) *</label>
          <input class="form-control" type="number" id="vf-valor" min="0" step="0.01" placeholder="0,00" />
        </div>
        <div id="vf-error" class="alert alert-danger" style="display:none"></div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" onclick="closeModalFunc()">Cancelar</button>
        <button class="btn btn-primary" id="btn-save-func">Salvar</button>
      </div>
    </div>
  </div>

  <!-- Modal Loja -->
  <div class="modal-backdrop" id="modal-loja" style="display:none">
    <div class="modal">
      <div class="modal-header">
        <span class="modal-title" id="modal-loja-title">Lançar Vendas da Loja</span>
        <button class="modal-close" onclick="closeModalLoja()">✕</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label class="form-label">Valor Total de Vendas (R$) *</label>
          <input class="form-control" type="number" id="vl-valor" min="0" step="0.01" placeholder="0,00" />
        </div>
        <div id="vl-error" class="alert alert-danger" style="display:none"></div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" onclick="closeModalLoja()">Cancelar</button>
        <button class="btn btn-primary" id="btn-save-loja">Salvar</button>
      </div>
    </div>
  </div>
</AdminLayout>

<script>
  import { supabase } from '../../lib/supabase';

  let editingFuncId: string | null = null;
  let editingLojaId: string | null = null;
  const selMes = document.getElementById('sel-mes') as HTMLSelectElement;
  const selAno = document.getElementById('sel-ano') as HTMLInputElement;
  selMes.value = String(new Date().getMonth() + 1);

  function getMesAno() {
    return { mes: parseInt(selMes.value), ano: parseInt(selAno.value) };
  }

  async function loadFuncionarios() {
    const { data } = await supabase.from('funcionarios').select('id, nome').eq('ativo', true).order('nome');
    const sel = document.getElementById('vf-func') as HTMLSelectElement;
    (data ?? []).forEach((f: any) => {
      const opt = document.createElement('option');
      opt.value = f.id; opt.textContent = f.nome;
      sel.appendChild(opt);
    });
  }

  async function loadVendasFunc() {
    const { mes, ano } = getMesAno();
    const { data } = await supabase
      .from('metas')
      .select('id, valor_realizado, funcionarios(nome)')
      .eq('mes', mes).eq('ano', ano);

    const tbody = document.getElementById('tbody-func')!;
    if (!data || data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="3"><div class="empty"><div class="empty-icon">💰</div>Nenhuma venda lançada</div></td></tr>';
      return;
    }
    tbody.innerHTML = data.map((v: any) => `
      <tr>
        <td>${(v.funcionarios as any)?.nome ?? '—'}</td>
        <td>R$ ${Number(v.valor_realizado).toLocaleString('pt-BR', {minimumFractionDigits:2})}</td>
        <td><button class="btn btn-ghost btn-sm" onclick="openEditFunc('${v.id}', ${v.valor_realizado})">✏️</button></td>
      </tr>
    `).join('');
  }

  async function loadVendasLoja() {
    const { mes, ano } = getMesAno();
    const { data } = await supabase.from('vendas_loja').select('*').eq('mes', mes).eq('ano', ano);
    const tbody = document.getElementById('tbody-loja')!;
    if (!data || data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="2"><div class="empty"><div class="empty-icon">🏪</div>Nenhum lançamento</div></td></tr>';
      return;
    }
    tbody.innerHTML = data.map((v: any) => `
      <tr>
        <td><strong>R$ ${Number(v.valor_total).toLocaleString('pt-BR', {minimumFractionDigits:2})}</strong></td>
        <td style="display:flex;gap:.5rem">
          <button class="btn btn-ghost btn-sm" onclick="openEditLoja('${v.id}', ${v.valor_total})">✏️</button>
          <button class="btn btn-danger btn-sm" onclick="deleteLoja('${v.id}')">🗑️</button>
        </td>
      </tr>
    `).join('');
  }

  function load() { loadVendasFunc(); loadVendasLoja(); }

  // Modal Funcionário
  (window as any).closeModalFunc = () => {
    document.getElementById('modal-func')!.style.display = 'none';
    editingFuncId = null;
  };
  (window as any).openEditFunc = (id: string, valor: number) => {
    editingFuncId = id;
    document.getElementById('modal-func-title')!.textContent = 'Atualizar Vendas — Funcionário';
    (document.getElementById('vf-valor') as HTMLInputElement).value = String(valor);
    document.getElementById('modal-func')!.style.display = 'flex';
  };
  document.getElementById('btn-novo-func')?.addEventListener('click', () => {
    editingFuncId = null;
    document.getElementById('modal-func-title')!.textContent = 'Lançar Venda — Funcionário';
    (document.getElementById('vf-valor') as HTMLInputElement).value = '';
    document.getElementById('modal-func')!.style.display = 'flex';
  });
  document.getElementById('btn-save-func')?.addEventListener('click', async () => {
    const { mes, ano } = getMesAno();
    const funcionario_id = (document.getElementById('vf-func') as HTMLSelectElement).value;
    const valor = parseFloat((document.getElementById('vf-valor') as HTMLInputElement).value);
    const errorDiv = document.getElementById('vf-error')!;
    if ((!funcionario_id && !editingFuncId) || isNaN(valor)) {
      errorDiv.textContent = 'Preencha todos os campos.'; errorDiv.style.display = 'block'; return;
    }
    errorDiv.style.display = 'none';
    if (editingFuncId) {
      await supabase.from('metas').update({ valor_realizado: valor }).eq('id', editingFuncId);
    } else {
      const { data: exists } = await supabase.from('metas').select('id').eq('funcionario_id', funcionario_id).eq('mes', mes).eq('ano', ano).single();
      if (exists) {
        await supabase.from('metas').update({ valor_realizado: valor }).eq('id', exists.id);
      } else {
        await supabase.from('metas').insert({ funcionario_id, mes, ano, valor_meta: 0, valor_realizado: valor });
      }
    }
    (window as any).closeModalFunc(); load();
  });

  // Modal Loja
  (window as any).closeModalLoja = () => {
    document.getElementById('modal-loja')!.style.display = 'none';
    editingLojaId = null;
  };
  (window as any).openEditLoja = (id: string, valor: number) => {
    editingLojaId = id;
    document.getElementById('modal-loja-title')!.textContent = 'Editar Vendas da Loja';
    (document.getElementById('vl-valor') as HTMLInputElement).value = String(valor);
    document.getElementById('modal-loja')!.style.display = 'flex';
  };
  (window as any).deleteLoja = async (id: string) => {
    if (!confirm('Excluir este lançamento?')) return;
    await supabase.from('vendas_loja').delete().eq('id', id);
    loadVendasLoja();
  };
  document.getElementById('btn-novo-loja')?.addEventListener('click', () => {
    editingLojaId = null;
    document.getElementById('modal-loja-title')!.textContent = 'Lançar Vendas da Loja';
    (document.getElementById('vl-valor') as HTMLInputElement).value = '';
    document.getElementById('modal-loja')!.style.display = 'flex';
  });
  document.getElementById('btn-save-loja')?.addEventListener('click', async () => {
    const { mes, ano } = getMesAno();
    const valor_total = parseFloat((document.getElementById('vl-valor') as HTMLInputElement).value);
    const errorDiv = document.getElementById('vl-error')!;
    if (isNaN(valor_total)) { errorDiv.textContent = 'Informe o valor.'; errorDiv.style.display = 'block'; return; }
    errorDiv.style.display = 'none';
    if (editingLojaId) {
      await supabase.from('vendas_loja').update({ valor_total }).eq('id', editingLojaId);
    } else {
      await supabase.from('vendas_loja').insert({ mes, ano, valor_total });
    }
    (window as any).closeModalLoja(); loadVendasLoja();
  });

  selMes.addEventListener('change', load);
  selAno.addEventListener('change', load);

  loadFuncionarios(); load();
</script>

HEREDOC_SRC_PAGES_ADMIN_VENDAS_ASTRO

cat > "src/pages/admin/folgas.astro" << 'HEREDOC_SRC_PAGES_ADMIN_FOLGAS_ASTRO'
---
import AdminLayout from '../../layouts/AdminLayout.astro';
---
<AdminLayout title="Folgas & Férias" active="folgas">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:.5rem">
    <div style="display:flex;gap:.5rem">
      <button class="btn btn-ghost btn-sm filter-btn active" data-tipo="">Todos</button>
      <button class="btn btn-ghost btn-sm filter-btn" data-tipo="folga">Folgas</button>
      <button class="btn btn-ghost btn-sm filter-btn" data-tipo="ferias">Férias</button>
    </div>
    <button class="btn btn-primary" id="btn-novo">+ Agendar</button>
  </div>

  <div class="card">
    <div class="card-body">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Funcionário</th>
              <th>Tipo</th>
              <th>Início</th>
              <th>Fim</th>
              <th>Dias</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody id="tbody">
            <tr><td colspan="6"><div class="loading"><div class="spinner"></div> Carregando...</div></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div class="modal-backdrop" id="modal" style="display:none">
    <div class="modal">
      <div class="modal-header">
        <span class="modal-title" id="modal-title">Agendar Folga/Férias</span>
        <button class="modal-close" id="modal-close">✕</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label class="form-label">Funcionário *</label>
          <select class="form-control" id="funcionario_id" required><option value="">Selecione...</option></select>
        </div>
        <div class="form-group">
          <label class="form-label">Tipo *</label>
          <select class="form-control" id="tipo">
            <option value="folga">Folga</option>
            <option value="ferias">Férias</option>
          </select>
        </div>
        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Data Início *</label>
            <input class="form-control" type="date" id="data_inicio" required />
          </div>
          <div class="form-group">
            <label class="form-label">Data Fim *</label>
            <input class="form-control" type="date" id="data_fim" required />
          </div>
        </div>
        <div id="form-error" class="alert alert-danger" style="display:none"></div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" id="btn-cancel">Cancelar</button>
        <button class="btn btn-primary" id="btn-save">Salvar</button>
      </div>
    </div>
  </div>
</AdminLayout>

<script>
  import { supabase } from '../../lib/supabase';

  let editingId: string | null = null;
  let currentFilter = '';

  async function load() {
    let query = supabase
      .from('folgas')
      .select('*, funcionarios(nome)')
      .order('data_inicio', { ascending: false });
    if (currentFilter) query = query.eq('tipo', currentFilter);
    const { data } = await query;

    const tbody = document.getElementById('tbody')!;
    if (!data || data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6"><div class="empty"><div class="empty-icon">📅</div>Nenhum registro encontrado</div></td></tr>';
      return;
    }
    tbody.innerHTML = data.map((f: any) => {
      const inicio = new Date(f.data_inicio + 'T00:00:00');
      const fim = new Date(f.data_fim + 'T00:00:00');
      const dias = Math.round((fim.getTime() - inicio.getTime()) / 86400000) + 1;
      const badge = f.tipo === 'ferias' ? 'badge-info' : 'badge-warning';
      const label = f.tipo === 'ferias' ? '🏖️ Férias' : '📋 Folga';
      return `<tr>
        <td><strong>${f.funcionarios?.nome ?? '—'}</strong></td>
        <td><span class="badge ${badge}">${label}</span></td>
        <td>${formatDate(f.data_inicio)}</td>
        <td>${formatDate(f.data_fim)}</td>
        <td>${dias} dia${dias > 1 ? 's' : ''}</td>
        <td style="display:flex;gap:.5rem">
          <button class="btn btn-ghost btn-sm" onclick="openEdit('${f.id}')">✏️</button>
          <button class="btn btn-danger btn-sm" onclick="deleteFolga('${f.id}')">🗑️</button>
        </td>
      </tr>`;
    }).join('');
  }

  function formatDate(d: string) {
    const [y, m, day] = d.split('-');
    return `${day}/${m}/${y}`;
  }

  async function loadFuncionarios() {
    const { data } = await supabase.from('funcionarios').select('id, nome').eq('ativo', true).order('nome');
    const sel = document.getElementById('funcionario_id') as HTMLSelectElement;
    (data ?? []).forEach((f: any) => {
      const opt = document.createElement('option');
      opt.value = f.id; opt.textContent = f.nome;
      sel.appendChild(opt);
    });
  }

  function openModal() { document.getElementById('modal')!.style.display = 'flex'; }
  function closeModal() {
    document.getElementById('modal')!.style.display = 'none';
    (document.getElementById('form-error') as HTMLElement).style.display = 'none';
    editingId = null;
  }

  document.getElementById('btn-novo')?.addEventListener('click', () => {
    document.getElementById('modal-title')!.textContent = 'Agendar Folga/Férias';
    (document.getElementById('funcionario_id') as HTMLSelectElement).value = '';
    (document.getElementById('tipo') as HTMLSelectElement).value = 'folga';
    (document.getElementById('data_inicio') as HTMLInputElement).value = '';
    (document.getElementById('data_fim') as HTMLInputElement).value = '';
    editingId = null;
    openModal();
  });
  document.getElementById('modal-close')?.addEventListener('click', closeModal);
  document.getElementById('btn-cancel')?.addEventListener('click', closeModal);

  (window as any).openEdit = async (id: string) => {
    const { data } = await supabase.from('folgas').select('*').eq('id', id).single();
    if (!data) return;
    editingId = id;
    document.getElementById('modal-title')!.textContent = 'Editar Folga/Férias';
    (document.getElementById('funcionario_id') as HTMLSelectElement).value = data.funcionario_id;
    (document.getElementById('tipo') as HTMLSelectElement).value = data.tipo;
    (document.getElementById('data_inicio') as HTMLInputElement).value = data.data_inicio;
    (document.getElementById('data_fim') as HTMLInputElement).value = data.data_fim;
    openModal();
  };

  (window as any).deleteFolga = async (id: string) => {
    if (!confirm('Excluir este registro?')) return;
    await supabase.from('folgas').delete().eq('id', id);
    load();
  };

  document.getElementById('btn-save')?.addEventListener('click', async () => {
    const funcionario_id = (document.getElementById('funcionario_id') as HTMLSelectElement).value;
    const tipo = (document.getElementById('tipo') as HTMLSelectElement).value;
    const data_inicio = (document.getElementById('data_inicio') as HTMLInputElement).value;
    const data_fim = (document.getElementById('data_fim') as HTMLInputElement).value;
    const errorDiv = document.getElementById('form-error')!;

    if (!funcionario_id || !data_inicio || !data_fim) {
      errorDiv.textContent = 'Preencha todos os campos obrigatórios.';
      errorDiv.style.display = 'block'; return;
    }
    if (data_fim < data_inicio) {
      errorDiv.textContent = 'Data fim deve ser igual ou após a data início.';
      errorDiv.style.display = 'block'; return;
    }
    errorDiv.style.display = 'none';

    if (editingId) {
      await supabase.from('folgas').update({ funcionario_id, tipo, data_inicio, data_fim }).eq('id', editingId);
    } else {
      await supabase.from('folgas').insert({ funcionario_id, tipo, data_inicio, data_fim });
    }
    closeModal(); load();
  });

  // Filters
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = (btn as HTMLElement).dataset.tipo ?? '';
      load();
    });
  });

  loadFuncionarios(); load();
</script>

<style>
  .filter-btn.active { background: var(--color-primary); color: #fff; border-color: var(--color-primary); }
</style>

HEREDOC_SRC_PAGES_ADMIN_FOLGAS_ASTRO

cat > "src/pages/admin/produtos.astro" << 'HEREDOC_SRC_PAGES_ADMIN_PRODUTOS_ASTRO'
---
import AdminLayout from '../../layouts/AdminLayout.astro';
---
<AdminLayout title="Top Produtos" active="produtos">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:.5rem">
    <div style="display:flex;gap:.5rem;flex-wrap:wrap">
      <input class="form-control" id="busca" placeholder="🔍 Buscar por nome ou substância..." style="width:280px" />
    </div>
    <div style="display:flex;gap:.5rem">
      <button class="btn btn-ghost" id="btn-import">📊 Importar CSV</button>
      <button class="btn btn-primary" id="btn-novo">+ Novo Produto</button>
    </div>
  </div>

  <!-- CSV Import -->
  <div class="card" id="import-panel" style="display:none;margin-bottom:1rem">
    <div class="card-header">
      <span class="card-title">📊 Importar Planilha CSV</span>
      <button class="btn btn-ghost btn-sm" id="btn-close-import">✕ Fechar</button>
    </div>
    <div class="card-body">
      <p style="font-size:.875rem;color:#64748b;margin-bottom:1rem">
        O arquivo CSV deve ter as colunas: <strong>nome, substancia, categoria, quantidade, mes, ano</strong>
      </p>
      <div class="form-group">
        <label class="form-label">Arquivo CSV</label>
        <input class="form-control" type="file" id="csv-file" accept=".csv" />
      </div>
      <div id="csv-preview" style="display:none;margin-top:1rem">
        <div style="font-size:.875rem;font-weight:600;margin-bottom:.5rem" id="csv-count"></div>
        <div class="table-wrap" style="max-height:200px;overflow-y:auto">
          <table id="csv-table">
            <thead><tr><th>Nome</th><th>Substância</th><th>Categoria</th><th>Qtd</th><th>Mês/Ano</th></tr></thead>
            <tbody id="csv-tbody"></tbody>
          </table>
        </div>
      </div>
      <div id="import-error" class="alert alert-danger" style="display:none;margin-top:.75rem"></div>
      <div id="import-success" class="alert alert-success" style="display:none;margin-top:.75rem"></div>
      <div style="margin-top:1rem;display:flex;justify-content:flex-end;gap:.5rem">
        <button class="btn btn-ghost" id="btn-cancel-import">Cancelar</button>
        <button class="btn btn-secondary" id="btn-do-import" disabled>Importar</button>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-body">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Substância</th>
              <th>Categoria</th>
              <th>Quantidade</th>
              <th>Período</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody id="tbody">
            <tr><td colspan="7"><div class="loading"><div class="spinner"></div> Carregando...</div></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div class="modal-backdrop" id="modal" style="display:none">
    <div class="modal">
      <div class="modal-header">
        <span class="modal-title" id="modal-title">Novo Produto</span>
        <button class="modal-close" id="modal-close">✕</button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="prod-id" />
        <div class="form-group">
          <label class="form-label">Nome do Produto *</label>
          <input class="form-control" id="nome" required placeholder="Ex: Dipirona 500mg" />
        </div>
        <div class="form-group">
          <label class="form-label">Substância Ativa</label>
          <input class="form-control" id="substancia" placeholder="Ex: Dipirona Monoidratada" />
        </div>
        <div class="form-group">
          <label class="form-label">Categoria</label>
          <input class="form-control" id="categoria" placeholder="Ex: Analgésico, Antibiótico..." />
        </div>
        <div class="form-group">
          <label class="form-label">Quantidade Vendida</label>
          <input class="form-control" type="number" id="quantidade" min="0" placeholder="0" />
        </div>
        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Mês</label>
            <select class="form-control" id="mes">
              <option value="">Todos</option>
              <option value="1">Janeiro</option><option value="2">Fevereiro</option>
              <option value="3">Março</option><option value="4">Abril</option>
              <option value="5">Maio</option><option value="6">Junho</option>
              <option value="7">Julho</option><option value="8">Agosto</option>
              <option value="9">Setembro</option><option value="10">Outubro</option>
              <option value="11">Novembro</option><option value="12">Dezembro</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Ano</label>
            <input class="form-control" type="number" id="ano" placeholder={String(new Date().getFullYear())} />
          </div>
        </div>
        <div id="form-error" class="alert alert-danger" style="display:none"></div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" id="btn-cancel">Cancelar</button>
        <button class="btn btn-primary" id="btn-save">Salvar</button>
      </div>
    </div>
  </div>
</AdminLayout>

<script>
  import { supabase } from '../../lib/supabase';

  let editingId: string | null = null;
  let allData: any[] = [];
  let csvData: any[] = [];

  const MESES = ['','Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

  async function load() {
    const { data } = await supabase
      .from('produtos_top')
      .select('*')
      .order('quantidade', { ascending: false, nullsFirst: false });
    allData = data ?? [];
    render(allData);
  }

  function render(data: any[]) {
    const tbody = document.getElementById('tbody')!;
    if (data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7"><div class="empty"><div class="empty-icon">💊</div>Nenhum produto cadastrado</div></td></tr>';
      return;
    }
    tbody.innerHTML = data.map((p, i) => `
      <tr>
        <td><strong>#${i + 1}</strong></td>
        <td>${p.nome}</td>
        <td>${p.substancia ?? '—'}</td>
        <td>${p.categoria ?? '—'}</td>
        <td>${p.quantidade ?? '—'}</td>
        <td>${p.mes ? `${MESES[p.mes]}/${p.ano}` : '—'}</td>
        <td style="display:flex;gap:.5rem">
          <button class="btn btn-ghost btn-sm" onclick="openEdit('${p.id}')">✏️</button>
          <button class="btn btn-danger btn-sm" onclick="deleteProd('${p.id}')">🗑️</button>
        </td>
      </tr>
    `).join('');
  }

  // Search
  let searchTimer: ReturnType<typeof setTimeout>;
  document.getElementById('busca')?.addEventListener('input', (e) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      const q = (e.target as HTMLInputElement).value.toLowerCase().trim();
      if (!q) { render(allData); return; }
      render(allData.filter(p =>
        p.nome?.toLowerCase().includes(q) || p.substancia?.toLowerCase().includes(q)
      ));
    }, 200);
  });

  // Modal
  function openModal() { document.getElementById('modal')!.style.display = 'flex'; }
  function closeModal() {
    document.getElementById('modal')!.style.display = 'none';
    document.getElementById('form-error')!.style.display = 'none';
    editingId = null;
    ['nome','substancia','categoria','quantidade','mes','ano'].forEach(id => {
      (document.getElementById(id) as HTMLInputElement).value = '';
    });
  }
  document.getElementById('btn-novo')?.addEventListener('click', () => {
    document.getElementById('modal-title')!.textContent = 'Novo Produto';
    editingId = null;
    openModal();
  });
  document.getElementById('modal-close')?.addEventListener('click', closeModal);
  document.getElementById('btn-cancel')?.addEventListener('click', closeModal);

  (window as any).openEdit = async (id: string) => {
    const { data } = await supabase.from('produtos_top').select('*').eq('id', id).single();
    if (!data) return;
    editingId = id;
    document.getElementById('modal-title')!.textContent = 'Editar Produto';
    (document.getElementById('nome') as HTMLInputElement).value = data.nome;
    (document.getElementById('substancia') as HTMLInputElement).value = data.substancia ?? '';
    (document.getElementById('categoria') as HTMLInputElement).value = data.categoria ?? '';
    (document.getElementById('quantidade') as HTMLInputElement).value = data.quantidade ?? '';
    (document.getElementById('mes') as HTMLSelectElement).value = data.mes ?? '';
    (document.getElementById('ano') as HTMLInputElement).value = data.ano ?? '';
    openModal();
  };

  (window as any).deleteProd = async (id: string) => {
    if (!confirm('Excluir este produto?')) return;
    await supabase.from('produtos_top').delete().eq('id', id);
    load();
  };

  document.getElementById('btn-save')?.addEventListener('click', async () => {
    const nome = (document.getElementById('nome') as HTMLInputElement).value.trim();
    const substancia = (document.getElementById('substancia') as HTMLInputElement).value.trim() || null;
    const categoria = (document.getElementById('categoria') as HTMLInputElement).value.trim() || null;
    const qtd = (document.getElementById('quantidade') as HTMLInputElement).value;
    const quantidade = qtd ? parseInt(qtd) : null;
    const mesVal = (document.getElementById('mes') as HTMLSelectElement).value;
    const mes = mesVal ? parseInt(mesVal) : null;
    const anoVal = (document.getElementById('ano') as HTMLInputElement).value;
    const ano = anoVal ? parseInt(anoVal) : null;
    const errorDiv = document.getElementById('form-error')!;

    if (!nome) { errorDiv.textContent = 'Nome é obrigatório.'; errorDiv.style.display = 'block'; return; }
    errorDiv.style.display = 'none';

    if (editingId) {
      await supabase.from('produtos_top').update({ nome, substancia, categoria, quantidade, mes, ano }).eq('id', editingId);
    } else {
      await supabase.from('produtos_top').insert({ nome, substancia, categoria, quantidade, mes, ano });
    }
    closeModal(); load();
  });

  // CSV Import
  document.getElementById('btn-import')?.addEventListener('click', () => {
    document.getElementById('import-panel')!.style.display = 'block';
  });
  document.getElementById('btn-close-import')?.addEventListener('click', () => {
    document.getElementById('import-panel')!.style.display = 'none';
  });
  document.getElementById('btn-cancel-import')?.addEventListener('click', () => {
    document.getElementById('import-panel')!.style.display = 'none';
  });

  document.getElementById('csv-file')?.addEventListener('change', (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      parseCsv(text);
    };
    reader.readAsText(file, 'UTF-8');
  });

  function parseCsv(text: string) {
    const lines = text.trim().split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length < 2) {
      showImportError('Arquivo vazio ou sem dados.');
      return;
    }
    const headers = lines[0].split(/[,;]/).map(h => h.trim().toLowerCase().replace(/"/g,''));
    const required = ['nome'];
    const missing = required.filter(r => !headers.includes(r));
    if (missing.length > 0) {
      showImportError(`Colunas obrigatórias não encontradas: ${missing.join(', ')}`);
      return;
    }

    csvData = lines.slice(1).map(line => {
      const cols = line.split(/[,;]/).map(c => c.trim().replace(/^"|"$/g, ''));
      const row: any = {};
      headers.forEach((h, i) => { row[h] = cols[i] ?? ''; });
      return {
        nome: row.nome || '',
        substancia: row.substancia || null,
        categoria: row.categoria || null,
        quantidade: row.quantidade ? parseInt(row.quantidade) : null,
        mes: row.mes ? parseInt(row.mes) : null,
        ano: row.ano ? parseInt(row.ano) : null,
      };
    }).filter(r => r.nome);

    const tbody = document.getElementById('csv-tbody')!;
    const MESES_ARR = ['','Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
    tbody.innerHTML = csvData.map(r => `
      <tr>
        <td>${r.nome}</td>
        <td>${r.substancia ?? '—'}</td>
        <td>${r.categoria ?? '—'}</td>
        <td>${r.quantidade ?? '—'}</td>
        <td>${r.mes ? `${MESES_ARR[r.mes]}/${r.ano}` : '—'}</td>
      </tr>
    `).join('');

    document.getElementById('csv-count')!.textContent = `${csvData.length} produto(s) encontrado(s)`;
    document.getElementById('csv-preview')!.style.display = 'block';
    document.getElementById('import-error')!.style.display = 'none';
    (document.getElementById('btn-do-import') as HTMLButtonElement).disabled = csvData.length === 0;
  }

  function showImportError(msg: string) {
    const el = document.getElementById('import-error')!;
    el.textContent = msg;
    el.style.display = 'block';
    document.getElementById('csv-preview')!.style.display = 'none';
    (document.getElementById('btn-do-import') as HTMLButtonElement).disabled = true;
  }

  document.getElementById('btn-do-import')?.addEventListener('click', async () => {
    if (csvData.length === 0) return;
    const btn = document.getElementById('btn-do-import') as HTMLButtonElement;
    btn.disabled = true;
    btn.textContent = 'Importando...';

    const { error } = await supabase.from('produtos_top').insert(csvData);
    if (error) {
      showImportError('Erro ao importar: ' + error.message);
      btn.disabled = false;
      btn.textContent = 'Importar';
    } else {
      document.getElementById('import-success')!.textContent = `${csvData.length} produto(s) importado(s) com sucesso!`;
      document.getElementById('import-success')!.style.display = 'block';
      btn.textContent = 'Importado!';
      csvData = [];
      load();
      setTimeout(() => { document.getElementById('import-panel')!.style.display = 'none'; }, 1500);
    }
  });

  load();
</script>

HEREDOC_SRC_PAGES_ADMIN_PRODUTOS_ASTRO

cat > ".github/workflows/deploy.yml" << 'HEREDOC__GITHUB_WORKFLOWS_DEPLOY_YML'
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm install

      - name: Build
        env:
          PUBLIC_SUPABASE_URL: ${{ secrets.PUBLIC_SUPABASE_URL }}
          PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.PUBLIC_SUPABASE_ANON_KEY }}
        run: npm run build

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4

HEREDOC__GITHUB_WORKFLOWS_DEPLOY_YML

echo ""
echo "=== Instalando dependências ==="
npm install

echo ""
echo "=== Testando build ==="
PUBLIC_SUPABASE_URL=https://placeholder.supabase.co PUBLIC_SUPABASE_ANON_KEY=placeholder npm run build

echo ""
echo "=== Fazendo commit e push ==="
git add .
git commit -m "feat: MVP dashboard de gestão de equipe

- Dashboard público: metas, vendas, folgas, aniversários, top produtos
- Painel admin com CRUD completo
- Import de planilha CSV para top produtos
- Deploy automático para GitHub Pages via Actions
- Schema SQL com RLS para Supabase"

git push -u origin main

echo ""
echo "=== CONCLUÍDO! ==="
echo "Acesse: https://gilsonbs.github.io/gestao-equipe/"

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Monta um link respeitando o `base` (GitHub Pages em subpasta). */
export const url = (p = '/') => `${BASE}${p.startsWith('/') ? p : `/${p}`}`;

const TZ = 'America/Sao_Paulo';

/** Datas só com dia (ex.: 2026-11-20) chegam como meia-noite UTC; mostra o dia escrito, sem voltar um por causa do fuso. */
const fuso = (d: Date) =>
  d.getUTCHours() === 0 && d.getUTCMinutes() === 0 && d.getUTCSeconds() === 0 ? 'UTC' : TZ;

export const fmtData = (d: Date | string, opts: Intl.DateTimeFormatOptions = {}) => {
  const data = new Date(d);
  return data.toLocaleDateString('pt-BR', { timeZone: fuso(data), day: '2-digit', month: 'short', year: 'numeric', ...opts });
};

export const fmtDataLonga = (d: Date | string) =>
  new Date(d).toLocaleDateString('pt-BR', { timeZone: TZ, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

export const diasDesde = (d: Date | string, agora = new Date()) =>
  Math.floor((agora.getTime() - new Date(d).getTime()) / 86_400_000);

export const STATUS = {
  valida: { rotulo: 'Auditada', descricao: 'Testada e aprovada no patch atual' },
  revisar: { rotulo: 'Em revisão', descricao: 'Um patch mexeu em algo da build; está sendo testada de novo' },
  desatualizada: { rotulo: 'Vencida', descricao: 'Não funciona mais como foi escrita' },
} as const;
export type StatusBuild = keyof typeof STATUS;

export const TIPO_PATCH = {
  major: 'Update grande',
  balance: 'Balanceamento',
  minor: 'Update menor',
  ranked: 'Ranqueado',
  hotfix: 'Hotfix',
} as const;

export const TIPO_ITEM = { arma: 'Arma', vitalidade: 'Vitalidade', espirito: 'Espírito' } as const;

export const iniciais = (nome: string) =>
  nome
    .replace(/^The\s+/i, '')
    .split(/[\s&]+/)
    .filter(Boolean)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

export const slugHeroi = (nome: string) =>
  nome.toLowerCase().normalize('NFD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

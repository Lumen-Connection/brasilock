import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const item = z.object({
  nome: z.string(),
  tipo: z.enum(['arma', 'vitalidade', 'espirito']),
  nota: z.string().optional(),
});

/** Builds de herói. Um arquivo .md por build em src/content/builds. */
const builds = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/builds' }),
  schema: z.object({
    titulo: z.string(),
    heroi: z.string(),
    papel: z.enum(['Carry', 'Suporte', 'Tanque', 'Iniciador', 'Assassino']),
    estilo: z.enum(['Arma', 'Espírito', 'Híbrido']),
    dificuldade: z.number().int().min(1).max(3),
    autor: z.string(),
    auditor: z.string(),
    auditadaEm: z.coerce.date(),
    patch: z.string(),
    status: z.enum(['valida', 'revisar', 'desatualizada']),
    veredito: z.string(),
    codigoBuild: z.string().optional(),
    exemplo: z.boolean().default(false),
    prioridade: z.array(z.string()),
    fases: z.array(z.object({ nome: z.string(), itens: z.array(item) })),
  }),
});

/** Updates do jogo. Um arquivo .md por patch em src/content/patches. */
const patches = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/patches' }),
  schema: z.object({
    titulo: z.string(),
    data: z.coerce.date(),
    tipo: z.enum(['major', 'balance', 'minor', 'ranked', 'hotfix']),
    resumo: z.string(),
    destaques: z.array(z.string()).default([]),
    sobe: z.array(z.string()).default([]),
    desce: z.array(z.string()).default([]),
    fontes: z.array(z.object({ nome: z.string(), url: z.string().url() })).default([]),
  }),
});

export const collections = { builds, patches };

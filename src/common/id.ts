import { z } from 'zod';

export const Id = z.string().regex(/^[0-9a-f]{64}$/);
export type Id = z.infer<typeof Id>;

export const Address = z.string().regex(/^[0-9a-f]{64}$/);
export type Address = z.infer<typeof Address>;

export const Nonce = z.string().regex(/^[0-9a-f]{1,64}$/);
export type Nonce = z.infer<typeof Nonce>;

export const Signature = z.string().regex(/^[0-9a-f]{128}$/);
export type Signature = z.infer<typeof Signature>;

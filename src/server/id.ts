import blake2 from 'blake2';
import { canonicalize } from 'json-canonicalize';

export function hash(string: string) {
  const hash = blake2.createHash('blake2s');
  hash.update(Buffer.from(string));
  const hashHex = hash.digest('hex');

  return hashHex;
}

export function objectToId(object: unknown): string {
  return hash(canonicalize(object));
}

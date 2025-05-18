export * from './env';
export { default as makeEnvPublic } from './make-env-public';
export { default as makeEnvFilePublic } from './make-env-file-public';

declare global {
  interface Window {
    __ENV: Record<string, unknown>;
  }
}
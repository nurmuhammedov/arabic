/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
  readonly VITE_IS_DEV: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

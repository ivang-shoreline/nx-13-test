declare global {
  interface Window {
    __remotes__: Record<string, string>;
  }

  declare const __webpack_init_sharing__: any;
  declare const __webpack_share_scopes__: any;
}

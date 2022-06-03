export type Script = {
  src: string;
  scriptName: string;
};

export type ManifestPkg = {
  pkg: string;
};

export type ManifestPkgBundle = ManifestPkg & Script;

export interface ServerToClientEvents {
  updateManifestPkg: (
    bundle: ManifestPkgBundle,
    callback: (success: boolean) => void
  ) => void;
}

export interface ClientToServerEvents {
  sendManifestScripts: (
    callback: (bundles: ManifestPkgBundle[]) => void
  ) => void;
}

export interface InterServerEvents {}

export interface SocketData {}

export type Cache = {
  [pkg: string]: {
    // filepath is relative to manifest directory in pkg
    [filepath: string]: { timestamp: Date };
  };
};

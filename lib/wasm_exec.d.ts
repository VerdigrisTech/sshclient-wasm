declare class Go {
  constructor();
  importObject: WebAssembly.Imports;
  run(instance: WebAssembly.Instance): Promise<void>;
}

interface Window {
  Go: typeof Go;
  SSHClient: any;
}

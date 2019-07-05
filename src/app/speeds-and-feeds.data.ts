// http://www.harveytool.com/cms/GeneralMachiningGuidelines_17.aspx

export interface SpeedsAndFeedsLookup {
  [toolName: string]: LookupEntry;
}

export interface LookupEntry {
  name: string;
  surfaceFeetPerMinute: {
    conservative: number;
    aggressive: number;
  };
  chipLoad: {
    [diameter: number]: number;
  };
}

export const speedsAndFeedsLookup: SpeedsAndFeedsLookup = {
  '440 Aluminum': {
    name: '440 Aluminum',
    surfaceFeetPerMinute: {
      conservative: 500,
      aggressive: 1000
    },
    chipLoad: {
      0.0125: 0.001,
      0.25: 0.002,
      0.5: 0.005,
      0.75: 0.006,
      1: 0.007
    }
  },
  '356 Aluminum': {
    name: '356 Aluminum',
    surfaceFeetPerMinute: {
      conservative: 5040,
      aggressive: 1000
    },
    chipLoad: {
      0.0125: 0.001,
      0.25: 0.002,
      0.5: 0.005,
      0.75: 0.006,
      1: 0.007
    }
  }
};

// http://www.harveytool.com/cms/GeneralMachiningGuidelines_17.aspx

export const feedsAndSpeeds = [
  {
    materialGroup: 'Aluminum',
    materials: [
      {
        name: '440',
        sfm: {
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
      {
        name: '356',
        sfm: {
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
      {
        name: '380',
        sfm: {
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
      }
    ]
  },
  {
    materialGroup: 'Copper',
    materials: [
      {
        name: 'Navel Brass',
        sfm: {
          conservative: 300,
          aggressive: 800
        },
        chipLoad: {
          0.0125: 0.001,
          0.25: 0.002,
          0.5: 0.005,
          0.75: 0.006,
          1: 0.007
        }
      },
      {
        name: 'High Silicon Bronze',
        sfm: {
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
      {
        name: 'A-17',
        sfm: {
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
      }
    ]
  }
];

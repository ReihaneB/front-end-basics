const kebabCase = string => string.replace(/[.\s]/g, '-').toLowerCase();

const nearestComponentImageshotPathFormatter = ({ story, parameters, configurationName }) => {
  const fileDir = parameters.fileName.substring(0, parameters.fileName.lastIndexOf('/'));
  const imageshotDir = `${fileDir}/__imageshots`;

  return `${imageshotDir}/${kebabCase(`${configurationName} ${story}`)}`;
};

module.exports = {
  configurations: {
    'chrome.desktopwide': {
      target: 'chrome.docker',
      width: 1600,
      height: 1400,
      deviceScaleFactor: 2,
      mobile: false,
    },
    'chrome.desktop': {
      target: 'chrome.docker',
      width: 1200,
      height: 1400,
      deviceScaleFactor: 2,
      mobile: false,
    },
    'chrome.ipad10p': {
      target: 'chrome.docker',
      width: 834,
      height: 1112,
      deviceScaleFactor: 2,
      mobile: true,
    },
    'chrome.ipad': {
      target: 'chrome.docker',
      width: 768,
      height: 1024,
      deviceScaleFactor: 2,
      mobile: true,
    },
    'chrome.iphonexr': {
      target: 'chrome.docker',
      width: 414,
      height: 896,
      deviceScaleFactor: 2,
      mobile: true,
    },
    'chrome.iphone8p': {
      target: 'chrome.docker',
      width: 414,
      height: 736,
      deviceScaleFactor: 2,
      mobile: true,
    },
    'chrome.iphone6': {
      target: 'chrome.docker',
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      mobile: true,
    },
    'chrome.iphone5': {
      target: 'chrome.docker',
      width: 320,
      height: 568,
      deviceScaleFactor: 2,
      mobile: true,
    },
  },
  chromeTolerance: 0,
  chromeSelector: '#storybook-root > *',
  fileNameFormatter: ({ story, parameters, configurationName }) => (
    nearestComponentImageshotPathFormatter({ story, parameters, configurationName })
  ),
};

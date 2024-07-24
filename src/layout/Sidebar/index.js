// [
//     {
//         "name": "Overview",
//         "icon": "../assets/icons/overview.svg",
//         "url": "/"
//     },
//     {
//         "name": "Risk Management",
//         "icon": "../assets/icons/vulnerability.svg",
//         "url": "/"
//     },
//     {
//         "name": "Assets Management",
//         "icon": "../assets/icons/assets.svg",
//         "url": "/"
//     },
//     {
//         "name":"Vulnerability Management",
//         "icon":"../assets/icons/vulnerabilities.svg",
//         "url":"/"
//     },
//     {
//         "name":"File Analysis",
//         "icon":"../assets/icons/fileAnalysis.svg"
//     },
//     {
//         "name":"Log Management",
//         "icon":"../assets/icons/log.svg",
//         "url":"/"
//     }
// ]

import OverviewIcon from './icons/overview.svg';
import RiskManagementIcon from './icons/vulnerability.svg';
import AssetsManagementIcon from './icons/assets.svg';
import VulnerabilityManagementIcon from './icons/vulnerabilities.svg';
import FileAnalysisIcon from './icons/fileAnalysis.svg';
import LogManagementIcon from './icons/log.svg';

const icons = {
  Overview: OverviewIcon,
  "Risk Management": RiskManagementIcon,
  "Assets Management": AssetsManagementIcon,
  "Vulnerability Management": VulnerabilityManagementIcon,
  "File Analysis": FileAnalysisIcon,
  "Log Management": LogManagementIcon,
};

export const data = [
  {
    name: "Overview",
    icon: OverviewIcon,
    url: "/"
  },
  {
    name: "Risk Management",
    icon: RiskManagementIcon,
    url: "/"
  },
  {
    name: "Assets Management",
    icon: AssetsManagementIcon,
    url: "/"
  },
  {
    name: "Vulnerability Management",
    icon: VulnerabilityManagementIcon,
    url: "/"
  },
  {
    name: "File Analysis",
    icon: FileAnalysisIcon,
    url: "/"
  },
  {
    name: "Log Management",
    icon: LogManagementIcon,
    url: "/"
  }
];
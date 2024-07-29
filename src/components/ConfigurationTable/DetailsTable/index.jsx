import React, { useState } from 'react';
import styles from "./index.module.css";
import { ICON } from '../../../utils/icon';

const DetailsTable = () => {
    const alertData = [
        {
            id: 1087,
            elasticId: "ingest-logs-prod-alert+0+507",
            elasticIndex: "ingest-logs-prod-alert",
            sourceIp: "89.248.163.200",
            destinationIp: "172.26.234.88",
            sourcePort: 40652,
            destinationPort: 80,
            severity: 2,
            category: "Misc Attack",
            signature: "Poor Reputation IP group 16",
            origin: "NIDS",
            timestamp: "2024-07-22T09:45:51.491Z",
            alertState: 2,
            alertStateName: "Escalated with CaseId",
            intel: "sd",
            remarks: "testing remarks",
            timeout: "2024-07-22T14:24:40.890Z",
            hashValue: "64cfb6db46075699f6a63b47169107aa1d79e2e28579fe5e5d40fd0ea44c92a0",
            iocs: {
                domains: ["dsdsd"],
                ips: ["ds"],
                urls: ["dd"]
            },
            pcapLink: "https://172.26.234.125:5000/pcaps/2111952249939086.pcap",
            tactic: "Reconnaissance",
            technique: "T1595 - Active Scanning",
            controls: "SC-4 (Prevent unauthorized and unintended information transfer)",
            whois: "http://whois.domaintools.com/89.248.163.200",
            asn: "AS202425 ip volume inc",
            countryName: "United Kingdom of Great Britain and Northern Ireland",
            assetid: "NA",
            createdAt: "2024-07-22T10:24:40.893Z",
            updatedAt: "2024-07-25T11:44:51.623Z"
        },
        {
            id: 1097,
            elasticId: "ingest-logs-prod-alert+0+517",
            elasticIndex: "ingest-logs-prod-alert",
            sourceIp: "83.97.73.245",
            destinationIp: "172.26.234.86",
            sourcePort: 53866,
            destinationPort: 80,
            severity: 2,
            category: "Misc Attack",
            signature: "DROP Spamhaus DROP Listed Traffic Inbound group 9",
            origin: "NIDS",
            timestamp: "2024-07-22T13:20:22.368Z",
            alertState: 2,
            alertStateName: "Escalated with CaseId",
            intel: "intell",
            remarks: "sadfasdf",
            timeout: "2024-07-23T09:27:42.158Z",
            hashValue: "c5cae4396e6bda8daaf34a76a4de9eebc08c96074571f507be176b2dcb4fd0c8",
            iocs: {
                domains: ["sdfsdf", "sdf", "sdfsadf"],
                ips: ["asdflkjlj", "werfdsf"],
                urls: ["wersdfsdfw"]
            },
            file_hashes: ["asdfwefwef", "arwefs"],
            pcapLink: "https://172.26.234.125:5000/pcaps/1864854323460606.pcap",
            tactic: "Reconnaissance",
            technique: "T1595 - Active Scanning",
            controls: "SC-4 (Prevent unauthorized and unintended information transfer)",
            whois: "http://whois.domaintools.com/83.97.73.245",
            asn: "ASNone",
            countryName: "Germany",
            assetid: "NA",
            createdAt: "2024-07-23T05:27:42.159Z",
            updatedAt: "2024-07-25T11:44:47.584Z"
        }
    ];

    const [expanded, setExpanded] = useState(null);

    const handleToggle = (id) => {
        setExpanded(expanded === id ? null : id);
    };

    const formatValue = (value) => {
        if (Array.isArray(value)) {
            return value.join(", ");
        }
        if (typeof value === "object" && value !== null) {
            // Convert object to a string representation
            return Object.entries(value)
                .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(", ") : val}`)
                .join("; ");
        }
        return value;
    };

    return (
        <div className={styles.container}>
            <table className={styles.mainTable}>
                <thead>
                    <tr>
                        <th>SNO</th>
                        <th>Title</th>
                        <th>Result & Expand</th>
                    </tr>
                </thead>
                <tbody>
                    {alertData.map((alert, index) => (
                        <React.Fragment key={alert.id}>
                            <tr>
                                <td>{index + 1}</td>
                                <td>{alert.signature}</td>
                                <td>
                                    <button
                                        className={styles.expandButton}
                                        onClick={() => handleToggle(alert.id)}
                                    >
                                        {expanded === alert.id ? 'Hide' : 'Show Details'}
                                    </button>
                                </td>
                            </tr>
                            {expanded === alert.id && (
                                <tr>
                                    <td colSpan="3">
                                        <table className={styles.detailsTable}>
                                            <thead>
                                                <tr>
                                                    <th>Field</th>
                                                    <th>Value</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Object.entries(alert).map(([key, value]) => (
                                                    <tr key={key}>
                                                        <td>{key}</td>
                                                        <td className={styles.valueCell}>
                                                            {formatValue(value)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DetailsTable;

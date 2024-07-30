import React, { useState } from 'react';
import styles from "./index.module.css";
import { ICON } from '../../../utils/icon';
import Utils from '../../../utils';

const DetailsTable = ({data}) => {
  
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
                        <th>Result</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.details?.map((item, index) => (
                        <React.Fragment key={alert.id}>
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.title}</td>
                                <td>{item.result}</td>
                                <td>
                                    <button
                                        className={styles.expandButton}
                                        onClick={() => handleToggle(item.id)}
                                    >
                                        {expanded === item.id ? 'Hide' : 'Show Details'}
                                    </button>
                                </td>
                            </tr>
                            {expanded === item.id && (
                                <tr>
                                    <td className={styles.expended_row} colSpan="4">
                                        <table className={styles.detailsTable}>
                                            {/* <thead>
                                                <tr>
                                                    <th>Field</th>
                                                    <th>Value</th>
                                                </tr>
                                            </thead> */}
                                            <tbody>
                                                {/* {Object.entries(item).map(([key, value]) => (
                                                    <tr key={key}>
                                                        <td>{key}</td>
                                                        <td className={styles.valueCell}>
                                                            {formatValue(value)}
                                                        </td>
                                                    </tr>
                                                ))} */}
                                                {Utils.renderJson(item)}
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

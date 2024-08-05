import React, { useState, useEffect, useMemo } from 'react';
import styles from './Compliance.module.css';
import { useCompliance } from '../../context/ComplianceContext';
import Table from '../../components/Table/Table';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import GaugeChartComponent from './GaugeChart'
// Register chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

function Compliance() {
  const { complianceList, fetchComplianceList } = useCompliance();
  const [selectedTab, setSelectedTab] = useState('Positive findings');
  const [averageScore, setAverageScore] = useState(0);

  useEffect(() => {
    fetchComplianceList();
  }, [fetchComplianceList]);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };


  const calculateAverageSimilarityScore = (data) => {
    if (!data || data.length === 0) return 0;
    const similarityScores = data.map(item => item.similarity_score || 0);
    const sum = similarityScores.reduce((acc, score) => acc + score, 0);
    const average = sum / similarityScores.length;
    //console.log("Average Similarity Score:", average);
    return Math.round(average * 100); // Multiply by 100 and round to integer
  };

  useEffect(() => {
    setAverageScore(calculateAverageSimilarityScore(complianceList));
  }, [complianceList]);



  const getTableData = (data) => {
    return {
      title: "Compliance Table",
      rows: data?.map((item, index) => {
        return {
          Id: { key: "_id", value: index + 1, type: "hidden" },
          "Section (CERT-In)": {
            key: "section(CERT-In)",
            value: item["section(CERT-In)"],
          },
          "Policy (CERT-In)": {
            key: "policy(CERT-In)",
            value: item["policy(CERT-In)"],
          },
          "Similarity Score": {
            key: "similarity_score",
            value: item.similarity_score,
          },
          "Section (MbPA-CCMP)": {
            key: "section(MbPA-CCMP)",
            value: item["section(MbPA-CCMP)"],
          },
          "Policy (MbPA-CCMP)": {
            key: "policy(MbPA-CCMP)",
            value: item["policy(MbPA-CCMP)"],
          },
          Conformity: {
            type: "hidden",
            key: "conformity",
            value: item.conformity,
          },
        };
      }),
      searchUrl: "/assetsTable.json",
      exportDataUrl: false,
      printUrl: false,
      paginationUrl: false,
      totalPage: data?.totalPages,
      totalItemCount: data?.totalItems,
      autoSuggestionUrl: "/assetsTable.json",
      initialSort: "inventoryId",
      getTableData: getTableData,
    };
  };

  // Count conformity values from filtered data
  const countConformity = (data) => {
    const counts = {
      'Positive findings': 0,
      'Major non-conformity': 0,
      'Minor non-conformity': 0
    };
    data.forEach(item => {
      if (counts[item.conformity] !== undefined) {
        counts[item.conformity]++;
      }
    });
    return counts;
  };

  // Filter complianceList based on selectedTab
  const filteredData = useMemo(() => {
    return complianceList.filter(item => item.conformity === selectedTab);
  }, [complianceList, selectedTab]);

  // Count conformity values from filtered data
  const conformityCounts = useMemo(() => countConformity(complianceList), [complianceList]);

  // Data for the doughnut chart
  const chartData = {
    labels: Object.keys(conformityCounts),
    datasets: [{
      label: 'Conformity Counts',
      data: Object.values(conformityCounts),
      backgroundColor: [
        'rgb(255, 99, 132)', // Red
        'rgb(54, 162, 235)', // Blue
        'rgb(255, 205, 86)'  // Yellow
      ],
      hoverOffset: 4
    }]
  };

  // Generate table data
  const tableData = useMemo(() => getTableData(filteredData), [filteredData]);

  return (
    <div className={styles.container}>
    <div className={styles.leftPanel}>
      <div className={styles.field}>
        <label htmlFor="fileUpload" className={styles.label}>Upload Policy:</label>
        <input type="file" id="fileUpload" className={styles.fileInput} />
      </div>
      <div className={styles.field}>
        <label htmlFor="policySelect" className={styles.label}>Select Policy to Compare With:</label>
        <select id="policySelect" className={styles.dropdown}>
          <option value="">--Select Policy--</option>
          <option value="">--Select Policy--</option>
          <option value="">--Select Policy--</option>
          <option value="">--Select Policy--</option>
          <option value="">--Select Policy--</option>
          <option value="">--Select Policy--</option>
        </select>
      </div>
      <div className={styles.dotnut_chart}>
        <Doughnut data={chartData} />
      </div>
      <div className={styles.chart_container}>
      <GaugeChartComponent 
        value={averageScore} 
      />
      </div>
    </div>
      <div className={styles.rightPanel}>
        <div className={styles.nav}>
          <div className={styles.tabs}>
            {['Positive findings', 'Major non-conformity', 'Minor non-conformity'].map(tab => (
              <a
                key={tab}
                className={`${styles.tab} ${selectedTab === tab ? styles.activeTab : ''}`}
                onClick={() => handleTabClick(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, ' $1')}
              </a>
            ))}
          </div>
        </div>
        <div className={styles.Compliance_table}>
        <Table tableData={tableData} />
        </div>
      </div>
    </div>
  );
}

export default Compliance;

import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { SecurityEvent } from '@/types/security';

export const exportService = {
  exportToExcel: (events: SecurityEvent[], filename = 'security-events.xlsx') => {
    const data = events.map(event => ({
      ID: event.id,
      Title: event.title,
      Description: event.description,
      Severity: event.severity.toUpperCase(),
      Source: event.source.toUpperCase(),
      Status: event.status,
      Category: event.category,
      'Affected Assets': event.affectedAssets.join(', '),
      'Affected Hosts': event.affectedHosts.join(', '),
      'Affected IPs': event.affectedIPs.join(', '),
      Tags: event.tags.join(', '),
      Timestamp: new Date(event.timestamp).toLocaleString()
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    
    const columnWidths = [
      { wch: 10 },  // ID
      { wch: 40 },  // Title
      { wch: 50 },  // Description
      { wch: 12 },  // Severity
      { wch: 15 },  // Source
      { wch: 15 },  // Status
      { wch: 20 },  // Category
      { wch: 30 },  // Affected Assets
      { wch: 40 },  // Affected Hosts
      { wch: 30 },  // Affected IPs
      { wch: 30 },  // Tags
      { wch: 20 }   // Timestamp
    ];
    worksheet['!cols'] = columnWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Security Events');

    XLSX.writeFile(workbook, filename);
  },

  exportToPDF: (events: SecurityEvent[], filename = 'security-events.pdf') => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('SOC Security Dashboard Report', 14, 20);
    
    doc.setFontSize(11);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 28);
    doc.text(`Total Events: ${events.length}`, 14, 34);

    const criticalCount = events.filter(e => e.severity === 'critical').length;
    const highCount = events.filter(e => e.severity === 'high').length;
    const mediumCount = events.filter(e => e.severity === 'medium').length;
    
    doc.text(`Critical: ${criticalCount} | High: ${highCount} | Medium: ${mediumCount}`, 14, 40);

    const tableData = events.map(event => [
      event.id,
      event.title.substring(0, 30) + (event.title.length > 30 ? '...' : ''),
      event.severity.toUpperCase(),
      event.source.toUpperCase(),
      event.status,
      `${event.affectedHosts.length} hosts`,
      `${event.affectedIPs.length} IPs`,
      new Date(event.timestamp).toLocaleDateString()
    ]);

    autoTable(doc, {
      head: [['ID', 'Title', 'Severity', 'Source', 'Status', 'Hosts', 'IPs', 'Date']],
      body: tableData,
      startY: 48,
      styles: { fontSize: 7 },
      headStyles: { fillColor: [30, 58, 138] },
      columnStyles: {
        0: { cellWidth: 12 },
        1: { cellWidth: 50 },
        2: { cellWidth: 20 },
        3: { cellWidth: 25 },
        4: { cellWidth: 20 },
        5: { cellWidth: 18 },
        6: { cellWidth: 15 },
        7: { cellWidth: 20 }
      },
      didParseCell: (data) => {
        if (data.section === 'body' && data.column.index === 2) {
          const severity = data.cell.text[0]?.toLowerCase();
          if (severity === 'critical') {
            data.cell.styles.textColor = [220, 38, 38];
            data.cell.styles.fontStyle = 'bold';
          } else if (severity === 'high') {
            data.cell.styles.textColor = [245, 158, 11];
            data.cell.styles.fontStyle = 'bold';
          }
        }
      }
    });

    doc.save(filename);
  }
};

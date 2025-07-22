import jsPDF from 'jspdf';
import { SkillMatch } from '../types';

export function generatePDFReport(
  resumeContent: string,
  jobDescription: string,
  results: SkillMatch
): void {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.width;
  const margin = 20;
  let yPosition = 30;
  
  // Title
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Resume Match Analysis Report', margin, yPosition);
  yPosition += 20;
  
  // Date
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, margin, yPosition);
  yPosition += 20;
  
  // Match Score
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text(`Overall Match Score: ${results.score}%`, margin, yPosition);
  yPosition += 15;
  
  // Summary
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  const summaryText = `Skills Matched: ${results.matched.length} | Skills Missing: ${results.missing.length} | Total Job Skills: ${results.jobSkills.length}`;
  pdf.text(summaryText, margin, yPosition);
  yPosition += 25;
  
  // Matched Skills
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('✓ Matched Skills:', margin, yPosition);
  yPosition += 10;
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  results.matched.forEach(skill => {
    if (yPosition > 280) {
      pdf.addPage();
      yPosition = 30;
    }
    pdf.text(`• ${skill}`, margin + 10, yPosition);
    yPosition += 8;
  });
  
  yPosition += 10;
  
  // Missing Skills
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('✗ Missing Skills:', margin, yPosition);
  yPosition += 10;
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  results.missing.forEach(skill => {
    if (yPosition > 280) {
      pdf.addPage();
      yPosition = 30;
    }
    pdf.text(`• ${skill}`, margin + 10, yPosition);
    yPosition += 8;
  });
  
  // Add new page for full details if needed
  if (yPosition > 200) {
    pdf.addPage();
    yPosition = 30;
  } else {
    yPosition += 20;
  }
  
  // Resume Skills
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('All Resume Skills:', margin, yPosition);
  yPosition += 10;
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  results.resumeSkills.forEach(skill => {
    if (yPosition > 280) {
      pdf.addPage();
      yPosition = 30;
    }
    pdf.text(`• ${skill}`, margin + 10, yPosition);
    yPosition += 8;
  });
  
  // Download the PDF
  pdf.save('resume-match-report.pdf');
}
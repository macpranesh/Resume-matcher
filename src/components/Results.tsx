import React from 'react';
import { Download, CheckCircle, XCircle, FileText, Briefcase } from 'lucide-react';
import { SkillMatch } from '../types';
import { SkillTag } from './SkillTag';
import { generatePDFReport } from '../utils/pdfGenerator';

interface ResultsProps {
  results: SkillMatch;
  resumeContent: string;
  jobDescription: string;
}

export function Results({ results, resumeContent, jobDescription }: ResultsProps) {
  const handleDownloadReport = () => {
    generatePDFReport(resumeContent, jobDescription, results);
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 70) return 'bg-green-100';
    if (score >= 50) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Match Score */}
      <div className={`p-6 rounded-lg ${getScoreBackground(results.score)} border`}>
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Match Score</h3>
          <div className={`text-4xl font-bold ${getScoreColor(results.score)}`}>
            {results.score}%
          </div>
          <p className="text-gray-600 mt-2">
            {results.matched.length} out of {results.jobSkills.length} required skills found
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-800">Matched Skills</span>
          </div>
          <div className="text-2xl font-bold text-green-600">{results.matched.length}</div>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="flex items-center space-x-2">
            <XCircle className="w-5 h-5 text-red-600" />
            <span className="font-medium text-red-800">Missing Skills</span>
          </div>
          <div className="text-2xl font-bold text-red-600">{results.missing.length}</div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-800">Resume Skills</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">{results.resumeSkills.length}</div>
        </div>
      </div>

      {/* Skills Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Matched Skills */}
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h4 className="font-semibold text-green-700 mb-3 flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Matched Skills ({results.matched.length})</span>
          </h4>
          <div className="flex flex-wrap">
            {results.matched.length > 0 ? (
              results.matched.map((skill, index) => (
                <SkillTag key={index} skill={skill} type="matched" />
              ))
            ) : (
              <p className="text-gray-500 italic">No matched skills found</p>
            )}
          </div>
        </div>

        {/* Missing Skills */}
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h4 className="font-semibold text-red-700 mb-3 flex items-center space-x-2">
            <XCircle className="w-5 h-5" />
            <span>Missing Skills ({results.missing.length})</span>
          </h4>
          <div className="flex flex-wrap">
            {results.missing.length > 0 ? (
              results.missing.map((skill, index) => (
                <SkillTag key={index} skill={skill} type="missing" />
              ))
            ) : (
              <p className="text-gray-500 italic">No missing skills - perfect match!</p>
            )}
          </div>
        </div>

        {/* All Resume Skills */}
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h4 className="font-semibold text-blue-700 mb-3 flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>All Resume Skills ({results.resumeSkills.length})</span>
          </h4>
          <div className="flex flex-wrap">
            {results.resumeSkills.length > 0 ? (
              results.resumeSkills.map((skill, index) => (
                <SkillTag key={index} skill={skill} type="resume" />
              ))
            ) : (
              <p className="text-gray-500 italic">No skills found in resume</p>
            )}
          </div>
        </div>

        {/* All Job Skills */}
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h4 className="font-semibold text-purple-700 mb-3 flex items-center space-x-2">
            <Briefcase className="w-5 h-5" />
            <span>Job Requirements ({results.jobSkills.length})</span>
          </h4>
          <div className="flex flex-wrap">
            {results.jobSkills.length > 0 ? (
              results.jobSkills.map((skill, index) => (
                <SkillTag key={index} skill={skill} type="job" />
              ))
            ) : (
              <p className="text-gray-500 italic">No skills found in job description</p>
            )}
          </div>
        </div>
      </div>

      {/* Download Report */}
      <div className="text-center">
        <button
          onClick={handleDownloadReport}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center space-x-2 mx-auto"
        >
          <Download className="w-5 h-5" />
          <span>Download PDF Report</span>
        </button>
      </div>
    </div>
  );
}
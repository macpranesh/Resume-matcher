import React, { useState } from 'react';
import { FileText, Briefcase, Zap, Loader2 } from 'lucide-react';
import { FileUpload } from './components/FileUpload';
import { Results } from './components/Results';
import { readFileContent } from './utils/fileProcessor';
import { extractSkills, calculateMatchScore } from './utils/textProcessor';
import { SkillMatch, FileUpload as FileUploadType } from './types';

function App() {
  const [resumeFile, setResumeFile] = useState<FileUploadType>({ file: null, content: '' });
  const [jobDescription, setJobDescription] = useState('');
  const [results, setResults] = useState<SkillMatch | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = async (file: File) => {
    setIsLoading(true);
    try {
      const content = await readFileContent(file);
      setResumeFile({ file, content });
    } catch (error) {
      console.error('Error reading file:', error);
      alert('Error reading file. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!resumeFile.content || !jobDescription.trim()) {
      alert('Please upload a resume and enter a job description.');
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const resumeSkills = extractSkills(resumeFile.content);
      const jobSkills = extractSkills(jobDescription);
      const matchResult = calculateMatchScore(resumeSkills, jobSkills);
      
      setResults({
        ...matchResult,
        resumeSkills,
        jobSkills
      });
    } catch (error) {
      console.error('Error analyzing resume:', error);
      alert('Error analyzing resume. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setResumeFile({ file: null, content: '' });
    setJobDescription('');
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Resume Matcher</h1>
              <p className="text-gray-600">Analyze your resume against job requirements</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {!results ? (
          <div className="space-y-8">
            {/* Upload Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <FileText className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Upload Resume</h2>
              </div>
              
              <FileUpload
                onFileSelect={handleFileSelect}
                isLoading={isLoading}
                fileName={resumeFile.file?.name}
              />
              
              {isLoading && (
                <div className="mt-4 flex items-center justify-center space-x-2 text-blue-600">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing file...</span>
                </div>
              )}
            </div>

            {/* Job Description Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Briefcase className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-semibold text-gray-900">Job Description</h2>
              </div>
              
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here. Include required skills, qualifications, and responsibilities..."
                className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                disabled={isProcessing}
              />
            </div>

            {/* Analyze Button */}
            <div className="text-center">
              <button
                onClick={handleAnalyze}
                disabled={!resumeFile.content || !jobDescription.trim() || isProcessing}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 flex items-center space-x-3 mx-auto disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing Resume...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    <span>Scan & Match Resume</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Results Header */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Analysis Complete!</h2>
              <p className="text-gray-600">Here's how your resume matches the job requirements</p>
            </div>

            {/* Results */}
            <Results
              results={results}
              resumeContent={resumeFile.content}
              jobDescription={jobDescription}
            />

            {/* Reset Button */}
            <div className="text-center">
              <button
                onClick={handleReset}
                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Analyze Another Resume
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="max-w-4xl mx-auto px-6 text-center text-gray-500 text-sm">
          <p>Upload your resume and job description to get instant compatibility analysis</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
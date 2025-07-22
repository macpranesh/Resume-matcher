import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
  fileName?: string;
}

export function FileUpload({ onFileSelect, isLoading, fileName }: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf']
    },
    multiple: false,
    disabled: isLoading
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
          ${fileName ? 'bg-green-50 border-green-400' : ''}`}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center space-y-4">
          {fileName ? (
            <>
              <FileText className="w-12 h-12 text-green-500" />
              <div className="text-green-700">
                <p className="font-medium">File uploaded successfully!</p>
                <p className="text-sm">{fileName}</p>
              </div>
            </>
          ) : (
            <>
              <Upload className="w-12 h-12 text-gray-400" />
              <div className="text-gray-600">
                {isDragActive ? (
                  <p>Drop the resume file here...</p>
                ) : (
                  <div>
                    <p className="font-medium">Click to upload or drag and drop</p>
                    <p className="text-sm">Supports .txt and .pdf files</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {fileRejections.length > 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2 text-red-700">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">
              {fileRejections[0].errors[0].message}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
export async function readFileContent(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const result = event.target?.result as string;
      
      if (file.type === 'application/pdf') {
        // For PDF files, we'll extract text using a simple approach
        // In a production app, you'd use a proper PDF parsing library
        resolve(extractTextFromPDF(result));
      } else {
        resolve(result);
      }
    };
    
    reader.onerror = () => reject(new Error('Error reading file'));
    
    if (file.type === 'application/pdf') {
      reader.readAsArrayBuffer(file);
    } else {
      reader.readAsText(file);
    }
  });
}

function extractTextFromPDF(arrayBuffer: string): string {
  // Simplified PDF text extraction
  // In production, use libraries like pdf-parse or PDF.js
  try {
    // Convert ArrayBuffer to string and extract readable text
    const uint8Array = new Uint8Array(arrayBuffer as unknown as ArrayBuffer);
    let text = '';
    
    for (let i = 0; i < uint8Array.length; i++) {
      const char = String.fromCharCode(uint8Array[i]);
      if (char.match(/[a-zA-Z0-9\s.,!?;:-]/)) {
        text += char;
      }
    }
    
    return text.replace(/\s+/g, ' ').trim();
  } catch (error) {
    return 'Unable to extract text from PDF. Please try uploading a .txt file instead.';
  }
}
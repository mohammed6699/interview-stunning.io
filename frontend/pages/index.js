import React, { useState, useEffect } from 'react';

/**
 * Main App component for website section generation and display.
 */
const App = () => {
  // State for form input
  const [websiteIdea, setWebsiteIdea] = useState('');
  // State for generated sections after submission
  const [generatedSections, setGeneratedSections] = useState([]);
  // State for loading indicator
  const [loading, setLoading] = useState(false);
  // State for error messages
  const [error, setError] = useState(null);
  // State for all stored website sections from backend
  const [storedSectionsList, setStoredSectionsList] = useState([]);

  // Fetch all stored website sections on component mount
  useEffect(() => {
    const fetchStoredSections = async () => {
      try {
        setError(null);
        const res = await fetch('http://localhost:3001/website-sections');
        if (!res.ok) throw new Error('Failed to fetch stored sections');
        const data = await res.json();
        setStoredSectionsList(data);
      } catch (err) {
        setError(err.message || 'Error fetching stored sections');
      }
    };
    fetchStoredSections();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setGeneratedSections([]);
    try {
      const res = await fetch('http://localhost:3001/website-sections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea: websiteIdea }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to generate sections');
      }
      const data = await res.json();
      setGeneratedSections(data.sections || []);
      setWebsiteIdea('');
      // Refresh stored sections list after submission
      const storedRes = await fetch('http://localhost:3001/website-sections');
      if (storedRes.ok) {
        const storedData = await storedRes.json();
        setStoredSectionsList(storedData);
      }
    } catch (err) {
      setError(err.message || 'Error generating sections');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6 mt-8">
        <h1 className="text-2xl font-bold mb-4 text-center">Website Section Generator</h1>
        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        {/* Form Input */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your website idea (e.g., Landing page for bakery)"
            value={websiteIdea}
            onChange={(e) => setWebsiteIdea(e.target.value)}
            required
          />
          <button
            type="submit"
            className={`bg-blue-500 text-white rounded px-4 py-2 font-semibold transition ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Sections'}
          </button>
        </form>

        {/* Generated Sections */}
        {generatedSections.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Generated Sections:</h2>
            <ul className="list-disc pl-6">
              {generatedSections.map((section, idx) => (
                <li key={idx} className="py-1">{section}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Stored Sections List */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">All Stored Website Ideas & Sections:</h2>
          {storedSectionsList.length === 0 ? (
            <p className="text-gray-500">No ideas stored yet.</p>
          ) : (
            <ul className="space-y-4">
              {storedSectionsList.map((item) => (
                <li key={item._id} className="bg-gray-50 rounded p-3 border">
                  <div className="font-medium text-blue-700">Idea: {item.idea}</div>
                  <ul className="list-disc pl-6 mt-1">
                    {item.sections.map((section, idx) => (
                      <li key={idx} className="text-gray-700">{section}</li>
                    ))}
                  </ul>
                  <div className="text-xs text-gray-400 mt-2">
                    {item.timestamp ? `Created: ${new Date(item.timestamp).toLocaleString()}` : ''}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

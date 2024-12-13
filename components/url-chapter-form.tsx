'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from 'axios'

// Get the API URL from the environment variable
const API = process.env.NEXT_PUBLIC_API_URL

export function UrlChapterForm() {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [chapter, setChapter] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitted:', { name, url, chapter })

    // API call to backend using axios (GET request)
    try {
      // Making the GET request with parameters
      const response = await axios.get(`${API}/download`, {
        params: { name, url, chapter },
        responseType: 'blob',  // We expect the response to be a file (binary data)
      });
  
      // Extract filename from Content-Disposition header
      const contentDisposition = response.headers['content-disposition'];
      let filename = 'downloaded_file.zip';  // Default filename
      console.log('contentDisposition:', contentDisposition);
  
      if (contentDisposition && contentDisposition.indexOf('attachment') !== -1) {
        const matches = /filename="(.+)"/.exec(contentDisposition);
        if (matches != null && matches[1]) {
          filename = matches[1];  // Extract filename from the header
        }
      }
  
      // Create a link to download the file
      const blob = response.data;
      const link = document.createElement('a');
      const urlObject = window.URL.createObjectURL(blob);
      link.href = urlObject;
      link.download = filename;  // Use the extracted filename
      link.click();  // Trigger the download
      window.URL.revokeObjectURL(urlObject);  // Clean up the URL object after download
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div className="space-y-2">
        <Input
          id="name"
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Input
          id="url"
          type="url"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Input
          id="chapter"
          type="text"
          placeholder="Enter Chapter"
          value={chapter}
          onChange={(e) => setChapter(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full">Get Chapter</Button>
    </form>
  )
}


'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type DataRow = {
  date: string;
  symbol: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [sheetUrl, setSheetUrl] = useState('');
  const [previewData, setPreviewData] = useState<DataRow[]>([]);

  // Mock data for preview
  const mockPreviewData: DataRow[] = [
    {
      date: '2024-01-10',
      symbol: 'AAPL',
      open: 185.34,
      high: 186.12,
      low: 184.89,
      close: 185.75,
      volume: 54321000
    },
    {
      date: '2024-01-10',
      symbol: 'MSFT',
      open: 376.25,
      high: 377.80,
      low: 375.20,
      close: 377.50,
      volume: 32145000
    },
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // In a real app, we would parse the file here
      setPreviewData(mockPreviewData);
    }
  };

  const handleSheetUrlSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // In a real app, we would validate and fetch the sheet data here
    setPreviewData(mockPreviewData);
  };

  const handleRunPredictions = () => {
    // In a real app, this would trigger the ML pipeline
    console.log('Running predictions...');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Upload Data</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upload Excel File</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileChange}
              />
              {selectedFile && (
                <p className="text-sm text-gray-500">
                  Selected file: {selectedFile.name}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Link Google Sheet</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSheetUrlSubmit} className="space-y-4">
              <Input
                type="url"
                placeholder="Enter Google Sheet URL"
                value={sheetUrl}
                onChange={(e) => setSheetUrl(e.target.value)}
              />
              <Button type="submit">Connect Sheet</Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {previewData.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Data Preview</CardTitle>
            <Button onClick={handleRunPredictions}>Run Predictions</Button>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Open</TableHead>
                    <TableHead>High</TableHead>
                    <TableHead>Low</TableHead>
                    <TableHead>Close</TableHead>
                    <TableHead>Volume</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {previewData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.symbol}</TableCell>
                      <TableCell>{row.open.toFixed(2)}</TableCell>
                      <TableCell>{row.high.toFixed(2)}</TableCell>
                      <TableCell>{row.low.toFixed(2)}</TableCell>
                      <TableCell>{row.close.toFixed(2)}</TableCell>
                      <TableCell>{row.volume.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
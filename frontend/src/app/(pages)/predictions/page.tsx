'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock prediction data
const mockPredictions = [
  { symbol: 'AAPL', signal: 'Buy', confidence: 0.85, predictedPrice: 190.50, currentPrice: 185.75 },
  { symbol: 'MSFT', signal: 'Hold', confidence: 0.72, predictedPrice: 380.25, currentPrice: 377.50 },
  { symbol: 'TSLA', signal: 'Sell', confidence: 0.78, predictedPrice: 235.50, currentPrice: 243.80 },
  { symbol: 'GOOGL', signal: 'Buy', confidence: 0.81, predictedPrice: 145.75, currentPrice: 142.30 },
  { symbol: 'NVDA', signal: 'Buy', confidence: 0.88, predictedPrice: 520.25, currentPrice: 510.50 },
];

// Mock historical prediction accuracy data
const mockAccuracyData = [
  { date: '2024-01', accuracy: 0.75 },
  { date: '2024-02', accuracy: 0.78 },
  { date: '2024-03', accuracy: 0.73 },
  { date: '2024-04', accuracy: 0.82 },
  { date: '2024-05', accuracy: 0.79 },
  { date: '2024-06', accuracy: 0.76 },
];

export default function PredictionsPage() {
  const handleExport = () => {
    // In a real app, this would export predictions to CSV
    console.log('Exporting predictions...');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">ML Predictions</h1>
        <Button onClick={handleExport}>Export to CSV</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Predictions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockPredictions.length}</div>
            <p className="text-xs text-gray-500">Updated 5 minutes ago</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Confidence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">81%</div>
            <p className="text-xs text-gray-500">Across all predictions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Buy Signals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">3</div>
            <p className="text-xs text-gray-500">High confidence picks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sell Signals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">1</div>
            <p className="text-xs text-gray-500">Risk management alerts</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Predictions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Signal</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead>Current Price</TableHead>
                  <TableHead>Predicted Price</TableHead>
                  <TableHead>Potential Return</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPredictions.map((pred) => {
                  const potentialReturn = ((pred.predictedPrice - pred.currentPrice) / pred.currentPrice) * 100;
                  return (
                    <TableRow key={pred.symbol}>
                      <TableCell className="font-medium">{pred.symbol}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          pred.signal === 'Buy' ? 'bg-green-100 text-green-800' :
                          pred.signal === 'Sell' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {pred.signal}
                        </span>
                      </TableCell>
                      <TableCell>{(pred.confidence * 100).toFixed(0)}%</TableCell>
                      <TableCell>${pred.currentPrice.toFixed(2)}</TableCell>
                      <TableCell>${pred.predictedPrice.toFixed(2)}</TableCell>
                      <TableCell className={potentialReturn > 0 ? 'text-green-500' : 'text-red-500'}>
                        {potentialReturn.toFixed(2)}%
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Model Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockAccuracyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0.5, 1]} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                <Tooltip formatter={(value) => `${(Number(value) * 100).toFixed(0)}%`} />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
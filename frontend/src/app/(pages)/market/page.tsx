'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Mock data for stock prices
const mockStockData = [
  { time: '9:30', AAPL: 180.5, MSFT: 375.2, TSLA: 240.8, volume: 1000 },
  { time: '10:00', AAPL: 181.2, MSFT: 376.5, TSLA: 242.3, volume: 1500 },
  { time: '10:30', AAPL: 182.1, MSFT: 374.8, TSLA: 241.5, volume: 1200 },
  { time: '11:00', AAPL: 181.8, MSFT: 375.9, TSLA: 243.2, volume: 1800 },
  { time: '11:30', AAPL: 182.5, MSFT: 377.2, TSLA: 244.1, volume: 2000 },
  { time: '12:00', AAPL: 183.1, MSFT: 376.8, TSLA: 243.8, volume: 1600 },
];

export default function MarketPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Market Overview</h1>
        <div className="flex items-center space-x-4">
          <Select defaultValue="1D">
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1D">1 Day</SelectItem>
              <SelectItem value="1W">1 Week</SelectItem>
              <SelectItem value="1M">1 Month</SelectItem>
              <SelectItem value="3M">3 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AAPL</CardTitle>
            <span className="text-green-500 text-sm">+1.2%</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$183.10</div>
            <div className="h-[80px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockStockData}>
                  <Area type="monotone" dataKey="AAPL" stroke="#22c55e" fill="#22c55e20" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MSFT</CardTitle>
            <span className="text-green-500 text-sm">+0.8%</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$376.80</div>
            <div className="h-[80px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockStockData}>
                  <Area type="monotone" dataKey="MSFT" stroke="#3b82f6" fill="#3b82f620" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">TSLA</CardTitle>
            <span className="text-green-500 text-sm">+1.5%</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$243.80</div>
            <div className="h-[80px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockStockData}>
                  <Area type="monotone" dataKey="TSLA" stroke="#ec4899" fill="#ec489920" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="price" className="space-y-4">
            <TabsList>
              <TabsTrigger value="price">Price</TabsTrigger>
              <TabsTrigger value="volume">Volume</TabsTrigger>
              <TabsTrigger value="indicators">Indicators</TabsTrigger>
            </TabsList>
            <TabsContent value="price" className="space-y-4">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockStockData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="AAPL" stroke="#22c55e" dot={false} />
                    <Line type="monotone" dataKey="MSFT" stroke="#3b82f6" dot={false} />
                    <Line type="monotone" dataKey="TSLA" stroke="#ec4899" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="volume">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockStockData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="volume" fill="#3b82f620" stroke="#3b82f6" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="indicators">
              <div className="h-[400px] flex items-center justify-center">
                <p className="text-gray-500">Technical indicators coming soon...</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
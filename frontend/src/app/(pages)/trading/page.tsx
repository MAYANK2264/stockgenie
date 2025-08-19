'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

// Mock trading data
const mockPositions = [
  { symbol: 'AAPL', quantity: 50, entryPrice: 185.75, currentPrice: 187.25, pnl: 75.00 },
  { symbol: 'MSFT', quantity: 25, entryPrice: 377.50, currentPrice: 380.00, pnl: 62.50 },
  { symbol: 'NVDA', quantity: 30, entryPrice: 510.50, currentPrice: 515.75, pnl: 157.50 },
];

const mockTrades = [
  { time: '2024-01-10 14:30', symbol: 'AAPL', action: 'BUY', quantity: 50, price: 185.75 },
  { time: '2024-01-10 14:15', symbol: 'TSLA', action: 'SELL', quantity: 20, price: 243.80 },
  { time: '2024-01-10 14:00', symbol: 'MSFT', action: 'BUY', quantity: 25, price: 377.50 },
  { time: '2024-01-10 13:45', symbol: 'NVDA', action: 'BUY', quantity: 30, price: 510.50 },
];

export default function TradingPage() {
  const [autoTrading, setAutoTrading] = useState(false);

  const toggleAutoTrading = () => {
    setAutoTrading(!autoTrading);
    // In a real app, this would enable/disable the trading bot
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Paper Trading</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={autoTrading}
              onCheckedChange={toggleAutoTrading}
            />
            <span className="font-medium">
              Auto Trading {autoTrading ? 'ON' : 'OFF'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$25,450.75</div>
            <p className="text-xs text-green-500">+$295.25 today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Buying Power</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,325.50</div>
            <p className="text-xs text-gray-500">48.4% available</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total P/L</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">+$295.00</div>
            <p className="text-xs">+1.17% all time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Trades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockTrades.length}</div>
            <p className="text-xs">Last trade 5m ago</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Open Positions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Entry Price</TableHead>
                  <TableHead>Current Price</TableHead>
                  <TableHead>P/L</TableHead>
                  <TableHead>P/L %</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPositions.map((position) => {
                  const plPercent = ((position.currentPrice - position.entryPrice) / position.entryPrice * 100).toFixed(2);
                  return (
                    <TableRow key={position.symbol}>
                      <TableCell className="font-medium">{position.symbol}</TableCell>
                      <TableCell>{position.quantity}</TableCell>
                      <TableCell>${position.entryPrice.toFixed(2)}</TableCell>
                      <TableCell>${position.currentPrice.toFixed(2)}</TableCell>
                      <TableCell className={position.pnl >= 0 ? 'text-green-500' : 'text-red-500'}>
                        ${position.pnl.toFixed(2)}
                      </TableCell>
                      <TableCell className={Number(plPercent) >= 0 ? 'text-green-500' : 'text-red-500'}>
                        {plPercent}%
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
          <CardTitle>Recent Trades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTrades.map((trade, index) => (
                  <TableRow key={index}>
                    <TableCell>{trade.time}</TableCell>
                    <TableCell className="font-medium">{trade.symbol}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        trade.action === 'BUY' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {trade.action}
                      </span>
                    </TableCell>
                    <TableCell>{trade.quantity}</TableCell>
                    <TableCell>${trade.price.toFixed(2)}</TableCell>
                    <TableCell>${(trade.quantity * trade.price).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
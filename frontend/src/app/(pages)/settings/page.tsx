'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    alpacaApiKey: '',
    alpacaSecretKey: '',
    openRouterApiKey: '',
    maxTradesPerDay: 10,
    minConfidence: 75,
    stopLossPercent: 2,
    enableNotifications: true,
    enableAutoTrading: false,
    paperTrading: true,
  });

  const handleSave = () => {
    // In a real app, this would save settings to backend
    console.log('Saving settings:', settings);
  };

  const handleTestConnection = () => {
    // In a real app, this would test API connections
    console.log('Testing connections...');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>
            Configure your Alpaca Paper Trading and AI API credentials
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Alpaca API Key</label>
            <Input
              type="password"
              value={settings.alpacaApiKey}
              onChange={(e) => setSettings({ ...settings, alpacaApiKey: e.target.value })}
              placeholder="Enter your Alpaca API key"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Alpaca Secret Key</label>
            <Input
              type="password"
              value={settings.alpacaSecretKey}
              onChange={(e) => setSettings({ ...settings, alpacaSecretKey: e.target.value })}
              placeholder="Enter your Alpaca secret key"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">OpenRouter API Key</label>
            <Input
              type="password"
              value={settings.openRouterApiKey}
              onChange={(e) => setSettings({ ...settings, openRouterApiKey: e.target.value })}
              placeholder="Enter your OpenRouter API key"
            />
          </div>
          <Button onClick={handleTestConnection}>Test Connections</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Trading Parameters</CardTitle>
          <CardDescription>
            Configure automated trading thresholds and limits
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Maximum Trades per Day</label>
            <Input
              type="number"
              value={settings.maxTradesPerDay}
              onChange={(e) => setSettings({ ...settings, maxTradesPerDay: parseInt(e.target.value) })}
              min={1}
              max={50}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Minimum Confidence Score (%)</label>
            <Input
              type="number"
              value={settings.minConfidence}
              onChange={(e) => setSettings({ ...settings, minConfidence: parseInt(e.target.value) })}
              min={0}
              max={100}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Stop Loss Percentage (%)</label>
            <Input
              type="number"
              value={settings.stopLossPercent}
              onChange={(e) => setSettings({ ...settings, stopLossPercent: parseInt(e.target.value) })}
              min={0.1}
              max={20}
              step={0.1}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Trading Mode</CardTitle>
          <CardDescription>
            Configure trading environment and automation settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-medium">Paper Trading</div>
              <div className="text-sm text-gray-500">Use simulated trading environment</div>
            </div>
            <Switch
              checked={settings.paperTrading}
              onCheckedChange={(checked) => setSettings({ ...settings, paperTrading: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-medium">Automated Trading</div>
              <div className="text-sm text-gray-500">Enable AI-powered trade execution</div>
            </div>
            <Switch
              checked={settings.enableAutoTrading}
              onCheckedChange={(checked) => setSettings({ ...settings, enableAutoTrading: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-medium">Trade Notifications</div>
              <div className="text-sm text-gray-500">Receive alerts for trades and signals</div>
            </div>
            <Switch
              checked={settings.enableNotifications}
              onCheckedChange={(checked) => setSettings({ ...settings, enableNotifications: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Reset to Defaults</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reset Settings</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p>Are you sure you want to reset all settings to their default values? This action cannot be undone.</p>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button variant="destructive">Reset All</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
}
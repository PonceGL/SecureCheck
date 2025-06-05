
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Globe, Smartphone } from 'lucide-react';

export const Analytics = () => {
  const [analytics, setAnalytics] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const storedAnalytics = JSON.parse(localStorage.getItem('securecheck_analytics') || '[]');
    setAnalytics(storedAnalytics);
  }, []);

  const getAnalyticsSummary = () => {
    const totalVisits = analytics.filter(a => a.event === 'page_visit').length;
    const uniqueUsers = new Set(analytics.map(a => a.userId)).size;
    const analysisCount = analytics.filter(a => a.event === 'analysis_completed').length;
    
    const deviceTypes = analytics.reduce((acc, a) => {
      if (a.deviceType) {
        acc[a.deviceType] = (acc[a.deviceType] || 0) + 1;
      }
      return acc;
    }, {});

    const browsers = analytics.reduce((acc, a) => {
      if (a.browser) {
        acc[a.browser] = (acc[a.browser] || 0) + 1;
      }
      return acc;
    }, {});

    return {
      totalVisits,
      uniqueUsers,
      analysisCount,
      deviceTypes: Object.entries(deviceTypes).map(([name, value]) => ({ name, value })),
      browsers: Object.entries(browsers).map(([name, value]) => ({ name, value }))
    };
  };

  const summary = getAnalyticsSummary();
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Only show analytics to admin users (for demo purposes, using a simple check)
  const isAdmin = localStorage.getItem('admin_mode') === 'true';

  if (!isAdmin && !isVisible) {
    return (
      <div className="fixed bottom-4 right-4">
        <Button
          onClick={() => setIsVisible(true)}
          variant="outline"
          size="sm"
          className="text-slate-400 border-slate-600"
        >
          View Analytics
        </Button>
      </div>
    );
  }

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg border border-slate-700 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
            <Button
              onClick={() => setIsVisible(false)}
              variant="outline"
              size="sm"
            >
              Close
            </Button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-slate-700 border-slate-600">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-8 w-8 text-blue-400" />
                  <div>
                    <p className="text-slate-400 text-sm">Total Visits</p>
                    <p className="text-white text-2xl font-bold">{summary.totalVisits}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-700 border-slate-600">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-green-400" />
                  <div>
                    <p className="text-slate-400 text-sm">Unique Users</p>
                    <p className="text-white text-2xl font-bold">{summary.uniqueUsers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-700 border-slate-600">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Globe className="h-8 w-8 text-purple-400" />
                  <div>
                    <p className="text-slate-400 text-sm">URL Analyses</p>
                    <p className="text-white text-2xl font-bold">{summary.analysisCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-700 border-slate-600">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-8 w-8 text-orange-400" />
                  <div>
                    <p className="text-slate-400 text-sm">Mobile Users</p>
                    <p className="text-white text-2xl font-bold">
                      {summary.deviceTypes.find(d => d.name === 'mobile')?.value || 0}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-700 border-slate-600">
              <CardHeader>
                <CardTitle className="text-white">Device Types</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={summary.deviceTypes}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {summary.deviceTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-slate-700 border-slate-600">
              <CardHeader>
                <CardTitle className="text-white">Browser Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={summary.browsers}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Events */}
          <Card className="bg-slate-700 border-slate-600 mt-6">
            <CardHeader>
              <CardTitle className="text-white">Recent Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {analytics.slice(-10).reverse().map((event, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-slate-300">{event.event}</span>
                    <span className="text-slate-400">
                      {new Date(event.timestamp).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

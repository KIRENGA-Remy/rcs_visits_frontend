import { useContext, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { CheckCircle, XCircle, Search, Users, Calendar, Clock, FileText } from "lucide-react";
import { Layout } from "./Layout";
import { type User } from "../types/user";
import { AuthContext } from "../context/AuthContext";

interface PendingVisit {
  id: string;
  visitorName: string;
  visitorEmail: string;
  prisonerName: string;
  date: string;
  time: string;
  reason: string;
  requestedAt: string;
}

interface AdminDashboardProps {
  user: User;
}

export const AdminDashboard = ({ user }: AdminDashboardProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { logout } = useContext(AuthContext)
  const [pendingVisits] = useState<PendingVisit[]>([
    {
      id: "1",
      visitorName: "Sarah Wilson",
      visitorEmail: "sarah@email.com",
      prisonerName: "Jane Doe",
      date: "2024-08-03",
      time: "10:00",
      reason: "Legal consultation",
      requestedAt: "2024-08-01 09:30"
    },
    {
      id: "2",
      visitorName: "Michael Brown",
      visitorEmail: "michael@email.com", 
      prisonerName: "Robert Taylor",
      date: "2024-08-04",
      time: "14:00",
      reason: "Family visit",
      requestedAt: "2024-08-01 15:45"
    },
    {
      id: "3",
      visitorName: "Emily Davis",
      visitorEmail: "emily@email.com",
      prisonerName: "David Wilson",
      date: "2024-08-05",
      time: "11:00", 
      reason: "Personal visit",
      requestedAt: "2024-08-02 08:15"
    }
  ]);

  const [todayVisits] = useState([
    { id: "1", visitor: "John Smith", prisoner: "Mary Johnson", time: "09:00", status: "checked-in" },
    { id: "2", visitor: "Lisa Parker", prisoner: "Tom Anderson", time: "10:30", status: "scheduled" },
    { id: "3", visitor: "David Lee", prisoner: "Anna Brown", time: "14:00", status: "scheduled" },
  ]);

  const handleApprove = (visitId: string) => {
    console.log("Approving visit:", visitId);
  };

  const handleReject = (visitId: string) => {
    console.log("Rejecting visit:", visitId);
  };

  const filteredVisits = pendingVisits.filter(visit =>
    visit.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visit.prisonerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const userName = `${user.firstname} ${user.lastname}`;
  return (
    <Layout userRole={user.role === 'legal' ? 'visitor' : user.role } userName={userName} onLogout={logout}>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
          <p className="text-muted-foreground">Manage visit requests and monitor system activity</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">3</div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Visits</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">3</div>
              <p className="text-xs text-muted-foreground">Scheduled for today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Visitors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">1</div>
              <p className="text-xs text-muted-foreground">Currently in facility</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Total visits</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending">Pending Requests</TabsTrigger>
            <TabsTrigger value="today">Today's Schedule</TabsTrigger>
            <TabsTrigger value="history">Visit History</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Pending Visit Requests</CardTitle>
                    <CardDescription>Review and approve or reject visit requests</CardDescription>
                  </div>
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search visitors or prisoners..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Visitor</TableHead>
                      <TableHead>Prisoner</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Requested</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVisits.map((visit) => (
                      <TableRow key={visit.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{visit.visitorName}</div>
                            <div className="text-sm text-muted-foreground">{visit.visitorEmail}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{visit.prisonerName}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{visit.date}</div>
                            <div className="text-muted-foreground">{visit.time}</div>
                          </div>
                        </TableCell>
                        <TableCell>{visit.reason}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{visit.requestedAt}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              onClick={() => handleApprove(visit.id)}
                              className="bg-success hover:bg-success/90"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleReject(visit.id)}
                            >
                              <XCircle className="h-3 w-3 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="today" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Today's Visit Schedule</CardTitle>
                <CardDescription>Monitor today's approved visits and check-ins</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>Visitor</TableHead>
                      <TableHead>Prisoner</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {todayVisits.map((visit) => (
                      <TableRow key={visit.id}>
                        <TableCell className="font-medium">{visit.time}</TableCell>
                        <TableCell>{visit.visitor}</TableCell>
                        <TableCell>{visit.prisoner}</TableCell>
                        <TableCell>
                          <Badge className={visit.status === 'checked-in' ? 'bg-success text-success-foreground' : 'bg-secondary'}>
                            {visit.status === 'checked-in' ? 'Checked In' : 'Scheduled'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Visit History</CardTitle>
                <CardDescription>View completed and cancelled visits</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">Visit history data will be displayed here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};
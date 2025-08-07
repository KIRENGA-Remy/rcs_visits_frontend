import { useContext, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Search, UserCheck, Clock, QrCode, CheckCircle2 } from "lucide-react";
import { Layout } from "./Layout";
import { type User } from "../types/user";
import { AuthContext } from "../context/AuthContext";

interface ScheduledVisit {
  id: string;
  visitorName: string;
  prisonerName: string;
  time: string;
  status: 'scheduled' | 'checked-in' | 'completed';
  visitorId: string;
}

interface StaffDashboardProps {
  user: User;
}

export const StaffDashboard = ({ user }: StaffDashboardProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [visitCode, setVisitCode] = useState("");
  const { logout } = useContext(AuthContext)
  
  const [scheduledVisits] = useState<ScheduledVisit[]>([
    {
      id: "1",
      visitorName: "John Smith",
      prisonerName: "Mary Johnson",
      time: "09:00",
      status: "checked-in",
      visitorId: "VS001"
    },
    {
      id: "2", 
      visitorName: "Lisa Parker",
      prisonerName: "Tom Anderson",
      time: "10:30",
      status: "scheduled",
      visitorId: "VS002"
    },
    {
      id: "3",
      visitorName: "David Lee", 
      prisonerName: "Anna Brown",
      time: "14:00",
      status: "scheduled",
      visitorId: "VS003"
    },
    {
      id: "4",
      visitorName: "Maria Garcia",
      prisonerName: "James Wilson", 
      time: "15:30",
      status: "scheduled",
      visitorId: "VS004"
    }
  ]);

  const handleCheckIn = (visitId: string) => {
    console.log("Checking in visitor:", visitId);
  };

  const handleCheckOut = (visitId: string) => {
    console.log("Checking out visitor:", visitId);
  };

  const handleQuickLookup = () => {
    console.log("Looking up visit with code:", visitCode);
  };

  const filteredVisits = scheduledVisits.filter(visit =>
    visit.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visit.prisonerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visit.visitorId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'checked-in': return 'bg-success text-success-foreground';
      case 'completed': return 'bg-secondary text-secondary-foreground';
      case 'scheduled': return 'bg-warning text-warning-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const userName = `${user.firstname} ${user.lastname}`;
  return (
    <Layout userRole={user.role === 'legal' ? 'visitor' : user.role } userName={userName} onLogout={logout}
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Staff Portal</h2>
          <p className="text-muted-foreground">Visitor check-in and facility monitoring</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Visits</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">Scheduled today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Checked In</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">1</div>
              <p className="text-xs text-muted-foreground">Currently in facility</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Remaining</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">3</div>
              <p className="text-xs text-muted-foreground">Awaiting arrival</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Visits finished</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="checkin" className="space-y-4">
          <TabsList>
            <TabsTrigger value="checkin">Visitor Check-In</TabsTrigger>
            <TabsTrigger value="schedule">Today's Schedule</TabsTrigger>
            <TabsTrigger value="lookup">Quick Lookup</TabsTrigger>
          </TabsList>

          <TabsContent value="checkin" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Visitor Check-In/Out</CardTitle>
                    <CardDescription>Process visitor arrivals and departures</CardDescription>
                  </div>
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name or ID..."
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
                      <TableHead>Time</TableHead>
                      <TableHead>Visitor ID</TableHead>
                      <TableHead>Visitor Name</TableHead>
                      <TableHead>Prisoner</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVisits.map((visit) => (
                      <TableRow key={visit.id}>
                        <TableCell className="font-medium">{visit.time}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{visit.visitorId}</Badge>
                        </TableCell>
                        <TableCell>{visit.visitorName}</TableCell>
                        <TableCell>{visit.prisonerName}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(visit.status)}>
                            {visit.status === 'checked-in' ? 'In Facility' : 
                             visit.status === 'completed' ? 'Completed' : 'Scheduled'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {visit.status === 'scheduled' && (
                              <Button 
                                size="sm" 
                                onClick={() => handleCheckIn(visit.id)}
                                className="bg-success hover:bg-success/90"
                              >
                                <UserCheck className="h-3 w-3 mr-1" />
                                Check In
                              </Button>
                            )}
                            {visit.status === 'checked-in' && (
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleCheckOut(visit.id)}
                              >
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Check Out
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Today's Visit Schedule</CardTitle>
                <CardDescription>Overview of all scheduled visits for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scheduledVisits.map((visit) => (
                    <div key={visit.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{visit.time}</span>
                          <Badge variant="outline">{visit.visitorId}</Badge>
                          <Badge className={getStatusColor(visit.status)}>
                            {visit.status === 'checked-in' ? 'In Facility' : 
                             visit.status === 'completed' ? 'Completed' : 'Scheduled'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          <strong>{visit.visitorName}</strong> visiting <strong>{visit.prisonerName}</strong>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lookup" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Quick Visit Lookup</CardTitle>
                <CardDescription>Search for a specific visit using QR code or visit ID</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Enter visit code or scan QR..."
                      value={visitCode}
                      onChange={(e) => setVisitCode(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleQuickLookup}>
                    <Search className="h-4 w-4 mr-2" />
                    Lookup
                  </Button>
                  <Button variant="outline">
                    <QrCode className="h-4 w-4 mr-2" />
                    Scan QR
                  </Button>
                </div>
                
                <div className="text-center text-muted-foreground py-8">
                  <QrCode className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter a visit code or scan a QR code to quickly lookup visit details</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};
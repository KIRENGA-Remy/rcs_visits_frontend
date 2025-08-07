import { useContext, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Calendar, Clock, User as UserIcon, FileText, Plus } from "lucide-react";
import { Layout } from "./Layout";
import { type User } from '../types/user';
import { AuthContext } from "../context/AuthContext";

interface Visit {
  id: string;
  prisonerName: string;
  date: string;
  time: string;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
}

interface VisitorDashboardProps {
  user: User;
}

export const VisitorDashboard = ({ user }: VisitorDashboardProps) => {
  const [showNewVisitForm, setShowNewVisitForm] = useState(false);
  const { logout } = useContext(AuthContext)
  const [visits] = useState<Visit[]>([
    {
      id: "1",
      prisonerName: "John Smith",
      date: "2024-08-05",
      time: "14:00",
      status: "approved",
      reason: "Family visit"
    },
    {
      id: "2", 
      prisonerName: "Jane Doe",
      date: "2024-08-03",
      time: "10:00",
      status: "pending",
      reason: "Legal consultation"
    },
    {
      id: "3",
      prisonerName: "Mike Johnson",
      date: "2024-07-30",
      time: "15:30",
      status: "rejected",
      reason: "Personal visit"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-success text-success-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'rejected': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const userName = `${user.firstname} ${user.lastname}`;
  return (
    <Layout userRole={user.role === 'legal' ? 'visitor' : user.role } userName={userName} onLogout={logout}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Welcome, {user.firstname}</h2>
            <p className="text-muted-foreground">Manage your prison visit requests</p>
          </div>
          <Button onClick={() => setShowNewVisitForm(!showNewVisitForm)} className="gap-2">
            <Plus className="h-4 w-4" />
            Request New Visit
          </Button>
        </div>

        {showNewVisitForm && (
          <Card>
            <CardHeader>
              <CardTitle>Request a New Visit</CardTitle>
              <CardDescription>Fill out the form below to request a visit with a prisoner</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="prisoner">Prisoner</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select prisoner to visit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john-smith">John Smith - #12345</SelectItem>
                        <SelectItem value="jane-doe">Jane Doe - #23456</SelectItem>
                        <SelectItem value="mike-johnson">Mike Johnson - #34567</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="relationship">Relationship</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Your relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="family">Family Member</SelectItem>
                        <SelectItem value="friend">Friend</SelectItem>
                        <SelectItem value="lawyer">Legal Counsel</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Preferred Date</Label>
                    <Input type="date" id="date" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="time">Preferred Time</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="09:00">09:00 AM</SelectItem>
                        <SelectItem value="10:00">10:00 AM</SelectItem>
                        <SelectItem value="11:00">11:00 AM</SelectItem>
                        <SelectItem value="14:00">02:00 PM</SelectItem>
                        <SelectItem value="15:00">03:00 PM</SelectItem>
                        <SelectItem value="16:00">04:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Visit</Label>
                  <Textarea 
                    id="reason" 
                    placeholder="Please provide the reason for your visit..."
                    className="resize-none"
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit">Submit Request</Button>
                  <Button type="button" variant="outline" onClick={() => setShowNewVisitForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          <h3 className="text-xl font-semibold">Your Visit Requests</h3>
          {visits.map((visit) => (
            <Card key={visit.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <UserIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{visit.prisonerName}</span>
                      <Badge className={getStatusColor(visit.status)}>
                        {visit.status.charAt(0).toUpperCase() + visit.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {visit.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {visit.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        {visit.reason}
                      </div>
                    </div>
                  </div>
                  
                  {visit.status === 'approved' && (
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};
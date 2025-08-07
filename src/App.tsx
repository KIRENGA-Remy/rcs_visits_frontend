import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";


const queryClient = new QueryClient();

// const App = () => {
//   const navigate = useNavigate(); // Add this hook

//   return (
//     <QueryClientProvider client={queryClient}>
//       <TooltipProvider>
//         <Toaster />
//         <Sonner />
//         <AuthProvider>
//           <BrowserRouter>
//             <Routes>
//               <Route element={<ProtectedRoute />}>
//                 <Route path="/" element={<Index />} />
//               </Route>
//               <Route 
//                 path="/login" 
//                 element={
//                   <LoginPage 
//                     onLogin={(user, token) => {
//                       localStorage.setItem("authToken", token);
//                       navigate('/');
//                     }} 
//                   />
//                 }
//               />
//               <Route 
//                 path="/register" 
//                 element={
//                   <RegisterPage 
//                     onRegister={(user, token) => {
//                       localStorage.setItem("authToken", token);
//                       navigate('/');
//                     }} 
//                   />
//                 }
//               />
//               <Route path="*" element={<NotFound />} />
//             </Routes>
//           </BrowserRouter>
//         </AuthProvider>
//       </TooltipProvider>
//     </QueryClientProvider>
//   );
// };


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

const AppRoutes = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Index />} />
      </Route>
      <Route 
        path="/login" 
        element={
          <LoginPage 
            onLogin={(user, token) => {
              localStorage.setItem("authToken", token);
              navigate('/');
            }} 
          />
        }
      />
                     <Route 
                 path="/register" 
                 element={
                   <RegisterPage 
                     onRegister={(user, token) => {
                       localStorage.setItem("authToken", token);
                       navigate('/');
                     }} 
                   />
                 }
               />
               <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
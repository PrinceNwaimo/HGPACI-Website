import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/AuthContext";
import { RouteGuard } from "@/components/common/RouteGuard";
import AppLayout from "@/components/layout/AppLayout";
import { AdminGuard } from "@/components/common/AdminGuard";
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import routes from "./routes";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <RouteGuard>
          <AppLayout>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <Routes>
                  {routes.map((route, index) => {
                    if (route.admin) {
                      return (
                        <Route key={index} path={route.path} element={<AdminGuard>{route.element}</AdminGuard>} />
                      );
                    }
                    return (
                      <Route key={index} path={route.path} element={route.element} />
                    );
                  })}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </AppLayout>
          <Toaster />
        </RouteGuard>
      </AuthProvider>
    </Router>
  );
};

export default App;
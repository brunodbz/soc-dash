import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import Header from '@/components/common/Header';
import routes from './routes';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { useAuth } from './context/AuthContext';

function App() {
  const { token } = useAuth();

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {token && <Header />}
        <main className="flex-grow">
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={route.protected
                  ? (
                    <ProtectedRoute>
                      {route.element}
                    </ProtectedRoute>
                  )
                  : route.element}
              />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;

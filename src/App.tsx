import 'antd/dist/reset.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./modules/dashboard/Dashboard";
import routes from "./core/menuRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          {routes.map(route => (
            <Route 
              key={route.path} 
              path={route.path} 
              element={route.element} 
            />
          ))}
          <Route path="*" element={<div>404 - Not Found</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
import MyForm from "./components/Form";
import { BrowserRouter as Router, Route, Routes,  } from "react-router-dom";

import MyTable from "./components/Table";
import Charts from "./components/Charts";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <MyForm />
              </div>
            }
          />
          <Route
            path="/table"
            element={
              <div>
                <MyTable />
              </div>
            }
          />
          <Route
            path="/charts"
            element={
              <div>
                <Charts />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

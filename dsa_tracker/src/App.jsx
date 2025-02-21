import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Card, CardContent } from "./components/ui";
import { Button } from "./components/ui";
import { Progress } from "./components/ui";
import { Input } from "./components/ui";

const DSA_PROBLEMS_JSON_URL = "/mnt/data/dsa_problems.json";

function Dashboard() {
  const [problemList, setProblemList] = useState([]);

  useEffect(() => {
    fetch(DSA_PROBLEMS_JSON_URL)
      .then(response => response.json())
      .then(data => {
        const problems = data.map((item, index) => ({
          id: index + 1,
          title: item.Problem,
          category: item.Category,
          completed: false,
        }));
        setProblemList(problems);
      });
  }, []);

  const completedCount = problemList.filter(p => p.completed).length;

  const toggleCompletion = (id) => {
    setProblemList(problemList.map(p => p.id === id ? { ...p, completed: !p.completed } : p));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">DSA Tracker</h1>
      <Progress value={(completedCount / problemList.length) * 100} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {problemList.map(problem => (
          <Card key={problem.id}>
            <CardContent>
              <h2 className="text-lg font-semibold">{problem.title}</h2>
              <p className="text-sm">Category: {problem.category}</p>
              <Button onClick={() => toggleCompletion(problem.id)}>
                {problem.completed ? "Mark Incomplete" : "Mark Complete"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-800 text-white flex justify-between">
        <Link to="/">Dashboard</Link>
        <Link to="/add-problem">Add Problem</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-problem" element={<AddProblem />} />
      </Routes>
    </Router>
  );
}

function AddProblem() {
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Add New Problem</h1>
      <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Problem Title" />
      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="p-2 border rounded">
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
      <Button className="mt-2">Add Problem</Button>
    </div>
  );
}

export default App;

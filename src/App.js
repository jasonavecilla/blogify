import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  const HomePage = () => {
    return <h1>Welcome to Blogify</h1>;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<HomePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Articles } from "./pages/Articles";
import { Article } from "./pages/Article";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Privacy, Terms } from "./pages/Legal";
import { Categories } from "./pages/Categories";
import { NotFound } from "./pages/NotFound";

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vasudev-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="articles" element={<Articles />} />
            <Route path="article/:slug" element={<Article />} />
            <Route path="categories" element={<Categories />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import NfcContact from './pages/NfcContact';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/nfc" element={<NfcContact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

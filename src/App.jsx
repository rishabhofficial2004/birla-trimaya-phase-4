import ReactGA from "react-ga4";
import { useEffect } from "react";
import { PageRoute } from "./PageRoute";
import { persistTrackingParams } from "./utils/tracking";

function App() {
  useEffect(() => {
    // Capture and persist UTM parameters on initial load
    persistTrackingParams();
  }, []);

  return (
    <div className="font-body md:text-xl bg-white">
      <PageRoute />
    </div>
  );
}

export default App;

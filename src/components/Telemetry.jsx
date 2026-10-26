import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

const Telemetry = () => (
  <>
    <Analytics />
    <SpeedInsights />
  </>
);

export default Telemetry;

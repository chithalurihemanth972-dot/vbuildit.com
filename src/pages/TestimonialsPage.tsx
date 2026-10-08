import { useNavigate } from 'react-router-dom';
import { TrustSection } from '../components/TrustSection';

export const TestimonialsPage = () => {
  const navigate = useNavigate();
  return <TrustSection onReserve={() => navigate('/domains')} />;
};

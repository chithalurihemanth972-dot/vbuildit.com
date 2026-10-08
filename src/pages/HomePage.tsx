import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { HomeCursor } from '../components/home/HomeCursor';
import { HomeExperience } from '../components/home/HomeExperience';

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <HomeCursor />
      <Hero onExplore={() => navigate('/domains')} />
      <HomeExperience onExplore={() => navigate('/domains')} />
    </>
  );
};

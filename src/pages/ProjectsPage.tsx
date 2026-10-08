import { ProjectsSection } from '../components/ProjectsSection';

export const ProjectsPage = ({ onOpenDomains }: { onOpenDomains: () => void }) => {
  return <ProjectsSection onExplore={onOpenDomains} />;
};

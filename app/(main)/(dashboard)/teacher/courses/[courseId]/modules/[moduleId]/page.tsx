interface ModuleIdPageProps {
  params: {
    params: {
      courseId: string,
      moduleId: string
    }
  }
}

const ModuleIdPage = ({ params }: ModuleIdPageProps) => {
  return (
    <div>
      Module id page
    </div>
  );
}

export default ModuleIdPage;
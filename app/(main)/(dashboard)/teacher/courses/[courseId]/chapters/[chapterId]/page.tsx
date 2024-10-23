interface ModuleIdPageProps {
  params: {
    params: {
      courseId: string,
      moduleId: string
    }
  }
}

const ChapterIdPage = ({ params }: ModuleIdPageProps) => {
  return (
    <div>
      Module id page
    </div>
  );
}

export default ChapterIdPage;
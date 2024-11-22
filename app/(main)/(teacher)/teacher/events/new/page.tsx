import EventNewForm from "@/features/events/components/event-new-form";
import { isAdminMiddleware } from "@/lib/is-admin-middleware";

const EventNewPage = async () => {
  await isAdminMiddleware()
  return (
    <EventNewForm />
  );
}

export default EventNewPage;
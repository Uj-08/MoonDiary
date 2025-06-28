import { withDatabase } from "@/lib/database";
import { meController } from "@/backend/controllers/auth/me.controller";

export default withDatabase(meController);

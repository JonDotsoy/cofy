import { z } from "zod";
import type { ManifestSchema, MessageObject } from "../schemas/manifest.schema";

export type MessageObjectDto = z.infer<typeof MessageObject>;
export type ManifestDto = z.infer<typeof ManifestSchema>;

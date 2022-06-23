import {z} from 'zod';

export const NoteExtractor = z.object({
  content: z.string(),
  createdAt: z.string().regex(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d.\d{3}Z$/),
  hidden: z.boolean(),
  id: z.string(),
});

export type Note = z.infer<typeof NoteExtractor>;

export const StateShapeExtractor = z.object({
  notes: z.object({
    items: z.record(NoteExtractor),
    loaded: z.boolean(),
  }),
  session: z.null().or(z.object({uid: z.string()})),
});

export type StateShape = z.infer<typeof StateShapeExtractor>;

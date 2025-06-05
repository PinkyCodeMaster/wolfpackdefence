import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

// TODO: Replace with real auth
const auth = () => ({ id: "fakeId" });

const f = createUploadthing();

export const fileRouter = {
  // User profile picture (1 image, 2MB max)
  profilePicture: f({
    image: { maxFileSize: "2MB", maxFileCount: 1, minFileCount: 1 },
  })
    .middleware(async () => {
      const user = await auth();
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // TODO: Save file info to user profile in DB
      console.log("Profile pic uploaded by", metadata.userId, file.url);
      return { uploadedBy: metadata.userId };
    }),

  // Listing images (up to 6 images, 4MB each)
  listingImages: f({
    image: { maxFileSize: "4MB", maxFileCount: 6, minFileCount: 1 },
  })
    .middleware(async () => {
      const user = await auth();
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // TODO: Save file info to listing in DB
      console.log("Listing image uploaded by", metadata.userId, file.url);
      return { uploadedBy: metadata.userId };
    }),

  // Message attachments (image or pdf, 1 file, 4MB)
  messageAttachment: f(["image", "pdf"])
    .middleware(async () => {
      const user = await auth();
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // TODO: Save file info to message in DB
      console.log("Message attachment uploaded by", metadata.userId, file.url);
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type FileRouterType = typeof fileRouter;

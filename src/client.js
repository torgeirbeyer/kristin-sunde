import SanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanity = SanityClient({
  projectId: "n55qisk2", // find this at manage.sanity.io or in your sanity.json
  dataset: "production", // this is from those question during 'sanity init'
  useCdn: true,
  apiVersion: "2022-01-17",
});

const builder = imageUrlBuilder(sanity);

export function urlFor(source) {
  return builder.image(source);
}

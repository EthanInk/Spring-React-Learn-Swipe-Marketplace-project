import * as Yup from "yup";

export default () => Yup.object({
  title: Yup.string().required("Title Required").max(255, "Max title length allowed is 255 characters"),
  description: Yup.string().required("Description required").max(2255, "Max description length allowed is 2255 characters"),
  address: Yup.string().required("Address required").max(2255, "Max address length allowed is 2255 characters"),
  price: Yup.number().required("Price required").min(0, "Positive numbers only"),
  tags: Yup.mixed().required("Tags are how others search and find your add, Try adding atlease one tag"),
});
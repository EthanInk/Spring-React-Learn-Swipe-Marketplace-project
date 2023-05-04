import { ErrorMessage, Field, Form, Formik } from "formik";
import { Typography, Alert, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import PostSchema from "../../schema/PostSchema";
import { usePost } from "../../context/PostContext";
import { useNavigate, useParams } from "react-router-dom";

export default function CreatePost() {
  const { id } = useParams();
  const postContext = usePost();
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [postData, setPostData] = useState({
    id: 1,
    title: "",
    description: "",
    address: "",
    images: [],
    price: "",
    tags: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    postContext
      .getPost(id)
      .then((data) => {
        updatePostData(data);
      })
      .catch(() => {
        navigate(`/error`);
      });
  }, []);

  function updatePostData(data) {
    let tagString = "";
        data.tags.forEach((tag) => {
          tagString += `#${tag.tag} `;
        });
        data.tags = tagString;
        setOldImages(data.images);
        setPostData(data);
  }

  async function onSubmitForm(values) {
    values.images = selectedImages;
    const { title, description, address, price, tags } = values;
    const newImages = selectedImages;
    const newOldImages = oldImages.map((image) => {
      return image.id;
    });
    await postContext
      .updateAd(
        postData.id,
        title,
        description,
        address,
        newOldImages,
        newImages,
        price,
        tags
      )
      .then((data) => {
        navigate("/posts/" + data.id);
      })
      .catch(() => {
        setErrorMessage("Error posting");
      });
  }

  function clearImages() {
    setSelectedImages([]);
    setOldImages([]);
  }

  return (
    <>
      {postData ? (
        <div className={"Login w-72 m-auto"}>
          <Typography variant="h2" className="py-4">
            Edit your add new ad
          </Typography>
          <Formik
            initialValues={postData}
            enableReinitialize={true}
            onSubmit={onSubmitForm}
            validationSchema={PostSchema}
            validateOnChange={true}
            validateOnBlur={true}
          >
            {() => (
              <Form>
                <div className="relative flex flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
                  <div className="mb-4 flex flex-col gap-6">
                    <fieldset className="relative h-11 w-full min-w-[200px]">
                      <Field
                        type="text"
                        name="title"
                        className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      />
                      <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Title
                      </label>
                    </fieldset>
                    <fieldset className="relative h-11 w-full min-w-[200px]">
                      <Field
                        type="text"
                        name="description"
                        className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      />
                      <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Description
                      </label>
                    </fieldset>
                    <fieldset className="relative h-11 w-full min-w-[200px]">
                      <Field
                        type="text"
                        name="address"
                        className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      />
                      <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Address
                      </label>
                    </fieldset>
                    <fieldset className="relative h-11 w-full min-w-[200px]">
                      <Field
                        type="number"
                        name="price"
                        min="0"
                        className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      />
                      <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Price
                      </label>
                    </fieldset>

                    <fieldset>
                      <label>Multiple files</label>
                      <input
                        type="file"
                        multiple
                        onChange={(e) => {
                          const newFiles = [...selectedImages];
                          for (let i = 0; i < e.target.files.length; i++) {
                            newFiles.push(e.target.files[i]);
                          }
                          setSelectedImages(newFiles);
                          e.target.value = "";
                        }}
                      />
                      <Button onClick={clearImages}>Clear</Button>
                    </fieldset>
                    <div className="grid grid-flow-row grid-cols-2 gap-2">
                      {selectedImages.map((image, index) => (
                        <img
                          className="aspect-w-1 aspect-h-1 border"
                          key={`new-${index}`}
                          src={URL.createObjectURL(image)}
                        />
                      ))}
                    </div>
                    <div className="grid grid-flow-row grid-cols-2 gap-2">
                      {oldImages.map((image) => (
                        <img
                          className="aspect-w-1 aspect-h-1 border"
                          key={`old-${image.index}`}
                          src={image.url}
                        />
                      ))}
                    </div>
                    <fieldset className="relative h-11 w-full min-w-[200px]">
                      <Field
                        type="text"
                        name="tags"
                        className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      />
                      <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Tags
                      </label>
                    </fieldset>
                  </div>
                  <button
                    className="mb-2 block w-full select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="submit"
                    data-ripple-light="true"
                  >
                    Post
                  </button>
                </div>
                <ErrorMessage name="title" component={"div"}>
                  {(msg) => <Alert color="red">{msg}</Alert>}
                </ErrorMessage>
                <ErrorMessage name="description" component={"div"}>
                  {(msg) => <Alert color="red">{msg}</Alert>}
                </ErrorMessage>
                <ErrorMessage name="address" component={"div"}>
                  {(msg) => <Alert color="red">{msg}</Alert>}
                </ErrorMessage>
                <ErrorMessage name="price" component={"div"}>
                  {(msg) => <Alert color="red">{msg}</Alert>}
                </ErrorMessage>
                <ErrorMessage name="images" component={"div"}>
                  {(msg) => <Alert color="red">{msg}</Alert>}
                </ErrorMessage>
              </Form>
            )}
          </Formik>
          <div className={`${errorMessage ? "" : "hidden"} my-4`}>
            <Alert color="red">{errorMessage}</Alert>
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
}

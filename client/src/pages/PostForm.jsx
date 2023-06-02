import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { usePosts } from "../context/postContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export function PostForm() {
  const { createPost, getPost, updatePost } = usePosts();
  const [post, setPost] = useState({
    title: "",
    description: "",
    image: null,
  });
  const params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (params.id) {
        const post = await getPost(params.id);
        setPost({
          title: post?.title,
          description: post?.description,
        });
      }
    })();
  }, [params.id, getPost]);

  return (
    <div className="bg-stone-800 min-h-screen w-full text-center pt-24">
      <Formik
        initialValues={post}
        enableReinitialize
        validationSchema={Yup.object({
          title: Yup.string().required("Title is required"),
          description: Yup.string().required("Description is required"),
          //image: Yup.mixed().required("The image is required"),
        })}
        onSubmit={async (values, actions) => {
          if (params.id) {
            await updatePost(params.id, values);
          } else {
            await createPost(values);
          }
          actions.resetForm();
          actions.setSubmitting(false);
          navigate("/");
        }}
      >
        {({ setFieldValue, isSubmitting, handleSubmit }) => (
          <Form
            onSubmit={handleSubmit}
            className="bg-zinc-800 text-white py-12 w-5/6 md:w-2/3 mx-auto rounded-md shadow-md shadow-black items-center h-full"
          >
            <header className="flex justify-between py-8 w-2/3 mx-auto items-center">
              <h1 className="text-white font-bold text-2xl md:text-5xl">
                New Post
              </h1>
              <Link to="/" className="text-white text-xs md:text-xl">
                Go back
              </Link>
            </header>
            <label
              htmlFor="title"
              className="text-sm text-white block font-bold"
            >
              Title
            </label>
            <Field
              name="title"
              placeholder="Title..."
              className="p-3 focus:outline-none rounded-md bg-gray-600 text-white w-4/5 md:w-2/3"
            />
            <ErrorMessage
              component="p"
              className="text-red-400 text-sm"
              name="title"
            />

            <label
              htmlFor="description"
              className="mt-8 text-sm text-white block font-bold"
            >
              Description
            </label>
            <Field
              component="textarea"
              rows={3}
              name="description"
              placeholder="Description..."
              className="p-3 focus:outline-none rounded-md bg-gray-600 text-white w-4/5 md:w-2/3"
            />
            <ErrorMessage
              component="p"
              className="text-red-400 text-sm"
              name="description"
            />

            <label
              htmlFor="image"
              className="mt-8 text-sm text-white block font-bold"
            >
              Image
            </label>
            <input
              type="file"
              name="image"
              className="p-3 focus:outline-none rounded-md bg-gray-600 text-white w-4/5 md:w-2/3"
              onChange={(e) => setFieldValue("image", e?.target?.files[0])}
            />
            <ErrorMessage
              component="p"
              name="image"
              className="text-red-400 text-sm"
            />

            <button
              type="submit"
              className="flex mt-8 bg-white text-black p-3 rounded-md mx-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
              ) : (
                "Save"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  // Sanitize file names before uploading
  const sanitizeFileName = (file) => {
    const extension = file.name.split('.').pop();
    const name = file.name
      .replace(/\s+/g, '-')           // replace spaces
      .replace(/[^a-zA-Z0-9-_]/g, ''); // remove special chars
    return new File([file], `${name}.${extension}`, { type: file.type });
  };

  // Transform title/slug to valid Appwrite documentId
  const slugTransform = useCallback((value) => {
    if (!value || typeof value !== "string") return "";
    return value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')   // replace non-alphanumeric with hyphen
      .replace(/^-+|-+$/g, '')       // remove leading/trailing hyphens
      .substring(0, 36);             // limit to 36 chars
  }, []);

  const submit = async (data) => {
    let fileId = post?.featuredImage || null;

    // Upload new file if selected
    if (data.image && data.image[0]) {
      try {
        const file = sanitizeFileName(data.image[0]);
        const uploadedFile = await appwriteService.uploadFile(file);
        fileId = uploadedFile.$id;

        // Delete old file if updating
        if (post?.featuredImage) {
          await appwriteService.deleteFile(post.featuredImage);
        }
      } catch (error) {
        console.error("File upload failed:", error);
        alert("File upload failed. Check file type and filename.");
        return;
      }
    }

    // Ensure featuredImage exists if required
    if (!fileId) {
      alert("Featured image is required!");
      return;
    }

    const postData = {
      ...data,
      slug: slugTransform(data.slug || data.title),
      featuredImage: fileId,
    };

    try {
      let dbPost;
      if (post) {
        dbPost = await appwriteService.updatePost(post.$id, postData);
      } else {
        dbPost = await appwriteService.createPost({ ...postData, userId: userData.$id });
      }

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } catch (error) {
      console.error("Post creation/updation failed:", error);
      alert("Post creation failed. Check all required fields.");
    }
  };

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap p-6 md:p-8 bg-white rounded-xl shadow-lg">
      {/* Left Column */}
      <div className="w-full md:w-2/3 px-2 mb-4 md:mb-0">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
      </div>

      {/* Right Column */}
      <div className="w-full md:w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />

        {post?.featuredImage && (
          <div className="w-full mb-4 relative overflow-hidden rounded-lg p-2 border-2 border-gray-200 hover:border-indigo-500 transition-colors duration-300">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />

        <Button
          type="submit"
          bgColor={post ? "bg-green-600" : "bg-indigo-600"}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

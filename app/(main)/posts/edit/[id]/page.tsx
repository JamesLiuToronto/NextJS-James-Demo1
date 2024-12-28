"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import BackButton from "@/components/BackButton";
import { useEffect, useRef, useState } from "react";
import { use } from "react";
import { Post, postSchema } from "../../../share-types/post-schema";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/SubmitButton";
import { fetchPost } from "@/components/PostActions";
import { redirect } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format, parseISO } from "date-fns";
import formatDateToYYYYMMDD from "@/lib/date-utils";
import { formHandlerAction } from "./_actions/formhandlers";

interface PostEditPageProps {
  params: Promise<{ id: string }>;
}

const PostEditPage = ({ params }: PostEditPageProps) => {

  const { toast } = useToast();
  const { id } = use(params);
  const [post, setPost] = useState<Post | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isUpdate = id !== "0";

  useEffect(() => {
    if (id === "0") {
      return;
    }
    const fetchPostData = async () => {
      try {
        const fetchedPost = await fetchPost(Number(id));
        setPost(fetchedPost);
      } catch (error) {
        console.error("Failed to fetch post:", error);
      }
    };
    fetchPostData();
  }, [id]);

  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      id: "0",
      title: "",
      body: "",
      author: "",
      date: new Date(),
      comments: [],
    },
  });

  useEffect(() => {
    console.log("caleed");
    if (post) {
      if (!post?.comments) {
        post.comments = [];
      }

     
      const formattedDate = formatDateToYYYYMMDD(post.date);
      //change post.date to formattedDate
      post.date = parseISO(formattedDate);
      form.reset(post);
      
      //log the actual value in form date field value
      
      console.log("after retrieve:", post.date);
    }
  }, [post, form]);

  //const [errors, setErrors] = useState({});

  const handleFormSubmit = async (data: Post) => {
    // Ensure comments is an array
    if (!data.comments) {
      data.comments = [];
    }

    const result = await formHandlerAction(data, isUpdate);
    const { errors, successMsg } = result || {};

    console.log("handleFormSubmit trigger:", data.date);
    if (errors) {
      toast({ title: "error", description: "Error" });
    } else if (successMsg) {
      toast({
        title: "Post has been updated successfully",
        description: `Updated by ${data.author} on ${data.date}`,
      });
      //form.reset();
      redirect(`/posts`); // Navigate to the new post page
    }
  };

  if (!post && isUpdate) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <BackButton text="Back to Posts" link="/posts" />

      <Label htmlFor="terms" className="text-2xl mb-4">
        Edit Post
      </Label>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          ref={formRef}
          className="space-y-8"
        >
          <hr className="my-4 border-t-2 border-gray-300" />

          <Input type="hidden" {...form.register("id")} />
          <Input type="hidden" {...form.register("comments")} />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                  Title
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                  Body
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                  Author
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                  Date
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "yyyy-MM-dd") 
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Your date of birth is used to calculate your age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <hr className="my-4 border-t-2 border-gray-300" />

          <SubmitButton />
        </form>
      </Form>
    </>
  );
};

export default PostEditPage;

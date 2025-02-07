import { TOOLS_IMAGES } from "../assets/images";

export const AI_TOOLS = [
  {
    title: "Instagram Reels Ideas",
    smallTitle: "Reel Ideas",
    description:
      "Generate Trending ideas for Instagram Reels and make your videos viral.",
    icon: TOOLS_IMAGES.insta_reels_ideas,
    aiPrompt:
      "Give me 12 - 20 different ideas on which I can make reels and they can go viral.",
    slug: "insta-reels-ideas",
    category: "instagram",
  },
  {
    title: "Instagram Hashtags",
    smallTitle: "Trending Hashtags",
    description:
      "Generate popular hashtags for your Instagram posts to boost engagement.",
    icon: TOOLS_IMAGES.instagram_hashtags,
    aiPrompt:
      "Suggest relevant and trending hashtags for Instagram posts based on content.",
    slug: "instagram-hashtags",
    category: "instagram",
  },
  {
    title: "Instagram Post Description",
    smallTitle: "Post Description",
    description: "Create engaging captions for your Instagram posts.",
    icon: TOOLS_IMAGES.instagram_post_description,
    aiPrompt:
      "Write a creative and engaging caption for an Instagram post about [topic].",
    slug: "instagram-post-description",
    category: "instagram",
  },
  {
    title: "Youtube Videos Ideas",
    smallTitle: "Get Video Ideas",
    description: "Generate trending ideas for your YouTube videos.",
    icon: TOOLS_IMAGES.youtube_videos_ideas,
    aiPrompt:
      "Suggest 10 unique ideas for YouTube videos in the [niche] category.",
    slug: "youtube-videos-ideas",
    category: "youtube",
  },
  {
    title: "Youtube Video Title",
    smallTitle: "Unique Video Title",
    description: "Create creative titles for your YouTube videos.",
    icon: TOOLS_IMAGES.youtube_seo_title,
    aiPrompt:
      "Generate an SEO-friendly title for a YouTube video about [topic].",
    slug: "youtube-seo-title",
    category: "youtube",
  },
  {
    title: "Youtube Description",
    smallTitle: "Generate Description",
    description: "Write engaging descriptions for your YouTube videos.",
    icon: TOOLS_IMAGES.youtube_description,
    aiPrompt:
      "Write a detailed and engaging description for a YouTube video about [topic].",
    slug: "youtube-description",
    category: "youtube",
  },
  {
    title: "Youtube Hashtags",
    smallTitle: "Get Trending Hashtags",
    description: "Generate effective hashtags for your YouTube videos.",
    icon: TOOLS_IMAGES.youtube_hashtags,
    aiPrompt: "Suggest trending hashtags for a YouTube video about [topic].",
    slug: "youtube-hashtags",
    category: "youtube",
  },
  {
    title: "LinkedIn Post",
    smallTitle: "LinkedIn Post",
    description: "Generate professional LinkedIn Posts with the help of AI.",
    icon: TOOLS_IMAGES.linkedin,
    aiPrompt:
      "Write a professional LinkedIn Post about [topic]. Use emojis also for better look.",
    slug: "linkedIn-post",
    category: "linkedIn",
  },
  {
    title: "Blog Title",
    smallTitle: "Title",
    description: "Create catchy titles for your blog posts.",
    icon: TOOLS_IMAGES.blog_title,
    aiPrompt: "Suggest 5 engaging titles for a blog about [topic].",
    slug: "blog-title",
    category: "blog",
  },
  {
    title: "Blog Content",
    smallTitle: "Content",
    description: "Generate detailed content for your blog posts.",
    icon: TOOLS_IMAGES.blog_content,
    aiPrompt:
      "Write a comprehensive blog post about [topic] covering key points and insights.",
    slug: "blog-content",
    category: "blog",
  },
  {
    title: "Blog Topic Ideas",
    smallTitle: "Blog Topic Ideas",
    description: "Get ideas for blog topics in your niche.",
    icon: TOOLS_IMAGES.blog_topic_ideas,
    aiPrompt: "Suggest 10 blog topic ideas for the [niche] industry.",
    slug: "blog-topic-ideas",
    category: "blog",
  },
  {
    title: "Keywords Generator",
    smallTitle: "Keywords",
    description: "Generate trending keywords with AI.",
    icon: TOOLS_IMAGES.keywords_generator,
    aiPrompt: "Generate a list of trending keywords based on user input.",
    slug: "keywords-gen",
    category: "blog",
  },
];

export const ADVANCED_TOOLS = [
  {
    title: "AI Images Generator",
    smallTitle: "AI Images",
    description: "Generate stunning AI-powered images with just a text prompt.",
    icon: TOOLS_IMAGES.ai_image_advance,
    aiPrompt: "Generate a high-quality AI image based on a given text prompt.",
    slug: "image-gen",
    category: "advance",
  },

  {
    title: "Image Compressor",
    smallTitle: "Compressor",
    description:
      "Compress your images without losing quality and reduce file size instantly.",
    icon: TOOLS_IMAGES.image_compress_advance,
    aiPrompt: "Optimize and compress images while maintaining high quality.",
    slug: "image-compressor",
    category: "advance",
  },

  {
    title: "Text to Voice",
    smallTitle: "Voice Generator",
    description:
      "Convert any text into realistic AI-generated voice instantly.",
    icon: TOOLS_IMAGES.text_to_voice_advance,
    aiPrompt: "Convert the given text into natural AI-generated speech.",
    slug: "text-to-voice",
    category: "advance",
  },

  {
    title: "Video Generator",
    smallTitle: "AI Videos",
    description: "Create AI-powered videos from text or images effortlessly.",
    icon: TOOLS_IMAGES.video_gen_advance,
    aiPrompt: "Generate an AI-powered video from text or images.",
    slug: "youtube-video-generator",
    category: "advance",
  },
];

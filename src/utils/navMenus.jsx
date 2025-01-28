// Nav Menus for Sidebar

import { FaHome } from "react-icons/fa";
import { SiCashapp } from "react-icons/si";
import { IoSettingsSharp } from "react-icons/io5";
import { FiCpu } from "react-icons/fi";
import { MdPolicy } from "react-icons/md";
import { RiImageCircleAiFill } from "react-icons/ri";
import { FaCompressArrowsAlt } from "react-icons/fa";
import { RiVoiceprintFill } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa";

export const NAV_MENUS = [
  {
    name: "Home",
    icon: <FaHome />,
    link: "/",
  },
  {
    name: "AI Tools",
    icon: <FiCpu />,
    link: "/ai-tools",
  },
  {
    name: "AI Images",
    icon: <RiImageCircleAiFill />,
    link: "/image-gen",
  },
  {
    name: "Image Compress",
    icon: <FaCompressArrowsAlt />,
    link: "/image-compressor",
  },
  {
    name: "Text to Voice",
    icon: <RiVoiceprintFill />,
    link: "/text-to-voice",
  },
  {
    name: "Youtube Video",
    icon: <FaYoutube />,
    link: "/youtube-video-generator",
  },
  {
    name: "Youtube Analyics",
    icon: <FaYoutube />,
    link: "/youtube-analytics",
  },
  {
    name: "Billing",
    icon: <SiCashapp />,
    link: "/billing",
  },
  {
    name: "Settings",
    icon: <IoSettingsSharp />,
    link: "/settings",
  },
  {
    name: "Our Policies",
    icon: <MdPolicy />,
    link: "/PolicyPage",
  },
];

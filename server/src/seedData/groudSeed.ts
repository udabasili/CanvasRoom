import { channelLabel, channelTypes, CreateGroupDTO } from "@/interface";
import { Group } from "@/model/group";
import { Channel } from "@/model/channel";
import { Types } from "mongoose";

export const sampleGroups: CreateGroupDTO[] = [
  {
    name: "JavaScript Enthusiasts",
    description: "A group for JavaScript developers to share and learn.",
    language: "javascript",
    icon: "📜",
    owner: "673f425bb7b11106b1eca509",
  },
  {
    name: "Python Programmers",
    description: "Discuss Python, from beginner to advanced.",
    language: "python",
    icon: "🐍",
    owner: "67456840ba770f8fb31f99e3",
  },
  {
    name: "Rustaceans United",
    description: "Learn and grow with Rust programming.",
    language: "rust",
    icon: "🦀",
    owner: "673f425bb7b11106b1eca509",
  },
  {
    name: "HTML5 Developers",
    description: "Everything about HTML and web development.",
    language: "html",
    icon: "🌐",
    owner: "67456840ba770f8fb31f99e3",
  },
  {
    name: "SQL Wizards",
    description: "Master the art of database queries.",
    language: "sql",
    icon: "🗃️",
    owner: "673f425bb7b11106b1eca509",
  },
  {
    name: "Java Masters",
    description: "A group for Java professionals and learners.",
    language: "java",
    icon: "☕",
    owner: "67456840ba770f8fb31f99e3",
  },
  {
    name: "C++ Coders",
    description: "Discuss C++ techniques and best practices.",
    language: "cpp",
    icon: "🖥️",
    owner: "673f425bb7b11106b1eca509",
  },
  {
    name: "PHP Developers",
    description: "Explore the world of PHP development.",
    language: "php",
    icon: "🐘",
    owner: "67456840ba770f8fb31f99e3",
  },
  {
    name: "Markdown Masters",
    description: "Learn to write clean and effective Markdown.",
    language: "markdown",
    icon: "📝",
    owner: "673f425bb7b11106b1eca509",
  },
  {
    name: "XML Enthusiasts",
    description: "Dive into structured data with XML.",
    language: "xml",
    icon: "📄",
    owner: "67456840ba770f8fb31f99e3",
  },
  {
    name: "CSS Ninjas",
    description: "Style the web with advanced CSS techniques.",
    language: "less",
    icon: "🎨",
    owner: "673f425bb7b11106b1eca509",
  },
  {
    name: "Sass Stylists",
    description: "Create clean, powerful stylesheets using Sass.",
    language: "sass",
    icon: "🧵",
    owner: "67456840ba770f8fb31f99e3",
  },
  {
    name: "C# Sharpshooters",
    description: "A group for C# professionals and learners.",
    language: "csharp",
    icon: "🎯",
    owner: "673f425bb7b11106b1eca509",
  },
  {
    name: "JSON Developers",
    description: "Work with structured JSON data.",
    language: "json",
    icon: "🔧",
    owner: "67456840ba770f8fb31f99e3",
  },
  {
    name: "Lezer Fans",
    description: "Explore parsing with Lezer.",
    language: "lezer",
    icon: "📖",
    owner: "673f425bb7b11106b1eca509",
  },
  {
    name: "Clike Coders",
    description: "Develop robust systems using C-like languages.",
    language: "clike",
    icon: "🛠️",
    owner: "67456840ba770f8fb31f99e3",
  },
  {
    name: "Clojure Developers",
    description: "Embrace functional programming with Clojure.",
    language: "clojure",
    icon: "🌿",
    owner: "673f425bb7b11106b1eca509",
  },
  {
    name: "React Native Builders",
    description: "Build mobile apps with React Native.",
    language: "javascript",
    icon: "📱",
    owner: "67456840ba770f8fb31f99e3",
  },
  {
    name: "SQL Gurus",
    description: "Advance your database management skills.",
    language: "sql",
    icon: "📊",
    owner: "673f425bb7b11106b1eca509",
  },
  {
    name: "Coding Legends",
    description: "An all-encompassing group for coding enthusiasts.",
    language: "javascript",
    icon: "👨‍💻",
    owner: "67456840ba770f8fb31f99e3",
  },
];

export async function populateGroup() {
  try {
    for (const group of sampleGroups) {
      const channels: Array<Types.ObjectId> = [];
      const g = await Group.create({
        name: group.name,
        language: group.language,
        description: group.description,
        owner: group.owner,
        icon: group.icon,
      });
      for (const channel of channelTypes) {
        //add to channels for each group
        const c = await Channel.create({
          name: channelLabel[channel],
          group: g._id,
          type: channel,
        });
        channels.push(c._id as Types.ObjectId);
      }
      g.channels = channels;
      //save the group with channels
      await g.save();
    }
  } catch (e) {
    console.error(e);
  }
}

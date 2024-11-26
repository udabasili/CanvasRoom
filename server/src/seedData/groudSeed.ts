import { channelLabel, channelTypes, IGroupDTO } from "@/interface";
import { Group } from "@/model/group";
import { Channel } from "@/model/channel";
import { Types } from "mongoose";

export const sampleGroups: IGroupDTO[] = [
  {
    name: "JavaScript Enthusiasts",
    description: "A group for JavaScript developers to share and learn.",
    language: "javascript",
    icon: "fa-js",
    owner: "673f425bb7b11106b1eca509",
  },
  {
    name: "C++ Coders",
    description: "Exploring the world of C++ programming.",
    language: "cpp",
    icon: "fa-cplusplus",
    owner: "67456840ba770f8fb31f99e3",
  },
  {
    name: "HTML Gurus",
    description: "Discussing all things HTML.",
    language: "html",
    icon: "fa-html5",
    owner: "673f425bb7b11106b1eca509",
  },
  {
    name: "Java Developers",
    description: "Sharing Java techniques and projects.",
    language: "java",
    icon: "fa-java",
    owner: "67456840ba770f8fb31f99e3",
  },
  {
    name: "JSON Wranglers",
    description: "Deep dives into JSON structures and utilities.",
    language: "json",
    icon: "fa-database",
    owner: "673f425bb7b11106b1eca509",
  },
  {
    name: "Markdown Wizards",
    description: "Perfecting your markdown skills.",
    language: "markdown",
    icon: "fa-markdown",
    owner: "67456840ba770f8fb31f99e3",
  },
  {
    name: "PHP Pros",
    description: "For PHP developers to share ideas and code.",
    language: "php",
    icon: "fa-php",
    owner: "673f425bb7b11106b1eca509",
  },
  {
    name: "Pythonistas",
    description: "A community for Python enthusiasts.",
    language: "python",
    icon: "fa-python",
    owner: "67456840ba770f8fb31f99e3",
  },
  {
    name: "Rustaceans",
    description: "All things Rust programming.",
    language: "rust",
    icon: "fa-rust",
    owner: "673f425bb7b11106b1eca509",
  },
  {
    name: "SQL Masters",
    description: "SQL querying and database design.",
    language: "sql",
    icon: "fa-database",
    owner: "67456840ba770f8fb31f99e3",
  },
  {
    name: "XML Experts",
    description: "Working with XML documents and standards.",
    language: "xml",
    icon: "fa-file-code",
    owner: "673f425bb7b11106b1eca509",
  },
  {
    name: "CSS Artists",
    description: "Mastering the art of CSS design.",
    language: "css",
    icon: "fa-css3",
    owner: "67456840ba770f8fb31f99e3",
  },
  {
    name: "SASS Stylists",
    description: "Exploring SASS for efficient CSS.",
    language: "sass",
    icon: "fa-sass",
    owner: "673f425bb7b11106b1eca509",
  },
  {
    name: "Clojure Coders",
    description: "Functional programming with Clojure.",
    language: "clojure",
    icon: "fa-code",
    owner: "67456840ba770f8fb31f99e3",
  },
  {
    name: "C# Wizards",
    description: "Building powerful apps with C#.",
    language: "clike",
    icon: "fa-code",
    owner: "673f425bb7b11106b1eca509",
  },
  {
    name: "Lezer Language Enthusiasts",
    description: "Working with Lezer for parsers.",
    language: "lezer",
    icon: "fa-code",
    owner: "67456840ba770f8fb31f99e3",
  },
  {
    name: "Expo Markup",
    description: "A community for markdown enthusiasts",
    language: "expo",
    icon: "fa-html3",
    owner: "673f425bb7b11106b1eca509",
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

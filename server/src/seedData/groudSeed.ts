import { channelLabel, channelTypes, IGroupDTO } from "@/interface";
import { Group } from "@/model/group";
import { Channel } from "@/model/channel";
import { Types } from "mongoose";

export const sampleGroups: IGroupDTO[] = [
  {
    name: "JavaScript Enthusiasts",
    description: "A group for JavaScript developers to share and learn.",
    language: "JavaScript",
    owner: "673f425bb7b11106b1eca509",
  },
  {
    name: "Pythonistas",
    description: "Dedicated to Python programming and best practices.",
    language: "Python",
    owner: "673f425bb7b11106b1eca509",
  },
  {
    name: "C# Corner",
    description: "Exploring C# and .NET development.",
    language: "C#",
    owner: "673f425bb7b11106b1eca509",
  },
  {
    name: "Java Developers Hub",
    description: "A community for Java developers to collaborate.",
    language: "Java",
    owner: "673f425bb7b11106b1eca509",
  },
  {
    name: "React Developers",
    description: "A space to discuss React and related libraries.",
    language: "JavaScript",
    owner: "673f425bb7b11106b1eca509",
  },
  {
    name: "Angular Ninjas",
    description: "For Angular developers mastering TypeScript.",
    language: "TypeScript",
    owner: "673f425bb7b11106b1eca509",
  },
  {
    name: "Rubyists",
    description: "All things Ruby, from Rails to plain Ruby scripts.",
    language: "Ruby",
    owner: "673f425bb7b11106b1eca509",
  },
  {
    name: "Go Developers Network",
    description: "A group for Go (Golang) enthusiasts.",
    language: "Go",
    owner: "673f425bb7b11106b1eca509",
  },
  {
    name: "PHP Coders",
    description: "Exploring PHP and frameworks like Laravel.",
    language: "PHP",
    owner: "673f425bb7b11106b1eca509",
  },
  {
    name: "Swift Coders",
    description: "For those building apps with Swift and SwiftUI.",
    language: "Swift",
    owner: "673f425bb7b11106b1eca509",
  },
  {
    name: "Kotlin Programmers",
    description: "A group focused on Kotlin for Android and beyond.",
    language: "Kotlin",
    owner: "673f425bb7b11106b1eca509",
  },
  {
    name: "C++ Developers United",
    description: "Exploring advanced C++ development techniques.",
    language: "C++",
    owner: "673f425bb7b11106b1eca509",
  },
  {
    name: "Rustaceans",
    description: "For developers using Rust in systems programming.",
    language: "Rust",
    owner: "673f425bb7b11106b1eca509",
  },
  {
    name: "SQL Masters",
    description: "Discussing SQL and database management.",
    language: "SQL",
    owner: "673f425bb7b11106b1eca509",
  },
  {
    name: "Perl Wizards",
    description: "A community of Perl enthusiasts.",
    language: "Perl",
    owner: "673f425bb7b11106b1eca509",
  },
  {
    name: "Scala Programmers",
    description: "Sharing knowledge on Scala programming.",
    language: "Scala",
    owner: "673f425bb7b11106b1eca509",
  },
  {
    name: "R Analysts",
    description: "For data analysis and statistics with R.",
    language: "R",
    owner: "673f425bb7b11106b1eca509",
  },
  {
    name: "TypeScript Geeks",
    description: "Deep dives into TypeScript and its ecosystem.",
    language: "TypeScript",
    owner: "673f425bb7b11106b1eca509",
  },
  {
    name: "Dart Enthusiasts",
    description: "A group focused on Dart and Flutter development.",
    language: "Dart",
    owner: "673f425bb7b11106b1eca509",
  },
  {
    name: "Shell Scripters",
    description: "Sharing tips and tricks for shell scripting.",
    language: "Shell",
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

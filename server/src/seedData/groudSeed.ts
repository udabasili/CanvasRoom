import {channelLabel, channelTypes, IGroupDto} from "@/interface";
import {Group} from "@/model/group";
import {Channel} from "@/model/channel";
import {Types} from "mongoose";

export const sampleGroups: IGroupDto[] = [
    { name: "JavaScript Enthusiasts", description: "A group for JavaScript developers to share and learn.", language: "JavaScript" },
    { name: "Pythonistas", description: "Dedicated to Python programming and best practices.", language: "Python" },
    { name: "C# Corner", description: "Exploring C# and .NET development.", language: "C#" },
    { name: "Java Developers Hub", description: "A community for Java developers to collaborate.", language: "Java" },
    { name: "React Developers", description: "A space to discuss React and related libraries.", language: "JavaScript" },
    { name: "Angular Ninjas", description: "For Angular developers mastering TypeScript.", language: "TypeScript" },
    { name: "Rubyists", description: "All things Ruby, from Rails to plain Ruby scripts.", language: "Ruby" },
    { name: "Go Developers Network", description: "A group for Go (Golang) enthusiasts.", language: "Go" },
    { name: "PHP Coders", description: "Exploring PHP and frameworks like Laravel.", language: "PHP" },
    { name: "Swift Coders", description: "For those building apps with Swift and SwiftUI.", language: "Swift" },
    { name: "Kotlin Programmers", description: "A group focused on Kotlin for Android and beyond.", language: "Kotlin" },
    { name: "C++ Developers United", description: "Exploring advanced C++ development techniques.", language: "C++" },
    { name: "Rustaceans", description: "For developers using Rust in systems programming.", language: "Rust" },
    { name: "SQL Masters", description: "Discussing SQL and database management.", language: "SQL" },
    { name: "Perl Wizards", description: "A community of Perl enthusiasts.", language: "Perl" },
    { name: "Scala Programmers", description: "Sharing knowledge on Scala programming.", language: "Scala" },
    { name: "R Analysts", description: "For data analysis and statistics with R.", language: "R" },
    { name: "TypeScript Geeks", description: "Deep dives into TypeScript and its ecosystem.", language: "TypeScript" },
    { name: "Dart Enthusiasts", description: "A group focused on Dart and Flutter development.", language: "Dart" },
    { name: "Shell Scripters", description: "Sharing tips and tricks for shell scripting.", language: "Shell" },
];

export async function populateGroup () {
    try {
        for (const group of sampleGroups) {
            const channels: Array<Types.ObjectId> = [];
            const g = await Group.create({
                name: group.name,
                language: group.language,
                description: group.description
            })
            for (const channel of channelTypes) {
                //add to channels for each group
                const c = await Channel.create({
                    name: channelLabel[channel],
                    group: g._id,
                    type: channel
                })
                channels.push(c._id as Types.ObjectId)

            }
            g.channels = channels
            //save the group with channels
            await g.save()
        }
    } catch (e) {
        console.error(e)
    }

}
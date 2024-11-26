import Logger from "@/loaders/logger";
import { Group, GroupModel } from "@/model/group";
import { Model, Schema, Types } from "mongoose";
import { IGroup, IGroupDTO } from "@/interface";

export class GroupService {
  private logger: typeof Logger;
  private group: GroupModel;

  constructor() {
    this.logger = Logger;
    this.group = Group;
  }

  public async getGroup(groupId: string) {
    const group = await this.group.findById(groupId);
    this.logger.silly("Finding group: " + groupId);
    if (!group) {
      throw new Error("Cannot find group");
    }

    await group.populate("members", ["firstName", "lastName"]);
    return group.toObject();
  }

  private userInGroup(userId: string, group: IGroup): boolean {
    const members = group.members;
    const userIdObj = new Types.ObjectId(userId);
    return members.some((member) => member.equals(userIdObj));
  }

  public async joinGroup(groupId: string, userId: string) {
    const group = await this.group.findById(groupId);
    this.logger.silly("Finding group: " + groupId);
    if (!group) {
      throw new Error("Cannot find group");
    }
    if (this.userInGroup(userId, group)) {
      throw new Error("User is already in group");
    }
    this.logger.silly("Joining group: " + groupId);
    const userIdObj = new Types.ObjectId(userId);
    const groupRecord = await this.group.findByIdAndUpdate(
      groupId,
      {
        $push: {
          members: userIdObj,
        },
      },
      {
        new: true,
      },
    );
    return groupRecord?.toObject();
  }

  public async leaveGroup(groupId: string, userId: string) {
    const group = await this.group.findById(groupId);
    this.logger.silly("Finding group: " + groupId);
    if (!group) {
      throw new Error("Cannot find group");
    }
    if (!this.userInGroup(userId, group)) {
      throw new Error("User is not in group");
    }
    this.logger.silly("Leaving group: " + groupId);
    const userIdObj = new Types.ObjectId(userId);
    //remove user from group
    await this.group.findByIdAndUpdate(groupId, {
      $pull: {
        members: userIdObj,
      },
    });
  }

  public async createGroup({ name, description, language, icon }: IGroupDTO) {
    const group = new Group({
      name,
      description,
      language,
      icon,
    });
    await group.save();
    return group.toObject();
  }

  public async getGroups() {
    const groups = await this.group.find();
    return groups.map((group) => group.toObject());
  }

  public async getUserGroups(userId: string) {
    const groups = await this.group
      .find({ members: userId })
      .populate("members", ["firstName", "lastName"])
      .populate("owner", ["firstName", "lastName"])
      .populate("channels", ["name", "type"]);
    return groups.map((group) => group.toObject());
  }
}

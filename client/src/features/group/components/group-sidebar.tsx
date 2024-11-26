import { IoMdAdd } from 'react-icons/io';
import { IoChatbubblesOutline } from 'react-icons/io5';

import { CircleIcon, GroupContainer } from '@/features/group';
import { useGetUserGroups } from '@/features/group/api/get-user-groups.ts';
import { GroupModal } from '@/features/group/components/group-modal.tsx';
import { Group } from '@/features/group/types';
import { User } from '@/features/user';
import { useDisclosure } from '@/hook/use-disclosure.ts';

type GroupSidebarProps = {
  setSelectedGroup: (group: Group) => void;
  selectedGroup: Group | null;
  user: User;
};
export const GroupSidebar = ({
  setSelectedGroup,
  selectedGroup,
  user,
}: GroupSidebarProps) => {
  const { isOpen, open, close } = useDisclosure();
  const { isLoading, groups } = useGetUserGroups(user?._id);

  return (
    <GroupContainer>
      <CircleIcon>
        <IoChatbubblesOutline size={20} />
      </CircleIcon>
      <hr />
      {isLoading ? (
        <div className="skeleton size-16 shrink-0 rounded-full"></div>
      ) : (
        groups?.map((group) => (
          <CircleIcon
            key={group._id}
            onClick={() => setSelectedGroup(group)}
            className={selectedGroup?._id === group._id ? 'selected' : ''}
          >
            {group.icon}
            {/* Using the JS icon */}
          </CircleIcon>
        ))
      )}
      <CircleIcon onClick={open}>
        <IoMdAdd size={20} />
      </CircleIcon>
      <GroupModal show={isOpen} onClose={close} />
    </GroupContainer>
  );
};

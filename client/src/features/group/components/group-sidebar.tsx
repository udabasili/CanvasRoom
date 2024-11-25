import { useContext, useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { IoChatbubblesOutline } from 'react-icons/io5';

import { Channel } from '@/features/channel';
import { useGetUserGroups } from '@/features/group/api/get-user-groups.ts';
import { GroupModal } from '@/features/group/components/group-modal.tsx';
import { Group } from '@/features/group/types';
import { useDisclosure } from '@/hook/use-disclosure.ts';
import { AuthContext, AuthContextType } from '@/lib/auth-context.tsx';

import { CircleIcon, GroupContainer } from '../styles/group.styled.tsx';

type GroupSidebarProps = {
  setChannels: (channels: Channel[]) => void;
};
export const GroupSidebar = ({ setChannels }: GroupSidebarProps) => {
  const { isOpen, open, close } = useDisclosure();
  const { user } = useContext(AuthContext) as AuthContextType;
  const { isLoading, groups } = useGetUserGroups(user?._id);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  useEffect(() => {
    if (selectedGroup) {
      setChannels(selectedGroup.channels);
    }
  }, [selectedGroup]);

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
            <IoMdAdd size={20} />
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
